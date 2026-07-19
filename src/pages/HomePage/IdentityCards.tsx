import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { MOCK_IDENTITIES, type IIdentity } from '@/data/services';
import { cn } from '@/lib/utils';

interface IdentityCardsProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const HOVER_DELAY = 800;

export default function IdentityCards({ selectedId, onSelect }: IdentityCardsProps) {
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredId(id);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      onSelect(id);
    }, HOVER_DELAY);
  }, [onSelect]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const handleClick = (identity: IIdentity) => {
    onSelect(identity.id);
    const el = document.querySelector(identity.anchor);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {MOCK_IDENTITIES.map((identity, index) => {
        const isActive = selectedId === identity.id;
        const isHovered = hoveredId === identity.id;
        return (
          <motion.div
            key={identity.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            onMouseEnter={() => handleMouseEnter(identity.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(identity)}
            className={cn(
              'relative group cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden',
              'hover:shadow-lg hover:shadow-primary/10',
              isActive
                ? 'border-primary/50 bg-gradient-to-br from-primary/10 via-card to-card shadow-md shadow-primary/10'
                : 'border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/30'
            )}
          >
            {/* Active indicator line */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="identity-active-bar"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            <div className="p-4 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{identity.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm leading-tight">{identity.title}</h3>
                  <p className="text-xs text-muted-foreground">{identity.subtitle}</p>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="shrink-0 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                  >
                    <Sparkles className="size-3" />
                  </motion.div>
                )}
              </div>

              {/* Expanded pain points - show on hover or active */}
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="pt-2 space-y-1">
                      {identity.painPoints.slice(0, 3).map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + i * 0.05 }}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span className="size-1 rounded-full bg-primary shrink-0" />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-2.5 flex items-center gap-1 text-xs font-medium text-primary">
                      查看对应服务
                      <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
