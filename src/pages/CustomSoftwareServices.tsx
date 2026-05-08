import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Code2, Workflow, Users, Sparkles, Shield, Zap,
  Mail, Home, Camera, Map, ImageIcon, ExternalLink,
} from 'lucide-react';

const pillars = [
  { icon: Sparkles, title: 'Built Around You', desc: 'Software shaped to your workflow — not a SaaS your team has to bend around.' },
  { icon: Workflow, title: 'AI-Native', desc: 'Intelligent agents baked in from day one — taking real actions inside your platform.' },
  { icon: Shield, title: 'Owned, Not Rented', desc: 'You own the code, the data, and the roadmap. No per-seat traps. No surprise pricing.' },
  { icon: Zap, title: 'Ships Fast', desc: 'Tight feedback loops and rapid iteration — usable software in weeks, not quarters.' },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We map your workflow, your team, and the bottlenecks costing you hours every week.' },
  { step: '02', title: 'Architecture', desc: 'A scoped blueprint — features, integrations, AI agents, and a clear timeline.' },
  { step: '03', title: 'Build & Iterate', desc: 'Weekly demos, real feedback, real progress. You see it grow with you.' },
  { step: '04', title: 'Launch & Evolve', desc: 'We launch, train your team, and continue evolving the platform as you scale.' },
];

const portfolio = [
  {
    icon: Mail,
    name: 'CRM + Scheduled Email Drip Campaigns',
    tag: 'CRM Platform',
    desc: 'A custom CRM with built-in scheduled email drip campaigns — pipeline tracking, automated nurture sequences, and conversion analytics in one platform.',
    url: '#',
  },
  {
    icon: Home,
    name: 'Custom Cleaning Company Software',
    tag: 'Operations Platform',
    desc: 'End-to-end software to manage homes, cleaning checklists, employees, and job details — with an AI agent that takes actions inside the platform on the team\'s behalf.',
    url: '#',
  },
  {
    icon: Camera,
    name: 'AI Camera Placement Tool',
    tag: 'Security Industry',
    desc: 'Built for a security company — type in any address, pull a satellite view, and get AI-recommended camera placements and camera-type suggestions for the property.',
    url: '#',
  },
  {
    icon: Map,
    name: 'AI Route Optimizer — Hunterpump Islands',
    tag: 'Logistics & Field Service',
    desc: 'A custom routing platform that builds maps with every stop, calculates per-route mileage and drive time, and re-orders stops with one click using an AI optimize-route engine.',
    url: '#',
  },
];

const CustomSoftwareServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Custom Software Development & AI Integration | Elite Card Pro"
        description="Bespoke software built around your workflow — CRMs, operations platforms, AI agents, and route optimizers. Owned, AI-native, and shipped fast."
        canonical="/custom-software"
      />
      <Navbar />

      <section className="pt-32 pb-20 mesh-section">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Custom Software Development</Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.05]">
              Software That Works
              <br />
              <span className="font-serif italic gradient-iris">The Way You Do.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
              Bespoke platforms, internal tools, and AI agents — engineered around your team, your data, and the way your business actually runs.
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

      <section className="py-24 section-frost">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Why Custom</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Off-The-Shelf Stops Where <span className="font-serif italic gradient-iris">You Begin.</span>
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

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">The Process</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              From Whiteboard To <span className="font-serif italic gradient-iris">Shipped Product</span>
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

      <section id="portfolio" className="py-24 section-frost">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Recent Builds</Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Software We've <span className="font-serif italic gradient-iris">Designed & Shipped</span>
            </h2>
            <p className="text-muted-foreground font-light">
              A few of the platforms we've architected, launched, and continue to evolve with our partners.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {portfolio.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="liquid-glass border-0 h-full hover-lift overflow-hidden">
                    <div className="aspect-video bg-secondary/60 flex items-center justify-center border-b border-border/40">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <ImageIcon className="w-10 h-10 mb-2 opacity-60" />
                        <span className="text-xs tracking-widest uppercase">Screenshot Placeholder</span>
                      </div>
                    </div>
                    <CardContent className="p-7">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge variant="outline" className="rounded-full px-3 py-0.5 text-[10px] tracking-widest uppercase">
                          {p.tag}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight mb-2">{p.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                      <Button asChild size="sm" variant="outline" className="rounded-full group">
                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                          View Case Study
                          <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="liquid-glass border-0 h-full hover-lift">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/80 flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">
                    A True <span className="font-serif italic gradient-iris">Engineering Partner</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Direct access to the team building your product — no account managers, no ticket queues. Just a fast, trusted line to the people who know your codebase inside and out.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="liquid-glass border-0 h-full hover-lift">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/80 flex items-center justify-center mb-6">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">
                    You Own The <span className="font-serif italic gradient-iris">Whole Stack</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Code, data, infrastructure — yours. We build on modern, portable foundations so you're never locked into a vendor or a price hike.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 section-frost">
        <div className="container mx-auto px-6 text-center">
          <Code2 className="w-12 h-12 mx-auto mb-6 opacity-70" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Have An Idea? <span className="font-serif italic gradient-iris">Let's Build It.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto mb-10">
            Bring us the workflow, the friction, the dream — we'll bring the architecture.
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

export default CustomSoftwareServices;
