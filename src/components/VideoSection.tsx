import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VideoSection = () => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 section-frost">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
            See Elite Cards
            <br />
            <span className="font-serif italic gradient-iris">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light mb-10">
            Watch real professionals demonstrate the power of Elite Contact Cards in our immersive video experience.
          </p>
          <Button asChild size="lg" className="rounded-full px-10 py-6 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 group">
            <Link to="/videos">
              Watch Videos
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
