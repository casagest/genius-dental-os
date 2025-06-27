
import { useState, useEffect, useRef, useCallback } from 'react';

export interface VoiceConfig {
  language: 'ro' | 'en';
  elevenLabsApiKey?: string;
  openAIApiKey?: string;
  voiceId?: string; // ElevenLabs voice ID
  hotwordEnabled: boolean;
  micSensitivity: number;
}

export interface VoiceCommand {
  command: string;
  action: string;
  parameters?: Record<string, any>;
  confidence: number;
}

const useVoiceInterface = (config: VoiceConfig) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isHotwordActive, setIsHotwordActive] = useState(config.hotwordEnabled);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = config.language === 'ro' ? 'ro-RO' : 'en-US';
        
        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }
          
          setTranscript(finalTranscript || interimTranscript);
          
          if (finalTranscript) {
            handleVoiceCommand(finalTranscript);
          }
        };
        
        recognitionRef.current.onerror = (event) => {
          setError(`Speech recognition error: ${event.error}`);
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, [config.language]);

  // Hotword detection
  const detectHotword = useCallback((text: string): boolean => {
    const hotwords = ['genius', 'genius înregistrează', 'genius caută', 'genius programează'];
    const lowerText = text.toLowerCase().trim();
    return hotwords.some(hotword => lowerText.includes(hotword));
  }, []);

  // Voice command processing
  const handleVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Parse different command types
    if (lowerCommand.includes('programează')) {
      return {
        command: 'schedule_appointment',
        action: 'create_appointment',
        parameters: extractAppointmentDetails(command),
        confidence: 0.9
      };
    }
    
    if (lowerCommand.includes('caută pacientul') || lowerCommand.includes('find patient')) {
      return {
        command: 'search_patient',
        action: 'search',
        parameters: extractPatientName(command),
        confidence: 0.85
      };
    }
    
    if (lowerCommand.includes('trimite în laborator') || lowerCommand.includes('send to lab')) {
      return {
        command: 'lab_submission',
        action: 'submit_to_lab',
        parameters: extractLabDetails(command),
        confidence: 0.8
      };
    }
    
    if (lowerCommand.includes('ce consumabile lipsesc') || lowerCommand.includes('missing supplies')) {
      return {
        command: 'inventory_check',
        action: 'check_supplies',
        parameters: {},
        confidence: 0.75
      };
    }
    
    return {
      command: 'unknown',
      action: 'fallback',
      parameters: { originalText: command },
      confidence: 0.1
    };
  }, []);

  // Extract appointment details from voice command
  const extractAppointmentDetails = (command: string) => {
    const nameMatch = command.match(/(?:pe|pacientul|pacienta)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/i);
    const timeMatch = command.match(/(luni|marți|miercuri|joi|vineri|sâmbătă|duminică|la\s+\d{1,2})/i);
    const serviceMatch = command.match(/(implant|consultație|igienizare|urgență|coroană|plombă)/i);
    
    return {
      patientName: nameMatch ? nameMatch[1] : null,
      time: timeMatch ? timeMatch[1] : null,
      service: serviceMatch ? serviceMatch[1] : null
    };
  };

  const extractPatientName = (command: string) => {
    const nameMatch = command.match(/(?:pacientul|pacienta)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/i);
    return {
      patientName: nameMatch ? nameMatch[1] : null
    };
  };

  const extractLabDetails = (command: string) => {
    const caseMatch = command.match(/cazul\s+(\d+)/i);
    return {
      caseNumber: caseMatch ? caseMatch[1] : null
    };
  };

  // Start listening with Whisper API fallback
  const startListening = useCallback(async () => {
    try {
      setError(null);
      
      if (config.openAIApiKey) {
        // Use OpenAI Whisper API for better accuracy
        await startWhisperRecording();
      } else if (recognitionRef.current) {
        // Fallback to Web Speech API
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        throw new Error('No speech recognition available');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start listening');
    }
  }, [config.openAIApiKey]);

  // Whisper API recording
  const startWhisperRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await transcribeWithWhisper(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsListening(true);
      
      // Auto-stop after 10 seconds or on silence
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopListening();
        }
      }, 10000);
      
    } catch (err) {
      setError('Failed to access microphone');
    }
  };

  // Transcribe with OpenAI Whisper
  const transcribeWithWhisper = async (audioBlob: Blob) => {
    if (!config.openAIApiKey) return;
    
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'whisper-1');
      formData.append('language', config.language);
      
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.openAIApiKey}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Whisper API error');
      }
      
      const data = await response.json();
      setTranscript(data.text);
      handleVoiceCommand(data.text);
      
    } catch (err) {
      setError('Transcription failed');
    }
  };

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Text-to-Speech with ElevenLabs
  const speak = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      
      if (config.elevenLabsApiKey && config.voiceId) {
        await speakWithElevenLabs(text);
      } else {
        // Fallback to Web Speech API
        speakWithWebAPI(text);
      }
    } catch (err) {
      setError('Speech synthesis failed');
      setIsSpeaking(false);
    }
  }, [config.elevenLabsApiKey, config.voiceId, config.language]);

  const speakWithElevenLabs = async (text: string) => {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': config.elevenLabsApiKey!,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error('ElevenLabs API error');
      }
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (err) {
      // Fallback to Web Speech API
      speakWithWebAPI(text);
    }
  };

  const speakWithWebAPI = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = config.language === 'ro' ? 'ro-RO' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  return {
    isListening,
    isSpeaking,
    transcript,
    error,
    isHotwordActive,
    startListening,
    stopListening,
    speak,
    setIsHotwordActive,
    detectHotword,
    handleVoiceCommand,
  };
};

export default useVoiceInterface;
