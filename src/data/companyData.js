// Company data for GGW Enterprise

export const services = [
  {
    id: 'web-development',
    title: 'Website Development',
    description: 'Premium, pixel-perfect websites that convert visitors into customers. Built with cutting-edge technology and stunning design.',
    icon: 'Globe',
    features: ['Responsive Design', 'SEO Optimized', 'Performance Tuned', 'Custom CMS'],
    color: '#6c5ce7',
  },
  {
    id: 'saas-platforms',
    title: 'SaaS Platforms',
    description: 'Scalable software-as-a-service products built from the ground up. Multi-tenant architecture with enterprise-grade infrastructure.',
    icon: 'Cloud',
    features: ['Multi-Tenant', 'Auto-Scaling', 'Subscription Billing', 'API-First'],
    color: '#00d2ff',
  },
  {
    id: 'backend-systems',
    title: 'Backend Engineering',
    description: 'Rock-solid server architectures, APIs, and microservices that handle millions of requests with sub-second response times.',
    icon: 'Server',
    features: ['Microservices', 'REST & GraphQL', 'Database Design', 'Cloud Deploy'],
    color: '#e040fb',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Enterprise-level security auditing, penetration testing, and secure software development lifecycle integration.',
    icon: 'Shield',
    features: ['Pen Testing', 'OWASP Compliance', 'Zero-Trust', 'Encryption'],
    color: '#00e676',
  },
  {
    id: 'frontend-ui',
    title: 'Frontend & UI/UX',
    description: 'Immersive user interfaces with micro-interactions, animations, and design systems that define brand identity.',
    icon: 'Palette',
    features: ['Design Systems', 'Animations', 'Accessibility', 'Brand Identity'],
    color: '#ffc107',
  },
  {
    id: 'consulting',
    title: 'Tech Consulting',
    description: 'Strategic technology advisory to help enterprises make the right architecture and stack decisions for long-term growth.',
    icon: 'BrainCircuit',
    features: ['Architecture Review', 'Stack Selection', 'Team Training', 'Roadmapping'],
    color: '#ff5252',
  },
]

export const portfolio = [
  {
    id: 1,
    name: 'TransparencyMD',
    category: 'Healthcare SaaS',
    description: 'A revolutionary healthcare transparency platform connecting patients with providers through real-time pricing data and membership models. Full HIPAA-compliant architecture.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'Stripe'],
    metrics: { users: '12K+', uptime: '99.99%', rating: '4.9/5' },
    status: 'Live',
    color: '#00d2ff',
  },
  {
    id: 2,
    name: 'SlySupplies',
    category: 'E-Commerce',
    description: 'A premium e-commerce platform with enterprise-grade inventory management, real-time analytics, and seamless Stripe payment integration.',
    tech: ['React', 'Express', 'PostgreSQL', 'AWS EC2', 'Stripe'],
    metrics: { revenue: '$250K+', products: '500+', conversion: '4.2%' },
    status: 'Live',
    color: '#6c5ce7',
  },
  {
    id: 3,
    name: 'RustServerX',
    category: 'Gaming Infrastructure',
    description: 'High-performance game server management platform with Pterodactyl-inspired controls, real-time monitoring, and automated deployment.',
    tech: ['React', 'Rust', 'WebSocket', 'Docker', 'Redis'],
    metrics: { servers: '1K+', latency: '<10ms', players: '50K+' },
    status: 'Live',
    color: '#e040fb',
  },
  {
    id: 4,
    name: 'EliteX Social',
    category: 'Social Platform',
    description: 'Next-generation social media platform with AI-powered content creation, immersive UI design, and real-time engagement features.',
    tech: ['React', 'Python', 'AI/ML', 'Firebase', 'CDN'],
    metrics: { posts: '1M+', engagement: '85%', growth: '200%' },
    status: 'Live',
    color: '#ffc107',
  },
  {
    id: 5,
    name: 'AxionAI Dashboard',
    category: 'Enterprise AI',
    description: 'Enterprise AI analytics dashboard with natural language querying, predictive modeling, and automated reporting for Fortune 500 companies.',
    tech: ['Next.js', 'Python', 'TensorFlow', 'AWS', 'GraphQL'],
    metrics: { queries: '10M+', accuracy: '97%', clients: '15' },
    status: 'Live',
    color: '#00e676',
  },
]

export const stats = [
  { label: 'Projects Delivered', value: '150+', icon: 'Rocket' },
  { label: 'Enterprise Clients', value: '80+', icon: 'Building2' },
  { label: 'Lines of Code', value: '5M+', icon: 'Code2' },
  { label: 'Uptime Guarantee', value: '99.99%', icon: 'Activity' },
]

