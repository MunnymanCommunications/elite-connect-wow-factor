import { motion } from 'framer-motion';
import { ArrowRight, Play, Search, Home, Shield, Flower2, Ruler, Stethoscope, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onLearnMore: () => void;
  onGetStarted: () => void;
}

const searchTerms = [
  { keyword: 'home', name: 'Jacob Everson', title: 'Real Estate Professional', icon: Home },
  { keyword: 'insurance', name: 'Samantha Clarke', title: 'Insurance Advisor', icon: Shield },
  { keyword: 'acupuncture', name: 'Mei Lin Zhang', title: 'Licensed Acupuncturist', icon: Flower2 },
  { keyword: 'tall', name: 'Nicholas Munn', title: 'Customer Retention Specialist', icon: Ruler },
  { keyword: 'dentist', name: 'Dr. Priya Sharma', title: 'Family Dentist', icon: Stethoscope },
  { keyword: 'plumber', name: 'Carlos Rivera', title: 'Master Plumber', icon: Wrench },
];

export const HeroSection = ({ onLearnMore, onGetStarted }: HeroSectionProps) => {
  const [currentTerm, setCurrentTerm] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const term = searchTerms[currentTerm].keyword;
    if (isTyping) {
      if (displayText.length < term.length) {
        const timeout = setTimeout(() => setDisplayText(term.slice(0, displayText.length + 1)), 120);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentTerm((prev) => (prev + 1) % searchTerms.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentTerm]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Iridescent Orbs */}
      <div className="absolute top-1/4 left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/20 via-violet-100/15 to-transparent blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-100/15 via-teal-100/10 to-transparent blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-violet-50/20 to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 liquid-glass rounded-full px-5 py-2 text-xs font-medium tracking-widest uppercase text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-ring animate-pulse-soft" />
            Trusted by 10,000+ Professionals
          </span>
        </motion.div>

        {/* Headline — smaller */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6"
        >
          <span className="kinetic-word">Word</span>{' '}
          <span className="kinetic-word">of</span>{' '}
          <span className="kinetic-word">Mouth</span>
          <br />
          <span className="kinetic-word text-muted-foreground font-light text-2xl sm:text-3xl md:text-5xl">+</span>
          <br />
          <span className="kinetic-word font-serif italic gradient-iris">Referrals</span>{' '}
          <span className="kinetic-word">=</span>{' '}
          <span className="kinetic-word">Success</span>
        </motion.h1>

        {/* Inline Keyword Search Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex justify-center mb-8"
        >
          <div className="w-72 liquid-glass rounded-2xl p-1">
            <div className="bg-background/80 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5">
                <div className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2">
                  <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm">
                    {displayText}
                    <span className="animate-pulse-soft text-muted-foreground">|</span>
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ opacity: displayText.length > 2 ? 1 : 0, y: displayText.length > 2 ? 0 : 8 }}
                className="px-4 pb-3"
              >
                <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                  <div className="w-8 h-8 rounded-full gradient-iris-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0">
                    {searchTerms[currentTerm].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold">{searchTerms[currentTerm].name}</div>
                    <div className="text-[10px] text-muted-foreground">{searchTerms[currentTerm].title}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Professional NFC contact cards with{' '}
          <span className="text-foreground font-medium">intelligent keyword search</span>.
          Your clients find you even when they forget your name.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="rounded-full px-10 py-6 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 btn-ripple group"
          >
            Get Your Elite Card
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={onLearnMore}
            variant="outline"
            size="lg"
            className="rounded-full px-10 py-6 text-base font-semibold border-border/50 hover:bg-secondary/50 liquid-glass group"
          >
            <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
