import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import About from './pages/About';
import Events from './pages/Events';

const MINT = '#ECFDF5';
const DARK = '#094036';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: MINT, color: DARK }}>
      {/* фіксована шапка */}
      <Header />
      
      {/* перемикач сторінок */}
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}