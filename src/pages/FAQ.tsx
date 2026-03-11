import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const faqs = [
  { q: 'How does the NFC technology work?', a: 'Elite Cards use a 13.56MHz NFC chip with a fractal antenna. Simply hold the card near any smartphone and your contact profile is shared instantly — no app required.' },
  { q: 'What is Keyword Search optimization?', a: 'You can add custom keywords to your contact profile. When someone searches their contacts for "home", "insurance", or any keyword you set, your contact appears — even if they forgot your name.' },
  { q: 'How often do I get a new card?', a: 'Every 6 months you receive a brand new Elite Card to ensure quality. All past cards remain active and functional.' },
  { q: 'What happens if I lose my card?', a: 'Free replacements are included. When a card is replaced, the lost card is deactivated for security while all your information transfers to the new one.' },
  { q: 'Can I edit my contact information?', a: 'Yes! You can edit your card information 24/7, 365 days a year. Changes sync instantly across all cards.' },
  { q: 'What card designs are available?', a: 'We offer Matte White with color logo, Matte White or Black with reflective gold, Matte Black monochrome (our popular "Midnight Edition"), and custom photo designs.' },
  { q: 'What is the difference between Base and Pro?', a: 'Pro includes everything in Base plus a contact capture form, Simple CRM, dynamic text message templates, automatic emails with calendar links, analytics dashboard, and monthly networking goals.' },
  { q: 'Can I re-purpose cards for team members?', a: 'Absolutely. If a team member leaves, their Elite Card can be repurposed for a replacement — no waste.' },
  { q: 'How does the contact save as a phone app?', a: 'Recipients can save your Elite Contact profile to their home screen like an app, enabling sharing via AirDrop, text, email, and more.' },
  { q: 'What is the Elite Review Placard?', a: 'A separate NFC product that directs customers to your Google 5-star review page with a simple tap. Perfect for service businesses. $149.95/year or $14.99/month.' },
];

const FAQ = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="Frequently Asked Questions — Elite Card Pro" description="Get answers about Elite Contact Cards, NFC technology, keyword search, card designs, pricing, and more." canonical="/frequently-asked-questions" />
    <Navbar />

    <section className="pt-32 pb-20 mesh-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Support</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Frequently Asked
            <br />
            <span className="font-serif italic gradient-gold">Questions</span>
          </h1>
        </motion.div>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <Card className="liquid-glass border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
            <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
              Talk to Nic <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default FAQ;
