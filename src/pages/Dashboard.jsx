import React from 'react'
import Navbar from '../components/NavBar';

function Dashboard () {
    
   
    return(
        <>
            <div className=' items-center container'>
               <div className='text-center'>
                    <h1 className='text-6xl tittle--page'>Welcome to AI-Powered </h1>
                    <h1 className='text-6xl tittle--page'>Text Summarization and Search System</h1>
                    <p className='text-lg'>This tool enhances document retrieval and summarization using TF-IDF and Aho-Corasick Algorithm, combined with AI for advanced text processing.</p>
               </div>

               <div>
                    <h2>Quick Access to Key Features</h2>
                    <div className='flex justify-center items-center'>
                    <button>Search</button>
                    <button>Summarizer</button>
                    </div>
               </div>
              

            </div>
        </>
    )
}

export default Dashboard;