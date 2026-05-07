import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface CardDesignEmbedProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
}

export const CardDesignEmbed = ({
  eyebrow = 'Interactive Preview',
  title,
  subtitle = 'Tap, flip, and explore your future Elite Card.',
}: CardDesignEmbedProps) => {
  return (
    <section
      className="py-24 text-foreground"
      style={{ background: 'linear-gradient(90deg, #f7f4d5, #f1d3ee)' }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase font-medium border-foreground/20 text-foreground/80 bg-white/40 backdrop-blur">
            {eyebrow}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            {title ?? (
              <>
                Experience Your <span className="font-serif italic gradient-iris">Elite Card</span>
              </>
            )}
          </h2>
          <p className="text-base md:text-lg text-foreground/70 font-light">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-foreground/10 bg-white/40 backdrop-blur"
        >
          <iframe
            src={`https://munnymancommunications.com/Gen2/webdisplay/mockcardD_locked.html?v=${Date.now()}`}
            width="100%"
            height="600"
            style={{ border: 'none' }}
            title="Elite Card Interactive Preview"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};
