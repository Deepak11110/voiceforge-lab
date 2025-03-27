
import { toast } from 'sonner';

const BASE_URL = 'https://api.msganesh.com/itts';

// Types for our API responses
export interface Speaker {
  name: string;
  id: string;
  path: string;
  reference_text: string;
}

export interface UploadResponse {
  message: string;
  id: string;
}

export interface GenerateSpeechResponse {
  message: string;
  id: string;
}

// Error handling utility
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  const errorMessage = error.response?.data?.detail?.[0]?.msg || 
                      error.message || 
                      'An error occurred while communicating with the server';
  toast.error(errorMessage);
  throw error;
};

// API methods
export const voiceApi = {
  // Upload reference audio
  uploadReferenceAudio: async (
    file: File, 
    name: string, 
    referenceText: string
  ): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const url = `${BASE_URL}/upload_audio?name=${encodeURIComponent(name)}&reference_text=${encodeURIComponent(referenceText)}`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Generate speech from text
  generateSpeech: async (
    text: string, 
    refAudioId: string
  ): Promise<GenerateSpeechResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/generate_speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text,
          ref_audio_id: refAudioId,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Get available speakers
  getSpeakers: async (): Promise<Speaker[]> => {
    try {
      const response = await fetch(`${BASE_URL}/get_speakers`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.speakers || [];
    } catch (error) {
      handleApiError(error);
      return [];
    }
  },
  
  // Get audio URL for a generated audio file
  getAudioUrl: (audioId: string): string => {
    return `${BASE_URL}/${audioId}.wav`;
  },
};
