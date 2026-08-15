import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../features/auth/AuthContext';

const POPULAR_LOCATIONS = [
  'Remote',
  'Bangalore, India',
  'Delhi NCR, India',
  'Mumbai, India',
  'Hyderabad, India',
  'Pune, India',
  'United States',
  'United Kingdom',
  'Canada',
];

function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

const initialProfile = {
  name: '',
  email: '',
  phone: '',
  location: '',
  preferred_location: '',
  remote_only: false,
  headline: '',
  summary: '',
  skills: [],
  linkedin_url: '',
  portfolio_url: '',
  education: [],
  experience: [],
  resume_path: ''
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [customLocInput, setCustomLocInput] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [toast, setToast] = useState('');
  const fileRef = useRef(null);

  const { user, token, updateUser } = useAuth();

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        setProfile(prev => ({
          ...prev,
          name: prev.name || user.name || '',
          email: prev.email || user.email || ''
        }));
      }

      if (!token) return;
      try {
        const res = await fetch('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(prev => ({
            ...prev,
            ...data,
            name: data.name || user?.name || prev.name,
            email: data.email || user?.email || prev.email,
            skills: typeof data.skills === 'string' ? JSON.parse(data.skills) : (data.skills || prev.skills),
            education: typeof data.education === 'string' ? JSON.parse(data.education) : (data.education || prev.education),
            experience: typeof data.experience === 'string' ? JSON.parse(data.experience) : (data.experience || prev.experience),
            preferred_location: data.preferred_location || prev.preferred_location,
            remote_only: Boolean(data.remote_only),
            resume_path: data.resume_path || prev.resume_path
          }));
          if (data.resume_path) {
            const parts = data.resume_path.split(/[/\\]/);
            setResumeName(parts[parts.length - 1]);
          }
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    }
    fetchProfile();
  }, [token, user]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (e) => {
    const capitalized = capitalizeWords(e.target.value);
    setProfile(prev => ({ ...prev, name: capitalized }));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }]
    }));
  };

  const updateEducation = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (index) => {
    setProfile(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '' }]
    }));
  };

  const updateExperience = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (index) => {
    setProfile(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const handleResumeFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('resume', file);

    setUploadingResume(true);
    try {
      const res = await fetch('/api/profile/resume', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(prev => ({ ...prev, resume_path: data.resume_path }));
        setResumeName(file.name);
        showToast('Resume uploaded successfully!');
      } else {
        showToast(data.error || 'Failed to upload resume');
      }
    } catch (err) {
      showToast('Error uploading resume file');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    if (token) {
      try {
        const res = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...profile,
            skills: JSON.stringify(profile.skills),
            education: JSON.stringify(profile.education),
            experience: JSON.stringify(profile.experience)
          })
        });
        if (res.ok) {
          const updated = await res.json();
          setProfile(prev => ({
            ...prev,
            ...updated,
            skills: typeof updated.skills === 'string' ? JSON.parse(updated.skills) : (updated.skills || prev.skills),
            education: typeof updated.education === 'string' ? JSON.parse(updated.education) : (updated.education || prev.education),
            experience: typeof updated.experience === 'string' ? JSON.parse(updated.experience) : (updated.experience || prev.experience),
            preferred_location: updated.preferred_location || prev.preferred_location,
            remote_only: Boolean(updated.remote_only)
          }));
          if (updateUser) {
            updateUser({ name: updated.name, email: updated.email });
          }
          showToast('Profile updated live across all sections!');
        }
      } catch (err) {
        console.error('API profile save error:', err);
      }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const avatarInitial = (profile.name || user?.name || 'U').trim().charAt(0).toUpperCase();

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-primary-400 animate-slide-down flex items-center gap-2">
          <span>✓</span> {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Profile Header */}
        <div className="card-glass flex flex-col sm:flex-row items-center gap-6 animate-slide-up">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-lg shadow-primary-500/20">
            {avatarInitial}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-white">{profile.name || user?.name || 'Your Profile'}</h1>
            <p className="text-surface-100/60 mt-1">{profile.headline || 'Add a professional headline...'}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              {profile.preferred_location && (
                <span className="badge badge-success">📍 {profile.preferred_location}</span>
              )}
              {profile.remote_only && (
                <span className="badge badge-warning">⚡ Remote Only</span>
              )}
              {resumeName && (
                <span className="badge badge-primary">📄 Resume Uploaded</span>
              )}
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="card-glass animate-slide-up stagger-1">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="text-primary-400">👤</span> Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Full Name</label>
              <input className="input-field" value={profile.name} onChange={handleNameChange} placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Email</label>
              <input className="input-field" type="email" value={profile.email} onChange={e => updateField('email', e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Phone</label>
              <input className="input-field" value={profile.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Current City</label>
              <input className="input-field" value={profile.location} onChange={e => updateField('location', e.target.value)} placeholder="e.g. Bangalore, India" />
            </div>
          </div>
        </div>

        {/* Preferred Work Location Section */}
        <div className="card-glass animate-slide-up stagger-2 border-primary-500/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-accent-400">📍</span> Preferred Work Location / Country
            </h2>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-primary-400">
              <input 
                type="checkbox" 
                checked={profile.remote_only} 
                onChange={e => updateField('remote_only', e.target.checked)}
                className="w-4 h-4 accent-primary-500 rounded cursor-pointer" 
              />
              <span className="font-medium">Remote Only</span>
            </label>
          </div>

          <p className="text-gray-400 text-sm mb-4">Select your default work destination. This will pre-fill location filters on Job Grid, LinkedIn, and Naukri.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {POPULAR_LOCATIONS.map(loc => (
              <button
                key={loc}
                type="button"
                onClick={() => updateField('preferred_location', loc)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  profile.preferred_location === loc
                    ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-surface-800/80 border-white/10 text-gray-300 hover:border-primary-400'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Or type a city, state, or country (e.g. Toronto, Canada)..."
              value={customLocInput}
              onChange={e => setCustomLocInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && customLocInput.trim()) {
                  e.preventDefault();
                  updateField('preferred_location', customLocInput.trim());
                  setCustomLocInput('');
                }
              }}
              className="input-field text-sm flex-1"
            />
            <button 
              type="button"
              onClick={() => {
                if (customLocInput.trim()) {
                  updateField('preferred_location', customLocInput.trim());
                  setCustomLocInput('');
                }
              }}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Set Location
            </button>
          </div>

          {profile.preferred_location && (
            <div className="text-xs text-accent-400 mt-3 flex items-center gap-1.5">
              <span>✓</span> Currently saved default location: <strong>{profile.preferred_location}</strong> {profile.remote_only ? '(Remote Only)' : ''}
            </div>
          )}
        </div>

        {/* Headline & Summary */}
        <div className="card-glass animate-slide-up stagger-3">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="text-primary-400">💼</span> Professional Summary
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Headline</label>
              <input className="input-field" value={profile.headline} onChange={e => updateField('headline', e.target.value)} placeholder="e.g. Full Stack Developer | React & Node.js" />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Summary</label>
              <textarea className="input-field min-h-[100px] resize-y" value={profile.summary} onChange={e => updateField('summary', e.target.value)} placeholder="Brief summary of your experience and interests..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-surface-100/50 mb-1.5">LinkedIn URL</label>
                <input className="input-field" value={profile.linkedin_url} onChange={e => updateField('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/username" />
              </div>
              <div>
                <label className="block text-sm text-surface-100/50 mb-1.5">Portfolio URL</label>
                <input className="input-field" value={profile.portfolio_url} onChange={e => updateField('portfolio_url', e.target.value)} placeholder="https://yourportfolio.com" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="card-glass animate-slide-up stagger-4">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="text-primary-400">🛠️</span> Skills
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.map(skill => (
              <span key={skill} className="badge badge-primary flex items-center gap-1.5 pr-1.5">
                {skill}
                <button onClick={() => removeSkill(skill)} className="w-4 h-4 rounded-full bg-white/10 hover:bg-red-500/50 flex items-center justify-center text-[10px] transition-colors">×</button>
              </span>
            ))}
          </div>
          <form onSubmit={addSkill} className="flex gap-2">
            <input className="input-field flex-1" placeholder="Add a skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)} />
            <button type="submit" className="btn-primary text-sm px-4">Add</button>
          </form>
        </div>

        {/* Education */}
        <div className="card-glass animate-slide-up stagger-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">🎓</span> Education
            </h2>
            <button onClick={addEducation} className="btn-ghost text-sm">+ Add</button>
          </div>
          <div className="space-y-4">
            {profile.education.map((edu, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input className="input-field text-sm" placeholder="School / University" value={edu.school} onChange={e => updateEducation(i, 'school', e.target.value)} />
                  <input className="input-field text-sm" placeholder="Degree / Field" value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} />
                  <div className="flex gap-2">
                    <input className="input-field text-sm flex-1" placeholder="Graduation Year" value={edu.year} onChange={e => updateEducation(i, 'year', e.target.value)} />
                    <button onClick={() => removeEducation(i)} className="text-red-400 hover:text-red-300 transition-colors px-2">✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="card-glass animate-slide-up stagger-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">💻</span> Experience
            </h2>
            <button onClick={addExperience} className="btn-ghost text-sm">+ Add</button>
          </div>
          <div className="space-y-4">
            {profile.experience.map((exp, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input className="input-field text-sm" placeholder="Company" value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} />
                  <input className="input-field text-sm" placeholder="Role / Position" value={exp.role} onChange={e => updateExperience(i, 'role', e.target.value)} />
                  <div className="flex gap-2">
                    <input className="input-field text-sm flex-1" placeholder="Duration (e.g. 2023 - Present)" value={exp.duration} onChange={e => updateExperience(i, 'duration', e.target.value)} />
                    <button onClick={() => removeExperience(i)} className="text-red-400 hover:text-red-300 transition-colors px-2">✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="card-glass animate-slide-up stagger-6">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="text-primary-400">📎</span> Resume
          </h2>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-primary-400/50 hover:bg-white/[0.02] transition-all"
          >
            <div className="text-4xl mb-3">{uploadingResume ? '⏳' : (resumeName ? '✅' : '📄')}</div>
            <p className="text-white font-medium">
              {uploadingResume ? 'Uploading resume...' : (resumeName ? `Uploaded: ${resumeName}` : 'Click to upload your resume')}
            </p>
            <p className="text-surface-100/40 text-sm mt-1">PDF, DOC, or DOCX (max 5MB)</p>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeFileChange} className="hidden" />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pb-8">
          {saved && (
            <span className="badge badge-success text-sm py-2 px-4 animate-fade-in">✓ Profile saved successfully!</span>
          )}
          <button onClick={handleSave} disabled={saving} className="btn-primary text-lg px-8 py-3.5 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
