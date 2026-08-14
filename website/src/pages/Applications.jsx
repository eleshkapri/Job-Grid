import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const defaultApps = [
  { id: 1, role: 'Frontend Developer', company: 'Google', date: '2026-08-14', status: 'Applied', source: 'Greenhouse', note: 'Submitted via Job Grid Assist' },
  { id: 2, role: 'React Engineer', company: 'Meta', date: '2026-08-12', status: 'Interview', source: 'Lever', note: 'Technical screen scheduled' },
  { id: 3, role: 'UI Developer', company: 'Apple', date: '2026-08-10', status: 'Rejected', source: 'Workday', note: 'Position filled' },
  { id: 4, role: 'Web Developer', company: 'Amazon', date: '2026-08-08', status: 'Offer', source: 'iCIMS', note: 'Reviewing offer package' },
  { id: 5, role: 'Frontend Engineer', company: 'Stripe', date: '2026-08-05', status: 'Applied', source: 'Greenhouse', note: 'Awaiting recruiter feedback' },
  { id: 6, role: 'Software Engineer', company: 'Microsoft', date: '2026-08-02', status: 'Interview', source: 'Careers Site', note: 'System design round' },
  { id: 7, role: 'UI/UX Developer', company: 'Airbnb', date: '2026-07-28', status: 'Applied', source: 'Lever', note: 'Referred by teammate' },
  { id: 8, role: 'Junior Frontend', company: 'Netflix', date: '2026-07-25', status: 'Rejected', source: 'Lever', note: '' },
];

export default function Applications() {
  const [apps, setApps] = useState(defaultApps);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApp, setNewApp] = useState({ role: '', company: '', source: 'LinkedIn', status: 'Applied', note: '' });
  const [toast, setToast] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchApps() {
      if (!token) return;
      try {
        const res = await fetch('/api/applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setApps(data.map(item => ({
              id: item.id,
              role: item.job_title || item.title || item.role,
              company: item.company,
              date: (item.applied_at || item.created_at || item.date || '').split('T')[0] || new Date().toISOString().split('T')[0],
              status: item.status ? (item.status.charAt(0).toUpperCase() + item.status.slice(1)) : 'Applied',
              source: item.source || 'Manual',
              note: item.notes || item.note || ''
            })));
          }
        }
      } catch (err) {
        console.log('Using local applications state');
      }
    }
    fetchApps();
  }, [token]);

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    if (!newApp.role || !newApp.company) return;

    const itemToAdd = {
      id: Date.now(),
      role: newApp.role,
      company: newApp.company,
      date: new Date().toISOString().split('T')[0],
      status: newApp.status,
      source: newApp.source,
      note: newApp.note
    };

    setApps(prev => [itemToAdd, ...prev]);
    setShowAddModal(false);
    setNewApp({ role: '', company: '', source: 'LinkedIn', status: 'Applied', note: '' });
    showToastMsg('Application added successfully!');

    if (token) {
      try {
        await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            job_title: newApp.role,
            company: newApp.company,
            source: newApp.source,
            notes: newApp.note
          })
        });
      } catch (err) {
        console.error('Failed to sync application to API:', err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showToastMsg(`Status updated to "${newStatus}"!`);

    if (token) {
      try {
        await fetch(`/api/applications/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus.toLowerCase() })
        });
      } catch (err) {
        console.error('Failed to update status on server:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    setApps(prev => prev.filter(a => a.id !== id));
    showToastMsg('Application deleted');
  };

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.role.toLowerCase().includes(search.toLowerCase()) ||
                          app.company.toLowerCase().includes(search.toLowerCase()) ||
                          app.source.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === 'All') return true;
    return app.status.toLowerCase() === activeTab.toLowerCase();
  });

  const countByStatus = (status) => {
    if (status === 'All') return apps.length;
    return apps.filter(a => a.status.toLowerCase() === status.toLowerCase()).length;
  };

  const tabs = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied': return <span className="badge-primary">Applied</span>;
      case 'Interview': return <span className="badge-warning">Interview</span>;
      case 'Offer': return <span className="badge-success">Offer</span>;
      case 'Rejected': return <span className="badge-danger">Rejected</span>;
      default: return <span className="badge-primary">{status}</span>;
    }
  };

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-primary-400 animate-slide-down flex items-center gap-2">
          <span>✓</span> {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Application Tracker</h1>
          <p className="text-gray-400 mt-1">Monitor all your automated and manual applications in real time.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary py-2.5 px-5 flex items-center gap-2 text-sm font-semibold shadow-lg shadow-primary-500/25"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add Application
        </button>
      </div>

      {/* Summary Stats Bar */}
      <div className="card-glass p-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{countByStatus('All')}</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-400 mb-1">{countByStatus('Applied')}</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Applied</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">{countByStatus('Interview')}</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Interview</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400 mb-1">{countByStatus('Offer')}</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Offer</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400 mb-1">{countByStatus('Rejected')}</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rejected</div>
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="card-glass overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.02]">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab} ({countByStatus(tab)})
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field py-1.5 text-sm" 
              placeholder="Search applications..." 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-sm text-gray-400 bg-surface-900/50">
                <th className="py-4 px-6 font-medium">Role & Company</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Date Applied</th>
                <th className="py-4 px-6 font-medium">Source</th>
                <th className="py-4 px-6 font-medium">Notes</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6">
                      <div className="font-medium text-white text-base">{app.role}</div>
                      <div className="text-sm text-primary-400 font-medium">{app.company}</div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="bg-surface-800 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-white/10 outline-none cursor-pointer hover:border-primary-500"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-300">{app.date}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className="badge-primary text-[10px]">{app.source}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-400 truncate max-w-[200px]" title={app.note}>
                      {app.note || <span className="text-gray-600 italic">No notes</span>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(app.id)}
                        className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-red-500/10 transition-colors text-sm"
                        title="Delete application"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="card-glass w-full max-w-md p-6 bg-surface-900 border-white/10 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add New Application</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            
            <form onSubmit={handleAddApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Job Role *</label>
                <input 
                  type="text" 
                  required
                  value={newApp.role}
                  onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
                  placeholder="e.g. Frontend Developer" 
                  className="input-field" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Company *</label>
                <input 
                  type="text" 
                  required
                  value={newApp.company}
                  onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
                  placeholder="e.g. Google" 
                  className="input-field" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Source</label>
                  <select 
                    value={newApp.source}
                    onChange={(e) => setNewApp({ ...newApp, source: e.target.value })}
                    className="input-field text-sm"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Greenhouse">Greenhouse</option>
                    <option value="Lever">Lever</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Status</label>
                  <select 
                    value={newApp.status}
                    onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
                    className="input-field text-sm"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Notes</label>
                <textarea 
                  value={newApp.note}
                  onChange={(e) => setNewApp({ ...newApp, note: e.target.value })}
                  placeholder="e.g. Applied via Job Grid extension..." 
                  className="input-field min-h-[80px]"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary py-2 px-4 text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary py-2 px-6 text-sm font-semibold"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
