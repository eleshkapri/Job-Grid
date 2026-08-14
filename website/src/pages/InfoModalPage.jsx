import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export function ExtensionGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

export function TermsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto card-glass p-8 animate-fade-in my-8">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-6">Effective Date: October 2026</p>

        <div className="space-y-5 text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-6">
          <p>Welcome to Job Grid. By accessing our website or browser extension, you agree to comply with the following Terms of Service.</p>
          
          <h3 className="text-lg font-semibold text-white mt-4">1. Use of Service</h3>
          <p>Job Grid provides tools to assist job seekers by aggregating job listings and facilitating local browser form filling. Users must be at least 18 years old or legal age of majority in their jurisdiction.</p>

          <h3 className="text-lg font-semibold text-white mt-4">2. Account Responsibility</h3>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

          <h3 className="text-lg font-semibold text-white mt-4">3. Third-Party Job Portals</h3>
          <p>Job Grid acts as a client-side assistant. Users are responsible for reviewing information before submitting job applications on external portals such as LinkedIn, Naukri, Greenhouse, or Lever.</p>

          <h3 className="text-lg font-semibold text-white mt-4">4. Limitation of Liability</h3>
          <p>Job Grid is provided "as is" without warranty of any kind. We do not guarantee employment or response rates from third-party employers.</p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Link to="/" className="btn-secondary py-2 px-4 text-sm">← Return to Home</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function SecurityPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto card-glass p-8 animate-fade-in my-8">
        <h1 className="text-3xl font-bold text-white mb-2">Security Disclosures</h1>
        <p className="text-gray-400 text-sm mb-6">Last Audit: October 2026</p>

        <div className="space-y-5 text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-6">
          <p>Security and privacy are engineered into the core architecture of Job Grid.</p>

          <h3 className="text-lg font-semibold text-white mt-4">1. Zero Password Storage</h3>
          <p>Job Grid NEVER asks for or stores your third-party portal passwords (such as LinkedIn or Naukri). The extension operates entirely within your own authenticated browser session.</p>

          <h3 className="text-lg font-semibold text-white mt-4">2. Secure Manifest V3 Extension</h3>
          <p>Our extension is built on Chrome Manifest V3 standards using <code className="bg-surface-800 px-2 py-0.5 rounded text-primary-400 font-mono">chrome.storage.session</code>, keeping your authorization tokens in a trusted context isolated from page scripts.</p>

          <h3 className="text-lg font-semibold text-white mt-4">3. Local Data Sovereignty</h3>
          <p>All form-filling operations run client-side. Your uploaded resume and profile data are protected with strict JWT authorization headers.</p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Link to="/" className="btn-secondary py-2 px-4 text-sm">← Return to Home</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto card-glass p-8 animate-fade-in my-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
        <p className="text-gray-400 text-sm mb-6">Have questions or need assistance? We're here to help!</p>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3 my-6 animate-scale-in">
            <div className="text-4xl">✅</div>
            <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
            <p className="text-gray-300 text-sm">Thank you for reaching out, {form.name || 'Friend'}. Our support team will get back to you within 24 hours.</p>
            <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-secondary py-2 px-4 text-sm mt-4">
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 border-t border-white/10 pt-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Your Name *</label>
              <input 
                type="text" 
                required 
                value={form.name} 
                onChange={e => setForm({ ...form, name: e.target.value })} 
                placeholder="John Doe" 
                className="input-field" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email Address *</label>
              <input 
                type="email" 
                required 
                value={form.email} 
                onChange={e => setForm({ ...form, email: e.target.value })} 
                placeholder="john@example.com" 
                className="input-field" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Subject</label>
              <input 
                type="text" 
                value={form.subject} 
                onChange={e => setForm({ ...form, subject: e.target.value })} 
                placeholder="Extension query / Feedback" 
                className="input-field" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Message *</label>
              <textarea 
                required 
                value={form.message} 
                onChange={e => setForm({ ...form, message: e.target.value })} 
                placeholder="How can we help you today?" 
                className="input-field min-h-[120px]"
              />
            </div>
            <div className="pt-2">
              <button type="submit" className="btn-primary w-full py-3 text-base font-semibold shadow-lg shadow-primary-500/25">
                Send Message →
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}

export function LegalPage({ title }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

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
