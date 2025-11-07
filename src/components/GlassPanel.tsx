import { type ComponentChildren } from "preact";
import { motion } from "framer-motion";

interface GlassPanelProps {
  children: ComponentChildren;
  className?: string;
  animate?: boolean;
}

export function GlassPanel({ children, className = "", animate = true }: GlassPanelProps) {
  const Component = animate ? motion.div : "div";

  const animationProps = animate ? {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
      duration: 0.4
    }
  } : {};

  return (
    <Component
      className={`glass-panel rounded-2xl ${className}`}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
