import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Bot, MessageSquare, BarChart3, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const solutions = [
  { icon: Bot, title: 'Custom AI Liaison', desc: 'Chat with our AI trained on Elite Card Pro products and services. Get instant answers 24/7.' },
  { icon: MessageSquare, title: 'Industry AI Agents', desc: 'Prebuilt AI models designed for niche industries — real estate, dental, consulting, and more.' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'AI-powered insights into your networking patterns and connection success rates.' },
  { icon: Sparkles, title: 'Custom Development', desc: 'Bespoke AI solutions tailored to your business workflow and networking goals.' },
];

const AISolutions = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title="AI Solutions — Custom AI Agents & Automation | Elite Card Pro" description="Explore custom-trained AI agents, industry-specific models, and intelligent networking analytics from Elite Card Pro." canonical="/ai-solutions" />
    <Navbar />

    <section className="pt-32 pb-20 mesh-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">AI Solutions</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Intelligence
            <br />
            <span className="font-serif italic gradient-gold">Meets Networking</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
            Custom-trained AI agents that transform how you connect, communicate, and convert.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                <Card className="liquid-glass border-0 h-full hover-lift">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
            <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
              Explore AI Solutions <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AISolutions;
