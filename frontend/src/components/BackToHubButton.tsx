import Link from "next/link";

export default function BackToHubButton() {
  return (
    // next/link's <Link>, not a plain <a> — safe now that CircuitHUD lives in
    // the root layout (mounted once, persists across every navigation) rather
    // than inside the hub page itself. A full reload here would force that
    // persistent board to remount and rebuild for no reason, which is exactly
    // what the shared-background approach is meant to avoid. (Previously this
    // had to be a plain <a>, back when the hub page owned its own Animator
    // tree wrapping CircuitHUD directly — a client-side transition could
    // reattach that previously-rendered instance instead of remounting it,
    // silently killing the boot animation. That risk doesn't apply here:
    // App Router guarantees layout.tsx never remounts on nested navigation.)
    // prefetch={false}: Next's default prefetching pre-renders the
    // destination ahead of the actual click. Arwes's FrameOctagon
    // (src/components/GlassPanel.tsx, SocialLinks.tsx) re-subscribes to its
    // animator system in a mount-time effect — against a prefetched
    // navigation this left panel frames + social chips stuck invisible
    // (present in the DOM, but never actually drawn in). Disabling
    // prefetch forces a genuine fresh render at click time, same as it got
    // on a hard reload.
    <Link
      href="/"
      prefetch={false}
      className="group fixed left-4 top-4 z-30 flex items-center gap-2 border border-signal/40 bg-black/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-signal backdrop-blur-md transition-all duration-300 hover:border-signal hover:bg-black/50 hover:text-paper hover:shadow-[0_0_14px_rgba(0,240,255,0.55)] sm:left-6 sm:top-6"
      style={{
        clipPath:
          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
      }}
    >
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
        ◂
      </span>
      Return to Hub
    </Link>
  );
}
