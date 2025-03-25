import React from "react";

function Questions() {
    const cardQuestionsData = [
        {
            questions: "What is a summarizing tool?",
            description: "A summarizing tool is an AI-powered application that condenses long pieces of text into shorter versions while retaining the main ideas and key points."
        },
        {
            questions: "Is using a summarizing tool legal?",
            description: "Yes, summarizing tools are legal if used ethically. Avoid plagiarism and always credit original sources when required."
        },
        {
            questions: "Is summarized content SEO-friendly?",
            description: "Summarized content can be SEO-friendly if it's concise, well-structured, and optimized with relevant keywords."
        },
        {
            questions: "Do summarizing tools improve writing skills?",
            description: "Summarizing tools can aid learning by demonstrating concise writing techniques, but consistent practice is key to improving writing skills."
        },
        {
            questions: "Can summarizing tools be accurate?",
            description: "Summarizing tools can be accurate but may sometimes overlook context or change the intended meaning."
        },
        {
            questions: "How can I ensure my summary is accurate?",
            description: "To ensure accuracy, review the summarized content and compare it with the original text to confirm key points are retained."
        },
    ];

    return (
        <div className="px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardQuestionsData.map((card, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-md rounded-lg p-5 flex flex-col h-full transition hover:shadow-lg"
                    >
                        <div className="flex-1">
                            <p className="font-semibold text-lg">{card.questions}</p>
                            <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Questions;
