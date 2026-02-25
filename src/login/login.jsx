import './login.css'
import { useState } from 'react'
import { useI18n } from '../i18n'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useI18n()

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      const custom = JSON.parse(window.localStorage.getItem('custom_passwords') || '{}')
      if (custom[username] && password === custom[username]) {
        window.localStorage.setItem('role', username)
        window.location.hash = '#/home'
        return
      }
    } catch {}
    if (username === 'client' && password === 'client') {
      window.localStorage.setItem('role', 'client')
      window.location.hash = '#/home'
    } else if (username === 'engineer' && password === 'engineer') {
      window.localStorage.setItem('role', 'engineer')
      window.location.hash = '#/home'
    } else if (username === 'contractor' && password === 'contractor') {
      window.localStorage.setItem('role', 'contractor')
      window.location.hash = '#/home'
    } else {
      alert('Invalid username or password')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="12" fill="#fff" stroke="#F28A2B" strokeWidth="2"></circle>
              <path d="M14 7l3.2 7L14 21l-3.2-7z" fill="#2D7FF9"></path>
            </svg>
          </div>
          <div className="brand-name">BuildView</div>
        </div>
        <h1 className="title">{t('login.title')}</h1>
        <form className="form" onSubmit={onSubmit}>
          <input
            className="input"
            type="text"
            placeholder={t('login.username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-container">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder={t('login.password')}
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
          <button className="login-button" type="submit">{t('login.submit')}</button>
        </form>
        <a className="link forgot" href="#">{t('login.forgot')}</a>
        <div className="signup">
          <span>{t('login.signupPrompt')}</span>
          <a className="link" href="#/signup"> {t('login.signupLink')}</a>
        </div>
      </div>
    </div>
  )
}

