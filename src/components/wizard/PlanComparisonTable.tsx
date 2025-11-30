import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X, LayoutGrid, Star } from "lucide-react";
import { plans } from "@/config/plansConfig";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlanComparisonTableProps {
  recommendedPlanId?: string;
}

// Define the feature categories and which plans have them
const comparisonFeatures = [
  {
    category: "Team & Collaboration",
    features: [
      { name: "Team members", values: ["Up to 3", "Up to 15", "Up to 50", "Unlimited"] },
      { name: "Team collaboration tools", values: [false, true, true, true] },
      { name: "Dedicated account manager", values: [false, false, true, true] },
    ]
  },
  {
    category: "Automation & Workflows",
    features: [
      { name: "Workflow automation", values: ["Basic", "Advanced", "AI-powered", "Custom AI"] },
      { name: "Custom integrations", values: [false, true, true, true] },
      { name: "API access", values: [false, "Standard", "Full", "Full + Custom"] },
    ]
  },
  {
    category: "Storage & Analytics",
    features: [
      { name: "Storage", values: ["5 GB", "50 GB", "250 GB", "Unlimited"] },
      { name: "Analytics dashboard", values: [false, "Advanced", "Advanced", "Custom"] },
      { name: "Custom reporting", values: [false, false, true, true] },
    ]
  },
  {
    category: "Support & Security",
    features: [
      { name: "Support", values: ["Email", "Priority email", "24/7 priority", "Dedicated team"] },
      { name: "Advanced security", values: [false, false, true, true] },
      { name: "SSO & SAML", values: [false, false, false, true] },
      { name: "On-premise deployment", values: [false, false, false, true] },
    ]
  },
  {
    category: "Customization",
    features: [
      { name: "White-label", values: [false, false, false, true] },
      { name: "Custom SLA", values: [false, false, false, true] },
      { name: "Personalized onboarding", values: [false, false, false, true] },
    ]
  }
];

export function PlanComparisonTable({ recommendedPlanId }: PlanComparisonTableProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <LayoutGrid className="w-4 h-4 mr-2" />
          Compare All Plans
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-bold">Compare Plans</DialogTitle>
          <p className="text-sm text-muted-foreground">Choose the plan that fits your needs</p>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* Desktop view: side-by-side */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 w-1/5 align-top">
                      <span className="text-sm font-semibold text-muted-foreground">Features</span>
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="p-4 w-1/5 align-top relative">
                        {plan.mostPopular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                            <Badge className="bg-gradient-accent text-accent-foreground shadow-lg whitespace-nowrap">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        <div className={`space-y-2 ${plan.mostPopular ? 'pt-2' : ''}`}>
                          <div className="flex flex-col items-center gap-2">
                            <h3 className="font-bold text-lg text-foreground">{plan.name}</h3>
                            {recommendedPlanId === plan.id && (
                              <Badge className="bg-gradient-primary text-primary-foreground">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-lg font-semibold text-primary">{plan.price}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`}>
                        <td colSpan={5} className="pt-6 pb-2">
                          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                            {category.category}
                          </h4>
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr 
                          key={`feature-${categoryIndex}-${featureIndex}`}
                          className="border-t border-border hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-4 text-sm text-foreground font-medium">
                            {feature.name}
                          </td>
                          {feature.values.map((value, planIndex) => (
                            <td key={planIndex} className="p-4 text-center">
                              {typeof value === "boolean" ? (
                                value ? (
                                  <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
                                ) : (
                                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                )
                              ) : (
                                <span className="text-sm text-foreground">{value}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet view: card-based */}
            <div className="lg:hidden space-y-6">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`border rounded-lg p-5 space-y-4 relative ${
                    recommendedPlanId === plan.id 
                      ? "border-primary bg-primary/5" 
                      : plan.mostPopular
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card"
                  }`}
                >
                  {plan.mostPopular && (
                    <div className="absolute -top-3 left-4">
                      <Badge className="bg-gradient-accent text-accent-foreground shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="space-y-2 pb-3 border-b border-border">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-xl text-foreground">{plan.name}</h3>
                      {recommendedPlanId === plan.id && (
                        <Badge className="bg-gradient-primary text-primary-foreground">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg font-semibold text-primary">{plan.price}</p>
                  </div>
                  
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground uppercase tracking-wide">
                        {category.category}
                      </h4>
                      <div className="space-y-1.5">
                        {category.features.map((feature, featureIndex) => {
                          const planIndex = plans.findIndex(p => p.id === plan.id);
                          const value = feature.values[planIndex];
                          return (
                            <div key={featureIndex} className="flex items-center justify-between text-sm py-1">
                              <span className="text-muted-foreground">{feature.name}</span>
                              <span className="font-medium text-foreground flex items-center gap-1">
                                {typeof value === "boolean" ? (
                                  value ? (
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                  ) : (
                                    <X className="w-4 h-4 text-muted-foreground" />
                                  )
                                ) : (
                                  value
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
