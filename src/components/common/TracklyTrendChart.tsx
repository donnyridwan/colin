import React, { useState } from 'react';

interface MonthlyData {
  month: string;
  created: number;
  solved: number;
}

interface TracklyTrendChartProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  data?: MonthlyData[];
}

export const TracklyTrendChart: React.FC<TracklyTrendChartProps> = ({
  title = 'Ticket trend',
  subtitle = 'Number of tickets created vs resolved over time',
  buttonText = 'Details Trend',
  onButtonClick,
  data = [
    { month: 'Jan', created: 180, solved: 22 },
    { month: 'Feb', created: 175, solved: 25 },
    { month: 'Mar', created: 190, solved: 28 },
    { month: 'Apr', created: 238, solved: 30 },
    { month: 'May', created: 210, solved: 27 },
    { month: 'Jun', created: 160, solved: 20 },
    { month: 'Jul', created: 155, solved: 22 },
    { month: 'Aug', created: 170, solved: 24 },
    { month: 'Sep', created: 185, solved: 26 },
    { month: 'Oct', created: 195, solved: 29 },
    { month: 'Nov', created: 205, solved: 31 },
    { month: 'Dec', created: 215, solved: 32 },
  ],
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(3); // Default April selected like in Figma

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[3];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 lg:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header matching Figma Trackly */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-[#0f172a] tracking-tight">{title}</h3>
          <p className="text-xs text-[#64748b] mt-0.5">{subtitle}</p>
        </div>
        <button
          onClick={onButtonClick}
          className="px-3.5 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] transition-colors shadow-2xs self-start sm:self-center"
        >
          {buttonText}
        </button>
      </div>

      {/* Interactive Chart Container */}
      <div className="relative pt-6 pb-2">
        {/* Tooltip Box exactly like in Trackly Figma */}
        {activePoint && hoverIndex !== null && (
          <div
            className="absolute top-0 transform -translate-x-1/2 z-20 pointer-events-none transition-all duration-150"
            style={{ left: `${(hoverIndex / (data.length - 1)) * 92 + 4}%` }}
          >
            <div className="bg-[#0f172a] text-white p-2.5 rounded-[10px] text-xs shadow-lg flex flex-col gap-0.5 whitespace-nowrap">
              <span className="font-bold text-white text-[12px]">{activePoint.created} ticket created</span>
              <span className="text-[#94a3b8] text-[11px]">{activePoint.solved} ticket solved</span>
            </div>
            {/* Pointer line downward */}
            <div className="w-[1px] h-28 bg-[#0f172a]/40 mx-auto mt-1 border-dashed border-l border-[#0f172a]" />
          </div>
        )}

        {/* SVG Curved Chart */}
        <div className="h-44 w-full">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
            {/* Grid lines */}
            <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="100" x2="1000" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="150" x2="1000" y2="150" stroke="#f1f5f9" strokeWidth="1" />

            {/* Dotted lower curve (resolved) */}
            <path
              d="M 0 160 Q 200 140 400 160 T 700 170 T 1000 150"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Solid upper curve (created tickets) */}
            <path
              d="M 0 100 C 150 95 250 140 350 115 C 450 90 550 155 700 145 C 850 135 950 165 1000 160"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Monthly Timeline Labels */}
        <div className="flex justify-between text-xs text-[#94a3b8] mt-3 font-medium px-2">
          {data.map((item, idx) => (
            <span
              key={idx}
              onMouseEnter={() => setHoverIndex(idx)}
              className={`cursor-pointer transition-colors px-1 py-0.5 rounded ${
                hoverIndex === idx ? 'text-[#0f172a] font-bold' : 'hover:text-[#0f172a]'
              }`}
            >
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
