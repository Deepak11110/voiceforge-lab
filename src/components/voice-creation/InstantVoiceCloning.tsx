
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Mic } from 'lucide-react';
import { useVoiceCreation } from './VoiceCreationContext';
import { toast } from 'sonner';
import CreatorSelection from './CreatorSelection';

const InstantVoiceCloning: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSelectChange,
    audioFile,
    setAudioFile,
    referenceText,
    setReferenceText
  } = useVoiceCreation();
  
  const [isRecording, setIsRecording] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        toast.success(`File "${file.name}" uploaded successfully`);
      } else {
        toast.error('Please upload an audio file');
      }
    }
  };
  
  const handleRecordVoice = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('Recording started...');
      // This would be implemented with actual recording functionality
    } else {
      toast.success('Recording stopped');
      // This would finish the recording and save it
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="voice-name">Voice Name</Label>
          <Input 
            id="voice-name" 
            name="name"
            placeholder="Enter a name for your voice" 
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="voice-category">Voice Category</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('category', value)}
            value={formData.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="narration">Narration</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="characters">Characters</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="voice-description">Description</Label>
        <Textarea 
          id="voice-description" 
          name="description"
          placeholder="Describe this voice (optional)" 
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="voice-tags">Tags (comma separated)</Label>
        <Input 
          id="voice-tags" 
          name="tags"
          placeholder="e.g., female, young, american, calm" 
          value={formData.tags}
          onChange={handleChange}
        />
      </div>
      
      {/* Add the Creator Selection component */}
      <CreatorSelection />
      
      <div className="border rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-medium">Voice Sample</h3>
        <p className="text-sm text-muted-foreground">
          Upload an audio sample or record directly from your microphone.
        </p>
        
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <label>
              <Upload className="mr-2 h-4 w-4" />
              Upload file
              <input 
                type="file" 
                className="hidden" 
                accept="audio/*"
                onChange={handleFileUpload} 
              />
            </label>
          </Button>
          <Button 
            variant="outline" 
            className={`flex-1 ${isRecording ? 'bg-red-100' : ''}`}
            onClick={handleRecordVoice}
          >
            <Mic className="mr-2 h-4 w-4" />
            {isRecording ? 'Stop recording' : 'Record voice'}
          </Button>
        </div>
        
        {audioFile && (
          <div className="text-sm mt-2">
            Selected file: <span className="font-medium">{audioFile.name}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reference-text">Reference Text</Label>
        <Textarea 
          id="reference-text" 
          placeholder="Enter the text that matches your audio sample" 
          value={referenceText}
          onChange={(e) => setReferenceText(e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          This text should match what is spoken in your audio sample for better voice cloning results.
        </p>
      </div>
    </div>
  );
};

export default InstantVoiceCloning;
