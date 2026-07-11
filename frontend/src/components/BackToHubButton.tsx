export default function BackToHubButton() {
  return (
    // Plain <a>, not next/link's <Link>: the hub's Arwes Animator tree only
    // runs its build-in (draw transition, glow, stagger) once on mount. A
    // client-side SPA transition can reattach the previously-rendered hub
    // instance instead of remounting it, so the boot animation never
    // replays. A full navigation guarantees a fresh mount every time.
    <a
      href="/"
      className="group fixed left-4 top-4 z-30 flex items-center gap-2 border border-signal/40 bg-black/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-signal backdrop-blur-md transition-all duration-300 hover:border-signal hover:bg-black/50 hover:text-paper hover:shadow-[0_0_14px_rgba(212,166,87,0.55)] sm:left-6 sm:top-6"
      style={{
        clipPath:
          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
      }}
    >
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
        ◂
      </span>
      Return to Hub
    </a>
  );
}
