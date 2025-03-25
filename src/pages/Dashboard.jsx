import React from 'react';
import WhoCanUseSummarization from '../components/WhoCanUseSummarization';
import Questions from '../components/Questions';
import Footer from '../components/Footer.jsx';
import { FileText, Search } from 'lucide-react';
import { Link } from "react-router-dom"; 

function Dashboard() {
    return (
        <div className="md:pl-64 min-h-screen">  
            <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-5xl space-y-5 mt-10">
                    <h1 className="text-6xl font-bold text-gray-900">
                        Welcome to AI-Powered
                    </h1>
                    <h1 className="text-6xl font-bold text-gray-900">
                        Text Summarization and Search System
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        This tool enhances document retrieval and summarization using TF-IDF 
                        and Aho-Corasick Algorithm, combined with AI for advanced text processing.
                    </p>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3">Quick Access to Key Features</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 cursor-pointer"
                        to={"/search"}>
                            Search <Search className="ml-2" />
                        </Link>
                        <Link className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 cursor-pointer"
                        to={"/summarizer"}>
                            Summarizer <FileText className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-white mt-10 px-4">
                <WhoCanUseSummarization />
            </div>

            <div className="py-10 w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 p-5">
                    Some commonly asked questions about summarizing tools
                </h2>
                <div className="container flex justify-center mx-auto items-center px-4">
                    <Questions />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
