import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import { ThemeProvider, useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Radio,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  MapPin,
  Wallet,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  Briefcase,
  Award,
  Newspaper,
  TrendingUp,
  Send,
  MessageSquare,
  Menu,
  X,
  Star,
  Tag,
  ExternalLink,
  CheckCircle2,
  Zap,
  Target,
  QrCode,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  MOCK_IDENTITIES,
  MOCK_METRICS,
  MOCK_SERVICES,
  MOCK_CASES,
  MOCK_FAQS,
  MOCK_MILESTONES,
  MOCK_CERTIFICATIONS,
  MOCK_MEDIA_ARTICLES,
  MOCK_SOCIAL_ACCOUNTS,
  NAV_ITEMS,
  CONTACT_CASE_OPTIONS,
  IDENTITY_FAQS,
  FRIENDLY_LINKS,
  type IIdentity,
  type IService,
} from '@/data/services';
function UniversalLink({ to, children, className, ...props }: { to: string; children: React.ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={to} className={className} {...props}>{children}</a>;
}
import { Image } from '@/components/ui/image';

// ============== 常量 ==============
const IDENTITY_HOVER_DELAY = 300;
const FAQ_INTERVAL = 5000;

// ============== 主题切换组件 ==============
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 rounded-full hover:bg-accent transition-all"
      aria-label="切换主题"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}

