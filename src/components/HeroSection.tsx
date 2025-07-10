import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Zap, Shield, Users } from 'lucide-react';

interface HeroSectionProps {
  onLearnMore: () => void;
  onGetStarted: () => void;
}

export const HeroSection = ({ onLearnMore, onGetStarted }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Stats Bar */}
        <div className={`mb-8 inline-flex items-center gap-6 glass-effect rounded-full px-6 py-3 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Used by 10,000+ professionals</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">99.9% success rate</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <span className="gradient-text">Elite Contact Cards</span>
          <br />
          <span className="text-foreground">Change How You</span>
          <br />
          <span className="text-accent">Connect</span>
        </h1>

        {/* Subheadline */}
        <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          Professional NFC contact cards that foster word-of-mouth referrals with intelligent keyword search. 
          <span className="text-accent font-semibold"> Never lose a connection again.</span>
        </p>

        {/* Social Proof */}
        <div className={`flex items-center justify-center gap-2 mb-10 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background flex items-center justify-center">
                <Users className="w-4 h-4 text-background" />
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-3">Join thousands of professionals already connecting smarter</span>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 items-center justify-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full hover-glow group"
          >
            Get Your Elite Card
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            onClick={onLearnMore}
            variant="outline" 
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg rounded-full hover-lift group"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className={`flex flex-wrap items-center justify-center gap-8 opacity-60 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <span className="text-sm">Bank-Level Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm">Instant Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            <span className="text-sm">Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
};