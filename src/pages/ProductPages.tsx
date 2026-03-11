import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PageTemplate = ({ title, subtitle, seoTitle, seoDesc, canonical, children }: {
  title: string; subtitle: string; seoTitle: string; seoDesc: string; canonical: string; children?: React.ReactNode;
}) => (
  <div className="min-h-screen bg-background">
    <SEOHead title={seoTitle} description={seoDesc} canonical={canonical} />
    <Navbar />
    <section className="pt-32 pb-20 mesh-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Elite Card Pro</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">{subtitle}</p>
          <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
            <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
              Schedule a Meeting <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
    {children}
    <Footer />
  </div>
);

export const EliteNetwork = () => (
  <PageTemplate title="Elite Network" subtitle="Join a community of professionals who are changing the way experts connect. Access exclusive benefits and networking opportunities." seoTitle="Elite Network — Professional Networking Community | Elite Card Pro" seoDesc="Join the Elite Network — a community of professionals leveraging NFC technology for smarter networking and referral generation." canonical="/elite-network" />
);

export const VenmoCard = () => (
  <PageTemplate title="Venmo Card" subtitle="Accept payments seamlessly with an NFC-powered Venmo card. One tap to connect your Venmo profile." seoTitle="Venmo Card — NFC Payment Card | Elite Card Pro" seoDesc="Elite Venmo Card with NFC technology. Accept peer-to-peer payments with a simple tap. Professional fintech networking solution." canonical="/venmo-card" />
);

export const BitcoinWalletCard = () => (
  <PageTemplate title="Bitcoin Elite Wallet Card" subtitle="Secure cryptocurrency wallet card with NFC technology. Share your Bitcoin wallet address with a single tap." seoTitle="Bitcoin Elite Wallet Card — NFC Crypto Wallet | Elite Card Pro" seoDesc="Secure NFC Bitcoin wallet card. Share your cryptocurrency wallet address professionally with a tap. Elite Card Pro." canonical="/bitcoin-elite-wallet-card" />
);

export const Blog = () => (
  <PageTemplate title="Blog" subtitle="Insights, tips, and strategies for professional networking, SEO, and leveraging NFC technology for your business." seoTitle="Blog — Networking Tips & NFC Technology | Elite Card Pro" seoDesc="Expert insights on professional networking, NFC technology, keyword search optimization, and generating referrals through Elite Contact Cards." canonical="/blog" />
);

export const About = () => (
  <PageTemplate
    title="Nicholas Munn"
    subtitle="Founder of Munnyman Communications. On a mission to change the way experts connect through innovative NFC technology and professional networking solutions."
    seoTitle="Nicholas Munn — Founder | Elite Card Pro"
    seoDesc="Meet Nicholas Munn, founder of Munnyman Communications and Elite Card Pro. Changing the way experts connect through NFC technology."
    canonical="/nicholasmunn"
  />
);

export const OnBoarding = () => (
  <PageTemplate title="On Boarding" subtitle="Welcome to Elite Card Pro! Follow our simple onboarding process to get your Elite Card set up and start networking smarter." seoTitle="Onboarding — Get Started with Elite Card Pro" seoDesc="Quick and easy onboarding process for your Elite Contact Card. Set up your profile, add keywords, and start connecting." canonical="/on-boarding" />
);

export const DigitalBusinessCard = () => (
  <PageTemplate title="Digital Business Card" subtitle="The future of business cards is digital. NFC-powered, always updated, and impossible to lose." seoTitle="Digital Business Card — NFC Business Cards | Elite Card Pro" seoDesc="Professional digital business cards with NFC technology. Always updated, unlimited shares, keyword search optimization." canonical="/digital-business-card" />
);
