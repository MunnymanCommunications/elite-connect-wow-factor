import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PricingSection } from '@/components/PricingSection';
import { VideoSection } from '@/components/VideoSection';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

const Index = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleGetStarted = () => {
    setShowLeadModal(true);
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setShowLeadModal(true);
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add entrance animations on load
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <div className="min-h-screen bg-background custom-scrollbar overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">EC</span>
              </div>
              <span className="text-xl font-bold gradient-text">Elite Contact Cards</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#videos" className="text-muted-foreground hover:text-primary transition-colors">Videos</a>
              <button 
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full transition-all hover-glow"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection 
        onLearnMore={handleLearnMore}
        onGetStarted={handleGetStarted}
      />

      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection onSelectPlan={handleSelectPlan} />
      </div>

      {/* Video Section */}
      <div id="videos">
        <VideoSection />
      </div>

      {/* Footer */}
      <footer className="py-16 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-sm">EC</span>
                </div>
                <span className="text-xl font-bold gradient-text">Elite Contact Cards</span>
              </div>
              <p className="text-muted-foreground">
                Change the way experts connect. Professional NFC contact cards that revolutionize networking.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Munnyman Communications</p>
                <p>Changing the way experts connect</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Get Started</h4>
              <button 
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full transition-all hover-glow"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Munnyman Communications. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Index;
