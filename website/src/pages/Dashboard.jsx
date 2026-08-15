import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../features/auth/AuthContext';

const statusStyles = {
  applied: 'badge badge-primary',
  reviewing: 'badge badge-warning',
  interview: 'badge badge-warning',
  rejected: 'badge badge-danger',
  offer: 'badge badge-success',
};

export default function Dashboard() {
  const { user, token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserApplications() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setApplications(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching dashboard applications:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserApplications();
  }, [token]);

  // Compute live user stats
  const totalApps = applications.length;
  const activeApps = applications.filter(a => (a.status || '').toLowerCase() === 'applied' || (a.status || '').toLowerCase() === 'reviewing').length;
  const interviews = applications.filter(a => (a.status || '').toLowerCase() === 'interview').length;
  const offers = applications.filter(a => (a.status || '').toLowerCase() === 'offer').length;

  const stats = [
    { label: 'Total Applications', value: totalApps.toString(), trend: `${totalApps} tracked`, icon: '📄', color: 'from-primary-600 to-primary-400' },
    { label: 'Active Applications', value: activeApps.toString(), trend: 'In progress', icon: '🔄', color: 'from-blue-600 to-blue-400' },
    { label: 'Interviews', value: interviews.toString(), trend: 'Scheduled', icon: '🎯', color: 'from-accent-600 to-accent-400' },
    { label: 'Offers Received', value: offers.toString(), trend: 'Successful', icon: '🎉', color: 'from-purple-600 to-pink-400' },
  ];

  const recentApps = applications.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {(user?.name || 'Candidate').split(' ')[0]} 👋</h1>
          <p className="text-surface-100/60 mt-1">Here's your live application activity overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
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

          {loading ? (
            <div className="py-8 text-center text-gray-400 text-sm">Loading your activity...</div>
          ) : recentApps.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <div className="text-4xl mb-3">🚀</div>
              <p className="text-white font-semibold mb-1">No applications tracked yet</p>
              <p className="text-xs text-gray-400 mb-4">Start browsing jobs or launch search to auto-apply and track!</p>
              <Link to="/jobs" className="btn-primary text-xs py-2 px-4">Browse Jobs Now</Link>
            </div>
          ) : (
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
                  {recentApps.map((app) => {
                    const st = (app.status || 'applied').toLowerCase();
                    return (
                      <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 text-white font-medium">{app.job_title || app.title || app.role}</td>
                        <td className="py-4 text-surface-100/70">{app.company}</td>
                        <td className="py-4">
                          <span className={statusStyles[st] || 'badge badge-primary'}>
                            {st.charAt(0).toUpperCase() + st.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 text-surface-100/50 text-sm">
                          {(app.applied_at || app.created_at || '').split('T')[0] || 'Today'}
                        </td>
                        <td className="py-4">
                          <span className="badge badge-primary text-[10px]">{app.source || 'Manual'}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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
            <Link to="/applications" className="card-glass flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-400 flex items-center justify-center text-xl shrink-0">
                📊
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">View Tracker</p>
                <p className="text-sm text-surface-100/50">Track job responses</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
