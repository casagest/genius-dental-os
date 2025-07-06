import React from 'react';
import { Label } from "@/components/ui/label";

interface AdvancedSettingsSectionProps {
  hotwordEnabled: boolean;
  micSensitivity: number;
  onHotwordEnabledChange: (enabled: boolean) => void;
  onMicSensitivityChange: (sensitivity: number) => void;
}

const AdvancedSettingsSection: React.FC<AdvancedSettingsSectionProps> = ({
  hotwordEnabled,
  micSensitivity,
  onHotwordEnabledChange,
  onMicSensitivityChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Setări Avansate</h3>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hotword"
          checked={hotwordEnabled}
          onChange={(e) => onHotwordEnabledChange(e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="hotword">Activare prin cuvânt cheie "Genius"</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sensitivity">Sensibilitate Microfon: {Math.round(micSensitivity * 100)}%</Label>
        <input
          type="range"
          id="sensitivity"
          min="0.1"
          max="1"
          step="0.1"
          value={micSensitivity}
          onChange={(e) => onMicSensitivityChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AdvancedSettingsSection;