export const testimonials = [
  {
    name: 'Marcus Chen',
    role: 'CTO, MedCore Health',
    content: 'GGW Enterprise transformed our entire digital infrastructure. Their security expertise and development speed is unmatched in the industry.',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    role: 'Founder, NexaRetail',
    content: 'The e-commerce platform they built for us generated $1M in the first quarter. Their attention to UX is absolutely world-class.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'VP Engineering, CloudScale',
    content: 'We\'ve worked with dozens of agencies. GGW is in a completely different league. Their SaaS architecture decisions saved us 18 months of refactoring.',
    rating: 5,
  },
]

export const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Rust', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'WebSocket', category: 'Real-time' },
]

export const roadmapData = [
  {
    quarter: 'Q2 2026',
    title: 'Foundation & Growth',
    status: 'active',
    goals: [
      { text: 'Launch GGW Enterprise public website', done: true },
      { text: 'Onboard 10 new enterprise clients', done: false },
      { text: 'Hire 5 senior full-stack engineers', done: false },
      { text: 'Complete SOC 2 Type II certification', done: false },
    ],
  },
  {
    quarter: 'Q3 2026',
    title: 'Scale & Automate',
    status: 'upcoming',
    goals: [
      { text: 'Launch proprietary GGW SaaS Builder platform', done: false },
      { text: 'Achieve $1M ARR milestone', done: false },
      { text: 'Open European office (London)', done: false },
      { text: 'Deploy AI-powered code review pipeline', done: false },
    ],
  },
  {
    quarter: 'Q4 2026',
    title: 'Market Leadership',
    status: 'upcoming',
    goals: [
      { text: 'Reach 50 active enterprise clients', done: false },
      { text: 'Launch GGW Academy (developer training)', done: false },
      { text: 'Release open-source security toolkit', done: false },
      { text: 'Featured at 3 major tech conferences', done: false },
    ],
  },
  {
    quarter: 'Q1 2027',
    title: 'Global Expansion',
    status: 'future',
    goals: [
      { text: 'Open Asia-Pacific office (Singapore)', done: false },
      { text: 'Launch white-label SaaS marketplace', done: false },
      { text: 'Achieve ISO 27001 certification', done: false },
      { text: 'Cross $5M ARR threshold', done: false },
    ],
  },
]

export const dashboardMetrics = {
  revenue: {
    current: 285000,
    target: 1000000,
    growth: 34,
    monthly: [
      { month: 'Jan', value: 18000 },
      { month: 'Feb', value: 25000 },
      { month: 'Mar', value: 32000 },
      { month: 'Apr', value: 41000 },
      { month: 'May', value: 55000 },
      { month: 'Jun', value: 68000 },
    ],
  },
  clients: {
    total: 24,
    active: 18,
    pipeline: 12,
    churnRate: 2.1,
  },
  projects: {
    active: 8,
    completed: 42,
    inReview: 3,
    totalValue: 2400000,
  },
  team: {
    total: 15,
    engineers: 9,
    designers: 3,
    managers: 3,
  },
}

export const activeProjects = [
  {
    id: 'p1',
    name: 'HealthTech Pro',
    client: 'MedCore Health',
    progress: 75,
    status: 'On Track',
    deadline: '2026-07-15',
    budget: 180000,
    spent: 125000,
    team: 4,
  },
  {
    id: 'p2',
    name: 'FinanceHub',
    client: 'Capital Group',
    progress: 45,
    status: 'On Track',
    deadline: '2026-08-30',
    budget: 250000,
    spent: 98000,
    team: 5,
  },
  {
    id: 'p3',
    name: 'EduPlatform',
    client: 'LearnFirst',
    progress: 90,
    status: 'Finishing',
    deadline: '2026-06-01',
    budget: 120000,
    spent: 110000,
    team: 3,
  },
  {
    id: 'p4',
    name: 'LogiTrack',
    client: 'SwiftShip',
    progress: 20,
    status: 'Starting',
    deadline: '2026-10-15',
    budget: 320000,
    spent: 45000,
    team: 6,
  },
  {
    id: 'p5',
    name: 'RetailOS',
    client: 'NexaRetail',
    progress: 60,
    status: 'On Track',
    deadline: '2026-08-01',
    budget: 200000,
    spent: 135000,
    team: 4,
  },
]

export const recentActivity = [
  { id: 1, type: 'payment', text: 'Payment received from MedCore Health', amount: '$45,000', time: '2 hours ago' },
  { id: 2, type: 'project', text: 'EduPlatform milestone 4 completed', time: '5 hours ago' },
  { id: 3, type: 'client', text: 'New client signed: SwiftShip Logistics', time: '1 day ago' },
  { id: 4, type: 'team', text: 'Sarah Kim joined as Senior Frontend Engineer', time: '2 days ago' },
  { id: 5, type: 'deploy', text: 'TransparencyMD v2.4 deployed to production', time: '3 days ago' },
  { id: 6, type: 'payment', text: 'Payment received from NexaRetail', amount: '$32,000', time: '4 days ago' },
  { id: 7, type: 'security', text: 'Quarterly security audit passed — 0 critical issues', time: '5 days ago' },
  { id: 8, type: 'project', text: 'FinanceHub backend API v1 ready for review', time: '6 days ago' },
]
