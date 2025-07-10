import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  ArrowRight,
  BarChart3,
  MessageSquare,
  Calendar,
  Users
} from 'lucide-react';

const plans = [
  {
    name: "Elite Base",
    price: 150,
    period: "annually",
    badge: "Popular",
    badgeColor: "primary",
    description: "Perfect for professionals who want to revolutionize their networking",
    features: [
      "Unlimited NFC business card shares",
      "New Elite Card every 6 months",
      "Free replacements if lost/stolen",
      "Professional contact design",
      "24/7 card information editing",
      "Unlimited keyword search optimization",
      "Save contact as phone app",
      "Unlimited website & social links",
      "Re-purpose cards for team members"
    ],
    cta: "Start Networking Elite",
    popular: true
  },
  {
    name: "Elite Pro",
    price: 250,
    period: "annually", 
    badge: "Best Value",
    badgeColor: "accent",
    description: "For professionals serious about maximizing every connection",
    features: [
      "Everything in Elite Base",
      "Custom contact capture forms",
      "Automatic website redirects",
      "Simple CRM system",
      "Dynamic text message templates",
      "Automatic email with calendar links",
      "Advanced analytics dashboard",
      "Monthly networking goals",
      "Lead tracking & insights",
      "Premium support"
    ],
    cta: "Go Pro Today",
    popular: false
  }
];

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Investment Plans</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Choose Your</span>
            <br />
            <span className="gradient-text">Elite Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of professionals who've transformed their networking game
          </p>
        </div>

        {/* ROI Banner */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-3 glass-effect rounded-full px-6 py-3">
            <BarChart3 className="w-5 h-5 text-accent" />
            <span className="text-foreground font-medium">Average ROI: 500% in first year</span>
            <Star className="w-4 h-4 text-accent" />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all duration-500 hover-glow cursor-pointer ${
                plan.popular ? 'neon-border' : 'glass-effect'
              } ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-75'} ${
                hoveredPlan === index ? 'scale-105' : ''
              }`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <Badge className={`${
                    plan.badgeColor === 'primary' 
                      ? 'bg-primary/20 text-primary border-primary/30' 
                      : 'bg-accent/20 text-accent border-accent/30'
                  }`}>
                    {plan.badge}
                  </Badge>
                </div>
                
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold gradient-text">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className={`p-1 rounded-full ${
                        plan.badgeColor === 'primary' ? 'bg-primary/20' : 'bg-accent/20'
                      } mt-0.5`}>
                        <Check className={`w-3 h-3 ${
                          plan.badgeColor === 'primary' ? 'text-primary' : 'text-accent'
                        }`} />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-4 text-lg font-semibold rounded-xl group transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Additional Benefits for Pro */}
                {index === 1 && (
                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <MessageSquare className="w-5 h-5 text-accent mx-auto" />
                        <div className="text-xs text-muted-foreground">CRM</div>
                      </div>
                      <div className="space-y-1">
                        <Calendar className="w-5 h-5 text-accent mx-auto" />
                        <div className="text-xs text-muted-foreground">Auto Calendar</div>
                      </div>
                      <div className="space-y-1">
                        <BarChart3 className="w-5 h-5 text-accent mx-auto" />
                        <div className="text-xs text-muted-foreground">Analytics</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-accent" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Instant activation</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>Join 10,000+ professionals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};