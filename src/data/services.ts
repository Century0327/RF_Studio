// EXPORTS: IIdentity, IMetric, IService, ICase, IFaq, IMilestone, ICertification, IMediaArticle, ISocialAccount, MOCK_IDENTITIES, MOCK_METRICS, MOCK_SERVICES, MOCK_CASES, MOCK_FAQS, MOCK_MILESTONES, MOCK_CERTIFICATIONS, MOCK_MEDIA_ARTICLES, MOCK_SOCIAL_ACCOUNTS, NAV_ITEMS

export interface IIdentity {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  painPoints: string[];
  anchor: string;
}

export interface IMetric {
  id: string;
  icon: string;
  value: string;
  label: string;
  detail: string;
}

export interface IService {
  id: string;
  icon: string;
  name: string;
  price: string;
  delivery: string;
  description: string;
  highlights: string[];
  tags: string[];
  identity: string[]; // 'student' | 'enterprise' | 'startup' | 'all'
  recommended?: boolean;
}

export interface ICase {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  identity: string[]; // 'student' | 'enterprise' | 'startup'
  templateDescription?: string; // 用于联系表单自动填充
}

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface IMilestone {
  year: string;
  title: string;
  description: string;
}

export interface ICertification {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface IMediaArticle {
  id: string;
  source: string;
  title: string;
  date: string;
}

export interface ISocialAccount {
  platform: string;
  account: string;
  icon: string;
}

export const NAV_ITEMS = [
  { label: '首页', anchor: '#hero' },
  { label: '服务', anchor: '#services' },
  { label: '案例', anchor: '#cases' },
  { label: '品牌', anchor: '#brand' },
  { label: '联系', anchor: '#contact' },
];

export const MOCK_IDENTITIES: IIdentity[] = [
  {
    id: 'student',
    icon: '🎓',
    title: '研究生 / 课题组',
    subtitle: '论文复现 · 仿真代做',
    description: '仿真跑不通、论文缺图表、想复现某篇论文？我们帮你快速搞定HFSS/CST建模与结果分析。',
    painPoints: ['仿真跑不通卡毕业', '论文缺高质量图表', '想复现顶刊论文', '参数优化无从下手'],
    anchor: '#services',
  },
  {
    id: 'enterprise',
    icon: '🏢',
    title: '企业 / 研究所',
    subtitle: '天线设计 · 性能优化',
    description: '缺仿真工程师、新产品天线设计、可视化汇报？提供从需求分析到仿真验证的完整链路服务。',
    painPoints: ['缺专职仿真工程师', '新产品天线需快速验证', '项目汇报缺可视化', '性能瓶颈难定位'],
    anchor: '#services',
  },
  {
    id: 'startup',
    icon: '🚀',
    title: 'IoT / 硬件初创',
    subtitle: '一站式 · 可视化',
    description: '非射频专业、需要天线集成、从设计到演示全包？帮你从选型到打样一站式搞定。',
    painPoints: ['团队非射频专业', '需要天线集成方案', '投资人演示缺素材', '从设计到打样全包'],
    anchor: '#services',
  },
];

export const MOCK_METRICS: IMetric[] = [
  {
    id: 'delivery',
    icon: '⚡',
    value: '2-7天',
    label: '平均交付周期',
    detail: '标准化流程 + 参数化模板，简单项目2天交付，复杂项目最长7天出初稿，效率远超行业平均水平。',
  },
  {
    id: 'payment',
    icon: '💰',
    value: '30%预付',
    label: '无资金风险',
    detail: '仅需30%预付款即可启动项目，中期验收后付40%，最终交付确认后付30%，按里程碑付款零风险。',
  },
  {
    id: 'support',
    icon: '🛡️',
    value: '30天',
    label: '免费售后修改',
    detail: '交付后30天内免费修改参数、调整图表格式、补充数据视图，确保你的论文/项目顺利通过。',
  },
  {
    id: 'location',
    icon: '📍',
    value: '成都本地',
    label: '可面谈沟通',
    detail: '成都高新区/武侯区可预约线下面谈，支持现场技术交流、方案评审、项目复盘，本地响应更高效。',
  },
];

export const MOCK_SERVICES: IService[] = [
  {
    id: 'simulation',
    icon: '📐',
    name: '天线仿真代做',
    price: '¥500-3,000',
    delivery: '2-7天',
    description: 'HFSS/CST完整建模、S参数优化、方向图分析，交付源文件+技术报告+高清图表。',
    highlights: [
      '提供.hfss/.cst完整工程文件',
      'S11优化至目标频段，回波损耗曲线',
      '2D/3D增益方向图与轴比数据',
      '300dpi高清图表，直接插入论文',
    ],
    tags: ['HFSS', 'CST', 'S参数', '方向图'],
    identity: ['student', 'enterprise', 'startup'],
    recommended: true,
  },
  {
    id: 'paper-reproduce',
    icon: '📄',
    name: '论文仿真复现',
    price: '¥800-5,000',
    delivery: '3-10天',
    description: '按论文参数精确复现天线结构，对比验证，提供可直接使用的图表与数据。',
    highlights: [
      '根据论文几何与材料参数精确建模',
      '复现S参数、方向图、增益、轴比',
      '与论文数据对比，误差分析报告',
      '参数化扫描数据（CSV/Excel）',
    ],
    tags: ['论文复现', '误差分析', '参数扫描'],
    identity: ['student'],
    recommended: true,
  },
  {
    id: 'chart-beautify',
    icon: '🎨',
    name: '论文图表美化',
    price: '¥200-800',
    delivery: '1-3天',
    description: '将粗糙仿真截图转化为出版级高清图表，统一配色与字体规范。',
    highlights: [
      '统一IEEE/期刊配色规范',
      '矢量格式PDF/EPS+高分辨率PNG',
      '多子图排版与标注优化',
      '支持修改3轮',
    ],
    tags: ['图表美化', '出版级', '矢量图'],
    identity: ['student'],
  },
  {
    id: 'antenna-design',
    icon: '📡',
    name: '天线设计与优化',
    price: '¥2,000-8,000',
    delivery: '5-14天',
    description: '从需求分析到仿真验证，覆盖微带、缝隙、PIFA、阵列、喇叭等类型。',
    highlights: [
      '频段、增益、波束宽度需求分析',
      '天线类型选型与可行性评估',
      '完整仿真建模与参数优化',
      '匹配网络设计与阻抗调谐',
    ],
    tags: ['天线设计', '匹配网络', '阵列'],
    identity: ['enterprise', 'startup'],
    recommended: true,
  },
  {
    id: 'diagnosis',
    icon: '🔍',
    name: '性能瓶颈诊断',
    price: '¥1,500-5,000',
    delivery: '3-7天',
    description: '已有天线性能不达标？诊断问题根源，给出优化方案与仿真验证。',
    highlights: [
      '现有设计仿真复现与问题定位',
      'S参数异常原因分析',
      '方向图畸变诊断',
      '2-3套优化方案与仿真验证',
    ],
    tags: ['问题诊断', '优化方案', '性能分析'],
    identity: ['enterprise', 'startup'],
  },
  {
    id: 'consulting',
    icon: '💬',
    name: '技术顾问（按小时）',
    price: '¥300-500/时',
    delivery: '预约制',
    description: '天线选型、方案评审、仿真结果解读、远程实时讲解。',
    highlights: [
      '提前发送问题清单，针对性准备',
      '腾讯会议屏幕共享实时讲解',
      '会议后提供文字版要点总结',
      '成都本地可预约线下交流',
    ],
    tags: ['技术咨询', '远程讲解', '可面谈'],
    identity: ['student', 'enterprise', 'startup'],
  },
  {
    id: 'integration',
    icon: '🚀',
    name: '天线集成一站式方案',
    price: '¥3,000-12,000',
    delivery: '7-21天',
    description: '从天线选型、仿真设计、匹配优化到打样协调，非射频团队也能搞定。',
    highlights: [
      '根据产品形态推荐天线类型',
      '完整仿真设计与性能验证',
      'PCB Layout天线区域设计指导',
      '协调成都本地打样与测试资源',
    ],
    tags: ['一站式', '集成方案', '打样协调'],
    identity: ['startup'],
    recommended: true,
  },
  {
    id: 'visualization',
    icon: '🌐',
    name: '3D可视化汇报工具',
    price: '¥3,000-10,000',
    delivery: '5-10天',
    description: '交互式天线演示网页，比PPT高级10倍，给投资人/甲方看的绝佳素材。',
    highlights: [
      '3D方向图实时渲染与旋转',
      '频率/增益/极化参数交互调节',
      '手机/平板/PC自适应',
      '独立链接或嵌入官网/PPT',
    ],
    tags: ['Three.js', '可视化', '交互式'],
    identity: ['enterprise', 'startup'],
    recommended: true,
  },
  {
    id: 'digital-twin',
    icon: '🔮',
    name: '射频数字孪生原型',
    price: '¥5,000-20,000',
    delivery: '10-30天',
    description: '仿真数据+实时可视化面板，适用于实验室设备监控与项目汇报。',
    highlights: [
      '仿真结果API接入前端可视化',
      '实时S参数曲线与Smith圆图',
      '天线阵列波束扫描动画',
      '多物理场数据融合展示',
    ],
    tags: ['数字孪生', '数据大屏', '实时监控'],
    identity: ['enterprise', 'startup'],
  },
  {
    id: '3d-print',
    icon: '🖨️',
    name: '3D打印结构件验证',
    price: '¥200-1,000/件',
    delivery: '2-3天',
    description: '快速打印异形天线支架/外壳，48小时拿到实物验证结构可行性。',
    highlights: [
      'FDM/SLA打印天线支架与外壳',
      '按仿真模型尺寸精确打印',
      '结构装配验证与干涉检查',
      '成都本地48小时交付',
    ],
    tags: ['3D打印', '结构验证', '本地交付'],
    identity: ['enterprise', 'startup'],
  },
];

export const MOCK_CASES: ICase[] = [
  {
    id: 'case-1',
    title: '5.8GHz微带阵列天线',
    category: 'simulation',
    description: '为某高校课题组设计4×4微带贴片阵列，增益达18dBi，副瓣低于-20dB。',
    imageUrl: '/spark/app/app_17ac3nq3fm5/runtime/api/v1/storage/object/bucket_aadklnwe32ebi_static/static%2Faadklm62kg4bg_ve_miaoda',
    tags: ['微带阵列', '5.8GHz', '高增益'],
    identity: ['student', 'enterprise'],
    templateDescription: '我需要做一个类似"5.8GHz微带阵列天线"的项目，频段5.8GHz，希望增益达到18dBi以上，需要完整的HFSS/CST仿真建模和S参数优化。',
  },
  {
    id: 'case-2',
    title: 'IEEE TAP论文复现',
    category: 'paper',
    description: '精确复现圆极化缝隙天线，S参数误差<0.5dB，轴比吻合度95%+。',
    imageUrl: '/spark/app/app_17ac3nq3fm5/runtime/api/v1/storage/object/bucket_aadklnwe32ebi_static/static%2Faadklne6opshg_ve_miaoda',
    tags: ['论文复现', '圆极化', '缝隙天线'],
    identity: ['student'],
    templateDescription: '我需要复现一篇IEEE TAP论文中的圆极化缝隙天线，需要精确的几何建模、S参数和轴比验证，希望误差控制在0.5dB以内。',
  },
  {
    id: 'case-3',
    title: '相控阵波束扫描演示',
    category: 'visualization',
    description: '基于Three.js的相控阵3D可视化演示，支持实时波束扫描与参数调节。',
    imageUrl: '/spark/app/app_17ac3nq3fm5/runtime/api/v1/storage/object/bucket_aadklnwe32ebi_static/static%2Faadklm7ovrufg_ve_miaoda',
    tags: ['3D可视化', '相控阵', '交互式'],
    identity: ['enterprise', 'startup'],
    templateDescription: '我需要一个相控阵天线的3D可视化演示工具，支持波束扫描动画和参数交互调节，用于项目汇报或投资人演示。',
  },
  {
    id: 'case-4',
    title: '智能音箱天线集成',
    category: 'startup',
    description: '为IoT初创公司提供WiFi+蓝牙双频天线集成方案，整机效率>60%。',
    imageUrl: '/spark/app/app_17ac3nq3fm5/runtime/api/v1/storage/object/bucket_aadklnwe32ebi_static/static%2Faadklm5ppc2bo_ve_miaoda',
    tags: ['IoT', '天线集成', '双频'],
    identity: ['startup'],
    templateDescription: '我们正在做一款智能音箱产品，需要WiFi+蓝牙双频天线集成方案，希望整机辐射效率>60%，需要从选型到PCB Layout指导的一站式服务。',
  },
  {
    id: 'case-5',
    title: '可穿戴柔性天线优化',
    category: 'simulation',
    description: '优化可穿戴PIFA天线人体穿戴效率，从35%提升至58%。',
    imageUrl: '/spark/app/app_17ac3nq3fm5/runtime/api/v1/storage/object/bucket_aadklnwe32ebi_static/static%2Faadklmn6vvocg_ve_miaoda',
    tags: ['可穿戴', '柔性天线', '效率优化'],
    identity: ['student', 'enterprise'],
    templateDescription: '我有一个可穿戴PIFA天线项目，目前人体穿戴效率只有35%左右，希望能优化到55%以上，需要仿真能力和优化方案。',
  },
  {
    id: 'case-6',
    title: '射频数字孪生数据大屏',
    category: 'visualization',
    description: '为某研究所打造射频设备数字孪生监控大屏，实时展示S参数与方向图。',
    imageUrl: '/spark/app/app_17ac3nq3fm5/runtime/api/v1/storage/object/bucket_aadklnwe32ebi_static/static%2Faadklm62t3oci_ve_miaoda',
    tags: ['数字孪生', '数据大屏', '实时监控'],
    identity: ['enterprise'],
    templateDescription: '我们需要一个射频设备的数字孪生监控大屏，能实时展示S参数曲线、Smith圆图和方向图，用于实验室设备监控和项目汇报。',
  },
];

// 联系表单 - 相似案例选项（带模板描述）
export const CONTACT_CASE_OPTIONS = [
  { value: 'array', label: '5.8GHz微带阵列', template: '我需要做一个微带阵列天线项目，频段约5.8GHz，希望增益18dBi以上，需要完整仿真建模和参数优化。' },
  { value: 'paper', label: '论文仿真复现', template: '我需要复现一篇论文中的天线设计，需要精确建模、S参数验证和误差分析，用于毕业论文或期刊投稿。' },
  { value: 'visualization', label: '3D可视化演示', template: '我需要一个天线仿真的3D可视化演示工具，用于项目汇报或投资人演示，需要交互式参数调节。' },
  { value: 'iot', label: '智能硬件天线集成', template: '我们正在开发一款智能硬件产品，需要天线集成方案，从选型、仿真到PCB Layout指导，希望一站式搞定。' },
  { value: 'diagnosis', label: '性能诊断与优化', template: '我已有的天线设计性能不达标，需要诊断问题根源并给出优化方案，最好能提供仿真验证。' },
  { value: 'other', label: '其他需求', template: '' },
];

// 按身份分组的常见问题（专业痛点导向）
export const IDENTITY_FAQS: Record<string, { question: string; answer: string }[]> = {
  student: [
    { question: 'HFSS仿真跑了几小时还不收敛，怎么解决？', answer: '通常原因：网格过密、模型有微小重叠/缝隙、端口激励设置不当、自适应网格收敛标准过严。我们会先做几何清理和网格策略优化，一般24小时内定位问题。' },
    { question: '论文里的天线参数不完整，能反推吗？', answer: '可以。对缺失的介质常数、贴片尺寸等关键参数，我们通过参数扫描+文献对比反推，再与论文S参数曲线交叉验证，误差控制在0.5dB以内。' },
    { question: '仿真出来的S11曲线和论文对不上，差了2-3dB怎么办？', answer: '常见原因：基板介电常数取值偏差、馈电位置偏差、空气盒尺寸不够大。我们逐一排查并修正，通常2-3轮迭代即可吻合。' },
    { question: '毕业论文需要哪些天线图表？能不能直接用？', answer: '标配交付：S11回波损耗曲线、2D/3D增益方向图（E面+H面）、轴比图、表面电流分布图、Smith圆图。全部300dpi PNG+矢量PDF，IEEE配色规范，可直接插入LaTeX。' },
    { question: '导师要求复现IEEE TAP论文，但参数太多建模很慢？', answer: '我们已积累200+论文的建模模板库，微带/缝隙/PIFA/偶极子等常见结构有参数化脚本，大部分论文可在1-2天内完成初始建模。' },
  ],
  enterprise: [
    { question: '新产品整机辐射效率只有30%，怎么快速定位？', answer: '先分离天线效率（仿真）和匹配损耗（实测），再排查PCB地平面完整性、金属件遮挡、谐振频偏。我们提供仿真+实测诊断报告，2天出结论。' },
    { question: '量产时天线性能一致性差，公差怎么定？', answer: '通过参数敏感度分析找出关键尺寸（通常2-3个），给出±0.1mm级公差建议，配合容差仿真（Monte Carlo）验证良率，直接指导工艺。' },
    { question: '产品需要认证（SRRC/CE/FCC），天线测试报告怎么做？', answer: '我们提供仿真层面的预认证评估：TRP/TIS估算、SAR合规预判、谐波杂散分析。配合第三方暗室实测数据做对比修正，大幅缩短认证周期。' },
    { question: '多天线MIMO隔离度不够，隔离条加了也没用？', answer: '单纯加隔离条效果有限。我们系统分析耦合路径（表面波+空间辐射），通过去耦网络设计、正交极化布局、EBG结构等手段，通常可将隔离度提升至-20dB以下。' },
    { question: '项目汇报需要天线性能的可视化演示，怎么做？', answer: '我们交付独立Web应用：3D方向图实时渲染、频段切换、参数滑块交互，可嵌入PPT或iframe到官网。比截图汇报专业10倍。' },
  ],
  startup: [
    { question: '我们团队没有射频工程师，天线从哪开始？', answer: '你只需提供：产品形态、工作频段（如WiFi 2.4/5GHz）、尺寸限制。我们负责从天线选型、仿真设计、匹配网络到PCB Layout指导的全链路，相当于你的外部射频部门。' },
    { question: '智能硬件体积很小，天线放不下怎么办？', answer: 'IoT设备常用方案：PIFA倒F天线（最低仅5mm高）、IFA倒L天线、陶瓷贴片天线、LDS激光直接成型天线。我们根据你的结构3D模型做共形设计，把每一毫米用上。' },
    { question: '投资人要看技术方案，但不懂射频怎么演示？', answer: '我们做交互式3D演示页：天线辐射动画、频段对比、竞品性能雷达图。投资人能直观看到"你的天线比竞品增益高3dB"，手机上也能流畅展示。' },
    { question: '打样一次要好几千，能不能仿真先验证？', answer: '完全可以而且必须。仿真阶段完成S参数、方向图、效率的全面验证后，再进入打样，通常一轮打样即可达标，节省60%以上的试错成本。' },
    { question: '我们的产品要出口，各国认证对天线有什么不同要求？', answer: '关键差异：FCC（美国）关注SAR限值、CE（欧洲）关注TRP、SRRC（中国）关注EIRP和带外抑制。我们在设计阶段就做合规预审，避免上市后返工。' },
  ],
  institute: [
    { question: '课题需要大规模相控阵仿真，HFSS跑不动怎么办？', answer: '对阵列仿真采用单元+阵列因子分解法：先精仿单元，再用MATLAB/Python计算阵列因子。8×8及以上阵列从3天缩短到半天，且支持波束扫描全空间分析。' },
    { question: '需要把仿真结果做成实时交互的数据大屏？', answer: '我们交付Web端数字孪生大屏：实时S参数监控、Smith圆图动态更新、方向图3D渲染。支持对接实际测试仪器（VNA）数据，实验室监控和项目汇报两用。' },
    { question: '研究生毕业走了，仿真经验怎么沉淀？', answer: '我们帮建立参数化仿真模板库：将常见天线结构封装为带参数输入的工程模板，新人填入频段和尺寸即可出结果，不依赖个人经验。' },
    { question: '项目申报需要天线方案的可行性论证材料？', answer: '提供完整论证报告：技术路线图、仿真验证数据、性能对比表、关键指标甘特图。格式按基金/项目申报书规范排版，直接可用。' },
    { question: '和学生团队做联合课题，怎么分工协作？', answer: '我们负责仿真建模和技术报告，学生团队负责理论分析和实验验证。按课题节点交付，支持线上协同和现场交流，已与电子科大、西南交大等多所高校合作。' },
  ],
  other: [
    { question: '你们支持哪些仿真软件？', answer: '主力工具：HFSS（Ansys）、CST Studio Suite。按需使用：FEKO（电大尺寸）、ADS（电路仿真+天线协同）、COMSOL（多物理场）。交付源文件可在对应软件直接打开修改。' },
    { question: '付款方式是怎样的？', answer: '30%预付启动→中期验收付40%→最终交付付30%。支持对公转账，可开增值税普通/专用发票。首次合作可先做免费小样验证能力。' },
    { question: '交付后发现问题怎么办？', answer: '交付后30天内免费修改：参数调整、图表格式、补充数据视图。30天后如需大改，按原价的30%-50%收取。重大问题（如仿真结果不可复现）免费重做。' },
    { question: '成都本地可以面谈吗？', answer: '可以。高新区、武侯区可预约线下面谈，支持现场技术交流、方案评审、项目复盘。外地客户通过微信视频+屏幕共享远程协作，效果等同面谈。' },
    { question: '怎么确认你们的仿真结果是准确的？', answer: '三重验证：①内部交叉验证（HFSS vs CST对比）；②与论文/实测数据对比；③交付前提供完整网格收敛性报告。所有项目从未出现仿真不可复现的问题。' },
  ],
};

// 友情链接
export const FRIENDLY_LINKS = [
  { name: '电子工程世界', url: 'https://www.eeworld.com.cn/' },
  { name: '微波射频网', url: 'https://www.mwrf.net/' },
  { name: '射频学堂', url: 'https://www.rftech.cn/' },
  { name: 'CSDN射频社区', url: 'https://www.csdn.net/' },
  { name: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/' },
  { name: '知乎射频话题', url: 'https://www.zhihu.com/' },
];

export const MOCK_FAQS: IFaq[] = [
  {
    id: 'faq-1',
    question: 'HFSS仿真跑了几天都不收敛怎么办？',
    answer: '这是最常见的问题。通常原因有：网格划分过粗或过细、模型存在微小缝隙/重叠、端口设置不当、收敛标准设置过高。我们会先检查模型几何质量，再优化网格策略，调整收敛阈值，通常24小时内就能定位并解决问题。',
    category: '仿真问题',
  },
  {
    id: 'faq-2',
    question: 'S11参数始终达不到目标频段怎么办？',
    answer: 'S11不达标通常涉及天线尺寸、匹配网络、介质基板参数三个方面。我们会通过参数化扫描找出关键影响变量，结合阻抗匹配网络设计（L型/π型/T型），一般在2-3轮优化后即可将S11降至-15dB以下。',
    category: '仿真问题',
  },
  {
    id: 'faq-3',
    question: '论文图表怎么画才能达到IEEE期刊水平？',
    answer: 'IEEE期刊图表有严格规范：配色采用专业科研配色（避免高饱和色）、线条粗细一致、字体统一为Times New Roman/Arial、坐标轴标注完整、图例清晰不遮挡数据。我们提供的图表全部符合IEEE出版标准，含矢量源文件，可直接插入论文。',
    category: '论文相关',
  },
  {
    id: 'faq-4',
    question: '想复现一篇TAP/AP上的论文，能做到什么精度？',
    answer: '取决于论文给出的参数完整度。如果几何尺寸、材料参数、馈电方式都明确，通常S参数误差<0.5dB，增益误差<0.3dB，方向图吻合度90%以上。如果参数不完整，我们会通过参数扫描反推，提供误差分析报告。',
    category: '论文相关',
  },
  {
    id: 'faq-5',
    question: '企业没有专职射频工程师，新产品天线怎么搞？',
    answer: '这正是我们的核心服务之一。你只需要提供产品形态、频段要求、尺寸限制，我们从天线选型→仿真设计→匹配优化→PCB Layout指导→打样协调全链路搞定，相当于你的"外部射频部门"。',
    category: '企业服务',
  },
  {
    id: 'faq-6',
    question: '天线方向图畸变、副瓣太高是什么原因？',
    answer: '方向图畸变常见原因：阵列单元间距设计不当、馈电网络幅度/相位误差、基板材料损耗不均、周围结构散射影响。我们会逐一排查，给出2-3套优化方案并仿真验证效果。',
    category: '仿真问题',
  },
  {
    id: 'faq-7',
    question: 'IoT产品天线放在整机里效率暴跌怎么办？',
    answer: '这是IoT产品的典型痛点——天线周围的电池、屏幕、金属结构都会严重影响辐射效率。解决方案包括：天线位置优化、引入中和线/寄生单元、选择合适的天线类型（PIFA/IFA/ monopole）、整机匹配调谐。我们有丰富的整机天线调优经验。',
    category: '企业服务',
  },
  {
    id: 'faq-8',
    question: '交付的仿真文件能直接用于生产吗？',
    answer: '仿真文件可以直接用于后续的PCB Layout和生产参考。我们交付的内容包括：完整工程源文件、Gerber格式建议、BOM清单（如有源器件）、生产工艺注意事项。对于需要量产的项目，建议结合实测做最终验证。',
    category: '交付相关',
  },
  {
    id: 'faq-9',
    question: '3D可视化演示能嵌入我们的官网吗？',
    answer: '完全可以。我们交付的3D可视化工具是独立的Web应用，可以通过iframe嵌入官网、PPT、项目管理系统。支持响应式布局，手机/平板/PC都能流畅访问，还可以自定义品牌Logo和配色。',
    category: '可视化',
  },
  {
    id: 'faq-10',
    question: '项目保密怎么保障？会不会泄露我的设计？',
    answer: '我们与所有客户签订保密协议（NDA），项目文件仅在项目组内部访问，交付后可应要求删除源文件。成立3年来服务50+客户，从未发生过保密事故。高校课题组的论文数据尤其注意保密，发表前绝不外泄。',
    category: '交付相关',
  },
];

export const MOCK_MILESTONES: IMilestone[] = [
  {
    year: '2023',
    title: '从一个人开始',
    description: '李凯峰在本科期间开始接触HFSS仿真，帮同学解决天线建模问题，积累了第一批口碑客户。',
  },
  {
    year: '2024',
    title: '两人组合成型',
    description: '与前端可视化搭档联手，发现"射频仿真+3D可视化"的交叉需求几乎没人做，定位差异化服务。',
  },
  {
    year: '2025',
    title: '服务50+项目',
    description: '覆盖高校课题组、中小射频企业、IoT初创团队，交付周期稳定，复购率超过40%。',
  },
  {
    year: '2026',
    title: '立足成都射频产业集群',
    description: '依托成都高新区2000+微波射频企业生态，建立本地合作网络，提供从设计到打样的完整链路。',
  },
];

export const MOCK_CERTIFICATIONS: ICertification[] = [
  {
    id: 'cert-1',
    icon: '🏆',
    title: '全国大学生电子设计竞赛',
    description: '射频与天线类项目省级一等奖，仿真设计能力经赛事验证。',
  },
  {
    id: 'cert-2',
    icon: '📰',
    title: 'IEEE会议论文发表',
    description: '以第一作者身份在IEEE国际会议发表天线设计相关论文。',
  },
  {
    id: 'cert-3',
    icon: '🤝',
    title: '成都微波射频产业联盟',
    description: '入驻成都高新区微波射频产业生态，与本地10+企业建立合作关系。',
  },
  {
    id: 'cert-4',
    icon: '🎓',
    title: '高校联合培养',
    description: '与电子科技大学、西南交通大学天线课题组保持技术交流。',
  },
  {
    id: 'cert-5',
    icon: '📊',
    title: '50+项目交付',
    description: '累计完成天线仿真、论文复现、可视化项目50余个，客户满意度96%。',
  },
  {
    id: 'cert-6',
    icon: '🔄',
    title: '40%客户复购率',
    description: '超过四成客户在首次合作后选择再次合作或推荐同事。',
  },
];

export const MOCK_MEDIA_ARTICLES: IMediaArticle[] = [
  {
    id: 'media-1',
    source: '电子工程世界',
    title: '成都射频产业生态中的小微设计服务力量',
    date: '2026年3月',
  },
  {
    id: 'media-2',
    source: '微波射频网',
    title: '从仿真到可视化：天线设计的下一代展示方式',
    date: '2026年1月',
  },
  {
    id: 'media-3',
    source: '知乎技术专栏',
    title: 'HFSS仿真常见问题与解决方案汇总',
    date: '2025年11月',
  },
  {
    id: 'media-4',
    source: '成都高新区',
    title: '微波射频产业集群新增设计服务配套企业',
    date: '2025年8月',
  },
];

export const MOCK_SOCIAL_ACCOUNTS: ISocialAccount[] = [
  { platform: '微信公众号', account: 'RFStudio成都', icon: '💬' },
  { platform: '知乎', account: '天线仿真干货', icon: '📝' },
  { platform: 'Bilibili', account: 'HFSS教程视频', icon: '📺' },
  { platform: '小红书', account: '设计案例分享', icon: '📕' },
  { platform: 'GitHub', account: '开源可视化工具', icon: '💻' },
  { platform: 'CSDN', account: '技术博客文章', icon: '📰' },
];
