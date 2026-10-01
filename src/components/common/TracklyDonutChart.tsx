import React from 'react';

interface StatusItem {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

interface TracklyDonutChartProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  items?: StatusItem[];
}

export const TracklyDonutChart: React.FC<TracklyDonutChartProps> = ({
  title = 'Ticket by status',
  subtitle = 'Distribution of tickets across different statuses',
  buttonText = 'Details Ticket',
  onButtonClick,
  items = [
    { label: 'Backlog', count: 11, percentage: 22, color: '#94a3b8' },
    { label: 'In progress', count: 9, percentage: 18, color: '#f59e0b' },
    { label: 'In review', count: 6, percentage: 12, color: '#6366f1' },
    { label: 'Done', count: 24, percentage: 48, color: '#10b981' },
  ],
}) => {
  // Calculate SVG donut stroke offsets
  const total = items.reduce((acc, item) => acc + item.count, 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 lg:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      {/* Header matching Figma Trackly node 415:38239 */}
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

      {/* Donut & Legend Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
        {/* Donut SVG */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {items.map((item, idx) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += item.percentage;

              return (
                <circle
                  key={idx}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-[#0f172a] tracking-tight leading-none">{total}</span>
            <span className="text-[10px] font-medium text-[#64748b] mt-0.5">Tickets</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full sm:w-56 space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-[#475569]">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[#0f172a]">
                <span className="font-semibold">{item.count}</span>
                <span className="text-[#94a3b8] font-normal text-[11px] w-9 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
