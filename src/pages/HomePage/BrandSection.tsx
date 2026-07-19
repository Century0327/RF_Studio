import { motion } from 'framer-motion';
import { Award, Newspaper, TrendingUp } from 'lucide-react';
import {
  MOCK_MILESTONES,
  MOCK_CERTIFICATIONS,
  MOCK_MEDIA_ARTICLES,
} from '@/data/services';

export default function BrandSection() {
  return (
    <section id="brand" className="w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16">
        {/* Milestones / Timeline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
              <TrendingUp className="size-3" />
              发展历程
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">从一个人到一支团队</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-border to-transparent md:-translate-x-1/2" />

            <div className="space-y-6 md:space-y-8">
              {MOCK_MILESTONES.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 size-3 rounded-full bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30 md:-translate-x-1/2 z-10" />

                  {/* Content card */}
                  <div className="ml-10 md:ml-0 md:w-[calc(50%-2rem)]">
                    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="font-semibold text-sm mb-1.5">{milestone.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
              <Award className="size-3" />
              权威认证
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">专业能力，值得信赖</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{cert.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{cert.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Media coverage */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
              <Newspaper className="size-3" />
              媒体报道
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">行业媒体关注</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MEDIA_ARTICLES.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="group rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary">{article.source}</span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
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
