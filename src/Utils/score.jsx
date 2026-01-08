// ------------------------
// ROUGE UTILS
// ------------------------
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function getNGrams(tokens, n) {
  const ngrams = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(" "));
  }
  return ngrams;
}

function rougeN(reference, summary, n) {
  const ref = getNGrams(tokenize(reference), n);
  const sum = getNGrams(tokenize(summary), n);

  const refCount = {};
  ref.forEach(g => (refCount[g] = (refCount[g] || 0) + 1));

  let overlap = 0;
  sum.forEach(g => {
    if (refCount[g]) {
      overlap++;
      refCount[g]--;
    }
  });

  const precision = overlap / sum.length || 0;
  const recall = overlap / ref.length || 0;
  const f1 =
    precision + recall === 0
      ? 0
      : (2 * precision * recall) / (precision + recall);

  return { precision, recall, f1 };
}

function lcs(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

function rougeL(reference, summary) {
  const ref = tokenize(reference);
  const sum = tokenize(summary);

  const lcsVal = lcs(ref, sum);

  const precision = lcsVal / sum.length || 0;
  const recall = lcsVal / ref.length || 0;
  const f1 =
    precision + recall === 0
      ? 0
      : (2 * precision * recall) / (precision + recall);

  return { precision, recall, f1 };
}

// ------------------------
// FRONTEND ROUGE FUNCTION
// ------------------------
export function accScore(reference, abstractive) {
  console.log("REF LENGTH:", reference?.length);
  console.log("ABS LENGTH:", abstractive?.length);

  const rouge1 = rougeN(reference, abstractive, 1);
  const rouge2 = rougeN(reference, abstractive, 2);
  const rougel = rougeL(reference, abstractive);

  return {
    "rouge-1": rouge1,
    "rouge-2": rouge2,
    "rouge-l": rougel,
  };
}
