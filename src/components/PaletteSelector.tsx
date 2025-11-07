import { COLOR_PALETTES, type ColorPalette } from "../utils/palettes";
import { motion } from "framer-motion";

interface PaletteSelectorProps {
  selectedPaletteId: string;
  onSelect: (paletteId: string) => void;
}

export function PaletteSelector({ selectedPaletteId, onSelect }: PaletteSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="font-space-grotesk text-sm font-semibold uppercase tracking-wide text-zinc-900">
        Color Palette
      </label>
      <div className="grid grid-cols-2 gap-2">
        {COLOR_PALETTES.map((palette) => (
          <PaletteSwatch
            key={palette.id}
            palette={palette}
            isSelected={palette.id === selectedPaletteId}
            onClick={() => onSelect(palette.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface PaletteSwatchProps {
  palette: ColorPalette;
  isSelected: boolean;
  onClick: () => void;
}

function PaletteSwatch({ palette, isSelected, onClick }: PaletteSwatchProps) {
  return (
    <motion.button
      className="glass-input rounded-lg p-2 flex flex-col gap-1.5 cursor-pointer outline-none transition-all"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex gap-0.5 h-3">
        {palette.colors.slice(0, 6).map((color, index) => (
          <div
            key={index}
            className="flex-1 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <span className="text-xs font-inter text-zinc-900 text-center">
        {palette.name}
      </span>
    </motion.button>
  );
}
