
import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';

interface EndpointSectionProps {
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  parameters?: React.ReactNode;
  requestBody?: React.ReactNode;
  responses?: React.ReactNode;
  examples?: React.ReactNode;
}

const EndpointSection: React.FC<EndpointSectionProps> = ({
  title,
  description,
  method,
  endpoint,
  parameters,
  requestBody,
  responses,
  examples,
}) => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800';
      case 'POST':
        return 'bg-green-100 text-green-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <span className={`inline-block ${getMethodColor(method)} px-2 py-1 text-xs font-medium rounded`}>
            {method}
          </span>
          <span className="ml-2 font-mono">{endpoint}</span>
        </div>
        
        {parameters && (
          <div>
            <h4 className="font-medium mb-2">Parameters</h4>
            {parameters}
          </div>
        )}
        
        {requestBody && (
          <div>
            <h4 className="font-medium mb-2">Request Body</h4>
            {requestBody}
          </div>
        )}
        
        {responses && (
          <div>
            <h4 className="font-medium mb-2">Responses</h4>
            {responses}
          </div>
        )}
        
        {examples && (
          <div>
            <h4 className="font-medium mb-2">Example Usage</h4>
            {examples}
          </div>
        )}
      </div>
    </div>
  );
};

export default EndpointSection;
