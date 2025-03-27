
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (value: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  language, 
  setLanguage 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="language-select">Language</Label>
      <Select 
        value={language} 
        onValueChange={setLanguage}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hindi">Hindi</SelectItem>
          <SelectItem value="english">English (Indian)</SelectItem>
          <SelectItem value="tamil">Tamil</SelectItem>
          <SelectItem value="bengali">Bengali</SelectItem>
          <SelectItem value="telugu">Telugu</SelectItem>
          <SelectItem value="marathi">Marathi</SelectItem>
          <SelectItem value="punjabi">Punjabi</SelectItem>
          <SelectItem value="malayalam">Malayalam</SelectItem>
          <SelectItem value="gujarati">Gujarati</SelectItem>
          <SelectItem value="kannada">Kannada</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
