import { Random } from "random-js";
import { useMemo, useState, useEffect } from "preact/hooks";
import { getEdgePoint } from "./helpers";

interface useBackgroundProps {
  width: number;
  height: number;
  ratio: number;
  paletteColors: string[];
  gradientCount?: number;
  noiseIntensity?: number;
}

interface useBackgroundReturn {
  regenerate: () => void;
  backgrounds: string[];
  svg: string;
}

const random = new Random();

const generateBackground = (paletteColors: string[], count: number): string[] => {
  return Array(count)
    .fill(null)
    .map(() => random.pick(paletteColors))
    .map((color) => {
      const [x, y] = getEdgePoint(random.integer(0, 400), 100, 100);
      return `radial-gradient(farthest-corner at ${x}% ${y}%, ${color}, transparent 100%)`;
    });
};

const useBackground = ({
  width,
  height,
  ratio,
  paletteColors,
  gradientCount = 5,
  noiseIntensity = 0.9,
}: useBackgroundProps): useBackgroundReturn => {
  const [background, setBackground] = useState(() => generateBackground(paletteColors, gradientCount));

  // Regenerate when palette or count changes
  useEffect(() => {
    setBackground(generateBackground(paletteColors, gradientCount));
  }, [paletteColors, gradientCount]);

  const regenerate = () => {
    setBackground(generateBackground(paletteColors, gradientCount));
  };

  const noise = (): string => {
    const svgWidth = Math.ceil((width ?? 1920) * ratio);
    const svgHeight = Math.ceil((height ?? 1080) * ratio);
    const seed = random.integer(0, 1000000);

    return `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="2.1" numOctaves="2" seed="${seed}" stitchTiles="stitch"/></filter><g opacity="${noiseIntensity}"><rect width="100%" height="100%" filter="url(#noiseFilter)"/></g></svg>`;
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
