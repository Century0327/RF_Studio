import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink } from 'lucide-react';
import { MOCK_CASES } from '@/data/services';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';

const categories = [
  { id: 'all', label: '全部' },
  { id: 'simulation', label: '仿真设计' },
  { id: 'paper', label: '论文复现' },
  { id: 'visualization', label: '可视化' },
  { id: 'startup', label: '初创方案' },
];

export default function CasesSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCases = useMemo(() => {
    if (activeCategory === 'all') return MOCK_CASES;
    return MOCK_CASES.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="cases" className="w-full py-16 md:py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
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
            <Briefcase className="size-3" />
            项目案例
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">真实项目数据</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            比招全职工程师便宜得多，点击卡片查看详情
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-card/60 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="size-7 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <ExternalLink className="size-3.5 text-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px] h-4 px-1.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
