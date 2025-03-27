import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';
import { useQuery, useMutation } from '@tanstack/react-query';
import { voiceApi, Speaker } from '@/services/voiceApi';
import { useDashboard } from '@/contexts/DashboardContext';

// Import our components
import ModelSelector from '@/components/text-to-speech/ModelSelector';
import VoiceSelector from '@/components/text-to-speech/VoiceSelector';
import LanguageSelector from '@/components/text-to-speech/LanguageSelector';
import TextInputArea from '@/components/text-to-speech/TextInputArea';
import VoiceSettings from '@/components/text-to-speech/VoiceSettings';
import GeneratedAudio from '@/components/text-to-speech/GeneratedAudio';
import ActionButtons from '@/components/text-to-speech/ActionButtons';
import ApiCodeBlock from '@/components/text-to-speech/ApiCodeBlock';

interface TextToSpeechFormProps {
  selectedVoice: Voice | null;
  voices: Voice[];
}

const TextToSpeechForm: React.FC<TextToSpeechFormProps> = ({ selectedVoice, voices: propVoices }) => {
  const { setVoices, handleVoiceCreated } = useDashboard();
  const [voices, setLocalVoices] = useState<Voice[]>(propVoices);
  const [text, setText] = useState<string>('');
  const [model, setModel] = useState<string>('multilingual-v2');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentVoice, setCurrentVoice] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('hindi');
  const [settings, setSettings] = useState({
    stability: 40,
    clarity: 75,
    style: 5
  });
  
  // Update local voices when prop voices change
  useEffect(() => {
    setLocalVoices(propVoices);
  }, [propVoices]);
  
  // Mutation for generating speech
  const generateMutation = useMutation({
    mutationFn: (params: { text: string; voiceId: string }) => 
      voiceApi.generateSpeech(params.text, params.voiceId),
    onSuccess: (data) => {
      const audioUrl = voiceApi.getAudioUrl(data.id);
      setAudioUrl(audioUrl);
      toast.success('Speech generated successfully');
      
      // Add to recent generations if using a real voice
      if (currentVoice) {
        const updatedVoices = voices.map(voice => {
          if (voice.id === currentVoice) {
            return {
              ...voice,
              recentGenerations: [
                {
                  id: data.id,
                  text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
                  date: 'just now'
                },
                ...voice.recentGenerations
              ].slice(0, 5) // Keep only the 5 most recent
            };
          }
          return voice;
        });
        
        setLocalVoices(updatedVoices);
        setVoices(updatedVoices);
      }
    },
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
    
    if (currentVoice) {
      // Use API to generate speech
      generateMutation.mutate({
        text,
        voiceId: currentVoice,
      });
    } else {
      toast.error('Please select a voice first.');
    }
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
  const isGenerating = generateMutation.isPending;

  return (
    <div className="space-y-5 p-6 border rounded-lg w-full max-w-3xl mx-auto animate-fade-in bg-white shadow-sm">
      <ModelSelector model={model} setModel={setModel} />
      
      <div className="border-t pt-4">
        <VoiceSelector 
          currentVoice={currentVoice} 
          setCurrentVoice={setCurrentVoice} 
          voices={voices} 
        />
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      
      <TextInputArea 
        text={text} 
        setText={setText} 
        currentVoiceData={currentVoiceData} 
        currentVoice={currentVoice}
        handleCopyText={handleCopyText}
        handleReset={handleReset}
      />
      
      {/* Voice Settings moved above Generate button */}
      <VoiceSettings settings={settings} handleSettingChange={handleSettingChange} />
      
      {/* Generate button */}
      <Button 
        className="w-full h-14 text-base font-medium shadow-sm" 
        size="lg"
        disabled={!currentVoice || !text.trim() || isGenerating} 
        onClick={handleGenerate}
      >
        <Play className="h-5 w-5 mr-2" />
        {isGenerating ? 'Generating...' : 'Generate'}
      </Button>
      
      {/* Action buttons below Generate */}
      <div className="pt-1">
        <ActionButtons 
          audioUrl={audioUrl} 
          isGenerating={isGenerating} 
          audioId={audioUrl ? audioUrl.split('/').pop()?.replace('.wav', '') || null : null}
        />
      </div>
      
      <GeneratedAudio audioUrl={audioUrl} />
      
      <ApiCodeBlock referenceAudioId={currentVoice || null} text={text} />
    </div>
  );
};

export default TextToSpeechForm;
