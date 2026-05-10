import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const VideoSection = () => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 section-frost">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-10">
            Technology Inside Our
            <br />
            <span className="font-serif italic gradient-iris">Cards and Placards</span>
          </h2>

          <div className="relative mx-auto rounded-3xl overflow-hidden liquid-glass shadow-2xl aspect-video">
            {/* Crop edges via scaled video */}
            <video
              src="/videos/card-technology.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-110"
            />
            {/* Mask the "Project" watermark in the bottom-middle-right */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                bottom: '6%',
                right: '22%',
                width: '18%',
                height: '10%',
                background: 'rgba(0,0,0,0.001)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderRadius: '8px',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
