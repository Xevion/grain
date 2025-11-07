import { RefreshCw, Download } from "lucide-preact";
import { GlassButton } from "./GlassButton";
import { SliderControl } from "./SliderControl";
import { PaletteSelector } from "./PaletteSelector";
import * as Separator from "@radix-ui/react-separator";

interface GradientControlsProps {
  paletteId: string;
  onPaletteChange: (paletteId: string) => void;
  gradientCount: number;
  onGradientCountChange: (count: number) => void;
  noiseIntensity: number;
  onNoiseIntensityChange: (intensity: number) => void;
  onRegenerate: () => void;
  onExport: () => void;
}

export function GradientControls({
  paletteId,
  onPaletteChange,
  gradientCount,
  onGradientCountChange,
  noiseIntensity,
  onNoiseIntensityChange,
  onRegenerate,
  onExport,
}: GradientControlsProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="pl-4 pt-3 pb-2">
        <h1 className="font-space-grotesk text-4xl font-bold tracking-tight text-zinc-50 text-shadow-md">
          Grain
        </h1>
      </div>

      <Separator.Root className="h-px bg-white/20" />

      {/* Controls */}
      {/* Palette Selector */}
      <PaletteSelector
        className="px-6 py-4"
        selectedPaletteId={paletteId}
        onSelect={onPaletteChange}
      />

      <Separator.Root className="h-px bg-white/20" />

      {/* Gradient Count Slider */}
      <SliderControl
        label="Gradients"
        value={gradientCount}
        onChange={onGradientCountChange}
        min={2}
        max={8}
        step={1}
        className="px-6 py-4"
      />

      {/* Noise Intensity Slider */}
      <SliderControl
        label="Noise"
        value={noiseIntensity}
        onChange={onNoiseIntensityChange}
        min={0}
        max={1.5}
        step={0.1}
        formatValue={(v) => `${Math.round(v * 100)}%`}
        className="px-6 py-4"
      />

      <Separator.Root className="h-px bg-white/20" />

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mx-6 my-4">
        <GlassButton
          onClick={onRegenerate}
          className="w-full flex items-center justify-center gap-2"
          tooltip="Regenerate gradient (R)"
          aria-label="Regenerate gradient"
        >
          <RefreshCw size={18} />
          <span>Regenerate</span>
        </GlassButton>

        <GlassButton
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2"
          tooltip="Export gradient (E)"
          aria-label="Export gradient"
        >
          <Download size={18} />
          <span>Export</span>
        </GlassButton>
      </div>
    </div>
  );
}
