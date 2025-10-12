import { useEffect } from "react";

const sections = [
  "Introduction",
  "How It Works",
  "Features",
  "How to Use",
  "Example Use Cases",
  "FAQs",
  "Limitations",
  "Technologies And Algorithm Used",
  "Contact",
];

export default function Documentation() {
  useEffect(() => {
    document.title = "Documentation | AI Summarizer";
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen text-gray-800 font-sans overflow-x-hidden">

      <div className="absolute w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl top-[-80px] left-[-80px] z-0"></div>
      <div className="absolute w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl bottom-[10%] right-[-100px] z-0"></div>

      <aside className="z-10 md:w-1/4 bg-white/80 backdrop-blur shadow-lg p-6 sticky top-0 h-screen overflow-y-auto border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">📘 Docs Menu</h2>
        <nav className="space-y-3">
          {sections.map((sec) => (
            <a
              key={sec}
              href={`#${sec.replace(/\s+/g, "")}`}
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition duration-150"
            >
              {sec}
            </a>
          ))}
        </nav>
      </aside>


      <main className="relative z-10 md:w-3/4 p-10 space-y-16 bg-gradient-to-br from-white via-purple-50 to-white">
        {sections.map((sec) => (
          <Section key={sec} id={sec.replace(/\s+/g, "")} title={sec} />
        ))}
      </main>
    </div>
  );
}

function Section({ id, title }) {
  const content = getSectionContent(title);

  return (
    <section id={id} className="scroll-mt-24 relative z-10">
      <h3 className="text-3xl font-extrabold text-purple-700 mb-4 drop-shadow-sm">
        {title}
      </h3>
      <div className="text-gray-700 text-base leading-relaxed space-y-4">
        {content}
      </div>
      <div className="border-b border-gray-200 mt-8 opacity-60"></div>
    </section>
  );
}

function getSectionContent(title) {
  switch (title) {
    case "Introduction":
      return (
        <>
          <p>
            This AI-powered summarization tool blends intelligent keyword filtering (Aho-Corasick), scoring (TF-IDF), and natural language generation (GEMINI) to help users extract insights from large documents.
          </p>
          <Callout>
            Ideal for students, researchers, and to anyone who wants their text summarized.
          </Callout>
        </>
      );

    case "How It Works":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>TF-IDF:</strong> Scores sentence relevance.</li>
          <li><strong>Aho-Corasick:</strong> Filters documents using exact keyword matches.</li>
          <li><strong>Gemini:</strong> Generates a human-like summary from key sentences.</li>
        </ul>
      );

    case "Features":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Keyword filtering", "Hybrid summarization", "Paste or upload text", "Check Comparison of Extractive and Abstractive Summarization", "Show results of summarization"].map(f => (
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border border-purple-100">
              {f}
            </div>
          ))}
        </div>
      );

    case "How to Use":
      return (
        <ol className="list-decimal pl-6 space-y-2">
          <li>Upload or paste your document</li>
          <li>Enter relevant keywords (optional)</li>
          <li>Click <span className="font-semibold text-purple-600">"Summarize"</span></li>
          <li>View or copy your summary</li>
        </ol>
      );

    case "Example Use Cases":
      return (
        <ul className="list-disc pl-6">
          <li>Summarizing academic research</li>
          <li>Condensing legal documents</li>
          <li>Generating blog outlines</li>
          <li>Quick review of news reports</li>
        </ul>
      );

    case "FAQs":
      return (
        <>
          <p><strong>Q:</strong> What file types are supported?</p>
          <p><strong>A:</strong> .txt and .docx</p>
          <p><strong>Q:</strong> Is data stored?</p>
          <p><strong>A:</strong> No, it's processed temporarily and discarded.</p>
        </>
      );

    case "Limitations":
    return (
      <div className="space-y-4">
        <ul className="list-disc pl-6 space-y-2 text-justify">
          <li>
            <strong>Bias in Summarization Models:</strong> Although AI-powered
            models like Gemini improve contextual understanding, they may still
            generate biased or misleading summaries if trained on limited or
            biased datasets. Critical information may also be omitted if not
            fine-tuned properly.
          </li>

          <li>
            <strong>Scalability with Large Datasets:</strong> While summarization
            and search perform effectively on standard inputs, very large datasets
            may cause slower processing speeds and higher memory usage.
          </li>

          <li>
            <strong>Computational Resource Demands:</strong> The AI-based
            summarization requires substantial processing power, potentially
            reducing responsiveness on low-end devices or in
            resource-constrained environments.
          </li>

          <li>
            <strong>Dependence on Pre-Trained Models:</strong> The study relies on
            the pre-trained Gemini model, which may not generalize well to unseen
            domains unless further fine-tuning is applied.
          </li>

          <li>
            <strong>Language Limitation:</strong> The system currently supports
            only English text and does not handle multilingual inputs or
            translations.
          </li>

          <li>
            <strong>Limited Search Contextuality:</strong> The Aho-Corasick
            algorithm performs exact keyword matching and does not account for
            synonyms, user intent, or semantic variations.
          </li>

          <li>
            <strong>Lack of Session History:</strong> The system operates per
            session and does not retain a history of previous searches or
            summaries. This simplifies architecture but limits continuity.
          </li>

          <li>
            <strong>Input Size Constraints:</strong>
            <ul className="list-disc pl-6 mt-1">
              <li>
                Small documents (≤700 words) may yield overly concise summaries
                due to limited context.
              </li>
              <li>
                Medium documents (≤2500 words) perform optimally for both
                extractive and abstractive summarization.
              </li>
              <li>
                Large documents (≥2500 words) may result in reduced summarization
                quality or slower processing.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );


    case "Technologies And Algorithm Used":
      return (
        <ul className="list-disc pl-6">
          <li>Aho-Corasick – Fast keyword matching and Filtering</li>
          <li>TF-IDF – Sentence scoring</li>
          <li>Gemini – Abstractive summarization</li>
          <li>TailwindCSS + React – UI/UX</li>
        </ul>
      );

    case "Contact":
      return (
        <p>
          Got feedback or a bug report? Reach us at{" "}
          <a href="jasperdannn@gmail.com" className="text-purple-600 underline">
            jasperdannn@gmail.com
          </a>.
        </p>
      );

    default:
      return <p>Coming soon...</p>;
  }
}

function Callout({ children }) {
  return (
    <div className="border-l-4 border-purple-500 bg-purple-50 p-4 text-purple-800 rounded-md shadow-sm">
      {children}
    </div>
  );
}
