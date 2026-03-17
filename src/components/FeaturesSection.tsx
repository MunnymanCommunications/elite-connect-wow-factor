import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Smartphone,
  Search,
  RefreshCw,
  Shield,
  Share2,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'NFC Tap to Connect',
    description: 'One tap shares your full contact profile instantly. Works through phone cases with our fractal antenna.',
  },
  {
    icon: Search,
    title: 'Keyword Search Magic',
    description: 'Clients find you by typing "home", "insurance", or any keyword — even if they forgot your name.',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Updates',
    description: "Edit your info 24/7. Changes sync instantly to all cards you've ever shared.",
  },
  {
    icon: Shield,
    title: 'Premium Card Quality',
    description: 'New card every 6 months. Matte White, Midnight Edition, reflective gold, or custom photo.',
  },
  {
    icon: Share2,
    title: 'Save as Phone App',
    description: 'Your contact becomes a phone app. Share via AirDrop, text, email, and more.',
  },
  {
    icon: Globe,
    title: 'Unlimited Links',
    description: 'Website, social media, portfolios — all your important links in one place.',
  },
];

const stats = [
  { value: '500%', label: 'More Referrals' },
  { value: '10K+', label: 'Professionals' },
  { value: '24/7', label: 'Always Active' },
  { value: '99.9%', label: 'Reliability' },
];

export const FeaturesSection = () => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 relative section-frost">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase font-medium border-border/50">
            Why Elite Cards
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Dominate Your
            <br />
            <span className="font-serif italic gradient-iris">Networking Game</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Every feature engineered to maximize connections and generate referrals automatically.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="liquid-glass border-0 h-full hover-lift cursor-default group">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black tracking-tighter gradient-iris mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
