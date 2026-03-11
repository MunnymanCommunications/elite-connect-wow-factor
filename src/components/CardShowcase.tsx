import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const cardDesigns = [
  {
    name: 'Midnight Edition',
    description: 'Matte black card with monochrome black ink. Our most popular choice.',
    gradient: 'from-gray-900 via-gray-800 to-black',
    textColor: 'text-gray-400',
    popular: true,
  },
  {
    name: 'Reflective Gold',
    description: 'Matte white or black card printed in reflective gold finish.',
    gradient: 'from-amber-600 via-yellow-500 to-amber-400',
    textColor: 'text-amber-900',
    popular: false,
  },
  {
    name: 'Classic White',
    description: 'Matte white card with your logo printed in full color.',
    gradient: 'from-gray-100 via-white to-gray-50',
    textColor: 'text-gray-600',
    popular: false,
  },
  {
    name: 'Custom Photo',
    description: 'Your photos printed edge-to-edge across the entire card.',
    gradient: 'from-blue-400 via-purple-400 to-pink-400',
    textColor: 'text-white',
    popular: false,
  },
];

export const CardShowcase = () => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section ref={ref} className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase font-medium">
            Card Designs
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Choose Your
            <br />
            <span className="font-serif italic gradient-gold">Signature Look</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Premium materials. Unforgettable first impressions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cardDesigns.map((card, index) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="relative hover-lift">
                {card.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="gradient-gold-bg text-foreground border-0 text-xs">Most Popular</Badge>
                  </div>
                )}
                {/* Card Preview */}
                <div className={`aspect-[1.6/1] rounded-2xl bg-gradient-to-br ${card.gradient} p-6 flex flex-col justify-between shadow-lg group-hover:shadow-2xl transition-shadow duration-500`}>
                  <div className="flex justify-between items-start">
                    <div className={`text-xs font-bold tracking-widest uppercase ${card.textColor}`}>Elite</div>
                    <div className={`w-6 h-6 rounded-full border ${card.textColor} border-current opacity-50`} />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${card.textColor}`}>{card.name}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button asChild variant="outline" className="rounded-full px-8 group">
            <Link to="/elite-contact-card">
              Explore All Options
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
