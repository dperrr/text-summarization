import React from 'react';

const SummarizationCharts = () => {
  const ahoDataLarge = [
    {
      id: 1,
      picture: "/charts/large-time-1.png",
      title: "Figure 2.7 Time Complexity vs Number of Keywords",
      interpretation:"Figure 2.7 presents the space requirements of the Standard Aho–Corasick algorithm compared with the optimized version. The vertical axis represents memory units in terms of trie nodes, while the horizontal axis distinguishes between the two approaches. The results show that the Standard AC required approximately 23,556 nodes, whereas the optimized version only required about 1,300 nodes. This corresponds to a reduction of nearly 94%. The reason for this drastic difference is that the Standard AC constructs a trie for the entire vocabulary (906 unique words), while the optimized approach restricts the trie to the top 50 most significant TF-IDF keywords. This demonstrates that optimization substantially improves space efficiency, which is critical for real-time text summarization where memory is often constrained.",
        xaxis: `X-axis: The two versions (Normal vs Improved).`,
      yaxis: `Y-axis: Memory required to store keywords.`,
      note: "A shorter bar means faster performance. The improved version finishes searching more quickly."
    },
    {
      id: 2,
      picture: "/charts/large-space-2.png",
      title: "Figure 2.8 Time Complexity vs Number of Keywords",
      interpretation:"Figure 2.8 compares the processing cost of the Standard AC and the optimized version in terms of proxy operations derived from the complexity formula O(n+m+z). The vertical axis represents the estimated number of operations, while the horizontal axis again shows the two approaches. For the large document with 19,420 characters, the Standard AC incurred approximately 20,526 operations, while the optimized AC required about 19,670. This represents a modest improvement of around 4%. The relatively small gain is expected, since the text length (n) dominates the overall complexity and remains constant in both cases. Nonetheless, the optimized approach never slower and slightly improves execution time, which confirms its practicality for real-time applications.",
      xaxis: `X-axis: The two versions (Normal vs Improved).`,
      yaxis: `Y-axis: Memory required to store keywords.`,
      note: "A lower bar means the improved version uses less memory while still being accurate."
    },
    {
      id: 3,
      picture: "/charts/large-tradeOff-3.png",
      title: "Figure 2.9 Time Complexity vs Number of Keywords",
      interpretation:"Figure 2.9 illustrates the relationship between the number of patterns and the corresponding time and space complexity. The horizontal axis shows the number of patterns, while the left vertical axis (blue) measures proxy operations for time complexity, and the right vertical axis (orange) measures the number of trie nodes for space complexity. The results reveal that as the number of patterns increases, the space complexity grows linearly, while the time complexity rises only slightly because text length remains the dominant factor. This demonstrates the trade-off inherent in multi-keyword search: while increasing the pattern set has limited impact on speed, it significantly increases memory requirements. Hence, prioritizing only the most relevant keywords ensures that the algorithm remains both efficient and scalable.",
            xaxis: `X-axis: Number of keywords.`,
      yaxis: `Y-axis: Speed and memory use.`,
      note: "As the number of keywords grows, both memory use and processing time increase. The improved version grows more slowly, showing it can handle more keywords efficiently."
    },
  ]
  const ahoDataMedium = [
    {
      id: 1,
      picture: "/charts/med-time-1.png",
      title: "Figure 2.4 Time Complexity vs Number of Keywords",
      interpretation: "Figure 1 presents the space requirements of the Standard Aho–Corasick algorithm compared with the optimized version. The vertical axis represents memory units in terms of trie nodes, while the horizontal axis distinguishes between the two approaches. The results show that the Standard AC required approximately 17,420 nodes, whereas the optimized version only required about 1,300 nodes. This corresponds to a reduction of nearly 92.5%. The reason for this significant difference is that the Standard AC constructs a trie for the entire vocabulary (670 unique words), while the optimized approach restricts the trie to the top 50 most significant TF–IDF keywords. This demonstrates that optimization substantially improves space efficiency, which is critical for real-time text summarization where memory resources are often limited.",
       xaxis: `X-axis: The two versions (Normal vs Improved).`,
      yaxis: `Y-axis: Memory required to store keywords.`,
      note: "A shorter bar means faster performance. The improved version finishes searching more quickly."
    },
    {
      id: 2,
      picture: "/charts/med-time-2.png",
      title: "Figure 2.5: Time Complexity Comparison",
      interpretation: "Figure 2.5 compares the processing cost of the Standard AC and the optimized version in terms of proxy operations derived from the complexity formula O(n+m+z). The vertical axis represents the estimated number of operations, while the horizontal axis again shows the two approaches. For the medium document with 10,915 characters, the Standard AC incurred approximately 11,785 operations, while the optimized AC required about 11,165. This represents a modest improvement of around 5.26%. The relatively small gain is expected, since the text length (nnn) dominates the overall complexity and remains constant in both cases. Nonetheless, the optimized approach is never slower and consistently reduces processing cost, confirming its practicality for real-time applications.",
       xaxis: `X-axis: The two versions (Normal vs Improved).`,
      yaxis: `Y-axis: Memory required to store keywords.`,
      note: "A lower bar means the improved version uses less memory while still being accurate."
    },
    {
      id: 3,
      picture: "/charts/med-time-3.png",
      title: "Figure 2.6 Trade-off Between Time and Space Complexity",
      interpretation: "Figure 2.6 illustrates the relationship between the number of patterns and the corresponding time and space complexity. The horizontal axis shows the number of patterns, while the left vertical axis (blue) measures proxy operations for time complexity, and the right vertical axis (orange) measures the number of trie nodes for space complexity. The results reveal that as the number of patterns increases, the space complexity grows linearly, while the time complexity rises only slightly because text length remains the dominant factor. This demonstrates the trade-off inherent in multi-keyword search, while expanding the pattern set has limited impact on execution time, it significantly increases memory requirements. By restricting the trie to only the most relevant keywords, the optimized approach achieves scalability without sacrificing performance.",
      xaxis: `X-axis: Number of keywords.`,
      yaxis: `Y-axis: Speed and memory use.`,
      note: "As the number of keywords grows, both memory use and processing time increase. The improved version grows more slowly, showing it can handle more keywords efficiently."
    },
    
  ]
  const ahoDataSmall = [
    {
      id: 1,
      picture: "/charts/small-time-1.png",
      title: "Figure 2.1 Time Complexity vs Number of Keywords",
      interpretation: "Figure 2.1 compares the space requirements of the Standard Aho–Corasick algorithm and its optimized version. The vertical axis represents memory units in terms of trie nodes, while the horizontal axis distinguishes the two approaches. The Standard AC required approximately 7,930 nodes, while the optimized version only needed about 1,300 nodes. This corresponds to an 83.61% reduction in memory usage. The reduction is achieved by restricting the trie construction to only the top 50 TF–IDF keywords instead of the full 305-word vocabulary. This result highlights that the optimized AC dramatically improves space efficiency, which is crucial for real-time applications where memory resources are limited.",
      xaxis: `X-axis: The two versions (Normal vs Improved).`,
      yaxis: `Y-axis: Memory required to store keywords.`,
      note: "A shorter bar means faster performance. The improved version finishes searching more quickly."
    },
    {
      id: 2,
      picture: "/charts/small-space-2.png",
      title: "Figure 2.2 Space Complexity vs Number of Keywords",
      interpretation: "Figure 2.2 shows the processing cost of Standard AC versus the optimized version based on the complexity formula O(n+m+z). The vertical axis represents the estimated number of operations, while the horizontal axis differentiates the two approaches. For the small document of 4,577 characters, the Standard AC incurred about 5,082 operations, while the optimized AC required approximately 4,827 operations. This translates to a 5.02% reduction in processing cost. Although the improvement is modest, it confirms that the optimized AC consistently reduces runtime workload without introducing additional overhead. The smaller gain in time compared to space is expected since the text length (n) dominates the overall complexity.",
      xaxis: `X-axis: The two versions (Normal vs Improved).`,
      yaxis: `Y-axis: Memory required to store keywords.`,
      note: "A lower bar means the improved version uses less memory while still being accurate."
    },
    {
      id: 3,
      picture: "/charts/small-tradeoff-3.png",
      title: "Figure 2.3 Trade-off Between Time and Space Complexity",
      interpretation: "Figure 2.3 illustrates the relationship between the number of patterns and both time and space complexity. The horizontal axis shows the number of patterns, while the left vertical axis (blue) represents proxy operations for time complexity, and the right vertical axis (orange) represents the number of trie nodes. The graph demonstrates that space complexity grows linearly with the number of patterns, while time complexity increases only slightly, as the text length remains the dominant factor. This trade-off shows that expanding the pattern set has minimal impact on runtime but significantly increases memory consumption. By restricting the trie to only the most relevant keywords, the optimized AC achieves scalability and efficiency.",
      xaxis: `X-axis: Number of keywords.`,
      yaxis: `Y-axis: Speed and memory use.`,
      note: "As the number of keywords grows, both memory use and processing time increase. The improved version grows more slowly, showing it can handle more keywords efficiently."
    }
  ]
  const dataForLarge = [
    {
      id: 1,
      picture: "/charts/large-1.png",
      title: "Figure 1.9 score Distribution – Large Document",
      interpretation: "The histogram illustrates the distribution of importance scores for all 260 sentences in the large document. The scores cluster around the mean value of 2.45 with a standard deviation of 1.22, indicating moderate variability. Most sentences fall between 1.5–3.5, while only a few receive very high scores (above 5.0), including the top-ranked sentence (Score: 8.14). This distribution reflects TF-IDF’s capacity to assign higher weights only to sentences containing statistically significant terms, ensuring that the majority contribute context while only select sentences emerge as central for summarization.",
      xaxis: `X-axis: Sentence importance score (TF-IDF weighted value)`,
      yaxis: `Y-axis: Number of sentences`
    },
    {
      id: 2,
      picture: "/charts/large-2.png",
      title: "Figure 1.10 Sentence Importance Scores",
      interpretation: "This figure maps the relative importance of each sentence across the document, with red markers highlighting those chosen for the summary. Peaks in importance coincide with sentences covering critical themes, such as global income categories (Sentence 108, Score: 8.14), COVID-19 responses (Sentence 61, Score: 4.74), and literature on Trade Promotion Organizations (Sentence 7, Score: 4.90). The strong alignment of summary sentences with these peaks demonstrates TF-IDF’s reliability in identifying thematically central content. These findings confirm that TF-IDF prioritizes both conceptual frameworks and empirical insights, ensuring coverage of theoretical and applied discussions.",
      xaxis: `X-axis: Sentence index`,
      yaxis: `Y-axis: Normalized importance score`
    },
    {
      id: 3,
      picture: "/charts/large-1-3.png",
      title: "Figure 1.11 Top 10 Words by TF-IDF", 
      interpretation: "The top keywords (e.g., “tpos,” “income,” “countries,” “covid,” “percent”) emphasize the document’s focus on trade promotion organizations (TPOs), global economic classifications, and pandemic-related impacts. These domain-specific terms, drawn from a vocabulary reduced to 756 meaningful words after stopword removal, highlight TF-IDF’s ability to extract semantically relevant features. With 87.0% vocabulary coverage in the summary, the method successfully retains the majority of the document’s conceptual lexicon, ensuring that its thematic integrity remains intact.",
            xaxis: `X-axis: TF-IDF score of each word`,
            yaxis: `Y-axis: Top 10 words ranked by importance`

    },
    {
      id: 4,
      picture: "/charts/large-1-4.png",
      title: "Figure 1.12 Sentence Length vs Importance",
      interpretation: "The chart shows that longer sentences tend to be picked as more important for summaries. This is because they usually hold more information. However, this can sometimes overlook short but meaningful sentences. This means the method works well but may need extra steps to balance long and short sentences fairly.",
      xaxis: `X-axis: Sentence length (in characters)`,
      yaxis: `Y-axis: TF-IDF importance score`
    }
  ]
  const dataForMedium = [
    {
      id: 1,
      picture: "/charts/med-2-1.png",
      title: "Figure 1.5 Score Distribution – Medium Document",
      interpretation: "The histogram displays the distribution of importance scores assigned to all 99 sentences in the medium document. The majority of sentences cluster around a mean score of 3.03 with a standard deviation of 0.66, indicating that most sentences hold moderate informational value. Only a limited number of sentences exceed a score of 4.0, which highlights their heightened significance in conveying the document’s core themes. This distribution demonstrates TF-IDF’s ability to distinguish between sentences of central importance and those of peripheral relevance, thereby providing a foundation for accurate extractive summarization.",
      xaxis: `X-axis: Sentence importance score (TF-IDF weighted value)`,
      yaxis: `Y-axis: Number of sentences`
    },
    {
      id: 2,
      picture: "/charts/med-2-2.png",
      title: "Figure 1.6 Sentence Importance Scores",
      interpretation: "The bar chart presents sentence importance across the document, with red markers indicating the 40 sentences included in the summary (40%). The alignment of red markers with the score peaks reflects TF-IDF’s effectiveness in capturing thematically rich segments. For instance, the highest-ranked sentence (Index 59, Score: 4.77) pertains to the corporate project “Erebus,” a central element of the narrative. This alignment demonstrates that the extractive process is not arbitrary; rather, it systematically identifies sentences that encapsulate critical information, ensuring the summary retains fidelity to the original document’s key ideas.",
      xaxis: `X-axis: Sentence index`,
      yaxis: `Y-axis: Normalized importance score`
    },
    {
      id: 3,
      picture: "/charts/med-2-3.png",
      title: "Figure 1.7 Top 10 Words by TF-IDF",
      interpretation: "This figure highlights the most statistically significant terms within the document, including Kael, Erebus, Horizon, life, humanity, and freedom. These terms align closely with the document’s dominant themes of resistance, survival, and societal control, confirming that the TF-IDF process effectively prioritizes semantically meaningful vocabulary. Preprocessing steps such as comprehensive stopword removal, normalization, and filtering of short tokens reduced the vocabulary to 670 unique terms, thereby increasing focus on relevant content. The summary sentences achieved 63.3% vocabulary coverage, which confirms that key thematic elements were preserved despite document compression.",
      xaxis: `X-axis: TF-IDF score of each word`,
      yaxis: `Y-axis: Top 10 words ranked by importance`
    },
    {
      id: 4,
      picture: "/charts/med-2-4.png",
      title: "Figure 1.8 Sentence Length vs Importance",
      interpretation: "The scatter plot illustrates a strong positive correlation (r = 0.924) between sentence length and TF-IDF importance score, indicating that longer sentences are frequently assigned higher importance. While this relationship supports the notion that extended sentences contain greater informational density, it also reveals a methodological limitation: shorter yet contextually significant sentences may be underweighted. This potential bias suggests that TF-IDF, while effective in capturing information rich passages, may require supplementary methods to balance sentence selection and improve summarization quality.",
      xaxis: `X-axis: Sentence length (in characters)`,
      yaxis: `Y-axis: TF-IDF importance score`
    }
  ]

  const dataForSmall = [
    {
      id: 1,
      picture: "/charts/small-1-1.png",
      title: "Figure 1.1 Score Distribution",
      interpretation:
        "The histogram shows a right-skewed distribution with most sentences clustering around scores of 2.5-3.0, and fewer sentences achieving high importance scores (3.5-4.0). This indicates that the document contains a mix of supporting content with relatively few highly information-dense sentences, which is typical for academic texts that build arguments progressively.",
      xaxis: "X-axis: Sentence importance score (TF-IDF weighted value)",
      yaxis: "Y-axis: Number of sentences"
    },
    {
      id: 2,
      picture: "/charts/small-1-2.png",
      title: "Figure 1.2 Sentence Importance Scores",
      interpretation:
        "The selected sentences (red circles) are distributed throughout the document rather than clustered in one section, indicating well-balanced information distribution. Peak scores appear around sentences 5, 12, 20, 25, and 32, suggesting key information is spread across introduction, body, and conclusion sections, which reflects good academic writing structure.",
      xaxis: `X-axis: Sentence index`,
      yaxis: `Y-axis: Normalized importance score`
    },
    {
      id: 3,
      picture: "/charts/small-1-3.png",
      title: "Figure 1.3 Top 10 Words By TF-IDF",
      interpretation:
        'The top words - "data," "student," "learning," "systems," "education," "educational" - accurately reflect the document\'s focus on AI in education. The dominance of domain-specific terms like "feedback," "students," and "teachers" demonstrates that TF-IDF successfully identifies the core thematic vocabulary, validating its effectiveness for this educational technology topic.',
      xaxis: `X-axis: TF-IDF score of each word`,
      yaxis: `Y-axis: Top 10 words ranked by importance`

    },
    {
      id: 4,
      picture: "/charts/small-1-4.png",
      title: "Figure 1.4 Sentence Length vs Importance",
      interpretation:
        "The strong positive correlation (r = 0.895) indicates that longer sentences in this document tend to contain more important information. This suggests the author uses detailed, comprehensive sentences to convey key concepts about AI in education, which is consistent with academic writing style where complex ideas require elaborate explanation.",
      xaxis: `X-axis: Sentence length (in characters)`,
      yaxis: `Y-axis: TF-IDF importance score`
    },
  ];

  return (
    <div className="p-6 mt-20 mx-auto max-w-7xl">
      <h2 className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Results and Interpretation</h2>
     {/* SOP1 Legend */}
<div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow-sm mb-6">
  <h2 className="text-lg font-semibold text-blue-700 mb-2">
    SOP1 – TF-IDF Key Sentence Extraction
  </h2>
  <p className="text-sm text-gray-700 mb-4">
    This section introduces how TF-IDF can be used to extract key sentences 
    while maintaining summarization accuracy. Figures explain score distribution, 
    sentence importance, top words, and correlation between sentence length 
    and importance.
  </p>

  <div className="space-y-3 text-sm text-gray-700">
    <div>
      <span className="font-semibold text-blue-800">Figure 1 – Score Distribution:</span>
      <p>
        <strong>Where:</strong><br />
        X-axis: Sentence importance score (TF-IDF weighted value)<br />
        Y-axis: Number of sentences
      </p>
      <p>
        This chart shows how important each sentence is based on TF-IDF scores. 
        It helps visualize which sentences are average, less important, or highly important.
      </p>
    </div>

    <div>
      <span className="font-semibold text-blue-800">Figure 2 – Sentence Importance Scores:</span>
      <p>
        <strong>Where:</strong><br />
        X-axis: Sentence index<br />
        Y-axis: Normalized importance score
      </p>
      <p>
        This figure plots sentence importance across the document. Sentences 
        chosen for the summary are marked, showing how the system selects the 
        most relevant ones.
      </p>
    </div>

    <div>
      <span className="font-semibold text-blue-800">Figure 3 – Top 10 Words by TF-IDF:</span>
      <p>
        <strong>Where:</strong><br />
        X-axis: TF-IDF score of each word<br />
        Y-axis: Top 10 words ranked by importance
      </p>
      <p>
        This chart highlights the top 10 most significant words. These words 
        represent the main themes or topics of the document and explain why 
        certain sentences are ranked higher.
      </p>
    </div>

    <div>
      <span className="font-semibold text-blue-800">Figure 4 – Sentence Length vs Importance:</span>
      <p>
        <strong>Where:</strong><br />
        X-axis: Sentence length (in characters)<br />
        Y-axis: TF-IDF importance score
      </p>
      <p>
        The scatter plot illustrates the relationship between sentence length 
        and importance. A high correlation means longer sentences often carry 
        more important information. Dots = individual sentences.
      </p>
    </div>
  </div>
    <details  className="bg-gray-50 rounded-2xl shadow-md p-4 mt-5">
        <summary className="cursor-pointer text-xl font-bold text-blue-700 mb-4">
          TF-IDF Utilization in Text Summarization
        </summary>

        {/* Small Documents Section */}
        <h2 className="text-2xl font-semibold text-center mb-6">Small Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {dataForSmall.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
              <img src={item.picture} alt={item.title} className="w-full h-64 object-contain rounded-lg mb-3" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm text-justify mb-2">{item.interpretation}</p>
              <div className='text-xs font-bold text-gray-900 italic mt-auto'>
                {item.xaxis && <p>{item.xaxis}</p>}
                {item.yaxis && <p>{item.yaxis}</p>}
              </div>
            </div>
          ))}
        </div>
        {/* Evaluation Small */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Evaluation (Small Documents)</h3>
          <p className="text-gray-700 text-sm text-justify">
            Based on the analysis of three small documents (561-619 words), TF-IDF demonstrates remarkable effectiveness in extracting key sentences while maintaining summarization accuracy. The results show that TF-IDF successfully identifies domain-specific terminology across different fields. The strong positive correlations between sentence length and importance (r = 0.895, 0.957, 0.950) indicate that TF-IDF effectively captures information density, where longer, more detailed sentences contain proportionally more important content. Sentence selection patterns reveal that TF-IDF maintains document structure integrity by distributing selected sentences across sections, preserving argumentative flow and contextual coherence.
          </p>
        </div>

        {/* Medium Documents Section */}
        <h2 className="text-2xl font-semibold text-center mt-12 mb-6">Medium Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {dataForMedium.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
              <img src={item.picture} alt={item.title} className="w-full h-64 object-contain rounded-lg mb-3" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm text-justify mb-2">{item.interpretation}</p>
              <div className='text-xs font-bold text-gray-900 italic mt-auto'>
                {item.xaxis && <p>{item.xaxis}</p>}
                {item.yaxis && <p>{item.yaxis}</p>}
              </div>
            </div>
          ))}
        </div>
        {/* Evaluation Medium */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation (Medium Documents)</h3>
          <p className="text-gray-700 text-sm text-justify">
            The results demonstrate that TF-IDF can be effectively applied to extract key sentences based on statistical word importance while maintaining summarization accuracy. In this medium-sized document, the method achieved a 45.5% compression ratio while preserving 63.3% of the vocabulary coverage, thereby retaining the majority of the text’s central ideas. The alignment between high-scoring sentences and the extractive summary confirms that the approach systematically prioritizes thematically significant content. Furthermore, the identification of core terms (Kael, Erebus, Horizon, humanity, freedom) underscores the method’s ability to capture the document’s main themes.
            However, the observed correlation between sentence length and importance highlights a limitation, wherein longer sentences may be disproportionately favored. Despite this, TF-IDF proved to be a scalable, interpretable, and statistically robust technique for summarizing medium-length documents. These findings directly address SOP 1 by illustrating how TF-IDF leverages statistical word importance to extract meaningful content, while preprocessing enhancements and vocabulary coverage metrics ensure that summarization accuracy is maintained.

          </p>
        </div>
        {/* Large Documents Section */}
        <h2 className="text-2xl font-semibold text-center mt-12 mb-6">Large Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {dataForLarge.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
              <img src={item.picture} alt={item.title} className="w-full h-64 object-contain rounded-lg mb-3" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm text-justify mb-2">{item.interpretation}</p>
              <div className='text-xs font-bold text-gray-900 italic mt-auto'>
                {item.xaxis && <p>{item.xaxis}</p>}
                {item.yaxis && <p>{item.yaxis}</p>}
              </div>
            </div>
          ))}
        </div>
        {/* Evaluation Medium */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation (Large Document)</h3>
          <p className="text-gray-700 text-sm text-justify">
            For large documents (≈2500 - 4500 words), TF-IDF scaled effectively, reducing the text by 28.5% while retaining 87.0% vocabulary coverage. High-value peaks in sentence scores corresponded to theoretical and empirical discussions, and top-ranked domain keywords reflected the document’s thematic structure. While sentence length again showed a strong correlation with importance, the method preserved essential content across extensive text sizes. Taken together, these findings confirm that TF-IDF is a scalable, interpretable, and statistically robust approach to extractive summarization. By ranking sentences through statistical word weighting and ensuring high vocabulary coverage, TF-IDF maintains accuracy across varying document sizes and domains. This directly answers by showing that TF-IDF effectively leverages word importance to identify thematically central content while preserving summarization quality and adaptability.

          </p>
        </div>
                {/* Overall Evaluation Section */}
        <div className="mt-12 p-6 bg-purple-50 border border-purple-200 rounded-2xl">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
            Overall Evaluation (Across Document Sizes)
          </h2>
          <p className="text-gray-700 text-sm text-justify mb-6">
            Across small, medium, and large documents, the analyses consistently 
            demonstrate that TF-IDF can be effectively utilized to extract key 
            sentences based on statistical word importance while maintaining 
            summarization accuracy. For small documents (561–650 words), TF-IDF 
            successfully captured domain-specific terminology and distributed 
            selected sentences across the text, ensuring thematic coherence and 
            argumentative flow. In medium documents (≈1500 - 2500 words), TF-IDF 
            achieved a balance between compression (45.5%) and vocabulary 
            retention (63.3%), effectively prioritizing sentences tied to the 
            document’s central themes. For large documents (≈2500 - 4500 words), TF-IDF 
            scaled effectively, reducing the text by 28.5% while retaining 87.0% 
            vocabulary coverage. Despite the recurring correlation between 
            sentence length and importance, TF-IDF remains a scalable, 
            interpretable, and statistically robust approach to extractive 
            summarization across diverse document sizes and domains.
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-purple-100 text-purple-900">
                <tr>
                  <th className="border px-4 py-2 text-left">Metric</th>
                  <th className="border px-4 py-2 text-left">Small (561–650 words)</th>
                  <th className="border px-4 py-2 text-left">Medium (1500 - 2500 words)</th>
                  <th className="border px-4 py-2 text-left">Large (2500 - 4500 words)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Total Sentences</td>
                  <td className="border px-4 py-2">Varies (short texts)</td>
                  <td className="border px-4 py-2">67</td>
                  <td className="border px-4 py-2">260</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Compression Ratio</td>
                  <td className="border px-4 py-2">Varies by doc (precise extractions)</td>
                  <td className="border px-4 py-2">45.5%</td>
                  <td className="border px-4 py-2">28.5%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Vocabulary Coverage</td>
                  <td className="border px-4 py-2">High, domain-specific</td>
                  <td className="border px-4 py-2">63.3%</td>
                  <td className="border px-4 py-2">87.0%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Sentence Distribution</td>
                  <td className="border px-4 py-2">
                    Spread throughout document (preserves structure & flow)
                  </td>
                  <td className="border px-4 py-2">
                    High-scoring sentences aligned with theoretical frameworks
                  </td>
                  <td className="border px-4 py-2">
                    Peaks capture theoretical & empirical themes
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Correlation (Sentence Length vs Importance)
                  </td>
                  <td className="border px-4 py-2">0.895 – 0.957 (strong)</td>
                  <td className="border px-4 py-2">Moderate positive correlation</td>
                  <td className="border px-4 py-2">0.898 (very strong)</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Strengths</td>
                  <td className="border px-4 py-2">
                    Adapts across domains & styles; maintains coherence
                  </td>
                  <td className="border px-4 py-2">
                    Prioritizes conceptually central content
                  </td>
                  <td className="border px-4 py-2">
                    Scales well; preserves thematic breadth & vocabulary
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Limitations</td>
                  <td className="border px-4 py-2">
                    May favor longer, info-rich sentences
                  </td>
                  <td className="border px-4 py-2">Sentence length bias</td>
                  <td className="border px-4 py-2">
                    Strong length bias; longer sentences dominate importance
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </details>
</div>




      {/* SOP2 Legend */}
<div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg shadow-sm mb-6 mt-5">
  <h2 className="text-lg font-semibold text-green-700 mb-2">
    SOP2 – Comparison with Existing Summarization Tools
  </h2>
  <p className="text-sm text-gray-700 mb-4">
    This section compares the proposed system with existing AI-based text 
    summarization tools in terms of <strong>accuracy</strong>, 
    <strong>processing speed</strong>, and <strong>computational efficiency</strong>. 
    The following metrics are used to evaluate performance:
  </p>

  <div className="space-y-3 text-sm text-gray-700">
    <div>
      <span className="font-semibold text-green-800">1. ROUGE-1</span>
      <p><strong>What it measures:</strong> Overlap of unigrams (single words) with the reference.</p>
      <p><strong>How it’s calculated:</strong> Precision, recall, and F1-score for matching words.</p>
      <p><strong>Interpretation:</strong> Higher = more key words captured from reference.</p>
    </div>

    <div>
      <span className="font-semibold text-green-800">2. ROUGE-2</span>
      <p><strong>What it measures:</strong> Overlap of bigrams (two-word sequences).</p>
      <p><strong>How it’s calculated:</strong> Same as ROUGE-1 but for word pairs.</p>
      <p><strong>Interpretation:</strong> Higher = better phrase-level accuracy and fluency.</p>
    </div>

    <div>
      <span className="font-semibold text-green-800">3. ROUGE-L</span>
      <p><strong>What it measures:</strong> Longest Common Subsequence (LCS).</p>
      <p><strong>How it’s calculated:</strong> Finds longest ordered word sequence in both summaries.</p>
      <p><strong>Interpretation:</strong> Higher = preserves structure and logical flow.</p>
    </div>

    <div>
      <span className="font-semibold text-green-800">4. BLEU</span>
      <p><strong>What it measures:</strong> Precision-based score for n-grams (1–4 words).</p>
      <p><strong>How it’s calculated:</strong> Modified precision + brevity penalty.</p>
      <p><strong>Interpretation:</strong> Higher = generated summary uses similar wording/phrases.</p>
    </div>

    <div>
      <span className="font-semibold text-green-800">5. Avg Latency (s/doc)</span>
      <p><strong>What it measures:</strong> Average summarization time per document.</p>
      <p><strong>How it’s calculated:</strong> Total time ÷ number of documents.</p>
      <p><strong>Interpretation:</strong> Lower = faster summarization (good for real-time use).</p>
    </div>

    <div>
      <span className="font-semibold text-green-800">6. Throughput (docs/s)</span>
      <p><strong>What it measures:</strong> Number of documents processed per second.</p>
      <p><strong>How it’s calculated:</strong> Documents ÷ total time.</p>
      <p><strong>Interpretation:</strong> Higher = better for bulk summarization tasks.</p>
    </div>

    <div>
      <span className="font-semibold text-green-800">7. Tokens/sec</span>
      <p><strong>What it measures:</strong> Tokens (words/subwords) processed per second.</p>
      <p><strong>How it’s calculated:</strong> Total tokens ÷ processing time.</p>
      <p><strong>Interpretation:</strong> Higher = more efficient on longer documents.</p>
    </div>
  </div>
  <details  className="bg-gray-50 rounded-2xl shadow-md p-4 mt-5">
        <summary className="cursor-pointer text-xl font-bold text-green-800 mb-4">
          Comparison to existing AI-based text summarization tools in terms of accuracy, efficiency, and scalability
        </summary>
         {/* Small Documents */}
        <h2 className="text-2xl font-semibold text-center mb-6">Small Documents</h2>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="border px-4 py-2 text-left">Tool / System</th>
                <th className="border px-4 py-2 text-left">ROUGE-1</th>
                <th className="border px-4 py-2 text-left">ROUGE-2</th>
                <th className="border px-4 py-2 text-left">ROUGE-L</th>
                <th className="border px-4 py-2 text-left">BLEU</th>
                <th className="border px-4 py-2 text-left">Avg Latency (s/doc)</th>
                <th className="border px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">TextSense</td>
                <td className="border px-4 py-2">0.6837</td>
                <td className="border px-4 py-2">0.4215</td>
                <td className="border px-4 py-2">0.6203</td>
                <td className="border px-4 py-2">0.2565</td>
                <td className="border px-4 py-2">1.24</td>
                <td className="border px-4 py-2">Balanced accuracy + efficiency</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">PEGASUS (XSum / CNN-DM)</td>
                <td className="border px-4 py-2">~0.45–0.47</td>
                <td className="border px-4 py-2">~0.20–0.22</td>
                <td className="border px-4 py-2">~0.42</td>
                <td className="border px-4 py-2">~0.21</td>
                <td className="border px-4 py-2">~2–3</td>
                <td className="border px-4 py-2">Very abstractive, more compute</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">T5-base summarizer</td>
                <td className="border px-4 py-2">~0.40–0.43</td>
                <td className="border px-4 py-2">~0.18–0.21</td>
                <td className="border px-4 py-2">~0.39</td>
                <td className="border px-4 py-2">~0.18</td>
                <td className="border px-4 py-2">~1.5</td>
                <td className="border px-4 py-2">Lightweight, faster than PEGASUS</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Extractive</td>
                <td className="border px-4 py-2">~0.30</td>
                <td className="border px-4 py-2">~0.10</td>
                <td className="border px-4 py-2">~0.25</td>
                <td className="border px-4 py-2">~0.12</td>
                <td className="border px-4 py-2">~0.5</td>
                <td className="border px-4 py-2">Very fast, but low accuracy</td>
              </tr>
            </tbody>
          </table>
          <h2 className='text-lg font-semibold text-gray-800 mb-2 text-center'>Table 1. (Small Documents Ranging from 650-550 words)</h2>
        </div>
        {/* Evaluation Small */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation (Small Documents Ranging from 650-550 words)</h3>
          <p className="text-gray-700 text-sm text-justify">
            For small documents, the proposed system (TextSense) achieved the highest accuracy across all tools, with ROUGE-1 at 0.6837 and BLEU at 0.2565, outperforming abstractive baselines like PEGASUS. This suggests that TextSense excels at condensing shorter texts while maintaining coherence and relevance. In terms of speed, its latency of 1.24s/doc is competitive, being faster than PEGASUS but slightly slower than the extractive TextRank. Overall, the system demonstrates a balanced trade-off between accuracy and efficiency for short inputs.

          </p>
        </div>

        <div className="overflow-x-auto mt-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Medium Documents</h2>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="border px-4 py-2 text-left">Tool / System</th>
                <th className="border px-4 py-2 text-left">ROUGE-1</th>
                <th className="border px-4 py-2 text-left">ROUGE-2</th>
                <th className="border px-4 py-2 text-left">ROUGE-L</th>
                <th className="border px-4 py-2 text-left">BLEU</th>
                <th className="border px-4 py-2 text-left">Latency (s/doc)</th>
                <th className="border px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">TextSense</td>
                <td className="border px-4 py-2">0.5123</td>
                <td className="border px-4 py-2">0.2483</td>
                <td className="border px-4 py-2">0.3522</td>
                <td className="border px-4 py-2">0.0486</td>
                <td className="border px-4 py-2">3.20</td>
                <td className="border px-4 py-2">Strong on short docs, accuracy dips on longer text</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">PEGASUS</td>
                <td className="border px-4 py-2">~0.46–0.48</td>
                <td className="border px-4 py-2">~0.22–0.24</td>
                <td className="border px-4 py-2">~0.42</td>
                <td className="border px-4 py-2">~0.21</td>
                <td className="border px-4 py-2">3–4</td>
                <td className="border px-4 py-2">Higher abstractive power, slower</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">T5-base</td>
                <td className="border px-4 py-2">~0.41–0.44</td>
                <td className="border px-4 py-2">~0.18–0.21</td>
                <td className="border px-4 py-2">~0.39</td>
                <td className="border px-4 py-2">~0.18</td>
                <td className="border px-4 py-2">2–3</td>
                <td className="border px-4 py-2">Weaker accuracy but lightweight</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">TextRank</td>
                <td className="border px-4 py-2">~0.30</td>
                <td className="border px-4 py-2">~0.10</td>
                <td className="border px-4 py-2">~0.25</td>
                <td className="border px-4 py-2">~0.12</td>
                <td className="border px-4 py-2">~0.5</td>
                <td className="border px-4 py-2">Very fast, but low quality</td>
              </tr>
            </tbody>
          </table>
          <h2 className='text-lg font-semibold text-gray-800 mb-2 text-center'>Table 2 (Medium Documents Ranging from 1500-2300 words)</h2>
            {/* Evaluation Small */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation </h3>
          <p className="text-gray-700 text-sm text-justify">
           On medium-length texts, TextSense shows a noticeable drop in accuracy (ROUGE-1: 0.5123, BLEU: 0.0486), falling closer to baseline abstractive models like PEGASUS. While it still performs better than T5 and TextRank, the reduction in BLEU indicates challenges in preserving fluency and phrase-level similarity. Moreover, the latency increases to 3.20s/doc, which is slower than T5 but similar to PEGASUS. This indicates that while the system retains strong recall (ROUGE), it becomes less computationally efficient as document size increases.

          </p>
        </div>

        </div>
          {/* Evaluation Small */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation (Large Documents Ranging from 2300-5000 words)</h3>
          <p className="text-gray-700 text-sm text-justify">
           For large documents, the proposed system’s accuracy further decreases (ROUGE-1: 0.4644, BLEU: 0.0394), and latency increases significantly to 4.24s/doc. Compared with baselines, its ROUGE scores remain competitive with PEGASUS, but BLEU remains lower, reflecting difficulties in maintaining coherence across longer text spans. Computational efficiency, measured by latency, also lags behind the baselines, suggesting scalability limitations when handling very large inputs.

          </p>
        </div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-purple-100 text-purple-900">
                <tr>
                  <th className="border px-4 py-2 text-left">Tool / System</th>
                  <th className="border px-4 py-2 text-left">ROUGE-1</th>
                  <th className="border px-4 py-2 text-left">ROUGE-2</th>
                  <th className="border px-4 py-2 text-left">ROUGE-L</th>
                  <th className="border px-4 py-2 text-left">BLEU</th>
                  <th className="border px-4 py-2 text-left">Avg Latency (s/doc)</th>
                  <th className="border px-4 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">TextSense (Small docs)</td>
                  <td className="border px-4 py-2">0.6837</td>
                  <td className="border px-4 py-2">0.4215</td>
                  <td className="border px-4 py-2">0.6203</td>
                  <td className="border px-4 py-2">0.2565</td>
                  <td className="border px-4 py-2">1.24</td>
                  <td className="border px-4 py-2">Stronger than published baselines</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">TextSense (Medium docs)</td>
                  <td className="border px-4 py-2">0.5123</td>
                  <td className="border px-4 py-2">0.2483</td>
                  <td className="border px-4 py-2">0.3522</td>
                  <td className="border px-4 py-2">0.0486</td>
                  <td className="border px-4 py-2">3.20</td>
                  <td className="border px-4 py-2">Accuracy drops on longer input</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">TextSense (Large docs)</td>
                  <td className="border px-4 py-2">0.4644</td>
                  <td className="border px-4 py-2">0.2378</td>
                  <td className="border px-4 py-2">0.3449</td>
                  <td className="border px-4 py-2">0.0394</td>
                  <td className="border px-4 py-2">4.24</td>
                  <td className="border px-4 py-2">Struggles with very long input</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">PEGASUS (CNN-DM)</td>
                  <td className="border px-4 py-2">~0.46–0.48</td>
                  <td className="border px-4 py-2">~0.22–0.24</td>
                  <td className="border px-4 py-2">~0.42</td>
                  <td className="border px-4 py-2">~0.21</td>
                  <td className="border px-4 py-2">~3–4</td>
                  <td className="border px-4 py-2">Higher abstractive power</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">T5-base summarizer</td>
                  <td className="border px-4 py-2">~0.41–0.44</td>
                  <td className="border px-4 py-2">~0.18–0.21</td>
                  <td className="border px-4 py-2">~0.39</td>
                  <td className="border px-4 py-2">~0.18</td>
                  <td className="border px-4 py-2">~2–3</td>
                  <td className="border px-4 py-2">Lightweight</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">TextRank (extractive)</td>
                  <td className="border px-4 py-2">~0.30</td>
                  <td className="border px-4 py-2">~0.10</td>
                  <td className="border px-4 py-2">~0.25</td>
                  <td className="border px-4 py-2">~0.12</td>
                  <td className="border px-4 py-2">~0.5</td>
                  <td className="border px-4 py-2">Very fast, low accuracy</td>
                </tr>
              </tbody>
            </table>
            <h2 className='text-lg font-semibold text-gray-800 mb-2 text-center'>Table 3 (Overall Performance Across Document Sizes)</h2>
           
          </div>
           
          <div className="mt-12 p-6 bg-purple-50 border border-purple-200 rounded-2xl">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
            Overall Evaluation (Across Document Sizes)
          </h2>
          <p className="text-gray-700 text-sm text-justify mb-6">
            The results show that the proposed system, TextSense, performs strongly on small documents, outperforming established tools like PEGASUS and T5 in terms of accuracy while maintaining competitive processing speed. This advantage is partly due to the hybrid approach: the TF-IDF algorithm ensures that high-value sentences are prioritized, while the Aho-Corasick algorithm enables efficient keyword matching and highlighting, giving the summaries better topical coverage. However, as document length increases, the system faces limitations. The reliance on TF-IDF can lead to redundancy in longer texts, while Aho-Corasick struggles with capturing deeper semantic relations beyond keyword matching. This results in declining ROUGE and BLEU scores on medium and large inputs, along with increased latency compared to more optimized abstractive models like PEGASUS. Another weakness is that the algorithmic pipeline depends heavily on extractive quality; if the initial sentence selection is suboptimal, even Gemini refinement cannot fully recover fluency or coherence. Despite these challenges, the system remains highly effective for short-text summarization tasks, where keyword-focused extraction and concise refinement align well with the nature of the input. To complement these findings, a user survey will also be conducted to assess readability, coherence, and informativeness, providing a more human-centered evaluation of the strengths and weaknesses of the algorithmic design.
          </p>
        </div>
        </details>
</div>
      {/* SOP3 Legend */}
<div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm mb-6">
  <h2 className="text-lg font-semibold text-yellow-700 mb-2">
    SOP3 – Optimizing Aho-Corasick for Multi-Keyword Search
  </h2>
  <p className="text-sm text-gray-700 mb-4">
    This section explains how the algorithm can be improved so it can search for 
    many keywords at once and highlight them quickly in real-time. The figures 
    show how the improvements affect speed, memory usage, and efficiency.
  </p>

  <div className="space-y-4 text-sm text-gray-700">
    {/* Figure 1 */}
    <div>
      <span className="font-semibold text-yellow-800">Figure 1: Processing Speed</span>
      <p>
        This figure compares how fast the normal version and the improved version 
        of the algorithm work.
      </p>
      <ul className="list-disc list-inside ml-4">
        <li><strong>X-axis:</strong> The two versions (Normal vs Improved).</li>
        <li><strong>Y-axis:</strong> Processing time.</li>
        <li><strong>Meaning:</strong> A shorter bar means faster performance. The improved 
        version finishes searching more quickly.</li>
      </ul>
    </div>

    {/* Figure 2 */}
    <div>
      <span className="font-semibold text-yellow-800">Figure 2: Memory Usage</span>
      <p>
        This figure shows how much computer memory each version of the algorithm uses.
      </p>
      <ul className="list-disc list-inside ml-4">
        <li><strong>X-axis:</strong> The two versions (Normal vs Improved).</li>
        <li><strong>Y-axis:</strong> Memory required to store keywords.</li>
        <li><strong>Meaning:</strong> A lower bar means the improved version uses less memory 
        while still being accurate.</li>
      </ul>
    </div>

    {/* Figure 3 */}
    <div>
      <span className="font-semibold text-yellow-800">Figure 3: Balance Between Speed and Memory</span>
      <p>
        This figure shows the balance between speed and memory as more keywords 
        are added to the system.
      </p>
      <ul className="list-disc list-inside ml-4">
        <li><strong>X-axis:</strong> Number of keywords.</li>
        <li><strong>Y-axis:</strong> Speed and memory use.</li>
        <li><strong>Meaning:</strong> As the number of keywords grows, both memory use and 
        processing time increase. The improved version grows more slowly, showing 
        it can handle more keywords efficiently.</li>
      </ul>
    </div>
  </div>
        <details  className="bg-gray-50 rounded-2xl shadow-md p-4 mt-5">
        <summary className="cursor-pointer text-xl font-bold text-yellow-800 mb-4">
          Aho-Corasick algorithm be optimized for multi-keyword search and real-time keyword highlighting in text summarization
        </summary>
         {/* Small Documents */}
        <h2 className="text-2xl font-semibold text-center mb-6">Small Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {ahoDataSmall.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
              <img src={item.picture} alt={item.title} className="w-full h-64 object-contain rounded-lg mb-3" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm text-justify mb-2">{item.interpretation}</p>
              <div className='text-xs font-bold text-gray-900 italic mt-auto'>
                {item.xaxis && <p>{item.xaxis}</p>}
                {item.yaxis && <p>{item.yaxis}</p>}
                {item.note && <p>{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
        {/* Evaluation Small */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation (Small Document)</h3>
          <p className="text-gray-700 text-sm text-justify">
            For the small document, the optimized Aho–Corasick algorithm delivered significant improvements in space complexity and modest gains in time complexity. Memory requirements were reduced by about 83.61%, while runtime operations decreased by 5.02%. The analysis reinforces that optimization primarily benefits space efficiency, ensuring lower memory overhead while maintaining or slightly improving execution speed. The trade-off curve confirms that memory usage is heavily influenced by the number of patterns, whereas time cost remains largely dependent on text length. These findings demonstrate that the optimized AC is well-suited for real-time text summarization, where minimizing storage requirements while preserving responsiveness is essential.

          </p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 mt-5">Medium Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {ahoDataMedium.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
              <img src={item.picture} alt={item.title} className="w-full h-64 object-contain rounded-lg mb-3" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm text-justify mb-2">{item.interpretation}</p>
              <div className='text-xs font-bold text-gray-900 italic mt-auto'>
                {item.xaxis && <p>{item.xaxis}</p>}
                {item.yaxis && <p>{item.yaxis}</p>}
                {item.note && <p>{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
        {/* Evaluation Medium */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation (Medium Document)</h3>
          <p className="text-gray-700 text-sm text-justify">
            For the medium document, the optimized Aho–Corasick algorithm demonstrated a substantial reduction in space complexity and a modest improvement in time complexity. By limiting the trie to only the top 50 TF–IDF keywords instead of the full 670-word vocabulary, memory requirements dropped by approximately 92.5%, highlighting the effectiveness of the optimization in reducing storage overhead. In terms of processing cost, the optimized version achieved a 5.26% reduction in operations, which, although modest, confirms that runtime performance is consistently improved or at least maintained. The trade-off analysis further reinforces that time complexity is primarily influenced by text length, while space complexity is driven by the number of patterns. Consequently, the optimization strategy is most impactful in reducing memory demands, ensuring that the algorithm remains scalable and practical for real-time text summarization applications where efficiency and responsiveness are critical.

          </p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 mt-5">LargeDocuments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {ahoDataLarge.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
              <img src={item.picture} alt={item.title} className="w-full h-64 object-contain rounded-lg mb-3" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm text-justify mb-2">{item.interpretation}</p>
              <div className='text-xs font-bold text-gray-900 italic mt-auto'>
                {item.xaxis && <p>{item.xaxis}</p>}
                {item.yaxis && <p>{item.yaxis}</p>}
                {item.note && <p>{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
        {/* Evaluation Medium */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Evaluation (Medium Document)</h3>
          <p className="text-gray-700 text-sm text-justify">
            The experimental results for the large document show that the optimization of the Aho–Corasick algorithm achieves substantial space savings while maintaining comparable or slightly improved time performance. By limiting the trie construction to only the top-ranked keywords, memory usage was reduced by more than 90% without sacrificing accuracy. Although the improvement in time complexity was modest due to the dominance of text length in the overall formula, the trade-off curve confirms that space grows rapidly with pattern size, whereas time remains relatively stable. This validates that the optimized approach is more suitable for real-time text summarization tasks, where memory efficiency and responsiveness are both critical.

          </p>
        </div>
        <div className="mt-12 p-6 bg-purple-50 border border-purple-200 rounded-2xl">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
            Overall Evaluation (Across Document Sizes)
          </h2>
          <p className="text-gray-700 text-sm text-justify mb-6">
            The experimental evaluation demonstrates that optimizing the Aho–Corasick algorithm by restricting trie construction to only the most significant TF–IDF keywords substantially improves its efficiency for multi-keyword search and real-time keyword highlighting. Across small, medium, and large documents, the optimized version consistently reduced memory requirements by more than 80–90% while also achieving a modest improvement of around 5% in runtime operations.
          These results confirm that the optimization primarily benefits space complexity, which is heavily influenced by the number of patterns, while maintaining or slightly enhancing time performance, which is dominated by text length. Consequently, the optimized Aho–Corasick algorithm is scalable, memory-efficient, and responsive, making it more practical for real-time text summarization applications compared to the standard implementation.
          </p>
        </div>

      </details>
</div>
<div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-lg shadow-sm mb-6 mt-5">
  <h2 className="text-lg font-semibold text-indigo-700 mb-2">
    SOP4 – Impact of Hybrid Summarization on Coherence and Readability
  </h2>


  <div className="space-y-3 text-sm text-gray-700">
    <div>
      <span className='font-semibold text-indigo-800'>Why Coherence and Readability Matters?</span>
      <p>This section focuses on evaluating how the integration of extractive and abstractive summarization improves the coherence and readability of generated summaries. Extractive summarization using TF-IDF and Aho-Corasick provides a factual backbone by identifying and selecting the most relevant sentences from the source text. In contrast, abstractive summarization using the Gemini LLM restructures and rephrases this content to produce smoother, more natural language. By combining these complementary techniques, the hybrid system aims to retain essential information while presenting it in a form that is clearer, more organized, and easier to understand. Automated metrics such as ROUGE and BLEU are used to measure coverage, structure, and language quality, while a planned user evaluation will capture readers’ perceptions of clarity, organization, and overall readability. Together, these methods offer a comprehensive assessment of the system’s ability to meet SOP4’s goal of improving the coherence and readability of generated summaries.</p>
    </div>
    <div>
      <span className="font-semibold text-indigo-800">1. ROUGE Scores</span>
      <p><strong>What they measure:</strong> Content coverage and structural similarity between generated and reference summaries.</p>
      <p><strong>Why it matters:</strong> Higher scores indicate better capture of key ideas and more coherent sentence structure.</p>
    </div>

    <div>
      <span className="font-semibold text-indigo-800">2. BLEU Score</span>
      <p><strong>What it measures:</strong> Similarity in wording and phrasing between generated and reference summaries.</p>
      <p><strong>Why it matters:</strong> Higher scores show the summary’s language is closer to natural and readable text.</p>
    </div>

    <div>
      <span className="font-semibold text-indigo-800">3. User Evaluation</span>
      <p><strong>What it measures:</strong> Perceived clarity, organization, and readability from real users.</p>
      <p><strong>Why it matters:</strong> Complements automated metrics to capture how coherent and understandable the summaries feel to readers.</p>
    </div>
  </div>
   <details className="bg-gray-50 rounded-2xl shadow-md p-4 mt-5">
        <summary className="cursor-pointer text-xl font-bold text-indigo-800 mb-4">
          Basic Comparison of Extractive and Abstractive Summarization
        </summary>
         {/* Small Documents */}
        <h2 className="text-2xl font-semibold text-center mb-6">Small Documents</h2>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-purple-100 text-purple-900">
                <tr>
                  <th className="border px-4 py-2 text-left">Tool / System</th>
                  <th className="border px-4 py-2 text-left">ROUGE-1</th>
                  <th className="border px-4 py-2 text-left">ROUGE-2</th>
                  <th className="border px-4 py-2 text-left">ROUGE-L</th>
                  <th className="border px-4 py-2 text-left">BLEU</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">TextSense (Small docs)</td>
                  <td className="border px-4 py-2">0.6837</td>
                  <td className="border px-4 py-2">0.4215</td>
                  <td className="border px-4 py-2">0.6203</td>
                  <td className="border px-4 py-2">0.2565</td>

                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">TextSense (Medium docs)</td>
                  <td className="border px-4 py-2">0.5123</td>
                  <td className="border px-4 py-2">0.2483</td>
                  <td className="border px-4 py-2">0.3522</td>
                  <td className="border px-4 py-2">0.0486</td>

                </tr>

                <tr>
                  <td className="border px-4 py-2 font-medium">Extractive(Small)</td>
                  <td className="border px-4 py-2">0.60</td>
                  <td className="border px-4 py-2">~0.30</td>
                  <td className="border px-4 py-2">0.55</td>
                  <td className="border px-4 py-2">~0.30</td>

                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Extractive(Medium)</td>
                  <td className="border px-4 py-2">0.50</td>
                  <td className="border px-4 py-2">~0.30</td>
                  <td className="border px-4 py-2">~0.45</td>
                  <td className="border px-4 py-2">~0.40</td>

                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Extractive (Large)</td>
                  <td className="border px-4 py-2">~0.40</td>
                  <td className="border px-4 py-2">~0.12</td>
                  <td className="border px-4 py-2">~0.35</td>
                  <td className="border px-4 py-2">~0.38</td>

                </tr>
              </tbody>
            </table>
            <h2 className='text-lg font-semibold text-gray-800 mb-2 text-center'>Table 3. Comparison of Extracive and Abstracive Summarization</h2>
           
          </div>
        {/* Evaluation Small */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Overall Evaluation</h3>
          <p className="text-gray-700 text-sm text-justify">
            The overall evaluation across small, medium, and large documents indicates that TextSense (abstractive summarization) consistently excels in capturing the meaning, structure, and coherence of source texts, particularly for shorter documents, while the extractive system demonstrates stronger fidelity to the original wording and greater stability as document size increases. These results suggest that the integration of both approaches can deliver a balanced system that enhances readability, coherence, and accuracy of generated summaries across varying text lengths. However, quantitative metrics such as ROUGE and BLEU only measure overlap and structural similarity and may not fully capture user-perceived quality, usability, or relevance of the summaries. To address this, a planned user evaluation will complement the automated metrics by assessing perceived clarity, usefulness, and satisfaction with the generated summaries. Taken together, these findings and the forthcoming user feedback will provide a more holistic validation of the system’s ability to meet its intended goals of improving summarization quality, readability, and user experience.
          </p>
        </div>
      </details>
</div>
  
    </div>
  );
};

export default SummarizationCharts;
