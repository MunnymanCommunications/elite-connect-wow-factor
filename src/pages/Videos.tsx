import { useState, useRef, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { SEOHead } from '@/components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, ChevronUp, ChevronDown, Play } from 'lucide-react';

interface Video {
  id: string;
  url: string;
  title: string;
}

const convertYouTubeUrl = (url: string) => {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return { embed: `https://www.youtube.com/embed/${m[1]}?autoplay=1&loop=1&controls=0&modestbranding=1`, id: m[1] };
  }
  return { embed: url, id: url };
};

const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([
    { id: '1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Elite Cards Demo' },
    { id: '2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Keyword Search Feature' },
    { id: '3', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'How NFC Works' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newUrl, setNewUrl] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [showGesture, setShowGesture] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const isScrolling = useRef(false);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < videos.length && !isScrolling.current) {
      isScrolling.current = true;
      setCurrentIndex(index);
      setTimeout(() => { isScrolling.current = false; }, 600);
    }
  }, [videos.length]);

  const addVideo = () => {
    if (!newUrl.trim()) return;
    const { embed } = convertYouTubeUrl(newUrl.trim());
    setVideos(prev => [...prev, { id: Date.now().toString(), url: embed, title: `Video ${prev.length + 1}` }]);
    setNewUrl('');
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') goTo(currentIndex - 1);
      if (e.key === 'ArrowDown') goTo(currentIndex + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, goTo]);

  // Touch / wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) goTo(currentIndex + 1);
      else if (e.deltaY < -30) goTo(currentIndex - 1);
    };
    const onTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (diff > 50) goTo(currentIndex + 1);
      else if (diff < -50) goTo(currentIndex - 1);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentIndex, goTo]);

  // Hide gesture hint
  useEffect(() => {
    if (showGesture) {
      const t = setTimeout(() => setShowGesture(false), 4000);
      return () => clearTimeout(t);
    }
  }, [showGesture]);

  return (
    <div className="min-h-screen bg-foreground text-primary-foreground">
      <SEOHead title="Videos — Elite Card Pro" description="Watch Elite Card Pro demos and tutorials." canonical="/videos" />

      {/* Fullscreen Video Feed */}
      <div ref={containerRef} className="fixed inset-0 bg-foreground overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {videos[currentIndex] && (
              <div className="w-full h-full max-w-lg mx-auto relative">
                <iframe
                  src={videos[currentIndex].url + '?autoplay=1&loop=1&controls=0&modestbranding=1'}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={videos[currentIndex].title}
                />
                {/* Title Overlay */}
                <div className="absolute bottom-20 left-6 right-6">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">{videos[currentIndex].title}</h3>
                  <p className="text-sm text-white/70 mt-1">Elite Card Pro</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gesture Hint */}
        <AnimatePresence>
          {showGesture && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 pointer-events-none"
            >
              <div className="text-center text-white">
                <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ChevronUp className="w-8 h-8 mx-auto mb-2" />
                </motion.div>
                <p className="text-lg font-medium">Swipe up or down</p>
                <p className="text-sm text-white/60">to browse videos</p>
                <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ChevronDown className="w-8 h-8 mx-auto mt-2" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side Navigation Dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-white h-6' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-4 bottom-8 z-10 flex flex-col gap-2">
          <button onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition-colors">
            <ChevronUp className="w-5 h-5" />
          </button>
          <button onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === videos.length - 1}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition-colors">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Back to Site */}
        <div className="absolute top-6 left-6 z-10">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 rounded-full">
            <a href="/">← Back</a>
          </Button>
        </div>

        {/* Admin Toggle */}
        <div className="absolute top-6 right-6 z-10">
          <button onClick={() => setShowAdmin(!showAdmin)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Panel */}
        <AnimatePresence>
          {showAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 right-6 z-20 w-80 liquid-glass-dark rounded-2xl p-4"
            >
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Paste YouTube URL..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addVideo()}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl"
                />
                <Button onClick={addVideo} size="icon" className="bg-white/20 hover:bg-white/30 rounded-xl">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {videos.map((v, i) => (
                  <div key={v.id} className="flex items-center justify-between text-sm text-white/80">
                    <span className="truncate">{v.title}</span>
                    <button onClick={() => setVideos(prev => prev.filter(x => x.id !== v.id))} className="text-white/40 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute bottom-8 left-6 z-10 text-sm text-white/60">
          {currentIndex + 1} / {videos.length}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
