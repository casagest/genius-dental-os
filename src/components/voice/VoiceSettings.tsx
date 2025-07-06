
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, TestTube, Volume2, Mic, Shield } from "lucide-react";
import { useSecureApiKeys } from "@/hooks/useSecureStorage";
import { validateFormData, VoiceSettingsSchema } from "@/lib/validation";
import { validateApiKey, sanitizeText, checkRateLimit } from "@/lib/security";
import { useToast } from "@/hooks/use-toast";

interface VoiceSettingsProps {
  onSettingsSave: (settings: VoiceSettings) => void;
}

interface VoiceSettings {
  elevenLabsApiKey: string;
  openAIApiKey: string;
  voiceId: string;
  language: 'ro' | 'en';
  hotwordEnabled: boolean;
  micSensitivity: number;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ onSettingsSave }) => {
  const { toast } = useToast();
  const { value: secureApiKeys, setValue: setSecureApiKeys } = useSecureApiKeys();
  
  const [settings, setSettings] = useState<VoiceSettings>({
    elevenLabsApiKey: '',
    openAIApiKey: '',
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Romanian voice
    language: 'ro',
    hotwordEnabled: true,
    micSensitivity: 0.7
  });

  const [testInProgress, setTestInProgress] = useState(false);
  const [testResults, setTestResults] = useState<{
    elevenLabs: boolean | null;
    openAI: boolean | null;
  }>({
    elevenLabs: null,
    openAI: null
  });

  const handleSettingsChange = (key: keyof VoiceSettings, value: any) => {
    // Sanitize text inputs
    if (typeof value === 'string' && key !== 'elevenLabsApiKey' && key !== 'openAIApiKey') {
      value = sanitizeText(value);
    }
    
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const testElevenLabsConnection = async () => {
    if (!settings.elevenLabsApiKey || !settings.voiceId) return;
    
    // Rate limiting check
    if (!checkRateLimit('elevenlabs-test', 3, 60000)) {
      toast({
        title: "Prea multe încercări",
        description: "Încercați din nou în câteva minute",
        variant: "destructive",
      });
      return;
    }
    
    // Validate API key format
    if (!validateApiKey(settings.elevenLabsApiKey, 'sk-')) {
      toast({
        title: "API Key invalid",
        description: "Verificați formatul API key-ului ElevenLabs",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${settings.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': settings.elevenLabsApiKey,
        },
        body: JSON.stringify({
          text: 'Test MedicalCor GENIUS',
          model_id: 'eleven_multilingual_v2'
        }),
      });
      
      setTestResults(prev => ({
        ...prev,
        elevenLabs: response.ok
      }));
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        
        toast({
          title: "Test reușit",
          description: "Conexiunea ElevenLabs funcționează",
        });
      } else {
        toast({
          title: "Test eșuat",
          description: "Verificați API key-ul și permisiunile",
          variant: "destructive",
        });
      }
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        elevenLabs: false
      }));
      toast({
        title: "Eroare conexiune",
        description: "Nu s-a putut conecta la ElevenLabs",
        variant: "destructive",
      });
    }
  };

  const testOpenAIConnection = async () => {
    if (!settings.openAIApiKey) return;
    
    // Rate limiting check
    if (!checkRateLimit('openai-test', 3, 60000)) {
      toast({
        title: "Prea multe încercări",
        description: "Încercați din nou în câteva minute",
        variant: "destructive",
      });
      return;
    }
    
    // Validate API key format
    if (!validateApiKey(settings.openAIApiKey, 'sk-')) {
      toast({
        title: "API Key invalid",
        description: "Verificați formatul API key-ului OpenAI",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Test with a simple models request instead of audio
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${settings.openAIApiKey}`,
        },
      });
      
      const isValid = response.ok;
      setTestResults(prev => ({
        ...prev,
        openAI: isValid
      }));
      
      if (isValid) {
        toast({
          title: "Test reușit",
          description: "Conexiunea OpenAI funcționează",
        });
      } else {
        toast({
          title: "Test eșuat",
          description: "Verificați API key-ul OpenAI",
          variant: "destructive",
        });
      }
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        openAI: false
      }));
      toast({
        title: "Eroare conexiune",
        description: "Nu s-a putut conecta la OpenAI",
        variant: "destructive",
      });
    }
  };

  const runAllTests = async () => {
    setTestInProgress(true);
    setTestResults({ elevenLabs: null, openAI: null });
    
    await Promise.all([
      testElevenLabsConnection(),
      testOpenAIConnection()
    ]);
    
    setTestInProgress(false);
  };

  const handleSave = async () => {
    // Validate settings before saving
    const validation = validateFormData(VoiceSettingsSchema, settings);
    
    if (!validation.success) {
      toast({
        title: "Date invalide",
        description: validation.errors?.errors[0]?.message || "Verificați datele introduse",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Save API keys securely (separated from other settings)
      await setSecureApiKeys({
        elevenLabsApiKey: settings.elevenLabsApiKey,
        openAIApiKey: settings.openAIApiKey
      });
      
      // Save non-sensitive settings in regular storage
      const publicSettings = {
        voiceId: settings.voiceId,
        language: settings.language,
        hotwordEnabled: settings.hotwordEnabled,
        micSensitivity: settings.micSensitivity
      };
      
      localStorage.setItem('genius-voice-public-settings', JSON.stringify(publicSettings));
      
      onSettingsSave(settings);
      
      toast({
        title: "Configurație salvată",
        description: "Setările au fost salvate în siguranță",
      });
      
    } catch (error) {
      toast({
        title: "Eroare salvare",
        description: "Nu s-au putut salva setările",
        variant: "destructive",
      });
    }
  };

  // Load settings from secure storage on mount
  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load public settings
        const publicSaved = localStorage.getItem('genius-voice-public-settings');
        if (publicSaved) {
          const publicSettings = JSON.parse(publicSaved);
          setSettings(prev => ({
            ...prev,
            ...publicSettings
          }));
        }
        
        // Load API keys from secure storage
        if (secureApiKeys && typeof secureApiKeys === 'object' && 'elevenLabsApiKey' in secureApiKeys) {
          setSettings(prev => ({
            ...prev,
            elevenLabsApiKey: (secureApiKeys as any).elevenLabsApiKey || '',
            openAIApiKey: (secureApiKeys as any).openAIApiKey || ''
          }));
        }
      } catch (error) {
        console.error('Failed to load voice settings:', error);
      }
    };
    
    loadSettings();
  }, [secureApiKeys]);

  const getTestBadge = (result: boolean | null) => {
    if (result === null) return <Badge variant="secondary">Netestat</Badge>;
    if (result === true) return <Badge variant="default" className="bg-green-500">✓ Funcționează</Badge>;
    return <Badge variant="destructive">✗ Eroare</Badge>;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Configurare Interfață Vocală GENIUS</span>
          <div title="Configurare securizată">
            <Shield className="w-4 h-4 text-green-600" />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* API Keys Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Chei API</h3>
          
          <div className="space-y-2">
            <Label htmlFor="elevenLabs">ElevenLabs API Key (Text-to-Speech)</Label>
            <div className="flex space-x-2">
              <Input
                id="elevenLabs"
                type="password"
                value={settings.elevenLabsApiKey}
                onChange={(e) => handleSettingsChange('elevenLabsApiKey', e.target.value)}
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
                value={settings.openAIApiKey}
                onChange={(e) => handleSettingsChange('openAIApiKey', e.target.value)}
                placeholder="sk-..."
                className="flex-1"
              />
              {getTestBadge(testResults.openAI)}
            </div>
          </div>
        </div>

        {/* Voice Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Configurare Voce</h3>
          
          <div className="space-y-2">
            <Label htmlFor="voiceId">ID Voce ElevenLabs</Label>
            <select
              id="voiceId"
              value={settings.voiceId}
              onChange={(e) => handleSettingsChange('voiceId', e.target.value)}
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
              value={settings.language}
              onChange={(e) => handleSettingsChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md"
            >
              <option value="ro">Română</option>
              <option value="en">Engleză</option>
            </select>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Setări Avansate</h3>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hotword"
              checked={settings.hotwordEnabled}
              onChange={(e) => handleSettingsChange('hotwordEnabled', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="hotword">Activare prin cuvânt cheie "Genius"</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sensitivity">Sensibilitate Microfon: {Math.round(settings.micSensitivity * 100)}%</Label>
            <input
              type="range"
              id="sensitivity"
              min="0.1"
              max="1"
              step="0.1"
              value={settings.micSensitivity}
              onChange={(e) => handleSettingsChange('micSensitivity', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t">
          <Button
            onClick={runAllTests}
            disabled={testInProgress || !settings.elevenLabsApiKey || !settings.openAIApiKey}
            variant="outline"
            className="flex-1"
          >
            <TestTube className="w-4 h-4 mr-2" />
            {testInProgress ? 'Se testează...' : 'Testează Conexiunile'}
          </Button>
          
          <Button
            onClick={handleSave}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvează Configurația
          </Button>
        </div>

        {/* Voice Commands Help */}
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
      </CardContent>
    </Card>
  );
};

export default VoiceSettings;
