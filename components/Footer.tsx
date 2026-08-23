function FooterLinks() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
      <div>
        <div className="flex items-center gap-3 font-mono text-sm font-bold tracking-[0.16em]">
          <img src="/pegase-logo.jpg" alt="Logo Pégase IA" className="size-10 rounded-xl object-cover" />PÉGASE_IA
        </div>
        <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">De la clarté, un échange à la fois.</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <a href="#cgu" className="rounded-full border border-border px-3 py-2 hover:bg-secondary">CGU</a>
          <a href="#cookies" className="rounded-full border border-border px-3 py-2 hover:bg-secondary">Cookies</a>
          <a href="#rgpd" className="rounded-full border border-border px-3 py-2 hover:bg-secondary">RGPD</a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-xs rotate-1 rounded-[2.2rem] border-[6px] border-foreground/80 bg-card p-2 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]">
        <div className="overflow-hidden rounded-[1.7rem] border border-border bg-background">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <img src="/pegase-logo.jpg" alt="" className="size-7 rounded-lg object-cover" />
            <span className="text-xs font-semibold">Pégase · en ligne</span>
          </div>
          <div className="space-y-3 p-4 text-xs leading-5">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground">Vos pensées méritent de l’espace.</div>
            <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-secondary px-3 py-2">Je vous écoute, à votre rythme.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FooterActions({ isLoggedIn, setAdminOpen }: { isLoggedIn: boolean; setAdminOpen: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <a href="#aide" className="rounded-full px-4 py-2 hover:bg-secondary hover:text-foreground">Aide</a>
      {isLoggedIn && <button onClick={() => setAdminOpen(true)} className="rounded-full px-4 py-2 hover:bg-secondary hover:text-foreground">Admin</button>}
      <button onClick={() => isLoggedIn ? setSettingsOpen(true) : setAuthOpen(true)} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{isLoggedIn ? 'Connecté' : 'Commencer'}</button>
    </div>
  )
}

export { FooterLinks, FooterActions }