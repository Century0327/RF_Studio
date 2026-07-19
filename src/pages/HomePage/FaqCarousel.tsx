import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { MOCK_FAQS } from '@/data/services';
import { Button } from '@/components/ui/button';

const AUTO_PLAY_INTERVAL = 4000;

export default function FaqCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_FAQS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_FAQS.length) % MOCK_FAQS.length);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(goToNext, AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goToNext]);

  const currentFaq = MOCK_FAQS[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border/40 bg-accent/30">
        <div className="flex items-center gap-2">
          <HelpCircle className="size-4 text-primary" />
          <span className="text-sm font-medium">你可能正遇到这些问题</span>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} / {MOCK_FAQS.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={goToPrev}
            aria-label="上一个"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? '播放' : '暂停'}
          >
            {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={goToNext}
            aria-label="下一个"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[88px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFaq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 p-3.5"
          >
            <h4 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-1">
              {currentFaq.question}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {currentFaq.answer}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-border/30 overflow-hidden">
        <motion.div
          key={`${currentIndex}-${isPaused ? 'paused' : 'playing'}`}
          initial={{ width: '0%' }}
          animate={{ width: isPaused ? '30%' : '100%' }}
          transition={{
            duration: isPaused ? 0.2 : AUTO_PLAY_INTERVAL / 1000,
            ease: 'linear',
          }}
          className="h-full bg-gradient-to-r from-primary to-info"
        />
      </div>
    </motion.div>
  );
}
