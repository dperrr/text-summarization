import { Users, GraduationCap, BookOpen, Mail, User, Code, FileText, Palette, Database, BarChart } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl pt-30">
      <div className="space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600">
              Welcome to AI-Powered Text Summarization and Search System, a research project developed by a dedicated team of students from Pamantasan Ng Cabuyao. Our project aims to develops an automated text summarization and search tool that enhances document retrieval efficiency.
            </p>
          </div>
        </div>

  
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <Users className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">The Research Team</h2>
          </div>
          <p className="text-lg">Meet the passionate individuals behind this project:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Team Member 1 */}
            <div className="rounded-lg border border-gray-300 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Code className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Jasper Dan S. Rosellon</h3>
                </div>
                <p className="text-sm text-gray-600">Lead Developer</p>
              </div>
            </div>


            <div className="rounded-lg border border-gray-300 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Carl Glaizer A. Villegas</h3>
                </div>
                <p className="text-sm text-gray-600">Leader</p>
              </div>
            </div>


            <div className="rounded-lg border border-gray-300 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Patrick Ryan A. Zapanta</h3>
                </div>
                <p className="text-sm text-gray-600">Research and Documentation</p>
              </div>
            </div>

           
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <GraduationCap className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">Our Thesis Adviser</h2>
            </div>
            <div className="rounded-lg border border-gray-300 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Prof. Angelica Aquino</h3>
                </div>
                <p className="text-sm text-gray-600">Thesis Adviser, guiding us throughout our research journey.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">Thesis Professor</h2>
            </div>
            <div className="rounded-lg border border-gray-300 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Prof. Hablanida Fe.</h3>
                </div>
                <p className="text-sm text-gray-600">Providing academic support and feedback to refine our study.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <Database className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Our Research Objective</h2>
          </div>
          <div className="rounded-lg border border-gray-300 overflow-hidden">
            <div className="p-6">
              <p className="text-lg">
                As digital text continues to grow rapidly, it has become harder to find and summarize relevant information. Traditional methods often provide incomplete or inaccurate results, while AI-based solutions require a lot of computing power, making them difficult for many users to access. This study aims to create an AI-powered system using TF-IDF, Aho-Corasick, and Gemini LLM to improve summarization, making it more efficient, accurate, and accessible. 
              </p>
            </div>
          </div>
        </div>


        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <Mail className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <div className="rounded-lg border border-gray-300 overflow-hidden">
            <div className="p-6">
              <p className="text-lg">
                For inquiries, collaboration, or feedback, feel free send a message to my gmail account jasperdannn@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

