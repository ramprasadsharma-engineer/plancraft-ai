import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BasicContextStepProps {
  initialData: {
    role?: string;
    companySize?: string;
    industry?: string;
  };
  onNext: (data: { role: string; companySize: string; industry: string }) => void;
  onBack: () => void;
}

export function BasicContextStep({ initialData, onNext, onBack }: BasicContextStepProps) {
  const [role, setRole] = useState(initialData.role || "");
  const [companySize, setCompanySize] = useState(initialData.companySize || "");
  const [industry, setIndustry] = useState(initialData.industry || "");

  const isValid = role && companySize && industry;

  const handleNext = () => {
    if (isValid) {
      onNext({ role, companySize, industry });
    }
  };

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Tell us about yourself</h2>
        <p className="text-muted-foreground">Help us understand your context</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium">Your role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="Founder / Owner">Founder / Owner</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Individual contributor">Individual contributor</SelectItem>
              <SelectItem value="IT / Admin">IT / Admin</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize" className="text-sm font-medium">Company size</Label>
          <Select value={companySize} onValueChange={setCompanySize}>
            <SelectTrigger id="companySize" className="w-full">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="1–5">1–5</SelectItem>
              <SelectItem value="6–20">6–20</SelectItem>
              <SelectItem value="21–50">21–50</SelectItem>
              <SelectItem value="51–200">51–200</SelectItem>
              <SelectItem value="200+">200+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger id="industry" className="w-full">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="SaaS">SaaS</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Services / Agency">Services / Agency</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
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
