import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, Title, Tooltip, Legend,
  RadialLinearScale
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, Title, Tooltip, Legend,
  RadialLinearScale
);

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-4">
    <div className="text-sm font-semibold text-gray-700 mb-2">{title}</div>
    {children}
  </div>
);

export default function ResultAnalysis({ analysis, extractiveSummary, finalSummary, referenceSummary }) {
  const { timings, counts, scores, heuristics, keywordsWithScores, sentencesPicked } = analysis;

  const timingData = useMemo(() => ({
    labels: ['TF-IDF', 'Aho-Corasick', 'Gemini'],
    datasets: [{
      label: 'Milliseconds',
      data: [timings.tfidfMs, timings.ahoMs, timings.geminiMs],
      borderWidth: 1
    }]
  }), [timings]);

  const metricsRadar = useMemo(() => {
    
    const hasRef = !!scores;
    const labels = hasRef
      ? ['ROUGE-1 F1 (Final)', 'ROUGE-L F1 (Final)', 'BLEU (Final)', 'Keyword Coverage (Final)', 'Compression Ratio']
      : ['Keyword Coverage (Final)', 'Compression Ratio'];

    const data = hasRef
      ? [
          (scores.final?.rouge1?.f1 ?? 0),
          (scores.final?.rougeL?.f1 ?? 0),
          (scores.final?.bleu ?? 0),
          (heuristics.keywordCoverage.final ?? 0),
          (heuristics.compressionRatio ?? 0)
        ]
      : [
          (heuristics.keywordCoverage.final ?? 0),
          (heuristics.compressionRatio ?? 0)
        ];

    return { labels, datasets: [{ label: 'Scores', data, borderWidth: 1 }] };
  }, [scores, heuristics]);

  return (
    <div className="grid grid-cols-1 gap-4">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Time">
          <div className="text-2xl font-bold">{timings.totalMs} ms</div>
          <div className="text-xs text-gray-500">TF-IDF {timings.tfidfMs} • Aho {timings.ahoMs} • Gemini {timings.geminiMs}</div>
        </Card>
        <Card title="Words (Input → Final)">
          <div className="text-2xl font-bold">{counts.inputWords} → {counts.finalWords}</div>
          <div className="text-xs text-gray-500">Extractive: {counts.extractiveWords} • Sentences picked: {counts.selectedSentences}</div>
        </Card>
        <Card title="Compression Ratio">
          <div className="text-2xl font-bold">{heuristics.compressionRatio}</div>
          <div className="text-xs text-gray-500">finalWords / inputWords</div>
        </Card>
        <Card title="Keyword Coverage (Final)">
          <div className="text-2xl font-bold">{heuristics.keywordCoverage.final}</div>
          <div className="text-xs text-gray-500">share of top keywords present</div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Stage Timing (ms)">
          <Bar data={timingData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </Card>
        <Card title="Evaluation / Heuristics">
          <Radar data={metricsRadar} options={{ responsive: true, scales: { r: { suggestedMax: 1 } } }} />
        </Card>
      </div>

      {scores && (
        <Card title="Reference-based Scores (higher is better)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Variant</th>
                  <th className="py-2 pr-4">ROUGE-1 F1</th>
                  <th className="py-2 pr-4">ROUGE-L F1</th>
                  <th className="py-2 pr-4">BLEU</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Extractive</td>
                  <td className="py-2 pr-4">{scores.extractive.rouge1.f1}</td>
                  <td className="py-2 pr-4">{scores.extractive.rougeL.f1}</td>
                  <td className="py-2 pr-4">{scores.extractive.bleu}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Final (Gemini)</td>
                  <td className="py-2 pr-4">{scores.final.rouge1.f1}</td>
                  <td className="py-2 pr-4">{scores.final.rougeL.f1}</td>
                  <td className="py-2 pr-4">{scores.final.bleu}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Keywords & Sentences picked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Top Keywords (with TF-IDF)">
          <ul className="max-h-60 overflow-y-auto text-sm">
            {keywordsWithScores.map(([w, s]) => (
              <li key={w} className="flex items-center justify-between border-b py-1">
                <span>{w}</span><span className="text-purple-600">{s.toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Sentences Picked (Extractive)">
          <ol className="list-decimal pl-5 max-h-60 overflow-y-auto text-sm">
            {sentencesPicked.map((s, i) => (
              <li key={i} className="py-1">{s.text}</li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Reference (if provided)">
          <textarea className="w-full border rounded-md p-2 text-sm min-h-[160px]" readOnly value={referenceSummary || '(none)'} />
        </Card>
        <Card title="Extractive Summary">
          <textarea className="w-full border rounded-md p-2 text-sm min-h-[160px]" readOnly value={extractiveSummary} />
        </Card>
        <Card title="Final (Gemini) Summary">
          <textarea className="w-full border rounded-md p-2 text-sm min-h-[160px]" readOnly value={finalSummary} />
        </Card>
      </div>
    </div>
  );
}
