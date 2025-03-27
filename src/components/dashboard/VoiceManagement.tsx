
import React, { useState } from 'react';
import CreateVoiceDialog from '@/components/CreateVoiceDialog';
import SearchBar from '@/components/dashboard/SearchBar';
import FilterBar from '@/components/dashboard/FilterBar';
import TabSelector from '@/components/dashboard/TabSelector';
import VoiceList from '@/components/dashboard/VoiceList';
import SpeakerGroups from '@/components/dashboard/SpeakerGroups';
import { useDashboard } from '@/contexts/DashboardContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VoiceManagement: React.FC = () => {
  const {
    filteredVoices,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    languageFilter,
    setLanguageFilter,
    activeTab,
    setActiveTab,
    handleSelectVoice,
    handlePlayVoice,
    handleViewVoice,
    clearAllFilters,
    handleVoiceCreated,
    speakers,
    speakerGroups,
    createSpeakerGroup
  } = useDashboard();
  
  const [currentView, setCurrentView] = useState<'voices' | 'groups'>('voices');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Voices</h2>
        <CreateVoiceDialog onVoiceCreated={handleVoiceCreated} />
      </div>
      
      <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'voices' | 'groups')}>
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="voices">Voice Management</TabsTrigger>
          <TabsTrigger value="groups">Speaker Groups</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {currentView === 'voices' ? (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            
            <FilterBar 
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
            />
          </div>
          
          <TabSelector 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          
          <VoiceList 
            voices={filteredVoices}
            onSelectVoice={handleSelectVoice}
            onPlayVoice={handlePlayVoice}
            onViewVoice={handleViewVoice}
            onClearFilters={clearAllFilters}
          />
        </>
      ) : (
        <SpeakerGroups 
          speakers={speakers} 
          onCreateGroup={createSpeakerGroup}
          groups={speakerGroups}
        />
      )}
    </div>
  );
};

export default VoiceManagement;
