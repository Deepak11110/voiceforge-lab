
import { useState, useEffect } from 'react';
import { Voice } from '@/types/voice';

export function useVoiceFiltering(voices: Voice[]) {
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);

  useEffect(() => {
    let result = [...voices];
    
    // Filter by search
    if (searchQuery) {
      result = result.filter(voice => 
        voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voice.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'personal') {
        result = result.filter(voice => !voice.isLegacy);
      } else if (activeTab === 'community') {
        // In a real app, this would filter based on community-contributed voices
        result = result.filter(voice => voice.tags.includes('Social'));
      } else if (activeTab === 'default') {
        result = result.filter(voice => voice.isLegacy);
      }
    }
    
    // Filter by category
    if (categoryFilter.length > 0) {
      result = result.filter(voice => categoryFilter.includes(voice.category));
    }
    
    // Filter by language
    if (languageFilter.length > 0) {
      result = result.filter(voice => languageFilter.includes(voice.language));
    }
    
    setFilteredVoices(result);
  }, [voices, searchQuery, activeTab, categoryFilter, languageFilter]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setCategoryFilter([]);
    setLanguageFilter([]);
  };

  return {
    filteredVoices,
    searchQuery,
    activeTab,
    categoryFilter,
    languageFilter,
    setFilteredVoices,
    setSearchQuery,
    setActiveTab,
    setCategoryFilter,
    setLanguageFilter,
    clearAllFilters
  };
}
