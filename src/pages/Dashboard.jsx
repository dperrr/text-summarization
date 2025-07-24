import React from 'react';
import WhoCanUseSummarization from '../components/WhoCanUseSummarization';
import Questions from '../components/Questions';
import Footer from '../components/Footer.jsx';
import { FileText, Search } from 'lucide-react';
import { Link } from "react-router-dom"; 
import ReadingIllustration from '../assets/undraw_artificial-intelligence_fuvd.svg';


function Dashboard() {
    return (
        <div className="relative pt-30 min-h-screen w-full overflow-hidden">  
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-purple-700 via-purple-600 to-purple-400 opacity-30 rounded-full filter blur-3xl animate-blob z-[-1]"></div>
            <div className="absolute top-[300px] right-[-150px] w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-600 via-purple-500 to-violet-400 opacity-30 rounded-full filter blur-2xl animate-blob animation-delay-2000 z-[-1]"></div>

            <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-5xl space-y-5 mt-10">
                    <h1 className="text-6xl font-bold text-gray-900">
                        Welcome to AI-Powered
                    </h1>
                    <h1 className="text-6xl font-bold text-gray-900">
                        <span className='text-purple-700'>Text Summarization</span> and <span className='text-purple-700'>Search System</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        This tool enhances document retrieval and summarization using TF-IDF 
                        and Aho-Corasick Algorithm, combined with AI for advanced text processing.
                    </p>
                    <img
                        src={ReadingIllustration}
                        alt="Reading Illustration"
                        className="w-full max-w-md mx-auto"
                    />
                  
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3">Quick Access to Key Features</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        
                        <Link className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 cursor-pointer"
                            to={"/summarizer"}>
                            Summarizer <FileText className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
                
            <div className="bg-white mt-10 p-6 mb-10 w-full">
                <WhoCanUseSummarization />
            </div>

            <div className="py-10 w-full animated-bg">
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
