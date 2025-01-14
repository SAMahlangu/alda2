import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TextToSpeech from './components/TextToSpeech';
import SpeechToText from './components/SpeechToText';
import FrenchPdfReader from './components/FrenchPdfReader';
import Calculator from './components/Calculator';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/speech-to-text" element={<SpeechToText />} />
            <Route path="/french-pdf" element={<FrenchPdfReader />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/" element={
              <div className="flex items-center justify-center h-full">
                <h1 className="text-3xl font-bold text-gray-700">Bienvenue sur l'Application Multi-Outils</h1>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;