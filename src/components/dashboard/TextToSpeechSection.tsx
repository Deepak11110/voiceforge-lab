
import React from 'react';
import TextToSpeechForm from '@/components/TextToSpeechForm';
import { useDashboard } from '@/contexts/DashboardContext';

const TextToSpeechSection: React.FC = () => {
  const { selectedVoice, filteredVoices } = useDashboard();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Text to Speech</h2>
      <TextToSpeechForm selectedVoice={selectedVoice} voices={filteredVoices} />
    </div>
  );
};

export default TextToSpeechSection;
