import React from 'react';
import { FileText, Search, ShieldCheck, Link, Calculator, FileOutput } from 'lucide-react';

interface Step {
  label: string;
  icon: React.ReactNode;
}

interface ProcessFlowStepperProps {
  currentStep: number;
  isProcessing: boolean;
}

export function ProcessFlowStepper({ currentStep, isProcessing }: ProcessFlowStepperProps) {
  const steps: Step[] = [
    { label: 'Claim Extraction', icon: <FileText className="w-6 h-6" /> },
    { label: 'Citation Detection', icon: <Search className="w-6 h-6" /> },
    { label: 'Fact Verification', icon: <ShieldCheck className="w-6 h-6" /> },
    { label: 'Citation Validation', icon: <Link className="w-6 h-6" /> },
    { label: 'Score Calculation', icon: <Calculator className="w-6 h-6" /> },
    { label: 'Explanation Generation', icon: <FileOutput className="w-6 h-6" /> },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between min-w-max px-4 md:px-0">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isProcessing && index === currentStep
                    ? 'bg-[#7BAE7F] text-white shadow-lg scale-110 animate-pulse'
                    : index < currentStep
                    ? 'bg-[#7BAE7F] text-white'
                    : index === currentStep
                    ? 'bg-[#D9A441] text-white'
                    : 'bg-[#e8e4dd] text-[#6B645C]'
                }`}
              >
                {step.icon}
              </div>
              <div className="mt-3 text-sm text-center text-[#2E2A27] max-w-[100px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 relative" style={{ minWidth: '60px' }}>
                <div className="absolute inset-0 bg-[#e8e4dd] rounded" />
                <div
                  className={`absolute inset-0 rounded transition-all duration-500 ${
                    index < currentStep ? 'bg-[#7BAE7F]' : 'bg-transparent'
                  }`}
                  style={{
                    width: index < currentStep ? '100%' : '0%',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}