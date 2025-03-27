
import React, { createContext, useContext, useState } from 'react';
import { Speaker } from '@/services/voiceApi';
import { Creator } from '@/types/voice';

interface VoiceFormData {
  name: string;
  description: string;
  category: string;
  tags: string;
}

interface VoiceCreationContextType {
  formData: VoiceFormData;
  setFormData: React.Dispatch<React.SetStateAction<VoiceFormData>>;
  selectedSpeakerId: string | null;
  setSelectedSpeakerId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedGroupId: string | null;
  setSelectedGroupId: React.Dispatch<React.SetStateAction<string | null>>;
  groupSpeakers: Speaker[];
  setGroupSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  audioFile: File | null;
  setAudioFile: React.Dispatch<React.SetStateAction<File | null>>;
  referenceText: string;
  setReferenceText: React.Dispatch<React.SetStateAction<string>>;
  selectedCreatorId: string;
  setSelectedCreatorId: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const initialFormData: VoiceFormData = {
  name: '',
  description: '',
  category: '',
  tags: ''
};

const VoiceCreationContext = createContext<VoiceCreationContextType | undefined>(undefined);

export const VoiceCreationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<VoiceFormData>(initialFormData);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [groupSpeakers, setGroupSpeakers] = useState<Speaker[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [referenceText, setReferenceText] = useState<string>('');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('current'); // Default to current user

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const value = {
    formData,
    setFormData,
    selectedSpeakerId,
    setSelectedSpeakerId,
    selectedGroupId,
    setSelectedGroupId,
    groupSpeakers,
    setGroupSpeakers,
    audioFile,
    setAudioFile,
    referenceText,
    setReferenceText,
    selectedCreatorId,
    setSelectedCreatorId,
    handleChange,
    handleSelectChange
  };

  return (
    <VoiceCreationContext.Provider value={value}>
      {children}
    </VoiceCreationContext.Provider>
  );
};

export const useVoiceCreation = () => {
  const context = useContext(VoiceCreationContext);
  if (context === undefined) {
    throw new Error('useVoiceCreation must be used within a VoiceCreationProvider');
  }
  return context;
};
