import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoFullscreen } from './VideoFullscreen';

export interface VideoItem {
  id: string;
  title?: string;
  cropScale?: number;
  cropOffsetY?: number;
}

const ALL_VIDEOS: VideoItem[] = [
  { id: 'ISGCPYbF6ik', title: 'Elite Cards Introduction', cropScale: 2.2, cropOffsetY: 0 },
  { id: 'D-TUgxttuqQ', title: 'Keyword Search Demo', cropScale: 2.2, cropOffsetY: 0 },
  { id: 'vZTWlthFB2w', title: 'NFC Technology', cropScale: 2.2, cropOffsetY: 0 },
  { id: 'geJY7xxMJ44', title: 'Card Showcase', cropScale: 2.2, cropOffsetY: 0 },
  { id: '_L2s_XKCs70', title: 'Professional Networking', cropScale: 2.2, cropOffsetY: 0 },
  { id: 'JiixSNdpQcM', title: 'Client Success Story', cropScale: 2.2, cropOffsetY: 0 },
  { id: '9rQx5f9PdCU', title: 'How It Works', cropScale: 2.2, cropOffsetY: 0 },
  { id: '6jvcEP9Li0I', title: 'Getting Started', cropScale: 2.2, cropOffsetY: 0 },
  { id: 'R6WY22-h17k', title: 'Premium Features', cropScale: 2.2, cropOffsetY: 0 },
  { id: 'vp4bmg-j6MU', title: 'Real Results', cropScale: 2.2, cropOffsetY: 0 },
  { id: '02FBskxawNE', title: 'Why Elite Cards', cropScale: 2.2, cropOffsetY: 0 },
  { id: 'SfrwcL7wJe0', title: 'Customer Reviews', cropScale: 2.2, cropOffsetY: 0 },
];

// Shuffle array (Fisher-Yates)
const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Engagement tracking
interface EngagementData {
  [videoId: string]: { views: number; totalWatchTime: number; completions: number };
}

const getEngagement = (): EngagementData => {
  try {
    return JSON.parse(localStorage.getItem('elite-video-engagement') || '{}');
  } catch { return {}; }
};

const trackView = (videoId: string, watchTime: number, completed: boolean) => {
  const data = getEngagement();
  if (!data[videoId]) data[videoId] = { views: 0, totalWatchTime: 0, completions: 0 };
  data[videoId].views++;
  data[videoId].totalWatchTime += watchTime;
  if (completed) data[videoId].completions++;
  localStorage.setItem('elite-video-engagement', JSON.stringify(data));
};

const getOptimizedOrder = (): VideoItem[] => {
  const data = getEngagement();
  const first = ALL_VIDEOS[0];
  const rest = ALL_VIDEOS.slice(1);

  const totalViews = Object.values(data).reduce((s, d) => s + d.views, 0);

  // Need sufficient data (at least 20 total views) before optimizing
  if (totalViews < 20) {
    return [first, ...shuffleArray(rest)];
  }

  // Score by avg watch time and completion rate
  const scored = rest.map(v => {
    const d = data[v.id];
    if (!d || d.views === 0) return { video: v, score: 0 };
    const avgWatch = d.totalWatchTime / d.views;
    const completionRate = d.completions / d.views;
    return { video: v, score: avgWatch * 0.6 + completionRate * 100 * 0.4 };
  });

  scored.sort((a, b) => b.score - a.score);
  return [first, ...scored.map(s => s.video)];
};

// Auto-advance interval (seconds) — YouTube Shorts are typically 15-60s
const AUTO_ADVANCE_INTERVAL = 30;

export const VideoCarousel = () => {
  const [videos] = useState<VideoItem[]>(() => getOptimizedOrder());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const viewStartRef = useRef(Date.now());
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const currentVideo = videos[currentIndex];

  // Track engagement when leaving a video
  const trackCurrent = useCallback((completed: boolean) => {
    const watchTime = (Date.now() - viewStartRef.current) / 1000;
    if (watchTime > 1) {
      trackView(videos[currentIndex].id, watchTime, completed);
    }
  }, [currentIndex, videos]);

  const goTo = useCallback((index: number, dir: number) => {
    trackCurrent(false);
    const newIndex = ((index % videos.length) + videos.length) % videos.length;
    setDirection(dir);
    setCurrentIndex(newIndex);
    viewStartRef.current = Date.now();
  }, [videos.length, trackCurrent]);

  // Auto-advance
  useEffect(() => {
    if (fullscreenOpen) return;
    const timer = setInterval(() => {
      trackCurrent(true);
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % videos.length);
      viewStartRef.current = Date.now();
    }, AUTO_ADVANCE_INTERVAL * 1000);
    return () => clearInterval(timer);
  }, [currentIndex, fullscreenOpen, videos.length, trackCurrent]);

  // Touch handling for inline swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx > 0) goTo(currentIndex + 1, 1);
      else goTo(currentIndex - 1, -1);
    }
  };

  const handleClick = () => {
    setFullscreenOpen(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden liquid-glass cursor-pointer group"
        style={{ width: '100%', maxWidth: '480px', aspectRatio: '16/9' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Video */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&loop=1&playlist=${currentVideo.id}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0`}
              className="border-0 pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${currentVideo.cropScale || 2.2}) translateY(${currentVideo.cropOffsetY || 0}%)`,
                transformOrigin: 'center center',
              }}
              allow="autoplay; encrypted-media"
              title={currentVideo.title}
            />
          </motion.div>
        </AnimatePresence>

        {/* Play overlay hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="w-14 h-14 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ml-1">
              <path d="M8 5.14v14l11-7-11-7z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i, i > currentIndex ? 1 : -1);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-0.5 px-2 pt-2">
          {videos.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/20">
              {i === currentIndex && (
                <motion.div
                  className="h-full bg-white/80 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTO_ADVANCE_INTERVAL, ease: 'linear' }}
                  key={`progress-${currentIndex}`}
                />
              )}
              {i < currentIndex && <div className="h-full w-full bg-white/60" />}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen overlay */}
      <VideoFullscreen
        videos={videos}
        initialIndex={currentIndex}
        isOpen={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        onIndexChange={(i) => setCurrentIndex(i)}
      />
    </>
  );
};
