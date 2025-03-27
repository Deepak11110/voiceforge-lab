
import React from 'react';
import EndpointSection from './EndpointSection';
import { CodeBlock } from '@/components/CodeBlock';

const GetSpeakersEndpoint: React.FC = () => {
  return (
    <EndpointSection
      title="3. Get Available Speakers"
      description="Retrieve a list of available speakers/reference audios."
      method="GET"
      endpoint="/get_speakers"
      responses={
        <>
          <p className="text-sm mb-2">200 Success:</p>
          <CodeBlock 
            code={`{
    "speakers": [
        {
            "name": "real",
            "id": "b18172cd",
            "path": "/path/to/audio.wav",
            "reference_text": "Sample reference text"
        },
        {
            "name": "Shashwat",
            "id": "zea3bbb2",
            "path": "/path/to/audio.wav",
            "reference_text": "Sample reference text"
        }
    ]
}`} 
            language="json" 
          />
        </>
      }
      examples={
        <>
          <p className="text-sm mb-2">JavaScript:</p>
          <CodeBlock 
            code={`const response = await fetch('https://api.msganesh.com/itts/get_speakers', {
  method: 'GET',
  headers: {
    'accept': 'application/json'
  }
});

const data = await response.json();
console.log(data.speakers);`} 
            language="javascript" 
          />
        </>
      }
    />
  );
};

export default GetSpeakersEndpoint;
