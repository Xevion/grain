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
      <div className="p-6">
        <h1 className="font-space-grotesk text-4xl font-bold tracking-tight text-zinc-900">
          Grain
        </h1>
      </div>

      <Separator.Root className="h-px bg-white/20 mx-6" />

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Palette Selector */}
        <PaletteSelector
          selectedPaletteId={paletteId}
          onSelect={onPaletteChange}
        />

        <Separator.Root className="h-px bg-white/10" />

        {/* Gradient Count Slider */}
        <SliderControl
          label="Gradients"
          value={gradientCount}
          onChange={onGradientCountChange}
          min={2}
          max={8}
          step={1}
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
        />

        <Separator.Root className="h-px bg-white/10" />

        {/* Action Buttons */}
        <div className="space-y-3">
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
    </div>
  );
}
