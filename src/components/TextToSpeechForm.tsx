
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sliders, 
  Download, 
  Copy, 
  Save,
  Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';

interface TextToSpeechFormProps {
  selectedVoice: Voice | null;
  voices: Voice[];
}

const TextToSpeechForm: React.FC<TextToSpeechFormProps> = ({ selectedVoice, voices }) => {
  const [text, setText] = useState<string>('');
  const [model, setModel] = useState<string>('multilingual-v2');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentVoice, setCurrentVoice] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('hindi');
  const [settings, setSettings] = useState({
    stability: 40,
    clarity: 75,
    style: 5
  });
  
  useEffect(() => {
    if (selectedVoice) {
      setCurrentVoice(selectedVoice.id);
    }
  }, [selectedVoice]);
  
  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to generate speech.');
      return;
    }
    
    if (!currentVoice) {
      toast.error('Please select a voice first.');
      return;
    }
    
    setIsGenerating(true);
    setAudioUrl(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsGenerating(false);
    setAudioUrl('https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3');
    
    const selectedVoiceData = voices.find(v => v.id === currentVoice);
    toast.success(`Audio generated successfully with ${selectedVoiceData?.name || 'selected voice'} in ${language}!`);
  };
  
  const handleSettingChange = (key: string, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard');
  };
  
  const handleReset = () => {
    setText('');
    setAudioUrl(null);
    setSettings({
      stability: 40,
      clarity: 75,
      style: 5
    });
  };
  
  const currentVoiceData = voices.find(v => v.id === currentVoice) || selectedVoice;

  return (
    <div className="space-y-4 p-6 border rounded-lg w-full max-w-3xl mx-auto animate-fade-in bg-white shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="voice-model">Model</Label>
        <Select 
          value={model} 
          onValueChange={setModel}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multilingual-v2">Deep Multilingual v2</SelectItem>
            <SelectItem value="indian-v1">Deep Indian v1</SelectItem>
            <SelectItem value="turbo-v2">Deep Turbo v2</SelectItem>
            <SelectItem value="english-v1">Deep English v1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
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
      
      {/* Generate button moved above other buttons */}
      <Button 
        className="w-full" 
        size="lg"
        disabled={!currentVoice || !text.trim() || isGenerating} 
        onClick={handleGenerate}
      >
        <Play className="h-4 w-4 mr-2" />
        {isGenerating ? 'Generating...' : 'Generate'}
      </Button>
      
      <div className="flex justify-between items-center gap-2">
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
        
        <Button 
          variant="outline" 
          className="flex-1"
          disabled={!audioUrl || isGenerating}
          onClick={() => toast.success('Audio saved to your library')}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Button 
          variant="outline" 
          className="flex-1"
          disabled={!audioUrl || isGenerating}
          onClick={() => toast.success('Audio downloaded successfully')}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
      
      {audioUrl && (
        <div className="mt-6 border rounded-lg p-4 bg-secondary/30">
          <h3 className="text-sm font-medium mb-2">Generated Audio</h3>
          <audio 
            controls 
            className="w-full" 
            src={audioUrl}
          />
        </div>
      )}
    </div>
  );
};

export default TextToSpeechForm;
