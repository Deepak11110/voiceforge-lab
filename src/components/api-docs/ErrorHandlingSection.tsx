
import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';

const ErrorHandlingSection: React.FC = () => {
  return (
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
  );
};

export default ErrorHandlingSection;
