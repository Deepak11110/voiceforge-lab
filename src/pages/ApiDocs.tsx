
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/CodeBlock';

const ApiDocs = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
          <p className="text-muted-foreground">
            Reference documentation for working with our Voice API.
          </p>
        </div>

        <Tabs defaultValue="introduction" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="voices">Voices API</TabsTrigger>
            <TabsTrigger value="synthesis">Text to Speech</TabsTrigger>
          </TabsList>

          <TabsContent value="introduction">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
                <CardDescription>
                  Get started with our Voice API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p>
                    Our Voice API gives you access to high-quality voice synthesis capabilities. 
                    You can use it to create lifelike speech from text, select from multiple voices,
                    and customize speech parameters.
                  </p>
                  
                  <h3 className="text-lg font-semibold mt-6">Base URL</h3>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    https://api.voiceai.example.com/v1
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6">Response Format</h3>
                  <p>
                    All responses are returned in JSON format. Binary data (such as audio files) 
                    will be returned as base64-encoded strings or as downloadable links.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="authentication">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  Secure your API requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p>
                    All API requests must be authenticated using an API key. 
                    You can get your API key from the Settings page in your account.
                  </p>
                  
                  <h3 className="text-lg font-semibold mt-6">Using API Keys</h3>
                  <p>
                    Include your API key in the <code>Authorization</code> header of all requests:
                  </p>
                  
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6">Example Request</h3>
                  <CodeBlock
                    code={`curl -X GET https://api.voiceai.example.com/v1/voices \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    language="bash"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="voices">
            <Card>
              <CardHeader>
                <CardTitle>Voices API</CardTitle>
                <CardDescription>
                  Endpoints for managing and listing voices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">List All Voices</h3>
                    <p className="text-muted-foreground mb-2">
                      Returns a list of all available voices.
                    </p>
                    
                    <div className="bg-muted rounded-md p-2 mb-4">
                      <div className="flex items-center text-sm">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-md font-mono mr-2">
                          GET
                        </span>
                        <span className="font-mono">/voices</span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium">Example Request</h4>
                    <CodeBlock
                      code={`curl -X GET https://api.voiceai.example.com/v1/voices \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                      language="bash"
                    />
                    
                    <h4 className="font-medium mt-4">Example Response</h4>
                    <CodeBlock
                      code={`{
  "voices": [
    {
      "id": "voice-1",
      "name": "Emma",
      "gender": "female",
      "language": "en-US",
      "category": "natural"
    },
    {
      "id": "voice-2",
      "name": "James",
      "gender": "male",
      "language": "en-UK",
      "category": "natural"
    }
  ]
}`}
                      language="json"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">Get Voice Details</h3>
                    <p className="text-muted-foreground mb-2">
                      Returns details for a specific voice.
                    </p>
                    
                    <div className="bg-muted rounded-md p-2 mb-4">
                      <div className="flex items-center text-sm">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-md font-mono mr-2">
                          GET
                        </span>
                        <span className="font-mono">/voices/{'{voice_id}'}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium">Parameters</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>
                        <code>voice_id</code> (path) - Required. The ID of the voice to retrieve.
                      </li>
                    </ul>
                    
                    <h4 className="font-medium">Example Request</h4>
                    <CodeBlock
                      code={`curl -X GET https://api.voiceai.example.com/v1/voices/voice-1 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                      language="bash"
                    />
                    
                    <h4 className="font-medium mt-4">Example Response</h4>
                    <CodeBlock
                      code={`{
  "id": "voice-1",
  "name": "Emma",
  "gender": "female",
  "language": "en-US",
  "category": "natural",
  "description": "A warm and friendly American English female voice.",
  "preview_url": "https://example.com/voices/emma-preview.mp3",
  "created_at": "2023-05-01T12:00:00Z"
}`}
                      language="json"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="synthesis">
            <Card>
              <CardHeader>
                <CardTitle>Text to Speech API</CardTitle>
                <CardDescription>
                  Convert text to natural-sounding speech
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Generate Speech</h3>
                  <p className="text-muted-foreground mb-2">
                    Converts text to speech using the specified voice.
                  </p>
                  
                  <div className="bg-muted rounded-md p-2 mb-4">
                    <div className="flex items-center text-sm">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-md font-mono mr-2">
                        POST
                      </span>
                      <span className="font-mono">/tts/generate</span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium">Request Body</h4>
                  <CodeBlock
                    code={`{
  "text": "Hello, this is a test of the text to speech API.",
  "voice_id": "voice-1",
  "model": "standard",
  "language": "en-US",
  "speed": 1.0,
  "format": "mp3"
}`}
                    language="json"
                  />
                  
                  <h4 className="font-medium mt-4">Parameters</h4>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      <code>text</code> (string) - Required. The text to convert to speech.
                    </li>
                    <li>
                      <code>voice_id</code> (string) - Required. The ID of the voice to use.
                    </li>
                    <li>
                      <code>model</code> (string) - Optional. The TTS model to use. Options: "standard", "premium". Default: "standard".
                    </li>
                    <li>
                      <code>language</code> (string) - Optional. The language code. Default is based on the selected voice.
                    </li>
                    <li>
                      <code>speed</code> (number) - Optional. The speech speed. Range: 0.5-2.0. Default: 1.0.
                    </li>
                    <li>
                      <code>format</code> (string) - Optional. Audio format. Options: "mp3", "wav", "ogg". Default: "mp3".
                    </li>
                  </ul>
                  
                  <h4 className="font-medium">Example Request</h4>
                  <CodeBlock
                    code={`curl -X POST https://api.voiceai.example.com/v1/tts/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, this is a test of the text to speech API.",
    "voice_id": "voice-1",
    "model": "standard",
    "format": "mp3"
  }'`}
                    language="bash"
                  />
                  
                  <h4 className="font-medium mt-4">Example Response</h4>
                  <CodeBlock
                    code={`{
  "id": "tts-12345",
  "status": "success",
  "audio_url": "https://api.voiceai.example.com/v1/audio/tts-12345.mp3",
  "duration_seconds": 3.5,
  "created_at": "2023-06-15T10:30:00Z"
}`}
                    language="json"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ApiDocs;
