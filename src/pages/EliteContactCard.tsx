import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Smartphone, Search, RefreshCw, Shield, Share2, Globe } from 'lucide-react';

const features = [
  { icon: Smartphone, title: 'NFC Tap to Share', desc: 'One tap shares your full contact profile. Works through cases with fractal antenna tech.' },
  { icon: Search, title: 'Keyword Search', desc: 'Clients search "home" or "insurance" and find you — even if they forgot your name.' },
  { icon: RefreshCw, title: 'Real-Time Updates', desc: 'Edit your contact info 24/7/365. All past and present cards update instantly.' },
  { icon: Shield, title: 'Premium Quality', desc: 'New card every 6 months. Free replacements. Midnight Edition, Gold, White, or Custom Photo.' },
  { icon: Share2, title: 'Save as App', desc: 'Your contact becomes a phone app. Share via AirDrop, text, email, and more.' },
  { icon: Globe, title: 'Unlimited Links', desc: 'Website, social media, portfolios — all your important links in one place.' },
];

const cardOptions = [
  { name: 'Midnight Edition', desc: 'Matte black + monochrome black ink', gradient: 'from-gray-900 to-black' },
  { name: 'Reflective Gold', desc: 'Matte white or black + reflective gold', gradient: 'from-amber-600 to-amber-400' },
  { name: 'Classic White', desc: 'Matte white + full color logo', gradient: 'from-gray-100 to-white' },
  { name: 'Custom Photo', desc: 'Edge-to-edge custom imagery', gradient: 'from-blue-400 to-pink-400' },
];

const EliteContactCard = () => (
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
        </motion.div>
      </div>
    </section>

    {/* NFC Specs */}
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

    {/* CTA */}
    <section className="py-24 mesh-section">
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

export default EliteContactCard;
