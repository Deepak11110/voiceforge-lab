
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
      <TabsList className="w-full flex justify-start mb-4 bg-transparent p-0 h-9">
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-secondary rounded-md px-3"
        >
          All
        </TabsTrigger>
        <TabsTrigger 
          value="personal" 
          className="data-[state=active]:bg-secondary rounded-md px-3"
        >
          Personal
        </TabsTrigger>
        <TabsTrigger 
          value="community" 
          className="data-[state=active]:bg-secondary rounded-md px-3"
        >
          Community
        </TabsTrigger>
        <TabsTrigger 
          value="default" 
          className="data-[state=active]:bg-secondary rounded-md px-3"
        >
          Default
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabSelector;
