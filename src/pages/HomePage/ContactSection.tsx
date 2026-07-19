import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, MapPin, Shield, Clock, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { MOCK_SOCIAL_ACCOUNTS } from '@/data/services';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contact: '',
    name: '',
    identity: '',
    caseType: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact) {
      toast.error('请填写联系方式');
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('需求已提交，我们会在24小时内回复您');
    setFormData({ contact: '', name: '', identity: '', caseType: '', description: '' });
    setIsSubmitting(false);
  };

  const commitments = [
    { icon: Clock, title: '响应承诺', desc: '简单需求2小时内回复，复杂需求24小时内出方案' },
    { icon: MapPin, title: '成都本地支持', desc: '高新区、武侯区可预约线下面谈' },
    { icon: Wallet, title: '付款方式', desc: '30%预付+里程碑付款，交付后30天免费修改' },
    { icon: Shield, title: '保密协议', desc: '所有项目签订NDA，数据绝不外泄' },
  ];

  return (
    <section id="contact" className="w-full py-16 md:py-20 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            <MessageSquare className="size-3" />
            开始你的项目
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">描述需求，24小时内回复报价</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            留下你的需求，我们会尽快与你联系
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 md:p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">联系方式 *</label>
                  <Input
                    placeholder="微信 / 手机号 / 邮箱"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">怎么称呼你</label>
                  <Input
                    placeholder="姓名 / 昵称"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">你的身份</label>
                  <Select
                    value={formData.identity}
                    onValueChange={(v) => setFormData({ ...formData, identity: v })}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">研究生/博士生</SelectItem>
                      <SelectItem value="enterprise">企业工程师</SelectItem>
                      <SelectItem value="startup">初创团队/创始人</SelectItem>
                      <SelectItem value="institute">研究所/高校教师</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">相似案例</label>
                  <Select
                    value={formData.caseType}
                    onValueChange={(v) => setFormData({ ...formData, caseType: v })}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="快速描述需求" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="array">5.8GHz微带阵列</SelectItem>
                      <SelectItem value="paper">论文复现</SelectItem>
                      <SelectItem value="visualization">3D可视化演示</SelectItem>
                      <SelectItem value="iot">智能硬件集成</SelectItem>
                      <SelectItem value="diagnosis">性能诊断</SelectItem>
                      <SelectItem value="other">其他需求</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium">详细描述（选填）</label>
                <Textarea
                  placeholder="请描述你的项目需求、频段、增益要求、尺寸限制等..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[90px] text-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-gradient-to-r from-primary to-info hover:opacity-90 transition-opacity"
              >
                <Send className="size-4 mr-2" />
                {isSubmitting ? '提交中...' : '提交需求，获取报价'}
              </Button>
            </form>
          </motion.div>

          {/* Side info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Commitments */}
            <div className="space-y-2.5">
              {commitments.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
                >
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social accounts */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
              <h4 className="font-medium text-sm mb-3">官方渠道</h4>
              <div className="grid grid-cols-2 gap-2">
                {MOCK_SOCIAL_ACCOUNTS.map((account) => (
                  <div
                    key={account.platform}
                    className="flex items-center gap-2 p-2 rounded-lg bg-accent/40 hover:bg-accent/70 transition-colors cursor-pointer"
                  >
                    <span className="text-lg">{account.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[11px] text-muted-foreground truncate">
                        {account.platform}
                      </div>
                      <div className="text-xs font-medium truncate">{account.account}</div>
                    </div>
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
