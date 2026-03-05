/**
 * ScreenTransition — wrapper that applies a transition preset to a screen.
 *
 * Usage:
 *   <ScreenTransition type="slide" screenKey="simulation" direction={direction}>
 *     <SimulationScreen />
 *   </ScreenTransition>
 */

import { motion } from "motion/react";
import { transitionPresets, type TransitionType, type Direction } from "./presets";

interface ScreenTransitionProps {
  type: TransitionType;
  screenKey: string;
  direction?: Direction;
  className?: string;
  children: React.ReactNode;
}

export function ScreenTransition({
  type,
  screenKey,
  direction = "forward",
  className = "absolute inset-0 bg-white",
  children,
}: ScreenTransitionProps) {
  const preset = transitionPresets[type];

  return (
    <motion.div
      key={screenKey}
      custom={preset.usesDirection ? direction : undefined}
      variants={preset.variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={preset.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
