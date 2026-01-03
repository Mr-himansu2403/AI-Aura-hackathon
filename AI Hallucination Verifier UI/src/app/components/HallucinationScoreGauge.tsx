import React from 'react';

interface HallucinationScoreGaugeProps {
  score: number; // 0-100
}

export function HallucinationScoreGauge({ score }: HallucinationScoreGaugeProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { label: 'Low Risk', color: '#7BAE7F' };
    if (score <= 70) return { label: 'Medium Risk', color: '#D9A441' };
    return { label: 'High Risk', color: '#B5524A' };
  };

  const risk = getRiskLevel(score);
  const circumference = 2 * Math.PI * 70; // radius = 70
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="#e8e4dd"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke={risk.color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-semibold text-[#2E2A27]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {score}
          </div>
          <div className="text-sm text-[#6B645C] mt-1">Score</div>
        </div>
      </div>
      <div className="mt-4">
        <div 
          className="px-4 py-2 rounded-full text-white"
          style={{ backgroundColor: risk.color, fontFamily: 'Inter, sans-serif' }}
        >
          {risk.label}
        </div>
      </div>
    </div>
  );
}
