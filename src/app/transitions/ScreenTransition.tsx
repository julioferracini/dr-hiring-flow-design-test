/**
 * getTransitionProps — returns motion.div props for a given transition preset.
 *
 * Usage:
 *   <motion.div {...screenProps("simulation", direction)} className="absolute inset-0 bg-white">
 *     <SimulationScreen />
 *   </motion.div>
 */

import { transitionPresets, type TransitionType, type Direction } from "./presets";
import { screenTransitions } from "./screenConfig";

export function getTransitionProps(
  screen: keyof typeof screenTransitions,
  direction: Direction = "forward",
) {
  const type = screenTransitions[screen];
  const preset = transitionPresets[type];

  return {
    key: screen,
    custom: preset.usesDirection ? direction : undefined,
    variants: preset.variants,
    initial: "enter" as const,
    animate: "center" as const,
    exit: "exit" as const,
    transition: preset.transition,
  };
}

export type { TransitionType, Direction };
