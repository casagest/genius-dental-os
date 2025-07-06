
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield } from "lucide-react";
import { useSecureApiKeys } from "@/hooks/useSecureStorage";
import { validateFormData, VoiceSettingsSchema } from "@/lib/validation";
import { validateApiKey, sanitizeText, checkRateLimit } from "@/lib/security";
import { useToast } from "@/hooks/use-toast";
import ApiKeysSection from "./components/ApiKeysSection";
import VoiceConfigSection from "./components/VoiceConfigSection";
import AdvancedSettingsSection from "./components/AdvancedSettingsSection";
import ActionButtonsSection from "./components/ActionButtonsSection";
import VoiceCommandsHelp from "./components/VoiceCommandsHelp";

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
        <ApiKeysSection
          elevenLabsApiKey={settings.elevenLabsApiKey}
          openAIApiKey={settings.openAIApiKey}
          testResults={testResults}
          onApiKeyChange={handleSettingsChange}
        />

        <VoiceConfigSection
          voiceId={settings.voiceId}
          language={settings.language}
          onVoiceIdChange={(voiceId) => handleSettingsChange('voiceId', voiceId)}
          onLanguageChange={(language) => handleSettingsChange('language', language)}
        />

        <AdvancedSettingsSection
          hotwordEnabled={settings.hotwordEnabled}
          micSensitivity={settings.micSensitivity}
          onHotwordEnabledChange={(enabled) => handleSettingsChange('hotwordEnabled', enabled)}
          onMicSensitivityChange={(sensitivity) => handleSettingsChange('micSensitivity', sensitivity)}
        />

        <ActionButtonsSection
          testInProgress={testInProgress}
          elevenLabsApiKey={settings.elevenLabsApiKey}
          openAIApiKey={settings.openAIApiKey}
          onRunAllTests={runAllTests}
          onSave={handleSave}
        />

        <VoiceCommandsHelp />
      </CardContent>
    </Card>
  );
};

export default VoiceSettings;
