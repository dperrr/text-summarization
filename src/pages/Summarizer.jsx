import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import Swal from 'sweetalert2';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Sparkle } from 'lucide-react';
import ClipLoader from "react-spinners/ClipLoader";
import { STOPWORDS } from "../Utils/stopwords.jsx";
import { askGemini } from "../Utils/old.jsx"
import { diffWords } from 'diff';
import { jsPDF } from "jspdf";
import mammoth from "mammoth";
import { accScore } from '../Utils/score.jsx';




function Summarizer() {
  const [extractiveSummary, setExtractiveSummary] = useState('');
  const [extractiveCount, setExtractiveCount] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [keywordsWithScores, setKeywordsWithScores] = useState([]);
  const [summarySentences, setSummarySentences] = useState([]);
  const [abstractiveSummary, setAbstractiveSummary] = useState('');
  const [rougeScores, setRougeScores] = useState(null);
  const [outputInfo, setOutputInfo] = useState({
  size: '',
  wordCount: 0,
  characters: 0
});


useEffect(() => {
  const hasSeenTutorial = localStorage.getItem("hasSeenDriver");

  if (!hasSeenTutorial) {
    startDriver();
    localStorage.setItem("hasSeenDriver", "true");
  }
}, []);


/**
 * This function implements the TF-IDF algorithm, which measures how important words are within a set of documents. 
 * It first calculates Term Frequency (TF), showing how often a word appears in a single document relative to its length. 
 * Next, it calculates Inverse Document Frequency (IDF), which reduces the weight of very common words by comparing how many documents contain the word. 
 * Finally, it multiplies TF by IDF to produce TF-IDF scores, highlighting words that are frequent in a document but rare across the entire collection, 
 * making them more meaningful for tasks like keyword extraction or document similarity.
 */

const calculateTFIDF = (documents) => {

  console.log(documents)
  // Calculate Term Frequency (TF))
  const tfs = documents.map((doc, index) => {
    console.log(`\n Document ${index + 1}:`, doc);
    const words = doc
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(w => !STOPWORDS.has(w));
    

    
    console.log(` fFiltered Words (stopwords removed) - Doc ${index + 1}:`, words);
    const totalWords = words.length;
    const tf = {};

    words.forEach(word => {
      tf[word] = (tf[word] || 0) + 1;
    });

     console.log(` Raw Word Counts (TF) - Doc ${index + 1}:`, tf);

    Object.keys(tf).forEach(word => {
      tf[word] = Number((tf[word] / totalWords).toFixed(4));
    });
    console.log(` Normalized TF - Doc ${index + 1}:`, tf);
    return tf;
  });

  // Calculate Inverse Document Frequency (IDF)
  const idf = {};
  const totalDocs = documents.length;

  documents.forEach((doc, index) => {
    const words = new Set(
      doc
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(w => !STOPWORDS.has(w))
    );
    console.log(`\n Unique Words in Doc ${index + 1}:`, [...words]);

    words.forEach(word => {
      idf[word] = (idf[word] || 0) + 1;
    });
  });
  console.log("\n Document Frequencies (DF):", idf);
  Object.keys(idf).forEach(word => {
    idf[word] = Number(
      (Math.log(totalDocs / (1 + idf[word])) + 1).toFixed(4));

  });
   console.log("\n Computed IDF scores:", idf);

  // Combine TF and IDF into TF-IDF
  const tfidf = tfs.map(tf => {
    const scores = {};
    Object.keys(tf).forEach(word => {
      // Multiply the TF * idf
      scores[word] = Number((tf[word] * idf[word]).toFixed(4));
    });
    
    return scores;

  });

  console.log(tfidf)
  return tfidf;
};

  /**
 * This class implements the Aho-Corasick algorithm for multi-pattern string searching. 
 * It builds a trie structure from given keywords selected by TF-IDF, then augments it with failure links that act like shortcuts, 
 * so when a mismatch occurs during scanning, the search can jump to the longest valid suffix instead of restarting from the root. 
 * This makes searching efficient (linear in text length) and also enables detection of overlapping matches, 
 * meaning multiple keywords can be found in one pass through the text.
 */
  class AhoCorasick {
    constructor(keywords) {
      this.root = this.buildTrie(keywords);
      this.buildFailureLinks();
    }

    buildTrie(keywords) {
      const root = { children: {}, output: [], fail: null };
      
      keywords.forEach(keyword => {
        let node = root;
        for (const char of keyword) {
          if (!node.children[char]) {
            node.children[char] = { children: {}, output: [], fail: null };
          }
          node = node.children[char];
        }
        node.output.push(keyword);
      });
      
      return root;
    }

    //Building failure links
    buildFailureLinks() {
      const queue = [];
      this.root.fail = null;
      
      for (const [char, child] of Object.entries(this.root.children)) {
        child.fail = this.root;
        queue.push(child);
      }
      
      while (queue.length) {
        const current = queue.shift();
        
        for (const [char, child] of Object.entries(current.children)) {
          queue.push(child);
          let failNode = current.fail;
          
          while (failNode !== null && !failNode.children[char]) {
            failNode = failNode.fail;
          }
          
          child.fail = failNode ? failNode.children[char] || this.root : this.root;
          child.output = [...child.output, ...child.fail.output];
        }
      }
    }

    search(text) {
      let current = this.root;
      const results = [];
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        while (current !== this.root && !current.children[char]) {
          current = current.fail;
        }
        
        current = current.children[char] || this.root;
        
        if (current.output.length > 0) {
          results.push({
            position: i,
            keywords: current.output
          });
        }
      }
      
      return results;
    }
  }


