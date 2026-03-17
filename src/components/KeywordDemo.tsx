import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Search, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { VideoCarousel } from './VideoCarousel';

const searchTerms = [
  { keyword: 'home', name: 'Jacob Everson', title: 'Real Estate Professional' },
  { keyword: 'insurance', name: 'Samantha Clarke', title: 'Insurance Advisor' },
  { keyword: 'acupuncture', name: 'Mei Lin Zhang', title: 'Licensed Acupuncturist' },
  { keyword: 'tall', name: 'Nicholas Munn', title: 'Customer Retention Specialist' },
  { keyword: 'dentist', name: 'Dr. Priya Sharma', title: 'Family Dentist' },
  { keyword: 'plumber', name: 'Carlos Rivera', title: 'Master Plumber' },
];

export const KeywordDemo = () => {
  const { ref, isRevealed } = useScrollReveal();
  const [currentTerm, setCurrentTerm] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isRevealed) return;
    
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
  }, [displayText, isTyping, currentTerm, isRevealed]);

  return (
    <section ref={ref} className="py-32 mesh-section section-frost">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
              They Forgot Your Name.
              <br />
              <span className="font-serif italic gradient-iris">Not Anymore.</span>
            </h2>

            {/* Video Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-8"
            >
              <VideoCarousel />
            </motion.div>

            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
              Our exclusive <span className="text-foreground font-medium">Keyword Search</span> technology 
              lets clients find you in their phone contacts by searching for what you do — 
              not just who you are. A real estate agent? They search "home" and find you instantly.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                <span>Fosters word-of-mouth referrals</span>
              </div>
            </div>
          </motion.div>

          {/* Phone Mockup Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-72 liquid-glass rounded-[2.5rem] p-3 shadow-2xl">
              <div className="bg-background rounded-[2rem] overflow-hidden">
                {/* Phone Status Bar */}
                <div className="px-6 pt-4 pb-2 flex items-center justify-between">
                  <span className="text-xs font-medium">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-foreground/20 rounded-sm" />
                    <div className="w-4 h-2 bg-foreground/20 rounded-sm" />
                    <div className="w-6 h-2 bg-foreground rounded-sm" />
                  </div>
                </div>
                {/* Search Bar */}
                <div className="px-4 py-3">
                  <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium text-sm">
                      {displayText}
                      <span className="animate-pulse-soft text-muted-foreground">|</span>
                    </span>
                  </div>
                </div>
                {/* Results */}
                <div className="px-4 pb-6 space-y-3">
                  <motion.div
                    animate={{ opacity: displayText.length > 2 ? 1 : 0, y: displayText.length > 2 ? 0 : 10 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                  >
                    <div className="w-10 h-10 rounded-full gradient-iris-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {searchTerms[currentTerm].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{searchTerms[currentTerm].name}</div>
                      <div className="text-xs text-muted-foreground">{searchTerms[currentTerm].title}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
