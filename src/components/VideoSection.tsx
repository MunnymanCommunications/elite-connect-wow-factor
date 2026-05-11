import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CROP = {
  scaleX: 1.055,
  scaleY: 1.02,
  offsetX: 0,
  offsetY: -1,
  maskBottom: 1,
  maskRight: 0,
  maskWidth: 1.5,
  maskHeight: 40,
};

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
            <video
              src="/videos/card-technology.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `translate(${CROP.offsetX}%, ${CROP.offsetY}%) scale(${CROP.scaleX}, ${CROP.scaleY})`,
                transformOrigin: 'center center',
              }}
            />
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                bottom: `${CROP.maskBottom}%`,
                right: `${CROP.maskRight}%`,
                width: `${CROP.maskWidth}%`,
                height: `${CROP.maskHeight}%`,
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
