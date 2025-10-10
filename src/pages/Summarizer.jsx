import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import Swal from 'sweetalert2';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Sparkle } from 'lucide-react';
import ClipLoader from "react-spinners/ClipLoader";
import { STOPWORDS } from "../Utils/stopwords.jsx";
import { askGemini } from "../Utils/old.jsx"




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
  const [outputInfo, setOutputInfo] = useState({
  size: '',
  wordCount: 0,
  characters: 0
});


  useEffect(() => {
    startDriver();
  }, []);

/**
 * This function implements the TF-IDF algorithm, which measures how important words are within a set of documents. 
 * It first calculates Term Frequency (TF), showing how often a word appears in a single document relative to its length. 
 * Next, it calculates Inverse Document Frequency (IDF), which reduces the weight of very common words by comparing how many documents contain the word. 
 * Finally, it multiplies TF by IDF to produce TF-IDF scores, highlighting words that are frequent in a document but rare across the entire collection, 
 * making them more meaningful for tasks like keyword extraction or document similarity.
 */

const calculateTFIDF = (documents) => {
  // Calculate Term Frequency (TF)
  const tfs = documents.map(doc => {
    const words = doc
      .toLowerCase()
      .split(/\s+/)
      .filter(w => !STOPWORDS.has(w));

    const totalWords = words.length;
    const tf = {};

    words.forEach(word => {
      tf[word] = (tf[word] || 0) + 1;
    });

    Object.keys(tf).forEach(word => {
      tf[word] = tf[word] / totalWords;
    });

    return tf;
  });

  // Calculate Inverse Document Frequency (IDF)
  const idf = {};
  const totalDocs = documents.length;

  documents.forEach(doc => {
    const words = new Set(
      doc
        .toLowerCase()
        .split(/\s+/)
        .filter(w => !STOPWORDS.has(w))
    );

    words.forEach(word => {
      idf[word] = (idf[word] || 0) + 1;
    });
  });

  Object.keys(idf).forEach(word => {
    idf[word] = Math.log(totalDocs / idf[word]);
  });

  // Combine TF and IDF into TF-IDF
  const tfidf = tfs.map(tf => {
    const scores = {};
    Object.keys(tf).forEach(word => {
      scores[word] = tf[word] * idf[word];
    });
    return scores;
  });

  return tfidf;
};

  /**
 * This class implements the Aho-Corasick algorithm for multi-pattern string searching. 
 * It builds a trie structure from given keywords, then augments it with failure links that act like shortcuts, 
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

const generateSummary = async () => {
  setLoading(true);

  try {
    // ---- Preprocessing ----
    const sentences = text
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map((s) => s.trim())
      .filter((s) => s.length > 20);

    // ---- TF-IDF Timing ----
    const startTF = performance.now();
    const tfidfScores = calculateTFIDF(sentences);
    const endTF = performance.now();
    const tfidfTime = endTF - startTF;

    // Get keywords with scores
    const keywordsWithScores = Object.entries(
      tfidfScores.reduce((acc, score) => {
        Object.keys(score).forEach((word) => {
          acc[word] = (acc[word] || 0) + score[word];
        });
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .filter(([word]) => word.length > 2);

    setKeywords(keywordsWithScores.map(([word]) => word));
    setKeywordsWithScores(keywordsWithScores);

    // ---- Aho-Corasick Timing ----
    const startAC = performance.now();
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
    const endAC = performance.now();
    const ahoTime = endAC - startAC;

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

    // ---- Gemini Timing ----
    const startGem = performance.now();
    let refinedSummary = "";
    try {
      refinedSummary = await askGemini(extractiveSummary);
      setSummary(refinedSummary);
    } catch (geminiError) {
      console.error("Gemini failed:", geminiError);
      refinedSummary = extractiveSummary;
      setSummary(extractiveSummary);
    }

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
    const endGem = performance.now();
    const geminiTime = endGem - startGem;

    const results = {
      reference: text,
      extractive: extractiveSummary,
      abstractive: refinedSummary,
      timings: {
        tfidf: tfidfTime,
        aho: ahoTime,
        gemini: geminiTime,
      },
    };
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
        <ol class="list-decimal pl-5 max-h-40 overflow-y-auto">
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

const showComparisonPopup = (extractive, abstractive) => {
  Swal.fire({
    title: 'Comparison of Summaries',
    html: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <!-- Extractive Summary -->
        <div>
          <h3 class="font-bold mb-2">Extractive Summary</h3>
          <textarea
            class="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 h-[580px] resize-none overflow-y-auto"
            readonly
          >${extractive || 'No extractive summary yet'}</textarea>
          <div>Word Count: ${extractiveCount} words</div>
        </div>

        <!-- Abstractive Summary -->
        <div>
          <h3 class="font-bold mb-2">Abstractive Summary</h3>
          <textarea
            class="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 h-[580px] resize-none overflow-y-auto"
            readonly
          >${abstractive || 'No abstractive summary yet'}</textarea>
          <div>Word Count: ${outputInfo.wordCount} words</div>
        </div>
      </div>
    `,
    width: '95%',
    showConfirmButton: true,
    confirmButtonText: 'Close',
    customClass: {
      popup: 'rounded-lg shadow-xl'
    }
  });
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

  if (file && file.type === 'application/pdf') {
    setPdfFile(file);

    try {
      setLoading(true);

      const extractedText = await pdfToText(file);
      const wordCount = extractedText.trim().split(/\s+/).length;

      setText(extractedText); 

      // Input Size Constraint
      if (wordCount <= 700) {
        Swal.fire(
          'Small Document',
          `This is a small document and has a ${wordCount} words. The summary might be too short or vague.`,
          'info'
        );
      } else if (wordCount <= 2500) {
        Swal.fire(
          'Medium Document',
          `This is a medium document and has a ${wordCount} words. Summarization may take longer or lose detail.`,
          'info'
        );
      } else if (wordCount > 4500) {
        Swal.fire(
          'Large Document',
          `This is a large document and has a ${wordCount} words. Ready to summarize!`,
          'info'
        );
      }

    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      Swal.fire('Error', 'Failed to extract text from PDF. Please try again.', 'error');
    } finally {
      setLoading(false);
    }

  } else {
    Swal.fire('Error', 'Please upload a valid PDF file.', 'error');
  }
};


  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-10 mt-20 ">
      <div className="bg-white shadow-md px-1 py-2 rounded-2xl w-full max-w-5xl ngek">
        <h2 className="text-lg font-medium text-white text-center">
          TextSense - Text Summarization Using TF-IDF and Aho-Corasick Algorithm
        </h2>
      </div>

      <div className='grid lg:grid-cols-2 sm:grid-cols-1 w-full'>
        <div className="py-5 px-6 w-full max-w-5xl">
          <h2 className="text-gray-700 font-medium">Input</h2>
          <div className="mt-2">
            <textarea
              id="text-input"
              className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[580px]"
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

          <div className="flex justify-end space-x-2 mt-3">
            <label id="upload-btn" className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer transition hover:shadow-lg shadow-purple-800">
              Upload
              <input
                type="file"
                accept="application/pdf"
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
          <h2 className="text-gray-700 font-medium">Output</h2>
          <div className="mt-2 relative">
            <textarea
              className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[580px]"
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

            <div className="flex justify-end mt-2 space-x-2">
              <button 
                id="copy-button"
                className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(summary);
                  Swal.fire('Copied', 'Summary copied to clipboard.', 'success');
                }}
                disabled={!summary}
              >
                Copy 
              </button>
              <button
                id="result-button"
                className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
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
              className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
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
              className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
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