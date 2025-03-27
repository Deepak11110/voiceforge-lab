
import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';

interface ApiCodeBlockProps {
  referenceAudioId: string | null;
  text: string;
}

const ApiCodeBlock: React.FC<ApiCodeBlockProps> = ({ referenceAudioId, text }) => {
  if (!referenceAudioId) return null;
  
  return (
    <div className="mt-4 p-4 bg-muted rounded-md">
      <h3 className="text-sm font-medium mb-2">API Integration Code</h3>
      <CodeBlock
        code={`// Generate speech using the selected reference audio
fetch('https://api.msganesh.com/itts/generate_speech', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: "${text || 'Your text here'}",
    ref_audio_id: "${referenceAudioId}"
  })
})
.then(response => response.json())
.then(data => {
  // Access generated audio at:
  // https://api.msganesh.com/itts/{data.id}.wav
  console.log(data);
})
.catch(error => console.error('Error:', error));`}
        language="javascript"
      />
    </div>
  );
};

export default ApiCodeBlock;
