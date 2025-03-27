
import React from 'react';
import EndpointSection from './EndpointSection';
import ParametersTable from './ParametersTable';
import { CodeBlock } from '@/components/CodeBlock';

const UploadReferenceAudioEndpoint: React.FC = () => {
  const parameters = [
    {
      name: "name",
      type: "string",
      location: "query",
      description: "Speaker name (e.g., \"Shashwat\")"
    },
    {
      name: "reference_text",
      type: "string",
      location: "query",
      description: "Reference text associated with the audio"
    }
  ];

  return (
    <EndpointSection
      title="1. Upload Reference Audio"
      description="Upload an audio file to be used as a reference for voice generation."
      method="POST"
      endpoint="/upload_audio"
      parameters={<ParametersTable parameters={parameters} />}
      requestBody={
        <>
          <p className="text-sm mb-2">Content-Type: multipart/form-data</p>
          <p className="text-sm">Required: Audio file</p>
        </>
      }
      responses={
        <>
          <p className="text-sm mb-2">200 Success:</p>
          <CodeBlock 
            code={`{
    "message": "File uploaded successfully",
    "id": "zea3b6b2"
}`} 
            language="json" 
            className="mb-4"
          />
          
          <p className="text-sm mb-2">422 Validation Error:</p>
          <CodeBlock 
            code={`{
    "detail": [
        {
            "loc": ["string", 0],
            "msg": "string",
            "type": "string"
        }
    ]
}`} 
            language="json" 
          />
        </>
      }
      examples={
        <>
          <p className="text-sm mb-2">cURL:</p>
          <CodeBlock 
            code={`curl -X 'POST' \\
  'https://api.msganesh.com/itts/upload_audio?name=Shashwat&reference_text=Sample+text' \\
  -H 'accept: application/json' \\
  -F 'file=@audio.wav'`} 
            language="bash" 
            className="mb-4"
          />
          
          <p className="text-sm mb-2">JavaScript:</p>
          <CodeBlock 
            code={`const formData = new FormData();
formData.append('file', audioFile);

const response = await fetch(
  'https://api.msganesh.com/itts/upload_audio?name=Shashwat&reference_text=Sample+text',
  {
    method: 'POST',
    body: formData
  }
);

const data = await response.json();
console.log(data);`} 
            language="javascript" 
          />
        </>
      }
    />
  );
};

export default UploadReferenceAudioEndpoint;
