
export async function askGemini(extractiveSummary) {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  extractiveSummary }),
  });
  const json = await res.json();
  return json.summary;
}