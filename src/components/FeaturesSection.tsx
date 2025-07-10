import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Search, 
  RefreshCw, 
  Shield, 
  Share2, 
  Zap,
  Star,
  Users,
  BarChart3,
  Clock,
  Globe,
  Award
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: "NFC Technology",
    description: "Simply tap your Elite Card against any smartphone to instantly share your contact information",
    badge: "Advanced",
    color: "primary"
  },
  {
    icon: Search,
    title: "Keyword Search Magic",
    description: "Clients can find you by typing 'home', 'insurance', or any keyword - even if they forgot your name",
    badge: "Exclusive",
    color: "accent"
  },
  {
    icon: RefreshCw,
    title: "Real-Time Updates",
    description: "Change your information anytime, anywhere. All your cards update instantly across all devices",
    badge: "Dynamic",
    color: "primary"
  },
  {
    icon: Shield,
    title: "Premium Quality Cards",
    description: "New card every 6 months. Choose from Matte White, Midnight Edition, or custom photo designs",
    badge: "Premium",
    color: "accent"
  },
  {
    icon: Share2,
    title: "Save as Phone App",
    description: "Your contact profile becomes a phone app - share via AirDrop, text, email, and more",
    badge: "Smart",
    color: "primary"
  },
  {
    icon: Globe,
    title: "Unlimited Links",
    description: "Website, social media, portfolios - have all your important links in one place",
    badge: "Complete",
    color: "accent"
  }
];

export const FeaturesSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the animation of features
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => [...prev, index]);
              }, index * 150);
            });
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Revolutionary Features</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Why Elite Cards</span>
            <br />
            <span className="text-foreground">Dominate Networking</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every feature designed to maximize your professional connections and generate more referrals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleFeatures.includes(index);
            
            return (
              <Card 
                key={index}
                className={`glass-effect hover-glow group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'animate-reveal' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      feature.color === 'primary' ? 'bg-primary/20' : 'bg-accent/20'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${
                        feature.color === 'primary' ? 'text-primary' : 'text-accent'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <Badge variant="outline" className={`text-xs ${
                          feature.color === 'primary' ? 'border-primary/50 text-primary' : 'border-accent/50 text-accent'
                        }`}>
                          {feature.badge}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500%", label: "Increase in Referrals", icon: BarChart3 },
            { value: "10,000+", label: "Happy Professionals", icon: Users },
            { value: "24/7", label: "Always Active", icon: Clock },
            { value: "99.9%", label: "Reliability", icon: Award }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const isVisible = visibleFeatures.length > 0;
            
            return (
              <div 
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="glass-effect p-6 rounded-2xl hover-lift">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};