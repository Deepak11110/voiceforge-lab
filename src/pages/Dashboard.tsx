import React, { useState, useEffect } from 'react';
import CreateVoiceDialog from '@/components/CreateVoiceDialog';
import TextToSpeechForm from '@/components/TextToSpeechForm';
import VoiceDetails from '@/components/VoiceDetails';
import AppHeader from '@/components/dashboard/AppHeader';
import SearchBar from '@/components/dashboard/SearchBar';
import FilterBar from '@/components/dashboard/FilterBar';
import TabSelector from '@/components/dashboard/TabSelector';
import VoiceList from '@/components/dashboard/VoiceList';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';

// Mock data with Indian voices
const mockVoices: Voice[] = [
  {
    id: '1',
    name: 'Riya Rao',
    description: 'Famous Customer Care Voice',
    category: 'Conversational',
    speakerId: 'SPKR-Riya001',
    audioId: 'AUD-RF245912',
    isLegacy: false,
    tags: ['Female', 'Indian', 'Customer Service', 'Professional', 'Clear'],
    language: 'Hindi',
    createdAt: '2023-08-15',
    recentGenerations: [
      {
        id: 'gen1',
        text: 'नमस्ते, दीप लैब्स में आपका स्वागत है। मैं आपकी किस प्रकार सहायता कर सकती हूँ?',
        date: '2 days ago'
      },
      {
        id: 'gen2',
        text: 'हमारी सहायता टीम से संपर्क करने के लिए धन्यवाद।',
        date: '5 days ago'
      }
    ]
  },
  {
    id: '2',
    name: 'Netra',
    description: 'Husky Conversational Voice',
    category: 'Social Media',
    speakerId: 'SPKR-Netra002',
    audioId: 'AUD-NT187634',
    isLegacy: false,
    tags: ['Female', 'Young', 'Husky', 'Casual', 'Social'],
    language: 'English (Indian)',
    createdAt: '2023-09-22',
    recentGenerations: [
      {
        id: 'gen3',
        text: 'Hey guys, welcome back to my channel!',
        date: '1 day ago'
      }
    ]
  },
  {
    id: '3',
    name: 'Anjali',
    description: 'Professional narration voice',
    category: 'Narration',
    speakerId: 'SPKR-Anjali003',
    audioId: 'AUD-AN123456',
    isLegacy: false,
    tags: ['Female', 'Indian', 'Professional', 'Calm', 'Narration'],
    language: 'Tamil',
    createdAt: '2023-07-10',
    recentGenerations: [
      {
        id: 'gen4',
        text: 'தொடக்கத்தில், ஆழத்தின் முகத்தில் இருள் இருந்தது.',
        date: '2 months ago'
      }
    ]
  },
  {
    id: '4',
    name: 'Kabir',
    description: 'News reporter voice',
    category: 'News',
    speakerId: 'SPKR-Kabir004',
    audioId: 'AUD-KB789012',
    isLegacy: true,
    tags: ['Male', 'Indian', 'Authoritative', 'News', 'Clear'],
    language: 'Marathi',
    createdAt: '2023-04-18',
    recentGenerations: [
      {
        id: 'gen6',
        text: 'ब्रेकिंग न्यूज: शास्त्रज्ञांनी क्वांटम कॉम्प्युटिंगमध्ये एक मोठी प्रगती केली आहे.',
        date: '3 months ago'
      }
    ]
  },
  {
    id: '5',
    name: 'Vikram',
    description: 'Character voice with personality',
    category: 'Characters',
    speakerId: 'SPKR-Vikram005',
    audioId: 'AUD-VK345678',
    isLegacy: true,
    tags: ['Male', 'Character', 'Eccentric', 'Animated', 'Unique'],
    language: 'Bengali',
    createdAt: '2023-03-05',
    recentGenerations: [
      {
        id: 'gen7',
        text: 'আরে, আমরা এখানে কী পেয়েছি? আরেকজন অ্যাডভেঞ্চারার?',
        date: '5 months ago'
      }
    ]
  },
  {
    id: '6',
    name: 'Deepak',
    description: 'News anchor with deep tone',
    category: 'News',
    speakerId: 'SPKR-Deepak006',
    audioId: 'AUD-DP901234',
    isLegacy: true,
    tags: ['Male', 'Deep', 'Authoritative', 'News', 'Professional'],
    language: 'Punjabi',
    createdAt: '2023-02-20',
    recentGenerations: [
      {
        id: 'gen8',
        text: 'ਸ਼ੁਭ ਸ਼ਾਮ, ਅੱਜ ਦੀ ਸਾਡੀ ਮੁੱਖ ਖ਼ਬਰ ਜਲਵਾਯੂ ਨੀਤੀ ਵਿੱਚ ਹਾਲੀਆ ਘਟਨਾਕ੍ਰਮ ਤੇ ਕੇਂਦ੍ਰਿਤ ਹੈ।',
        date: '4 months ago'
      }
    ]
  },
  {
    id: '7',
    name: 'Priya',
    description: 'Soft spoken social media personality',
    category: 'Social media',
    speakerId: 'SPKR-Priya007',
    audioId: 'AUD-PR567890',
    isLegacy: false,
    tags: ['Female', 'Young', 'Soft', 'Friendly', 'Social'],
    language: 'Telugu',
    createdAt: '2023-07-12',
    recentGenerations: [
      {
        id: 'gen9',
        text: 'హాయ్ అందరికీ! నేడు నేను నా ఉదయపు దినచర్యను మీ అందరితో పంచుకోవాలనుకుంటున్నాను.',
        date: '1 month ago'
      }
    ]
  },
  {
    id: '8',
    name: 'Meera',
    description: 'Professional audiobook narrator',
    category: 'Narration',
    speakerId: 'SPKR-Meera008',
    audioId: 'AUD-MR123789',
    isLegacy: true,
    tags: ['Female', 'Mature', 'Professional', 'Audiobook', 'Expressive'],
    language: 'Malayalam',
    createdAt: '2023-01-15',
    recentGenerations: [
      {
        id: 'gen10',
        text: 'അധ്യായം ഒന്ന്. പഴയ വീട് കുന്നിൻമുകളിൽ നിന്നു, സന്ധ്യാ ആകാശത്തിനെതിരെ ഒരു നിഴൽചിത്രമായി നിന്നു.',
        date: '6 months ago'
      }
    ]
  }
];

const Dashboard: React.FC = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setVoices(mockVoices);
      setFilteredVoices(mockVoices);
    }, 500);
  }, []);
  
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
  
  const handleSelectVoice = (voice: Voice) => {
    setSelectedVoice(voice);
    setDetailsVisible(true);
  };
  
  const handlePlayVoice = (voice: Voice) => {
    setSelectedVoice(voice);
    toast.success(`Now playing a sample of ${voice.name}`);
  };
  
  const handleViewVoice = (voice: Voice) => {
    setSelectedVoice(voice);
    setDetailsVisible(true);
  };
  
  const closeDetails = () => {
    setDetailsVisible(false);
  };
  
  const handleVoiceCreated = () => {
    toast.success('New voice created successfully!');
    // In a real app, this would refetch the voices list
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setCategoryFilter([]);
    setLanguageFilter([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Text to Speech</h2>
            <TextToSpeechForm selectedVoice={selectedVoice} voices={filteredVoices} />
          </div>
        </div>
      </main>
      
      {detailsVisible && <VoiceDetails voice={selectedVoice} onClose={closeDetails} />}
    </div>
  );
};

export default Dashboard;
