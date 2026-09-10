import { useEffect, useState } from "react";

/**
 * Mockup only: hrefs are placeholders. Real routing (react-router-dom)
 * gets wired in separately — swap for <Link to="..."> then.
 */
export const navLinks = [
  { label: "Retos", href: "/retos" },
  { label: "Blog", href: "/blog" },
  { label: "Agenda", href: "/agenda" },
  { label: "Herramientas", href: "/herramientas" },
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
