import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Target, IndianRupee, Clock } from "lucide-react";

interface GoalsBudgetStepProps {
  initialData: {
    primaryGoal?: string;
    budget?: string;
    urgency?: string;
  };
  onNext: (data: { primaryGoal: string; budget: string; urgency: string }) => void;
  onBack: () => void;
}

const goals = [
  { value: "Improve productivity", label: "Improve productivity", icon: Target },
  { value: "Automate workflows", label: "Automate workflows", icon: Target },
  { value: "Improve customer support", label: "Improve customer support", icon: Target },
  { value: "Better analytics & insights", label: "Better analytics & insights", icon: Target },
];

const budgets = [
  { value: "< ₹4,000", label: "< ₹4,000" },
  { value: "₹4,000–₹12,000", label: "₹4,000–₹12,000" },
  { value: "₹12,000–₹25,000", label: "₹12,000–₹25,000" },
  { value: "₹25,000+", label: "₹25,000+" },
];

const urgencies = [
  { value: "Need immediately", label: "Need immediately" },
  { value: "Within 1–2 weeks", label: "Within 1–2 weeks" },
  { value: "Just exploring", label: "Just exploring" },
];

export function GoalsBudgetStep({ initialData, onNext, onBack }: GoalsBudgetStepProps) {
  const [primaryGoal, setPrimaryGoal] = useState(initialData.primaryGoal || "");
  const [budget, setBudget] = useState(initialData.budget || "");
  const [urgency, setUrgency] = useState(initialData.urgency || "");

  const isValid = primaryGoal && budget && urgency;

  const handleNext = () => {
    if (isValid) {
      onNext({ primaryGoal, budget, urgency });
    }
  };

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Goals & Budget</h2>
        <p className="text-muted-foreground">Help us tailor the perfect plan</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Primary goal
          </Label>
          <RadioGroup value={primaryGoal} onValueChange={setPrimaryGoal} className="space-y-2">
            {goals.map((goal) => (
              <div key={goal.value} className="flex items-center space-x-2">
                <RadioGroupItem value={goal.value} id={goal.value} />
                <Label htmlFor={goal.value} className="font-normal cursor-pointer">
                  {goal.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-primary" />
            Monthly budget
          </Label>
          <RadioGroup value={budget} onValueChange={setBudget} className="space-y-2">
            {budgets.map((b) => (
              <div key={b.value} className="flex items-center space-x-2">
                <RadioGroupItem value={b.value} id={b.value} />
                <Label htmlFor={b.value} className="font-normal cursor-pointer">
                  {b.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Urgency
          </Label>
          <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-2">
            {urgencies.map((u) => (
              <div key={u.value} className="flex items-center space-x-2">
                <RadioGroupItem value={u.value} id={u.value} />
                <Label htmlFor={u.value} className="font-normal cursor-pointer">
                  {u.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!isValid}
          className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
