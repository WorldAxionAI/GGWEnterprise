import { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Shield, LayoutDashboard, Map, FolderKanban, Users, DollarSign,
  Activity, Settings, LogOut, ChevronLeft, ChevronRight, Bell,
  ArrowUpRight, Clock, CheckCircle2, AlertCircle, Calendar,
  CreditCard, UserPlus, Server, ShieldCheck, BarChart3, Zap,
  Search, Menu, X, CircleDot, Inbox, Plus, Trash2, Edit3,
  Mail, RotateCcw, Save, KeyRound, AlertTriangle, Sparkles
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import {
  dashboardMetrics as seedMetrics,
  activeProjects as seedProjects,
  recentActivity as seedActivity,
  roadmapData,
} from '../../data/companyData'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../../data/storageKeys'
import { logout, changePassword, resetPasswordToDefault } from '../../auth/ownerAuth'
import './OwnerDashboard.css'

const sidebarLinks = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'leads', label: 'Leads', icon: Inbox },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'team', label: 'Team', icon: UserPlus },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const CHART_COLORS = ['#4d7cff', '#00d4ff', '#7a8bff', '#00f0a8', '#80f5ff', '#5eb8ff']

const projectDistribution = [
  { name: 'Healthcare', value: 30 },
  { name: 'E-Commerce', value: 25 },
  { name: 'FinTech', value: 20 },
  { name: 'Gaming', value: 15 },
  { name: 'Other', value: 10 },
]

const STATUS_OPTIONS = ['Starting', 'On Track', 'Finishing', 'At Risk']

function seedClientsFromProjects(projects) {
  const map = new Map()
  projects.forEach((p) => {
    if (!map.has(p.client)) {
      map.set(p.client, {
        id: 'c' + Math.random().toString(36).slice(2, 9),
        name: p.client,
        contact: '',
        industry: 'Software',
        addedAt: new Date().toISOString(),
      })
    }
  })
  return Array.from(map.values())
}

const formatCurrency = (val) => {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
  return `$${val}`
}

const getStatusColor = (status) => {
  switch (status) {
    case 'On Track': return 'var(--accent-success)'
    case 'Starting': return 'var(--accent-secondary)'
    case 'Finishing': return 'var(--accent-warning)'
    case 'At Risk': return 'var(--accent-danger)'
    default: return 'var(--text-muted)'
  }
}

const getActivityIcon = (type) => {
  switch (type) {
    case 'payment': return <CreditCard size={16} />
    case 'project': return <FolderKanban size={16} />
    case 'client': return <UserPlus size={16} />
    case 'team': return <Users size={16} />
    case 'deploy': return <Server size={16} />
    case 'security': return <ShieldCheck size={16} />
    case 'lead': return <Inbox size={16} />
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
    case 'lead': return 'var(--accent-secondary)'
    default: return 'var(--text-muted)'
  }
}