/**
 * This function is the core of the TextSense summarization system.
 * It uses a two-step "Hybrid" approach:
 * 1. EXTRACTIVE STEP: Acts like a highlighter, identifying the most important sentences from the original text.
 *    - It uses TF-IDF class to find the most significant keywords.
 *    - It uses the Aho-Corasick algorithm to rapidly find sentences containing those keywords.
 * 2. ABSTRACTIVE STEP: Uses the Gemini AI to rewrite the selected sentences into a final, fluent summary.
 * This combination aims to be both accurate and efficient, especially for shorter texts.
 */
const generateSummary = async () => {
  setLoading(true);

  try {
    //  Preprocessing 
    const sentences = text
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map((s) => s.trim())
      .filter((s) => s.length > 20);


    const tfidfScores = calculateTFIDF(sentences);
    console.log("TF-IDF SCORES")
    console.log(tfidfScores)


    // Get keywords with scores
    const keywordsWithScores = Object.entries(
      tfidfScores.reduce((acc, score) => {
        Object.keys(score).forEach((word) => {
          acc[word] = (acc[word] || 0) + score[word];
          console.log(acc[word])
          console.log(score[word])
        });
        console.log(acc)
        return acc;
        
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .filter(([word]) => word.length > 2);

    setKeywords(keywordsWithScores.map(([word]) => word));
    console.log(keywordsWithScores)
    setKeywordsWithScores(keywordsWithScores);


    const ac = new AhoCorasick(keywordsWithScores.map(([word]) => word));

    const scoredSentences = sentences.map((sentence, index) => {
      const cleanSentence = sentence.toLowerCase().replace(/[^\w\s]/g, " ");
      const matches = ac.search(cleanSentence);
      const uniqueMatches = new Set(matches.flatMap((m) => m.keywords));

      const keywordScore = [...uniqueMatches]
        .map(
          (k) => keywordsWithScores.find(([word]) => word === k)?.[1] || 0
        )
        .reduce((a, b) => a + b, 0);

      return {
        text: sentence,
        score: keywordScore,
        positionWeight: 1 + 1 / (index + 1),
        keywords: [...uniqueMatches],
      };
    });


    // ---- Sentence Selection ----
    const totalWords = text.split(" ").length;
    const totalSentences = sentences.length;
    let numSentencesToSelect =
      totalWords < 500
        ? Math.max(2, Math.floor(totalSentences * 0.4))
        : Math.floor(totalSentences * 0.3);

    numSentencesToSelect = Math.max(numSentencesToSelect, 2);

    const topSentences = scoredSentences
      .sort(
        (a, b) =>
          b.score * b.positionWeight - a.score * a.positionWeight
      )
      .slice(0, numSentencesToSelect);

    const finalSentences = topSentences.sort(
      (a, b) => sentences.indexOf(a.text) - sentences.indexOf(b.text)
    );

    setSummarySentences(finalSentences);

    const extractiveSummary = finalSentences.map((s) => s.text.trim()).join(" ");
    const refinedCount = extractiveSummary.trim().split(/\s+/).length;
    setExtractiveCount(refinedCount);
    setExtractiveSummary(extractiveSummary);

    const wordCount = text.trim().split(/\s+/).length;

    let refinedSummary = "";
    try {
      if(wordCount <= 400){
        refinedSummary = await askGemini(text);
      }else {
        refinedSummary = await askGemini(extractiveSummary);
        
      }
      setSummary(refinedSummary);
     
    } catch (geminiError) {
      console.error("Gemini failed:", geminiError);
      Swal.fire(
        'Summarization Failed', 
        'Abstractive Summarization failed, using now the extractive summarization.',
        'warning' 
      );
      refinedSummary = extractiveSummary;
      setSummary(extractiveSummary);
    }
     const scores = accScore(text, refinedSummary); 
      console.log("ROUGE scores:", scores);
      setRougeScores(scores); 
      console.log(rougeScores)

    const wc = refinedSummary.trim().split(/\s+/).length;
    const charCount = refinedSummary.length;
    let sizeLabel = "small document";
    if (wc > 700 && wc <= 2500) sizeLabel = "medium document";
    else if (wc > 2500) sizeLabel = "large document";

    setOutputInfo({
      size: sizeLabel,
      wordCount: wc,
      characters: charCount
    });

    
  } catch (error) {
    console.error("Summarization error:", error);
    Swal.fire("Error", "Failed to generate summary.", "error");
  } finally {
    setLoading(false);
  }
};
const showResultsPopup = (keywordsWithScores, summarySentences) => {
  Swal.fire({
    title: 'Summary Analysis',
    html: `
      <div class="text-left">
        <h3 class="font-bold mb-2">Keywords Used:</h3>
        <ul class="mb-4 max-h-40 overflow-y-auto">
          ${keywordsWithScores.map(([word, score]) => `
            <li class="py-1 border-b">
              <span class="font-medium">${word}</span>: 
              <span class="text-purple-600">${score.toFixed(4)}</span>
            </li>
          `).join('')}
        </ul>
        <h3 class="font-bold mb-2">Selected Sentences:</h3>
        <ol class="list-decimal pl-8  max-h-40 overflow-y-auto">
          ${summarySentences.map(s => `
            <li class="py-1">${s.text}</li>
          `).join('')}
        </ol>
      </div>
    `,
    width: '600px',
    showConfirmButton: true,
    confirmButtonText: 'Got it!',
    customClass: {
      popup: 'rounded-lg shadow-xl'
    }
  });
};

const generateDiffHTML = (oldText, newText) => {
  const diff = diffWords(oldText || '', newText || '');
  return diff
    .map(part => {
      const color = part.added ? '#16a34a' : part.removed ? '#dc2626' : 'inherit';
      const background = part.added
        ? 'rgba(34,197,94,0.1)'
        : part.removed
        ? 'rgba(239,68,68,0.1)'
        : 'transparent';
      return `<span style="color:${color}; background:${background}">${part.value}</span>`;
    })
    .join('');
};


const showComparisonPopup = (extractive, abstractive) => {
  const diffHTML = generateDiffHTML(extractive, abstractive);
  const origDiffHTML = generateDiffHTML(text, abstractive);

  Swal.fire({
    title: 'Summary Comparison',
    html: `
      <div class="flex justify-center mb-4">
        <button id="tab-extractive" class="tab-btn bg-purple-500 text-white px-4 py-2 rounded-l-md">Extractive</button>
        <button id="tab-abstractive" class="tab-btn bg-gray-200 text-gray-700 px-4 py-2">Abstractive</button>
        <button id="tab-diff" class="tab-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md">Compare Models</button>
        <button id="tab-orig" class="tab-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md">Compare to Original</button>
      </div>

      <!-- Extractive -->
      <div id="panel-extractive" class="tab-panel block">
        <h3 class="font-bold mb-2 text-left">Extractive Summary</h3>
        <textarea
          class="w-full border rounded-md p-3 text-gray-700 focus:outline-none h-[580px] resize-none overflow-y-auto"
          readonly
        >${extractive || 'No extractive summary yet'}</textarea>
        <div class="text-left mt-2 text-sm text-gray-600">Word Count: ${extractiveCount} words</div>
      </div>

      <!-- Abstractive -->
      <div id="panel-abstractive" class="tab-panel hidden">
        <h3 class="font-bold mb-2 text-left">Abstractive Summary</h3>
        <textarea
          class="w-full border rounded-md p-3 text-gray-700 focus:outline-none h-[580px] resize-none overflow-y-auto"
          readonly
        >${abstractive || 'No abstractive summary yet'}</textarea>
        <div class="text-left mt-2 text-sm text-gray-600">Word Count: ${outputInfo.wordCount} words</div>
      </div>

      <!-- Diff -->
      <div id="panel-diff" class="tab-panel hidden">
        <h3 class="font-bold mb-2 text-left">Differences (Extractive → Abstractive)</h3>
        <div
          class="w-full border rounded-md p-3 h-[580px] overflow-y-auto text-sm leading-relaxed"
          style="white-space: pre-wrap;"
        >${diffHTML}</div>
      </div>

      <!-- Original Diff -->
      <div id="orig-diff" class="tab-panel hidden">
        <h3 class="font-bold mb-2 text-left">Differences (Original → Abstractive)</h3>
        <div
          class="w-full border rounded-md p-3 h-[580px] overflow-y-auto text-sm leading-relaxed"
          style="white-space: pre-wrap;"
        >${origDiffHTML}</div>
      </div>
    `,
    width: '95%',
    showConfirmButton: true,
    confirmButtonText: 'Close',
    customClass: {
      popup: 'rounded-lg shadow-xl'
    },
    didOpen: () => {
      const tabs = [
        { btn: 'tab-extractive', panel: 'panel-extractive' },
        { btn: 'tab-abstractive', panel: 'panel-abstractive' },
        { btn: 'tab-diff', panel: 'panel-diff' },
        { btn: 'tab-orig', panel: 'orig-diff' },
      ];

      tabs.forEach(({ btn, panel }) => {
        document.getElementById(btn).addEventListener('click', () => {
          tabs.forEach(({ btn: b, panel: p }) => {
            document.getElementById(p).classList.add('hidden');
            document.getElementById(b).classList.remove('bg-purple-500', 'text-white');
            document.getElementById(b).classList.add('bg-gray-200', 'text-gray-700');
          });
          document.getElementById(panel).classList.remove('hidden');
          document.getElementById(btn).classList.add('bg-purple-500', 'text-white');
          document.getElementById(btn).classList.remove('bg-gray-200', 'text-gray-700');
        });
      });
    }
  });
};

 const saveBtn = (summary) => {
    const firstWord = summary.split(" ")[0] || 'summary';
    console.log(summary.split(" "));
    
    const pdf = new jsPDF();
    pdf.text(summary, 10, 10, { maxWidth: 180 });
    pdf.save(`${firstWord}-summary.pdf`);
  };
      

const handlePrint = (summaryText) => {
  if (!summaryText) {
    Swal.fire('No Summary', 'Please generate a summary first.', 'warning');
    return;
  }

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head><title>Textsense</title></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <pre style="white-space: pre-wrap; word-wrap: break-word;">${summaryText}</pre>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};


  const startDriver = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#text-input',
          popover: {
            title: 'Step 1: Enter Text or Upload PDF',
            description: 'You can manually enter text or upload a PDF file.',
            position: 'bottom'
          }
        },
        {
          element: '#upload-btn',
          popover: {
            title: 'Step 2: Upload PDF File',
            description: 'Click this button to upload PDF file.',
            position: 'bottom'
          }
        },
        {
          element: '#run-button',
          popover: {
            title: 'Step 3: Summarize Text',
            description: 'Click this button to summarize the text.',
            position: 'bottom'
          }
        },
        {
          element: '#clear-button',
          popover: {
            title: 'Step 4: Clear All',
            description: 'Click this to clear the text and summary fields.',
            position: 'bottom'
          }
        },
        {
          element: '#output-area',
          popover: {
            title: 'Step 5: Output will be shown here',
            description: 'Your summarized text or output will be shown in this area.',
            position: 'bottom'
          }
        },
        {
          element: '#copy-button',
          popover: {
            title: 'Step 6: Copy Summary',
            description: 'Click here to copy the summary to your clipboard.',
            position: 'bottom'
          }
        },
        {
          element: '#result-button',
          popover: {
            title: 'Step 7: Show Result',
            description: 'Click here to check the pick keywords and sentences by TF-IDF and Aho-Corasick.',
            position: 'bottom'
          }
        },
        {
          element: '#comparison-button',
          popover: {
            title: 'Step 8: Show Comparison',
            description: 'Click here to show the comparison of abstractive and extractive summary.',
            position: 'bottom'
          }
        },
        {
          element: '#checkinfo-button',
          popover: {
            title: 'Step 9: Output Info',
            description: 'Click here to check the output information of the summarization.',
            position: 'bottom'
          }
        }
      ]
    });
    driverObj.drive();
  };


