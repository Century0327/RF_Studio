import { Radio } from 'lucide-react';
import { MOCK_SOCIAL_ACCOUNTS } from '@/data/services';

function UniversalLink({ to, children, className, ...props }: { to: string; children: React.ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={to} className={className} {...props}>{children}</a>;
}

const footerLinks = [
  {
    title: '服务',
    links: ['研究生仿真代做', '企业天线设计', '初创一站式方案', '3D可视化工具'],
  },
  {
    title: '案例',
    links: ['仿真设计案例', '论文复现案例', '可视化案例', '查看全部'],
  },
  {
    title: '资源',
    links: ['HFSS入门教程', 'CST操作指南', '天线知识图谱', '射频行业报告'],
  },
  {
    title: '关于',
    links: ['品牌故事', '权威认证', '联系我们', '隐私政策'],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center text-primary-foreground">
                <Radio className="size-4" />
              </div>
              <span className="font-bold text-lg">RF Studio</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              射频天线仿真设计工作室<br />
              让天线仿真 不再卡顿
            </p>
            <div className="flex flex-wrap gap-2">
              {MOCK_SOCIAL_ACCOUNTS.slice(0, 4).map((s) => (
                <div
                  key={s.platform}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-accent/50 text-xs"
                >
                  <span>{s.icon}</span>
                  <span className="text-muted-foreground">{s.account}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <UniversalLink
                      to="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </UniversalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 RF Studio · 射频天线仿真设计工作室 · 成都
          </p>
          <p className="text-xs text-muted-foreground/70">
            本网站为设计原型，所有数据仅供演示
          </p>
        </div>
      </div>
    </footer>
  );
}
