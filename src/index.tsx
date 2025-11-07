import { hydrate, prerender as ssr } from "preact-iso";
import { useMemo, useState, useEffect } from "preact/hooks";

import "./index.css";

import { useViewportSize } from "./utils/useViewportSize";
import useBackground from "./utils/useBackground";
import { GlassPanel } from "./components/GlassPanel";
import { GradientControls } from "./components/GradientControls";
import { getPaletteById } from "./utils/palettes";
import { exportGradientAsPNG } from "./utils/exportGradient";

export function App() {
  const { width, height } = useViewportSize();

  // Gradient state
  const [paletteId, setPaletteId] = useState("classic");
  const [gradientCount, setGradientCount] = useState(5);
  const [noiseIntensity, setNoiseIntensity] = useState(0.9);

  const palette = getPaletteById(paletteId);

  const { svg, backgrounds, regenerate } = useBackground({
    width,
    height,
    ratio: 0.4,
    paletteColors: palette.colors,
    gradientCount,
    noiseIntensity,
  });

  const gradientStyle = useMemo(() => {
    return {
      background: [`url("${svg}")`, ...backgrounds].join(", "),
    };
  }, [svg, backgrounds]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        regenerate();
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        exportGradientAsPNG();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [regenerate]);

  return (
    <>
      {/* Full-screen gradient background */}
      <div
        id="gradient-container"
        style={gradientStyle}
        className="w-full h-screen gradient text-zinc-800 overflow-clip"
      >
        <div className="w-full h-full bg-zinc-800/50 bg-blend-overlay" />
      </div>

      {/* Fixed overlay panel on left */}
      <div className="absolute top-0 left-0 w-[400px] h-screen pointer-events-none">
        <GlassPanel className="m-6 h-[calc(100vh-3rem)] pointer-events-auto">
          <GradientControls
            paletteId={paletteId}
            onPaletteChange={setPaletteId}
            gradientCount={gradientCount}
            onGradientCountChange={setGradientCount}
            noiseIntensity={noiseIntensity}
            onNoiseIntensityChange={setNoiseIntensity}
            onRegenerate={regenerate}
            onExport={() => exportGradientAsPNG()}
          />
        </GlassPanel>
      </div>
    </>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("root"));
}

export async function prerender(data: any) {
  return await ssr(<App {...data} />);
}
