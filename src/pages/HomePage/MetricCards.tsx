import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_METRICS } from '@/data/services';
import { cn } from '@/lib/utils';

export default function MetricCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      {MOCK_METRICS.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
          onMouseEnter={() => setExpandedId(metric.id)}
          onMouseLeave={() => setExpandedId(null)}
          className={cn(
            'group relative cursor-pointer rounded-lg border transition-all duration-300 overflow-hidden',
            'hover:border-primary/40 hover:shadow-md hover:shadow-primary/5',
            expandedId === metric.id
              ? 'border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card'
              : 'border-border/50 bg-card/50 backdrop-blur-sm'
          )}
        >
          <div className="p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{metric.icon}</span>
              <div className="min-w-0">
                <div className="font-bold text-base leading-tight text-primary">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {metric.label}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === metric.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="pt-2 text-xs text-muted-foreground leading-relaxed">
                    {metric.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
