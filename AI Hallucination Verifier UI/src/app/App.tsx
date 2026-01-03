import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { ProcessFlowStepper } from './components/ProcessFlowStepper';
import { HallucinationScoreGauge } from './components/HallucinationScoreGauge';
import { ClaimCard, Claim } from './components/ClaimCard';
import { CitationStatusCard, CitationStats } from './components/CitationStatusCard';

const SAMPLE_TEXT = `The Earth's atmosphere is composed of 78% nitrogen, 21% oxygen, and trace amounts of other gases. The Great Wall of China is visible from space with the naked eye, making it one of humanity's most impressive architectural achievements. Water boils at 100°C (212°F) at sea level, which is why cooking at high altitudes requires adjustments.`;

interface VerificationResult {
  claims: Claim[];
  score: number;
  explanation: string;
  citationStats: CitationStats;
  rawOutput: any;
}

function App() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showRawOutput, setShowRawOutput] = useState(false);

  const handleVerify = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setResult(null);

    // Simulate processing through each step
    for (let i = 0; i < 6; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    // Mock verification result
    const mockResult: VerificationResult = {
      claims: [
        {
          id: 1,
          text: "The Earth's atmosphere is composed of 78% nitrogen, 21% oxygen, and trace amounts of other gases.",
          status: 'verified',
          citation: 'NASA Climate Science (2024)',
        },
        {
          id: 2,
          text: 'The Great Wall of China is visible from space with the naked eye.',
          status: 'hallucinated',
        },
        {
          id: 3,
          text: 'Water boils at 100°C (212°F) at sea level.',
          status: 'verified',
          citation: 'NIST Physical Constants Database',
        },
        {
          id: 4,
          text: 'Cooking at high altitudes requires adjustments.',
          status: 'uncertain',
        },
      ],
      score: 35,
      explanation: 'Analysis complete. 2 claims were fully verified with reliable citations. 1 claim was identified as a common misconception (the Great Wall is not visible from space). 1 claim lacks sufficient citation support but appears plausible.',
      citationStats: {
        valid: 2,
        missing: 1,
        misleading: 1,
      },
      rawOutput: {
        timestamp: new Date().toISOString(),
        model: 'hallucination-verifier-v1.0',
        confidence: 0.87,
        processing_time_ms: 3600,
        claims_analyzed: 4,
      },
    };

    setResult(mockResult);
    setIsProcessing(false);
  };

  const handleUseSample = () => {
    setInputText(SAMPLE_TEXT);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F1EB', fontFamily: 'Inter, sans-serif' }}>
      {/* Header / Hero Section */}
      <header className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#4A3F35] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#FFFCF7]" />
            </div>
          </div>
          <h1 
            className="text-5xl mb-3 text-[#2E2A27]" 
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            FactForge - AI-Powered Fact Verification
          </h1>
          <p className="text-xl text-[#6B645C] max-w-2xl mx-auto">
            Verify factual accuracy and citations in AI-generated content
          </p>
        </div>
      </header>

      {/* Input Section */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <Card className="shadow-lg transition-shadow duration-200 hover:shadow-xl" style={{ backgroundColor: '#FFFCF7', borderColor: 'rgba(46, 42, 39, 0.1)' }}>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Paste AI-generated text here…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] mb-4 resize-none border-2"
              style={{ 
                backgroundColor: '#FFFCF7',
                borderColor: 'rgba(46, 42, 39, 0.1)',
                fontFamily: 'Inter, sans-serif',
                color: '#2E2A27'
              }}
            />
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleVerify}
                disabled={!inputText.trim() || isProcessing}
                className="text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: '#4A3F35',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {isProcessing ? 'Verifying...' : 'Verify Content'}
              </Button>
              <Button
                onClick={handleUseSample}
                variant="outline"
                disabled={isProcessing}
                className="border-2 hover:bg-[#4A3F35] hover:text-white transition-all duration-200"
                style={{ 
                  borderColor: '#4A3F35',
                  color: '#4A3F35',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Use Sample Text
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Flow Section */}
      {(isProcessing || result) && (
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <Card className="shadow-lg" style={{ backgroundColor: '#FFFCF7', borderColor: 'rgba(46, 42, 39, 0.1)' }}>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#2E2A27' }}>
                Verification Process
              </CardTitle>
              <CardDescription style={{ color: '#6B645C' }}>
                Step-by-step analysis of your content
              </CardDescription>
            </CardHeader>
            <CardContent className="py-8">
              <ProcessFlowStepper currentStep={currentStep} isProcessing={isProcessing} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results Dashboard */}
      {result && !isProcessing && (
        <div className="max-w-6xl mx-auto px-4 pb-12 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Claims Analysis Card */}
            <Card className="shadow-lg" style={{ backgroundColor: '#FFFCF7', borderColor: 'rgba(46, 42, 39, 0.1)' }}>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#2E2A27' }}>
                  Claims Analysis
                </CardTitle>
                <CardDescription style={{ color: '#6B645C' }}>
                  Extracted claims with verification status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.claims.map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} />
                ))}
              </CardContent>
            </Card>

            {/* Hallucination Score Card */}
            <Card className="shadow-lg" style={{ backgroundColor: '#FFFCF7', borderColor: 'rgba(46, 42, 39, 0.1)' }}>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#2E2A27' }}>
                  Hallucination Score
                </CardTitle>
                <CardDescription style={{ color: '#6B645C' }}>
                  Overall risk assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HallucinationScoreGauge score={result.score} />
              </CardContent>
            </Card>
          </div>

          {/* Explanation Card */}
          <Card className="shadow-lg mb-6" style={{ backgroundColor: '#FFFCF7', borderColor: 'rgba(46, 42, 39, 0.1)' }}>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#2E2A27' }}>
                Explanation
              </CardTitle>
              <CardDescription style={{ color: '#6B645C' }}>
                Human-readable summary of findings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#2E2A27] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {result.explanation}
              </p>
            </CardContent>
          </Card>

          {/* Citation Status Card */}
          <Card className="shadow-lg mb-6" style={{ backgroundColor: '#FFFCF7', borderColor: 'rgba(46, 42, 39, 0.1)' }}>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#2E2A27' }}>
                Citation Status
              </CardTitle>
              <CardDescription style={{ color: '#6B645C' }}>
                Overview of citation quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CitationStatusCard stats={result.citationStats} />
            </CardContent>
          </Card>

          {/* Raw Output (Collapsible) */}
          <Card className="shadow-lg" style={{ backgroundColor: '#FFFCF7', borderColor: 'rgba(46, 42, 39, 0.1)' }}>
            <CardHeader>
              <button
                onClick={() => setShowRawOutput(!showRawOutput)}
                className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity"
              >
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#2E2A27' }}>
                    Technical JSON Output
                  </CardTitle>
                  <CardDescription style={{ color: '#6B645C' }}>
                    Raw verification data for developers
                  </CardDescription>
                </div>
                {showRawOutput ? (
                  <ChevronUp className="w-5 h-5 text-[#6B645C]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B645C]" />
                )}
              </button>
            </CardHeader>
            {showRawOutput && (
              <CardContent>
                <pre
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{ 
                    backgroundColor: '#F5F1EB',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#2E2A27'
                  }}
                >
                  {JSON.stringify(result.rawOutput, null, 2)}
                </pre>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#6B645C]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Developed by <span className="font-semibold text-[#4A3F35]">AI Aura Team</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;