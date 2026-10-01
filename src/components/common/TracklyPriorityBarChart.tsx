import React, { useState } from 'react';

interface PriorityBar {
  label: string;
  count: number;
  heightPercent: number;
  color?: string;
}

interface TracklyPriorityBarChartProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  data?: PriorityBar[];
}

export const TracklyPriorityBarChart: React.FC<TracklyPriorityBarChartProps> = ({
  title = 'Projects on track',
  subtitle = 'Distribution of tickets across different priorities',
  buttonText = 'Details Priority',
  onButtonClick,
  data = [
    { label: 'Critical', count: 3, heightPercent: 45, color: '#f87171' },
    { label: 'High', count: 8, heightPercent: 75, color: '#f97316' },
    { label: 'Medium', count: 12, heightPercent: 65, color: '#94a3b8' },
    { label: 'Low', count: 18, heightPercent: 95, color: '#cbd5e1' },
  ],
}) => {
  const [activeBar, setActiveBar] = useState<number | null>(1); // Default High selected like in Figma

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 lg:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-[#0f172a] tracking-tight">{title}</h3>
          <p className="text-xs text-[#64748b] mt-0.5">{subtitle}</p>
        </div>
        <button
          onClick={onButtonClick}
          className="px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] transition-colors shadow-2xs shrink-0"
        >
          {buttonText}
        </button>
      </div>

      {/* Bar Chart Area matching Figma Trackly */}
      <div className="flex items-end justify-around h-44 pt-6 pb-2 px-4">
        {data.map((bar, idx) => {
          const isActive = activeBar === idx;
          return (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 group cursor-pointer relative"
              onMouseEnter={() => setActiveBar(idx)}
            >
              {/* Tooltip Pill */}
              {isActive && (
                <div className="absolute -top-9 px-2.5 py-1 rounded-[6px] bg-[#0f172a] text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md whitespace-nowrap z-10 animate-in fade-in duration-150">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                  <span>{bar.count} tickets</span>
                </div>
              )}

              {/* Bar Column with striped hatch effect */}
              <div
                className={`w-12 sm:w-14 rounded-[12px] transition-all duration-300 relative overflow-hidden flex items-end justify-center ${
                  isActive
                    ? 'bg-[#ea580c] shadow-[0px_8px_16px_rgba(234,88,12,0.25)]'
                    : 'bg-[#f1f5f9] hover:bg-[#e2e8f0]'
                }`}
                style={{ height: `${bar.heightPercent}%` }}
              >
                {/* Diagonal striped texture overlay */}
                <div
                  className={`absolute inset-0 opacity-15 pointer-events-none ${
                    isActive ? 'bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:12px_12px]' : 'bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.06)_50%,transparent_75%)] bg-[length:12px_12px]'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-[#0f172a] font-semibold' : 'text-[#64748b]'
                }`}
              >
                {bar.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
