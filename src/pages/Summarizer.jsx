import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startDriver();
  }, []);

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
          element: '#copy-button',
          popover: {
            title: 'Step 4: Copy Summary',
            description: 'Click here to copy the summary to your clipboard.',
            position: 'bottom'
          }
        },
        {
          element: '#clear-button',
          popover: {
            title: 'Step 5: Clear All',
            description: 'Click this to clear the text and summary fields.',
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
      await extractTextFromPDF(file);
    } else {
      Swal.fire('Error', 'Please upload a valid PDF file.', 'error');
    }
  };

  const extractTextFromPDF = async (file) => {
    try {
      const text = await pdfToText(file);
      setText(text);
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      Swal.fire('Error', 'Failed to extract text from PDF. Please try again.', 'error');
    }
  };

  const summarizeText = async () => {
    const apiKey = 'myapi'; 
    const model = 'facebook/bart-large-cnn'; 

    if (!text) {
      Swal.fire('Warning', 'Please extract text from a PDF before summarizing.', 'warning');
      return;
    }

    setLoading(true); 

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/facebook/bart-large-cnn`,
            { inputs: text },
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
            }
      );

      const summaryText = response.data[0].summary_text;
      setSummary(summaryText);
      Swal.fire('Success', 'Text summarized successfully!', 'success');
    } catch (error) {
      console.error('Error summarizing text:', error);
      Swal.fire('Error', 'Failed to summarize text. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-10 bg-gray-100">
      <div className="bg-white shadow-md px-1 py-2 rounded-2xl border w-full max-w-5xl">
        <h2 className="text-lg font-medium text-gray-700 text-center">
          Briefos - Fast, accurate text summarization and search using TD-IDF and Hybrid Summarization
        </h2>
      </div>

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

        <div className="text-gray-500 text-sm mt-1">
          {text.length} characters | {Math.ceil(text.length / 250)} min read
        </div>

        <div className="flex justify-end space-x-2 mt-3">
          <label id="upload-btn" className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer">
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
            className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
            onClick={summarizeText}
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Run'}
          </button>
          <button
            id="clear-button"
            className="py-2 px-5 border-2 border-purple-500 text-purple-500 hover:border-purple-600 rounded-sm cursor-pointer"
            onClick={() => {
              setText('');
              setSummary('');
              setPdfFile(null);
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
            readOnly
          />

          <div className="text-gray-500 text-sm mt-1">
            {summary.length} characters | {Math.ceil(summary.length / 250)} min read
          </div>

          <div className="flex justify-end mt-2">
            <button 
              id="copy-button"
              className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(summary);
                Swal.fire('Copied', 'Summary copied to clipboard.', 'success');
              }}
            >
              Copy 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summarizer;
