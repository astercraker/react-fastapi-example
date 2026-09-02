import ThemeToggle from "../core/components/ThemeToggle";

function GlobeIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
  );
}

function Dashboard() {
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-[18px] border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] rounded-[7px] bg-[var(--accent)] flex items-center justify-center text-white text-[13px] font-semibold">
            P
          </div>
          <span className="font-semibold text-[16px] text-[var(--text-h)] tracking-[-0.2px]">
            Dashboard
          </span>
        </div>
        <ThemeToggle />
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
            <GlobeIcon className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h1 className="text-balance !text-[32px] !my-0">
            Visitantes por país
          </h1>
          <p className="text-[15px] text-[var(--text)]">
            De dónde nos visitan, actualizado en tiempo real.
          </p>
        </div>

        <div
          className="w-full max-w-[900px] flex flex-col items-center justify-center gap-3 rounded-2xl p-16 text-center"
          style={{
            background: "var(--code-bg)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-sm text-[var(--text)]">
            El mapa se conectará aquí una vez esté listo el endpoint de
            estadísticas.
          </p>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
