import { useRef, useState } from "react";
import ThemeToggle from "../core/components/ThemeToggle";
import ChallengeModal from "./ChallengeModal";
import "./board.css";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "shipped" | "progress";
  tags: string[];
  isReal?: boolean;
  thumb: "lines" | "rings" | "spark" | "frames";
}

const projects: Project[] = [
  {
    id: "claims",
    title: "Plataforma de Gestión de Siniestros",
    description:
      "Sistema interno para procesar reclamos de seguros de punta a punta, de captura a liquidación.",
    status: "shipped",
    tags: [".NET", "React", "SQL Server"],
    thumb: "lines",
  },
  {
    id: "inventory",
    title: "Sincronización de Inventario en Tiempo Real",
    description:
      "Servicio que mantiene stock consistente entre tiendas y e-commerce con eventos casi instantáneos.",
    status: "shipped",
    tags: [".NET Core", "React", "Azure"],
    thumb: "rings",
  },
  {
    id: "portfolio",
    title: "react-fastapi-example",
    description:
      "Este mismo portafolio. React + Vite en el frontend, FastAPI en el backend, Docker Compose para todo el stack.",
    status: "progress",
    tags: ["Python", "FastAPI", "React", "Docker"],
    isReal: true,
    thumb: "spark",
  },
  {
    id: "reports",
    title: "Pipeline de Reportes Automatizados",
    description:
      "Job en Python que consolida datos operativos y publica reportes programados sin intervención manual.",
    status: "progress",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    thumb: "frames",
  },
];

function ThumbLines() {
  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="160" fill="var(--board-surface-2)" />
      <rect x="24" y="24" width="150" height="10" rx="2" fill="var(--board-border)" />
      <rect x="24" y="46" width="220" height="8" rx="2" fill="var(--board-border)" />
      <rect
        x="24"
        y="72"
        width="352"
        height="64"
        rx="6"
        fill="none"
        stroke="var(--board-accent)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <rect x="40" y="86" width="90" height="8" rx="2" fill="var(--board-accent)" opacity="0.55" />
      <rect x="40" y="102" width="140" height="6" rx="2" fill="var(--board-border)" />
      <rect x="40" y="116" width="110" height="6" rx="2" fill="var(--board-border)" />
    </svg>
  );
}

function ThumbRings() {
  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="160" fill="var(--board-surface-2)" />
      <circle cx="90" cy="80" r="34" fill="none" stroke="var(--board-accent)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="150" cy="80" r="34" fill="none" stroke="var(--board-border)" strokeWidth="1.5" />
      <rect x="210" y="40" width="160" height="10" rx="2" fill="var(--board-border)" />
      <rect x="210" y="62" width="120" height="8" rx="2" fill="var(--board-border)" />
      <rect x="210" y="86" width="140" height="8" rx="2" fill="var(--board-accent)" opacity="0.5" />
    </svg>
  );
}

function ThumbSpark() {
  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="160" fill="var(--board-surface-2)" />
      <path
        d="M24 120 L90 70 L150 96 L220 40 L300 82 L376 30"
        fill="none"
        stroke="var(--board-accent)"
        strokeWidth="2"
      />
      <circle cx="220" cy="40" r="4" fill="var(--board-accent)" />
    </svg>
  );
}

function ThumbFrames() {
  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="160" fill="var(--board-surface-2)" />
      <rect x="24" y="30" width="90" height="100" rx="4" fill="none" stroke="var(--board-border)" strokeWidth="1.5" />
      <rect
        x="126"
        y="30"
        width="90"
        height="60"
        rx="4"
        fill="none"
        stroke="var(--board-accent)"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <rect x="228" y="30" width="90" height="80" rx="4" fill="none" stroke="var(--board-border)" strokeWidth="1.5" />
    </svg>
  );
}

const thumbs = {
  lines: ThumbLines,
  rings: ThumbRings,
  spark: ThumbSpark,
  frames: ThumbFrames,
};

function ProjectCard({ project }: { project: Project }) {
  const Thumb = thumbs[project.thumb];
  return (
    <article className="board-card">
      <div className="board-card-thumb">
        <Thumb />
      </div>
      <div className="board-card-body">
        <div className="board-card-title-row">
          <span className="board-card-title">{project.title}</span>
          <span
            className={`board-tag board-mono ${
              project.status === "shipped"
                ? "board-tag--shipped"
                : "board-tag--progress"
            }`}
          >
            {project.status === "shipped" ? "shipped" : "en curso"}
          </span>
        </div>
        <p className="board-card-desc">
          <span className="board-card-note">
            {project.isReal ? "Real — " : "Ejemplo — "}
          </span>
          {project.description}
        </p>
        <div className="board-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="board-chip board-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function App() {
  const [isChallengeOpen, setChallengeOpen] = useState(false);
  const challengeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="board-page">
      <header className="board-header">
        <div className="board-wrap board-header-row">
          <div className="board-identity">
            <span className="board-name">Domingo Trejo</span>
            <span className="board-role">Desarrollador Fullstack</span>
          </div>
          <div className="board-header-actions">
            <span className="board-status-pill board-mono">
              <span className="board-status-dot" />
              aceptando nuevas solicitudes
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="board-wrap board-hero">
        <h1>
          Diez años entregando sistemas en producción —{" "}
          <span className="board-accent-word">
            ahora migrando esa disciplina a Python.
          </span>
        </h1>
        <p>
          Fullstack senior con base en .NET y React. Estoy adoptando Python y
          FastAPI de forma activa: este mismo sitio corre sobre ese stack.
          Ponme un reto y te muestro cómo trabajo.
        </p>
        <button
          type="button"
          ref={challengeBtnRef}
          className="board-btn board-btn--primary board-hero-cta"
          onClick={() => setChallengeOpen(true)}
        >
          Proponme un reto
        </button>
        <div className="board-chips">
          <span className="board-chip board-chip--accent board-mono">
            Python / FastAPI
          </span>
          <span className="board-chip board-mono">.NET</span>
          <span className="board-chip board-mono">React</span>
          <span className="board-chip board-mono">TypeScript</span>
          <span className="board-chip board-mono">SQL Server</span>
          <span className="board-chip board-mono">Docker</span>
          <span className="board-chip board-mono">Azure</span>
        </div>
      </div>

      <section className="board-wrap board-section">
        <div className="board-section-head">
          <h2>Proyectos</h2>
          <span className="board-section-count board-mono">
            {projects.length} servicios registrados
          </span>
        </div>
        <div className="board-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="board-contact">
        <div className="board-wrap board-contact-row">
          <div>
            <h2>Hablemos de tu proyecto</h2>
            <p>
              Reclutadores, clientes o simple curiosidad técnica — respondo
              directo.
            </p>
          </div>
          <div className="board-contact-actions">
            <a
              className="board-btn board-btn--primary"
              href="mailto:domingo.trejo@hotmail.com"
            >
              Escribir por email
            </a>
            <a
              className="board-btn board-btn--secondary"
              href="https://www.linkedin.com/in/jos%C3%A9-domingo-trejo-fern%C3%A1ndez-35204072/"
              target="_blank"
              rel="noreferrer"
            >
              Ver LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="board-wrap board-footer board-mono">
        <span>domingo.trejo@hotmail.com</span>
      </footer>

      {isChallengeOpen && (
        <ChallengeModal
          onClose={() => setChallengeOpen(false)}
          triggerRef={challengeBtnRef}
        />
      )}
    </div>
  );
}

export default App;
