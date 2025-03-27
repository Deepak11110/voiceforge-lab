
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ModelSelectorProps {
  model: string;
  setModel: (value: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ model, setModel }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="voice-model">Model</Label>
      <Select 
        value={model} 
        onValueChange={setModel}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="multilingual-v2">Deep Multilingual v2</SelectItem>
          <SelectItem value="indian-v1">Deep Indian v1</SelectItem>
          <SelectItem value="turbo-v2">Deep Turbo v2</SelectItem>
          <SelectItem value="english-v1">Deep English v1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
