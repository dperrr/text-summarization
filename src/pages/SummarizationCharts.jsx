import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const SummarizationCharts = () => {
  const [activeChart, setActiveChart] = useState('timing');

  // Sample data based on based summarization system
  const timingData = [
    { algorithm: 'TF-IDF', time: 45, efficiency: 'Excellent' },
    { algorithm: 'Aho-Corasick', time: 120, efficiency: 'Good' },
    { algorithm: 'Gemini API', time: 2800, efficiency: 'Poor' }
  ];

  const userSatisfactionData = [
    { metric: 'Quality', score: 3.2, status: 'Below Average' },
    { metric: 'Readability', score: 4.1, status: 'Good' },
    { metric: 'Satisfaction', score: 2.8, status: 'Poor' }
  ];

  const compressionData = [
    { docSize: 500, summarySize: 125, ratio: 0.25, type: 'Small' },
    { docSize: 1200, summarySize: 240, ratio: 0.20, type: 'Medium' },
    { docSize: 2500, summarySize: 625, ratio: 0.25, type: 'Medium' },
    { docSize: 4500, summarySize: 900, ratio: 0.20, type: 'Large' },
    { docSize: 6000, summarySize: 1800, ratio: 0.30, type: 'Large' }
  ];

  const errorData = [
    { name: 'Successful', value: 72, color: '#10B981' },
    { name: 'Gemini API Errors', value: 18, color: '#EF4444' },
    { name: 'PDF Extraction Errors', value: 7, color: '#F59E0B' },
    { name: 'Processing Timeouts', value: 3, color: '#8B5CF6' }
  ];

  const keywordEffectivenessData = [
    { subject: 'Relevance', score: 3.1 },
    { subject: 'Coverage', score: 2.8 },
    { subject: 'Accuracy', score: 3.5 },
    { subject: 'Coherence', score: 2.9 },
    { subject: 'Completeness', score: 2.6 }
  ];

  // New data for Aho-Corasick optimization analysis
  const ahoCorasickData = [
    { feature: 'Single Keyword', currentTime: 120, optimizedTime: 85, improvement: 29 },
    { feature: 'Multi-Keyword (5)', currentTime: 180, optimizedTime: 110, improvement: 39 },
    { feature: 'Multi-Keyword (15)', currentTime: 350, optimizedTime: 185, improvement: 47 },
    { feature: 'Real-time Highlighting', currentTime: 450, optimizedTime: 220, improvement: 51 }
  ];

  // New data for extractive-abstractive integration
  const integrationData = [
    { method: 'Extractive Summarization', coherence: 2.3, readability: 3.1, quality: 2.8 },
    { method: 'Abstractive Summarization', coherence: 3.8, readability: 4.2, quality: 3.5 },
    { method: 'Optimized Integration', coherence: 4.2, readability: 4.5, quality: 4.0 }
  ];

  // Competitive comparison data
  const competitiveData = [
    { tool: 'Briefos', accuracy: 3.2, speed: 2.8, efficiency: 2.5 },
    { tool: 'QuillBot', accuracy: 4.1, speed: 4.8, efficiency: 4.2 },
    { tool: 'TLDR This', accuracy: 3.8, speed: 4.5, efficiency: 4.0 },
    { tool: 'Scribbr AI', accuracy: 4.0, speed: 4.3, efficiency: 3.9 }
  ];

  const renderInterpretation = (chartType) => {
    const interpretations = {
      timing: {
        title: "Processing Time Analysis",
        result: "NEGATIVE",
        interpretation: "The Gemini API represents a critical bottleneck, consuming 95% of total processing time (2.8 seconds vs. 0.165 seconds for local algorithms). This creates poor user experience with long wait times.",
        factors: [
          "Network latency and API response delays",
          "External dependency on third-party service reliability",
          "No local caching mechanism implemented",
          "Sequential rather than parallel processing architecture"
        ],
        recommendations: "Implement request caching, add timeout handling, or develop a local abstractive summarization model."
      },
      satisfaction: {
        title: "User Satisfaction Metrics",
        result: "MIXED",
        interpretation: "Users rate readability highly (4.1/5) but overall satisfaction is poor (2.8/5). Quality scores are below average (3.2/5), indicating the system produces readable but potentially inaccurate or incomplete summaries.",
        factors: [
          "TF-IDF may miss contextual relationships between sentences",
          "Keyword-based selection might ignore narrative flow",
          "Gemini refinement inconsistency due to API limitations",
          "No user customization options for summary length or style"
        ],
        recommendations: "Improve sentence coherence algorithms, add user preference settings, and implement better quality validation."
      },
      compression: {
        title: "Summary Compression Analysis",
        result: "INCONSISTENT",
        interpretation: "Compression ratios vary significantly (20-30%), showing inconsistent summarization behavior. Large documents show higher variance, suggesting the algorithm struggles with complex content organization.",
        factors: [
          "Fixed percentage-based sentence selection doesn't adapt to content density",
          "TF-IDF scoring may be less effective for longer, more complex documents",
          "Input size constraints: Small documents (≤700 words) yield overly concise summaries, while large documents (≥4000 words) show reduced quality and slower processing",
          "No adaptive compression based on document structure or content type",
          "Position weighting algorithm may not account for document genre variations"
        ],
        recommendations: "Implement adaptive compression ratios based on content analysis and document type classification."
      },
      errors: {
        title: "System Reliability Analysis",
        result: "CONCERNING",
        interpretation: "28% failure rate is unacceptably high for production use. Gemini API failures (18%) are the primary concern, followed by PDF processing issues (7%). This unreliability severely impacts user trust.",
        factors: [
          "No fallback mechanism when Gemini API fails",
          "PDF parsing library limitations with complex document formats",
          "Insufficient error handling and user feedback mechanisms",
          "No retry logic for transient network failures"
        ],
        recommendations: "Implement robust fallback systems, improve PDF parsing capabilities, and add comprehensive error recovery mechanisms."
      },
      effectiveness: {
        title: "Algorithm Effectiveness Evaluation",
        result: "BELOW EXPECTATIONS",
        interpretation: "All metrics score below 3.5/5, with completeness (2.6) and coverage (2.8) being particularly weak. The system captures relevant keywords but fails to maintain comprehensive content coverage.",
        factors: [
          "TF-IDF inherently ignores semantic relationships and context",
          "Aho-Corasick pattern matching is too rigid for natural language nuances - needs optimization for multi-keyword search and real-time highlighting",
          "Input size constraints significantly impact performance: optimal range is 700-2500 words",
          "No semantic similarity analysis for sentence selection",
          "Limited keyword extraction (15 keywords) may miss important concepts",
          "Integration between extractive (TF-IDF, Aho-Corasick) and abstractive (BART-Large-CNN) methods lacks coherence optimization"
        ],
        recommendations: "Integrate semantic embeddings (Word2Vec, BERT), increase keyword extraction range, and implement sentence similarity clustering."
      },
      ahocorasick: {
        title: "Aho-Corasick Multi-Keyword Optimization Analysis",
        result: "HIGH POTENTIAL",
        interpretation: "Optimization shows significant performance improvements (29-51%) across all scenarios. Multi-keyword search benefits most from optimization, with real-time highlighting showing 51% improvement potential.",
        factors: [
          "Current implementation processes keywords sequentially rather than in parallel",
          "Trie structure not optimized for multi-pattern matching",
          "Real-time highlighting requires additional DOM manipulation overhead",
          "No preprocessing of keyword patterns for common terms",
          "Memory allocation inefficiencies for large keyword sets"
        ],
        recommendations: "Implement parallel keyword processing, optimize trie construction, add keyword preprocessing cache, and use efficient DOM update strategies."
      },
      integration: {
        title: "Extractive-Abstractive Integration Analysis",
        result: "OPTIMIZATION NEEDED",
        interpretation: "Current integration performs below potential. Optimized integration could achieve 4.2/5 coherence vs current 2.9/5. The gap between individual methods and integration suggests poor coordination.",
        factors: [
          "Extractive and abstractive methods operate independently without coordination",
          "No semantic bridging between TF-IDF sentence selection and BART refinement",
          "Lack of coherence validation between extractive output and abstractive input",
          "BART model receives fragmented extractive output without context preservation",
          "No feedback loop to improve extractive selection based on abstractive results"
        ],
        recommendations: "Implement semantic coherence scoring, add context preservation mechanisms, create feedback loops between methods, and develop hybrid sentence selection criteria."
      },
      competitive: {
        title: "Competitive Analysis vs Leading AI Summarization Tools",
        result: "SIGNIFICANT GAP",
        interpretation: "Your system underperforms across all metrics. QuillBot leads with 4.8/5 speed and 4.2/5 efficiency. Your system's accuracy (3.2/5) and speed (2.8/5) lag significantly behind competitors.",
        factors: [
          "QuillBot processes documents in seconds vs your 2.8 seconds",
          "Competitors use optimized cloud infrastructure and caching",
          "Advanced NLP models (GPT-based) in commercial tools vs basic TF-IDF",
          "Professional UX/UI design vs basic interface",
          "Lack of adaptive algorithms that competitors employ"
        ],
        recommendations: "Focus on speed optimization, implement modern transformer models, improve user interface, and add adaptive summarization features to compete effectively."
      }
    };

    const data = interpretations[chartType];
    const resultColor = data.result === 'NEGATIVE' ? 'text-red-600' : 
                       data.result === 'MIXED' ? 'text-yellow-600' : 
                       data.result === 'CONCERNING' ? 'text-red-500' :
                       data.result === 'HIGH POTENTIAL' ? 'text-green-600' :
                       data.result === 'OPTIMIZATION NEEDED' ? 'text-orange-600' :
                       data.result === 'SIGNIFICANT GAP' ? 'text-red-600' :
                       'text-orange-600';

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{data.title}</h3>
        
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
          data.result === 'NEGATIVE' ? 'bg-red-100 text-red-700' :
          data.result === 'MIXED' ? 'bg-yellow-100 text-yellow-700' :
          data.result === 'CONCERNING' ? 'bg-red-100 text-red-700' :
          data.result === 'HIGH POTENTIAL' ? 'bg-green-100 text-green-700' :
          data.result === 'OPTIMIZATION NEEDED' ? 'bg-orange-100 text-orange-700' :
          data.result === 'SIGNIFICANT GAP' ? 'bg-red-100 text-red-700' :
          'bg-orange-100 text-orange-700'
        }`}>
          Result: {data.result}
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Interpretation:</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{data.interpretation}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Contributing Factors:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {data.factors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{data.recommendations}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Text Summarization System Performance Analysis
      </h1>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {[
          { key: 'timing', label: 'Processing Time' },
          { key: 'satisfaction', label: 'User Satisfaction' },
          { key: 'compression', label: 'Compression Analysis' },
          { key: 'errors', label: 'Error Analysis' },
          { key: 'effectiveness', label: 'Algorithm Effectiveness' },
          { key: 'ahocorasick', label: 'Aho-Corasick Optimization' },
          { key: 'integration', label: 'Integration Analysis' },
          { key: 'competitive', label: 'Competitive Comparison' }
        ].map((chart) => (
          <button
            key={chart.key}
            onClick={() => setActiveChart(chart.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeChart === chart.key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {chart.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activeChart === 'timing' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Algorithm Processing Time Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="algorithm" />
                <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}ms`, 'Processing Time']} />
                <Bar dataKey="time" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'satisfaction' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">User Satisfaction Metrics (1-5 Scale)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userSatisfactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis domain={[0, 5]} />
                <Tooltip formatter={(value) => [`${value}/5`, 'Score']} />
                <Bar dataKey="score" fill="#82ca9d">
                  {userSatisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score >= 4 ? '#10B981' : entry.score >= 3 ? '#F59E0B' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'compression' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Document Size vs Summary Compression</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={compressionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="docSize" label={{ value: 'Original Document Size (words)', position: 'insideBottom', offset: -10 }} />
                <YAxis dataKey="summarySize" label={{ value: 'Summary Size (words)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value, name) => name === 'summarySize' ? [`${value} words`, 'Summary Size'] : [`${value} words`, 'Document Size']} />
                <Scatter dataKey="summarySize" fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'errors' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">System Reliability & Error Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={errorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {errorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'effectiveness' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Algorithm Effectiveness Evaluation (1-5 Scale)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={keywordEffectivenessData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Effectiveness Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'ahocorasick' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Aho-Corasick Optimization Potential (Processing Time in ms)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ahoCorasickData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="feature" />
                <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value, name) => [`${value}ms`, name === 'currentTime' ? 'Current Time' : 'Optimized Time']} />
                <Bar dataKey="currentTime" fill="#EF4444" name="Current" />
                <Bar dataKey="optimizedTime" fill="#10B981" name="Optimized" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'integration' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Extractive-Abstractive Integration Performance (1-5 Scale)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={integrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis domain={[0, 5]} />
                <Tooltip formatter={(value, name) => [`${value}/5`, name.charAt(0).toUpperCase() + name.slice(1)]} />
                <Bar dataKey="coherence" fill="#8884d8" name="Coherence" />
                <Bar dataKey="readability" fill="#82ca9d" name="Readability" />
                <Bar dataKey="quality" fill="#ffc658" name="Quality" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'competitive' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Competitive Analysis vs AI Summarization Tools (1-5 Scale)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={competitiveData.map(item => ({
                tool: item.tool,
                Accuracy: item.accuracy,
                Speed: item.speed,
                Efficiency: item.efficiency
              }))}>
                <PolarGrid />
                <PolarAngleAxis dataKey="tool" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Briefos" dataKey="Accuracy" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} data={[competitiveData[0]]} />
                <Radar name="QuillBot" dataKey="Accuracy" stroke="#10B981" fill="#10B981" fillOpacity={0.3} data={[competitiveData[1]]} />
                <Radar name="TLDR This" dataKey="Accuracy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} data={[competitiveData[2]]} />
                <Radar name="Scribbr AI" dataKey="Accuracy" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} data={[competitiveData[3]]} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            
            {/* Detailed Comparison */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Detailed Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tool" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip formatter={(value, name) => [`${value}/5`, name]} />
                  <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy" />
                  <Bar dataKey="speed" fill="#82ca9d" name="Speed" />
                  <Bar dataKey="efficiency" fill="#ffc658" name="Efficiency" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Interpretation Section */}
        {renderInterpretation(activeChart)}
      </div>
    </div>
  );
};

export default SummarizationCharts;