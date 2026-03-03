/**
 * ScreenNavBar — componente único de navegação para todas as telas.
 *
 * Variantes:
 *   "back"  → chevron esquerdo (< )  — navegação de retorno
 *   "close" → ícone X               — dismiss / fechar modal
 *
 * Props:
 *   variant     — obrigatório
 *   onAction    — callback do botão
 *   title?      — texto centralizado opcional
 *   className   — classes extras no wrapper externo
 *   rightAction — botão opcional no lado direito (ex: ícone Info)
 */

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Paths extraídos dos arquivos SVG do Figma (viewBox 0 0 20 20, fill-based)
const BACK_PATH =
  "M5.24408 9.41074L11.9107 2.74408L13.0893 3.92259L7.01184 10L13.0893 16.0774L11.9107 17.2559L5.24408 10.5893C4.91864 10.2638 4.91864 9.73618 5.24408 9.41074Z";

const CLOSE_PATH =
  "M10 11.1785L15.2441 16.4226L16.4226 15.2441L11.1785 10L16.4226 4.75592L15.2441 3.57741L10 8.82149L4.75592 3.57741L3.57741 4.75592L8.82149 10L3.57741 15.2441L4.75592 16.4226L10 11.1785Z";

interface ScreenNavBarProps {
  variant: "back" | "close";
  onAction?: () => void;
  title?: string;
  className?: string;
  rightAction?: ReactNode;
}

export function ScreenNavBar({
  variant,
  onAction,
  title,
  className = "",
  rightAction,
}: ScreenNavBarProps) {
  return (
    <div
      className={`h-[64px] relative shrink-0 w-full ${className}`}
      data-name="Top Bar"
    >
      {/* ── Botão de ação (esquerda) ── */}
      <motion.button
        className="absolute left-[4px] top-1/2 -translate-y-1/2 size-[44px] flex items-center justify-center rounded-full cursor-pointer"
        onClick={onAction}
        initial={{ backgroundColor: "rgba(31, 2, 48, 0)" }}
        whileHover={{ backgroundColor: "rgba(31, 2, 48, 0.05)" }}
        whileTap={{
          scale: 0.88,
          backgroundColor: "rgba(31, 2, 48, 0.10)",
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        data-name={variant === "back" ? "Leading" : "Close"}
        aria-label={variant === "back" ? "Voltar" : "Fechar"}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d={variant === "back" ? BACK_PATH : CLOSE_PATH}
            fill="#1F0230"
            fillOpacity="0.62"
          />
        </svg>
      </motion.button>

      {/* ── Título central (opcional) ── */}
      {title && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[200px] pointer-events-none">
          <p
            className="text-[#1f0230] text-[14px] text-center whitespace-nowrap overflow-hidden text-ellipsis"
            style={{
              fontFamily: "'Nu_Sans_Text', sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
            }}
          >
            {title}
          </p>
        </div>
      )}

      {/* ── Ação direita (opcional) ── */}
      {rightAction && (
        <div className="absolute right-[4px] top-1/2 -translate-y-1/2 z-10">
          {rightAction}
        </div>
      )}
    </div>
  );
}