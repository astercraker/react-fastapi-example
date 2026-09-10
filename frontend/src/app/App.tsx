import { useRef, useState } from "react";
import ThemeToggle from "../core/components/ThemeToggle";
import ChallengeModal from "./ChallengeModal";
import NavMenu, { navLinks } from "./NavMenu";
import "./board.css";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "shipped" | "progress";
  tags: string[];
  isReal?: boolean;
  imageSeed: string;
  rawImage?: boolean;
}

const projects: Project[] = [
  {
    id: "claims",
    title: "Plataforma de Gestión de Siniestros",
    description:
      "Sistema interno para procesar reclamos de seguros de punta a punta, de captura a liquidación.",
    status: "shipped",
    tags: [".NET", "React", "SQL Server"],
    imageSeed: "board-claims",
    rawImage: true,
  },
  {
    id: "inventory",
    title: "Sincronización de Inventario en Tiempo Real",
    description:
      "Servicio que mantiene stock consistente entre tiendas y e-commerce con eventos casi instantáneos.",
    status: "shipped",
    tags: [".NET Core", "React", "Azure"],
    imageSeed: "board-inventory",
  },
  {
    id: "portfolio",
    title: "react-fastapi-example",
    description:
      "Este mismo portafolio. React + Vite en el frontend, FastAPI en el backend, Docker Compose para todo el stack.",
    status: "progress",
    tags: ["Python", "FastAPI", "React", "Docker"],
    isReal: true,
    imageSeed: "board-portfolio",
  },
  {
    id: "reports",
    title: "Pipeline de Reportes Automatizados",
    description:
      "Job en Python que consolida datos operativos y publica reportes programados sin intervención manual.",
    status: "progress",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    imageSeed: "board-reports",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="board-card">
      <div
        className={`board-card-thumb${project.rawImage ? " board-card-thumb--raw" : ""}`}
      >
        <img
          className={`board-card-img${project.rawImage ? " board-card-img--raw" : ""}`}
          src={`https://picsum.photos/seed/${project.imageSeed}/640/360`}
          alt=""
          loading="lazy"
        />
        {project.rawImage && (
          <span className="board-card-thumb-note board-mono">
            sin tratamiento
          </span>
        )}
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

          <nav className="board-desktop-nav" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="board-desktop-nav-link"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="board-header-actions">
            <span className="board-status-pill board-mono">
              <span className="board-status-dot" />
              aceptando nuevas solicitudes
            </span>
            <ThemeToggle className="board-theme-btn" />
            <NavMenu />
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
