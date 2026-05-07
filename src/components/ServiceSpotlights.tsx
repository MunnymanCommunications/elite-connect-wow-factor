import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Star, Globe, Bot, Code2, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Globe,
    eyebrow: 'Custom Website Design + Management',
    pain: 'Embarrassed by a website that doesn\'t match how good you actually are?',
    headline: 'A Website That Sells.',
    italic: 'While You Sleep.',
    promise: 'Wake up to inbound leads from a site that finally feels like you — fast, beautiful, and effortlessly converting visitors into clients. We design it, we manage it, you grow.',
    bullets: [
      'Bespoke design tailored to your brand',
      'Conversion-focused, mobile-first',
      'Fully managed — you never touch a plugin again',
    ],
    href: '/web-design',
    cta: 'Design My Website',
  },
  {
    icon: Bot,
    eyebrow: 'Custom AI Agents',
    pain: 'Drowning in repetitive tasks that steal your most valuable hours?',
    headline: 'Hire AI That Works.',
    italic: '24/7 Without Complaint.',
    promise: 'Imagine an AI teammate that answers every lead in seconds, qualifies them, and books them into your calendar — while you sleep, vacation, or focus on what only you can do.',
    bullets: [
      'Custom-trained on your business',
      'Lead capture, follow-up, and qualification',
      'Integrates with the tools you already use',
    ],
    href: '/ai-solutions',
    cta: 'Deploy My AI Agent',
  },
  {
    icon: Code2,
    eyebrow: 'Custom Software',
    pain: 'Forcing your business to fit clunky off-the-shelf software?',
    headline: 'Software That Fits.',
    italic: 'Like It Was Made For You.',
    promise: 'Stop adapting to broken tools. Get internal systems, customer portals, and integrations engineered around exactly how your team works — so growth feels effortless instead of painful.',
    bullets: [
      'Built around your workflow',
      'Scales as you grow',
      'Owned by you, not a SaaS subscription',
    ],
    href: '/custom-software',
    cta: 'Build My Software',
  },
  {
    icon: Search,
    eyebrow: 'Elite Contact Cards',
    pain: 'Tired of being forgotten the moment you leave the room?',
    headline: 'Become Unforgettable.',
    italic: 'Found On Demand.',
    promise: 'Imagine clients searching "plumber" or "realtor" months later — and your name appears at the top, even if they forgot it. That\'s the Elite advantage: the quiet confidence of knowing referrals will always find you.',
    bullets: [
      'Word-of-mouth on autopilot',
      'Premium NFC card that signals you\'re a professional',
      'Real-time updates — your card never goes stale',
    ],
    href: '/elite-contact-card',
    cta: 'Make Me Unforgettable',
  },
  {
    icon: Star,
    eyebrow: 'Elite Review Placards',
    pain: 'Hate begging happy customers for reviews — only to be ignored?',
    headline: 'More 5-Star Reviews.',
    italic: 'Without Asking Twice.',
    promise: 'Picture your Google profile filling up with glowing reviews while you focus on doing what you love. One tap is all it takes — your customers feel honored, your reputation compounds, and new buyers choose you on sight.',
    bullets: [
      'Tap-to-review NFC technology',
      'Skip the awkward "please review us" texts',
      'Outrank competitors in local search',
    ],
    href: '/elite-review-placards',
    cta: 'Get More 5-Star Reviews',
  },
];

export const ServiceSpotlights = () => {
  return (
    <section className="py-24 section-frost">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">Results-Driven Solutions</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Built To Deliver <span className="font-serif italic gradient-iris">Real Results</span>
          </h2>
          <p className="text-muted-foreground font-light">
            Every product is engineered to deliver one thing: the outcome you've been chasing.
          </p>
        </div>

        <div className="space-y-10 max-w-6xl mx-auto">
          {services.map((s, i) => {
            const Icon = s.icon;
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`liquid-glass rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <Badge variant="outline" className="rounded-full px-3 py-0.5 text-[10px] tracking-widest uppercase">
                      {s.eyebrow}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground italic mb-3">{s.pain}</p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-[1.05] mb-4">
                    {s.headline} <span className="font-serif italic gradient-iris block md:inline">{s.italic}</span>
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {s.promise}
                  </p>
                  <Button asChild size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 group">
                    <Link to={s.href}>
                      {s.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div>
                  <ul className="space-y-4">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-base">
                        <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
