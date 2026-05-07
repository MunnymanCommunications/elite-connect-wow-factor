import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Star,
  Shield,
  Mail,
  Filter,
  Smartphone,
  Link2,
  Sparkles,
  Check,
  TrendingUp,
} from 'lucide-react';
import boissonPlacard from '@/assets/review-placards/boisson-placard.jpg';
import elitePlacardSips from '@/assets/review-placards/elite-placard-sips.jpg';
import elitePlacardAndDad from '@/assets/review-placards/elite-placard-and-dad.jpg';
import appleBagelDemo from '@/assets/review-placards/apple-bagel-demo.png';
import appleBagel from '@/assets/review-placards/apple-bagel.jpg';
import boissonPlacard2 from '@/assets/review-placards/boisson-placard-2.jpg';
import highQualitySips from '@/assets/review-placards/high-quality-pics-sips.png';

const FiveStars = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <div className="inline-flex items-center gap-1" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className={`${className} text-amber-500 fill-amber-500`} />
    ))}
  </div>
);

const gallery = [
  { src: elitePlacardSips, alt: 'Elite Review Placard at Sips coffee shop' },
  { src: boissonPlacard, alt: 'Elite Review Placard at Boisson' },
  { src: appleBagel, alt: 'Apple Bagel storefront with Elite Review Placard' },
  { src: highQualitySips, alt: 'High quality Elite Review Placard close-up' },
  { src: boissonPlacard2, alt: 'Elite Review Placard counter display' },
  { src: elitePlacardAndDad, alt: 'Elite Review Placard with happy customer' },
];

const steps = [
  { step: '01', title: 'Deliver Service', desc: 'Provide an excellent experience for your client.' },
  { step: '02', title: 'Hover Phone', desc: 'Client hovers their phone over the Elite Review Placard.' },
  { step: '03', title: 'Click 5 Stars', desc: 'Client is directed straight to your Google 5-star review page.' },
  { step: '04', title: 'Rank Higher', desc: 'Watch your search visibility and ranking skyrocket.' },
];

const included = [
  'NFC easy-tap technology built in',
  'Cards & placards customized with your logo',
  '2 QR-code stickers for added usability',
  'Unlimited scans, every year',
  'Free replacements if lost or damaged',
  '24/7 customer support',
  'New custom placards sent every 6 months',
  'Free shipping nationwide',
];

const outcomes = [
  'More 5-star reviews than ever before',
  'Clients happily leave reviews — the process is seamless',
  'Anyone with a smartphone can do it',
  'Perfect for businesses with older clientele',
  'Professional placards & free replacements ensure top quality',
];

const proFlow = [
  { icon: Smartphone, title: 'Tap or Click', desc: 'Customer taps your placard or opens your Elite Review Pro link.' },
  { icon: Filter, title: 'Smart Sort', desc: 'They land on your branded review page and choose their star rating.' },
  { icon: Star, title: '5 Stars → Google', desc: 'A 5-star rating sends them straight to your Google review page.' },
  { icon: Mail, title: '4 Stars or Less → You', desc: 'Lower ratings stay on the buffer page and email feedback to you privately.' },
];

const tiers = [
  {
    name: 'Elite Review Placard',
    price: '$149.95',
    cadence: '/year',
    altPrice: 'or $14.99/month',
    tagline: 'The original NFC review placard.',
    features: [
      '2 custom-branded placards / year',
      '2 QR-code stickers',
      'NFC easy-tap technology',
      'Unlimited scans',
      'Free replacements',
      '24/7 support',
    ],
    highlight: false,
    cta: 'Get Your Placard',
  },
  {
    name: 'Elite Review Pro',
    price: '$200',
    cadence: '/year',
    altPrice: 'Guarantees 5-star reviews',
    tagline: 'Placard + smart review filtering platform.',
    features: [
      'Everything in the Placard plan',
      'Elite Review Pro smart link',
      '5-star reviews routed to Google',
      '≤4-star feedback emailed privately to you',
      'Branded buffer review page',
      'Account dashboard access',
    ],
    highlight: true,
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Elite Review Pro — Digital',
    price: '$129.95',
    cadence: '/year',
    altPrice: 'Link only — no placard',
    tagline: 'The Pro link, fully digital.',
    features: [
      'Elite Review Pro smart link',
      '5-star → Google routing',
      'Negative feedback captured privately',
      'Branded review landing page',
      'Share by SMS, email, QR or socials',
      'Account dashboard access',
    ],
    highlight: false,
    cta: 'Get the Digital Plan',
  },
];

