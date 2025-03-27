
import React from 'react';
import EndpointSection from './EndpointSection';
import { CodeBlock } from '@/components/CodeBlock';

const GenerateSpeechEndpoint: React.FC = () => {
  return (
    <EndpointSection
      title="2. Generate Speech"
      description="Generate speech audio from text using a reference audio ID."
      method="POST"
      endpoint="/generate_speech"
      requestBody={
        <CodeBlock 
          code={`{
    "text": "Text to be converted to speech",
    "ref_audio_id": "2ea3b6b2"
}`} 
          language="json" 
        />
      }
      responses={
        <>
          <p className="text-sm mb-2">200 Success:</p>
          <CodeBlock 
            code={`{
    "message": "Audio and text saved successfully",
    "id": "597eae87"
}`} 
            language="json" 
          />
        </>
      }
      examples={
        <>
          <p className="text-sm mb-2">JavaScript:</p>
          <CodeBlock 
            code={`const response = await fetch('https://api.msganesh.com/itts/generate_speech', {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "text": "Text to be converted to speech",
    "ref_audio_id": "2ea3b6b2"
  })
});

const data = await response.json();
console.log(data);

// The generated audio can be accessed at:
// https://api.msganesh.com/itts/597eae87.wav`} 
            language="javascript" 
          />
        </>
      }
    />
  );
};

export default GenerateSpeechEndpoint;
