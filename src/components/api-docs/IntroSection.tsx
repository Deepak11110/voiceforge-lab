
import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';

const IntroSection: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default IntroSection;
