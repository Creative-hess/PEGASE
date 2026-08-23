'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCcw, Sparkles } from 'lucide-react'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('[v0] Pégase IA error boundary') }, [])
  return <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground"><div className="max-w-lg text-center"><div className="mx-auto mb-8 grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground"><Sparkles /></div><p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Erreur 500</p><h1 className="mt-4 text-4xl font-semibold tracking-tight">Un instant, Pégase reprend son souffle.</h1><p className="mt-5 leading-7 text-muted-foreground">Une erreur inattendue est survenue.</p><div className="mt-8 flex justify-center gap-3"><button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"><RefreshCcw size={16} /> Réessayer</button><Link href="/" className="rounded-full border border-border px-5 py-3 text-sm font-medium">Accueil</Link></div></div></main>
}
