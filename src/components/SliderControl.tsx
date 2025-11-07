import * as Slider from "@radix-ui/react-slider";

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
}

export function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue = (v) => v.toString()
}: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-space-grotesk text-sm font-semibold uppercase tracking-wide text-zinc-900">
          {label}
        </label>
        <span className="font-inter text-sm text-zinc-800">
          {formatValue(value)}
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className="glass-input relative flex-grow rounded-full h-3">
          <Slider.Range className="absolute bg-white/40 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-6 h-6 glass-button rounded-full focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"
          aria-label={label}
        />
      </Slider.Root>
    </div>
  );
}
