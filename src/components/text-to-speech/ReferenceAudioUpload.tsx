
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReferenceAudioUploadProps {
  uploadedAudioFile: File | null;
  uploadedAudioName: string;
  referenceText: string;
  isUploading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUploadedAudioName: (name: string) => void;
  setReferenceText: (text: string) => void;
  handleUploadAudio: () => void;
}

const ReferenceAudioUpload: React.FC<ReferenceAudioUploadProps> = ({
  uploadedAudioFile,
  uploadedAudioName,
  referenceText,
  isUploading,
  handleFileChange,
  setUploadedAudioName,
  setReferenceText,
  handleUploadAudio
}) => {
  return (
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
          <Input
            type="text"
            placeholder="Voice name"
            className="w-full"
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
  );
};

export default ReferenceAudioUpload;
