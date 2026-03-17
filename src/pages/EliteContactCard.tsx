import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import {
  Check, ArrowRight, Smartphone, Search, RefreshCw, Shield, Share2, Globe,
  BarChart3, Mail, MessageSquare, Users, Settings, Pencil, Link, QrCode,
  Package, Upload, Palette, Truck, X
} from 'lucide-react';

const features = [
  { icon: Smartphone, title: 'NFC Tap to Share', desc: 'One tap shares your full contact profile. Works through cases with fractal antenna tech.' },
  { icon: Search, title: 'Keyword Search', desc: 'Clients search "home" or "insurance" and find you — even if they forgot your name.' },
  { icon: RefreshCw, title: 'Real-Time Updates', desc: 'Edit your contact info 24/7/365. All past and present cards update instantly.' },
  { icon: Shield, title: 'Premium Quality', desc: 'New card every 6 months. Free replacements. Midnight Edition, Gold, White, or Custom Photo.' },
  { icon: Share2, title: 'Save as App', desc: 'Your contact becomes a phone app. Share via AirDrop, text, email, and more.' },
  { icon: Globe, title: 'Unlimited Links', desc: 'Website, social media, portfolios — all your important links in one place.' },
];

const pvcOptions = [
  { name: 'Reflective Gold on Black', desc: 'Matte black card with reflective gold logo', gradient: 'from-gray-900 to-black', accent: 'border-2 border-amber-500/40' },
  { name: 'Reflective Gold on White', desc: 'Matte white card with reflective gold logo', gradient: 'from-gray-100 to-white', accent: 'border-2 border-amber-500/40' },
  { name: 'Reflective Silver on Black', desc: 'Matte black card with reflective silver logo', gradient: 'from-gray-900 to-black', accent: 'border-2 border-gray-400/40' },
  { name: 'Reflective Silver on White', desc: 'Matte white card with reflective silver logo', gradient: 'from-gray-100 to-white', accent: 'border-2 border-gray-400/40' },
  { name: 'Monochrome Black', desc: 'Matte black card with monochrome black ink', gradient: 'from-gray-900 to-black', accent: '' },
  { name: 'Monochrome White', desc: 'Matte white card with monochrome white ink', gradient: 'from-gray-100 to-white', accent: '' },
  { name: 'Full Color on White', desc: 'Matte white card with full color logo', gradient: 'from-gray-50 to-white', accent: 'border-2 border-blue-400/30' },
];

const woodOptions = [
  { name: 'Engraved Walnut', desc: 'Premium walnut wood with laser-engraved logo & embedded NFC chip', gradient: 'from-amber-900 to-amber-800' },
  { name: 'Engraved Maple', desc: 'Light maple wood with laser-engraved logo & embedded NFC chip', gradient: 'from-amber-200 to-amber-100' },
];

const metalOptions = [
  { name: 'Gold Metal', desc: 'Gold-finish metal card with laser-engraved logo & embedded NFC chip', gradient: 'from-amber-500 to-amber-300' },
  { name: 'Silver Metal', desc: 'Silver-finish metal card with laser-engraved logo & embedded NFC chip', gradient: 'from-gray-300 to-gray-100' },
];

const standardFeatures = [
  'NFC Contact Card',
  'Keyword Search Optimization',
  'Unlimited Digital Shares',
  'Real-Time Profile Updates',
  'Save as Phone App',
  'Unlimited Links & Social Profiles',
  'New Card Every 6 Months',
  'Free Replacements',
];

const proFeatures = [
  'Everything in Standard',
  'Elite Connections Dashboard (CRM)',
  'Contact Form — Capture Leads Automatically',
  'Dynamic Text & Email Templates',
  'Upon-Submission Auto Email',
  'Custom Redirect URL After Form',
  'Analytics Dashboard — Views & Saves',
  'Monthly Goal Tracking',
  'Export Contacts (CSV / Excel)',
  'QR Code & Direct Link Sharing',
  'Multi-Profile Support',
  'Priority Support',
];

const dashboardFeatures = [
  { icon: Users, title: 'Contact CRM', desc: 'Every person who fills out your contact form is captured — name, phone, email, company, job title, and notes. Your personal lead database.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track card views, contact saves, monthly trends, and year-to-date performance. Set monthly goals and watch your networking grow.' },
  { icon: MessageSquare, title: 'Dynamic Text Templates', desc: 'Pre-write text messages new contacts can send you instantly. Include your calendar link so they can book time with one tap.' },
  { icon: Mail, title: 'Auto Email on Submission', desc: 'When someone fills out your contact form, they automatically receive a personalized welcome email with your calendar link and intro.' },
  { icon: Link, title: 'Custom Redirect URL', desc: 'After form submission, contacts are redirected to your website, portfolio, booking page, or any URL you choose.' },
  { icon: Pencil, title: 'Edit Anytime', desc: 'Update your profile photo, bio, contact info, keywords, and links 24/7. Changes sync instantly to everyone who has your card.' },
  { icon: QrCode, title: 'QR Code & Link Sharing', desc: 'Share your digital card via QR code, direct link, text, email, or AirDrop — no physical card needed.' },
  { icon: Settings, title: 'Full Settings Control', desc: 'Configure email templates, text templates, redirect URLs, and manage multiple profiles — all from one dashboard.' },
];

