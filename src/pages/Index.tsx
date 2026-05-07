import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsHub } from '@/components/SolutionsHub';
import { ServiceSpotlights } from '@/components/ServiceSpotlights';
import { CardDesignEmbed } from '@/components/CardDesignEmbed';
import { KeywordDemo } from '@/components/KeywordDemo';
import { VideoSection } from '@/components/VideoSection';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Munnyman Communications — Elite Business Solutions | NFC, AI, Web & Custom Software"
        description="The full Elite suite: NFC contact cards, review placards, custom websites, AI agents, and bespoke software — built to grow your business."
        canonical="/"
      />
      <Navbar />

      {/* Compact landing hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/20 via-violet-100/15 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-100/15 via-teal-100/10 to-transparent blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 liquid-glass rounded-full px-5 py-2 text-xs font-medium tracking-widest uppercase text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-ring animate-pulse-soft" />
              Munnyman Communications
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6 max-w-5xl mx-auto"
          >
            Changing the way{' '}
            <span className="font-serif italic gradient-iris">experts connect.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            NFC contact cards. Review placards. Custom websites. AI agents. Bespoke software.
            <span className="text-foreground font-medium"> One Elite suite</span> built to grow your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 py-6 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 group"
            >
              <a href="#solutions">
                Explore Solutions
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-10 py-6 text-base font-semibold border-border/50 liquid-glass"
            >
              <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <div id="solutions">
        <SolutionsHub />
      </div>

      <KeywordDemo />


      {/* Flagship product spotlights */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Flagship Products</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Start With Our <span className="font-serif italic gradient-iris">Bestsellers</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Link to="/elite-contact-card" className="block group">
              <div className="liquid-glass rounded-3xl p-10 h-full hover-lift transition-all duration-500 group-hover:shadow-2xl">
                <Badge variant="outline" className="mb-4 rounded-full px-3 py-0.5 text-[10px] tracking-widest uppercase">Flagship</Badge>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Elite Contact Cards</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Word-of-mouth referrals on autopilot. NFC + intelligent keyword search means clients find you, even when they forget your name.
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  Explore Elite Cards
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/elite-review-placards" className="block group">
              <div className="liquid-glass rounded-3xl p-10 h-full hover-lift transition-all duration-500 group-hover:shadow-2xl">
                <Badge variant="outline" className="mb-4 rounded-full px-3 py-0.5 text-[10px] tracking-widest uppercase">Flagship</Badge>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Elite Review Placards</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Guarantee more 5-star Google reviews. NFC placards turn happy customers into glowing reviews — in a single tap.
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  Explore Review Placards
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <CardDesignEmbed
        eyebrow="Card Designs"
        title={<>Choose Your <span className="font-serif italic gradient-iris">Signature Look</span></>}
        subtitle="Premium materials. Unforgettable first impressions."
      />


      {/* Outcome-driven service spotlights */}
      <ServiceSpotlights />

      <VideoSection />

      <Footer />
    </div>
  );
};

export default Index;
