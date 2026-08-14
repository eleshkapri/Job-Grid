import DashboardLayout from '../layouts/DashboardLayout';

export default function Applications() {
  const stats = [
    { label: 'Total', value: '142', color: 'text-white' },
    { label: 'Applied', value: '86', color: 'text-primary-400' },
    { label: 'Interview', value: '12', color: 'text-warning-400 text-yellow-400' },
    { label: 'Offer', value: '3', color: 'text-success-400 text-green-400' },
    { label: 'Rejected', value: '41', color: 'text-danger-400 text-red-400' },
  ];

  const applications = [
    { id: 1, role: 'Frontend Developer', company: 'Google', date: 'Oct 24, 2026', status: 'Applied', source: 'Greenhouse', note: '' },
    { id: 2, role: 'React Engineer', company: 'Meta', date: 'Oct 23, 2026', status: 'Interview', source: 'Lever', note: 'Technical screen on Friday' },
    { id: 3, role: 'UI Developer', company: 'Apple', date: 'Oct 21, 2026', status: 'Rejected', source: 'Workday', note: 'Position filled internally' },
    { id: 4, role: 'Web Developer', company: 'Amazon', date: 'Oct 20, 2026', status: 'Offer', source: 'iCIMS', note: 'Negotiating salary' },
    { id: 5, role: 'Frontend Engineer', company: 'Stripe', date: 'Oct 18, 2026', status: 'Applied', source: 'Greenhouse', note: '' },
    { id: 6, role: 'Software Engineer', company: 'Microsoft', date: 'Oct 15, 2026', status: 'Interview', source: 'Careers Site', note: 'Onsite scheduled' },
    { id: 7, role: 'UI/UX Developer', company: 'Airbnb', date: 'Oct 12, 2026', status: 'Applied', source: 'Lever', note: 'Referral from John' },
    { id: 8, role: 'Junior Frontend', company: 'Netflix', date: 'Oct 10, 2026', status: 'Rejected', source: 'Lever', note: '' },
  ];

  const tabs = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied': return <span className="badge-primary">{status}</span>;
      case 'Interview': return <span className="badge-warning">{status}</span>;
      case 'Offer': return <span className="badge-success">{status}</span>;
      case 'Rejected': return <span className="badge-danger">{status}</span>;
      default: return <span className="badge-primary">{status}</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Application Tracker</h1>
        <p className="text-gray-400 mt-2">Monitor all your automated and manual applications in one place.</p>
      </div>

      {/* Summary Stats Bar */}
      <div className="card-glass p-6 mb-8">
        <div className="flex flex-wrap gap-8 justify-between">
          {stats.map((stat, i) => (
            <div key={i} className="text-center flex-1">
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Table */}
      <div className="card-glass overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.02]">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {tabs.map((tab, i) => (
              <button 
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  i === 0 ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <input type="text" className="input-field py-1.5 text-sm" placeholder="Search applications..." />
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
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-medium text-white">{app.role}</div>
                    <div className="text-sm text-gray-400">{app.company}</div>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(app.status)}</td>
                  <td className="py-4 px-6 text-sm text-gray-300">{app.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-400">{app.source}</td>
                  <td className="py-4 px-6 text-sm text-gray-400 truncate max-w-[200px]" title={app.note}>
                    {app.note || <span className="text-gray-600 italic">No notes</span>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-500 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-400 bg-white/[0.02]">
          <div>Showing 1 to 8 of 142 applications</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5">Next</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
