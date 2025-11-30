interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  if (currentStep === 0 || currentStep > totalSteps) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
