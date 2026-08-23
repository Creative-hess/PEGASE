'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowUp, Bot, Menu, Mic, MoreHorizontal, PanelLeftClose, Plus, Send, ShieldCheck, Sparkles, X } from 'lucide-react'

const starterMessages = [
  { role: 'assistant', text: 'Bonjour, je suis Pégase. Comment puis-je vous accompagner aujourd’hui ?' },
  { role: 'user', text: 'J’ai besoin de clarifier mes idées pour un projet.' },
  { role: 'assistant', text: 'Avec plaisir. Commençons par ce qui vous tient le plus à cœur dans ce projet.' },
]
const answers = ['Je vous écoute. Prenons le temps d’explorer cette idée ensemble.', 'Qu’est-ce qui vous semble le plus important à éclaircir maintenant ?', 'Nous pouvons avancer pas à pas, à votre rythme.']

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(starterMessages)
  const [tokens, setTokens] = useState(3)
  const [answerIndex, setAnswerIndex] = useState(0)
  const [typing, setTyping] = useState<number | null>(null)
  const [listening, setListening] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const last = messages[messages.length - 1]
    if (last?.role !== 'assistant') return
    setTyping(messages.length - 1)
    const timer = window.setTimeout(() => setTyping(null), Math.max(900, last.text.length * 24))
    return () => window.clearTimeout(timer)
  }, [messages])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!input.trim() || tokens <= 0) return
    setMessages((current) => [...current, { role: 'user', text: input.trim() }, { role: 'assistant', text: answers[answerIndex % answers.length] }])
    setInput('')
    setTokens((current) => current - 1)
    setAnswerIndex((current) => current + 1)
  }

  return <main className="flex min-h-screen flex-col bg-background text-foreground">
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/70 px-4 md:px-6">
      <div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg p-2 hover:bg-secondary" aria-label="Afficher ou masquer les conversations">{sidebarOpen ? <PanelLeftClose size={19} /> : <Menu size={19} />}</button><a href="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.16em]"><span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Sparkles size={15} /></span>PÉGASE<span className="text-muted-foreground">_IA</span></a></div>
      <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-mono text-[11px] font-semibold sm:flex"><span className="size-1.5 rounded-full bg-primary" />{tokens} / 3 tokens</div><button className="rounded-lg p-2 hover:bg-secondary" aria-label="Plus d’options"><MoreHorizontal size={19} /></button></div>
    </header>
    <div className="flex min-h-0 flex-1">
      {sidebarOpen && <aside className="absolute inset-y-16 left-0 z-20 flex w-72 flex-col border-r border-border bg-background md:relative md:inset-y-0"><div className="flex items-center justify-between p-4"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Vos conversations</p><button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 hover:bg-secondary md:hidden" aria-label="Fermer"><X size={17} /></button></div><button className="mx-3 flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"><Plus size={17} /> Nouvelle conversation</button><div className="mt-6 space-y-1 px-3">{['Clarifier mes idées', 'Un projet qui me tient à cœur', 'Faire le point'].map((title, index) => <button key={title} className={`w-full rounded-xl px-3 py-3 text-left ${index === 0 ? 'bg-secondary' : 'hover:bg-secondary/70'}`}><p className="truncate text-sm font-medium">{title}</p><p className="mt-1 text-xs text-muted-foreground">{index === 0 ? 'Aujourd’hui' : index === 1 ? 'Hier' : '12 août 2026'}</p></button>)}</div><div className="mt-auto border-t border-border p-4"><div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-3"><ShieldCheck size={17} /><p className="text-xs leading-5 text-muted-foreground">Vos conversations sont privées et confidentielles.</p></div></div></aside>}
      <section className="flex min-w-0 flex-1 flex-col"><div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5 md:px-8"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Conversation</p><h1 className="mt-1 text-lg font-semibold">Clarifier mes idées</h1></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" />En ligne · confidentiel</div></div><div className="flex-1 overflow-y-auto px-5 pb-8 md:px-8"><div className="mx-auto flex max-w-3xl flex-col gap-6">{messages.map((message, index) => <div key={`${message.text}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>{message.role === 'assistant' && <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-xl bg-secondary"><Bot size={16} /></div>}<div className={`max-w-[82%] rounded-2xl px-4 py-3.5 text-sm leading-7 ${message.role === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md border border-border bg-card'}`}>{message.role === 'assistant' && typing === index ? <Typewriter text={message.text} /> : message.text}</div></div>)}</div></div><div className="border-t border-border bg-background px-5 py-4 md:px-8"><form onSubmit={submit} className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-input bg-card p-2 shadow-sm"><button type="button" onClick={() => setListening(!listening)} className={`grid size-10 shrink-0 place-items-center rounded-xl transition-all ${listening ? 'animate-pulse bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`} aria-label={listening ? 'Arrêter le microphone' : 'Activer le microphone'}><Mic size={17} /></button><input value={input} onChange={(event) => setInput(event.target.value)} disabled={tokens <= 0} placeholder={tokens > 0 ? 'Écrivez ce que vous avez en tête…' : 'Quota atteint — revenez demain'} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60" aria-label="Votre message" /><button type="submit" disabled={!input.trim() || tokens <= 0} className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40" aria-label="Envoyer"><Send size={17} /></button></form><p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">Pégase IA peut se tromper. Ce service ne remplace pas un professionnel de santé.</p></div></section>
    </div>
    {showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-30 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:-translate-y-1" aria-label="Remonter en haut"><ArrowUp size={18} /></button>}
  </main>
}

function Typewriter({ text }: { text: string }) {
  const [visible, setVisible] = useState('')

  useEffect(() => {
    setVisible('')
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setVisible(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, 24)
    return () => window.clearInterval(timer)
  }, [text])

  return <>{visible}<span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-current align-middle" aria-hidden="true" /></>
}
