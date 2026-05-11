import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsHub } from '@/components/SolutionsHub';
import { ServiceSpotlights } from '@/components/ServiceSpotlights';
import { CardDesignEmbed } from '@/components/CardDesignEmbed';
import { KeywordDemo } from '@/components/KeywordDemo';
import { VideoSection } from '@/components/VideoSection';
import { HeroSection } from '@/components/HeroSection';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/elite-contact-card');
  const handleLearnMore = () => {
    window.open('https://calendly.com/elitecardpro', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Munnyman Communications — Elite Business Solutions | NFC, AI, Web & Custom Software"
        description="The full Elite suite: NFC contact cards, review placards, custom websites, AI agents, and bespoke software — built to grow your business."
        canonical="/"
      />
      <Navbar />

      <HeroSection
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
        primaryLabel="Explore the Elite Card"
        secondaryLabel="Book a Consultation"
      />

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

      <VideoSection />

      <CardDesignEmbed
        eyebrow="Card Designs"
        title={<>Choose Your <span className="font-serif italic gradient-iris">Signature Look</span></>}
        subtitle="Premium materials. Unforgettable first impressions."
      />

      {/* Outcome-driven service spotlights */}
      <ServiceSpotlights />

      <Footer />
    </div>
  );
};

export default Index;
