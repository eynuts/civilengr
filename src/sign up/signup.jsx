import './signup.css'
import { useState } from 'react'
import { useI18n } from '../i18n'

export default function SignUp() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Engineer')
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useI18n()

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="12" fill="#fff" stroke="#F28A2B" strokeWidth="2"></circle>
              <path d="M14 7l3.2 7L14 21l-3.2-7z" fill="#2D7FF9"></path>
            </svg>
          </div>
          <div className="brand-name">BuildView</div>
        </div>
        <h1 className="title">{t('signup.title')}</h1>
        <form className="form" onSubmit={onSubmit}>
          <input
            className="input"
            type="text"
            placeholder={t('signup.fullName')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="input"
            type="email"
            placeholder={t('signup.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('signup.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-icon"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
              tabIndex="-1"
              aria-label={t('signup.passwordAria')}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              )}
            </button>
          </div>
          <div className="role-container">
            <span className="role-label">{t('signup.roleLabel')}</span>
            <div className="role-group">
              {['Engineer', 'Contractor', 'Client'].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`role-pill ${role === r ? 'active' : ''}`}
                  onClick={() => setRole(r)}
                >
                  {t(`signup.roles.${r}`)}
                </button>
              ))}
            </div>
          </div>
          <button className="signup-button" type="submit">{t('signup.submit')}</button>
        </form>
        <div className="signin-links">
          <a className="link" href="#/terms">{t('signup.terms')}</a>
        </div>
        <div className="signin-footer">
          <span>{t('signup.haveAccount')}</span>
          <a className="link" href="#/login"> {t('signup.loginLink')}</a>
        </div>
      </div>
    </div>
  )
}
