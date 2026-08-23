function HeaderLinks({ isLoggedIn, setAuthOpen, setSettingsOpen, menuOpen, setMenuOpen }: { isLoggedIn: boolean; setAuthOpen: () => void; setSettingsOpen: () => void; menuOpen: boolean; setMenuOpen: (arg: boolean) => void }) {
  return (
    <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
      <a href="/chat" className="hover:text-foreground">Chat</a>
      <a href="#confiance" className="hover:text-foreground">Notre approche</a>
      <a href="#aide" className="hover:text-foreground">Aide</a>
    </nav>
    <div className="flex items-center gap-2">
      {isLoggedIn && <button onClick={() => setSettingsOpen(true)} className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-sm sm:flex"><Settings size={15} /> Paramètres</button>}
      {!isLoggedIn && <button onClick={() => setAuthOpen(true)} className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground sm:block">Se connecter</button>}
      <button onClick={() => isLoggedIn ? setSettingsOpen(true) : setAuthOpen(true)} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        {isLoggedIn ? 'Connecté' : 'Commencer'}
      </button>
      <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 md:hidden" aria-label="Ouvrir le menu">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  )
}

function HeaderTitle() {
  return (
    <a href="#accueil" className="flex items-center gap-3" aria-label="Pégase IA accueil">
      <img src="/pegase-logo.jpg" alt="Logo Pégase IA" className="size-9 rounded-xl object-cover" />
      <span className="font-mono text-sm font-bold tracking-[0.18em]">PÉGASE<span className="text-primary/55">_IA</span></span>
    </a>
  )
}