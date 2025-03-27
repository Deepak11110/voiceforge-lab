
import React, { useState, useEffect } from 'react';
import { Search, Filter, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import VoiceCard from '@/components/VoiceCard';
import VoiceDetails from '@/components/VoiceDetails';
import CreateVoiceDialog from '@/components/CreateVoiceDialog';
import TextToSpeechForm from '@/components/TextToSpeechForm';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';

// Mock data
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
    createdAt: '2023-08-15',
    recentGenerations: [
      {
        id: 'gen1',
        text: 'Welcome to Deep Labs, how may I assist you today?',
        date: '2 days ago'
      },
      {
        id: 'gen2',
        text: 'Thank you for contacting our support team.',
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
    name: 'Rachel',
    description: 'Professional narration voice',
    category: 'Narration',
    speakerId: 'SPKR-Rachel003',
    audioId: 'AUD-RC123456',
    isLegacy: true,
    tags: ['Female', 'American', 'Professional', 'Calm', 'Narration'],
    createdAt: '2023-05-10',
    recentGenerations: [
      {
        id: 'gen4',
        text: 'In the beginning, there was darkness across the face of the deep.',
        date: '2 months ago'
      },
      {
        id: 'gen5',
        text: 'The history of artificial intelligence begins with ancient myths and stories.',
        date: '2 months ago'
      }
    ]
  },
  {
    id: '4',
    name: 'Drew',
    description: 'News reporter voice',
    category: 'News',
    speakerId: 'SPKR-Drew004',
    audioId: 'AUD-DW789012',
    isLegacy: true,
    tags: ['Male', 'American', 'Authoritative', 'News', 'Clear'],
    createdAt: '2023-04-18',
    recentGenerations: [
      {
        id: 'gen6',
        text: 'Breaking news: Scientists discover a breakthrough in quantum computing.',
        date: '3 months ago'
      }
    ]
  },
  {
    id: '5',
    name: 'Clyde',
    description: 'Character voice with personality',
    category: 'Characters',
    speakerId: 'SPKR-Clyde005',
    audioId: 'AUD-CL345678',
    isLegacy: true,
    tags: ['Male', 'Character', 'Eccentric', 'Animated', 'Unique'],
    createdAt: '2023-03-05',
    recentGenerations: [
      {
        id: 'gen7',
        text: 'Well well well, what do we have here? Another adventurer?',
        date: '5 months ago'
      }
    ]
  },
  {
    id: '6',
    name: 'Paul',
    description: 'News anchor with deep tone',
    category: 'News',
    speakerId: 'SPKR-Paul006',
    audioId: 'AUD-PL901234',
    isLegacy: true,
    tags: ['Male', 'Deep', 'Authoritative', 'News', 'Professional'],
    createdAt: '2023-02-20',
    recentGenerations: [
      {
        id: 'gen8',
        text: 'Good evening, our top story tonight focuses on recent developments in climate policy.',
        date: '4 months ago'
      }
    ]
  },
  {
    id: '7',
    name: 'Aria',
    description: 'Soft spoken social media personality',
    category: 'Social media',
    speakerId: 'SPKR-Aria007',
    audioId: 'AUD-AR567890',
    isLegacy: false,
    tags: ['Female', 'Young', 'Soft', 'Friendly', 'Social'],
    createdAt: '2023-07-12',
    recentGenerations: [
      {
        id: 'gen9',
        text: 'Hi everyone! Today I want to share my morning routine with all of you.',
        date: '1 month ago'
      }
    ]
  },
  {
    id: '8',
    name: 'Domi',
    description: 'Professional audiobook narrator',
    category: 'Narration',
    speakerId: 'SPKR-Domi008',
    audioId: 'AUD-DM123789',
    isLegacy: true,
    tags: ['Female', 'Mature', 'Professional', 'Audiobook', 'Expressive'],
    createdAt: '2023-01-15',
    recentGenerations: [
      {
        id: 'gen10',
        text: 'Chapter One. The old house stood atop the hill, silhouetted against the evening sky.',
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
    
    setFilteredVoices(result);
  }, [voices, searchQuery, activeTab, categoryFilter]);
  
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Deep Labs</h1>
          
          <nav className="flex items-center gap-6">
            <Tabs defaultValue="voices" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="voices">Voices</TabsTrigger>
                <TabsTrigger value="library">Library</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              Documentation
            </Button>
            <Button variant="outline">
              Feedback
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Voices</h2>
              <CreateVoiceDialog onVoiceCreated={handleVoiceCreated} />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search voices..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Categories</span>
                      {categoryFilter.length > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center"
                        >
                          {categoryFilter.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {['Narration', 'Conversational', 'News', 'Characters', 'Social Media'].map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={categoryFilter.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCategoryFilter(prev => [...prev, category]);
                          } else {
                            setCategoryFilter(prev => prev.filter(item => item !== category));
                          }
                        }}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline">
                  Recent
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
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
            
            <div className="space-y-3">
              {filteredVoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-muted/40">
                  <p className="text-muted-foreground mb-4">No voices match your current filters.</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                    setCategoryFilter([]);
                  }}>
                    Clear all filters
                  </Button>
                </div>
              ) : (
                filteredVoices.map(voice => (
                  <VoiceCard 
                    key={voice.id}
                    voice={voice}
                    onSelect={handleSelectVoice}
                    onPlay={handlePlayVoice}
                    onView={handleViewVoice}
                  />
                ))
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Text to Speech</h2>
            <TextToSpeechForm selectedVoice={selectedVoice} />
          </div>
        </div>
      </main>
      
      {detailsVisible && <VoiceDetails voice={selectedVoice} onClose={closeDetails} />}
    </div>
  );
};

export default Dashboard;
