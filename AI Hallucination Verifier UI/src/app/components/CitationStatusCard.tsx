import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export interface CitationStats {
  valid: number;
  missing: number;
  misleading: number;
}

interface CitationStatusCardProps {
  stats: CitationStats;
}

export function CitationStatusCard({ stats }: CitationStatusCardProps) {
  const items = [
    {
      label: 'Valid Citations',
      count: stats.valid,
      icon: <CheckCircle className="w-6 h-6" />,
      color: '#7BAE7F',
    },
    {
      label: 'Missing Citations',
      count: stats.missing,
      icon: <XCircle className="w-6 h-6" />,
      color: '#B5524A',
    },
    {
      label: 'Misleading Citations',
      count: stats.misleading,
      icon: <AlertCircle className="w-6 h-6" />,
      color: '#D9A441',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="p-6 rounded-lg flex flex-col items-center text-center transition-all duration-200 hover:shadow-md"
          style={{ backgroundColor: '#FFFCF7' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: `${item.color}20`, color: item.color }}
          >
            {item.icon}
          </div>
          <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif', color: item.color }}>
            {item.count}
          </div>
          <div className="text-sm text-[#6B645C]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
