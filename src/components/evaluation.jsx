import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// --- Tokenizer
const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 0);

// --- BLEU (unigram + bigram)
const simpleBLEU = (candidate, reference) => {
  const cLen = candidate.length;
  const rLen = reference.length;

  const overlap1 = candidate.filter((w) => reference.includes(w)).length;
  const p1 = overlap1 / Math.max(1, cLen);

  const bigrams = (arr) =>
    arr.slice(0, -1).map((_, i) => arr[i] + " " + arr[i + 1]);
  const c2 = bigrams(candidate);
  const r2 = bigrams(reference);
  const overlap2 = c2.filter((bg) => r2.includes(bg)).length;
  const p2 = overlap2 / Math.max(1, c2.length);

  const prec = p1 > 0 && p2 > 0 ? Math.sqrt(p1 * p2) : 0;
  const bp = cLen > rLen ? 1 : Math.exp(1 - rLen / cLen);

  return bp * prec;
};

// --- ROUGE-L
const lcsLength = (a, b) => {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (a[i] === b[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  return dp[m][n];
};

const simpleROUGE = (candidate, reference) => {
  return lcsLength(candidate, reference) / reference.length;
};

// --- Evaluation Wrapper
export const evaluateSummaries = (results) => {
  const ref = tokenize(results.reference);
  const ext = tokenize(results.extractive);
  const abs = tokenize(results.abstractive);

  return {
    bleu: {
      extractive: simpleBLEU(ext, ref),
      abstractive: simpleBLEU(abs, ref),
    },
    rouge: {
      extractive: simpleROUGE(ext, ref),
      abstractive: simpleROUGE(abs, ref),
    },
    timings: results.timings,
    survey: results.survey || null,
  };
};

// --- Evaluation Component
const Evaluation = ({ metrics, onClose }) => {
  if (!metrics) return null;

  // --- Compute dynamic y-axis max for BLEU & ROUGE
  const scoreValues = [
    metrics.bleu.extractive,
    metrics.bleu.abstractive,
    metrics.rouge.extractive,
    metrics.rouge.abstractive,
  ];
  const scoreMax = Math.ceil(Math.max(...scoreValues) * 10) / 10;

  // --- Compute dynamic y-axis max for Timings
  const timingValues = [
    metrics.timings.tfidf,
    metrics.timings.aho,
    metrics.timings.gemini,
  ];
  const timingMax = Math.ceil(Math.max(...timingValues) / 50) * 50;

  // --- Compute dynamic y-axis max for Survey
  const surveyValues = metrics.survey
    ? [
        parseInt(metrics.survey.quality),
        parseInt(metrics.survey.readability),
        parseInt(metrics.survey.satisfaction),
      ]
    : [];
  const surveyMax = surveyValues.length
    ? Math.ceil(Math.max(...surveyValues))
    : 5;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-2xl shadow-lg p-6 max-w-5xl w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-700 hover:text-red-500 text-lg cursor-pointer"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          System Evaluation Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BLEU & ROUGE */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-gray-700 font-semibold mb-3">
              BLEU & ROUGE Scores
            </h3>
            <Bar
              data={{
                labels: [
                  "BLEU Extractive",
                  "BLEU Abstractive",
                  "ROUGE Extractive",
                  "ROUGE Abstractive",
                ],
                datasets: [
                  {
                    label: "Score",
                    data: scoreValues,
                    backgroundColor: "rgba(139, 92, 246, 0.7)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: scoreMax } },
              }}
            />
          </div>

          {/* Timings */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-gray-700 font-semibold mb-3">
              Execution Times (ms)
            </h3>
            <Bar
              data={{
                labels: ["TF-IDF", "Aho-Corasick", "Gemini"],
                datasets: [
                  {
                    label: "Time (ms)",
                    data: timingValues,
                    backgroundColor: "rgba(16, 185, 129, 0.7)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: timingMax } },
              }}
            />
          </div>

          {/* Survey Results */}
          {metrics.survey && (
            <div className="bg-gray-50 p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-gray-700 font-semibold mb-3">
                User Survey Feedback
              </h3>
              <Bar
                data={{
                  labels: ["Quality", "Readability", "Satisfaction"],
                  datasets: [
                    {
                      label: "Rating (1-5)",
                      data: surveyValues,
                      backgroundColor: "rgba(59, 130, 246, 0.7)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true, max: 5 } },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
