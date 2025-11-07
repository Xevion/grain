import { type ComponentChildren } from "preact";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

interface GlassButtonProps {
  children: ComponentChildren;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
  "aria-label"?: string;
}

export function GlassButton({
  children,
  onClick,
  className = "",
  disabled = false,
  tooltip,
  "aria-label": ariaLabel
}: GlassButtonProps) {
  const button = (
    <motion.button
      className={`glass-button rounded-xl px-4 py-2 font-space-grotesk font-semibold text-zinc-900 outline-none focus:outline-2 outline-offset-2 focus:outline-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );

  if (tooltip) {
    return (
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {button}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="glass-card px-3 py-2 rounded-lg text-sm text-zinc-900 font-inter"
              sideOffset={5}
            >
              {tooltip}
              <Tooltip.Arrow className="fill-white/20" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return button;
}
