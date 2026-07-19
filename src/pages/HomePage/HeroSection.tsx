import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, ArrowRight, Sparkles } from 'lucide-react';
import IdentityCards from './IdentityCards';
import MetricCards from './MetricCards';
import FaqCarousel from './FaqCarousel';

export default function HeroSection() {
  const [selectedIdentity, setSelectedIdentity] = useState('student');

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden pt-14"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />

      {/* Decorative glow */}
      <div className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-info/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Main content area - compressed for 1080p */}
        <div className="flex-1 flex flex-col justify-center space-y-5 md:space-y-6 max-w-5xl mx-auto w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
              <Sparkles className="size-3" />
              射频仿真 · 3D可视化 · 成都本地
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-3xl md:text-5xl font-bold tracking-tight leading-tight"
          >
            让天线仿真{' '}
            <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-pulse">
              不再卡顿
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
          >
            HFSS / CST 仿真建模 · S参数优化 · 论文图表 · 3D可视化演示
            <br className="hidden md:block" />
            研究生、企业、初创团队 — 找到适合你的入口
          </motion.p>

          {/* Identity cards */}
          <div className="w-full">
            <IdentityCards selectedId={selectedIdentity} onSelect={setSelectedIdentity} />
          </div>

          {/* Metric cards */}
          <div className="w-full">
            <MetricCards />
          </div>

          {/* FAQ carousel */}
          <div className="w-full">
            <FaqCarousel />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center gap-3"
          >
            <button
              onClick={scrollToServices}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-info text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              开始探索服务
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#contact');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 bg-card/50 backdrop-blur-sm text-sm font-medium hover:bg-accent hover:border-border transition-all duration-300"
            >
              <Radio className="size-4" />
              立即咨询
            </button>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center pt-4"
        >
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground/60">
            <span>向下滚动查看更多</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="size-4"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
