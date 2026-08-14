import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export function ExtensionGuide() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto card-glass p-8 animate-fade-in my-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            🧩
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Job Grid Assist Extension Guide</h1>
            <p className="text-gray-400 text-sm">How to install & use the Chrome extension</p>
          </div>
        </div>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-6">
          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-2">
            <h3 className="font-semibold text-white text-base">Step 1: Enable Developer Mode in Chrome</h3>
            <p>Open Google Chrome and navigate to <code className="bg-surface-800 px-2 py-0.5 rounded text-primary-400 font-mono">chrome://extensions</code> in your URL bar. Toggle the <strong>Developer mode</strong> switch in the top right corner.</p>
          </div>

          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-2">
            <h3 className="font-semibold text-white text-base">Step 2: Load Unpacked Extension</h3>
            <p>Click <strong>Load unpacked</strong> in the top left corner, then select your local extension directory:</p>
            <p className="font-mono bg-surface-900 p-2 rounded text-accent-400 text-xs select-all">d:\auto apply\extension</p>
          </div>

          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-2">
            <h3 className="font-semibold text-white text-base">Step 3: Autofill Applications</h3>
            <p>Navigate to any job posting on <strong>LinkedIn Easy Apply</strong> or <strong>Naukri</strong>. Click the floating <span className="badge-primary">Job Grid Fill</span> button to pre-fill your form automatically!</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
          <Link to="/jobs" className="btn-secondary py-2 px-4 text-sm">← Back to Jobs</Link>
          <Link to="/profile" className="btn-primary py-2 px-6 text-sm">Edit Profile First →</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function LegalPage({ title, type }) {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto card-glass p-8 animate-fade-in my-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400 text-sm mb-6">Last updated: October 2026</p>

        <div className="space-y-4 text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-6">
          <p>Welcome to Job Grid. Your privacy, security, and transparent data control are our highest priorities.</p>
          <h3 className="text-lg font-semibold text-white mt-4">1. Data Ownership & Storage</h3>
          <p>Your candidate profile, resume details, and application logs are stored locally on your system and connected securely to your account. We never sell your personal information or store unencrypted passwords.</p>

          <h3 className="text-lg font-semibold text-white mt-4">2. Client-Side Automation</h3>
          <p>The Job Grid extension executes form-filling locally within your own browser session. No credentials or session tokens are stored on external servers, keeping interactions safe, human-verified, and legal.</p>

          <h3 className="text-lg font-semibold text-white mt-4">3. User Responsibility</h3>
          <p>Users remain responsible for reviewing pre-filled application forms before clicking submit on third-party portals like LinkedIn or Naukri.</p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Link to="/" className="btn-secondary py-2 px-4 text-sm">← Return to Home</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
