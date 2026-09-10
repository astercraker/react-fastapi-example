import { useEffect, useState } from "react";

function RetosIcon() {
  return (
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.472V16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.528A6 6 0 0 0 12 3Z" />
  );
}
function BlogIcon() {
  return (
    <>
      <path d="M6 3h9l3 3v15H6Z" />
      <path d="M15 3v4h4M9 12h6M9 16h6" />
    </>
  );
}
function AgendaIcon() {
  return (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  );
}
function HerramientasIcon() {
  return (
    <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.5-.7-.7-2.5 2.1-2.1Z" />
  );
}

/**
 * Mockup only: hrefs are placeholders. Real routing (react-router-dom)
 * gets wired in separately — swap for <Link to="..."> then.
 */
export const navLinks = [
  { label: "Retos", href: "/retos", Icon: RetosIcon },
  { label: "Blog", href: "/blog", Icon: BlogIcon },
  { label: "Agenda", href: "/agenda", Icon: AgendaIcon },
  { label: "Herramientas", href: "/herramientas", Icon: HerramientasIcon },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      className="w-[22px] h-[22px]"
    >
      <line
        x1="3"
        y1="7"
        x2="21"
        y2="7"
        className={`board-hamburger-bar${isOpen ? " is-open-top" : ""}`}
      />
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        className={`board-hamburger-bar${isOpen ? " is-open-mid" : ""}`}
      />
      <line
        x1="3"
        y1="17"
        x2="21"
        y2="17"
        className={`board-hamburger-bar${isOpen ? " is-open-bottom" : ""}`}
      />
    </svg>
  );
}

export function BottomTabBar() {
  return (
    <nav className="board-tabbar" aria-label="Navegación principal">
      {navLinks.map(({ label, href, Icon }) => (
        <a key={href} className="board-tabbar-link" href={href}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <Icon />
          </svg>
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function NavMenu() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="board-nav">
      <button
        type="button"
        className="board-hamburger"
        aria-expanded={isOpen}
        aria-controls="board-mobile-menu"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <nav
          id="board-mobile-menu"
          className="board-mobile-menu"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="board-mobile-menu-link"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

export default NavMenu;
