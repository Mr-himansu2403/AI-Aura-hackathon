import React from 'react';
import { CircleCheck, CircleAlert, CircleX } from 'lucide-react';

export interface Claim {
  id: number;
  text: string;
  status: 'verified' | 'uncertain' | 'hallucinated';
  citation?: string;
}

interface ClaimCardProps {
  claim: Claim;
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const getStatusConfig = (status: Claim['status']) => {
    switch (status) {
      case 'verified':
        return {
          icon: <CircleCheck className="w-5 h-5" />,
          color: '#7BAE7F',
          label: 'Verified',
        };
      case 'uncertain':
        return {
          icon: <CircleAlert className="w-5 h-5" />,
          color: '#D9A441',
          label: 'Uncertain',
        };
      case 'hallucinated':
        return {
          icon: <CircleX className="w-5 h-5" />,
          color: '#B5524A',
          label: 'Hallucinated',
        };
    }
  };

  const config = getStatusConfig(claim.status);

  return (
    <div
      className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
      style={{ 
        backgroundColor: '#FFFCF7',
        borderColor: `${config.color}40`,
        borderWidth: '2px'
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 mt-0.5"
          style={{ color: config.color }}
        >
          {config.icon}
        </div>
        <div className="flex-1">
          <p className="text-[#2E2A27]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {claim.text}
          </p>
          {claim.citation && (
            <p className="text-sm text-[#6B645C] mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="font-medium">Citation:</span> {claim.citation}
            </p>
          )}
        </div>
        <div
          className="flex-shrink-0 px-3 py-1 rounded-full text-sm text-white"
          style={{ 
            backgroundColor: config.color,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {config.label}
        </div>
      </div>
    </div>
  );
}
