
import React from 'react';

interface Parameter {
  name: string;
  type: string;
  location: string;
  description: string;
}

interface ParametersTableProps {
  parameters: Parameter[];
}

const ParametersTable: React.FC<ParametersTableProps> = ({ parameters }) => {
  return (
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
          {parameters.map((param, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{param.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{param.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{param.location}</td>
              <td className="px-6 py-4 text-sm">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParametersTable;
