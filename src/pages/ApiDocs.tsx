
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import IntroSection from '@/components/api-docs/IntroSection';
import UploadReferenceAudioEndpoint from '@/components/api-docs/UploadReferenceAudioEndpoint';
import GenerateSpeechEndpoint from '@/components/api-docs/GenerateSpeechEndpoint';
import GetSpeakersEndpoint from '@/components/api-docs/GetSpeakersEndpoint';
import DownloadAudioEndpoint from '@/components/api-docs/DownloadAudioEndpoint';
import ErrorHandlingSection from '@/components/api-docs/ErrorHandlingSection';
import ResourcesSection from '@/components/api-docs/ResourcesSection';

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
          <IntroSection />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Endpoints</h2>
            
            <UploadReferenceAudioEndpoint />
            <GenerateSpeechEndpoint />
            <GetSpeakersEndpoint />
            <DownloadAudioEndpoint />
          </section>

          <ErrorHandlingSection />
          <ResourcesSection />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApiDocs;
