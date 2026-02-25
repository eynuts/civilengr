import { useEffect, useState } from 'react'
import './project.css'
import { useI18n } from '../i18n'
import proj01 from '../assets/01.png'
import post02 from '../assets/02.png'

const initialProjects = [
  { 
    id: 1, 
    name: 'Gapan Commercial Plaza', 
    location: 'Gapan, Nueva Ecija', 
    status: 'In Progress',
    progress: 65,
    image: proj01 
  },
  { 
    id: 2, 
    name: 'Nueva Ecija Mall Expansion', 
    location: 'Cabanatuan City', 
    status: 'Pending',
    progress: 10,
    image: proj01 
  },
  { 
    id: 3, 
    name: 'San Isidro Public Market', 
    location: 'San Isidro, Nueva Ecija', 
    status: 'Completed',
    progress: 100,
    image: proj01 
  },
]

export default function Projects() {
  const { t } = useI18n()
  const role = (typeof window !== 'undefined' && window.localStorage.getItem('role')) || 'client'
  const [projects, setProjects] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialProjects
      const saved = JSON.parse(window.localStorage.getItem('projects') || 'null')
      return Array.isArray(saved) && saved.length ? saved : initialProjects
    } catch {
      return initialProjects
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const initialPostsByProject = {
    1: [
      { 
        id: 101, 
        text: 'Structural framework nearing completion. The steel beams are in place.', 
        imagePreview: post02, 
        createdAt: Date.now() - 432000000, 
        likes: 12, 
        liked: true, 
        progress: 55 
      },
      { 
        id: 102, 
        text: 'Electrical and plumbing rough-ins have started on the first floor.', 
        imagePreview: post02, 
        createdAt: Date.now() - 259200000, 
        likes: 8, 
        liked: false, 
        progress: 60 
      },
      { 
        id: 103, 
        text: 'Facade work is scheduled to begin next week. Current progress is on track.', 
        imagePreview: post02, 
        createdAt: Date.now() - 86400000, 
        likes: 20, 
        liked: true, 
        progress: 65 
      }
    ],
    2: [
      { 
        id: 201, 
        text: 'Site clearing and fencing completed. Safety perimeters are established.', 
        imagePreview: post02, 
        createdAt: Date.now() - 604800000, 
        likes: 5, 
        liked: false, 
        progress: 2 
      },
      { 
        id: 202, 
        text: 'Heavy equipment mobilization. Excavators are on site.', 
        imagePreview: post02, 
        createdAt: Date.now() - 345600000, 
        likes: 9, 
        liked: true, 
        progress: 5 
      },
      { 
        id: 203, 
        text: 'Excavation for the foundation has officially begun.', 
        imagePreview: post02, 
        createdAt: Date.now() - 172800000, 
        likes: 15, 
        liked: true, 
        progress: 10 
      }
    ],
    3: [
      { 
        id: 301, 
        text: 'Final paint touches are being applied to the exterior.', 
        imagePreview: post02, 
        createdAt: Date.now() - 518400000, 
        likes: 30, 
        liked: true, 
        progress: 95 
      },
      { 
        id: 302, 
        text: 'All stalls are installed and ready for vendor occupancy.', 
        imagePreview: post02, 
        createdAt: Date.now() - 259200000, 
        likes: 42, 
        liked: true, 
        progress: 98 
      },
      { 
        id: 303, 
        text: 'Project completed! Ready for the grand opening ceremony.', 
        imagePreview: post02, 
        createdAt: Date.now() - 86400000, 
        likes: 55, 
        liked: true, 
        progress: 100 
      }
    ]
  }
  const [postsByProject, setPostsByProject] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialPostsByProject
      const saved = JSON.parse(window.localStorage.getItem('postsByProject') || 'null')
      return saved && typeof saved === 'object' ? saved : initialPostsByProject
    } catch {
      return initialPostsByProject
    }
  })
  const [membersByProject, setMembersByProject] = useState({
    1: { Engineer: ['Juan Dela Cruz'], Contractor: ['BuildWorks Inc.'], Client: ['John Doe'], uids: [] },
    2: { Engineer: ['Maria Santos'], Contractor: ['ACME Construction'], Client: ['Jane Smith'], uids: [] },
    3: { Engineer: ['Leo Reyes'], Contractor: ['Prime Builders'], Client: ['Client A'], uids: [] },
  })
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isMembersOpen, setIsMembersOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    image: null,
    imagePreview: ''
  })
  const [newPost, setNewPost] = useState({ text: '', image: null, imagePreview: '' })
  const [newPostProgress, setNewPostProgress] = useState(0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'text-orange bg-orange-light'
      case 'Completed': return 'text-green bg-green-light'
      case 'Pending': return 'text-gray bg-gray-light'
      default: return 'text-gray bg-gray-light'
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProject({
          ...newProject,
          image: file,
          imagePreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    if (!newProject.name || !newProject.location) return

    const project = {
      id: projects.length + 1,
      name: newProject.name,
      location: newProject.location,
      status: 'Pending',
      progress: 0,
      image: newProject.imagePreview || 'https://images.unsplash.com/photo-1503389152951-9f343605f61e?w=1200&q=80&auto=format&fit=crop'
    }

    setProjects([project, ...projects])
    setIsModalOpen(false)
    setNewProject({ name: '', location: '', image: null, imagePreview: '' })
  }

  const openDetails = (p) => {
    setSelectedProject(p)
    setIsDetailsOpen(true)
  }

  const handlePostImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: file, imagePreview: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const [activeReferenceId, setActiveReferenceId] = useState(null)
  const [activeCommentId, setActiveCommentId] = useState(null)
  const [commentDraft, setCommentDraft] = useState('')

  const handleAddPost = (e) => {
    e.preventDefault()
    if (!selectedProject || !newPost.text.trim()) return

    // Require image
    if (!newPost.image && !newPost.imagePreview) {
      alert(t('projects.details.uploadModal.requirePhoto') || 'Please attach a photo.')
      return
    }

    const key = selectedProject.id
    const existing = postsByProject[key] || []
    const post = {
      id: existing.length + 1,
      text: newPost.text.trim(),
      imagePreview: newPost.imagePreview,
      createdAt: Date.now(),
      likes: 0,
      liked: false,
      progress: Math.max(0, Math.min(100, Number(newPostProgress) || 0)),
      comments: [],
    }
    const next = { ...postsByProject, [key]: [post, ...existing] }
    setPostsByProject(next)
    setNewPost({ text: '', image: null, imagePreview: '' })
    setNewPostProgress(0)
    setIsUploadOpen(false)
  }

  const toggleComments = (postId) => {
    setActiveCommentId(prev => (prev === postId ? null : postId))
    setCommentDraft('')
  }

  const addComment = (postId) => {
    if (!selectedProject) return
    const text = commentDraft.trim()
    if (!text) return
    const key = selectedProject.id
    const list = postsByProject[key] || []
    const roleName = role || 'user'
    const next = list.map((p) => {
      if (p.id !== postId) return p
      const comments = Array.isArray(p.comments) ? p.comments : []
      const newComment = { id: Date.now(), text, author: roleName, createdAt: Date.now() }
      return { ...p, comments: [...comments, newComment] }
    })
    setPostsByProject({ ...postsByProject, [key]: next })
    setCommentDraft('')
  }

  useEffect(() => {
    // Migration: Update old unsplash URLs to new local assets if they exist in localStorage
    const savedProjects = JSON.parse(window.localStorage.getItem('projects') || '[]')
    const savedPosts = JSON.parse(window.localStorage.getItem('postsByProject') || '{}')
    
    let updated = false
    const newProj = savedProjects.map(p => {
      if (typeof p.image === 'string' && p.image.includes('unsplash.com')) {
        updated = true
        return { ...p, image: proj01 }
      }
      return p
    })

    const newPosts = { ...savedPosts }
    Object.keys(newPosts).forEach(pid => {
      newPosts[pid] = newPosts[pid].map(post => {
        if (typeof post.imagePreview === 'string' && post.imagePreview.includes('unsplash.com')) {
          updated = true
          return { ...post, imagePreview: post02 }
        }
        return post
      })
    })

    if (updated) {
      setProjects(newProj)
      setPostsByProject(newPosts)
    }
  }, [])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('postsByProject', JSON.stringify(postsByProject))
      }
    } catch {}
  }, [postsByProject])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('projects', JSON.stringify(projects))
      }
    } catch {}
  }, [projects])

  const toggleLike = (postId) => {
    if (!selectedProject) return
    const key = selectedProject.id
    const list = postsByProject[key] || []
    const next = list.map((p) => {
      if (p.id !== postId) return p
      const liked = !p.liked
      return { ...p, liked, likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1) }
    })
    setPostsByProject({ ...postsByProject, [key]: next })
  }

  return (
    <div className="projects-page">
      {isDetailsOpen ? (
        <div className="feed-header">
          <button className="back-btn" onClick={() => setIsDetailsOpen(false)}>‹</button>
          <div className="feed-title">{selectedProject?.name}</div>
          <div className="feed-actions">
            <button className="invite-btn" onClick={() => setIsMembersOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm8 2c-2.21 0-6.5 1.12-6.5 3.33V19h13v-2.67C22.5 14.12 18.21 13 16 13zm-8 0C5.79 13 1.5 14.12 1.5 16.33V19h7v-2.67C8.5 14.12 6.21 13 8 13z"></path>
                <line x1="12" y1="6" x2="12" y2="10"></line>
                <line x1="10" y1="8" x2="14" y2="8"></line>
              </svg>
            </button>
            
          </div>
        </div>
      ) : (
        <div className="topbar">
          <h1 className="page-title">{t('projects.pageTitle')}</h1>
        </div>
      )}

      <div className="projects-content">
        {isDetailsOpen && selectedProject ? (
          <>
            <div className="project-header" style={{ marginBottom: 8 }}>
              <img className="project-thumb" src={selectedProject.image} alt="" />
              <div className="project-header-info">
                <div className="project-title">{selectedProject.name}</div>
                <div className="project-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"></path>
                    <circle cx="12" cy="11" r="2.5"></circle>
                  </svg>
                  {selectedProject.location}
                </div>
              </div>
            </div>
            <div className="posts-list">
              {(postsByProject[selectedProject.id] || []).sort((a,b) => b.createdAt - a.createdAt).map((post) => (
                <div className="post-item" key={post.id}>
                  <div className="post-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{new Date(post.createdAt).toLocaleString()}</span>
                      {post.imagePreview && (
                        <button 
                          className="reference-btn"
                          onMouseDown={() => setActiveReferenceId(post.id)}
                          onMouseUp={() => setActiveReferenceId(null)}
                          onMouseLeave={() => setActiveReferenceId(null)}
                          onTouchStart={(e) => { e.preventDefault(); setActiveReferenceId(post.id) }}
                          onTouchEnd={(e) => { e.preventDefault(); setActiveReferenceId(null) }}
                          title="Hold to see reference"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                      )}
                    </div>
                    <span>{t('projects.progress')}: {post.progress}%</span>
                  </div>
                  <div className="post-text">{post.text}</div>
                  {post.imagePreview && (
                    <div className={`post-image-container ${activeReferenceId === post.id ? 'show-reference' : ''}`}>
                      <img
                        className="post-image"
                        src={post.imagePreview}
                        alt=""
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = selectedProject.image; }}
                      />
                      <div className="reference-overlay">
                        <img src={selectedProject.image} alt="Reference" />
                        <span className="ref-label">Project Reference</span>
                      </div>
                    </div>
                  )}
                  <div className="post-actions">
                    <button className="post-action" onClick={() => toggleLike(post.id)}>
                      {t('projects.details.actions.like')} • {post.likes}
                    </button>
                    <button className="post-action" onClick={() => toggleComments(post.id)}>
                      {t('projects.details.actions.comment')} • {(post.comments && post.comments.length) || 0}
                    </button>
                  </div>
                  {activeCommentId === post.id && (
                    <div className="comments">
                      <div className="comments-list">
                        {(post.comments || []).map((c) => (
                          <div className="comment-item" key={c.id}>
                            <div className="comment-meta">
                              <span className="comment-author">{c.author}</span>
                              <span className="comment-date">{new Date(c.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="comment-text">{c.text}</div>
                          </div>
                        ))}
                        {(post.comments || []).length === 0 && (
                          <div className="comment-empty">No comments yet.</div>
                        )}
                      </div>
                      <div className="comment-compose">
                        <input
                          type="text"
                          className="comment-input"
                          placeholder="Write a comment..."
                          value={commentDraft}
                          onChange={(e) => setCommentDraft(e.target.value)}
                        />
                        <button
                          className="comment-send"
                          onClick={() => addComment(post.id)}
                          disabled={!commentDraft.trim()}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {(postsByProject[selectedProject.id] || []).length === 0 && (
                <div className="post-item">
                  <div className="post-text" style={{ color: 'var(--muted)' }}>
                    {t('projects.details.posts')}: 0
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="project-list">
            {projects.map(p => (
              <div className="project-card-new" key={p.id}>
                <div className="project-header">
                  <img className="project-thumb" src={p.image} alt="" />
                  <div className="project-header-info">
                    <div className="project-title">{p.name}</div>
                    <div className="project-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                        <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"></path>
                        <circle cx="12" cy="11" r="2.5"></circle>
                      </svg>
                      {p.location}
                    </div>
                  </div>
                  <span className={`status-badge ${getStatusColor(p.status)}`}>
                    {t(`projects.status.${p.status}`)}
                  </span>
                </div>
                
                <div className="progress-section">
                  <div className="progress-label">
                    <span>{t('projects.progress')}</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${p.progress}%` }}></div>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="view-details-btn" onClick={() => openDetails(p)}>
                    {t('projects.viewDetails')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {(role === 'engineer' || role === 'contractor') && isDetailsOpen && (
        <button 
          className="upload-feed" 
          aria-label={t('projects.upload')}
          onClick={() => setIsUploadOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path>
            <polyline points="7 9 12 4 17 9"></polyline>
            <line x1="12" y1="4" x2="12" y2="16"></line>
          </svg>
        </button>
      )}

      {(role === 'engineer' || role === 'contractor') && !isDetailsOpen && (
        <button 
          className="add-project" 
          aria-label="Add project"
          onClick={() => setIsModalOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{t('projects.modal.addTitle')}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddProject}>
              <div className="form-group">
                <label>{t('projects.modal.labels.projectName')}</label>
                <input 
                  type="text" 
                  placeholder={t('projects.modal.placeholders.projectName')}
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('projects.modal.labels.location')}</label>
                <input 
                  type="text" 
                  placeholder={t('projects.modal.placeholders.location')}
                  value={newProject.location}
                  onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('projects.modal.labels.projectImage')}</label>
                <div className="image-upload-container">
                  <input 
                    type="file" 
                    id="project-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                  <label htmlFor="project-image" className="upload-label">
                    {newProject.imagePreview ? (
                      <img src={newProject.imagePreview} alt="Preview" className="image-preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>{t('projects.modal.uploadTap')}</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-btn">{t('projects.modal.submit')}</button>
            </form>
          </div>
        </div>
      )}

      {isUploadOpen && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{t('projects.details.uploadModal.title')}</h2>
              <button className="close-btn" onClick={() => setIsUploadOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddPost}>
              <div className="form-group">
                <label>{t('projects.details.uploadModal.description')}</label>
                <textarea
                  className="composer-textarea"
                  placeholder={t('projects.details.writeUpdate')}
                  value={newPost.text}
                  onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>{t('projects.details.uploadModal.photo')}</label>
                <div className="image-upload-container" style={{ height: 140 }}>
                  <input
                    type="file"
                    id="upload-image"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePostImageUpload}
                    hidden
                  />
                  <label htmlFor="upload-image" className="upload-label">
                    {newPost.imagePreview ? (
                      <img src={newPost.imagePreview} alt="" className="image-preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <span>{t('projects.details.uploadModal.photoTap')}</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {t('projects.details.uploadModal.percentage')}
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{newPostProgress}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={newPostProgress}
                  onChange={(e) => setNewPostProgress(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={!newPost.imagePreview}>
                {t('projects.details.uploadModal.submit')}
              </button>
            </form>
          </div>
        </div>
      )}

      {isMembersOpen && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{t('projects.members')}</h2>
              <button className="close-btn" onClick={() => setIsMembersOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            {['Engineer','Contractor','Client'].map((roleKey) => (
              <div className="form-group" key={roleKey}>
                <label>{t(`projects.roles.${roleKey}`)}</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(membersByProject[selectedProject.id]?.[roleKey] || []).map((m, idx) => (
                    <div className="member-chip" key={idx}>
                      <img
                        className="member-avatar"
                        src={`https://i.pravatar.cc/40?u=${encodeURIComponent(m)}`}
                        alt=""
                      />
                      <span className="member-name">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {(membersByProject[selectedProject.id]?.uids || []).length > 0 && (
              <div className="form-group">
                <label>Invited UIDs</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(membersByProject[selectedProject.id]?.uids || []).map((m, idx) => (
                    <div className="member-chip" key={idx}>
                      <img
                        className="member-avatar"
                        src={`https://i.pravatar.cc/40?u=${encodeURIComponent(m)}`}
                        alt=""
                      />
                      <span className="member-name">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <InviteForm
              t={t}
              projectId={selectedProject.id}
              membersByProject={membersByProject}
              setMembersByProject={setMembersByProject}
            />
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
        <a className="tab active" href="#/projects">
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

function InviteForm({ t, projectId, membersByProject, setMembersByProject }) {
  const [uid, setUid] = useState('')
  const onInvite = (e) => {
    e.preventDefault()
    const clean = uid.trim()
    if (!/^\d{6}$/.test(clean)) return
    const existing = membersByProject[projectId] || { Engineer: [], Contractor: [], Client: [], uids: [] }
    const updatedUids = [...(existing.uids || []), `UID: ${clean}`]
    const next = {
      ...membersByProject,
      [projectId]: { ...existing, uids: updatedUids }
    }
    setMembersByProject(next)
    setUid('')
  }
  return (
    <form onSubmit={onInvite}>
      <div className="form-group">
        <label>{t('projects.invite')}</label>
        <input
          type="text"
          placeholder={t('projects.inviteUidPlaceholder')}
          value={uid}
          maxLength={6}
          inputMode="numeric"
          onChange={(e) => setUid(e.target.value.replace(/\D/g, ''))}
          style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 10 }}
        />
      </div>
      <button type="submit" className="submit-btn">{t('projects.invite')}</button>
    </form>
  )
}
