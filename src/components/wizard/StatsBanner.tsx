import { useEffect, useState } from "react";
import { Users, Building2, TrendingUp, Award } from "lucide-react";

interface Stat {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Users, value: 500, suffix: "+", label: "Companies Trust Us" },
  { icon: Building2, value: 50, suffix: "+", label: "Industries Served" },
  { icon: TrendingUp, value: 85, suffix: "%", label: "Average ROI Increase" },
  { icon: Award, value: 98, suffix: "%", label: "Customer Satisfaction" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return (
    <span className="text-3xl sm:text-4xl font-bold text-foreground">
      {count}{suffix}
    </span>
  );
}

export function StatsBanner() {
  return (
    <div className="w-full bg-muted/30 border-y border-border py-8 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center space-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
