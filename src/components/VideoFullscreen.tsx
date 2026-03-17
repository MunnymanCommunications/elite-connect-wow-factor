import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import type { VideoItem } from './VideoCarousel';

interface Props {
  videos: VideoItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const VideoFullscreen = ({ videos, initialIndex, isOpen, onClose, onIndexChange }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setShowHint(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, initialIndex]);

  // Hide hint after 3s
  useEffect(() => {
    if (showHint && isOpen) {
      const t = setTimeout(() => setShowHint(false), 3500);
      return () => clearTimeout(t);
    }
  }, [showHint, isOpen]);

  const goTo = useCallback((index: number, dir: number) => {
    const newIndex = ((index % videos.length) + videos.length) % videos.length;
    setDirection(dir);
    setCurrentIndex(newIndex);
    onIndexChange(newIndex);
  }, [videos.length, onIndexChange]);

  // Keyboard
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goTo(currentIndex - 1, -1);
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(currentIndex + 1, 1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, currentIndex, goTo, onClose]);

  // Wheel
  useEffect(() => {
    if (!isOpen) return;
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 600) return;
      lastWheel = now;
      if (e.deltaY > 30) goTo(currentIndex + 1, 1);
      else if (e.deltaY < -30) goTo(currentIndex - 1, -1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [isOpen, currentIndex, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe → close
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      onClose();
      return;
    }
    // Vertical swipe → navigate
    if (Math.abs(dy) > 50) {
      if (dy > 0) goTo(currentIndex + 1, 1);
      else goTo(currentIndex - 1, -1);
    }
  };

  const video = videos[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.9 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.9 }),
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100]"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white/70"
          />

          {/* Video area */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-lg mx-auto"
                style={{ aspectRatio: '9/16', maxHeight: '85vh' }}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=1&modestbranding=1&playsinline=1&rel=0`}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={video.title}
                  />
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-lg font-semibold drop-shadow-lg"
                  >
                    {video.title}
                  </motion.p>
                  <p className="text-white/50 text-sm mt-1">Elite Card Pro</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </motion.button>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 right-6 z-20 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-white/70 text-sm"
            >
              {currentIndex + 1} / {videos.length}
            </motion.div>

            {/* Side dots */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                  className={`w-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'h-6 bg-white' : 'h-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="absolute right-4 bottom-8 z-20 flex flex-col gap-2">
              <button
                onClick={() => goTo(currentIndex - 1, -1)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(currentIndex + 1, 1)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Gesture hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="text-center"
                >
                  {/* Animated gesture indicator */}
                  <div className="relative w-20 h-32 mx-auto mb-4">
                    {/* Vertical swipe lines */}
                    <motion.div
                      animate={{ y: [-15, 15, -15] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-x-0 top-0 flex flex-col items-center"
                    >
                      <ChevronUp className="w-6 h-6 text-white/80" />
                      <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center mt-1">
                        <motion.div
                          animate={{ y: [0, 8, -8, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-3 h-3 rounded-full bg-white/60"
                        />
                      </div>
                      <ChevronDown className="w-6 h-6 text-white/80 mt-1" />
                    </motion.div>
                  </div>
                  <p className="text-white text-base font-semibold tracking-wide">
                    Swipe up or down
                  </p>
                  <p className="text-white/50 text-sm mt-1">
                    Swipe sideways to exit
                  </p>

                  {/* Scanning line effect */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-40 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(130,170,255,0.6), transparent)',
                    }}
                    animate={{ y: [-60, 60, -60] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
