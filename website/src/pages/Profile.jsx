import { useState, useRef } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

const initialProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  headline: 'Frontend Developer | React & JavaScript Enthusiast',
  summary: 'Recent CS graduate passionate about building beautiful, performant web applications. Experienced with React, Node.js, and modern web technologies.',
  skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'Git', 'Python'],
  linkedin_url: 'https://linkedin.com/in/alexjohnson',
  portfolio_url: 'https://alexjohnson.dev',
  education: [
    { school: 'Stanford University', degree: 'B.S. Computer Science', year: '2024' }
  ],
  experience: [
    { company: 'Tech Startup Inc.', role: 'Frontend Intern', duration: 'Jun 2023 - Aug 2023' }
  ],
}

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile)
  const [newSkill, setNewSkill] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = (e) => {
    e.preventDefault()
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill('')
    }
  }

  const removeSkill = (skill) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }]
    }))
  }

  const updateEducation = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    }))
  }

  const removeEducation = (index) => {
    setProfile(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }))
  }

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '' }]
    }))
  }

  const updateExperience = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    }))
  }

  const removeExperience = (index) => {
    setProfile(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Profile Header */}
        <div className="card-glass flex flex-col sm:flex-row items-center gap-6 animate-slide-up">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center text-3xl font-bold text-white shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
            <p className="text-surface-100/60 mt-1">{profile.headline}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              {profile.skills.slice(0, 5).map(skill => (
                <span key={skill} className="badge badge-primary">{skill}</span>
              ))}
              {profile.skills.length > 5 && (
                <span className="badge badge-primary">+{profile.skills.length - 5} more</span>
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
              <input className="input-field" value={profile.name} onChange={e => updateField('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Email</label>
              <input className="input-field" type="email" value={profile.email} onChange={e => updateField('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Phone</label>
              <input className="input-field" value={profile.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Location</label>
              <input className="input-field" value={profile.location} onChange={e => updateField('location', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Headline & Summary */}
        <div className="card-glass animate-slide-up stagger-2">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="text-primary-400">💼</span> Professional Summary
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Headline</label>
              <input className="input-field" value={profile.headline} onChange={e => updateField('headline', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-surface-100/50 mb-1.5">Summary</label>
              <textarea className="input-field min-h-[100px] resize-y" value={profile.summary} onChange={e => updateField('summary', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-surface-100/50 mb-1.5">LinkedIn URL</label>
                <input className="input-field" value={profile.linkedin_url} onChange={e => updateField('linkedin_url', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-surface-100/50 mb-1.5">Portfolio URL</label>
                <input className="input-field" value={profile.portfolio_url} onChange={e => updateField('portfolio_url', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="card-glass animate-slide-up stagger-3">
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
        <div className="card-glass animate-slide-up stagger-4">
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
                  <input className="input-field text-sm" placeholder="School" value={edu.school} onChange={e => updateEducation(i, 'school', e.target.value)} />
                  <input className="input-field text-sm" placeholder="Degree" value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} />
                  <div className="flex gap-2">
                    <input className="input-field text-sm flex-1" placeholder="Year" value={edu.year} onChange={e => updateEducation(i, 'year', e.target.value)} />
                    <button onClick={() => removeEducation(i)} className="text-red-400 hover:text-red-300 transition-colors px-2">✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="card-glass animate-slide-up stagger-5">
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
                  <input className="input-field text-sm" placeholder="Role" value={exp.role} onChange={e => updateExperience(i, 'role', e.target.value)} />
                  <div className="flex gap-2">
                    <input className="input-field text-sm flex-1" placeholder="Duration" value={exp.duration} onChange={e => updateExperience(i, 'duration', e.target.value)} />
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
            <div className="text-4xl mb-3">📄</div>
            <p className="text-white font-medium">Click to upload your resume</p>
            <p className="text-surface-100/40 text-sm mt-1">PDF, DOC, or DOCX (max 5MB)</p>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" />
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
  )
}
