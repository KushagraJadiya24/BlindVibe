type SliderFieldProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

export default function SliderField({ label, value, onChange }: SliderFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground/80">{label}: {value}</label>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        className="w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex justify-between text-[10px] text-foreground/50">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
      </div>
    </div>
  );
}

