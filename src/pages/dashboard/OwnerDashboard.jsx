import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Shield, LayoutDashboard, Map, FolderKanban, Users, DollarSign,
  Activity, Settings, LogOut, ChevronLeft, ChevronRight, Bell,
  TrendingUp, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2,
  AlertCircle, Rocket, Target, Calendar, CreditCard, UserPlus,
  Server, ShieldCheck, BarChart3, PieChart, Zap, Search, Menu, X,
  CircleDot, ChevronDown
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart,
  Pie, Cell
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import {
  dashboardMetrics, activeProjects, recentActivity, roadmapData
} from '../../data/companyData'
import './OwnerDashboard.css'

const sidebarLinks = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'roadmap', label: 'Business Roadmap', icon: Map },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const CHART_COLORS = ['#6c5ce7', '#00d2ff', '#e040fb', '#00e676', '#ffc107', '#ff5252']

const projectDistribution = [
  { name: 'Healthcare', value: 30 },
  { name: 'E-Commerce', value: 25 },
  { name: 'FinTech', value: 20 },
  { name: 'Gaming', value: 15 },
  { name: 'Other', value: 10 },
]

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
    return `$${val}`
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment': return <CreditCard size={16} />
      case 'project': return <FolderKanban size={16} />
      case 'client': return <UserPlus size={16} />
      case 'team': return <Users size={16} />
      case 'deploy': return <Server size={16} />
      case 'security': return <ShieldCheck size={16} />
      default: return <Activity size={16} />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'payment': return 'var(--accent-success)'
      case 'project': return 'var(--accent-primary)'
      case 'client': return 'var(--accent-secondary)'
      case 'team': return 'var(--accent-magenta)'
      case 'deploy': return 'var(--accent-warning)'
      case 'security': return 'var(--accent-success)'
      default: return 'var(--text-muted)'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'var(--accent-success)'
      case 'Starting': return 'var(--accent-secondary)'
      case 'Finishing': return 'var(--accent-warning)'
      default: return 'var(--text-muted)'
    }
  }

  const renderOverview = () => (
    <div className="dash__overview">
      {/* KPI Cards */}
      <div className="dash__kpis">
        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Total Revenue</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(108, 92, 231, 0.15)' }}>
              <DollarSign size={18} style={{ color: '#6c5ce7' }} />
            </div>
          </div>
          <div className="kpi-card__value">{formatCurrency(dashboardMetrics.revenue.current)}</div>
          <div className="kpi-card__change kpi-card__change--up">
            <ArrowUpRight size={14} />
            <span>+{dashboardMetrics.revenue.growth}% from last month</span>
          </div>
          <div className="kpi-card__progress">
            <div className="kpi-card__progress-bar">
              <div
                className="kpi-card__progress-fill"
                style={{
                  width: `${(dashboardMetrics.revenue.current / dashboardMetrics.revenue.target) * 100}%`,
                  background: 'var(--gradient-primary)',
                }}
              />
            </div>
            <span className="kpi-card__progress-label">
              {Math.round((dashboardMetrics.revenue.current / dashboardMetrics.revenue.target) * 100)}% to {formatCurrency(dashboardMetrics.revenue.target)} target
            </span>
          </div>
        </div>

        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Active Clients</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(0, 210, 255, 0.15)' }}>
              <Users size={18} style={{ color: '#00d2ff' }} />
            </div>
          </div>
          <div className="kpi-card__value">{dashboardMetrics.clients.active}</div>
          <div className="kpi-card__sub-stats">
            <span><strong>{dashboardMetrics.clients.pipeline}</strong> in pipeline</span>
            <span><strong>{dashboardMetrics.clients.churnRate}%</strong> churn</span>
          </div>
        </div>

        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Active Projects</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(224, 64, 251, 0.15)' }}>
              <FolderKanban size={18} style={{ color: '#e040fb' }} />
            </div>
          </div>
          <div className="kpi-card__value">{dashboardMetrics.projects.active}</div>
          <div className="kpi-card__sub-stats">
            <span><strong>{dashboardMetrics.projects.completed}</strong> completed</span>
            <span><strong>{dashboardMetrics.projects.inReview}</strong> in review</span>
          </div>
        </div>

        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Team Size</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(0, 230, 118, 0.15)' }}>
              <Zap size={18} style={{ color: '#00e676' }} />
            </div>
          </div>
          <div className="kpi-card__value">{dashboardMetrics.team.total}</div>
          <div className="kpi-card__sub-stats">
            <span><strong>{dashboardMetrics.team.engineers}</strong> engineers</span>
            <span><strong>{dashboardMetrics.team.designers}</strong> designers</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dash__charts-row">
        <div className="dash__chart-card glass-card">
          <div className="dash__chart-header">
            <h3>Revenue Growth</h3>
            <span className="badge badge--success">+{dashboardMetrics.revenue.growth}%</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dashboardMetrics.revenue.monthly}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#5a6180" fontSize={12} />
              <YAxis stroke="#5a6180" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{
                  background: '#12141f',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#f0f0f8',
                }}
                formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={2.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="dash__chart-card glass-card">
          <div className="dash__chart-header">
            <h3>Project Distribution</h3>
            <span className="badge badge--primary">By Industry</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RechartsPieChart>
              <Pie
                data={projectDistribution}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
              >
                {projectDistribution.map((entry, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#12141f',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#f0f0f8',
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="dash__pie-legend">
            {projectDistribution.map((entry, i) => (
              <div key={i} className="dash__pie-legend-item">
                <span className="dash__pie-dot" style={{ background: CHART_COLORS[i] }} />
                <span>{entry.name}</span>
                <span className="dash__pie-value">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Projects & Activity */}
      <div className="dash__bottom-row">
        <div className="dash__projects-card glass-card">
          <div className="dash__card-header">
            <h3>Active Projects</h3>
            <span className="badge badge--cyan">{activeProjects.length} active</span>
          </div>
          <div className="dash__projects-list">
            {activeProjects.map((project) => (
              <div key={project.id} className="project-row">
                <div className="project-row__info">
                  <div className="project-row__name">{project.name}</div>
                  <div className="project-row__client">{project.client}</div>
                </div>
                <div className="project-row__progress-wrap">
                  <div className="project-row__progress">
                    <div
                      className="project-row__progress-fill"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="project-row__percent">{project.progress}%</span>
                </div>
                <div
                  className="project-row__status"
                  style={{ color: getStatusColor(project.status) }}
                >
                  <CircleDot size={12} />
                  {project.status}
                </div>
                <div className="project-row__budget">
                  {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                </div>
                <div className="project-row__deadline">
                  <Calendar size={12} />
                  {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash__activity-card glass-card">
          <div className="dash__card-header">
            <h3>Recent Activity</h3>
            <span className="badge badge--primary">Live</span>
          </div>
          <div className="dash__activity-list">
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <div
                  className="activity-item__icon"
                  style={{ color: getActivityColor(item.type), background: `${getActivityColor(item.type)}15` }}
                >
                  {getActivityIcon(item.type)}
                </div>
                <div className="activity-item__content">
                  <div className="activity-item__text">{item.text}</div>
                  <div className="activity-item__meta">
                    <Clock size={11} />
                    <span>{item.time}</span>
                    {item.amount && (
                      <span className="activity-item__amount">{item.amount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderRoadmap = () => (
    <div className="dash__roadmap">
      <div className="dash__page-header">
        <h2>Business Roadmap</h2>
        <p>Strategic milestones and quarterly goals for GGW Enterprise growth.</p>
      </div>

      <div className="roadmap__timeline">
        {roadmapData.map((quarter, index) => (
          <motion.div
            key={quarter.quarter}
            className={`roadmap__item roadmap__item--${quarter.status}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="roadmap__item-line">
              <div className={`roadmap__dot roadmap__dot--${quarter.status}`} />
              {index < roadmapData.length - 1 && <div className="roadmap__connector" />}
            </div>
            <div className="roadmap__item-content glass-card">
              <div className="roadmap__item-header">
                <span className={`badge badge--${quarter.status === 'active' ? 'success' : quarter.status === 'upcoming' ? 'primary' : 'warning'}`}>
                  {quarter.quarter}
                </span>
                <h3>{quarter.title}</h3>
                {quarter.status === 'active' && (
                  <span className="roadmap__active-badge">
                    <Zap size={12} /> Current Quarter
                  </span>
                )}
              </div>
              <div className="roadmap__goals">
                {quarter.goals.map((goal, gi) => (
                  <div key={gi} className={`roadmap__goal ${goal.done ? 'roadmap__goal--done' : ''}`}>
                    <div className={`roadmap__goal-check ${goal.done ? 'roadmap__goal-check--done' : ''}`}>
                      {goal.done ? <CheckCircle2 size={16} /> : <CircleDot size={16} />}
                    </div>
                    <span>{goal.text}</span>
                  </div>
                ))}
              </div>
              <div className="roadmap__item-footer">
                <span className="roadmap__progress-label">
                  {quarter.goals.filter(g => g.done).length} / {quarter.goals.length} completed
                </span>
                <div className="roadmap__progress-bar">
                  <div
                    className="roadmap__progress-fill"
                    style={{
                      width: `${(quarter.goals.filter(g => g.done).length / quarter.goals.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="dash__projects-page">
      <div className="dash__page-header">
        <h2>Project Management</h2>
        <p>Track all active, completed, and pipeline projects in one place.</p>
      </div>

      <div className="dash__project-stats">
        <div className="project-stat glass-card">
          <FolderKanban size={24} style={{ color: '#6c5ce7' }} />
          <div>
            <div className="project-stat__value">{dashboardMetrics.projects.active}</div>
            <div className="project-stat__label">Active</div>
          </div>
        </div>
        <div className="project-stat glass-card">
          <CheckCircle2 size={24} style={{ color: '#00e676' }} />
          <div>
            <div className="project-stat__value">{dashboardMetrics.projects.completed}</div>
            <div className="project-stat__label">Completed</div>
          </div>
        </div>
        <div className="project-stat glass-card">
          <AlertCircle size={24} style={{ color: '#ffc107' }} />
          <div>
            <div className="project-stat__value">{dashboardMetrics.projects.inReview}</div>
            <div className="project-stat__label">In Review</div>
          </div>
        </div>
        <div className="project-stat glass-card">
          <DollarSign size={24} style={{ color: '#00d2ff' }} />
          <div>
            <div className="project-stat__value">{formatCurrency(dashboardMetrics.projects.totalValue)}</div>
            <div className="project-stat__label">Total Value</div>
          </div>
        </div>
      </div>

      <div className="dash__projects-table glass-card">
        <div className="dash__table-header">
          <div>Project</div>
          <div>Client</div>
          <div>Progress</div>
          <div>Status</div>
          <div>Budget</div>
          <div>Deadline</div>
          <div>Team</div>
        </div>
        {activeProjects.map((project) => (
          <div key={project.id} className="dash__table-row">
            <div className="dash__table-cell dash__table-cell--name">{project.name}</div>
            <div className="dash__table-cell">{project.client}</div>
            <div className="dash__table-cell">
              <div className="project-row__progress" style={{ width: '80px' }}>
                <div className="project-row__progress-fill" style={{ width: `${project.progress}%` }} />
              </div>
              <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>{project.progress}%</span>
            </div>
            <div className="dash__table-cell">
              <span className="dash__table-status" style={{ color: getStatusColor(project.status) }}>
                <CircleDot size={10} /> {project.status}
              </span>
            </div>
            <div className="dash__table-cell">
              {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
            </div>
            <div className="dash__table-cell">
              {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="dash__table-cell">
              <span className="dash__team-count">{project.team} members</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'roadmap': return renderRoadmap()
      case 'projects': return renderProjects()
      default: return (
        <div className="dash__placeholder">
          <div className="dash__placeholder-icon">
            {(() => {
              const item = sidebarLinks.find(l => l.id === activeTab)
              if (item) {
                const Icon = item.icon
                return <Icon size={48} />
              }
              return <LayoutDashboard size={48} />
            })()}
          </div>
          <h2>{sidebarLinks.find(l => l.id === activeTab)?.label || 'Dashboard'}</h2>
          <p>This section is being built. Premium features coming soon.</p>
        </div>
      )
    }
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`dash__sidebar ${sidebarCollapsed ? 'dash__sidebar--collapsed' : ''} ${mobileMenuOpen ? 'dash__sidebar--mobile-open' : ''}`}>
        <div className="dash__sidebar-header">
          <Link to="/" className="dash__sidebar-logo">
            <div className="dash__sidebar-logo-icon">
              <Shield size={18} />
            </div>
            {!sidebarCollapsed && (
              <div className="dash__sidebar-logo-text">
                <span className="dash__sidebar-logo-name">GGW</span>
                <span className="dash__sidebar-logo-sub">Dashboard</span>
              </div>
            )}
          </Link>
          <button
            className="dash__sidebar-collapse"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="dash__sidebar-nav">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <button
                key={link.id}
                className={`dash__sidebar-link ${activeTab === link.id ? 'dash__sidebar-link--active' : ''}`}
                onClick={() => {
                  setActiveTab(link.id)
                  setMobileMenuOpen(false)
                }}
                title={sidebarCollapsed ? link.label : undefined}
                id={`dash-nav-${link.id}`}
              >
                <Icon size={18} />
                {!sidebarCollapsed && <span>{link.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="dash__sidebar-footer">
          <Link to="/" className="dash__sidebar-link" id="dash-nav-back">
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="dash__overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div className="dash__main">
        {/* Top Bar */}
        <header className="dash__topbar">
          <div className="dash__topbar-left">
            <button
              className="dash__mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="dash__search">
              <Search size={16} />
              <input type="text" placeholder="Search dashboard..." id="dash-search" />
            </div>
          </div>
          <div className="dash__topbar-right">
            <button className="dash__topbar-btn" id="dash-notifications">
              <Bell size={18} />
              <span className="dash__topbar-badge">3</span>
            </button>
            <div className="dash__topbar-user">
              <div className="dash__topbar-avatar">GW</div>
              <div className="dash__topbar-user-info">
                <span className="dash__topbar-user-name">GGW Owner</span>
                <span className="dash__topbar-user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="dash__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
