import { useEffect, useState } from 'react'
import './settings.css'
import { useI18n, setLang } from '../i18n'

export default function Settings() {
  const [role] = useState(() => window.localStorage.getItem('role') || 'client')
  const [name, setName] = useState(() => window.localStorage.getItem('profile_name') || 'John Doe')
  const [email, setEmail] = useState(() => window.localStorage.getItem('profile_email') || 'john.doe@example.com')
  const [uid, setUid] = useState(() => window.localStorage.getItem('profile_uid') || '')
  const [avatar, setAvatar] = useState(() => window.localStorage.getItem('profile_avatar') || 'https://i.pravatar.cc/80')
  const [subHash, setSubHash] = useState(window.location.hash)
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [verifyPassword, setVerifyPassword] = useState('')
  const [isChangePwOpen, setIsChangePwOpen] = useState(false)
  const [currPw, setCurrPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [newPw2, setNewPw2] = useState('')
  const [editName, setEditName] = useState(name)
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [tempName, setTempName] = useState(editName)
  const [editAvatar, setEditAvatar] = useState(avatar)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('theme') === 'dark')
  const { t, lang } = useI18n()

  useEffect(() => {
    const onHash = () => setSubHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!uid) {
      const gen = String(Math.floor(100000 + Math.random() * 900000))
      setUid(gen)
      window.localStorage.setItem('profile_uid', gen)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const logout = () => {
    window.localStorage.removeItem('role')
    window.location.hash = '#/login'
  }

  return (
    <div className="settings-page">
      <div className="topbar">
        <h1 className="title">{t('settings.title')}</h1>
      </div>

      <div className="settings-content">
        <div className="profile-card">
          <img className="avatar-lg" src={avatar} alt="" />
          <div className="profile-info">
            <div className="profile-name">{name}</div>
            <div className="profile-sub">{email}</div>
            <div className="profile-sub">UID: {uid || '------'}</div>
            <div className="profile-role">{role}</div>
          </div>
          <button className="edit-btn" onClick={() => { setEditName(name); setEditAvatar(avatar); window.location.hash = '#/settings/profile' }}>Edit</button>
        </div>

        <div className="section">
          <div className="section-title">{t('settings.sections.general')}</div>
          <button className="item">
            <div className="item-left">
              <div className="item-title">{t('settings.darkMode.title')}</div>
              <div className="item-sub">{t('settings.darkMode.sub')}</div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => {
                  const next = !darkMode
                  setDarkMode(next)
                  if (next) {
                    document.documentElement.classList.add('dark')
                    window.localStorage.setItem('theme', 'dark')
                  } else {
                    document.documentElement.classList.remove('dark')
                    window.localStorage.setItem('theme', 'light')
                  }
                }}
              />
              <span className="slider" />
            </label>
          </button>
          <button className="item">
            <div className="item-left">
              <div className="item-title">{t('settings.language.title')}</div>
              <div className="item-sub">{lang === 'fil' ? t('settings.language.filipino') : t('settings.language.english')}</div>
            </div>
            <div className="item-right">
              <select className="select" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">{t('settings.language.english')}</option>
                <option value="fil">{t('settings.language.filipino')}</option>
              </select>
            </div>
          </button>
        </div>

        <div className="section">
          <div className="section-title">{t('settings.sections.notifications')}</div>
          <button className="item">
            <div className="item-left">
              <div className="item-title">{t('settings.push.title')}</div>
              <div className="item-sub">{t('settings.push.sub')}</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={pushEnabled} onChange={() => setPushEnabled(!pushEnabled)} />
              <span className="slider" />
            </label>
          </button>
          <button className="item">
            <div className="item-left">
              <div className="item-title">{t('settings.email.title')}</div>
              <div className="item-sub">{t('settings.email.sub')}</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={emailEnabled} onChange={() => setEmailEnabled(!emailEnabled)} />
              <span className="slider" />
            </label>
          </button>
        </div>

        <div className="section">
          <div className="section-title">{t('settings.sections.preferences')}</div>
          <button className="item">
            <div className="item-left">
              <div className="item-title">{t('settings.pref.defaultHomeTab.title')}</div>
              <div className="item-sub">{t('settings.pref.defaultHomeTab.sub')}</div>
            </div>
            <div className="chevron">›</div>
          </button>
          <button className="item">
            <div className="item-left">
              <div className="item-title">{t('settings.pref.dataSaver.title')}</div>
              <div className="item-sub">{t('settings.pref.dataSaver.sub')}</div>
            </div>
            <div className="chevron">›</div>
          </button>
          <button className="item">
            <div className="item-left">
              <div className="item-title">{t('settings.pref.about.title')}</div>
              <div className="item-sub">{t('settings.pref.about.sub')}</div>
            </div>
            <div className="chevron">›</div>
          </button>
        </div>

        <div className="section">
          <div className="section-title">{t('settings.sections.account')}</div>
          <button className="item danger" onClick={logout}>
            <div className="item-left">
              <div className="item-title">{t('settings.account.logout.title')}</div>
              <div className="item-sub">{t('settings.account.logout.sub')}</div>
            </div>
          </button>
          <button className="item ghost">
            <div className="item-left">
              <div className="item-title">{t('settings.account.delete.title')}</div>
              <div className="item-sub">{t('settings.account.delete.sub')}</div>
            </div>
          </button>
        </div>
      </div>

      {subHash.startsWith('#/settings/profile') && (
        <div className="profile-edit-page">
          <div className="edit-topbar">
            <button className="back-btn" onClick={() => { window.location.hash = '#/settings' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div className="edit-title">Edit Profile</div>
            <div style={{ width: 24 }}></div>
          </div>
          
          <div className="edit-content">
            <div className="edit-avatar-wrap">
              <div className="avatar-container">
                <img className="avatar-xl" src={editAvatar} alt="" />
                <label htmlFor="edit-avatar-input" className="avatar-edit-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </label>
                <input 
                  id="edit-avatar-input"
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) {
                      const r = new FileReader()
                      r.onloadend = () => setEditAvatar(String(r.result))
                      r.readAsDataURL(f)
                    }
                  }}
                />
              </div>
            </div>

            <div className="settings-form-group">
              <div className="label-row">
                <label>Full Name</label>
                <button className="icon-btn-sm" onClick={() => { setTempName(editName); setIsNameModalOpen(true) }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
              <div className="readonly-field" onClick={() => { setTempName(editName); setIsNameModalOpen(true) }}>{editName}</div>
            </div>

            <div className="settings-form-group">
              <label>Email Address</label>
              <div className="readonly-field muted">{email}</div>
            </div>

            <div className="settings-form-group">
              <label>User ID (UID)</label>
              <div className="readonly-field muted">{uid}</div>
            </div>

            <div className="divider"></div>

            <button className="action-btn-outline" onClick={() => setIsChangePwOpen(true)}>
              Change Password
            </button>
            
            <button className="action-btn-primary" onClick={() => setIsVerifyOpen(true)}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {isNameModalOpen && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <div className="settings-modal-header">
              <h2>Edit Name</h2>
              <button className="settings-close" onClick={() => setIsNameModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="settings-form-group">
              <label>Name</label>
              <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="settings-save-btn" onClick={() => { setEditName(tempName.trim()); setIsNameModalOpen(false) }}>
                Save
              </button>
              <button className="settings-save-btn" onClick={() => setIsNameModalOpen(false)} style={{ background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isVerifyOpen && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <div className="settings-modal-header">
              <h2>Verify Current Password</h2>
              <button className="settings-close" onClick={() => setIsVerifyOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="settings-form-group">
              <label>Current Password</label>
              <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
            </div>
            <button
              className="settings-save-btn"
              onClick={() => {
                try {
                  const custom = JSON.parse(window.localStorage.getItem('custom_passwords') || '{}')
                  const expected = custom[role] || role
                  if (verifyPassword !== expected) {
                    alert('Incorrect current password')
                    return
                  }
                  const n = editName.trim()
                  if (!n) return
                  setName(n)
                  setAvatar(editAvatar)
                  window.localStorage.setItem('profile_name', n)
                  window.localStorage.setItem('profile_avatar', editAvatar)
                  setIsVerifyOpen(false)
                  window.location.hash = '#/settings'
                } catch {
                  alert('Verification failed')
                }
              }}
            >
              Confirm and Save
            </button>
          </div>
        </div>
      )}

      {isChangePwOpen && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <div className="settings-modal-header">
              <h2>Change Password</h2>
              <button className="settings-close" onClick={() => setIsChangePwOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="settings-form-group">
              <label>Current Password</label>
              <input type="password" value={currPw} onChange={(e) => setCurrPw(e.target.value)} />
            </div>
            <div className="settings-form-group">
              <label>New Password</label>
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
            </div>
            <div className="settings-form-group">
              <label>Confirm New Password</label>
              <input type="password" value={newPw2} onChange={(e) => setNewPw2(e.target.value)} />
            </div>
            <button
              className="settings-save-btn"
              onClick={() => {
                const custom = JSON.parse(window.localStorage.getItem('custom_passwords') || '{}')
                const expected = custom[role] || role
                if (currPw !== expected) {
                  alert('Incorrect current password')
                  return
                }
                if (!newPw || newPw !== newPw2) {
                  alert('New passwords do not match')
                  return
                }
                const next = { ...custom, [role]: newPw }
                window.localStorage.setItem('custom_passwords', JSON.stringify(next))
                setIsChangePwOpen(false)
                setCurrPw('')
                setNewPw('')
                setNewPw2('')
                alert('Password updated. Use your new password next time you login.')
              }}
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      <div className="tabbar">
        <a className="tab" href="#/home">
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5H9v5a2 2 0 0 1-2 2H3z"></path>
          </svg>
          <span>{t('nav.home')}</span>
        </a>
        <a className="tab" href="#/projects">
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <path d="M3 9h18M9 21V9"></path>
          </svg>
          <span>{t('nav.projects')}</span>
        </a>
        <a className="tab active" href="#/settings">
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.07a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.07a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.65 1.65 0 0 0 9 4.6c.19 0 .37-.07.51-.2.32-.28.49-.68.49-1.1V3a2 2 0 1 1 4 0v.07c0 .42.17.82.49 1.1.14.13.32.2.51.2a1.65 1.65 0 0 0 1.82-.33l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.65 1.65 0 0 0 19.4 9c0 .19.07.37.2.51.28.32.68.49 1.1.49H21a2 2 0 1 1 0 4h-.07c-.42 0-.82.17-1.1.49-.13.14-.2.32-.2.51z"></path>
          </svg>
          <span>{t('nav.settings')}</span>
        </a>
      </div>
    </div>
  )
}
