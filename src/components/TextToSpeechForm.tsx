
import React, { useState, useEffect, useRef } from 'react';
import { Play, Clock } from 'lucide-react';
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
  
  // Generation timer states
  const [generationTime, setGenerationTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update local voices when prop voices change
  useEffect(() => {
    setLocalVoices(propVoices);
  }, [propVoices]);
  
  // Timer effect
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setGenerationTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerActive]);
  
  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Mutation for generating speech
  const generateMutation = useMutation({
    mutationFn: (params: { text: string; voiceId: string }) => 
      voiceApi.generateSpeech(params.text, params.voiceId),
    onSuccess: (data) => {
      const audioUrl = voiceApi.getAudioUrl(data.id);
      setAudioUrl(audioUrl);
      setTimerActive(false); // Stop timer on success
      toast.success(`Speech generated in ${formatTime(generationTime)}`);
      
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
    onError: () => {
      setTimerActive(false); // Stop timer on error
    }
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
      // Reset and start the timer
      setGenerationTime(0);
      setTimerActive(true);
      
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
      <div className="relative">
        <Button 
          className="w-full h-14 text-base font-medium shadow-sm" 
          size="lg"
          disabled={!currentVoice || !text.trim() || isGenerating} 
          onClick={handleGenerate}
        >
          <Play className="h-5 w-5 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate'}
        </Button>
        
        {/* Generation timer */}
        {isGenerating && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-sm font-mono bg-primary/10 px-2 py-1 rounded">
            <Clock className="h-3.5 w-3.5 mr-1 animate-pulse" />
            {formatTime(generationTime)}
          </div>
        )}
      </div>
      
      {/* Action buttons below Generate as a horizontal row */}
      <ActionButtons 
        audioUrl={audioUrl} 
        isGenerating={isGenerating} 
        audioId={audioUrl ? audioUrl.split('/').pop()?.replace('.wav', '') || null : null}
      />
      
      <GeneratedAudio audioUrl={audioUrl} />
      
      <ApiCodeBlock referenceAudioId={currentVoice || null} text={text} />
    </div>
  );
};

export default TextToSpeechForm;
