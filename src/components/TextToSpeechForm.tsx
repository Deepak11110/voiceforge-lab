
import React, { useState, useEffect } from 'react';
import { Play, Upload } from 'lucide-react';
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
import { CodeBlock } from './CodeBlock';

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
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
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
  
  useEffect(() => {
    if (speakersData) {
      setSpeakers(speakersData);
    }
  }, [speakersData]);
  
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
  
  const currentVoiceData = voices.find(v => v.id === currentVoice) || selectedVoice;
  const isGenerating = generateMutation.isPending;
  const isUploading = uploadMutation.isPending;

  return (
    <div className="space-y-4 p-6 border rounded-lg w-full max-w-3xl mx-auto animate-fade-in bg-white shadow-sm">
      <ModelSelector model={model} setModel={setModel} />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-medium">Reference Audio</h3>
          <div className="text-xs text-muted-foreground">
            Upload your own voice sample or select from available speakers
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="file"
              id="audio-file"
              className="hidden"
              accept="audio/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="audio-file"
              className="flex items-center justify-center w-full p-2 border border-dashed rounded-md cursor-pointer hover:bg-muted"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploadedAudioFile ? uploadedAudioFile.name : 'Choose audio file'}
            </label>
          </div>
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="Voice name"
              className="w-full p-2 border rounded-md"
              value={uploadedAudioName}
              onChange={(e) => setUploadedAudioName(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleUploadAudio}
            disabled={!uploadedAudioFile || !uploadedAudioName || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
        
        <div className="p-2 border rounded-md">
          <textarea
            placeholder="Reference text (optional)"
            className="w-full resize-none border-0 focus:ring-0 p-1"
            rows={2}
            value={referenceText}
            onChange={(e) => setReferenceText(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-md font-medium mb-2">Available Speakers</h3>
        {isLoadingSpeakers ? (
          <div className="text-center p-4">Loading speakers...</div>
        ) : speakers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {speakers.map(speaker => (
              <div 
                key={speaker.id} 
                className={`p-2 border rounded-md cursor-pointer ${
                  selectedSpeaker?.id === speaker.id ? 'bg-primary/20 border-primary' : ''
                }`}
                onClick={() => {
                  setSelectedSpeaker(speaker);
                  setReferenceAudioId(speaker.id);
                }}
              >
                <div className="font-medium">{speaker.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {speaker.reference_text}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            No speakers available. Upload a reference audio to get started.
          </div>
        )}
      </div>
      
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
      
      {referenceAudioId && (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <h3 className="text-sm font-medium mb-2">API Integration Code</h3>
          <CodeBlock
            code={`// Generate speech using the selected reference audio
fetch('https://api.msganesh.com/itts/generate_speech', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: "${text || 'Your text here'}",
    ref_audio_id: "${referenceAudioId}"
  })
})
.then(response => response.json())
.then(data => {
  // Access generated audio at:
  // https://api.msganesh.com/itts/{data.id}.wav
  console.log(data);
})
.catch(error => console.error('Error:', error));`}
            language="javascript"
          />
        </div>
      )}
    </div>
  );
};

export default TextToSpeechForm;
