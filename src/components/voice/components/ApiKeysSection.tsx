import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ApiKeysSectionProps {
  elevenLabsApiKey: string;
  openAIApiKey: string;
  testResults: {
    elevenLabs: boolean | null;
    openAI: boolean | null;
  };
  onApiKeyChange: (key: 'elevenLabsApiKey' | 'openAIApiKey', value: string) => void;
}

const ApiKeysSection: React.FC<ApiKeysSectionProps> = ({
  elevenLabsApiKey,
  openAIApiKey,
  testResults,
  onApiKeyChange
}) => {
  const getTestBadge = (result: boolean | null) => {
    if (result === null) return <Badge variant="secondary">Netestat</Badge>;
    if (result === true) return <Badge variant="default" className="bg-green-500">✓ Funcționează</Badge>;
    return <Badge variant="destructive">✗ Eroare</Badge>;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Chei API</h3>
      
      <div className="space-y-2">
        <Label htmlFor="elevenLabs">ElevenLabs API Key (Text-to-Speech)</Label>
        <div className="flex space-x-2">
          <Input
            id="elevenLabs"
            type="password"
            value={elevenLabsApiKey}
            onChange={(e) => onApiKeyChange('elevenLabsApiKey', e.target.value)}
            placeholder="sk-..."
            className="flex-1"
          />
          {getTestBadge(testResults.elevenLabs)}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="openAI">OpenAI API Key (Speech-to-Text Whisper)</Label>
        <div className="flex space-x-2">
          <Input
            id="openAI"
            type="password"
            value={openAIApiKey}
            onChange={(e) => onApiKeyChange('openAIApiKey', e.target.value)}
            placeholder="sk-..."
            className="flex-1"
          />
          {getTestBadge(testResults.openAI)}
        </div>
      </div>
    </div>
  );
};

export default ApiKeysSection;