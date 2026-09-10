import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

type Status = "idle" | "submitting" | "success" | "error";

async function submitChallenge(payload: { idea: string; contact: string }) {
  const res = await fetch(`${API_URL}/challenges`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`request failed: ${res.status}`);
}

function ChallengeModal({
  onClose,
  triggerRef,
}: {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const [idea, setIdea] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!idea.trim() || status === "submitting") return;
    setStatus("submitting");
    try {
      await submitChallenge({ idea: idea.trim(), contact: contact.trim() });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="board-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="board-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-modal-title"
      >
        <div className="board-modal-head">
          <span className="board-mono board-modal-kicker">nuevo ticket</span>
          <span className="board-status-pill board-mono board-modal-status">
            <span className="board-status-dot" />
            abierto
          </span>
          <button
            type="button"
            className="board-modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div className="board-modal-body">
            <h2 id="challenge-modal-title" className="board-modal-title">
              Reto recibido
            </h2>
            <p className="board-modal-success">
              Gracias — lo reviso y te contacto en cuanto tenga algo para
              mostrarte.
            </p>
            <button
              type="button"
              className="board-btn board-btn--primary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form className="board-modal-body" onSubmit={handleSubmit}>
            <h2 id="challenge-modal-title" className="board-modal-title">
              Proponme un reto
            </h2>
            <p className="board-modal-desc">
              Cuéntame qué te gustaría que resuelva. Si tiene solución, te la
              muestro.
            </p>

            <label className="board-field-label" htmlFor="challenge-idea">
              Tu reto
            </label>
            <textarea
              id="challenge-idea"
              ref={textareaRef}
              className="board-textarea"
              rows={5}
              required
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Ej: armá un endpoint que..."
            />

            <label className="board-field-label" htmlFor="challenge-contact">
              Cómo te contacto (opcional)
            </label>
            <input
              id="challenge-contact"
              type="text"
              className="board-input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="email o LinkedIn"
            />

            {status === "error" && (
              <p className="board-modal-error" role="alert">
                No se pudo enviar. Escríbeme directo a{" "}
                <a
                  className="board-modal-error-link"
                  href="mailto:domingo.trejo@hotmail.com"
                >
                  domingo.trejo@hotmail.com
                </a>{" "}
                mientras tanto.
              </p>
            )}

            <div className="board-modal-actions">
              <button
                type="button"
                className="board-btn board-btn--secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="board-btn board-btn--primary"
                disabled={!idea.trim() || status === "submitting"}
              >
                {status === "submitting" ? "Enviando…" : "Enviar reto"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ChallengeModal;
