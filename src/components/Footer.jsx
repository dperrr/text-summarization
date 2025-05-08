import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 ">
            <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} TextSummarizer. All rights reserved.
                </p>

                {/* Social Icons */}
                <div className="mt-4 flex space-x-6 md:mt-0">
                    <a 
                        href="https://github.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition"
                    >
                        <Github className="h-6 w-6" />
                    </a>

                    <a 
                        href="https://twitter.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition"
                    >
                        <Twitter className="h-6 w-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