// ============== Header ==============
function Header({ activeIdentity, onIdentityChange }: { activeIdentity: string | null; onIdentityChange: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const identity = MOCK_IDENTITIES.find((i) => i.id === activeIdentity);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/70 backdrop-blur-2xl border-b border-border/40'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="#hero" className="flex items-center gap-2.5 group">
            <div className="relative size-8 rounded-lg bg-foreground flex items-center justify-center text-background overflow-hidden">
              <Radio className="size-4 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight">RF Studio</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.anchor}
                to={item.anchor}
                className={({ isActive }) =>
                  cn(
                    'px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-300',
                    isActive
                      ? 'text-foreground bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Identity indicator - 当前身份，点击切换 */}
            <AnimatePresence>
              {identity && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  className="hidden md:block relative group"
                >
                  <button
                    onClick={() => onIdentityChange(
                      activeIdentity === 'student' ? 'enterprise' :
                      activeIdentity === 'enterprise' ? 'startup' : 'student'
                    )}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/70 border border-border/50 hover:bg-accent transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-sm">{identity.icon}</span>
                    <span className="text-xs font-medium">{identity.title.split(' / ')[0]}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-9 h-9 rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border/40"
          >
            <nav className="max-w-7xl mx-auto px-5 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.anchor}
                  to={item.anchor}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-2.5 text-sm font-medium rounded-xl transition-all',
                      isActive
                        ? 'text-foreground bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ============== 身份卡片 ==============
function IdentityCards({
  selectedId,
  onSelect,
  hoverLockRef,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  hoverLockRef: React.RefObject<boolean>;
}) {
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseEnter = useCallback(
    (id: string) => {
      // 如果被锁定（如刚点了CTA按钮），忽略悬停
      if (hoverLockRef.current) return;
      setHoveredId(id);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => onSelect(id), IDENTITY_HOVER_DELAY);
    },
    [onSelect, hoverLockRef]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const handleClick = (identity: IIdentity) => {
    onSelect(identity.id);
    document.querySelector(identity.anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {MOCK_IDENTITIES.map((identity, index) => {
        const isActive = selectedId === identity.id;
        const isHovered = hoveredId === identity.id;
        return (
          <motion.div
            key={identity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => handleMouseEnter(identity.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(identity)}
            className={cn(
              'group relative cursor-pointer rounded-2xl p-[1px] transition-all duration-500',
              isActive
                ? 'bg-gradient-to-br from-foreground/20 via-border to-foreground/10 shadow-xl shadow-foreground/5 scale-[1.02]'
                : 'bg-border/50 hover:bg-gradient-to-br hover:from-foreground/10 hover:via-border hover:to-foreground/5 hover:shadow-lg hover:shadow-foreground/[0.03]'
            )}
          >
            <div
              className={cn(
                'relative rounded-[calc(1rem-1px)] p-5 h-full overflow-hidden transition-colors duration-500',
                'bg-card'
              )}
            >
              {/* Glow effect on active */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-foreground/5 blur-3xl pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="relative space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="text-2xl"
                    >
                      {identity.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-[15px] leading-tight">
                        {identity.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {identity.subtitle}
                      </p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="shrink-0 size-5 rounded-full bg-foreground text-background flex items-center justify-center"
                      >
                        <CheckCircle2 className="size-3" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {identity.description}
                </p>

                {/* Pain points - expanded */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-1.5 pt-1">
                        {identity.painPoints.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <span className="size-1 rounded-full bg-foreground/40 shrink-0" />
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-foreground">
                        查看对应服务
                        <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============== 数据指标卡片 ==============
function MetricCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {MOCK_METRICS.map((metric, index) => {
        const isExpanded = expandedId === metric.id;
        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setExpandedId(metric.id)}
            onMouseLeave={() => setExpandedId(null)}
            className={cn(
              'group relative rounded-2xl border p-[1px] transition-all duration-500 cursor-pointer overflow-hidden',
              isExpanded
                ? 'border-foreground/20 shadow-lg shadow-foreground/[0.04] scale-[1.02]'
                : 'border-border/60 hover:border-border'
            )}
          >
            <div className="relative rounded-[calc(1rem-1px)] bg-card p-4 overflow-hidden">
              {/* Background glow */}
              <motion.div
                animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-foreground/[0.03] blur-2xl pointer-events-none"
              />

              <div className="relative space-y-2">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={isExpanded ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                    className="text-xl"
                  >
                    {metric.icon}
                  </motion.div>
                  <div className="min-w-0">
                    <motion.div
                      key={`value-${metric.id}-${isExpanded}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bold text-lg leading-tight tracking-tight"
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-xs text-muted-foreground truncate">{metric.label}</div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {metric.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============== FAQ 悬停展开 + 自动轮播 ==============
function FaqCarousel({ identityFilter }: { identityFilter: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  // 根据身份筛选FAQ
  const faqs = useMemo(() => {
    const identityFaqs = IDENTITY_FAQS[identityFilter] || IDENTITY_FAQS.student;
    return identityFaqs.map((faq, i) => ({
      id: `local-faq-${i}`,
      question: faq.question,
      answer: faq.answer,
      category: MOCK_IDENTITIES.find((m) => m.id === identityFilter)?.title.split(' / ')[0] || '通用',
    }));
  }, [identityFilter]);

  // 自动轮播（桌面+移动端都有，悬停时暂停）
  const [autoIndex, setAutoIndex] = useState(0);
  useEffect(() => {
    if (isHovered && !isMobile) return;
    const t = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % faqs.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isHovered, isMobile, faqs.length]);

  // 身份切换时重置索引
  useEffect(() => {
    setAutoIndex(0);
  }, [identityFilter]);

  const displayFaq = faqs[autoIndex] || faqs[0];
  const isExpanded = !isMobile && isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-full bg-foreground/5 flex items-center justify-center">
            <MessageSquare className="size-3.5 text-foreground/70" />
          </div>
          <span className="text-sm font-medium">你可能正遇到这些问题</span>
          <Badge variant="outline" className="text-[10px] h-5 px-2 rounded-full">
            {MOCK_IDENTITIES.find((i) => i.id === identityFilter)?.icon}{' '}
            {MOCK_IDENTITIES.find((i) => i.id === identityFilter)?.title.split(' / ')[0] || '通用'}
          </Badge>
        </div>
        {!isMobile && (
          <span className="text-[10px] text-muted-foreground">{isHovered ? '全部展开中' : '悬停查看详情'}</span>
        )}
      </div>

      {/* 桌面：单条轮播，悬停展开当前这条的答案 */}
      {!isMobile ? (
        <div className="relative min-h-[44px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayFaq.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-5 py-4"
            >
              <h4 className="text-sm font-semibold mb-1">{displayFaq.question}</h4>
              <AnimatePresence>
                {isExpanded && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs text-muted-foreground leading-relaxed overflow-hidden"
                  >
                    {displayFaq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* 移动端：简单轮播 */
        <div className="relative h-24 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayFaq.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 px-5 py-4"
            >
              <h4 className="text-sm font-semibold mb-1.5">{displayFaq.question}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {displayFaq.answer}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

// ============== 天线辐射粒子背景（全局散布） ==============
function AntennaParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const isDark = resolvedTheme === 'dark';
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 160;
    interface Particle {
      x: number; y: number;
      baseX: number; baseY: number;
      vx: number; vy: number;
      size: number; opacity: number;
      phase: number; freq: number;
      type: 'dot' | 'ring' | 'cross';
    }
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const px = Math.random();
      const py = Math.random();
      const type = i < 120 ? 'dot' : i < 145 ? 'ring' : 'cross';
      particles.push({
        x: px, y: py, baseX: px, baseY: py,
        vx: (Math.random() - 0.5) * 0.00004,
        vy: (Math.random() - 0.5) * 0.00004,
        size: type === 'dot' ? 0.6 + Math.random() * 1.8 : 2 + Math.random() * 3,
        opacity: 0.04 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
        freq: 0.3 + Math.random() * 0.8,
        type,
      });
    }

    const MOUSE_RADIUS = 180;

    let time = 0;
    const baseColor = isDark ? [255, 255, 255] : [0, 0, 0];

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const breathe = 1 + 0.15 * Math.sin(time * 0.006 * p.freq + p.phase);
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(time * 0.004 * p.freq + p.phase + 1));

        let px = p.x * w;
        let py = p.y * h;
        let boostAlpha = alpha;

        if (mx > 0 && my > 0) {
          const dx = px - mx;
          const dy = py - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 1) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.015;
            px += dx * force * 30;
            py += dy * force * 30;
            boostAlpha = alpha * (1 + (1 - dist / MOUSE_RADIUS) * 0.8);
          }
        }

        const s = p.size * breathe;

        if (p.type === 'dot') {
          ctx.beginPath();
          ctx.arc(px, py, s, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${boostAlpha})`;
          ctx.fill();

          if (p.size > 1.4) {
            const tailAngle = Math.atan2(p.vy, p.vx);
            const tailLen = 4 + 3 * breathe;
            const tx = px + Math.cos(tailAngle) * tailLen;
            const ty = py + Math.sin(tailAngle) * tailLen;
            const grad = ctx.createLinearGradient(px, py, tx, ty);
            grad.addColorStop(0, `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${boostAlpha * 0.4})`);
            grad.addColorStop(1, `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},0)`);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(tx, ty);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        } else if (p.type === 'ring') {
          ctx.beginPath();
          ctx.arc(px, py, s, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${boostAlpha * 0.7})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          const len = s * 0.8;
          ctx.beginPath();
          ctx.moveTo(px - len, py); ctx.lineTo(px + len, py);
          ctx.moveTo(px, py - len); ctx.lineTo(px, py + len);
          ctx.strokeStyle = `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${boostAlpha * 0.5})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }

      // 鼠标位置辐射波纹
      if (mx > 0 && my > 0) {
        for (let ring = 1; ring <= 3; ring++) {
          const rr = 20 + ring * 25 + 5 * Math.sin(time * 0.01 + ring);
          ctx.beginPath();
          ctx.arc(mx, my, rr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${0.02 / ring})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}

// ============== Hero ==============
function HeroSection({
  selectedIdentity,
  onSelectIdentity,
  hoverLockRef,
}: {
  selectedIdentity: string;
  onSelectIdentity: (id: string) => void;
  hoverLockRef: React.RefObject<boolean>;
}) {
  const scrollTo = (anchor: string) => {
    // 锁定悬停，防止鼠标路径上的身份卡片被触发
    hoverLockRef.current = true;
    setTimeout(() => {
      hoverLockRef.current = false;
    }, 1500);
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden pt-16"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-foreground/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col max-w-6xl w-full mx-auto px-5 md:px-8 py-8 md:py-10">
        <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-7">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm text-xs font-medium">
              <Sparkles className="size-3.5 text-foreground/60" />
              <span className="text-muted-foreground">
                射频仿真 · 3D可视化 · 成都本地
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] -tracking-[0.02em]"
          >
            让天线仿真
            <br className="md:hidden" />
            <span className="relative inline-block ml-2 md:ml-3">
              <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
                不再卡顿
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-foreground/0 via-foreground to-foreground/0 rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            HFSS / CST 仿真建模 · S参数优化 · 论文图表 · 3D可视化演示
            <br className="hidden md:block" />
            研究生、企业、初创团队 — 找到适合你的入口
          </motion.p>

          {/* Identity cards */}
          <IdentityCards selectedId={selectedIdentity} onSelect={onSelectIdentity} hoverLockRef={hoverLockRef} />

          {/* Metric cards */}
          <MetricCards />

          {/* FAQ carousel */}
          <FaqCarousel />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3"
          >
            <button
              onClick={() => scrollTo('#services')}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20"
            >
              开始探索服务
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm text-sm font-medium hover:bg-accent hover:border-border transition-all duration-300"
            >
              <Radio className="size-4" />
              立即咨询
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex justify-center pt-4"
        >
          <div className="flex flex-col items-center gap-1.5 text-[11px] text-muted-foreground/50">
            <span>向下滚动</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============== 服务区块 ==============
function ServicesSection({ identityFilter }: { identityFilter: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sortedServices = useMemo(() => {
    if (identityFilter === 'all') return MOCK_SERVICES;
    const matched: IService[] = [];
    const others: IService[] = [];
    MOCK_SERVICES.forEach((s) => {
      if (s.identity.includes(identityFilter)) matched.push(s);
      else others.push(s);
    });
    return [...matched, ...others];
  }, [identityFilter]);

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const identity = MOCK_IDENTITIES.find((i) => i.id === identityFilter);

  return (
    <section id="services" className="w-full py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-foreground/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/50 text-xs font-medium mb-4">
            <Sparkles className="size-3.5 text-foreground/60" />
            服务与报价
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {identity
              ? `${identity.icon} 为${identity.title.split(' / ')[0]}定制`
              : '按你的身份选择'}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            10项标准化服务，透明报价，明确交付周期，30天免费售后修改
          </p>
        </motion.div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedServices.map((service, index) => {
            const isHovered = hoveredId === service.id;
            const isMatched =
              identityFilter === 'all' || service.identity.includes(identityFilter);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  'group relative rounded-2xl border p-[1px] transition-all duration-500 overflow-hidden',
                  isMatched
                    ? 'border-border/60 hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/[0.04]'
                    : 'border-border/30 opacity-50'
                )}
                style={{
                  transitionDelay: isHovered ? '0ms' : '200ms',
                }}
              >
                {/* Gradient border on hover */}
                <motion.div
                  animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-foreground/20 via-transparent to-foreground/10 rounded-2xl pointer-events-none"
                />

                <div className="relative rounded-[calc(1rem-1px)] bg-card p-6 h-full flex flex-col">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={isHovered ? { scale: 1.1, rotate: -3 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                        className="text-2xl"
                      >
                        {service.icon}
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-[15px]">{service.name}</h3>
                          {service.recommended && (
                            <Badge
                              variant="default"
                              className="text-[10px] h-4 px-1.5 rounded-full"
                            >
                              <Star className="size-2.5 mr-0.5 fill-current" />
                              推荐
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-sm">{service.price}</div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {service.delivery}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Tag className="size-3" />
                      {service.tags.slice(0, 2).join(' · ')}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights - expand on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mt-auto"
                      >
                        <div className="pt-3 border-t border-border/40 space-y-2">
                          {service.highlights.slice(0, 4).map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                              className="flex items-start gap-2 text-xs text-muted-foreground"
                            >
                              <CheckCircle2 className="size-3.5 mt-0.5 shrink-0 text-foreground/60" />
                              <span>{h}</span>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {service.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-[10px] h-5 px-2 rounded-full"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs font-medium text-foreground inline-flex items-center gap-0.5">
                            查看详情
                            <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============== 案例区块 ==============
function CasesSection({ identityFilter }: { identityFilter: string }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);
  const catTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'simulation', label: '仿真设计' },
    { id: 'paper', label: '论文复现' },
    { id: 'visualization', label: '可视化' },
    { id: 'startup', label: '初创方案' },
  ];

  const displayCategory = hoveredCategory || activeCategory;

  const filteredCases = useMemo(() => {
    let cases = MOCK_CASES;
    if (identityFilter !== 'all') {
      cases = cases.filter((c) => c.identity.includes(identityFilter));
    }
    if (displayCategory !== 'all') {
      cases = cases.filter((c) => c.category === displayCategory);
    }
    return cases;
  }, [identityFilter, displayCategory]);

  const handleCatMouseEnter = (id: string) => {
    setHoveredCategory(id);
    if (catTimerRef.current) clearTimeout(catTimerRef.current);
  };

  const handleCatMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCatClick = (id: string) => {
    setActiveCategory(id);
    setHoveredCategory(null);
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="cases"
      className="w-full py-24 md:py-32 relative bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/50 text-xs font-medium mb-4">
            <Briefcase className="size-3.5 text-foreground/60" />
            项目案例
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">真实项目数据</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            比招全职工程师便宜得多，悬停查看详情，点击直达咨询
          </p>
        </motion.div>

        {/* Category tabs - hover切换 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-1.5 mb-10 p-1 rounded-full border border-border/50 bg-card/30 w-fit mx-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onMouseEnter={() => !isMobile && handleCatMouseEnter(cat.id)}
              onMouseLeave={() => !isMobile && handleCatMouseLeave()}
              onClick={() => handleCatClick(cat.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300',
                displayCategory === cat.id
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map((item, index) => {
            const isExpanded = expandedCaseId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setExpandedCaseId(item.id)}
                onMouseLeave={() => setExpandedCaseId(null)}
                onClick={scrollToContact}
                className={cn(
                  'group rounded-2xl border bg-card overflow-hidden cursor-pointer transition-all duration-500',
                  isExpanded
                    ? 'border-foreground/20 shadow-2xl shadow-foreground/[0.06] -translate-y-1'
                    : 'border-border/60 hover:border-foreground/15 hover:shadow-xl hover:shadow-foreground/[0.04]'
                )}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="size-8 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-border/40">
                      <ExternalLink className="size-4 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="font-semibold text-[15px] group-hover:text-foreground transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 border-t border-border/40">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5">
                            <Zap className="size-3" />
                            关键指标
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.templateDescription || '点击查看完整项目详情和报价'}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-foreground">
                          咨询此项目
                          <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] h-5 px-2 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============== 品牌区块 ==============
function BrandSection() {
  return (
    <section id="brand" className="w-full py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-24 md:space-y-28">
        {/* Milestones */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/50 text-xs font-medium mb-4">
              <TrendingUp className="size-3.5 text-foreground/60" />
              发展历程
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">从一个人到一支团队</h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/30 via-border to-transparent md:-translate-x-px" />

            <div className="space-y-10 md:space-y-12">
              {MOCK_MILESTONES.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex items-start gap-5 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-2 size-2.5 rounded-full bg-foreground shadow-[0_0_0_4px_hsl(var(--background))] md:-translate-x-1/2 z-10" />

                  {/* Card */}
                  <div className="ml-10 md:ml-0 md:w-[calc(50%-2.5rem)]">
                    <div className="rounded-2xl border border-border/60 bg-card p-5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/[0.03] transition-all duration-500">
                      <div className="text-3xl font-bold tracking-tight mb-1.5 bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                        {milestone.year}
                      </div>
                      <h3 className="font-semibold text-[15px] mb-2">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/50 text-xs font-medium mb-4">
              <Award className="size-3.5 text-foreground/60" />
              权威认证
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">专业能力，值得信赖</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl border border-border/60 bg-card p-5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/[0.03] transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-3xl shrink-0"
                  >
                    {cert.icon}
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[15px] mb-1.5">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Media */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/50 text-xs font-medium mb-4">
              <Newspaper className="size-3.5 text-foreground/60" />
              媒体报道
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">行业媒体关注</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {MOCK_MEDIA_ARTICLES.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl border border-border/60 bg-card p-5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/[0.03] transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-foreground/70">
                    {article.source}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-semibold text-[15px] group-hover:text-foreground transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== 联系区块 ==============
function ContactSection({
  identityFilter,
  onIdentityChange,
}: {
  identityFilter: string;
  onIdentityChange: (id: string) => void;
}) {
  const scopedStorage = {
    getItem: (key: string) => { try { return localStorage.getItem(key); } catch { return null; } },
    setItem: (key: string, value: string) => { try { localStorage.setItem(key, value); } catch {} },
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contact: '',
    name: '',
    caseType: '',
    description: '',
  });
  const isMobile = useIsMobile();

  // 同步全局身份变化时清空案例选择
  useEffect(() => {
    setFormData((prev) => ({ ...prev, caseType: '', description: '' }));
  }, [identityFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact) {
      toast.error('请填写联系方式');
      return;
    }
    setIsSubmitting(true);

    // 本地存储备份
    try {
      const existingRaw = scopedStorage.getItem('contact_submissions');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const submission = {
        id: Date.now().toString(),
        identity: identityFilter,
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      scopedStorage.setItem(
        'contact_submissions',
        JSON.stringify([submission, ...existing].slice(0, 50))
      );
    } catch {
      // 存储失败不影响提交
    }

    // 提交到 Web3Forms
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ac131038-00e0-418e-a512-9c740d2327b3',
          联系方式: formData.contact,
          姓名: formData.name || '未填写',
          身份: MOCK_IDENTITIES.find((i) => i.id === identityFilter)?.title.split(' / ')[0] || identityFilter,
          相似案例: CONTACT_CASE_OPTIONS.find((o) => o.value === formData.caseType)?.label || '未选择',
          详细描述: formData.description || '未填写',
          subject: `[RF Studio] ${MOCK_IDENTITIES.find((i) => i.id === identityFilter)?.title.split(' / ')[0] || '咨询'} - ${formData.contact}`,
          from_name: formData.name || 'RF Studio访客',
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('需求已提交，我们会在24小时内回复您');
      } else {
        toast.error('提交失败，请直接添加微信联系我们');
      }
    } catch {
      toast.error('网络异常，请直接添加微信联系我们');
    }

    setFormData({ contact: '', name: '', caseType: '', description: '' });
    setDescriptionEdited(false);
    setDescriptionLocked(false);
    setIsSubmitting(false);
  };

  // 表单内身份选择：悬停3秒后确认切换全局身份；用户编辑过描述后锁定，只能点击切换
  const identityOptions = [
    { id: 'student', icon: '🎓', label: '研究生/博士生' },
    { id: 'enterprise', icon: '🏢', label: '企业工程师' },
    { id: 'startup', icon: '🚀', label: '初创团队' },
    { id: 'institute', icon: '🔬', label: '研究所/教师' },
    { id: 'other', icon: '💡', label: '其他' },
  ];
  const identityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [descriptionEdited, setDescriptionEdited] = useState(false);
  const [descriptionLocked, setDescriptionLocked] = useState(false);

  const handleDescriptionChange = (val: string) => {
    setFormData({ ...formData, description: val });
    // 用户手动编辑过描述后，立即锁定悬停切换
    if (val.length > 0) {
      setDescriptionEdited(true);
      setDescriptionLocked(true);
    } else {
      setDescriptionEdited(false);
      setDescriptionLocked(false);
    }
  };

  // 用户选择相似案例自动填充时，不算手动编辑
  const handleCaseTypeChange = (value: string) => {
    const option = CONTACT_CASE_OPTIONS.find((o) => o.value === value);
    const newDesc = option?.template || '';
    setFormData({ ...formData, caseType: value, description: newDesc });
    // 案例填充不触发锁定
    if (newDesc.length === 0) {
      setDescriptionEdited(false);
    }
  };

  const handleIdentityHover = (id: string) => {
    if (descriptionLocked) return;
    if (identityTimerRef.current) clearTimeout(identityTimerRef.current);
    identityTimerRef.current = setTimeout(() => {
      // 确认前检查描述是否已被手动编辑
      if (descriptionEdited) {
        setDescriptionLocked(true);
        return;
      }
      onIdentityChange(id);
    }, 3000);
  };

  const handleIdentityLeave = () => {
    if (identityTimerRef.current) {
      clearTimeout(identityTimerRef.current);
      identityTimerRef.current = null;
    }
  };

  const handleIdentityClick = (id: string) => {
    if (identityTimerRef.current) {
      clearTimeout(identityTimerRef.current);
      identityTimerRef.current = null;
    }
    onIdentityChange(id);
  };

  // 联系页专属FAQ（关于工作室本身，每个身份3条，与顶部轮播不重复）
  const CONTACT_FAQS: Record<string, { question: string; answer: string }[]> = {
    student: [
      { question: '你们是个人还是团队？靠不靠谱？', answer: '两人核心团队：射频仿真（电子科大背景）+ 前端可视化。已交付50+项目，无一起纠纷，GitHub开源工具有200+ star可验证技术能力。' },
      { question: '先付全款还是分期？万一做出来不满意怎么办？', answer: '30%预付启动，中期看S参数截图确认方向后付40%，最终交付确认后付30%。不满意免费改到满意，严重偏离需求全额退款。' },
      { question: '能先做一个小样看看水平再决定吗？', answer: '可以。提供一次免费小样服务：你发一个天线结构截图或频段要求，我们出一个简单仿真结果供你评估，满意再正式合作。' },
    ],
    enterprise: [
      { question: '能签NDA和正式合同吗？开什么发票？', answer: '所有企业项目签NDA+技术服务合同，支持对公转账，可开增值税普通/专用发票。从未发生数据泄露。' },
      { question: '我们已有仿真工程师，什么情况下需要找你们？', answer: '项目爆量缺人手、特殊结构需要第二验证、前端汇报需要可视化三种场景最多。相当于你们的弹性仿真外协，按需调用。' },
      { question: '长期合作有优惠吗？', answer: '有。季度框架协议享9折，年度协议享8折+优先响应。成都本地企业可安排每周固定时段现场驻场支持。' },
    ],
    startup: [
      { question: '我们完全没有射频背景，沟通成本高吗？', answer: '很低。你只需要说清"产品形态、频段、尺寸限制"三件事，我们出方案你拍板。全程用大白话沟通，不用懂HFSS/CST。' },
      { question: '项目启动到拿到第一版天线方案要多久？', answer: '通常3天出选型方案+初步仿真，7天出可打样的完整设计。紧急项目可2天出初稿，先让你看到东西再决定后续。' },
      { question: '你们做过类似的产品吗？能看案例吗？', answer: '做过智能音箱、手环、追踪器、LoRa网关、无人机图传等IoT产品天线。具体案例和脱敏数据可在案例区查看，也可签NDA后看完整项目档案。' },
    ],
    institute: [
      { question: '和高校课题组合作过吗？流程是怎样的？', answer: '已与电子科大、西南交大等课题组合作，负责仿真建模和学生培训。按课题节点交付，支持线上协同+现场交流，可签科研技术服务合同。' },
      { question: '研究生培养方面能提供什么支持？', answer: '提供HFSS/CST系统培训（8课时）、参数化模板库建设、论文仿真全程指导。帮助学生独立完成仿真，而不是代做后甩手。' },
      { question: '经费怎么走？能走科研经费吗？', answer: '可以。签科研技术服务合同，支持经费转账，开具符合财务要求的增值税发票。已服务过多个国家级/省部级课题的仿真支撑工作。' },
    ],
    other: [
      { question: '你们是哪里的？能远程合作吗？', answer: '团队在成都高新区，成都本地可面谈。外地通过微信视频+屏幕共享远程协作，效果等同面谈，已服务过北京、上海、深圳等多地客户。' },
      { question: '怎么联系你们？响应快吗？', answer: '页面底部表单提交或微信直接沟通，简单需求2小时内回复，复杂需求24小时内出初步方案。建议直接留联系方式，我们主动联系你。' },
      { question: '和学校里的研究生接单有什么区别？', answer: '核心差异：①专业度——全职做这个，200+项目经验；②交付规范——工程文件+技术报告+出版级图表；③售后保障——30天免费修改+长期技术支持；④合规——签合同开发票。' },
    ],
  };

  const contactFaqs = (CONTACT_FAQS[currentIdentity] || CONTACT_FAQS.other).slice(0, 3);
  const filteredCaseOptions = useMemo(() => {
    const mapping: Record<string, string[]> = {
      student: ['array', 'paper', 'visualization', 'diagnosis', 'other'],
      enterprise: ['array', 'visualization', 'diagnosis', 'iot', 'other'],
      startup: ['iot', 'visualization', 'array', 'diagnosis', 'other'],
      institute: ['array', 'paper', 'visualization', 'diagnosis', 'other'],
      other: ['array', 'paper', 'visualization', 'iot', 'diagnosis', 'other'],
    };
    const allowed = mapping[currentIdentity] || mapping.other;
    return CONTACT_CASE_OPTIONS.filter((o) => allowed.includes(o.value));
  }, [currentIdentity]);

  // 社交账号悬停二维码
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <section
      id="contact"
      className="w-full py-24 md:py-32 relative bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/50 text-xs font-medium mb-4">
            <MessageSquare className="size-3.5 text-foreground/60" />
            开始你的项目
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            描述需求，24小时内回复报价
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            留下联系方式即可，其他都是选填
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* 左栏：表单 + FAQ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-4"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border/60 bg-card p-6 md:p-7 space-y-5"
            >
              {/* 联系方式 + 姓名 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">联系方式 *</label>
                  <Input
                    placeholder="微信 / 手机号 / 邮箱"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="h-10 text-sm rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">怎么称呼你</label>
                  <Input
                    placeholder="姓名 / 昵称"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 text-sm rounded-xl"
                  />
                </div>
              </div>

              {/* 你的身份 - 悬停预览，点击确认 */}
              <div className="space-y-2">
                <label className="text-xs font-medium">你的身份</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2" onMouseLeave={handleIdentityLeave}>
                  {identityOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleIdentityClick(opt.id)}
                      onMouseEnter={() => !isMobile && handleIdentityHover(opt.id)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-300 text-left',
                        identityFilter === opt.id
                          ? 'border-foreground/30 bg-foreground/5 text-foreground'
                          : 'border-border/60 text-muted-foreground hover:border-foreground/20 hover:text-foreground hover:bg-accent/50'
                      )}
                    >
                      <span>{opt.icon}</span>
                      <span className="truncate">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 相似案例 - 根据身份动态变化 */}
              <div className="space-y-2">
                <label className="text-xs font-medium">相似案例（选填，选择后自动填充描述）</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredCaseOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleCaseTypeChange(opt.value)}
                      onMouseEnter={() => !isMobile && !descriptionLocked && handleCaseTypeChange(opt.value)}
                      className={cn(
                        'px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-300 text-left',
                        formData.caseType === opt.value
                          ? 'border-foreground/30 bg-foreground/5 text-foreground'
                          : 'border-border/60 text-muted-foreground hover:border-foreground/20 hover:text-foreground hover:bg-accent/50'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 详细描述 */}
              <div className="space-y-2">
                <label className="text-xs font-medium">详细描述（选填）</label>
                <Textarea
                  placeholder="选择相似案例后会自动填充，你也可以自行修改..."
                  value={formData.description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  className="min-h-[90px] text-sm resize-none rounded-xl"
                />
              </div>

              {/* 提交按钮 */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-foreground text-background hover:opacity-90 transition-all font-medium"
              >
                <Send className="size-4 mr-2" />
                {isSubmitting ? '提交中...' : '提交需求，获取报价'}
              </Button>
            </form>

            {/* 身份相关常见问题 */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-6 rounded-full bg-foreground/5 flex items-center justify-center">
                  <MessageSquare className="size-3 text-foreground/60" />
                </div>
                <span className="text-sm font-medium">常见问题</span>
                <span className="text-xs text-muted-foreground">
                  {MOCK_IDENTITIES.find((i) => i.id === currentIdentity)?.icon}{' '}
                  {MOCK_IDENTITIES.find((i) => i.id === currentIdentity)?.title.split(' / ')[0] || '通用'}
                </span>
              </div>
              <div className="space-y-3">
                {contactFaqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group/faq"
                  >
                    <h4 className="text-xs font-medium mb-1 group-hover/faq:text-foreground transition-colors">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右栏：承诺 + 社交矩阵 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="space-y-3">
              {[
                { icon: Clock, title: '响应承诺', desc: '简单需求2小时内回复，复杂需求24小时内出方案' },
                { icon: MapPin, title: '成都本地支持', desc: '高新区、武侯区可预约线下面谈' },
                { icon: Wallet, title: '付款方式', desc: '30%预付+里程碑付款，交付后30天免费修改' },
                { icon: Shield, title: '保密协议', desc: '所有项目签订NDA，数据绝不外泄' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3.5 p-4 rounded-2xl border border-border/60 bg-card hover:border-foreground/20 transition-all duration-300"
                >
                  <div className="size-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                    <item.icon className="size-5 text-foreground/70" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 社交媒体矩阵 - 悬停显示二维码 */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h4 className="font-medium text-sm mb-4">官方渠道</h4>
              <div className="grid grid-cols-2 gap-2">
                {MOCK_SOCIAL_ACCOUNTS.map((account) => (
                  <div
                    key={account.platform}
                    className="relative"
                    onMouseEnter={() => setHoveredSocial(account.platform)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <a
                      href="#"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer group"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="text-xl">{account.icon}</span>
                      <div className="min-w-0">
                        <div className="text-[11px] text-muted-foreground truncate">
                          {account.platform}
                        </div>
                        <div className="text-xs font-medium truncate group-hover:text-foreground transition-colors">
                          {account.account}
                        </div>
                      </div>
                    </a>
                    {/* Hover QR code overlay - 上层图层，不影响排版 */}
                    <AnimatePresence>
                      {hoveredSocial === account.platform && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none"
                        >
                          <div className="bg-background border border-border/60 rounded-xl p-3 shadow-2xl shadow-foreground/10 w-36 text-center">
                            <div className="w-24 h-24 mx-auto mb-2 rounded-lg bg-muted/50 flex items-center justify-center">
                              <div className="text-center">
                                <QrCode className="size-10 mx-auto mb-1 text-foreground/30" />
                                <span className="text-[9px] text-muted-foreground">扫码关注</span>
                              </div>
                            </div>
                            <p className="text-[10px] font-medium truncate">{account.account}</p>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-px">
                            <div className="w-2 h-2 rotate-45 bg-background border-r border-b border-border/60" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============== Footer ==============
function Footer() {
  const footerLinks = [
    { title: '服务', links: ['研究生仿真代做', '企业天线设计', '初创一站式方案', '3D可视化工具'] },
    { title: '案例', links: ['仿真设计案例', '论文复现案例', '可视化案例', '查看全部'] },
    { title: '资源', links: ['HFSS入门教程', 'CST操作指南', '天线知识图谱', '射频行业报告'] },
    { title: '关于', links: ['品牌故事', '权威认证', '联系我们', '隐私政策'] },
  ];

  return (
    <footer className="w-full border-t border-border/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-foreground flex items-center justify-center text-background">
                <Radio className="size-4" />
              </div>
              <span className="font-semibold text-lg tracking-tight">RF Studio</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              射频天线仿真设计工作室
              <br />
              让天线仿真 不再卡顿
            </p>
            <div className="flex flex-wrap gap-2">
              {MOCK_SOCIAL_ACCOUNTS.slice(0, 4).map((s) => (
                <div
                  key={s.platform}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-accent/50 text-xs"
                >
                  <span>{s.icon}</span>
                  <span className="text-muted-foreground">{s.account}</span>
                </div>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <UniversalLink
                      to="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </UniversalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 RF Studio · 射频天线仿真设计工作室 · 成都
          </p>
          <p className="text-xs text-muted-foreground/60">本网站为设计原型，所有数据仅供演示</p>
        </div>

        {/* 友情链接 */}
        <div className="mt-8 pt-6 border-t border-border/40">
          <h4 className="text-xs font-medium text-muted-foreground mb-3">友情链接</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {FRIENDLY_LINKS.map((link) => (
              <UniversalLink
                key={link.name}
                to={link.url}
                className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                {link.name}
              </UniversalLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============== 主页面 ==============
function getInitialTheme(): 'light' | 'dark' {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export default function HomePage() {
  const [selectedIdentity, setSelectedIdentity] = useState('student');
  const [mounted, setMounted] = useState(false);
  const hoverLockRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="size-8 rounded-lg bg-foreground flex items-center justify-center text-background"
        >
          <Radio className="size-4" />
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={getInitialTheme()}
      enableSystem={false}
      storageKey="rf-studio-theme-v2"
    >
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background relative">
        {/* 全局天线辐射粒子背景 */}
        <AntennaParticleField />

        <Header activeIdentity={selectedIdentity} onIdentityChange={setSelectedIdentity} />
        <main className="w-full">
          <HeroSection
            selectedIdentity={selectedIdentity}
            onSelectIdentity={setSelectedIdentity}
            hoverLockRef={hoverLockRef}
          />
          <ServicesSection identityFilter={selectedIdentity} />
          <CasesSection identityFilter={selectedIdentity} />
          <BrandSection />
          <ContactSection identityFilter={selectedIdentity} onIdentityChange={setSelectedIdentity} />
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              border: '1px solid hsl(var(--border))',
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
