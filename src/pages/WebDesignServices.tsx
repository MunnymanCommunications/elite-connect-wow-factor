import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Globe, Calendar, MessageCircle, Zap, Shield, Sparkles,
  TrendingUp, Bot, FileText, Search, BarChart3, ImageIcon, ExternalLink,
} from 'lucide-react';

const pillars = [
  { icon: Sparkles, title: 'Bespoke Design', desc: 'Hand-crafted to feel like your brand — not a template anyone else can buy.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Engineered for performance. Sub-second loads on every device, every time.' },
  { icon: Shield, title: 'Fully Managed', desc: 'You never touch a plugin again. We handle hosting, updates, and security.' },
  { icon: TrendingUp, title: 'Built To Convert', desc: 'Every section, every CTA, every word — designed to turn visitors into clients.' },
];

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We learn your business, your goals, your voice, and your dream client.' },
  { step: '02', title: 'Design & Build', desc: 'A bespoke site designed around your brand and engineered to convert.' },
  { step: '03', title: 'Launch', desc: 'Hosted on a premium stack with SSL, CDN, and uptime monitoring built in.' },
  { step: '04', title: 'Quarterly Strategy', desc: 'Scheduled meetings every 90 days to evolve your site as your business grows.' },
];

const portfolio = [
  { name: 'Client Project One', tag: 'Service Business', desc: 'Add a 1-2 sentence description of the project — the goal, the build, and the outcome you delivered.', url: '#' },
  { name: 'Client Project Two', tag: 'E-commerce', desc: 'Add a 1-2 sentence description of the project — the goal, the build, and the outcome you delivered.', url: '#' },
  { name: 'Client Project Three', tag: 'Professional Services', desc: 'Add a 1-2 sentence description of the project — the goal, the build, and the outcome you delivered.', url: '#' },
  { name: 'Client Project Four', tag: 'Hospitality', desc: 'Add a 1-2 sentence description of the project — the goal, the build, and the outcome you delivered.', url: '#' },
  { name: 'Client Project Five', tag: 'Health & Wellness', desc: 'Add a 1-2 sentence description of the project — the goal, the build, and the outcome you delivered.', url: '#' },
  { name: 'Client Project Six', tag: 'Real Estate', desc: 'Add a 1-2 sentence description of the project — the goal, the build, and the outcome you delivered.', url: '#' },
];

const blogBenefits = [
  { icon: FileText, title: 'Daily SEO-Optimized Posts', desc: 'A fresh, keyword-targeted article published to your blog every single day — no writer\'s block, no missed weeks.' },
  { icon: Search, title: 'Built For Search Visibility', desc: 'Each post is engineered around the keywords your dream clients are actually typing into Google.' },
  { icon: BarChart3, title: 'Proven Metrics', desc: 'Track impressions, clicks, and ranking growth month over month with transparent reporting.' },
  { icon: Bot, title: 'Set It & Forget It', desc: 'You approve the strategy once. The AI handles publishing, internal linking, and on-page SEO — every day.' },
];

const WebDesignServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Custom Website Design, Hosting & Management | Elite Card Pro"
        description="Bespoke website design, premium hosting, and full ongoing management. Quarterly strategy meetings, direct lines of communication, and an optional AI agent that publishes daily SEO-optimized blogs."
        canonical="/web-design"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 mesh-section">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Website Design + Hosting + Management</Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.05]">
              A Website That Sells.
              <br />
              <span className="font-serif italic gradient-iris">While You Sleep.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
              Bespoke design, premium hosting, and a team that manages every pixel — so you wake up to inbound leads instead of plugin update emails.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
                <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                  Schedule a Strategy Call
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-10 py-6">
                <a href="#portfolio">See Our Work</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 section-frost">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Why Elite Card Pro</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              More Than A Website. <span className="font-serif italic gradient-iris">A Growth Engine.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="liquid-glass border-0 h-full hover-lift">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">The Process</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              From Idea To <span className="font-serif italic gradient-iris">Inbound Leads</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="liquid-glass border-0 h-full hover-lift">
                  <CardContent className="p-8">
                    <div className="text-3xl font-black gradient-iris mb-3">{p.step}</div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quarterly meetings + direct line */}
      <section className="py-24 section-frost">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="liquid-glass border-0 h-full hover-lift">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/80 flex items-center justify-center mb-6">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">
                    Quarterly Strategy <span className="font-serif italic gradient-iris">Meetings</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every 90 days we sit down together to review performance, surface new opportunities, and plan the next chapter of your site. Your website evolves as your business does — never stagnant, always sharpening.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="liquid-glass border-0 h-full hover-lift">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/80 flex items-center justify-center mb-6">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">
                    A Direct Line To <span className="font-serif italic gradient-iris">Your Team</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Need a change today? Send a message and it's handled — no support tickets, no waiting weeks. You get a real human, a real response, and changes implemented quickly.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Recent Work</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Sites We've <span className="font-serif italic gradient-iris">Built & Manage</span>
            </h2>
            <p className="text-muted-foreground font-light">
              A few of the brands we've designed, launched, and continue to grow with.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolio.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="liquid-glass border-0 h-full hover-lift overflow-hidden">
                  {/* Image placeholder — upload screenshot here */}
                  <div className="aspect-video bg-secondary/60 flex items-center justify-center border-b border-border/40">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-60" />
                      <span className="text-xs tracking-widest uppercase">Screenshot Placeholder</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 rounded-full px-3 py-0.5 text-[10px] tracking-widest uppercase">
                      {p.tag}
                    </Badge>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                    <Button asChild size="sm" variant="outline" className="rounded-full group">
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        Visit Site
                        <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Blog Agent Add-On */}
      <section className="py-24 section-frost">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto liquid-glass rounded-3xl p-8 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Optional Add-On</Badge>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-[1.05]">
                  AI Blog Agent.
                  <br />
                  <span className="font-serif italic gradient-iris">Daily SEO. On Autopilot.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Add our custom AI agent to your site and get a fresh, SEO-optimized blog post published to your website every single day. Proven to increase search visibility, drive organic traffic, and keep your brand top-of-mind on Google.
                </p>
                <Button asChild size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 group">
                  <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                    Add The AI Blog Agent
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
              <div>
                {/* AI agent image placeholder — upload visual here */}
                <div className="aspect-square rounded-2xl bg-secondary/60 border border-border/40 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mb-3 opacity-60" />
                  <span className="text-xs tracking-widest uppercase">AI Agent Image Placeholder</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {blogBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="bg-background/40 backdrop-blur rounded-2xl p-6 border border-border/40">
                    <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold tracking-tight mb-2">{b.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <Globe className="w-12 h-12 mx-auto mb-6 opacity-70" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Ready For A Website <span className="font-serif italic gradient-iris">That Works?</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto mb-10">
            Let's design something your dream clients can't scroll past.
          </p>
          <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
            <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
              Schedule a Strategy Call
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebDesignServices;
