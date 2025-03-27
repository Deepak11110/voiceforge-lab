
import React from 'react';
import CreateVoiceDialog from '@/components/CreateVoiceDialog';
import SearchBar from '@/components/dashboard/SearchBar';
import FilterBar from '@/components/dashboard/FilterBar';
import TabSelector from '@/components/dashboard/TabSelector';
import VoiceList from '@/components/dashboard/VoiceList';
import { useDashboard } from '@/contexts/DashboardContext';

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
    handleVoiceCreated
  } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Voices</h2>
        <CreateVoiceDialog onVoiceCreated={handleVoiceCreated} />
      </div>
      
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
    </div>
  );
};

export default VoiceManagement;
