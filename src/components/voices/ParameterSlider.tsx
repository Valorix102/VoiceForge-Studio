// src/components/voices/ParameterSlider.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input"; // For direct number input alongside slider

interface ParameterSliderProps {
  id: string;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  defaultValue?: number;
}

export default function ParameterSlider({
  id,
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  unit = "",
  defaultValue,
}: ParameterSliderProps) {
  const handleSliderChange = (values: number[]) => {
    onValueChange(values[0]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let numValue = parseFloat(event.target.value);
    if (isNaN(numValue)) return;
    if (numValue < min) numValue = min;
    if (numValue > max) numValue = max;
    onValueChange(numValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        <span className="text-sm text-muted-foreground w-20 text-right">
          {value.toFixed(unit === "%" || step < 1 ? (step < 0.1 ? 2 : 1) : 0)}{unit}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Slider
          id={id}
          name={id}
          value={[value]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue ? [defaultValue] : undefined}
          className="flex-1"
        />
        <Input 
          type="number"
          value={value.toString()} // Keep as string for controlled input
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className="w-20 h-8 text-sm"
        />
      </div>
    </div>
  );
}
