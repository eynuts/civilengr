import './App.css'
import { useEffect, useState } from 'react'
import Login from './login/login.jsx'
import SignUp from './sign up/signup.jsx'
import Home from './home/home.jsx'
import Projects from './projects/projects.jsx'
import Settings from './settings/settings.jsx'

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/login')
  const [loading, setLoading] = useState(false)
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const onHashChange = () => {
      setLoading(true)
      setRoute(window.location.hash || '#/login')
      setTimeout(() => setLoading(false), 250)
    }
    window.addEventListener('hashchange', onHashChange)
    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    const timer = setTimeout(() => setBooting(false), 700)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      clearTimeout(timer)
    }
  }, [])

  const key = route.split('?')[0]
  let Screen = Login
  if (route.startsWith('#/home')) Screen = Home
  else if (route.startsWith('#/projects')) Screen = Projects
  else if (route.startsWith('#/settings')) Screen = Settings
  else if (route.startsWith('#/signup')) Screen = SignUp

  if (booting) {
    return (
      <div className="splash-screen">
        <div className="splash-brand">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="#fff" stroke="#F28A2B" strokeWidth="2"></circle>
            <path d="M14 7l3.2 7L14 21l-3.2-7z" fill="#2D7FF9"></path>
          </svg>
          <span>BuildView</span>
        </div>
        <div className="splash-spinner"></div>
      </div>
    )
  }

  return (
    <div className="route-container" key={key}>
      {loading && (
        <div className="route-loader">
          <div className="spinner"></div>
        </div>
      )}
      <Screen />
    </div>
  )
}

export default App
