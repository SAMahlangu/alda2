import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Texte en Parole</h2>
      <textarea
        className="w-full h-48 p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrez le texte à convertir en parole..."
      />
      <div className="space-x-4">
        <button
          onClick={speaking ? stopSpeaking : speak}
          className={`px-6 py-2 rounded-lg ${
            speaking
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {speaking ? 'Arrêter' : 'Parler'}
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;