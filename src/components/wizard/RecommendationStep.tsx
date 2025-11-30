import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, ArrowRight, RotateCcw, Edit, ChevronDown, Copy, Check, MessageCircle, Calendar, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Recommendation } from "@/config/recommendationLogic";
import { WizardAnswers } from "@/config/recommendationLogic";
import { plans } from "@/config/plansConfig";
import { PlanComparisonTable } from "./PlanComparisonTable";
import jsPDF from "jspdf";

interface RecommendationStepProps {
  recommendation: Recommendation;
  answers: WizardAnswers;
  onEditAnswers: () => void;
  onStartOver: () => void;
}

const emailFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function RecommendationStep({ recommendation, answers, onEditAnswers, onStartOver }: RecommendationStepProps) {
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { toast } = useToast();

  const plan = plans.find(p => p.id === recommendation.planId);

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const jsonSummary = {
    visitorContext: {
      role: answers.role,
      companySize: answers.companySize,
      industry: answers.industry,
      primaryGoal: answers.primaryGoal,
      budget: answers.budget,
      urgency: answers.urgency,
      extraNeeds: answers.extraNeeds,
    },
    recommendation: {
      planId: recommendation.planId,
      planName: recommendation.planName,
      confidence: recommendation.confidence,
    },
    timestamp: new Date().toISOString(),
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonSummary, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailSubmit = (values: z.infer<typeof emailFormSchema>) => {
    // In production, this would send to your backend/CRM
    console.log("Email captured:", values.email, "Recommendation:", jsonSummary);
    setEmailSubmitted(true);
    toast({
      title: "Success!",
      description: "We've sent the recommendation summary to your email.",
    });
    form.reset();
  };

  const handleWhatsAppShare = () => {
    const message = `🎯 My Recommended Plan: ${recommendation.planName}\n\n` +
      `${recommendation.shortDescription}\n\n` +
      `💰 Price: ${plan?.price || "Contact us"}\n` +
      `✅ Confidence: ${recommendation.confidence}\n\n` +
      `Key Features:\n${recommendation.featureList.map(f => `• ${f}`).join('\n')}\n\n` +
      `Get your personalized recommendation at: ${window.location.href}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Your Recommended Plan", pageWidth / 2, yPos, { align: "center" });
    yPos += 15;

    // Plan name and price
    doc.setFontSize(16);
    doc.setTextColor(231, 76, 60);
    doc.text(recommendation.planName + " Plan", pageWidth / 2, yPos, { align: "center" });
    yPos += 10;
    
    if (plan) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(plan.price, pageWidth / 2, yPos, { align: "center" });
      yPos += 15;
    }

    // Description
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const splitDescription = doc.splitTextToSize(recommendation.shortDescription, pageWidth - 40);
    doc.text(splitDescription, 20, yPos);
    yPos += splitDescription.length * 7 + 10;

    // Features
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Key Features:", 20, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    recommendation.featureList.forEach((feature) => {
      const splitFeature = doc.splitTextToSize(`• ${feature}`, pageWidth - 40);
      doc.text(splitFeature, 25, yPos);
      yPos += splitFeature.length * 6;
    });
    yPos += 10;

    // Reasoning
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Why this plan?", 20, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const splitReasoning = doc.splitTextToSize(recommendation.reasoning, pageWidth - 40);
    doc.text(splitReasoning, 20, yPos);
    yPos += splitReasoning.length * 6 + 10;

    // ROI
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Estimated ROI:", 20, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const splitROI = doc.splitTextToSize(recommendation.estimatedROIText, pageWidth - 40);
    doc.text(splitROI, 20, yPos);

    // Save
    doc.save(`${recommendation.planName}-recommendation.pdf`);
    
    toast({
      title: "PDF Downloaded!",
      description: "Your recommendation has been saved.",
    });
  };

  const handleChatHandoff = () => {
    // Pass context data to SalesIQ before opening chat
    if (window.$zoho && window.$zoho.salesiq) {
      // Set visitor information with recommendation context
      window.$zoho.salesiq.visitor.info({
        "Recommended Plan": recommendation.planName,
        "Confidence": recommendation.confidence,
        "Role": answers.role,
        "Company Size": answers.companySize,
        "Industry": answers.industry,
        "Primary Goal": answers.primaryGoal,
        "Budget": answers.budget,
        "Urgency": answers.urgency,
        "Extra Needs": answers.extraNeeds.join(", "),
      });

      // Open the chat window
      window.$zoho.salesiq.floatwindow.visible("show");
    } else {
      console.error("SalesIQ API not loaded");
      toast({
        title: "Chat Unavailable",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const confidenceColors = {
    low: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    medium: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    high: "bg-green-500/10 text-green-600 border-green-500/20",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3 pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Your recommended plan</h2>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge className="bg-gradient-primary text-primary-foreground text-base px-4 py-1.5">
            {recommendation.planName} Plan
          </Badge>
          <Badge variant="outline" className={confidenceColors[recommendation.confidence]}>
            {recommendation.confidence} confidence
          </Badge>
        </div>
        {plan && (
          <p className="text-sm font-semibold text-primary">{plan.price}</p>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {recommendation.shortDescription}
        </p>

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Key features included
          </h3>
          <ul className="space-y-2">
            {recommendation.featureList.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-foreground">Why this plan?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recommendation.reasoning}
          </p>
        </div>

        <div className="bg-gradient-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-foreground">Estimated ROI</h3>
          <p className="text-sm text-foreground leading-relaxed">
            {recommendation.estimatedROIText}
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <Button 
          className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
          size="lg"
          asChild
        >
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={handleChatHandoff}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with Agent
          </Button>

          <Button 
            variant="outline"
            size="lg"
            asChild
          >
            <a href="https://calendly.com/your-link" target="_blank" rel="noopener noreferrer">
              <Calendar className="w-4 h-4 mr-2" />
              Book a Demo
            </a>
          </Button>

          <Button 
            onClick={handleDownloadPDF}
            variant="outline"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <Button 
          onClick={handleWhatsAppShare}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share on WhatsApp
        </Button>

        <PlanComparisonTable recommendedPlanId={recommendation.planId} />
        
        <div className="flex gap-2">
          <Button onClick={onEditAnswers} variant="outline" className="flex-1">
            <Edit className="w-4 h-4 mr-2" />
            Edit Answers
          </Button>
          <Button onClick={onStartOver} variant="ghost" className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {emailSubmitted ? "✅ Summary Sent!" : "📧 Get This Summary by Email"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {emailSubmitted 
              ? "Check your inbox for the detailed recommendation summary." 
              : "Enter your email to receive a detailed copy of this recommendation."}
          </p>
        </div>
        
        {!emailSubmitted && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Send Summary
              </Button>
            </form>
          </Form>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">Can I upgrade or downgrade my plan later?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the charges based on your billing cycle.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">What payment methods do you accept?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and digital wallets. For Business plans, we also offer invoice-based billing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">Is there a free trial available?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! We offer a 14-day free trial for all plans with no credit card required. You'll get full access to all features during the trial period.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">What happens if I exceed my plan limits?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We'll notify you when you're approaching your limits. You can either upgrade to a higher plan or purchase additional resources as needed. We never interrupt your service without warning.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">Do you offer discounts for annual billing?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! Annual billing comes with a 20% discount compared to monthly billing. You'll save money and avoid monthly payment processing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">Can I cancel my subscription anytime?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Collapsible open={isJsonOpen} onOpenChange={setIsJsonOpen} className="border-t border-border pt-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <span>Integration summary (for SalesIQ)</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isJsonOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-2">
          <div className="relative">
            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto max-h-64 overflow-y-auto">
              {JSON.stringify(jsonSummary, null, 2)}
            </pre>
            <Button
              onClick={handleCopy}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-green-600 text-center">Copied to clipboard!</p>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
