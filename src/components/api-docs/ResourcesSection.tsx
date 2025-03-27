
import React from 'react';

const ResourcesSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Additional Resources</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Swagger UI documentation is available at: <a href="https://api.msganesh.com/itts/docs" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://api.msganesh.com/itts/docs</a></li>
        <li>All endpoints return JSON responses unless downloading audio files</li>
        <li>The API appears to be built with FastAPI</li>
      </ul>
    </section>
  );
};

export default ResourcesSection;
