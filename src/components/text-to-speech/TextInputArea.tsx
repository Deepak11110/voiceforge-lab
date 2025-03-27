
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Voice } from '@/types/voice';

interface TextInputAreaProps {
  text: string;
  setText: (value: string) => void;
  currentVoiceData: Voice | null;
  currentVoice: string | null;
  handleCopyText: () => void;
  handleReset: () => void;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({ 
  text, 
  setText, 
  currentVoiceData, 
  currentVoice,
  handleCopyText,
  handleReset
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor="text-input">Text</Label>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={handleCopyText}>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
      
      <Textarea 
        id="text-input"
        placeholder={currentVoiceData 
          ? `Enter text to be spoken in ${currentVoiceData.name}'s voice (${currentVoiceData.language})...` 
          : "Select a voice first, then enter text here..."
        }
        className="min-h-[150px] resize-y"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!currentVoice}
      />
      
      <div className="text-xs text-right text-muted-foreground">
        {text.length} characters
      </div>
    </div>
  );
};

export default TextInputArea;
