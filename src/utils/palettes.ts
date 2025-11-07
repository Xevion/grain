export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: "classic",
    name: "Classic",
    colors: ["#ed625d", "#42b6c6", "#f79f88", "#446ba6", "#4b95f0", "#d16ba5"]
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: ["#ff6b6b", "#f9ca24", "#ee5a6f", "#c56cf0", "#ff9ff3", "#feca57"]
  },
  {
    id: "ocean",
    name: "Ocean",
    colors: ["#0077be", "#00d4ff", "#0099cc", "#66d3ff", "#1e90ff", "#4ecdc4"]
  },
  {
    id: "forest",
    name: "Forest",
    colors: ["#2ecc71", "#27ae60", "#16a085", "#1abc9c", "#52c97f", "#00b894"]
  },
  {
    id: "aurora",
    name: "Aurora",
    colors: ["#a29bfe", "#6c5ce7", "#fd79a8", "#e17055", "#00b894", "#00cec9"]
  },
  {
    id: "fire",
    name: "Fire",
    colors: ["#ff4757", "#ff6348", "#ff7f50", "#ffa502", "#ff6b81", "#ee5a6f"]
  },
  {
    id: "cosmic",
    name: "Cosmic",
    colors: ["#5f27cd", "#341f97", "#ee5a6f", "#c44569", "#f368e0", "#ff9ff3"]
  },
  {
    id: "monochrome",
    name: "Monochrome",
    colors: ["#2d3436", "#636e72", "#b2bec3", "#dfe6e9", "#74b9ff", "#a29bfe"]
  }
];

export function getPaletteById(id: string): ColorPalette {
  return COLOR_PALETTES.find(p => p.id === id) || COLOR_PALETTES[0];
}
