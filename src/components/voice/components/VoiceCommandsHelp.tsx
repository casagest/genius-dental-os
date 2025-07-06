import React from 'react';

const VoiceCommandsHelp: React.FC = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Comenzi Vocale Disponibile:</h4>
      <ul className="text-sm space-y-1 text-blue-800">
        <li>• "Genius, programează pe Maria Popa marți la 9"</li>
        <li>• "Genius, caută pacientul Ionescu"</li>
        <li>• "Genius, trimite modelul în laborator"</li>
        <li>• "Genius, ce consumabile lipsesc?"</li>
        <li>• "Genius, factura pe februarie"</li>
      </ul>
    </div>
  );
};

export default VoiceCommandsHelp;