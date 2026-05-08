import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Bot, MessageSquare, BarChart3, Sparkles,
  Workflow, Mail, FileText, Calendar, PhoneCall, Search,
  ImageIcon, ExternalLink, Brain,
} from 'lucide-react';

const pillars = [
  { icon: Brain, title: 'Trained On You', desc: 'Agents that know your business, your voice, your products — not generic chatbots.' },
  { icon: Workflow, title: 'Action-Taking', desc: 'AI that actually does things — books meetings, sends emails, updates records, closes loops.' },
  { icon: Sparkles, title: 'Embedded Anywhere', desc: 'Drop into your website, your CRM, your phone line, your Slack — wherever your team works.' },
  { icon: BarChart3, title: 'Measurable Lift', desc: 'Every conversation tracked. Every action logged. Real ROI, not vibes.' },
];

const automations = [
  { icon: MessageSquare, title: 'Custom AI Liaisons', desc: '24/7 site-trained agents that answer questions, qualify leads, and route hot prospects to your inbox.' },
  { icon: PhoneCall, title: 'AI Voice Receptionists', desc: 'Inbound calls answered, screened, and booked — in your brand voice, around the clock.' },
  { icon: Mail, title: 'Email Drip & Reply Bots', desc: 'Personalized nurture sequences and inbox-aware replies that move leads down the pipeline on autopilot.' },
  { icon: Calendar, title: 'Smart Scheduling Agents', desc: 'Conversational booking — leads pick a time without ever leaving the chat.' },
  { icon: FileText, title: 'Daily SEO Blog Agent', desc: 'A fresh, keyword-targeted blog post published to your site every single day.' },
  { icon: Search, title: 'Internal Knowledge Agents', desc: 'Train AI on your SOPs, contracts, and docs — your whole team gets instant answers.' },
];

const process = [
  { step: '01', title: 'Audit', desc: 'We map the workflows where AI saves real hours and unlocks real revenue.' },
  { step: '02', title: 'Train', desc: 'We feed your data, brand voice, and SOPs into a custom-tuned agent.' },
  { step: '03', title: 'Integrate', desc: 'Plug into your website, CRM, calendar, phone — wherever the work happens.' },
  { step: '04', title: 'Optimize', desc: 'Continuous tuning based on real conversations, real conversions, real outcomes.' },
];

const portfolio = [
  {
    icon: MessageSquare,
    name: 'Site-Trained Sales Liaison',
    tag: 'Service Business',
    desc: 'A custom-trained chat agent embedded on a service website — qualifies leads, answers product questions, and routes hot prospects directly to the owner\'s inbox.',
    url: '#',
  },
  {
    icon: Mail,
    name: 'Automated Email Drip Engine',
    tag: 'CRM Integration',
    desc: 'Behavior-triggered, AI-personalized email sequences integrated with a custom CRM — every lead gets the right message at the right moment.',
    url: '#',
  },
  {
    icon: Workflow,
    name: 'In-Platform AI Action Agent',
    tag: 'Operations Software',
    desc: 'Built into a custom cleaning-company platform — the AI takes real actions inside the software (assignments, checklists, scheduling) on behalf of the team.',
    url: '#',
  },
  {
    icon: FileText,
    name: 'Daily SEO Blog Publisher',
    tag: 'Content Automation',
    desc: 'An AI agent that publishes a fresh, SEO-optimized blog to client websites every single day — with proven lift in search visibility and organic traffic.',
    url: '#',
  },
];

const AISolutions = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="AI Automations — Custom AI Agents & Workflow Automation | Elite Card Pro"
      description="Custom-trained AI agents and end-to-end automations — site liaisons, voice receptionists, email drip engines, and in-platform action agents built around your business."
      canonical="/ai-solutions"
    />
    <Navbar />

    <section className="pt-32 pb-20 mesh-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">AI Automations</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.05]">
            AI That Doesn't
            <br />
            <span className="font-serif italic gradient-iris">Just Talk. It Works.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
            Custom-trained agents and end-to-end automations that book meetings, answer leads, and run the busy work — so your team can focus on the high-value moments.
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
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Why Elite Card Pro AI</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Not Another Chatbot. <span className="font-serif italic gradient-iris">A Real Operator.</span>
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
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">What We Build</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Automations That <span className="font-serif italic gradient-iris">Run The Day For You</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {automations.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="liquid-glass border-0 h-full hover-lift">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="py-24 section-frost">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">The Process</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            From Idea To <span className="font-serif italic gradient-iris">Live Agent</span>
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

    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Recent Builds</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            AI We've <span className="font-serif italic gradient-iris">Designed & Deployed</span>
          </h2>
          <p className="text-muted-foreground font-light">
            A few of the agents and automations live in the wild — running 24/7 for our partners.
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

    <section className="py-24 section-frost">
      <div className="container mx-auto px-6 text-center">
        <Bot className="w-12 h-12 mx-auto mb-6 opacity-70" />
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
          Ready To Put AI <span className="font-serif italic gradient-iris">To Work?</span>
        </h2>
        <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto mb-10">
          Let's design the agent that runs the busy work — so you can focus on the moments that matter.
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

export default AISolutions;