function ProjectModal({ open, initial, onClose, onSave }) {
  const isEdit = !!initial?.id
  const [form, setForm] = useState(() => initial || {
    name: '',
    client: '',
    progress: 0,
    status: 'Starting',
    deadline: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
    budget: 50000,
    spent: 0,
    team: 1,
  })

  if (!open) return null

  const update = (field) => (e) => {
    const val = e.target.type === 'number'
      ? Number(e.target.value)
      : e.target.value
    setForm({ ...form, [field]: val })
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.client) return
    onSave(form)
  }

  return (
    <div className="dash-modal__backdrop" onClick={onClose}>
      <motion.div
        className="dash-modal glass-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="dash-modal__header">
          <h3>{isEdit ? 'Edit Project' : 'New Project'}</h3>
          <button className="dash-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="dash-modal__form">
          <div className="dash-modal__row">
            <label>
              <span>Project name</span>
              <input value={form.name} onChange={update('name')} required placeholder="HealthTech Pro" />
            </label>
            <label>
              <span>Client</span>
              <input value={form.client} onChange={update('client')} required placeholder="MedCore Health" />
            </label>
          </div>
          <div className="dash-modal__row">
            <label>
              <span>Status</span>
              <select value={form.status} onChange={update('status')}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label>
              <span>Deadline</span>
              <input type="date" value={form.deadline} onChange={update('deadline')} />
            </label>
          </div>
          <div className="dash-modal__row">
            <label>
              <span>Progress ({form.progress}%)</span>
              <input type="range" min={0} max={100} value={form.progress} onChange={update('progress')} />
            </label>
            <label>
              <span>Team size</span>
              <input type="number" min={1} max={50} value={form.team} onChange={update('team')} />
            </label>
          </div>
          <div className="dash-modal__row">
            <label>
              <span>Budget (USD)</span>
              <input type="number" min={0} step={1000} value={form.budget} onChange={update('budget')} />
            </label>
            <label>
              <span>Spent so far (USD)</span>
              <input type="number" min={0} step={1000} value={form.spent} onChange={update('spent')} />
            </label>
          </div>
          <div className="dash-modal__actions">
            <button type="button" className="btn btn--outline btn--small" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary btn--small">
              <Save size={14} /> {isEdit ? 'Save changes' : 'Create project'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function ClientModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', contact: '', industry: 'Software' })
  if (!open) return null
  const update = (f) => (e) => setForm({ ...form, [f]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!form.name) return
    onSave(form)
  }
  return (
    <div className="dash-modal__backdrop" onClick={onClose}>
      <motion.div
        className="dash-modal glass-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="dash-modal__header">
          <h3>New Client</h3>
          <button className="dash-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="dash-modal__form">
          <label>
            <span>Client name</span>
            <input value={form.name} onChange={update('name')} required placeholder="Acme Inc" />
          </label>
          <label>
            <span>Contact email</span>
            <input type="email" value={form.contact} onChange={update('contact')} placeholder="ceo@acme.com" />
          </label>
          <label>
            <span>Industry</span>
            <input value={form.industry} onChange={update('industry')} placeholder="Healthcare" />
          </label>
          <div className="dash-modal__actions">
            <button type="button" className="btn btn--outline btn--small" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary btn--small"><Save size={14} /> Add client</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function OwnerDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showClientModal, setShowClientModal] = useState(false)
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

  // ---- Persistent state (localStorage-backed) ----
  const [projects, setProjects, resetProjects] = useLocalStorage(STORAGE_KEYS.projects, seedProjects)
  const [activity, setActivity, resetActivity] = useLocalStorage(STORAGE_KEYS.activity, seedActivity)
  const [leads, setLeads, resetLeads] = useLocalStorage(STORAGE_KEYS.leads, [])
  const [clients, setClients, resetClients] = useLocalStorage(
    STORAGE_KEYS.clients,
    () => seedClientsFromProjects(seedProjects)
  )

  // ---- Derived metrics ----
  const metrics = useMemo(() => {
    const totalBudget = projects.reduce((s, p) => s + (Number(p.budget) || 0), 0)
    const totalSpent = projects.reduce((s, p) => s + (Number(p.spent) || 0), 0)
    return {
      revenue: {
        current: totalSpent || seedMetrics.revenue.current,
        target: seedMetrics.revenue.target,
        growth: seedMetrics.revenue.growth,
        monthly: seedMetrics.revenue.monthly,
      },
      clients: {
        total: clients.length,
        active: clients.length,
        pipeline: leads.filter((l) => l.status !== 'contacted').length,
        churnRate: seedMetrics.clients.churnRate,
      },
      projects: {
        active: projects.filter((p) => p.progress < 100).length,
        completed: projects.filter((p) => p.progress === 100).length,
        inReview: projects.filter((p) => p.status === 'Finishing').length,
        totalValue: totalBudget,
      },
      team: seedMetrics.team,
    }
  }, [projects, clients, leads])

  const logActivity = useCallback((entry) => {
    setActivity((prev) => [
      { id: Date.now(), time: 'just now', ...entry },
      ...prev,
    ].slice(0, 60))
  }, [setActivity])

  // ---- Project CRUD ----
  const openNewProject = () => {
    setEditingProject(null)
    setShowProjectModal(true)
  }
  const openEditProject = (project) => {
    setEditingProject(project)
    setShowProjectModal(true)
  }
  const saveProject = (data) => {
    if (data.id) {
      setProjects((prev) => prev.map((p) => p.id === data.id ? { ...p, ...data } : p))
      logActivity({ type: 'project', text: `Updated project "${data.name}" — ${data.progress}% complete` })
    } else {
      const next = { ...data, id: 'p' + Date.now() }
      setProjects((prev) => [next, ...prev])
      logActivity({ type: 'project', text: `New project added: ${data.name}` })
    }
    setShowProjectModal(false)
    setEditingProject(null)
  }
  const deleteProject = (project) => {
    if (!window.confirm(`Delete project "${project.name}"? This cannot be undone.`)) return
    setProjects((prev) => prev.filter((p) => p.id !== project.id))
    logActivity({ type: 'project', text: `Removed project: ${project.name}` })
  }

  // ---- Client CRUD ----
  const saveClient = (data) => {
    const next = { ...data, id: 'c' + Date.now(), addedAt: new Date().toISOString() }
    setClients((prev) => [next, ...prev])
    logActivity({ type: 'client', text: `New client added: ${data.name}` })
    setShowClientModal(false)
  }
  const deleteClient = (client) => {
    if (!window.confirm(`Remove client "${client.name}"?`)) return
    setClients((prev) => prev.filter((c) => c.id !== client.id))
  }

  // ---- Lead actions ----
  const toggleLeadStatus = (lead) => {
    setLeads((prev) => prev.map((l) =>
      l.id === lead.id
        ? { ...l, status: l.status === 'contacted' ? 'new' : 'contacted' }
        : l
    ))
    if (lead.status !== 'contacted') {
      logActivity({ type: 'lead', text: `Marked lead from ${lead.name || 'unknown'} as contacted` })
    }
  }
  const deleteLead = (lead) => {
    if (!window.confirm(`Delete lead from ${lead.name || 'unknown'}?`)) return
    setLeads((prev) => prev.filter((l) => l.id !== lead.id))
  }

  // ---- Settings actions ----
  const handleSignOut = () => {
    logout()
    navigate('/')
  }
  const handleResetDemo = () => {
    if (!window.confirm('Reset all dashboard data to the demo seed? Your custom projects, clients, leads, and activity will be lost.')) return
    resetProjects()
    resetClients()
    resetActivity()
    resetLeads()
  }

  // ---- Renderers ----
  const renderOverview = () => (
    <div className="dash__overview">
      <div className="dash__kpis">
        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Total Revenue</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(77, 124, 255, 0.15)' }}>
              <DollarSign size={18} style={{ color: '#4d7cff' }} />
            </div>
          </div>
          <div className="kpi-card__value">{formatCurrency(metrics.revenue.current)}</div>
          <div className="kpi-card__change kpi-card__change--up">
            <ArrowUpRight size={14} />
            <span>+{metrics.revenue.growth}% from last month</span>
          </div>
          <div className="kpi-card__progress">
            <div className="kpi-card__progress-bar">
              <div
                className="kpi-card__progress-fill"
                style={{
                  width: `${Math.min(100, (metrics.revenue.current / metrics.revenue.target) * 100)}%`,
                  background: 'var(--gradient-primary)',
                }}
              />
            </div>
            <span className="kpi-card__progress-label">
              {Math.round((metrics.revenue.current / metrics.revenue.target) * 100)}% to {formatCurrency(metrics.revenue.target)} target
            </span>
          </div>
        </div>

        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Active Clients</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(0, 212, 255, 0.15)' }}>
              <Users size={18} style={{ color: '#00d4ff' }} />
            </div>
          </div>
          <div className="kpi-card__value">{metrics.clients.active}</div>
          <div className="kpi-card__sub-stats">
            <span><strong>{metrics.clients.pipeline}</strong> in pipeline</span>
            <span><strong>{metrics.clients.churnRate}%</strong> churn</span>
          </div>
        </div>

        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Active Projects</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(122, 139, 255, 0.18)' }}>
              <FolderKanban size={18} style={{ color: '#7a8bff' }} />
            </div>
          </div>
          <div className="kpi-card__value">{metrics.projects.active}</div>
          <div className="kpi-card__sub-stats">
            <span><strong>{metrics.projects.completed}</strong> completed</span>
            <span><strong>{metrics.projects.inReview}</strong> in review</span>
          </div>
        </div>

        <div className="kpi-card glass-card">
          <div className="kpi-card__header">
            <span className="kpi-card__label">Team Size</span>
            <div className="kpi-card__icon" style={{ background: 'rgba(0, 240, 168, 0.15)' }}>
              <Zap size={18} style={{ color: '#00f0a8' }} />
            </div>
          </div>
          <div className="kpi-card__value">{metrics.team.total}</div>
          <div className="kpi-card__sub-stats">
            <span><strong>{metrics.team.engineers}</strong> engineers</span>
            <span><strong>{metrics.team.designers}</strong> designers</span>
          </div>
        </div>
      </div>

      <div className="dash__charts-row">
        <div className="dash__chart-card glass-card">
          <div className="dash__chart-header">
            <h3>Revenue Growth</h3>
            <span className="badge badge--success">+{metrics.revenue.growth}%</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={metrics.revenue.monthly}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.07)" />
              <XAxis dataKey="month" stroke="#5a6f93" fontSize={12} />
              <YAxis stroke="#5a6f93" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{
                  background: '#0b1226',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '10px',
                  color: '#e8f1ff',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
                }}
                formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2.5} fill="url(#revenueGrad)" />
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
                  background: '#0b1226',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '10px',
                  color: '#e8f1ff',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
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

      <div className="dash__bottom-row">
        <div className="dash__projects-card glass-card">
          <div className="dash__card-header">
            <h3>Active Projects</h3>
            <span className="badge badge--cyan">{projects.length} total</span>
          </div>
          <div className="dash__projects-list">
            {projects.slice(0, 5).map((project) => (
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
                <div className="project-row__status" style={{ color: getStatusColor(project.status) }}>
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
            {projects.length === 0 && (
              <div className="dash__empty">No projects yet. Use the Projects tab to add one.</div>
            )}
          </div>
        </div>

        <div className="dash__activity-card glass-card">
          <div className="dash__card-header">
            <h3>Recent Activity</h3>
            <span className="badge badge--primary">Live</span>
          </div>
          <div className="dash__activity-list">
            {activity.slice(0, 8).map((item) => (
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
            {activity.length === 0 && (
              <div className="dash__empty">No activity yet.</div>
            )}
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
                    style={{ width: `${(quarter.goals.filter(g => g.done).length / quarter.goals.length) * 100}%` }}
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
      <div className="dash__page-header dash__page-header--with-action">
        <div>
          <h2>Project Management</h2>
          <p>Add, edit, and track every project in one place. Changes persist in your browser.</p>
        </div>
        <button className="btn btn--primary btn--small" onClick={openNewProject}>
          <Plus size={14} /> New project
        </button>
      </div>

      <div className="dash__project-stats">
        <div className="project-stat glass-card">
          <FolderKanban size={24} style={{ color: '#4d7cff' }} />
          <div>
            <div className="project-stat__value">{metrics.projects.active}</div>
            <div className="project-stat__label">Active</div>
          </div>
        </div>
        <div className="project-stat glass-card">
          <CheckCircle2 size={24} style={{ color: '#00f0a8' }} />
          <div>
            <div className="project-stat__value">{metrics.projects.completed}</div>
            <div className="project-stat__label">Completed</div>
          </div>
        </div>
        <div className="project-stat glass-card">
          <AlertCircle size={24} style={{ color: '#80f5ff' }} />
          <div>
            <div className="project-stat__value">{metrics.projects.inReview}</div>
            <div className="project-stat__label">In Review</div>
          </div>
        </div>
        <div className="project-stat glass-card">
          <DollarSign size={24} style={{ color: '#00d4ff' }} />
          <div>
            <div className="project-stat__value">{formatCurrency(metrics.projects.totalValue)}</div>
            <div className="project-stat__label">Total Value</div>
          </div>
        </div>
      </div>

      <div className="dash__projects-table glass-card">
        <div className="dash__table-header dash__table-header--projects">
          <div>Project</div>
          <div>Client</div>
          <div>Progress</div>
          <div>Status</div>
          <div>Budget</div>
          <div>Deadline</div>
          <div>Actions</div>
        </div>
        {projects.map((project) => (
          <div key={project.id} className="dash__table-row dash__table-row--projects">
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
            <div className="dash__table-cell dash__row-actions">
              <button className="dash__icon-btn" title="Edit" onClick={() => openEditProject(project)}>
                <Edit3 size={14} />
              </button>
              <button className="dash__icon-btn dash__icon-btn--danger" title="Delete" onClick={() => deleteProject(project)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="dash__empty dash__empty--large">
            <FolderKanban size={36} />
            <h4>No projects yet</h4>
            <p>Click "New project" to add your first one.</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderLeads = () => {
    const newCount = leads.filter((l) => l.status !== 'contacted').length
    return (
      <div className="dash__leads-page">
        <div className="dash__page-header">
          <h2>Inbound Leads</h2>
          <p>Submissions from the public contact form. <strong>{newCount}</strong> new, {leads.length} total.</p>
        </div>

        {leads.length === 0 ? (
          <div className="dash__empty dash__empty--large glass-card">
            <Inbox size={36} />
            <h4>No leads yet</h4>
            <p>When someone submits the contact form, you'll see them here.</p>
            <Link to="/" className="btn btn--outline btn--small" style={{ marginTop: '1rem' }}>
              Go to contact form
            </Link>
          </div>
        ) : (
          <div className="dash__leads-list">
            {leads.map((lead) => (
              <div key={lead.id} className={`lead-card glass-card ${lead.status === 'contacted' ? 'lead-card--contacted' : ''}`}>
                <div className="lead-card__top">
                  <div>
                    <div className="lead-card__name">
                      {lead.name || '(no name)'}
                      {lead.status !== 'contacted' && <span className="badge badge--cyan" style={{ marginLeft: '0.5rem' }}>NEW</span>}
                      {lead.status === 'contacted' && <span className="badge badge--success" style={{ marginLeft: '0.5rem' }}>CONTACTED</span>}
                    </div>
                    <div className="lead-card__meta">
                      <a href={`mailto:${lead.email}`} className="lead-card__email"><Mail size={12} /> {lead.email}</a>
                      {lead.company && <span>· {lead.company}</span>}
                      {lead.budget && <span>· {lead.budget}</span>}
                      <span>· {new Date(lead.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="lead-card__actions">
                    <button
                      className="dash__icon-btn"
                      title={lead.status === 'contacted' ? 'Mark as new' : 'Mark as contacted'}
                      onClick={() => toggleLeadStatus(lead)}
                    >
                      <CheckCircle2 size={14} />
                    </button>
                    <button className="dash__icon-btn dash__icon-btn--danger" title="Delete" onClick={() => deleteLead(lead)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {lead.message && (
                  <div className="lead-card__message">{lead.message}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderClients = () => (
    <div className="dash__clients-page">
      <div className="dash__page-header dash__page-header--with-action">
        <div>
          <h2>Clients</h2>
          <p>Your current client roster — {clients.length} total.</p>
        </div>
        <button className="btn btn--primary btn--small" onClick={() => setShowClientModal(true)}>
          <Plus size={14} /> New client
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="dash__empty dash__empty--large glass-card">
          <Users size={36} />
          <h4>No clients yet</h4>
          <p>Add your first client to start tracking the relationship.</p>
        </div>
      ) : (
        <div className="dash__clients-grid">
          {clients.map((client) => {
            const clientProjects = projects.filter((p) => p.client === client.name)
            return (
              <div key={client.id} className="client-card glass-card">
                <div className="client-card__top">
                  <div className="client-card__avatar">
                    {client.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <button className="dash__icon-btn dash__icon-btn--danger" title="Remove" onClick={() => deleteClient(client)}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="client-card__name">{client.name}</div>
                <div className="client-card__industry">{client.industry || 'Software'}</div>
                {client.contact && (
                  <a href={`mailto:${client.contact}`} className="client-card__contact">
                    <Mail size={12} /> {client.contact}
                  </a>
                )}
                <div className="client-card__stats">
                  <span>{clientProjects.length} project{clientProjects.length === 1 ? '' : 's'}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  const renderRevenue = () => (
    <div className="dash__revenue-page">
      <div className="dash__page-header">
        <h2>Revenue</h2>
        <p>Revenue tracked across all projects. Total spent: {formatCurrency(metrics.revenue.current)}.</p>
      </div>
      <div className="dash__chart-card glass-card" style={{ marginBottom: '1.5rem' }}>
        <div className="dash__chart-header">
          <h3>Monthly Revenue</h3>
          <span className="badge badge--success">+{metrics.revenue.growth}%</span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={metrics.revenue.monthly}>
            <defs>
              <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4d7cff" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#4d7cff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.07)" />
            <XAxis dataKey="month" stroke="#5a6f93" fontSize={12} />
            <YAxis stroke="#5a6f93" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
            <Tooltip
              contentStyle={{
                background: '#0b1226',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '10px',
                color: '#e8f1ff',
              }}
              formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="value" stroke="#4d7cff" strokeWidth={2.5} fill="url(#rev2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="dash__project-stats">
        {projects.slice(0, 6).map((p) => (
          <div key={p.id} className="project-stat glass-card">
            <DollarSign size={20} style={{ color: '#00d4ff' }} />
            <div>
              <div className="project-stat__value">{formatCurrency(p.spent)}</div>
              <div className="project-stat__label">{p.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSettings = () => <SettingsPanel
    onSignOut={() => setShowSignOutConfirm(true)}
    onResetDemo={handleResetDemo}
  />

  const renderPlaceholder = (title, description) => (
    <div className="dash__placeholder glass-card">
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
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'roadmap': return renderRoadmap()
      case 'projects': return renderProjects()
      case 'leads': return renderLeads()
      case 'clients': return renderClients()
      case 'revenue': return renderRevenue()
      case 'settings': return renderSettings()
      case 'team':
        return renderPlaceholder('Team', `You currently have ${metrics.team.total} people: ${metrics.team.engineers} engineers, ${metrics.team.designers} designers, ${metrics.team.managers} managers. Detailed team management is coming soon.`)
      case 'analytics':
        return renderPlaceholder('Analytics', `Cross-project analytics. Currently tracking ${projects.length} projects worth ${formatCurrency(metrics.projects.totalValue)} total.`)
      case 'security':
        return renderPlaceholder('Security', 'Owner session expires after 7 days of inactivity. Password is hashed with SHA-256 client-side. For higher assurance, add a backend with proper auth.')
      default:
        return renderPlaceholder('Dashboard', 'Select a section from the sidebar.')
    }
  }

  return (
    <div className="dashboard">
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
            const showBadge = link.id === 'leads' && leads.filter(l => l.status !== 'contacted').length > 0
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
                {showBadge && !sidebarCollapsed && (
                  <span className="dash__sidebar-badge">{leads.filter(l => l.status !== 'contacted').length}</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="dash__sidebar-footer">
          <button
            type="button"
            className="dash__sidebar-link"
            onClick={() => setShowSignOutConfirm(true)}
            id="dash-nav-signout"
          >
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="dash__overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className="dash__main">
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
            <button
              className="dash__topbar-btn"
              id="dash-notifications"
              onClick={() => setActiveTab('leads')}
              title="View new leads"
            >
              <Bell size={18} />
              {leads.filter(l => l.status !== 'contacted').length > 0 && (
                <span className="dash__topbar-badge">{leads.filter(l => l.status !== 'contacted').length}</span>
              )}
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

      <AnimatePresence>
        {showProjectModal && (
          <ProjectModal
            open={showProjectModal}
            initial={editingProject}
            onClose={() => { setShowProjectModal(false); setEditingProject(null) }}
            onSave={saveProject}
          />
        )}
        {showClientModal && (
          <ClientModal
            open={showClientModal}
            onClose={() => setShowClientModal(false)}
            onSave={saveClient}
          />
        )}
        {showSignOutConfirm && (
          <div className="dash-modal__backdrop" onClick={() => setShowSignOutConfirm(false)}>
            <motion.div
              className="dash-modal glass-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              style={{ maxWidth: '380px' }}
            >
              <div className="dash-modal__header">
                <h3>Sign out?</h3>
                <button className="dash-modal__close" onClick={() => setShowSignOutConfirm(false)}><X size={18} /></button>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                You'll need to enter the owner password again to return to the dashboard.
              </p>
              <div className="dash-modal__actions">
                <button className="btn btn--outline btn--small" onClick={() => setShowSignOutConfirm(false)}>Cancel</button>
                <button className="btn btn--primary btn--small" onClick={handleSignOut}>
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SettingsPanel({ onSignOut, onResetDemo }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (next !== confirmPwd) {
      setMsg({ type: 'error', text: 'New password and confirmation do not match.' })
      return
    }
    setBusy(true)
    const result = await changePassword(current, next)
    setBusy(false)
    if (result.ok) {
      setMsg({ type: 'success', text: 'Password updated for this browser. Use the new password next time you sign in.' })
      setCurrent(''); setNext(''); setConfirmPwd('')
    } else {
      setMsg({ type: 'error', text: result.error })
    }
  }

  const handleResetPassword = () => {
    if (!window.confirm('Reset owner password to the default? You will use the bundled default password next time you sign in.')) return
    resetPasswordToDefault()
    setMsg({ type: 'success', text: 'Password reset to bundled default.' })
  }

  return (
    <div className="dash__settings-page">
      <div className="dash__page-header">
        <h2>Settings</h2>
        <p>Manage your owner password, demo data, and session.</p>
      </div>

      <div className="dash__settings-grid">
        <div className="settings-card glass-card">
          <div className="settings-card__header">
            <div className="settings-card__icon" style={{ background: 'rgba(0, 212, 255, 0.15)' }}>
              <KeyRound size={18} style={{ color: '#00d4ff' }} />
            </div>
            <div>
              <h3>Change Password</h3>
              <p>Updates the password for this browser only. Default is restored when you clear site data.</p>
            </div>
          </div>
          <form onSubmit={submit} className="settings-card__form">
            <label>
              <span>Current password</span>
              <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" />
            </label>
            <label>
              <span>New password (min 6 chars)</span>
              <input type="password" value={next} onChange={(e) => setNext(e.target.value)} required minLength={6} autoComplete="new-password" />
            </label>
            <label>
              <span>Confirm new password</span>
              <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} required minLength={6} autoComplete="new-password" />
            </label>
            {msg && (
              <div className={`settings-card__msg settings-card__msg--${msg.type}`}>
                {msg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {msg.text}
              </div>
            )}
            <div className="dash-modal__actions" style={{ marginTop: '0.5rem' }}>
              <button type="button" className="btn btn--outline btn--small" onClick={handleResetPassword}>
                Reset to default
              </button>
              <button type="submit" className="btn btn--primary btn--small" disabled={busy}>
                <Save size={14} /> {busy ? 'Saving...' : 'Update password'}
              </button>
            </div>
          </form>
        </div>

        <div className="settings-card glass-card">
          <div className="settings-card__header">
            <div className="settings-card__icon" style={{ background: 'rgba(255, 82, 119, 0.15)' }}>
              <AlertTriangle size={18} style={{ color: '#ff5277' }} />
            </div>
            <div>
              <h3>Danger Zone</h3>
              <p>These actions affect your locally stored dashboard data.</p>
            </div>
          </div>

          <div className="settings-card__danger-row">
            <div>
              <strong>Reset to demo data</strong>
              <span>Clears all projects, clients, leads, and activity, restoring the original demo seed.</span>
            </div>
            <button className="btn btn--outline btn--small" onClick={onResetDemo}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="settings-card__danger-row">
            <div>
              <strong>Sign out</strong>
              <span>Ends your owner session. You'll need to enter the password again.</span>
            </div>
            <button className="btn btn--outline btn--small" onClick={onSignOut}>
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        <div className="settings-card glass-card">
          <div className="settings-card__header">
            <div className="settings-card__icon" style={{ background: 'rgba(77, 124, 255, 0.15)' }}>
              <Sparkles size={18} style={{ color: '#4d7cff' }} />
            </div>
            <div>
              <h3>About this dashboard</h3>
              <p>Static site, no backend. All dashboard data lives in your browser's localStorage and is per-device.</p>
            </div>
          </div>
          <div className="settings-card__info">
            <div><span>Auth model</span><strong>SHA-256 client-side</strong></div>
            <div><span>Session length</span><strong>7 days</strong></div>
            <div><span>Storage</span><strong>localStorage (per browser)</strong></div>
            <div><span>Hosted on</span><strong>GitHub Pages</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}
