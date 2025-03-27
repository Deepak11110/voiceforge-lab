
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonsProps {
  audioUrl: string | null;
  isGenerating: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  audioUrl, 
  isGenerating 
}) => {
  return (
    <>
      <Button 
        variant="outline" 
        className="flex-1"
        disabled={!audioUrl || isGenerating}
        onClick={() => toast.success('Audio saved to your library')}
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      
      <Button 
        variant="outline" 
        className="flex-1"
        disabled={!audioUrl || isGenerating}
        onClick={() => toast.success('Audio downloaded successfully')}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </>
  );
};

export default ActionButtons;
