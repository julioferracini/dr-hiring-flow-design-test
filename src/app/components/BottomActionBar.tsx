/**
 * BottomActionBar — barra de ação inferior padronizada.
 *
 * Modo padrão          → `position: absolute; bottom: 0` — encaixada no container.
 * floatAboveKeyboard   → detecta se está num viewport mobile real (< 768 px) e,
 *                        nesse caso, usa `position: fixed` + `visualViewport` API
 *                        para flutuar exatamente acima do teclado nativo.
 *                        No desktop (frame 375px), mantém absolute; bottom: 0,
 *                        já que lá não existe teclado nativo.
 *
 * Bug corrigido: o `initial` agora parte do bottomOffset *atual* — evita que o
 * botão entre atrás do teclado e precise escalar de baixo para cima.
 */

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tokens } from "../constants";

// ─── Hook: altura do teclado via visualViewport ───────────────────────────────
function useKeyboardHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      // offsetTop cobre o scroll do iOS Safari (o viewport "sobe" quando há scroll)
      const kb = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
      setHeight(kb);
    };

    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  return height;
}

// ─── Hook: detecta mobile real vs desktop ─────────────────────────────────────
// Tailwind md = 768px. Abaixo disso = mobile real (app full-screen no device).
// Acima disso = desktop com o frame de 375px centrado na tela.
function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
}

// ─── Home Indicator ───────────────────────────────────────────────────────────
function HomeIndicatorSpace() {
  return <div className="w-full shrink-0" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }} />;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface BottomActionBarProps {
  buttonLabel: ReactNode;
  onAction?: () => void;
  onDisabledAction?: () => void;
  disabled?: boolean;
  sublabel?: ReactNode;
  immediate?: boolean;
  backgroundColor?: string;
  /**
   * Quando `true`:
   * - Mobile real   → `position: fixed; bottom: keyboardHeight` via spring.
   *   O botão flutua acima do teclado nativo e volta ao fundo ao fechá-lo.
   * - Desktop frame → `position: absolute; bottom: 0` (comportamento padrão,
   *   sem teclado nativo).
   */
  floatAboveKeyboard?: boolean;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function BottomActionBar({
  buttonLabel,
  onAction,
  onDisabledAction,
  disabled = false,
  sublabel,
  immediate = false,
  backgroundColor = "rgba(255,255,255,0.92)",
  floatAboveKeyboard = false,
}: BottomActionBarProps) {
  const keyboardHeight = useKeyboardHeight();
  const isMobile = useIsMobileViewport();
  const isKeyboardOpen = keyboardHeight > 50;

  // Decide a estratégia de posicionamento
  const useFloating = floatAboveKeyboard && isMobile;
  const bottomOffset = useFloating ? keyboardHeight : 0;

  const handleClick = () => {
    if (disabled) {
      onDisabledAction?.();
    } else {
      onAction?.();
    }
  };

  return (
    <motion.div
      // ── Classe de posição ────────────────────────────────────────────────────
      // fixed no mobile (flutua acima do teclado, independente de scroll)
      // absolute no desktop (dentro do frame 375px, sem teclado)
      className={`${
        useFloating ? "fixed left-0 right-0 w-full z-50" : "absolute bottom-0 left-0 right-0 w-full z-20"
      } flex flex-col backdrop-blur-[10px]`}
      style={{ backgroundColor }}

      // ── Entrada: parte SEMPRE da posição correta (acima do teclado se aberto)
      // Evita o bug de entrar atrás do teclado e subir na frente do usuário.
      initial={
        immediate
          ? { opacity: 1, bottom: bottomOffset }
          : { opacity: 0, y: 10, bottom: bottomOffset }
      }

      // ── Posição animada: sobe/desce com o teclado via spring physics ─────────
      animate={
        useFloating
          ? { opacity: 1, y: 0, bottom: bottomOffset }
          : { opacity: 1, y: 0 }
      }

      exit={{ opacity: 0, y: 12 }}

      transition={
        useFloating
          ? {
              // Spring para o bottom → sensação física natural ao abrir/fechar teclado
              bottom: { type: "spring", stiffness: 380, damping: 44, mass: 0.85 },
              opacity: immediate
                ? { duration: 0 }
                : { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] },
            }
          : immediate
          ? { duration: 0 }
          : { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }
      }
      data-name="Bottom Action Bar"
    >
      {/* Divisor topo */}
      <div
        className="h-[1px] w-full shrink-0"
        style={{ backgroundColor: "rgba(31,2,48,0.1)" }}
      />

      {/* Área de conteúdo */}
      <div className="flex flex-col gap-[10px] px-[20px] pt-[16px] pb-[16px] w-full">
        {/* Botão CTA */}
        <motion.button
          className="w-full h-[48px] rounded-[28px] flex items-center justify-center shrink-0 overflow-hidden"
          style={{
            backgroundColor: disabled ? "#c7c7cc" : "#820ad1",
            boxShadow: disabled ? "none" : "0px 2px 12px rgba(130,10,209,0.28)",
            cursor: "pointer",
          }}
          onClick={handleClick}
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <span
            className="text-[16px] text-center overflow-hidden text-ellipsis whitespace-nowrap flex items-center justify-center gap-[2px]"
            style={{
              fontFamily: tokens.fonts.graphik,
              fontWeight: tokens.fontWeights.medium,
              letterSpacing: "-0.16px",
              color: disabled ? "rgba(255,255,255,0.72)" : "#ffffff",
            }}
          >
            {buttonLabel}
          </span>
        </motion.button>

        {/* Sublabel opcional */}
        {sublabel && (
          <motion.div
            className="flex items-center justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.25 }}
          >
            {sublabel}
          </motion.div>
        )}
      </div>

      {/*
        HomeIndicatorSpace — visível quando teclado fechado.
        Ao abrir o teclado, desaparece: o espaço seguro já vem do próprio teclado.
      */}
      <AnimatePresence initial={false}>
        {(!useFloating || !isKeyboardOpen) && (
          <motion.div
            key="home-indicator"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <HomeIndicatorSpace />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}