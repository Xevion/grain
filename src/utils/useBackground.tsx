import { Random } from "random-js";
import { useMemo, useState } from "preact/hooks";
import { getEdgePoint } from "./helpers";
interface useBackgroundProps {
  width: number;
  height: number;
  ratio: number;
}

interface useBackgroundReturn {
  regenerate: () => void;
  backgrounds: string[];
  svg: string;
}

const random = new Random();
const palettes = [
  //   ["#5e1e1e", "#141414", "#400000", "#7a0000", "#2b0059", "#000c59", "#850082", "#850052"],
  ["#ed625d", "#42b6c6", "#f79f88", "#446ba6", "#4b95f0", "#d16ba5"],
];

const generateBackground = (): string[] => {
  const palette = random.pick(palettes);
  return Array(5)
    .fill(null)
    .map(() => random.pick(palette))
    .map((color) => {
      const [x, y] = getEdgePoint(random.integer(0, 400), 100, 100);
      return `radial-gradient(farthest-corner at ${x}% ${y}%, ${color}, transparent 100%)`;
    });
};

const useBackground = ({
  width,
  height,
  ratio,
}: useBackgroundProps): useBackgroundReturn => {
  const [background, setBackground] = useState(generateBackground());

  const regenerate = () => {
    setBackground(generateBackground());
  };

  const noise = (): string => {
    const svgWidth = Math.ceil((width ?? 1920) * ratio);
    const svgHeight = Math.ceil((height ?? 1080) * ratio);
    const seed = random.integer(0, 1000000);

    return `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="2.1" numOctaves="2" seed="${seed}" stitchTiles="stitch"/></filter><g opacity="0.9"><rect width="100%" height="100%" filter="url(#noiseFilter)"/></g></svg>`;
  };

  return {
    regenerate,
    svg:
      typeof window !== "undefined"
        ? `data:image/svg+xml;base64,${window.btoa(noise())}`
        : "",
    backgrounds: background,
  };
};

export default useBackground;
