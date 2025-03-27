
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Sliders } from 'lucide-react';

interface VoiceSettingsProps {
  settings: {
    stability: number;
    clarity: number;
    style: number;
  };
  handleSettingChange: (key: string, value: number) => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ 
  settings, 
  handleSettingChange 
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex-1">
          <Sliders className="h-4 w-4 mr-2" />
          Voice Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Voice Settings</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="stability">Stability</Label>
              <span className="text-sm text-muted-foreground">{settings.stability}%</span>
            </div>
            <Slider 
              id="stability"
              min={0} 
              max={100} 
              step={1} 
              value={[settings.stability]} 
              onValueChange={(value) => handleSettingChange('stability', value[0])}
            />
            <p className="text-xs text-muted-foreground">Higher stability means less variation in the voice.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="clarity">Clarity + Similarity</Label>
              <span className="text-sm text-muted-foreground">{settings.clarity}%</span>
            </div>
            <Slider 
              id="clarity"
              min={0} 
              max={100} 
              step={1} 
              value={[settings.clarity]} 
              onValueChange={(value) => handleSettingChange('clarity', value[0])}
            />
            <p className="text-xs text-muted-foreground">Higher values enhance clarity and similarity.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="style">Style Exaggeration</Label>
              <span className="text-sm text-muted-foreground">{settings.style}%</span>
            </div>
            <Slider 
              id="style"
              min={0} 
              max={100} 
              step={1} 
              value={[settings.style]} 
              onValueChange={(value) => handleSettingChange('style', value[0])}
            />
            <p className="text-xs text-muted-foreground">Higher values enhance voice style traits.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VoiceSettings;
