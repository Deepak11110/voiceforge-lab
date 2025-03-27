import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ApiDocs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
        {code}
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={() => copyToClipboard(code, id)}
      >
        {copied === id ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );

  return (
    <DashboardLayout withDashboardContext={false}>
      <div className="container py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-muted-foreground mb-8">
          Learn how to integrate with our voice synthesis API
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="voices">Voices API</TabsTrigger>
            <TabsTrigger value="synthesis">Synthesis API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>API Overview</CardTitle>
                <CardDescription>
                  Get started with the Deep Labs Voice API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  Our API allows you to programmatically access our voice synthesis technology.
                  You can list available voices, create new voices, and generate speech from text.
                </p>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Base URL</h3>
                  <CodeBlock 
                    id="base-url" 
                    code="https://api.deeplabs.ai/v1" 
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Response Format</h3>
                  <p>All API responses are returned in JSON format.</p>
                  <CodeBlock 
                    id="response-format" 
                    code={`{
  "success": true,
  "data": {
    // Response data here
  }
}`} 
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Error Handling</h3>
                  <p>Errors are returned with appropriate HTTP status codes and error messages.</p>
                  <CodeBlock 
                    id="error-format" 
                    code={`{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "A descriptive error message"
  }
}`} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  Secure your API requests with authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  All API requests require authentication using an API key. You can find your API key in the settings page.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Your API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="api-key" 
                        value="sk-xxxx-xxxx-xxxx-xxxx-xxxx" 
                        readOnly 
                        className="font-mono"
                      />
                      <Button variant="outline">
                        Regenerate
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Authentication Example</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Include your API key in the Authorization header:
                    </p>
                    <CodeBlock 
                      id="auth-example" 
                      code={`curl -X GET https://api.deeplabs.ai/v1/voices \\
  -H "Authorization: Bearer YOUR_API_KEY"`} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voices">
            <Card>
              <CardHeader>
                <CardTitle>Voices API</CardTitle>
                <CardDescription>
                  Manage and retrieve voice models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">List Voices</h3>
                  <p>Retrieve a list of all available voices.</p>
                  <CodeBlock 
                    id="list-voices" 
                    code={`GET /voices

# Example request
curl -X GET https://api.deeplabs.ai/v1/voices \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Example response
{
  "success": true,
  "data": {
    "voices": [
      {
        "id": "voice_123abc",
        "name": "Sarah",
        "language": "en-US",
        "gender": "female",
        "category": "natural",
        "preview_url": "https://assets.deeplabs.ai/voices/sarah_preview.mp3"
      },
      // More voices...
    ]
  }
}`} 
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Get Voice</h3>
                  <p>Retrieve details about a specific voice.</p>
                  <CodeBlock 
                    id="get-voice" 
                    code={`GET /voices/{voice_id}

# Example request
curl -X GET https://api.deeplabs.ai/v1/voices/voice_123abc \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Example response
{
  "success": true,
  "data": {
    "voice": {
      "id": "voice_123abc",
      "name": "Sarah",
      "language": "en-US",
      "gender": "female",
      "category": "natural",
      "preview_url": "https://assets.deeplabs.ai/voices/sarah_preview.mp3",
      "created_at": "2023-06-15T10:30:00Z",
      "updated_at": "2023-06-15T10:30:00Z"
    }
  }
}`} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="synthesis">
            <Card>
              <CardHeader>
                <CardTitle>Synthesis API</CardTitle>
                <CardDescription>
                  Convert text to speech using our voice models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Text to Speech</h3>
                  <p>Convert text to speech using a specified voice.</p>
                  <CodeBlock 
                    id="text-to-speech" 
                    code={`POST /synthesis

# Example request
curl -X POST https://api.deeplabs.ai/v1/synthesis \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "voice_id": "voice_123abc",
    "text": "Hello, this is a test of the speech synthesis API.",
    "format": "mp3",
    "speed": 1.0,
    "pitch": 0
  }'

# Example response
{
  "success": true,
  "data": {
    "audio_url": "https://assets.deeplabs.ai/synthesis/output_123.mp3",
    "duration_seconds": 3.5,
    "character_count": 52
  }
}`} 
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Streaming Synthesis</h3>
                  <p>Stream audio as it's being generated for real-time applications.</p>
                  <CodeBlock 
                    id="streaming-synthesis" 
                    code={`POST /synthesis/stream

# This endpoint returns audio chunks as they're generated
# Useful for real-time applications like chatbots

# Example implementation in JavaScript
fetch('https://api.deeplabs.ai/v1/synthesis/stream', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    voice_id: 'voice_123abc',
    text: 'This is a streaming synthesis example.',
    format: 'mp3'
  })
})
.then(response => {
  const reader = response.body.getReader();
  // Process the stream chunks
  // ...
})`} 
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
