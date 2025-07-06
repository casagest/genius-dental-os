import React from 'react';
import { Label } from "@/components/ui/label";

interface VoiceConfigSectionProps {
  voiceId: string;
  language: 'ro' | 'en';
  onVoiceIdChange: (voiceId: string) => void;
  onLanguageChange: (language: 'ro' | 'en') => void;
}

const VoiceConfigSection: React.FC<VoiceConfigSectionProps> = ({
  voiceId,
  language,
  onVoiceIdChange,
  onLanguageChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Configurare Voce</h3>
      
      <div className="space-y-2">
        <Label htmlFor="voiceId">ID Voce ElevenLabs</Label>
        <select
          id="voiceId"
          value={voiceId}
          onChange={(e) => onVoiceIdChange(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md"
        >
          <option value="pNInz6obpgDQGcFmaJgB">Adam (EN/RO)</option>
          <option value="EXAVITQu4vr4xnSDxMaL">Sarah (EN)</option>
          <option value="cgSgspJ2msm6clMCkdW9">Jessica (EN)</option>
          <option value="TX3LPaxmHKxFdv7VOQHJ">Liam (EN)</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Limbă Principală</Label>
        <select
          id="language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as 'ro' | 'en')}
          className="w-full px-3 py-2 border border-input rounded-md"
        >
          <option value="ro">Română</option>
          <option value="en">Engleză</option>
        </select>
      </div>
    </div>
  );
};

export default VoiceConfigSection;