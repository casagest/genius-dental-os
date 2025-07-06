import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ro' ? 'en' : 'ro');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="space-x-2 hover:bg-blue-50"
    >
      <Languages className="w-4 h-4" />
      <Badge variant="secondary" className="text-xs">
        {language.toUpperCase()}
      </Badge>
    </Button>
  );
};

export default LanguageSwitcher;