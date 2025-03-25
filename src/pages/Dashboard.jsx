import React from 'react';
import Navbar from '../components/NavBar';
import WhoCanUseSummarization from '../components/WhoCanUseSummarization';
import Questions from '../components/Questions';
import { Link } from "react-router";

function Dashboard() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <div className="max-w-5xl space-y-5">
                    <div>
                        <h1 className="text-6xl font-bold text-gray-900">
                            Welcome to AI-Powered
                        </h1>
                        <h1 className="text-6xl font-bold text-gray-900">
                            Text Summarization and Search System
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                        This tool enhances document retrieval and summarization using TF-IDF 
                        and Aho-Corasick Algorithm, combined with AI for advanced text processing.
                    </p>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3">Quick Access to Key Features</h2>
                    <div className="flex space-x-4">
                        <Link className="bg-blue-600  hover:bg-blue-700 text-white px-20 py-2 rounded-lg flex items-center space-x-2 cursor-pointer"
                        to={"/search"}>
                            Search <span className="ml-2">🔍</span>
                        </Link>
                        <Link className="bg-blue-600 hover:bg-blue-700 text-white px-20 py-2 rounded-lg flex items-center space-x-2 cursor-pointer"
                        to={"/summarizer"}>
                            Summarizer <span 
                            className="ml-2"
                            >📄</span>
                        </Link>
                    </div>
                </div>

            </div>

           <div className='bg-white'>
            
                <WhoCanUseSummarization />
           </div>
           <div className='py-10 w-full'>
                <div className=''>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6  p-5">
                    Some commonly asked questions about summarizing tools
                    </h2>
                </div>
                <div className='container flex justify-center m-auto items-center'>
                    <Questions />
                </div>
           </div>
        </>
    );
}

export default Dashboard;