const gettingStartedSteps = [
  {
    step: 1,
    icon: Package,
    title: 'Place Your Order',
    desc: 'Schedule a consultation and place your order. You\'ll receive an order confirmation email with a link to set up your digital Elite Card and upload your logo for the physical card.',
  },
  {
    step: 2,
    icon: Upload,
    title: 'Set Up Your Card',
    desc: 'Use the link in your confirmation email to add your contact information, profile photo, keywords, bio, and social links to your digital Elite Card.',
  },
  {
    step: 3,
    icon: Palette,
    title: 'Choose Your Design',
    desc: 'You\'ll receive an email with design options for your physical NFC card — Midnight Edition, Reflective Gold, Classic White, or Custom Photo.',
  },
  {
    step: 4,
    icon: Truck,
    title: 'Receive Your Card',
    desc: 'Your premium NFC card arrives within 2 weeks of design selection. Start tapping and connecting immediately.',
  },
];

const EliteContactCard = () => {
  const [gettingStartedOpen, setGettingStartedOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Elite Contact Card — Professional NFC Business Cards | Elite Card Pro"
        description="Professional NFC contact cards with keyword search optimization. Unlimited shares, real-time updates, and premium card designs starting at $150/year."
        canonical="/elite-contact-card"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 mesh-section">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Core Product</Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              The Elite
              <br />
              <span className="font-serif italic gradient-gold">Contact Card</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
              Professional NFC contact cards engineered to generate word-of-mouth referrals through intelligent keyword search technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
                <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                  Get Started — $150/yr
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 py-6 group">
                <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                  Go Pro — $250/yr
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              <iframe
                src="https://www.youtube.com/embed/i_6JVumKbrQ?autoplay=1&mute=1&loop=1&playlist=i_6JVumKbrQ&controls=1&modestbranding=1&playsinline=1&rel=0"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Elite Contact Card Overview"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 text-center">
              How It <span className="font-serif italic gradient-gold">Works</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { step: '01', title: 'Tap', desc: 'Hold your Elite Card to any smartphone. The 13.56MHz NFC chip connects instantly.' },
                { step: '02', title: 'Connect', desc: 'Your full contact profile, links, and keywords are saved to their phone.' },
                { step: '03', title: 'Rediscover', desc: 'Months later, they search "home" in contacts and find you immediately.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * i }}>
                  <Card className="liquid-glass border-0 h-full hover-lift">
                    <CardContent className="p-8 text-center">
                      <div className="text-5xl font-black gradient-gold mb-4">{item.step}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 mesh-section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 text-center">
            Everything <span className="font-serif italic gradient-gold">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card key={i} className="liquid-glass border-0 hover-lift">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standard vs Pro Comparison */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-center">
            Standard vs <span className="font-serif italic gradient-gold">Pro</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto font-light">
            Both plans include a premium NFC card. Pro unlocks the full Elite Connections Dashboard — your personal CRM for networking.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard */}
            <Card className="liquid-glass border-0 hover-lift">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge variant="outline" className="mb-3 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Standard</Badge>
                  <div className="text-4xl font-black">$150<span className="text-lg font-normal text-muted-foreground">/yr</span></div>
                </div>
                <ul className="space-y-3">
                  {standardFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" variant="outline" className="w-full mt-8 rounded-full group">
                  <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="liquid-glass border-0 hover-lift relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="mb-3 rounded-full px-4 py-1 text-xs tracking-widest uppercase bg-foreground text-background">Pro — Most Popular</Badge>
                  <div className="text-4xl font-black">$250<span className="text-lg font-normal text-muted-foreground">/yr</span></div>
                </div>
                <ul className="space-y-3">
                  {proFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-full mt-8 rounded-full bg-foreground text-background hover:bg-foreground/90 group">
                  <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                    Go Pro
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Elite Connections Dashboard */}
      <section className="py-24 mesh-section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-center">
            The Elite Connections <span className="font-serif italic gradient-gold">Dashboard</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-6 max-w-2xl mx-auto font-light">
            Your personal CRM built for networking professionals. Track every connection, automate follow-ups, and measure your growth — all from your phone or computer.
          </p>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Accessible as a web app on any device. Save it to your home screen for instant access — it works like a native app.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {dashboardFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                  <Card className="liquid-glass border-0 hover-lift h-full">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{f.title}</h3>
                        <p className="text-sm text-muted-foreground">{f.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Setup Video */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold tracking-tight text-center mb-6">
              Watch: How to Set Up Your <span className="font-serif italic gradient-gold">Elite Card</span>
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              <iframe
                src="https://www.youtube.com/embed/3b6rdXNqiig?controls=1&modestbranding=1&playsinline=1&rel=0"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="How to Set Up Your Elite Card"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Card Designs */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 text-center">
            Card <span className="font-serif italic gradient-gold">Designs</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cardOptions.map((c, i) => (
              <div key={i} className="hover-lift">
                <div className={`aspect-[1.6/1] rounded-2xl bg-gradient-to-br ${c.gradient} mb-4 shadow-lg`} />
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-24 mesh-section">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            Getting Started is <span className="font-serif italic gradient-gold">Simple</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto font-light">
            From order to card-in-hand in just 4 easy steps.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {gettingStartedSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i }}>
                  <Card className="liquid-glass border-0 h-full hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Step {s.step}</div>
                      <h3 className="font-bold mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Dialog trigger for detailed view */}
          <Dialog open={gettingStartedOpen} onOpenChange={setGettingStartedOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="rounded-full px-8 group">
                See Full Setup Process
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight">Getting Started</DialogTitle>
                <DialogDescription className="text-muted-foreground">Your journey from order to connecting.</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                {gettingStartedSteps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        {i < gettingStartedSteps.length - 1 && (
                          <div className="w-px h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Step {s.step}</div>
                        <h4 className="font-bold mb-1">{s.title}</h4>
                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4">
                <Button asChild size="lg" className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 group">
                  <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            Ready to Connect <span className="font-serif italic gradient-gold">Smarter?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto font-light">
            Schedule a consultation with Nic and get your Elite Card.
          </p>
          <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
            <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
              Schedule a Meeting
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EliteContactCard;
