import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApp, setNewApp] = useState({ role: '', company: '', source: 'LinkedIn', status: 'Applied', note: '' });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const token = localStorage.getItem('token');

  const fetchApps = async () => {
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
        if (Array.isArray(data)) {
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
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [token]);

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    if (!newApp.role || !newApp.company) return;

    if (token) {
      try {
        const res = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            job_title: newApp.role,
            company: newApp.company,
            source: newApp.source,
            status: newApp.status.toLowerCase(),
            notes: newApp.note
          })
        });

        if (res.ok) {
          const created = await res.json();
          setApps(prev => [{
            id: created.id || Date.now(),
            role: created.job_title || newApp.role,
            company: created.company || newApp.company,
            date: (created.applied_at || '').split('T')[0] || new Date().toISOString().split('T')[0],
            status: created.status ? (created.status.charAt(0).toUpperCase() + created.status.slice(1)) : newApp.status,
            source: created.source || newApp.source,
            note: created.notes || newApp.note
          }, ...prev]);
          showToastMsg('Application added and saved in real time!');
        }
      } catch (err) {
        console.error('Failed to sync application to API:', err);
      }
    }

    setShowAddModal(false);
    setNewApp({ role: '', company: '', source: 'LinkedIn', status: 'Applied', note: '' });
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

    if (token) {
      try {
        await fetch(`/api/applications/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Failed to delete application on server:', err);
      }
    }
  };

  const filteredApps = apps.filter(app => {
    const matchesSearch = (app.role || '').toLowerCase().includes(search.toLowerCase()) ||
                          (app.company || '').toLowerCase().includes(search.toLowerCase()) ||
                          (app.source || '').toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === 'All') return true;
    return (app.status || '').toLowerCase() === activeTab.toLowerCase();
  });

  const countByStatus = (status) => {
    if (status === 'All') return apps.length;
    return apps.filter(a => (a.status || '').toLowerCase() === status.toLowerCase()).length;
  };

  const tabs = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-primary-600 text-white px-4 sm:px-5 py-3 rounded-xl shadow-2xl border border-primary-400 animate-slide-down flex items-center gap-2 text-xs sm:text-sm max-w-[90vw]">
          <span>✓</span> {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Application Tracker</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Monitor all your automated and manual applications in real time.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary py-2.5 px-5 flex items-center gap-2 text-xs sm:text-sm font-semibold shadow-lg shadow-primary-500/25 w-full sm:w-auto justify-center cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add Application
        </button>
      </div>

      {/* Summary Stats Bar */}
      <div className="card-glass p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 text-center">
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{countByStatus('All')}</div>
            <div className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Total</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-0.5">{countByStatus('Applied')}</div>
            <div className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Applied</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-0.5">{countByStatus('Interview')}</div>
            <div className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Interview</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-0.5">{countByStatus('Offer')}</div>
            <div className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Offer</div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2">
            <div className="text-2xl sm:text-3xl font-bold text-rose-400 mb-0.5">{countByStatus('Rejected')}</div>
            <div className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Rejected</div>
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="card-glass overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 bg-white/[0.02]">
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
              className="input-field py-1.5 text-xs sm:text-sm" 
              placeholder="Search applications..." 
            />
          </div>
        </div>

        {/* Mobile View: Cards Grid (< 768px) */}
        <div className="block md:hidden divide-y divide-white/5">
          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading applications...</div>
          ) : filteredApps.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No applications tracked yet.</div>
          ) : (
            filteredApps.map((app) => (
              <div key={app.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-white text-base truncate">{app.role}</div>
                    <div className="text-xs text-primary-400 font-medium">{app.company}</div>
                  </div>
                  <button 
                    onClick={() => handleDelete(app.id)}
                    className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-500/10 transition-colors text-sm"
                    title="Delete application"
                  >
                    🗑️
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="bg-surface-800 text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-white/10 outline-none cursor-pointer"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <span className="badge-primary text-[10px]">{app.source}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{app.date}</span>
                </div>

                {app.note && (
                  <div className="text-xs text-gray-400 bg-surface-950/60 p-2 rounded-lg border border-white/5">
                    {app.note}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Full Table (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10 text-xs sm:text-sm text-gray-400 bg-surface-900/50">
                <th className="py-3.5 px-5 font-medium">Role & Company</th>
                <th className="py-3.5 px-5 font-medium">Status</th>
                <th className="py-3.5 px-5 font-medium">Date Applied</th>
                <th className="py-3.5 px-5 font-medium">Source</th>
                <th className="py-3.5 px-5 font-medium">Notes</th>
                <th className="py-3.5 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400 text-sm">
                    Loading your applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400 text-sm">
                    No applications tracked yet. Click "Add Application" above to track your first job!
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white text-sm">{app.role}</div>
                      <div className="text-xs text-primary-400 font-medium">{app.company}</div>
                    </td>
                    <td className="py-4 px-5">
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
                    <td className="py-4 px-5 text-xs text-gray-300 font-mono">{app.date}</td>
                    <td className="py-4 px-5 text-xs">
                      <span className="badge-primary text-[10px]">{app.source}</span>
                    </td>
                    <td className="py-4 px-5 text-xs text-gray-400 truncate max-w-[180px]" title={app.note}>
                      {app.note || <span className="text-gray-600 italic">No notes</span>}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button 
                        onClick={() => handleDelete(app.id)}
                        className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-500/10 transition-colors text-sm cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="card-glass w-full max-w-md p-5 sm:p-6 bg-surface-900 border-white/10 animate-scale-in my-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg sm:text-xl font-bold text-white">Add New Application</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white text-xl p-1 cursor-pointer">✕</button>
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
                  className="input-field text-xs sm:text-sm" 
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
                  className="input-field text-xs sm:text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Source</label>
                  <select 
                    value={newApp.source}
                    onChange={(e) => setNewApp({ ...newApp, source: e.target.value })}
                    className="input-field text-xs sm:text-sm"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Greenhouse">Greenhouse</option>
                    <option value="Lever">Lever</option>
                    <option value="Ashby">Ashby</option>
                    <option value="Workable">Workable</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Status</label>
                  <select 
                    value={newApp.status}
                    onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
                    className="input-field text-xs sm:text-sm"
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
                  placeholder="e.g. Applied via Job Grid..." 
                  className="input-field min-h-[80px] text-xs sm:text-sm" 
                />
              </div>

              <div className="flex gap-2 sm:gap-3 justify-end pt-3 sm:pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary py-2 px-4 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary py-2 px-5 sm:px-6 text-xs sm:text-sm font-semibold"
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
