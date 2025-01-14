import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FrenchPdfReader = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setPdfFile(event.target.files[0]);
    }
  };

  const speak = () => {
    if ('speechSynthesis' in window && pdfText) {
      const utterance = new SpeechSynthesisUtterance(pdfText);
      utterance.lang = 'fr-FR';
      utterance.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Lecteur PDF</h2>
      <div className="mb-6">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      
      {pdfFile && (
        <div className="mb-6 border rounded-lg p-4">
          <Document
            file={pdfFile}
            onLoadSuccess={async ({ numPages }) => {
              setPdfText("Le texte du PDF sera extrait ici");
            }}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      )}

      <div className="space-x-4">
        <button
          onClick={speaking ? stopSpeaking : speak}
          disabled={!pdfText}
          className={`px-6 py-2 rounded-lg ${
            speaking
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white disabled:opacity-50`}
        >
          {speaking ? 'Arrêter la Lecture' : 'Lire en Français'}
        </button>
      </div>
    </div>
  );
};

export default FrenchPdfReader;