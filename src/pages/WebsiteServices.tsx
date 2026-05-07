import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Globe,
  Server,
  Wrench,
  CalendarCheck,
  MessageCircle,
  Bot,
  TrendingUp,
  Sparkles,
  ImageIcon,
  ExternalLink,
} from 'lucide-react';

const pillars = [
  {
    icon: Globe,
    title: 'Custom Website Creation',
    desc: 'Conversion-focused websites designed around your brand, your customers, and the actions that grow your business.',
  },
  {
    icon: Server,
    title: 'Hosting That Just Works',
    desc: 'Fast, secure, monitored hosting handled for you. No plugins to update, no servers to babysit.',
  },
  {
    icon: Wrench,
    title: 'Ongoing Management',
    desc: 'We treat your site like a living asset — copy tweaks, new sections, and seasonal updates handled by our team.',
  },
];

const projects = [
  {
    name: 'Client Project One',
    summary:
      'Full website redesign with online booking, lead capture, and a refreshed brand system that increased inbound inquiries.',
    tags: ['Redesign', 'Booking', 'SEO'],
    href: '#',
  },
  {
    name: 'Client Project Two',
    summary:
      'E-commerce experience with custom product configurator, integrated payments, and automated order notifications.',
    tags: ['E-commerce', 'Payments', 'Automation'],
    href: '#',
  },
  {
    name: 'Client Project Three',
    summary:
      'Service business platform with location pages, review integration, and a content engine ranking for local keywords.',
    tags: ['Local SEO', 'Reviews', 'Content'],
    href: '#',
  },
  {
    name: 'Client Project Four',
    summary:
      'Membership site with gated content, member dashboard, and Stripe-powered recurring billing.',
    tags: ['Membership', 'Stripe', 'Dashboard'],
    href: '#',
  },
  {
    name: 'Client Project Five',
    summary:
      'Personal brand site with podcast hub, newsletter capture, and a media kit page for partnership inquiries.',
    tags: ['Personal Brand', 'Media', 'Newsletter'],
    href: '#',
  },
  {
    name: 'Client Project Six',
    summary:
      'Restaurant site with menu management, reservation flow, and event landing pages tied to email marketing.',
    tags: ['Hospitality', 'Reservations', 'Email'],
    href: '#',
  },
];

const partnership = [
  {
    icon: CalendarCheck,
    title: 'Quarterly Strategy Meetings',
    desc: 'Every quarter we sit down with you, review performance, and map the next set of website moves to your business goals.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Line of Communication',
    desc: 'No support tickets, no waiting on hold. You message us directly and changes get implemented quickly.',
  },
];

const WebsiteServices = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Website Creation, Hosting & Management | Elite Card Pro"
      description="Custom website design, managed hosting, ongoing updates, quarterly strategy meetings, and an optional AI blog agent that publishes SEO content daily."
      canonical="/website-services"
    />
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 mesh-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">
            Websites · Hosting · Management
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Websites that
            <br />
            <span className="font-serif italic gradient-iris">work for you.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
            We design, host, and continuously improve websites for businesses that want a real partner — not another agency that disappears after launch.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
              <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                Book a Strategy Call
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-10 py-6">
              <a href="#projects">See Our Work</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Pillars */}
    <section className="py-24 section-frost">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            What We <span className="font-serif italic gradient-iris">Do</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            One team. Three things we do exceptionally well.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="liquid-glass border-0 h-full hover-lift">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-foreground" />
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

    {/* Projects */}
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs tracking-widest uppercase">
            Recent Work
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Websites We've <span className="font-serif italic gradient-iris">Built</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            A look at a few client sites. Image placeholders below — we'll swap in screenshots and live links.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="liquid-glass border-0 h-full hover-lift overflow-hidden flex flex-col">
                {/* Image placeholder */}
                <div className="aspect-[16/10] bg-gradient-to-br from-secondary/60 to-secondary/20 flex items-center justify-center border-b border-border/30">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
                    <span className="text-xs uppercase tracking-widest">Screenshot Placeholder</span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold tracking-tight mb-2">{proj.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{proj.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full text-xs font-medium">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="rounded-full w-full group">
                    <a href={proj.href} target="_blank" rel="noopener noreferrer">
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

    {/* Partnership */}
    <section className="py-24 section-frost">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs tracking-widest uppercase">
            How We Work Together
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            A real <span className="font-serif italic gradient-iris">partnership</span>.
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Your website is never "done" — and neither is our relationship with you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {partnership.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="liquid-glass border-0 h-full hover-lift">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* AI Blog Agent Add-On */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs tracking-widest uppercase">
              Optional Add-On
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-5">
              AI Blog Agent. <br />
              <span className="font-serif italic gradient-iris">SEO on autopilot.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light mb-6 leading-relaxed">
              Add our AI Blog Agent to any website plan and we'll publish a fully SEO-optimized blog post directly to your site every single day — automatically.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { icon: Sparkles, text: 'Daily AI-written posts tuned to your industry and target keywords' },
                { icon: Bot, text: 'Auto-published directly to your website — no manual uploads' },
                { icon: TrendingUp, text: 'Proven metrics showing measurable lifts in search visibility' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed pt-1.5">{item.text}</span>
                  </li>
                );
              })}
            </ul>
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-foreground text-background hover:bg-foreground/90 group">
              <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                Add the AI Blog Agent
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="liquid-glass rounded-3xl p-3">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-secondary/60 to-secondary/20 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="w-12 h-12 mb-3 opacity-40" />
                <span className="text-xs uppercase tracking-widest">AI Blog Agent Image — Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 mesh-section text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
          Ready for a website that <span className="font-serif italic gradient-iris">earns its keep?</span>
        </h2>
        <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto mb-10">
          Let's talk about what your business needs and how we can build it together.
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

export default WebsiteServices;
