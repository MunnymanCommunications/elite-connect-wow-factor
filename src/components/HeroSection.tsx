import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onLearnMore: () => void;
  onGetStarted: () => void;
}

export const HeroSection = ({ onLearnMore, onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-section" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-100/30 to-transparent blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-100/20 to-transparent blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 liquid-glass rounded-full px-5 py-2 text-xs font-medium tracking-widest uppercase text-muted-foreground">
            <span className="w-2 h-2 rounded-full gradient-gold-bg animate-pulse-soft" />
            Trusted by 10,000+ Professionals
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
        >
          <span className="kinetic-word">Word</span>{' '}
          <span className="kinetic-word">of</span>{' '}
          <span className="kinetic-word">Mouth</span>
          <br />
          <span className="kinetic-word text-muted-foreground font-light text-4xl sm:text-5xl md:text-7xl">+</span>
          <br />
          <span className="kinetic-word font-serif italic gradient-gold">Referrals</span>{' '}
          <span className="kinetic-word">=</span>{' '}
          <span className="kinetic-word">Success</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
            className="rounded-full px-10 py-6 text-base font-semibold border-border hover:bg-secondary group"
          >
            <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-3">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full gradient-gold-bg border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="font-light">
            Join thousands connecting <span className="font-medium text-foreground">smarter</span>
          </span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
