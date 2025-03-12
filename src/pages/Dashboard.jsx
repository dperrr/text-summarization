import React from 'react';
import Navbar from '../components/NavBar';

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
                        <button className="bg-blue-600  hover:bg-blue-700 text-white px-20 py-2 rounded-lg flex items-center space-x-2 cursor-pointer">
                            Search <span className="ml-2">🔍</span>
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-20 py-2 rounded-lg flex items-center space-x-2 cursor-pointer">
                            Summarizer <span className="ml-2">📄</span>
                        </button>
                    </div>
                </div>

                <div className='container'>
                    <div className='tittle--second'>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
