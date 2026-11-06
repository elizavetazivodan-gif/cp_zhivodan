import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#1a1a1a] border-b border-emerald-deep/30 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* лого */}
        <a href="/" className="font-unbounded font-bold text-2xl text-emerald-deep hover:text-fresh-mint transition-colors">
          ОСС ХКТФК
        </a>

        {/* навігація */}
        <nav className="flex space-x-6 font-sans text-gray-300">
          <a href="/" className="hover:text-fresh-mint transition-colors">Головна</a>
          <a href="/about" className="hover:text-fresh-mint transition-colors">Про нас</a>
          <a href="/events" className="hover:text-fresh-mint transition-colors">Події</a>
        </nav>

        {/* кнопка "приєднатися" */}
        <a 
          href="/join" 
          className="bg-emerald-deep text-white font-unbounded px-5 py-2 rounded-lg text-sm hover:bg-fresh-mint hover:text-emerald-deep transition-all duration-300"
        >
          Приєднатися
        </a>
        
      </div>
    </header>
  );
};