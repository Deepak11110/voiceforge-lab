
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';

// Import our new components
import ModelSelector from '@/components/text-to-speech/ModelSelector';
import VoiceSelector from '@/components/text-to-speech/VoiceSelector';
import LanguageSelector from '@/components/text-to-speech/LanguageSelector';
import TextInputArea from '@/components/text-to-speech/TextInputArea';
import VoiceSettings from '@/components/text-to-speech/VoiceSettings';
import GeneratedAudio from '@/components/text-to-speech/GeneratedAudio';
import ActionButtons from '@/components/text-to-speech/ActionButtons';

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
      <ModelSelector model={model} setModel={setModel} />
      <VoiceSelector 
        currentVoice={currentVoice} 
        setCurrentVoice={setCurrentVoice} 
        voices={voices} 
      />
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <TextInputArea 
        text={text} 
        setText={setText} 
        currentVoiceData={currentVoiceData} 
        currentVoice={currentVoice}
        handleCopyText={handleCopyText}
        handleReset={handleReset}
      />
      
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
        <VoiceSettings settings={settings} handleSettingChange={handleSettingChange} />
        <ActionButtons audioUrl={audioUrl} isGenerating={isGenerating} />
      </div>
      
      <GeneratedAudio audioUrl={audioUrl} />
    </div>
  );
};

export default TextToSpeechForm;
