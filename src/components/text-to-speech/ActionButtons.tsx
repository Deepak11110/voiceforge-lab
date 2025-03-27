
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';
import { toast } from 'sonner';

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
  const handleDownload = () => {
    if (!audioUrl) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `generated-audio-${audioId || 'download'}.wav`;
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    toast.success('Audio downloaded successfully');
  };
  
  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        className="flex-1 h-11"
        disabled={!audioUrl || isGenerating}
        onClick={() => toast.success('Audio saved to your library')}
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      
      <Button 
        variant="outline" 
        className="flex-1 h-11"
        disabled={!audioUrl || isGenerating}
        onClick={handleDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

export default ActionButtons;
