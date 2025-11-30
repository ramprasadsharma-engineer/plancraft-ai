import { WizardProvider, useWizard } from "@/contexts/WizardContext";
import { WelcomeStep } from "@/components/wizard/WelcomeStep";
import { BasicContextStep } from "@/components/wizard/BasicContextStep";
import { GoalsBudgetStep } from "@/components/wizard/GoalsBudgetStep";
import { ExtraNeedsStep } from "@/components/wizard/ExtraNeedsStep";
import { RecommendationStep } from "@/components/wizard/RecommendationStep";
import { ProgressIndicator } from "@/components/wizard/ProgressIndicator";
import { getRecommendation, WizardAnswers } from "@/config/recommendationLogic";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function WizardContent() {
  const { currentStep, setCurrentStep, answers, updateAnswers, resetWizard } = useWizard();

  const handleStep1Next = (data: { role: string; companySize: string; industry: string }) => {
    updateAnswers(data);
    setCurrentStep(2);
  };

  const handleStep2Next = (data: { primaryGoal: string; budget: string; urgency: string }) => {
    updateAnswers(data);
    setCurrentStep(3);
  };

  const handleStep3Next = (data: { extraNeeds: string[] }) => {
    updateAnswers(data);
    setCurrentStep(4);
  };

  const handleEditAnswers = () => {
    setCurrentStep(1);
  };

  const recommendation = currentStep === 4 ? getRecommendation(answers as WizardAnswers) : null;

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-subtle flex items-center justify-center p-4 relative">
        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>
        
        <div className="w-full max-w-[560px]">
          <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border border-border">
            <ProgressIndicator currentStep={currentStep} totalSteps={3} />
            
            {currentStep === 0 && (
              <WelcomeStep onNext={() => setCurrentStep(1)} />
            )}
            
            {currentStep === 1 && (
              <BasicContextStep
                initialData={answers}
                onNext={handleStep1Next}
                onBack={() => setCurrentStep(0)}
              />
            )}
            
            {currentStep === 2 && (
              <GoalsBudgetStep
                initialData={answers}
                onNext={handleStep2Next}
                onBack={() => setCurrentStep(1)}
              />
            )}
            
            {currentStep === 3 && (
              <ExtraNeedsStep
                initialData={answers}
                onNext={handleStep3Next}
                onBack={() => setCurrentStep(2)}
              />
            )}
            
            {currentStep === 4 && recommendation && (
              <RecommendationStep
                recommendation={recommendation}
                answers={answers as WizardAnswers}
                onEditAnswers={handleEditAnswers}
                onStartOver={resetWizard}
              />
            )}
          </div>
        </div>
      </div>
      
      <FloatingChatButton />
    </>
  );
}

const Index = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};

export default Index;
