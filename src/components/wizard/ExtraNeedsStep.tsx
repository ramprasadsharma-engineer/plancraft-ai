import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";

interface ExtraNeedsStepProps {
  initialData: {
    extraNeeds?: string[];
  };
  onNext: (data: { extraNeeds: string[] }) => void;
  onBack: () => void;
}

const needsOptions = [
  { id: "collaboration", label: "Team collaboration" },
  { id: "api", label: "Custom integrations / API" },
  { id: "analytics", label: "Advanced analytics" },
  { id: "support", label: "Priority support" },
];

export function ExtraNeedsStep({ initialData, onNext, onBack }: ExtraNeedsStepProps) {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(initialData.extraNeeds || []);

  const handleToggle = (label: string) => {
    setSelectedNeeds(prev => 
      prev.includes(label) 
        ? prev.filter(n => n !== label)
        : [...prev, label]
    );
  };

  const handleNext = () => {
    onNext({ extraNeeds: selectedNeeds });
  };

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Extra Needs</h2>
        <p className="text-muted-foreground">Select any additional features you need (optional)</p>
      </div>

      <div className="space-y-4">
        {needsOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleToggle(option.label)}>
            <Checkbox 
              id={option.id} 
              checked={selectedNeeds.includes(option.label)}
              onCheckedChange={() => handleToggle(option.label)}
            />
            <Label htmlFor={option.id} className="font-normal cursor-pointer flex-1">
              {option.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="flex-1 bg-gradient-accent hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Get Recommendation
        </Button>
      </div>
    </div>
  );
}
