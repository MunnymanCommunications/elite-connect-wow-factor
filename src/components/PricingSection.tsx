import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Elite Base',
    price: 150,
    period: 'year',
    badge: 'Popular',
    description: 'Everything you need to revolutionize your networking.',
    features: [
      'Unlimited NFC business card shares',
      'New Elite Card every 6 months',
      'Free replacements if lost or stolen',
      'Professional contact design',
      '24/7 card information editing',
      'Unlimited keyword search optimization',
      'Save contact as phone app',
      'Unlimited website & social links',
      'Re-purpose cards for team members',
    ],
    cta: 'Start Networking Elite',
    highlighted: false,
  },
  {
    name: 'Elite Pro',
    price: 250,
    period: 'year',
    badge: 'Best Value',
    description: 'For professionals serious about maximizing every connection.',
    features: [
      'Everything in Elite Base',
      'Custom contact capture forms',
      'Automatic website redirects',
      'Simple CRM system',
      'Dynamic text message templates',
      'Auto email with calendar links',
      'Analytics dashboard',
      'Monthly networking goals',
      'Lead tracking & insights',
    ],
    cta: 'Go Pro Today',
    highlighted: true,
  },
];

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 mesh-section section-frost">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase font-medium border-border/50">
            Investment Plans
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Choose Your
            <br />
            <span className="font-serif italic gradient-iris">Elite Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            More cost-effective than traditional paper cards. Infinitely more powerful.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <Card className={`relative overflow-hidden h-full hover-lift ${
                plan.highlighted
                  ? 'bg-foreground text-primary-foreground border-0'
                  : 'liquid-glass border-0'
              }`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 gradient-iris-bg" />
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <Badge className={plan.highlighted ? 'gradient-iris-bg text-primary-foreground border-0' : 'bg-secondary text-foreground border-0'}>
                      {plan.badge}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-5xl font-black tracking-tight ${plan.highlighted ? '' : 'gradient-iris'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                      /{plan.period}
                    </span>
                  </div>
                  <p className={`text-sm ${plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'bg-primary-foreground/20' : 'bg-secondary'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={`text-sm ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full rounded-xl py-5 text-base font-semibold group ${
                      plan.highlighted
                        ? 'bg-primary-foreground text-foreground hover:bg-primary-foreground/90'
                        : 'bg-foreground text-background hover:bg-foreground/90'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
