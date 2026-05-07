import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Star, Globe, Bot, Code2 } from 'lucide-react';

const solutions = [
  {
    icon: Search,
    eyebrow: 'Flagship',
    title: 'Elite Contact Cards',
    pitch: 'Optimize Word-of-Mouth Referrals with Keyword Search.',
    desc: 'Premium NFC cards engineered so clients find you by what you do — not by remembering your name.',
    href: '/elite-contact-card',
    cta: 'Explore Elite Cards',
  },
  {
    icon: Star,
    eyebrow: 'Flagship',
    title: 'Elite Review Placards',
    pitch: 'Guarantee More 5-Star Reviews — On Tap.',
    desc: 'NFC-powered placards that turn happy customers into Google reviews in seconds.',
    href: '/elite-review-placards',
    cta: 'See Review Placards',
  },
  {
    icon: Globe,
    title: 'Custom Website Design + Management',
    pitch: 'Websites That Sell While You Sleep.',
    desc: 'Bespoke design, fully managed. Mobile-first, conversion-focused, always on-brand.',
    href: '/web-design',
    cta: 'View Web Design',
  },
  {
    icon: Bot,
    title: 'Custom AI Agents',
    pitch: 'Get More Done with AI Deployed Into Your Business.',
    desc: 'Purpose-built AI agents that answer leads, automate workflows, and free up your team.',
    href: '/ai-solutions',
    cta: 'Discover AI Solutions',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    pitch: 'Software, Engineered to Fit Your Business.',
    desc: 'Internal tools, customer portals, and integrations built around how your team actually works.',
    href: '/custom-software',
    cta: 'Build Custom Software',
  },
];

export const SolutionsHub = () => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 relative section-frost">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase font-medium border-border/50">
            Elite Business Solutions
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Every Tool Your Business Needs.
            <br />
            <span className="font-serif italic gradient-iris">Built To Win.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            From flagship NFC products to custom AI and software — explore the full Elite suite.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link to={s.href} className="block h-full group">
                  <Card className="liquid-glass border-0 h-full hover-lift cursor-pointer transition-all duration-500 group-hover:shadow-2xl">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                        {s.eyebrow && (
                          <Badge variant="outline" className="rounded-full px-3 py-0.5 text-[10px] tracking-widest uppercase">
                            {s.eyebrow}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold tracking-tight mb-2">{s.title}</h3>
                      <p className="text-sm font-semibold gradient-iris mb-3">{s.pitch}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{s.desc}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:gap-3 transition-all">
                        {s.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
