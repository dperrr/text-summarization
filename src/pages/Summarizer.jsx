import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      await extractTextFromPDF(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const extractTextFromPDF = async (file) => {
    try {
      const text = await pdfToText(file);
      setText(text);
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      alert('Failed to extract text from PDF. Please try again.');
    }
  };

  const summarizeText = async () => {
    const apiKey = 'myapi'; 
    const model = 'facebook/bart-large-cnn'; 

    if (!text) {
      alert('Please extract text from a PDF before summarizing.');
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

      const summaryText = response.data[0].summary_text; // Extract the summary from the response
      setSummary(summaryText); // Set the summary in the state
    } catch (error) {
      console.error('Error summarizing text:', error);
      alert('Failed to summarize text. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
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
          <label className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer">
            Upload
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <button
            className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
            onClick={summarizeText} // Call the summarize function
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Summarizing...' : 'Run'}
          </button>
          <button
            className="py-2 px-5 border-2 border-purple-500 text-purple-500 hover:border-purple-600 rounded-sm cursor-pointer"
            onClick={() => {
              setText('');
              setSummary('');
              setPdfFile(null);
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
              className="py-2 px-5 bg-purple-500 hover:bg-purple-600 text-white rounded-sm cursor-pointer"
              onClick={() => navigator.clipboard.writeText(summary)}
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
