import './home.css'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

export default function Home() {
  const { t } = useI18n()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeReferenceId, setActiveReferenceId] = useState(null)

  useEffect(() => {
    const load = () => {
      try {
        setLoading(true)
        const postsByProject = JSON.parse(window.localStorage.getItem('postsByProject') || '{}')
        const projects = JSON.parse(window.localStorage.getItem('projects') || '[]')
        const projById = Object.fromEntries((projects || []).map((p) => [String(p.id), p]))
        const list = []
        Object.entries(postsByProject || {}).forEach(([pid, posts]) => {
          const proj = projById[pid]
          ;(posts || []).forEach((p) => {
            if (!p) return
            list.push({
              id: `${pid}-${p.id}`,
              title: `Project: ${proj?.name || 'Project'}`,
              createdAt: p.createdAt || Date.now(),
              date: new Date(p.createdAt || Date.now()).toLocaleString(),
              place: proj?.location || '',
              image: p.imagePreview || proj?.image || '',
              refImage: proj?.image || '',
            })
          })
        })
        list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        setCards(list)
        setLoading(false)
      } catch {
        setCards([])
        setLoading(false)
      }
    }
    load()
    const onStorage = (e) => {
      if (e.key === 'postsByProject' || e.key === 'projects') load()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <div className="home-page">
      <div className="topbar">
        <div className="brand-left">
          <svg width="22" height="22" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="#fff" stroke="#F28A2B" strokeWidth="2"></circle>
            <path d="M14 7l3.2 7L14 21l-3.2-7z" fill="#2D7FF9"></path>
          </svg>
          <span className="brand-name">BuildView</span>
        </div>
        <img className="avatar" src="https://i.pravatar.cc/40" alt="" />
      </div>

      <div className="home-content">
        <h1 className="feed-title">{t('home.feedTitle')}</h1>
        <div className="card-list">
          {loading && (
            <div className="cards-loading">
              <div className="spinner" />
            </div>
          )}
          {!loading && cards.map((c) => (
            <div className="project-card" key={c.id}>
              <div className={`card-image-container ${activeReferenceId === c.id ? 'show-reference' : ''}`}>
                <img className="card-image" src={c.image} alt="" />
                <div className="reference-overlay">
                  <img src={c.refImage} alt="Reference" />
                  <span className="ref-label">Project Reference</span>
                </div>
              </div>
              <div className="card-body">
                <div className="card-title">{c.title}</div>
                <div className="card-meta">
                  <span className="meta">
                    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {c.date}
                  </span>
                  <span className="meta">
                    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"></path>
                      <circle cx="12" cy="11" r="2.5"></circle>
                    </svg>
                    {c.place}
                  </span>
                </div>
              </div>
              <button 
                className="view-plan" 
                aria-label="View plan"
                onMouseDown={() => setActiveReferenceId(c.id)}
                onMouseUp={() => setActiveReferenceId(null)}
                onMouseLeave={() => setActiveReferenceId(null)}
                onTouchStart={(e) => { e.preventDefault(); setActiveReferenceId(c.id) }}
                onTouchEnd={(e) => { e.preventDefault(); setActiveReferenceId(null) }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          ))}
          {!loading && cards.length === 0 && (
            <div style={{ color: 'var(--muted)', padding: 12 }}>
              No posts yet.
            </div>
          )}
        </div>
      </div>

      <div className="tabbar">
        <a className="tab active" href="#/home">
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
        <a className="tab" href="#/settings">
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
