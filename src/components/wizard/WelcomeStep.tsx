import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from "lucide-react";
import { useWizard } from "@/contexts/WizardContext";
import { StatsBanner } from "./StatsBanner";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const { hasSavedProgress, loadSavedProgress } = useWizard();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-2">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            PlanCraft AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Answer a few quick questions and we'll craft the perfect plan for you.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          {hasSavedProgress && (
            <Button 
              onClick={loadSavedProgress}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resume Previous Session
            </Button>
          )}
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-gradient-accent hover:opacity-90 transition-opacity px-8 w-full sm:w-auto"
          >
            Start {hasSavedProgress ? "New" : ""}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-4">
          Takes less than 2 minutes
        </p>
      </div>

      <StatsBanner />
    </div>
  );
}
