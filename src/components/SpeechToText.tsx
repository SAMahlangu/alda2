import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

const SpeechToText = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'fr-FR';
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setText(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Erreur de reconnaissance vocale:', event.error);
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      setText('');
      recognition?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Parole en Texte</h2>
      <div className="mb-4">
        <button
          onClick={toggleListening}
          className={`flex items-center px-6 py-3 rounded-lg ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5 mr-2" />
              Arrêter l'Écoute
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              Commencer l'Écoute
            </>
          )}
        </button>
      </div>
      <textarea
        className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={text}
        readOnly
        placeholder="Votre parole apparaîtra ici..."
      />
    </div>
  );
};

export default SpeechToText;