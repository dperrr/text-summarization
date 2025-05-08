import React from "react";
import { Briefcase, Monitor, Globe, GraduationCap } from "lucide-react";

const cardData = [
  {
    icon: <Briefcase size={32} className="text-purple-600" />,
    title: "Professionals",
    description: "Focus on key points to drive actionable outcomes",
  },
  {
    icon: <Monitor size={32} className="text-purple-600" />,
    title: "Educators",
    description: "Condense lesson plans or draft study guides",
  },
  {
    icon: <Globe size={32} className="text-purple-600" />,
    title: "Researchers",
    description: "Identify relevant sources or craft research notes",
  },
  {
    icon: <GraduationCap size={32} className="text-purple-600" />,
    title: "Students",
    description: "Conduct research or shorten study notes",
  },
];

function WhoCanUseSummarization() {
  return (
    <div className="w-full  py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6  p-10">
        Who Can Use Summarization?
      </h2>
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-64 text-center transition hover:shadow-lg"
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhoCanUseSummarization;
