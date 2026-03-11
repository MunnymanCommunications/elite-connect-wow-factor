import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';

const steps = [
  { step: '01', title: 'Deliver Service', desc: 'Provide an excellent experience for your client.' },
  { step: '02', title: 'Hover Phone', desc: 'Client hovers their phone over the Elite Review Placard.' },
  { step: '03', title: 'Click 5 Stars', desc: 'Client is directed straight to your Google 5-star review page.' },
  { step: '04', title: 'Rank Higher', desc: 'Watch your search visibility and ranking skyrocket.' },
];

const EliteReviewPlacards = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Elite Review Placards — NFC Google Review Cards | Elite Card Pro"
      description="Boost your Google reviews with NFC easy-tap technology. Direct clients to your 5-star review page instantly. $149.95/year or $14.99/month."
      canonical="/elite-review-placards"
    />
    <Navbar />

    <section className="pt-32 pb-20 mesh-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Reputation Management</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Elite Review
            <br />
            <span className="font-serif italic gradient-gold">Placards</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6">
            Happy customers forget to leave reviews. Unhappy ones don't. Fix this with NFC "easy tap" technology that directs clients straight to your 5-star Google review page.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-10">
            <div className="liquid-glass rounded-full px-6 py-3 text-sm font-medium">
              <span className="gradient-gold font-bold">$149.95</span> /year
            </div>
            <div className="liquid-glass rounded-full px-6 py-3 text-sm font-medium">
              <span className="gradient-gold font-bold">$14.99</span> /month
            </div>
          </div>
          <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
            <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
              Get Your Placard
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 text-center">
          4 Simple <span className="font-serif italic gradient-gold">Steps</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i }}>
              <Card className="liquid-glass border-0 h-full hover-lift text-center">
                <CardContent className="p-8">
                  <div className="text-5xl font-black gradient-gold mb-4">{s.step}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 mesh-section text-center">
      <div className="container mx-auto px-6">
        <Star className="w-12 h-12 mx-auto mb-6 text-amber-500" />
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
          More 5-Star Reviews = <span className="gradient-gold">Higher Rankings</span>
        </h2>
        <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto mb-10">
          Used by businesses like dental offices, restaurants, and service professionals to transform their online reputation.
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

export default EliteReviewPlacards;
