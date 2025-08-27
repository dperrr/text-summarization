import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import Summarizer from './pages/Summarizer.jsx';
import Documentation from './pages/Documentation.jsx';
import AboutUs from "./pages/AboutUs.jsx"
import Navbar from './components/Navbar.jsx';
import ResultAnalysis from './pages/ResultAnalysis.jsx';
import Overall from './pages/SummarizationCharts.jsx';

function App() {
  return (
    <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/overall" element={<Overall />} />
      </Routes>
    </Router>
  );
}

export default App;
