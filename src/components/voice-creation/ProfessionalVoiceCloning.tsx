
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const ProfessionalVoiceCloning: React.FC = () => {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-medium mb-2">Professional Voice Cloning</h3>
      <p className="text-muted-foreground mb-4">
        Upload multiple high-quality samples for professional-grade voice cloning. 
        This method requires more audio but produces superior results.
      </p>
      
      <Button variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Upload multiple files
      </Button>
    </div>
  );
};

export default ProfessionalVoiceCloning;
