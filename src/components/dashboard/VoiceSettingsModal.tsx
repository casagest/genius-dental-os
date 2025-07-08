import React from 'react';
import { Button } from "@/components/ui/button";
import VoiceSettings from "@/components/voice/VoiceSettings";

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsSave: (settings: any) => void;
}

const VoiceSettingsModal = ({ isOpen, onClose, onSettingsSave }: VoiceSettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="medical-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="heading-secondary mb-2">🎤 Configurare Voce AI</h2>
            <p className="text-muted-foreground">
              Setează cheile API pentru a activa funcțiile vocale
            </p>
          </div>
          <Button variant="outline" size="lg" onClick={onClose} className="touch-target">
            ✕ Închide
          </Button>
        </div>
        <div className="p-6">
          <VoiceSettings onSettingsSave={onSettingsSave} />
        </div>
      </div>
    </div>
  );
};

export default VoiceSettingsModal;