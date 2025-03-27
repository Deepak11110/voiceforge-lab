
import React from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { CodeBlock } from '@/components/CodeBlock';

const ApiDocs: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-8 max-w-5xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-muted-foreground">
            Comprehensive documentation for the Voice Generation API
          </p>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p>
              The Voice Generation API allows you to upload reference audio, generate speech from text,
              and manage speakers. This documentation provides details on how to interact with the API endpoints.
            </p>
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Base URL</h3>
              <CodeBlock code="https://api.msganesh.com/itts" language="bash" />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Authentication</h2>
            <p>
              No authentication is required for these API endpoints.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Endpoints</h2>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 border-b">
                <h3 className="text-lg font-medium">1. Upload Reference Audio</h3>
                <p className="text-sm text-muted-foreground">
                  Upload an audio file to be used as a reference for voice generation.
                </p>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded">POST</span>
                  <span className="ml-2 font-mono">/upload_audio</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">name</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">query</td>
                          <td className="px-6 py-4 text-sm">Speaker name (e.g., "Shashwat")</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">reference_text</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">query</td>
                          <td className="px-6 py-4 text-sm">Reference text associated with the audio</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <p className="text-sm mb-2">Content-Type: multipart/form-data</p>
                  <p className="text-sm">Required: Audio file</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Responses</h4>
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
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Example Usage</h4>
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
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 border-b">
                <h3 className="text-lg font-medium">2. Generate Speech</h3>
                <p className="text-sm text-muted-foreground">
                  Generate speech audio from text using a reference audio ID.
                </p>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded">POST</span>
                  <span className="ml-2 font-mono">/generate_speech</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Request Body (JSON)</h4>
                  <CodeBlock 
                    code={`{
    "text": "Text to be converted to speech",
    "ref_audio_id": "2ea3b6b2"
}`} 
                    language="json" 
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Responses</h4>
                  <p className="text-sm mb-2">200 Success:</p>
                  <CodeBlock 
                    code={`{
    "message": "Audio and text saved successfully",
    "id": "597eae87"
}`} 
                    language="json" 
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Example Usage</h4>
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
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 border-b">
                <h3 className="text-lg font-medium">3. Get Available Speakers</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieve a list of available speakers/reference audios.
                </p>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded">GET</span>
                  <span className="ml-2 font-mono">/get_speakers</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Responses</h4>
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
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Example Usage</h4>
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
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 border-b">
                <h3 className="text-lg font-medium">4. Download Generated Audio</h3>
                <p className="text-sm text-muted-foreground">
                  Download a generated audio file by its ID.
                </p>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded">GET</span>
                  <span className="ml-2 font-mono">/{id}.wav</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">id</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">path</td>
                          <td className="px-6 py-4 text-sm">ID of the audio file to download (required)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Responses</h4>
                  <p className="text-sm">200 Success: Audio file with Content-Type: audio/wav</p>
                  <p className="text-sm">404 Not Found: If audio with given ID doesn't exist</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Example Usage</h4>
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
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Error Handling</h2>
            <p>
              All endpoints may return a 422 Validation Error with the following structure:
            </p>
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
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Additional Resources</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Swagger UI documentation is available at: <a href="https://api.msganesh.com/itts/docs" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://api.msganesh.com/itts/docs</a></li>
              <li>All endpoints return JSON responses unless downloading audio files</li>
              <li>The API appears to be built with FastAPI</li>
            </ul>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApiDocs;
