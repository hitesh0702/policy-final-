
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoadingPage from './components/LoadingPage';
import ReportPage from './components/ReportPage';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-neutral-900 bg-transparent">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
