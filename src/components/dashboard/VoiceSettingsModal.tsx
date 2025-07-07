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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Configurare Interfață Vocală</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="p-4">
          <VoiceSettings onSettingsSave={onSettingsSave} />
        </div>
      </div>
    </div>
  );
};

export default VoiceSettingsModal;