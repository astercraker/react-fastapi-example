import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../core/components/ThemeToggle";

interface Idea {
  id: number;
  text: string;
}

const initialIdeas: Idea[] = [
  {
    id: 1,
    text: "Exportar los reportes del dashboard directo a PDF.",
  },
  {
    id: 2,
    text: "Avisar por correo cuando el estado de una tarea cambie.",
  },
  {
    id: 3,
    text: "Agregar un modo oscuro que se recuerde por usuario.",
  },
];

function IdeaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.472V16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.528A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

const GLOW_SIZE = 520;

function App() {
  const [text, setText] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [glowVisible, setGlowVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      glowRef.current?.style.setProperty(
        "transform",
        `translate(${e.clientX - GLOW_SIZE / 2}px, ${e.clientY - GLOW_SIZE / 2}px)`,
      );
      setGlowVisible(true);
    }
    function handleLeave() {
      setGlowVisible(false);
    }
    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  function handleSubmit() {
    const value = text.trim();
    if (!value) return;
    setIdeas((prev) => [{ id: Date.now(), text: value }, ...prev]);
    setText("");
  }

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -z-10 rounded-full transition-opacity duration-300"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          opacity: glowVisible ? 1 : 0,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <nav className="flex items-center justify-between px-8 py-[18px] border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] rounded-[7px] bg-[var(--accent)] flex items-center justify-center text-white text-[13px] font-semibold">
            P
          </div>
          <span className="font-semibold text-[16px] text-[var(--text-h)] tracking-[-0.2px]">
            Proyecto
          </span>
        </div>
        <div className="flex items-center gap-7 text-sm">
          <a
            href="#"
            className="text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
          >
            Inicio
          </a>
          <a
            href="#"
            className="text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
          >
            Proyectos
          </a>
          <a href="#" className="text-[var(--text-h)]">
            Ideas
          </a>
          <a
            href="#"
            className="text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
          >
            Acerca de
          </a>
        </div>
        <div className="w-[104px] flex justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center gap-8 px-6 py-16">
        <div className="flex flex-col items-center gap-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
              boxShadow:
                "0 0 50px 6px color-mix(in srgb, var(--accent) 45%, transparent), inset 0 0 18px color-mix(in srgb, var(--accent) 30%, transparent)",
              border: "1px solid var(--accent-border)",
            }}
          >
            <IdeaIcon className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h1 className="text-balance !text-[32px] !my-0">
            ¿Qué idea tienes para el proyecto?
          </h1>
          <p className="text-[15px] text-[var(--text)]">
            Cuéntanosla y te ayudamos a desarrollarla.
          </p>
        </div>

        <div className="prompt-box w-full max-w-[640px] flex flex-col gap-4 p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ej: una vista de calendario para planear los sprints..."
            rows={3}
            className="w-full resize-none bg-transparent outline-none text-[17px] text-[var(--text-h)] placeholder:text-[var(--text)]"
          />
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[var(--text)]">
              Sé tan específico como quieras
            </span>
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              aria-label="Enviar idea"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[var(--accent)] disabled:opacity-[0.35] disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer"
            >
              <SendIcon />
            </button>
          </div>
        </div>

        <div className="w-full max-w-[900px] flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wider text-[var(--text)]">
            Ideas recientes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="flex flex-col gap-3 rounded-2xl p-4 text-left"
                style={{
                  background: "var(--code-bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--accent-bg)]">
                  <IdeaIcon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <p className="text-sm text-[var(--text-h)] leading-relaxed">
                  {idea.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
