
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyVoiceListProps {
  onClearFilters: () => void;
}

const EmptyVoiceList: React.FC<EmptyVoiceListProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-muted/40">
      <p className="text-muted-foreground mb-4">No voices match your current filters.</p>
      <Button variant="outline" onClick={onClearFilters}>
        Clear all filters
      </Button>
    </div>
  );
};

export default EmptyVoiceList;
