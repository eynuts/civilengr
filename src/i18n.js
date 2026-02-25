import { useEffect, useState } from 'react'

let lang = (typeof window !== 'undefined' && window.localStorage.getItem('lang')) || 'en'
const listeners = new Set()

export function getLang() {
  return lang
}

export function setLang(next) {
  lang = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('lang', next)
  }
  listeners.forEach((fn) => fn(lang))
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useI18n() {
  const [current, setCurrent] = useState(getLang())
  useEffect(() => subscribe(setCurrent), [])
  return { lang: current, t }
}

const dict = {
  en: {
    nav: { home: 'Home', projects: 'Projects', settings: 'Settings' },
    login: {
      title: 'Welcome',
      username: 'Username',
      password: 'Password',
      submit: 'LOG IN',
      forgot: 'Forgot Password?',
      signupPrompt: 'Don’t have an account?',
      signupLink: 'Sign Up',
    },
    signup: {
      title: 'Create Account',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      roleLabel: 'Role:',
      roles: { Engineer: 'Engineer', Contractor: 'Contractor', Client: 'Client' },
      submit: 'SIGN UP',
      terms: 'Terms & Privacy Policy',
      haveAccount: 'Already have an account?',
      loginLink: 'Log In',
      passwordAria: 'Hold to show password',
    },
    home: { feedTitle: 'Home Feed' },
    projects: {
      pageTitle: 'Projects',
      progress: 'Progress',
      viewDetails: 'View Details',
      chat: 'Chat',
      upload: 'Upload',
      members: 'Members',
      invite: 'Invite Member',
      inviteUidPlaceholder: 'Enter 6-digit UID',
      roles: { Engineer: 'Engineer', Contractor: 'Contractor', Client: 'Client' },
      modal: {
        addTitle: 'Add New Project',
        labels: { projectName: 'Project Name', location: 'Location', projectImage: 'Project Image' },
        placeholders: { projectName: 'Enter project name', location: 'City, Province' },
        uploadTap: 'Tap to upload image',
        submit: 'Create Project',
      },
      status: { 'In Progress': 'In Progress', Completed: 'Completed', Pending: 'Pending' },
      details: {
        title: 'Project Details',
        posts: 'Posts',
        addPost: 'Add Post',
        writeUpdate: 'Write an update',
        uploadImage: 'Upload Image',
        submitPost: 'Post',
        actions: { like: 'Like', comment: 'Comment' },
        uploadModal: {
          title: 'Upload Update',
          description: 'Description',
          photo: 'Capture Photo',
          photoTap: 'Open Camera to Take Photo',
          percentage: 'Progress (%)',
          submit: 'Upload',
        },
      },
    },
    settings: {
      title: 'Settings',
      sections: { general: 'General', notifications: 'Notifications', preferences: 'Preferences', account: 'Account Settings' },
      darkMode: { title: 'Dark Mode', sub: 'Reduce glare and save battery' },
      language: { title: 'Language', english: 'English', filipino: 'Filipino' },
      push: { title: 'Push Notifications', sub: 'Real-time project updates' },
      email: { title: 'Email Alerts', sub: 'Daily summary reports' },
      pref: {
        defaultHomeTab: { title: 'Default Home Tab', sub: 'Home' },
        dataSaver: { title: 'Data Saver', sub: 'Optimize for low bandwidth' },
        about: { title: 'About', sub: 'Version 1.0.0' },
      },
      account: { logout: { title: 'Log Out', sub: 'Return to login' }, delete: { title: 'Delete Account', sub: 'Remove personal data' } },
    },
  },
  fil: {
    nav: { home: 'Bahay', projects: 'Mga Proyekto', settings: 'Mga Setting' },
    login: {
      title: 'Maligayang Pagdating',
      username: 'Pangalan ng Gumagamit',
      password: 'Password',
      submit: 'Mag-login',
      forgot: 'Nakalimutan ang Password?',
      signupPrompt: 'Wala pang account?',
      signupLink: 'Mag-sign up',
    },
    signup: {
      title: 'Gumawa ng Account',
      fullName: 'Buong Pangalan',
      email: 'Email Address',
      password: 'Password',
      roleLabel: 'Tungkulin:',
      roles: { Engineer: 'Inhinyero', Contractor: 'Kontraktor', Client: 'Kliyente' },
      submit: 'Mag-sign up',
      terms: 'Mga Tuntunin at Patakaran sa Privacy',
      haveAccount: 'May account na?',
      loginLink: 'Mag-login',
      passwordAria: 'Hawakan upang ipakita ang password',
    },
    home: { feedTitle: 'Feed sa Bahay' },
    projects: {
      pageTitle: 'Mga Proyekto',
      progress: 'Pag-unlad',
      viewDetails: 'Tingnan ang detalye',
      chat: 'Chat',
      upload: 'Mag-upload',
      members: 'Mga Miyembro',
      invite: 'Mag-imbita ng Miyembro',
      inviteUidPlaceholder: 'Ilagay ang 6-digit UID',
      roles: { Engineer: 'Inhinyero', Contractor: 'Kontraktor', Client: 'Kliyente' },
      modal: {
        addTitle: 'Magdagdag ng Bagong Proyekto',
        labels: { projectName: 'Pangalan ng Proyekto', location: 'Lokasyon', projectImage: 'Larawan ng Proyekto' },
        placeholders: { projectName: 'Ilagay ang pangalan ng proyekto', location: 'Lungsod, Probinsya' },
        uploadTap: 'Tapikin upang mag-upload ng larawan',
        submit: 'Gumawa ng Proyekto',
      },
      status: { 'In Progress': 'Isinasagawa', Completed: 'Tapos', Pending: 'Nakahanda' },
      details: {
        title: 'Detalye ng Proyekto',
        posts: 'Mga Post',
        addPost: 'Mag-post',
        writeUpdate: 'Sumulat ng update',
        uploadImage: 'Mag-upload ng Larawan',
        submitPost: 'I-post',
        actions: { like: 'Gusto', comment: 'Komento' },
        uploadModal: {
          title: 'Mag-upload ng Update',
          description: 'Deskripsyon',
          photo: 'Kunan ng Larawan',
          photoTap: 'Buksan ang Camera para Kumuha ng Larawan',
          percentage: 'Pag-unlad (%)',
          submit: 'I-upload',
        },
      },
    },
    settings: {
      title: 'Mga Setting',
      sections: { general: 'Pangkalahatan', notifications: 'Mga Notipikasyon', preferences: 'Mga Kagustuhan', account: 'Mga Setting ng Account' },
      darkMode: { title: 'Madilim na Mode', sub: 'Bawasan ang liwanag at makatipid sa baterya' },
      language: { title: 'Wika', english: 'English', filipino: 'Filipino' },
      push: { title: 'Mga Push Notification', sub: 'Mga update ng proyekto sa real-time' },
      email: { title: 'Mga Alerto sa Email', sub: 'Araw-araw na ulat' },
      pref: {
        defaultHomeTab: { title: 'Default na Tab sa Bahay', sub: 'Bahay' },
        dataSaver: { title: 'Pagtipid ng Data', sub: 'I-optimize para sa mababang bandwidth' },
        about: { title: 'Tungkol', sub: 'Bersyon 1.0.0' },
      },
      account: { logout: { title: 'Mag-logout', sub: 'Bumalik sa login' }, delete: { title: 'Burahin ang Account', sub: 'Tanggalin ang personal na data' } },
    },
  },
}

export function t(key) {
  const source = dict[getLang()] || dict.en
  const fallback = dict.en
  const resolve = (obj, path) => path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj)
  return resolve(source, key) ?? resolve(fallback, key) ?? key
}