const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!allowedTypes.includes(file.type)) {
    Swal.fire("Error", "Please upload a PDF, TXT, or DOCX file.", "error");
    return;
  }

  setLoading(true);

  try {
    let extractedText = "";

    if (file.type === "application/pdf") {
      extractedText = await pdfToText(file);
    }


    if (file.type === "text/plain") {
      extractedText = await file.text();
    }


    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      extractedText = result.value;
    }


    const wordCount = extractedText.trim().split(/\s+/).length;


    if (wordCount < 7001) {
      setText(extractedText);

      if (wordCount <= 700) {
        Swal.fire("Small Document", `This document has ${wordCount} words.`, "info");
      } else if (wordCount <= 2500) {
        Swal.fire("Medium Document", `This document has ${wordCount} words.`, "info");
      } else if (wordCount > 4500) {
        Swal.fire("Large Document", `This document has ${wordCount} words.`, "info");
      }
    } else {
      Swal.fire(
        "Super Large Document",
        `This document has ${wordCount} words. Please upload a smaller file.`,
        "warning"
      );
    }

  } catch (error) {
    console.error("Error extracting text:", error);
    Swal.fire("Error", "Failed to extract text. Try again.", "error");

  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-10 mt-20 ">
      <div className="bg-white shadow-md px-1 py-2 rounded-2xl w-full max-w-5xl ngek">
        <h2 className="text-lg font-medium text-white text-center">
          TextSense - Text Summarization Using TF-IDF and Aho-Corasick Algorithm
        </h2>
      </div>
     <div className="scores mt-6 text-white">
        {rougeScores && (
          <div className="bg-gray-800 p-4 rounded-xl w-full max-w-5xl">
            <h3 className="text-lg font-semibold mb-2">ROUGE Evaluation</h3>

            <div className="space-y-1 text-sm">
              <div>
                <strong>ROUGE-1:</strong> {rougeScores["rouge-1"].f1.toFixed(3)}
              </div>
              <div>
                <strong>ROUGE-2:</strong> {rougeScores["rouge-2"].f1.toFixed(3)}
              </div>
              <div>
                <strong>ROUGE-L:</strong> {rougeScores["rouge-l"].f1.toFixed(3)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-4 sm:px-6 lg:px-8'>
        <div className="py-5 px-6 w-full max-w-5xl">
          <h2 className="text-gray-700 font-medium text-lg sm:text-xl">Input</h2>
          <div className="mt-2">
            <textarea
              id="text-input"
              className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[580px]"
              placeholder="Write or upload a text to summarize..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className='flex space-x-2 mt-1'>
            <div className="text-gray-500 text-sm">
              {text.length} characters | {Math.ceil(text.length / 250)} min read
            </div>
            <div>
              {text && (
                <p className="text-sm text-gray-600">
                  📄 Word Count: {text.trim().split(/\s+/).length}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2 mt-4">
            <label id="upload-btn" className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer transition hover:shadow-lg shadow-purple-800">
              Upload
              <input
                type="file"
                accept=".pdf, .txt, .docx, application/pdf, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <button
              id="run-button"
              className="py-2 px-5 bg-purple-500 transition hover:shadow-lg shadow-purple-800 text-white rounded-sm cursor-pointer"
              onClick={generateSummary}
              disabled={loading || !text.trim()}
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : <span className='flex'><Sparkle className='mr-2' size={20} />Run</span>}
            </button>
            
            <button
              id="clear-button"
              className="py-2 px-5 border-2 border-purple-500 text-purple-500 transition hover:shadow-lg shadow-purple-800 rounded-sm cursor-pointer"
              onClick={() => {
                setText('');
                setSummary('');
                setPdfFile(null);
                setKeywords([]);
                Swal.fire('Cleared', 'Input and output fields have been cleared.', 'info');
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="py-5 px-6 w-full max-w-5xl">
          <h2 className="text-gray-700 font-medium text-lg sm:text-xl">Output</h2>
          <div className="mt-2 relative">
            <textarea
              className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[580px]"
              placeholder="Your summary will be output as a paragraph by default"
              value={summary}
              id='output-area'
              readOnly
            />

            {keywords.length > 0 && (
              <div className="text-sm mt-2 text-gray-600">
                <strong>Keywords used:</strong> {keywords.join(', ')}
              </div>
            )}

            {summary && (
              <div className="text-sm mt-2 text-gray-600 space-y-1">
                <div>Word Count: {outputInfo.wordCount}</div>
                <div>Characters: {outputInfo.characters}</div>
              </div>
            )}

            <div className="flex flex-wrap justify-end sm:justify-end gap-2 mt-4 w-full">
              <button 
                id="print-button"
                className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base rounded-sm cursor-pointer transition hover:shadow-lg shadow-purple-800"
                onClick={() => handlePrint(summary)}
              >
                Print 
              </button>
              <button 
                id="save-pdf"
                className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base rounded-sm cursor-pointer transition hover:shadow-lg shadow-purple-800"
                onClick={() => saveBtn(summary)}
              >
                Save as PDF
              </button>
              <button
                id="result-button"
                className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base rounded-sm cursor-pointer transition hover:shadow-lg shadow-purple-800"
                onClick={() => {
                  if (keywordsWithScores && summarySentences) {
                    showResultsPopup(keywordsWithScores, summarySentences);
                  } else {
                    Swal.fire('Info', 'Please generate a summary first', 'info');
                  }
                }}
                disabled={!summary}
              >
              Show Results
              </button>
             <button
              className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base rounded-sm cursor-pointer transition hover:shadow-lg shadow-purple-800"
              id="comparison-button"
              onClick={() => {
                if (extractiveSummary || summary) {
                  showComparisonPopup(extractiveSummary, summary);
                } else {
                  Swal.fire('Info', 'Please generate summaries first', 'info');
                }
              }}
            >
              Show Comparison
            </button>
            <button
              className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base rounded-sm cursor-pointer transition hover:shadow-lg shadow-purple-800"
              id="checkinfo-button"
              onClick={() => {
                if (!summary) return Swal.fire('Info', 'Please generate a summary first', 'info');
                Swal.fire(
                  'Output Info',
                  `Word Count: ${outputInfo.wordCount} words<br>
                  Characters: ${outputInfo.characters}`,
                  'info'
                );
              }}
            >
              Check Info
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summarizer;