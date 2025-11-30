export interface Plan {
  id: string;
  name: string;
  shortDescription: string;
  features: string[];
  price: string;
  mostPopular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    shortDescription: "Perfect for individuals and small teams getting started with automation and productivity tools.",
    features: [
      "Up to 3 team members",
      "Basic workflow automation",
      "Email support",
      "5 GB storage",
      "Mobile & web access",
      "Standard integrations"
    ],
    price: "₹2,400/month"
  },
  {
    id: "professional",
    name: "Professional",
    shortDescription: "Designed for growing teams that need advanced features and better collaboration tools.",
    features: [
      "Up to 15 team members",
      "Advanced workflow automation",
      "Priority email support",
      "50 GB storage",
      "Advanced analytics dashboard",
      "API access",
      "Custom integrations",
      "Team collaboration tools"
    ],
    price: "₹8,200/month",
    mostPopular: true
  },
  {
    id: "business",
    name: "Business",
    shortDescription: "Comprehensive solution for established businesses requiring enterprise-grade features and support.",
    features: [
      "Up to 50 team members",
      "AI-powered automation",
      "24/7 priority support",
      "250 GB storage",
      "Advanced analytics & insights",
      "Full API access",
      "Unlimited custom integrations",
      "Advanced security features",
      "Dedicated account manager",
      "Custom reporting"
    ],
    price: "₹24,800/month"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    shortDescription: "Tailored solutions for large organizations with complex needs and unlimited scalability.",
    features: [
      "Unlimited team members",
      "White-label customization",
      "Dedicated support team",
      "Unlimited storage",
      "Custom AI models",
      "Advanced security & compliance",
      "SSO & SAML integration",
      "Custom SLA",
      "On-premise deployment option",
      "Personalized onboarding & training",
      "Custom feature development"
    ],
    price: "Custom pricing"
  }
];
