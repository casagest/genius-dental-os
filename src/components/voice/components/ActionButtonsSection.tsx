import React from 'react';
import { Button } from "@/components/ui/button";
import { TestTube, Save } from "lucide-react";

interface ActionButtonsSectionProps {
  testInProgress: boolean;
  elevenLabsApiKey: string;
  openAIApiKey: string;
  onRunAllTests: () => void;
  onSave: () => void;
}

const ActionButtonsSection: React.FC<ActionButtonsSectionProps> = ({
  testInProgress,
  elevenLabsApiKey,
  openAIApiKey,
  onRunAllTests,
  onSave
}) => {
  return (
    <div className="flex space-x-2 pt-4 border-t">
      <Button
        onClick={onRunAllTests}
        disabled={testInProgress || !elevenLabsApiKey || !openAIApiKey}
        variant="outline"
        className="flex-1"
      >
        <TestTube className="w-4 h-4 mr-2" />
        {testInProgress ? 'Se testează...' : 'Testează Conexiunile'}
      </Button>
      
      <Button
        onClick={onSave}
        className="flex-1"
      >
        <Save className="w-4 h-4 mr-2" />
        Salvează Configurația
      </Button>
    </div>
  );
};

export default ActionButtonsSection;