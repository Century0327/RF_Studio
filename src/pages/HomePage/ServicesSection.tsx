import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Tag, ChevronRight, Star } from 'lucide-react';
import { MOCK_SERVICES, MOCK_IDENTITIES } from '@/data/services';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const HOVER_DELAY = 800;

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: '全部服务', icon: '✨' },
    ...MOCK_IDENTITIES.map((i) => ({ id: i.id, label: i.title.split(' / ')[0], icon: i.icon })),
  ];

  const filteredServices = useMemo(() => {
    if (activeTab === 'all') return MOCK_SERVICES;
    return MOCK_SERVICES.filter((s) => s.identity.includes(activeTab));
  }, [activeTab]);

  const handleMouseEnter = (id: string) => {
    setHoveredServiceId(id);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setSelectedServiceId(id);
    }, HOVER_DELAY);
  };

  const handleMouseLeave = () => {
    setHoveredServiceId(null);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  return (
    <section id="services" className="w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            <Sparkles className="size-3" />
            服务与报价
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            按你的身份选择，每项服务都关联真实案例
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            10项标准化服务，透明报价，明确交付周期，30天免费售后修改
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-card/60 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-accent/50'
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service, index) => {
            const isHovered = hoveredServiceId === service.id;
            const isSelected = selectedServiceId === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  'group relative rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer',
                  'hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
                  isSelected
                    ? 'border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card shadow-lg shadow-primary/10'
                    : 'border-border/50 bg-card/50 backdrop-blur-sm'
                )}
              >
                {/* Top accent bar */}
                <div
                  className={cn(
                    'absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-info transition-opacity duration-300',
                    isHovered || isSelected ? 'opacity-100' : 'opacity-0'
                  )}
                />

                <div className="p-5 space-y-3.5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl shrink-0">{service.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-sm truncate">{service.name}</h3>
                          {service.recommended && (
                            <Badge variant="default" className="text-[10px] h-4 px-1.5 shrink-0">
                              <Star className="size-2.5 mr-0.5" />
                              推荐
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-primary font-bold text-sm">{service.price}</div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  {/* Expanded highlights */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isHovered || isSelected ? 'auto' : 0,
                      opacity: isHovered || isSelected ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-1.5 pt-1">
                      {service.highlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="size-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {service.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] h-4 px-1.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-primary inline-flex items-center gap-0.5">
                        查看详情
                        <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
