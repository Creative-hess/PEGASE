import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground"><div className="max-w-lg text-center"><div className="mx-auto mb-8 grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground"><Sparkles /></div><p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Erreur 404</p><h1 className="mt-4 text-5xl font-semibold tracking-tight">Cette page s’est envolée.</h1><p className="mt-5 leading-7 text-muted-foreground">Le lien demandé n’existe pas ou n’est plus disponible.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"><ArrowLeft size={16} /> Retour à l’accueil</Link></div></main>
}