const EliteReviewPlacards = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Elite Review Placards & Elite Review Pro | Elite Card Pro"
      description="NFC tap placards and a smart review platform that routes 5-star reviews to Google and sends lower ratings privately to you. Plans from $129.95/year."
      canonical="/elite-review-placards"
    />
    <Navbar />

    {/* HERO */}
    <section className="pt-32 pb-20 mesh-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase">
            Reputation Management
          </Badge>
          <div className="flex justify-center mb-6">
            <FiveStars className="w-6 h-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            5-Star Google Reviews
            <br />
            <span className="font-serif italic gradient-iris">on Autopilot</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6">
            Happy customers forget to leave reviews. Unhappy ones don't. Elite Review Placards and the
            Elite Review Pro platform fix that — with a single tap.
          </p>
          <p className="text-base text-muted-foreground/80 max-w-xl mx-auto mb-10">
            Free shipping · Unlimited card shares · Free replacements · New custom cards every 6 months
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="rounded-full px-10 py-6 bg-foreground text-background hover:bg-foreground/90 group">
              <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-10 py-6">
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* PROBLEM */}
    <section className="py-24">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <Badge variant="outline" className="mb-4 rounded-full">The Problem</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            Your happiest clients <span className="font-serif italic gradient-iris">never leave reviews.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            "We have happy customers leaving every day, but the only people who take the time to find us on
            Google and leave a review are the unhappy few."
          </p>
          <p className="mt-3 text-sm font-medium text-muted-foreground">— Gentle Dental</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <Card className="liquid-glass border-0">
            <CardContent className="p-8">
              <FiveStars className="w-7 h-7 mb-4" />
              <h3 className="text-2xl font-bold mb-3">The Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                We make leaving a 5-star review effortless — a single NFC tap or shared link routes happy
                customers straight to your Google review page, while quietly intercepting unhappy feedback
                before it ever gets there.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>

    {/* VIDEO */}
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4 rounded-full">See It In Action</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            Watch the Elite Review <span className="font-serif italic gradient-iris">Placard</span> at work
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-foreground/10 aspect-video bg-black"
        >
          <iframe
            src="https://www.youtube.com/embed/U_meF5GwkSI"
            title="Elite Review Placard — Google Review Placard / easy reviews"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>

    {/* HOW IT WORKS — PLACARD */}
    <section className="py-24 mesh-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4 rounded-full">How It Works</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            4 simple <span className="font-serif italic gradient-iris">steps</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
              <Card className="liquid-glass border-0 h-full hover-lift text-center">
                <CardContent className="p-8">
                  <div className="text-5xl font-black gradient-iris mb-4">{s.step}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* WHAT'S INCLUDED + OUTCOMES */}
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10">
          <Card className="liquid-glass border-0">
            <CardContent className="p-10">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6">What you receive</h3>
              <ul className="space-y-3">
                {included.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="liquid-glass border-0">
            <CardContent className="p-10">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Which means</h3>
              <ul className="space-y-3">
                {outcomes.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-muted-foreground">
                    <TrendingUp className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* ELITE REVIEW PRO */}
    <section
      className="py-28"
      style={{ background: 'linear-gradient(90deg, #f7f4d5, #f1d3ee)' }}
    >
      <div className="container mx-auto px-6 max-w-6xl text-foreground">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Badge className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase bg-foreground text-background">
            New · Elite Review Pro
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Guarantee 5-star reviews. <span className="font-serif italic">Quietly fix the rest.</span>
          </h2>
          <p className="text-lg text-foreground/70 font-light">
            Elite Review Pro adds a smart review-routing platform on top of your placard. Happy customers
            head straight to Google. Unhappy ones reach <em>you</em> — not the public.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {proFlow.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
              >
                <div className="rounded-2xl bg-white/60 backdrop-blur p-6 h-full ring-1 ring-foreground/10">
                  <div className="w-11 h-11 rounded-xl bg-foreground text-background flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold mb-1">{p.title}</h3>
                  <p className="text-sm text-foreground/70">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl bg-white/50 backdrop-blur p-5 ring-1 ring-foreground/10 flex items-start gap-3">
            <Shield className="w-5 h-5 mt-0.5" />
            <span>Protect your public rating with a private feedback loop.</span>
          </div>
          <div className="rounded-xl bg-white/50 backdrop-blur p-5 ring-1 ring-foreground/10 flex items-start gap-3">
            <Link2 className="w-5 h-5 mt-0.5" />
            <span>Share your Pro link by SMS, email, QR, or social bio.</span>
          </div>
          <div className="rounded-xl bg-white/50 backdrop-blur p-5 ring-1 ring-foreground/10 flex items-start gap-3">
            <Sparkles className="w-5 h-5 mt-0.5" />
            <span>Available with a placard or as a fully digital plan.</span>
          </div>
        </div>
      </div>
    </section>

    {/* PRICING */}
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4 rounded-full">Pricing</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            Choose your <span className="font-serif italic gradient-iris">plan</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full border-0 hover-lift ${
                  tier.highlight
                    ? 'bg-foreground text-background ring-2 ring-foreground'
                    : 'liquid-glass'
                }`}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {tier.highlight && (
                    <Badge className="mb-4 self-start bg-background text-foreground rounded-full">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="text-2xl font-black tracking-tight mb-1">{tier.name}</h3>
                  <p className={`text-sm mb-6 ${tier.highlight ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {tier.tagline}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                    <span className={`${tier.highlight ? 'text-background/70' : 'text-muted-foreground'}`}>
                      {tier.cadence}
                    </span>
                  </div>
                  <p className={`text-xs mb-8 ${tier.highlight ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {tier.altPrice}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-background' : 'text-foreground'}`} />
                        <span className={tier.highlight ? 'text-background/90' : 'text-muted-foreground'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className={`rounded-full w-full ${
                      tier.highlight
                        ? 'bg-background text-foreground hover:bg-background/90'
                        : 'bg-foreground text-background hover:bg-foreground/90'
                    }`}
                  >
                    <a href="https://calendly.com/elitecardpro" target="_blank" rel="noopener noreferrer">
                      {tier.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* GALLERY */}
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4 rounded-full">In the Wild</Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Businesses that <span className="font-serif italic gradient-iris">succeed</span> with us
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Their success is the fuel that drives us. Here are a few of the places already turning taps into 5-star reviews.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden ring-1 ring-foreground/10 aspect-square bg-muted"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <img src={appleBagelDemo} alt="Elite Review Placard demo with Apple Bagel" loading="lazy" className="rounded-2xl ring-1 ring-foreground/10 w-full object-cover" />
          <img src={elitePlacardAndDad} alt="Customer using Elite Review Placard" loading="lazy" className="rounded-2xl ring-1 ring-foreground/10 w-full object-cover" />
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="py-24 mesh-section text-center">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-6">
          <FiveStars className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
          More 5-star reviews. <span className="gradient-iris">Higher rankings.</span>
        </h2>
        <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto mb-10">
          Trusted by dental offices, restaurants, and service professionals to transform their online
          reputation — without lifting a finger.
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
