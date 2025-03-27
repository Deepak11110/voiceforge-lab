
import React from 'react';
import EndpointSection from './EndpointSection';
import ParametersTable from './ParametersTable';
import { CodeBlock } from '@/components/CodeBlock';

const DownloadAudioEndpoint: React.FC = () => {
  const parameters = [
    {
      name: "audioId",
      type: "string",
      location: "path",
      description: "ID of the audio file to download (required)"
    }
  ];

  return (
    <EndpointSection
      title="4. Download Generated Audio"
      description="Download a generated audio file by its ID."
      method="GET"
      endpoint="/{audioId}.wav"
      parameters={<ParametersTable parameters={parameters} />}
      responses={
        <>
          <p className="text-sm">200 Success: Audio file with Content-Type: audio/wav</p>
          <p className="text-sm">404 Not Found: If audio with given ID doesn't exist</p>
        </>
      }
      examples={
        <>
          <p className="text-sm mb-2">JavaScript:</p>
          <CodeBlock 
            code={`// Method 1: Using fetch with a download link
const audioId = "5070a087";
const url = \`https://api.msganesh.com/itts/\${audioId}.wav\`;

// Create a download link
const link = document.createElement('a');
link.href = url;
link.download = \`audio-\${audioId}.wav\`;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

// Method 2: Using fetch to get the audio data
const response = await fetch(url);
const blob = await response.blob();
const objectUrl = URL.createObjectURL(blob);

// Play or download the audio
const audio = new Audio(objectUrl);
audio.play();`} 
            language="javascript" 
          />
        </>
      }
    />
  );
};

export default DownloadAudioEndpoint;
