
import { Voice } from '@/types/voice';

// Mock data with Indian voices
export const mockVoices: Voice[] = [
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
