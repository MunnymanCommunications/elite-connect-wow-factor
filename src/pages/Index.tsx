import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PricingSection } from '@/components/PricingSection';
import { VideoSection } from '@/components/VideoSection';
import { CardShowcase } from '@/components/CardShowcase';
import { KeywordDemo } from '@/components/KeywordDemo';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { SEOHead } from '@/components/SEOHead';

const Index = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleGetStarted = () => setShowLeadModal(true);
  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setShowLeadModal(true);
  };
  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Elite Card Pro — Professional NFC Contact Cards | Word of Mouth + Referrals = Success"
        description="Professional NFC contact cards with intelligent keyword search. Generate more referrals and never lose a connection again. Starting at $150/year."
        canonical="/"
      />
      <Navbar />

      <HeroSection onLearnMore={handleLearnMore} onGetStarted={handleGetStarted} />

      <KeywordDemo />

      <div id="features">
        <FeaturesSection />
      </div>

      <CardShowcase />

      <div id="pricing">
        <PricingSection onSelectPlan={handleSelectPlan} />
      </div>

      <div id="videos">
        <VideoSection />
      </div>

      <Footer />

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Index;
