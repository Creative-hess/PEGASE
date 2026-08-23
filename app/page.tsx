'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Bot, Check, CircleHelp, LockKeyhole, Menu, MessageCircle, Settings, ShieldCheck, Sparkles, X } from 'lucide-react'
import clsx from 'clsx'

const starter = [
  { role: 'assistant', text: 'Bonjour, je suis Pégase, une IA psychanalytique. Que souhaitez-vous déposer aujourd’hui ?' },
  { role: 'user', text: 'J’ai besoin de clarifier mes idées pour un projet.' },
  { role: 'assistant', text: 'Écoutons ce que cette situation fait résonner pour vous, à votre rythme.' },
]

function MessageBubble({ message }: { message: { role: string; text: string } }) {
  const isUser = message.role === 'user'
  return (
    <div className="flex gap-3">
      <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6">
        {isUser ? (
          <div className="rounded-br-md bg-primary text-primary-foreground">{message.text}</div>
        ) : (
          <div className="rounded-bl-md bg-secondary text-muted-foreground">{message.text}</div>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokens, setTokens] = useState(3)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(starter)
  const [authOpen, setAuthOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [submissionCount, setSubmissionCount] = useState(0)

  useEffect(() => {
    let last = window.scrollY
    const header = document.querySelector('[data-header]')
    const onScroll = () => { const now = window.scrollY; header?.classList.toggle('-translate-y-full', now > last && now > 80); if (now < last) header?.classList.remove('-translate-y-full'); last = now }
    const stopInspector = (event: KeyboardEvent) => { if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))) event.preventDefault() }
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('keydown', stopInspector)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', stopInspector) }
  }, [])

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() 
    if (!input.trim() || tokens <= 0) return
    
    setSubmissionCount((count) => {
      const newCount = count + 1
      if (newCount >= 3 && !isLoggedIn) {
        setIsLoggedIn(true)
        setTokens(30)
        return 0
      }
      return newCount
    })
    
    setMessages((current) => [...current, { role: 'user', text: input.trim() }, { role: 'assistant', text: 'Je vous écoute. Prenons le temps d’explorer cette idée ensemble.' }]) 
    setInput('') 
    setTokens((value) => value - 1)
  }

  function login() { setIsLoggedIn(true); setTokens(30); setAuthOpen(false); setSubmissionCount(0) }

  return <div className="min-h-screen bg-background text-foreground">
    <header data-header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl transition-transform duration-300"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8"><a href="#accueil" className="flex items-center gap-3" aria-label="Pégase IA accueil"><img src="/pegase-logo.jpg" alt="Logo Pégase IA" className="size-9 rounded-xl object-cover" /><span className="font-mono text-sm font-bold tracking-[0.18em]">PÉGASE<span className="text-primary/55">_IA</span></span></a><nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"><a href="/chat" className="hover:text-foreground">Chat</a><a href="#confiance" className="hover:text-foreground">Notre approche</a><a href="#aide" className="hover:text-foreground">Aide</a></nav><div className="flex items-center gap-2">{isLoggedIn && <button onClick={() => setSettingsOpen(true)} className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-sm sm:flex"><Settings size={15} /> Paramètres</button>}{!isLoggedIn && <button onClick={() => setAuthOpen(true)} className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground sm:block">Se connecter</button>}<button onClick={() => isLoggedIn ? setSettingsOpen(true) : setAuthOpen(true)} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{isLoggedIn ? 'Connecté' : 'Commencer'}</button><button onClick={() => setMenuOpen(!menuOpen)} className="p-2 md:hidden" aria-label="Ouvrir le menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></div>{menuOpen && <div className="border-t border-border bg-background px-5 py-4 md:hidden"><a className="block py-2" href="/chat">Chat</a><a className="block py-2" href="#confiance">Notre approche</a></div>}</header>

    <main id="accueil" className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8"><section className="grid items-center gap-14 pb-28 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:pt-20"><div><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" />Un espace pour vous</div><h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-7xl">Vos pensées méritent <span className="text-muted-foreground">de l’espace.</span></h1><p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">Pégase est une IA psychanalytique qui vous aide à explorer vos pensées, vos associations et ce qui cherche à se dire.</p><a href="/chat" className="mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground">Ouvrir Pégase <ArrowUpRight size={17} /></a></div><div className="mx-auto w-full max-w-[330px] rotate-1 rounded-[2.6rem] border-[7px] border-foreground/80 bg-card p-2 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] lg:max-w-[360px]"><div className="overflow-hidden rounded-[2.1rem] border border-border bg-background"><div className="mx-auto mt-2 h-5 w-24 rounded-full bg-foreground/80" aria-hidden="true" /><div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex items-center gap-3"><img src="/pegase-logo.jpg" alt="Logo de Pégase" className="size-9 rounded-xl object-cover" /><div><p className="text-sm font-semibold">Pégase</p><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">IA psychanalytique</p></div></div><Bot size={18} /></div><div className="h-[390px] space-y-5 overflow-y-auto p-5">{messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}</div><div className="mx-auto mb-2 h-1 w-24 rounded-full bg-foreground/70" aria-hidden="true" /></div></div></section></main>

    <footer className="border-t border-border bg-secondary/20"><div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 lg:px-8"><div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center"><div><div className="flex items-center gap-3 font-mono text-sm font-bold tracking-[0.16em]"><img src="/pegase-logo.jpg" alt="Logo Pégase IA" className="size-10 rounded-xl object-cover" />PÉGASE_IA</div><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">De la clarté, un échange à la fois.</p><div className="mt-5 flex flex-wrap gap-2 text-xs"><a href="#cgu" className="rounded-full border border-border px-3 py-2 hover:bg-secondary">CGU</a><a href="#cookies" className="rounded-full border border-border px-3 py-2 hover:bg-secondary">Cookies</a><a href="#rgpd" className="rounded-full border border-border px-3 py-2 hover:bg-secondary">RGPD</a></div></div><div className="mx-auto w-full max-w-xs rotate-1 rounded-[2.2rem] border-[6px] border-foreground/80 bg-card p-2 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]"><div className="overflow-hidden rounded-[1.7rem] border border-border bg-background"><div className="flex items-center gap-2 border-b border-border px-4 py-3"><img src="/pegase-logo.jpg" alt="" className="size-7 rounded-lg object-cover" /><span className="text-xs font-semibold">Pégase · en ligne</span></div><div className="space-y-3 p-4 text-xs leading-5"><div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground">Vos pensées méritent de l’espace.</div><div className="max-w-[88%] rounded-2xl rounded-bl-md bg-secondary px-3 py-2">Je vous écoute, à votre rythme.</div></div></div></div></div><div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><a href="#aide" className="rounded-full px-4 py-2 hover:bg-secondary hover:text-foreground">Aide</a>{isLoggedIn && <button onClick={() => setAdminOpen(true)} className="rounded-full px-4 py-2 hover:bg-secondary hover:text-foreground">Admin</button>}<button onClick={() => isLoggedIn ? setSettingsOpen(true) : setAuthOpen(true)} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{isLoggedIn ? 'Connecté' : 'Commencer'}</button></div></div></footer>
  </div>
}

function Typewriter({ text }: { text: string }) { const [visible, setVisible] = useState(''); useEffect(() => { let i = 0; const timer = window.setInterval(() => { i += 1; setVisible(text.slice(0, i)); if (i >= text.length) window.clearInterval(timer) }, 24); return () => window.clearInterval(timer) }, [text]); return <>{visible}<span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-current align-middle" aria-hidden="true" /></> }
function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"><div className="mb-5 text-muted-foreground transition-transform group-hover:scale-110">{icon}</div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div> }
function Setting({ title, detail }: { title: string; detail: string }) { const [on, setOn] = useState(false); return <div className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4"><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div><button onClick={() => setOn(!on)} className="grid size-8 place-items-center rounded-full bg-secondary" aria-label={on ? 'Désactiver' : 'Activer'}>{on ? <Check size={15} /> : <span>+</span>}</button></div> }
function Modal({ title, children, close }: { title: string; children: React.ReactNode; close: () => void }) { return <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/20 p-5 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold">{title}</h2><button onClick={close} aria-label="Fermer"><X size={18} /></button></div>{children}</div></div> }
