import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Sparkle } from 'lucide-react';
import ClipLoader from "react-spinners/ClipLoader";
import TfidfHeatmap from './TfidfHeatmap';


function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [keywordsWithScores, setKeywordsWithScores] = useState([]);
  const [summarySentences, setSummarySentences] = useState([]);
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    startDriver();
  }, []);

  // TF-IDF Algorithm
  const calculateTFIDF = (documents) => {
    const tfs = documents.map(doc => {
      const words = doc.toLowerCase().split(/\s+/);
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

    const idf = {};
    const totalDocs = documents.length;
    
    documents.forEach(doc => {
      const words = new Set(doc.toLowerCase().split(/\s+/));
      words.forEach(word => {
        idf[word] = (idf[word] || 0) + 1;
      });
    });
    
    Object.keys(idf).forEach(word => {
      idf[word] = Math.log(totalDocs / idf[word]);
    });

    const tfidf = tfs.map(tf => {
      const scores = {};
      Object.keys(tf).forEach(word => {
        scores[word] = tf[word] * idf[word];
      });
      return scores;
    });

    return tfidf;
  };

  // Aho-Corasick Algorithm
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
    const sentences = text
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map(s => s.trim())
      .filter(s => s.length > 20); 

    const tfidfScores = calculateTFIDF(sentences);

    // Get keywords with scores
    const keywordsWithScores = Object.entries(
      tfidfScores.reduce((acc, score) => {
        Object.keys(score).forEach(word => {
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

    const ac = new AhoCorasick(keywordsWithScores.map(([word]) => word));

    const scoredSentences = sentences.map((sentence, index) => {
      const cleanSentence = sentence.toLowerCase().replace(/[^\w\s]/g, ' ');
      const matches = ac.search(cleanSentence);
      const uniqueMatches = new Set(matches.flatMap(m => m.keywords));

      // Sum actual TF-IDF keyword scores
      const keywordScore = [...uniqueMatches]
        .map(k => keywordsWithScores.find(([word]) => word === k)?.[1] || 0)
        .reduce((a, b) => a + b, 0);

      return {
        text: sentence,
        score: keywordScore,
        positionWeight: 1 + (1 / (index + 1)),
        keywords: [...uniqueMatches]
      };
    });

    // Calculate how many sentences to select based on word count
    const totalWords = text.split(' ').length;
    const totalSentences = sentences.length;
    let numSentencesToSelect;
    
    // ADJUTER FOR NUMBER OF WORDS
    if (totalWords < 150) {
      numSentencesToSelect = Math.max(2, Math.floor(totalSentences * 0.4));
    } else if (totalWords < 300) {
      numSentencesToSelect = Math.max(3, Math.floor(totalSentences * 0.45));
    } else if (totalWords < 500) {
      numSentencesToSelect = Math.max(4, Math.floor(totalSentences * 0.5));
    } else if (totalWords < 1000) {
      numSentencesToSelect = Math.floor(totalSentences * 0.4);
    } else if (totalWords < 2000) {
      numSentencesToSelect = Math.floor(totalSentences * 0.35);
    } else if (totalWords < 5000) {
      numSentencesToSelect = Math.floor(totalSentences * 0.3);
    } else {
      numSentencesToSelect = Math.floor(totalSentences * 0.25);
    }
    
    // ADJUST THE SELECTED WORDS BASED ON THE WORD COUNT
    if (totalWords < 200) {
      numSentencesToSelect = Math.min(numSentencesToSelect, 3);
    }
    
    // Ensure minimum of 2 sentences for any text
    numSentencesToSelect = Math.max(numSentencesToSelect, 2);

    // Sort and select top N sentences
    const topSentences = scoredSentences
      .sort((a, b) => (b.score * b.positionWeight) - (a.score * a.positionWeight))
      .slice(0, numSentencesToSelect);

    // Skip deduplication for now
    const dedupedSentences = topSentences;
    
    console.log(`Total sentences: ${totalSentences}, Will select: ${numSentencesToSelect}`);
    console.log(`Selected ${dedupedSentences.length} sentences without AI processing`);

    // Restore original order
    const finalSentences = dedupedSentences.sort(
      (a, b) => sentences.indexOf(a.text) - sentences.indexOf(b.text)
    );

    setSummarySentences(finalSentences);

    // Create the summary from selected sentences (SEMI FINAL SELECTION STILL WAITING FOR THE MODEL)
    const extractiveSummary = finalSentences
      .map(s => s.text.trim())
      .join(' ');

    setSummary(extractiveSummary);

    console.log(`Original: ${text.split(' ').length} words`);
    console.log(`Final summary: ${extractiveSummary.split(' ').length} words`);
    console.log(`Selected sentences: ${finalSentences.length}`);

    Swal.fire('Success', 'Text summarized successfully using TF-IDF + Aho-Corasick!', 'success');
    showResultsPopup(keywordsWithScores, finalSentences);
  } catch (error) {
    console.error("Summarization error:", error);
    Swal.fire('Error', 'Failed to generate summary. Please try again.', 'error');
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
          element: '#heatmap-button',
          popover: {
            title: 'Step 8: Show Heatmap',
            description: 'Click here to check the pick keyword scores in graph.',
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

      if (wordCount < 500) {
        Swal.fire(
          'Small Document',
          `This document has ${wordCount} words. The summary might be too short or vague.`,
          'info'
        );
      } else if (wordCount > 5000) {
        Swal.fire(
          'Large Document',
          `This document has ${wordCount} words. Summarization may take longer or lose detail.`,
          'warning'
        );
      } else {
        Swal.fire(
          'Uploaded Successfully',
          `This document has ${wordCount} words. Ready to summarize!`,
          'success'
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
          Briefos - Text Summarization Using TF-IDF and Aho-Corasick Algorithm
        </h2>
      </div>

      <div className='grid grid-cols-2 w-full'>
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

            <div className="text-gray-500 text-sm mt-1">
              {summary.length} characters | {Math.ceil(summary.length / 250)} min read
            </div>

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
                id="heatmap-button"
                className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
                onClick={() => {    
                  setShowHeatmap(true)
                }}
              >Check HeatMap
              
              </button>
              {showHeatmap && (
              <div className="fixed inset-0 bg-opacity-40 z-50 flex justify-center items-center">
                <div className="relative bg-purple-400 rounded-lg shadow-lg p-6 max-w-3xl w-full">
                  <button
                    onClick={() => setShowHeatmap(false)}
                    className="absolute top-2 right-3 text-white hover:text-black text-lg cursor-pointer"
                  >
                    ✖
                  </button>

                  <TfidfHeatmap keywordsWithScores={keywordsWithScores} />
                </div>
              </div>
            )}

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summarizer;