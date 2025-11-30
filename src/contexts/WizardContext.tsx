import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { WizardAnswers } from "@/config/recommendationLogic";

const STORAGE_KEY = "wizard_progress";

interface WizardContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Partial<WizardAnswers>;
  updateAnswers: (newAnswers: Partial<WizardAnswers>) => void;
  resetWizard: () => void;
  hasSavedProgress: boolean;
  loadSavedProgress: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const initialAnswers: Partial<WizardAnswers> = {
  role: "",
  companySize: "",
  industry: "",
  primaryGoal: "",
  budget: "",
  urgency: "",
  extraNeeds: []
};

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load saved progress:", error);
  }
  return null;
};

const saveToStorage = (step: number, answers: Partial<WizardAnswers>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers, timestamp: Date.now() }));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
};

const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear saved progress:", error);
  }
};

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>(initialAnswers);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage();
    setHasSavedProgress(!!saved);
  }, []);

  useEffect(() => {
    if (currentStep > 0) {
      saveToStorage(currentStep, answers);
    }
  }, [currentStep, answers]);

  const updateAnswers = (newAnswers: Partial<WizardAnswers>) => {
    setAnswers(prev => ({ ...prev, ...newAnswers }));
  };

  const loadSavedProgress = () => {
    const saved = loadFromStorage();
    if (saved) {
      setCurrentStep(saved.step);
      setAnswers(saved.answers);
      setHasSavedProgress(false);
    }
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setAnswers(initialAnswers);
    clearStorage();
    setHasSavedProgress(false);
  };

  return (
    <WizardContext.Provider value={{ currentStep, setCurrentStep, answers, updateAnswers, resetWizard, hasSavedProgress, loadSavedProgress }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within WizardProvider");
  }
  return context;
}
