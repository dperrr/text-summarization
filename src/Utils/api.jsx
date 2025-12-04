

export async function askGemini(extractiveSummary) {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  extractiveSummary }),
  });
  const json = await res.json();
  return json.summary;
}

export async function structuredSummary(abstractiveSummary) {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/structured-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json "},
    body: JSON.stringify({ abstractiveSummary })
  });
  const json = await res.json()
  return json.structuredSummary;
}

export async function evaluate(text, abstractive) {
  console.log("Sending to backend:", { reference: text, abstractive });
  console.log("About to send:", abstractiveSummary.length);

  
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference: text, abstractive })
  });

  const data = await res.json();
  return data.scores;
}
