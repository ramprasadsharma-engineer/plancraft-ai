import { plans } from "./plansConfig";

export interface WizardAnswers {
  role: string;
  companySize: string;
  industry: string;
  primaryGoal: string;
  budget: string;
  urgency: string;
  extraNeeds: string[];
}

export interface Recommendation {
  planId: string;
  planName: string;
  shortDescription: string;
  featureList: string[];
  estimatedROIText: string;
  confidence: "low" | "medium" | "high";
  reasoning: string;
}

export function getRecommendation(answers: WizardAnswers): Recommendation {
  let score = {
    starter: 0,
    professional: 0,
    business: 0,
    enterprise: 0
  };

  // Company size scoring
  switch (answers.companySize) {
    case "1–5":
      score.starter += 3;
      score.professional += 1;
      break;
    case "6–20":
      score.starter += 1;
      score.professional += 3;
      score.business += 1;
      break;
    case "21–50":
      score.professional += 2;
      score.business += 3;
      score.enterprise += 1;
      break;
    case "51–200":
      score.business += 3;
      score.enterprise += 2;
      break;
    case "200+":
      score.business += 1;
      score.enterprise += 3;
      break;
  }

  // Budget scoring
  switch (answers.budget) {
    case "< ₹4,000":
      score.starter += 3;
      score.professional += 1;
      break;
    case "₹4,000–₹12,000":
      score.starter += 1;
      score.professional += 3;
      score.business += 1;
      break;
    case "₹12,000–₹25,000":
      score.professional += 1;
      score.business += 3;
      score.enterprise += 1;
      break;
    case "₹25,000+":
      score.business += 2;
      score.enterprise += 3;
      break;
  }

  // Primary goal scoring
  switch (answers.primaryGoal) {
    case "Improve productivity":
      score.professional += 2;
      score.business += 1;
      break;
    case "Automate workflows":
      score.professional += 2;
      score.business += 2;
      score.enterprise += 1;
      break;
    case "Improve customer support":
      score.business += 2;
      score.enterprise += 1;
      break;
    case "Better analytics & insights":
      score.business += 2;
      score.enterprise += 2;
      break;
  }

  // Role scoring
  if (answers.role === "Founder / Owner") {
    score.professional += 1;
    score.business += 1;
  } else if (answers.role === "IT / Admin") {
    score.business += 1;
    score.enterprise += 1;
  }

  // Extra needs scoring
  const extraNeeds = answers.extraNeeds || [];
  if (extraNeeds.includes("Custom integrations / API")) {
    score.business += 2;
    score.enterprise += 2;
  }
  if (extraNeeds.includes("Advanced analytics")) {
    score.business += 2;
    score.enterprise += 1;
  }
  if (extraNeeds.includes("Priority support")) {
    score.business += 1;
    score.enterprise += 2;
  }
  if (extraNeeds.length >= 3) {
    score.business += 1;
    score.enterprise += 2;
  }

  // Determine winning plan
  const maxScore = Math.max(score.starter, score.professional, score.business, score.enterprise);
  let recommendedPlanId: string;
  
  if (score.enterprise === maxScore) {
    recommendedPlanId = "enterprise";
  } else if (score.business === maxScore) {
    recommendedPlanId = "business";
  } else if (score.professional === maxScore) {
    recommendedPlanId = "professional";
  } else {
    recommendedPlanId = "starter";
  }

  const plan = plans.find(p => p.id === recommendedPlanId)!;

  // Calculate confidence
  const sortedScores = Object.values(score).sort((a, b) => b - a);
  const scoreDifference = sortedScores[0] - sortedScores[1];
  const confidence: "low" | "medium" | "high" = 
    scoreDifference >= 4 ? "high" : 
    scoreDifference >= 2 ? "medium" : 
    "low";

  // Generate reasoning
  const reasoning = generateReasoning(answers, recommendedPlanId);

  // Generate ROI text
  const estimatedROIText = generateROIText(answers, recommendedPlanId);

  return {
    planId: plan.id,
    planName: plan.name,
    shortDescription: plan.shortDescription,
    featureList: plan.features,
    estimatedROIText,
    confidence,
    reasoning
  };
}

function generateReasoning(answers: WizardAnswers, planId: string): string {
  const reasons: string[] = [];

  // Company size reasoning
  if (["1–5", "6–20"].includes(answers.companySize) && planId === "starter") {
    reasons.push(`Your team size (${answers.companySize} members) is well-suited for our Starter plan`);
  } else if (answers.companySize === "6–20" && planId === "professional") {
    reasons.push(`With ${answers.companySize} team members, you'll benefit from Professional's collaboration tools`);
  } else if (["21–50", "51–200"].includes(answers.companySize) && ["business", "enterprise"].includes(planId)) {
    reasons.push(`Your company size (${answers.companySize}) requires the scalability and advanced features of this plan`);
  }

  // Goal reasoning
  if (answers.primaryGoal === "Automate workflows" && ["business", "enterprise"].includes(planId)) {
    reasons.push("Advanced automation capabilities will transform your workflow efficiency");
  } else if (answers.primaryGoal === "Better analytics & insights") {
    reasons.push("You'll get comprehensive analytics and insights to drive data-driven decisions");
  }

  // Extra needs
  if (answers.extraNeeds?.includes("Custom integrations / API")) {
    reasons.push("Full API access enables seamless integration with your existing tools");
  }
  if (answers.extraNeeds?.includes("Priority support")) {
    reasons.push("Priority support ensures your team gets help when you need it most");
  }

  // Urgency
  if (answers.urgency === "Need immediately") {
    reasons.push("This plan offers quick onboarding to meet your immediate needs");
  }

  return reasons.join(". ") + ".";
}

function generateROIText(answers: WizardAnswers, planId: string): string {
  const companySize = answers.companySize;
  const goal = answers.primaryGoal;

  let teamSize = 3;
  if (companySize === "6–20") teamSize = 10;
  else if (companySize === "21–50") teamSize = 30;
  else if (companySize === "51–200") teamSize = 100;
  else if (companySize === "200+") teamSize = 300;

  let hoursSaved = 0;
  let productivityGain = "";

  switch (planId) {
    case "starter":
      hoursSaved = teamSize * 2;
      productivityGain = "15–20%";
      break;
    case "professional":
      hoursSaved = teamSize * 4;
      productivityGain = "25–35%";
      break;
    case "business":
      hoursSaved = teamSize * 6;
      productivityGain = "35–50%";
      break;
    case "enterprise":
      hoursSaved = teamSize * 8;
      productivityGain = "50–70%";
      break;
  }

  let roiText = `Based on your team size and goals, this plan could help you save approximately ${hoursSaved}+ hours per month`;

  if (goal === "Improve productivity") {
    roiText += `, potentially improving team productivity by ${productivityGain}`;
  } else if (goal === "Automate workflows") {
    roiText += `, eliminating repetitive tasks and reducing manual errors by up to 80%`;
  } else if (goal === "Better analytics & insights") {
    roiText += `, enabling faster, data-driven decisions that can increase revenue by ${productivityGain}`;
  }

  return roiText + ".";
}
