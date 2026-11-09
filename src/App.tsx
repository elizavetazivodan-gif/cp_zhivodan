import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import About from './pages/About';
import Events from './pages/Events';
import Volunteering from './pages/Volunteering';
import Proposals from './pages/Proposals';
import Documents from './pages/Documents';
import Polls from './pages/Polls';
import Faq from './pages/Faq';
import Acc from './pages/Acc';


const MINT = '#ECFDF5';
const DARK = '#094036';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: MINT, color: DARK }}>
      <Header />
      
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/volunteering" element={<Volunteering />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/acc" element={<Acc />} />
      </Routes>
    </div>
  );
}