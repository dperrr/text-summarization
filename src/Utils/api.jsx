import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = "";

const genAI = new GoogleGenerativeAI(API_KEY);

// function to ask Gemini
export async function askGemini(extractiveSummary) {

 const prompt = `Please create a concise and coherent summary from the following extractive summary. 
      The sentences were selected using TF-IDF and Aho-Corasick keyword matching algorithms. 
      Please:
      1. Maintain the key information and main ideas
      2. Improve flow and coherence between sentences
      3. Remove any redundancy while preserving important details
      4. Make it readable and well-structured
      5. Keep it concise but comprehensive
      6. And also don't and any text like heres the summary just return the summary and nothing else:
      
      Extractive Summary:
      ${extractiveSummary}
      
      Please provide a refined, coherent summary:`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}