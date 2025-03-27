
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';
import { useQuery, useMutation } from '@tanstack/react-query';
import { voiceApi, Speaker } from '@/services/voiceApi';

// Import our components
import ModelSelector from '@/components/text-to-speech/ModelSelector';
import VoiceSelector from '@/components/text-to-speech/VoiceSelector';
import LanguageSelector from '@/components/text-to-speech/LanguageSelector';
import TextInputArea from '@/components/text-to-speech/TextInputArea';
import VoiceSettings from '@/components/text-to-speech/VoiceSettings';
import GeneratedAudio from '@/components/text-to-speech/GeneratedAudio';
import ActionButtons from '@/components/text-to-speech/ActionButtons';
import ReferenceAudioUpload from '@/components/text-to-speech/ReferenceAudioUpload';
import SpeakersDisplay from '@/components/text-to-speech/SpeakersDisplay';
import ApiCodeBlock from '@/components/text-to-speech/ApiCodeBlock';

interface TextToSpeechFormProps {
  selectedVoice: Voice | null;
  voices: Voice[];
}

const TextToSpeechForm: React.FC<TextToSpeechFormProps> = ({ selectedVoice, voices }) => {
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
  const [referenceAudioId, setReferenceAudioId] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [uploadedAudioFile, setUploadedAudioFile] = useState<File | null>(null);
  const [uploadedAudioName, setUploadedAudioName] = useState<string>('');
  const [referenceText, setReferenceText] = useState<string>('');
  
  // Query for fetching speakers
  const { data: speakersData, isLoading: isLoadingSpeakers } = useQuery({
    queryKey: ['speakers'],
    queryFn: voiceApi.getSpeakers,
  });
  
  // Mutation for uploading reference audio
  const uploadMutation = useMutation({
    mutationFn: (params: { file: File; name: string; referenceText: string }) => 
      voiceApi.uploadReferenceAudio(params.file, params.name, params.referenceText),
    onSuccess: (data) => {
      toast.success('Reference audio uploaded successfully');
      setReferenceAudioId(data.id);
    },
  });
  
  // Mutation for generating speech
  const generateMutation = useMutation({
    mutationFn: (params: { text: string; refAudioId: string }) => 
      voiceApi.generateSpeech(params.text, params.refAudioId),
    onSuccess: (data) => {
      const audioUrl = voiceApi.getAudioUrl(data.id);
      setAudioUrl(audioUrl);
      toast.success('Speech generated successfully');
    },
  });
  
  useEffect(() => {
    if (selectedVoice) {
      setCurrentVoice(selectedVoice.id);
    }
  }, [selectedVoice]);
  
  const speakers = speakersData || [];
  
  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to generate speech.');
      return;
    }
    
    if (referenceAudioId) {
      // Use API to generate speech
      generateMutation.mutate({
        text,
        refAudioId: referenceAudioId,
      });
    } else if (currentVoice) {
      // Use mock generation for regular voices
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAudioUrl('https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3');
      const selectedVoiceData = voices.find(v => v.id === currentVoice);
      toast.success(`Audio generated successfully with ${selectedVoiceData?.name || 'selected voice'} in ${language}!`);
    } else {
      toast.error('Please select a voice or upload a reference audio first.');
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedAudioFile(e.target.files[0]);
    }
  };
  
  const handleUploadAudio = async () => {
    if (!uploadedAudioFile) {
      toast.error('Please select an audio file first');
      return;
    }
    
    if (!uploadedAudioName.trim()) {
      toast.error('Please provide a name for the voice');
      return;
    }
    
    uploadMutation.mutate({
      file: uploadedAudioFile,
      name: uploadedAudioName,
      referenceText: referenceText || 'Sample reference text',
    });
  };
  
  const handleSelectSpeaker = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setReferenceAudioId(speaker.id);
  };
  
  const currentVoiceData = voices.find(v => v.id === currentVoice) || selectedVoice;
  const isGenerating = generateMutation.isPending;
  const isUploading = uploadMutation.isPending;

  return (
    <div className="space-y-4 p-6 border rounded-lg w-full max-w-3xl mx-auto animate-fade-in bg-white shadow-sm">
      <ModelSelector model={model} setModel={setModel} />
      
      <ReferenceAudioUpload 
        uploadedAudioFile={uploadedAudioFile}
        uploadedAudioName={uploadedAudioName}
        referenceText={referenceText}
        isUploading={isUploading}
        handleFileChange={handleFileChange}
        setUploadedAudioName={setUploadedAudioName}
        setReferenceText={setReferenceText}
        handleUploadAudio={handleUploadAudio}
      />
      
      <SpeakersDisplay 
        speakers={speakers}
        selectedSpeaker={selectedSpeaker}
        isLoadingSpeakers={isLoadingSpeakers}
        onSelectSpeaker={handleSelectSpeaker}
      />
      
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
      
      {/* Generate button moved above other buttons */}
      <Button 
        className="w-full" 
        size="lg"
        disabled={(!currentVoice && !referenceAudioId) || !text.trim() || isGenerating} 
        onClick={handleGenerate}
      >
        <Play className="h-4 w-4 mr-2" />
        {isGenerating ? 'Generating...' : 'Generate'}
      </Button>
      
      <div className="flex justify-between items-center gap-2">
        <VoiceSettings settings={settings} handleSettingChange={handleSettingChange} />
        <ActionButtons 
          audioUrl={audioUrl} 
          isGenerating={isGenerating} 
          audioId={audioUrl ? audioUrl.split('/').pop()?.replace('.wav', '') || null : null}
        />
      </div>
      
      <GeneratedAudio audioUrl={audioUrl} />
      
      <ApiCodeBlock referenceAudioId={referenceAudioId} text={text} />
    </div>
  );
};

export default TextToSpeechForm;
