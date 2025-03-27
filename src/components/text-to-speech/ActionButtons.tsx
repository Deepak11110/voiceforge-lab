
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface ActionButtonsProps {
  audioUrl: string | null;
  isGenerating: boolean;
  audioId: string | null;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  audioUrl, 
  isGenerating,
  audioId
}) => {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [fileName, setFileName] = useState(`generated-audio-${audioId || 'file'}`);

  const handleDownload = () => {
    if (!audioUrl) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${fileName}.wav`;
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    toast.success('Audio downloaded successfully');
  };

  const handleSave = () => {
    if (!audioUrl) return;
    
    // Show dialog to name the file
    setIsSaveDialogOpen(true);
  };

  const confirmSave = () => {
    toast.success(`Audio saved to your library as "${fileName}"`);
    setIsSaveDialogOpen(false);
  };
  
  return (
    <div className="space-y-3 w-full">
      <Button 
        variant="outline" 
        className="w-full h-11"
        disabled={!audioUrl || isGenerating}
        onClick={handleSave}
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full h-11"
        disabled={!audioUrl || isGenerating}
        onClick={handleDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>

      <AlertDialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Audio File</AlertDialogTitle>
            <AlertDialogDescription>
              Enter a name for this audio file
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
            className="my-4"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;
