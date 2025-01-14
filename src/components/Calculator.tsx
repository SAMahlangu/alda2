import React, { useState } from 'react';

const Calculator = () => {
  const [chargeAmount, setChargeAmount] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [result, setResult] = useState<{ type: 'change' | 'short'; amount: number } | null>(null);

  const calculateDifference = () => {
    const charge = parseFloat(chargeAmount);
    const payment = parseFloat(paymentAmount);
    
    if (isNaN(charge) || isNaN(payment)) {
      return;
    }

    const difference = payment - charge;
    if (difference >= 0) {
      setResult({ type: 'change', amount: difference });
    } else {
      setResult({ type: 'short', amount: Math.abs(difference) });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Calculatrice de Paiement</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Montant à Payer (€)
          </label>
          <input
            type="number"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0,00"
            step="0.01"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Montant Versé (€)
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0,00"
            step="0.01"
            min="0"
          />
        </div>

        <button
          onClick={calculateDifference}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Calculer
        </button>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.type === 'change' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <p className="text-center font-medium">
              {result.type === 'change' 
                ? `Monnaie à rendre : ${result.amount.toFixed(2)}€`
                : `Manque : ${result.amount.toFixed(2)}€`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;