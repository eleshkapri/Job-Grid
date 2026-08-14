import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'

const mockStats = [
  { label: 'Total Applications', value: '47', trend: '+12 this week', icon: '📄', color: 'from-primary-600 to-primary-400' },
  { label: 'Active', value: '23', trend: '8 pending review', icon: '🔄', color: 'from-blue-600 to-blue-400' },
  { label: 'Interviews', value: '5', trend: '+2 this week', icon: '🎯', color: 'from-accent-600 to-accent-400' },
  { label: 'Response Rate', value: '34%', trend: '↑ 5% vs last month', icon: '📊', color: 'from-purple-600 to-pink-400' },
]

const mockApplications = [
  { id: 1, title: 'Frontend Developer', company: 'Stripe', status: 'interview', date: '2 days ago', source: 'greenhouse' },
  { id: 2, title: 'Software Engineer Intern', company: 'Spotify', status: 'applied', date: '3 days ago', source: 'lever' },
  { id: 3, title: 'Junior React Developer', company: 'Figma', status: 'applied', date: '4 days ago', source: 'greenhouse' },
  { id: 4, title: 'Full Stack Developer', company: 'Discord', status: 'reviewing', date: '5 days ago', source: 'linkedin' },
  { id: 5, title: 'Backend Engineer', company: 'Notion', status: 'rejected', date: '1 week ago', source: 'greenhouse' },
]

const statusStyles = {
  applied: 'badge badge-primary',
  reviewing: 'badge badge-warning',
  interview: 'badge badge-success',
  rejected: 'badge badge-danger',
  offer: 'badge badge-success',
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Alex 👋</h1>
          <p className="text-surface-100/60 mt-1">Here's your application activity overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockStats.map((stat, i) => (
            <div key={stat.label} className={`card-glass animate-slide-up stagger-${i + 1}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-surface-100/50 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  <p className="text-xs text-accent-400 mt-1">{stat.trend}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className={`h-1 mt-4 rounded-full bg-gradient-to-r ${stat.color} opacity-60`} />
            </div>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="card-glass animate-slide-up stagger-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
            <Link to="/applications" className="btn-ghost text-sm">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-surface-100/50 text-sm border-b border-white/5">
                  <th className="pb-3 font-medium">Job Title</th>
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {mockApplications.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 text-white font-medium">{app.title}</td>
                    <td className="py-4 text-surface-100/70">{app.company}</td>
                    <td className="py-4">
                      <span className={statusStyles[app.status]}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-surface-100/50 text-sm">{app.date}</td>
                    <td className="py-4">
                      <span className="badge badge-primary text-[10px]">{app.source}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="animate-slide-up stagger-4">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/jobs" className="card-glass flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-xl shrink-0">
                🔍
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-primary-400 transition-colors">Browse Jobs</p>
                <p className="text-sm text-surface-100/50">Find new opportunities</p>
              </div>
            </Link>
            <Link to="/profile" className="card-glass flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-600 to-accent-400 flex items-center justify-center text-xl shrink-0">
                ✏️
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-accent-400 transition-colors">Edit Profile</p>
                <p className="text-sm text-surface-100/50">Update your details</p>
              </div>
            </Link>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="card-glass flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-400 flex items-center justify-center text-xl shrink-0">
                🧩
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">Install Extension</p>
                <p className="text-sm text-surface-100/50">Auto-fill job forms</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
