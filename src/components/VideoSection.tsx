import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// When you're happy with the crop, tell me the saved values shown in the panel
// and I'll bake them in here and remove the adjuster.
const DEFAULTS = {
  scaleX: 1.055,
  scaleY: 1.0,
  offsetX: 0, // % of container
  offsetY: 0, // % of container
  maskBottom: 6, // %
  maskRight: 22, // %
  maskWidth: 18, // %
  maskHeight: 10, // %
};

const STORAGE_KEY = 'videoSectionCrop';

export const VideoSection = () => {
  const { ref, isRevealed } = useScrollReveal();
  const [values, setValues] = useState(DEFAULTS);
  const [saved, setSaved] = useState<typeof DEFAULTS | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) };
        setValues(parsed);
        setSaved(parsed);
      }
    } catch {}
  }, []);

  const update = (k: keyof typeof DEFAULTS, v: number) =>
    setValues((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    setSaved(values);
  };

  const handleReset = () => {
    setValues(DEFAULTS);
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
  };

  const v = values;

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
                transform: `translate(${v.offsetX}%, ${v.offsetY}%) scale(${v.scaleX}, ${v.scaleY})`,
                transformOrigin: 'center center',
              }}
            />
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                bottom: `${v.maskBottom}%`,
                right: `${v.maskRight}%`,
                width: `${v.maskWidth}%`,
                height: `${v.maskHeight}%`,
                background: 'rgba(0,0,0,0.001)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderRadius: '8px',
              }}
            />
          </div>

          {/* Adjuster panel — temporary. Remove once values are baked in. */}
          <div className="liquid-glass rounded-2xl p-6 mt-8 text-left text-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold tracking-tight">Crop Adjuster (temporary)</p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-border hover:bg-secondary transition"
                >
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Slider label="Horizontal Zoom" value={v.scaleX} min={1} max={1.6} step={0.005} onChange={(n) => update('scaleX', n)} />
              <Slider label="Vertical Zoom" value={v.scaleY} min={1} max={1.6} step={0.005} onChange={(n) => update('scaleY', n)} />
              <Slider label="Offset X (%)" value={v.offsetX} min={-20} max={20} step={0.5} onChange={(n) => update('offsetX', n)} />
              <Slider label="Offset Y (%)" value={v.offsetY} min={-20} max={20} step={0.5} onChange={(n) => update('offsetY', n)} />
              <Slider label="Mask Bottom (%)" value={v.maskBottom} min={0} max={50} step={0.5} onChange={(n) => update('maskBottom', n)} />
              <Slider label="Mask Right (%)" value={v.maskRight} min={0} max={80} step={0.5} onChange={(n) => update('maskRight', n)} />
              <Slider label="Mask Width (%)" value={v.maskWidth} min={0} max={60} step={0.5} onChange={(n) => update('maskWidth', n)} />
              <Slider label="Mask Height (%)" value={v.maskHeight} min={0} max={40} step={0.5} onChange={(n) => update('maskHeight', n)} />
            </div>

            {saved && (
              <div className="mt-5 rounded-xl bg-secondary/60 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Saved values — share with Lovable to lock in:</p>
                <pre className="text-xs whitespace-pre-wrap break-all">
{JSON.stringify(saved, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) => (
  <label className="block">
    <div className="flex justify-between text-xs text-muted-foreground mb-1">
      <span>{label}</span>
      <span className="tabular-nums">{value.toFixed(3)}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full accent-foreground"
    />
  </label>
);
