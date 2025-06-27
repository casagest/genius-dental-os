
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import useVoiceInterface from "@/hooks/useVoiceInterface";

interface VoiceFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  language?: 'ro' | 'en';
  elevenLabsApiKey?: string;
  openAIApiKey?: string;
}

interface FormField {
  name: string;
  label: string;
  labelEn: string;
  type: 'text' | 'tel' | 'email' | 'date' | 'select';
  required?: boolean;
  options?: string[];
  voicePrompt?: string;
  voicePromptEn?: string;
}

const VoiceForm: React.FC<VoiceFormProps> = ({
  title,
  fields,
  onSubmit,
  language = 'ro',
  elevenLabsApiKey,
  openAIApiKey
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [voiceMode, setVoiceMode] = useState(false);

  const voiceConfig = {
    language,
    elevenLabsApiKey,
    openAIApiKey,
    voiceId: 'pNInz6obpgDQGcFmaJgB', // ElevenLabs Romanian voice
    hotwordEnabled: true,
    micSensitivity: 0.7
  };

  const {
    isListening,
    isSpeaking,
    transcript,
    error,
    startListening,
    stopListening,
    speak
  } = useVoiceInterface(voiceConfig);

  // Handle voice input for specific field
  useEffect(() => {
    if (transcript && currentField) {
      setFormData(prev => ({
        ...prev,
        [currentField]: transcript
      }));
    }
  }, [transcript, currentField]);

  const handleVoiceInput = async (fieldName: string) => {
    const field = fields.find(f => f.name === fieldName);
    if (!field) return;

    setCurrentField(fieldName);
    setVoiceMode(true);

    // Speak the prompt
    const prompt = language === 'ro' 
      ? (field.voicePrompt || `Spuneți ${field.label.toLowerCase()}`)
      : (field.voicePromptEn || `Please say ${field.labelEn.toLowerCase()}`);
    
    await speak(prompt);
    
    // Start listening after speaking
    setTimeout(() => {
      startListening();
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getVoicePrompts = () => {
    if (language === 'ro') {
      return {
        startVoice: 'Începeți completarea vocală',
        stopVoice: 'Opriți vocea',
        listening: 'Ascult...',
        speaking: 'Vorbesc...',
        submit: 'Trimiteți formularul'
      };
    }
    return {
      startVoice: 'Start voice input',
      stopVoice: 'Stop voice',
      listening: 'Listening...',
      speaking: 'Speaking...',
      submit: 'Submit form'
    };
  };

  const prompts = getVoicePrompts();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant={voiceMode ? "destructive" : "outline"}
              size="sm"
              onClick={() => {
                if (voiceMode) {
                  stopListening();
                  setVoiceMode(false);
                  setCurrentField(null);
                } else {
                  setVoiceMode(true);
                }
              }}
            >
              {voiceMode ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {voiceMode ? prompts.stopVoice : prompts.startVoice}
            </Button>
            
            {(isListening || isSpeaking) && (
              <Badge variant="secondary" className="animate-pulse">
                {isSpeaking ? (
                  <>
                    <Volume2 className="w-3 h-3 mr-1" />
                    {prompts.speaking}
                  </>
                ) : (
                  <>
                    <Mic className="w-3 h-3 mr-1" />
                    {prompts.listening}
                  </>
                )}
              </Badge>
            )}
          </div>
        </div>
        
        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {language === 'ro' ? field.label : field.labelEn}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              
              <div className="flex items-center space-x-2">
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [field.name]: e.target.value
                    }))}
                    className="flex-1 px-3 py-2 border border-input rounded-md"
                    required={field.required}
                  >
                    <option value="">
                      {language === 'ro' ? 'Selectați...' : 'Select...'}
                    </option>
                    {field.options?.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [field.name]: e.target.value
                    }))}
                    required={field.required}
                    className="flex-1"
                    placeholder={currentField === field.name && transcript ? transcript : ''}
                  />
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleVoiceInput(field.name)}
                  disabled={!voiceMode || isListening || isSpeaking}
                  className={currentField === field.name ? 'bg-blue-100 border-blue-300' : ''}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              
              {currentField === field.name && transcript && (
                <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                  {language === 'ro' ? 'Am înțeles: ' : 'I heard: '}{transcript}
                </div>
              )}
            </div>
          ))}
          
          <Button type="submit" className="w-full">
            {prompts.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VoiceForm;
