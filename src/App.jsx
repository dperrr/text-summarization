import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import Summarizer from './pages/Summarizer.jsx';
import Search from './pages/Search.jsx';
import Documentation from './pages/Documentation.jsx';
import AboutUs from "./pages/AboutUs.jsx"
import Navbar from './components/NavBar';

function App() {
  return (
    <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/search" element={<Search />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
