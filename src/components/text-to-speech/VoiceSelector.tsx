
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Voice } from '@/types/voice';

interface VoiceSelectorProps {
  currentVoice: string | null;
  setCurrentVoice: (value: string) => void;
  voices: Voice[];
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ 
  currentVoice, 
  setCurrentVoice, 
  voices 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="voice-select">Voice</Label>
      <Select 
        value={currentVoice || ''} 
        onValueChange={setCurrentVoice}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a voice" />
        </SelectTrigger>
        <SelectContent>
          {voices.map(voice => (
            <SelectItem key={voice.id} value={voice.id}>
              {voice.name} ({voice.language})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VoiceSelector;
