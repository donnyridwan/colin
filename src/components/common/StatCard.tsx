import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeDirection?: 'up' | 'down' | 'neutral';
  subtext?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
  accentColor?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  changeDirection,
  subtext,
  icon: Icon,
  badge,
  badgeColor = 'bg-[#f4f4f5] text-[#52525b]',
  onClick,
  accentColor = 'blue',
}) => {
  const getIconStyles = () => {
    switch (accentColor) {
      case 'emerald':
        return 'bg-[#f0fbf4] text-[#16a34a]';
      case 'indigo':
        return 'bg-[#faf6fd] text-[#7c3aed]';
      case 'amber':
        return 'bg-[#fef9f0] text-[#d97706]';
      case 'rose':
        return 'bg-[#fdf2f4] text-[#e11d48]';
      case 'slate':
        return 'bg-[#f4f4f5] text-[#52525b]';
      case 'blue':
      default:
        return 'bg-[#f2f6fd] text-[#2563eb]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#efefef] rounded-[8px] p-4 transition-all duration-150 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] ${
        onClick
          ? 'cursor-pointer hover:border-[#d4d4d8] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.05)]'
          : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={`w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0 ${getIconStyles()}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className="text-[13px] font-medium text-[#171717]">{label}</span>
        </div>

        {badge && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-[4px] ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className="text-[24px] font-semibold text-[#010101] tracking-tight">{value}</span>
        {change && (
          <div
            className={`inline-flex items-center text-[12px] font-medium ${
              changeDirection === 'up'
                ? 'text-[#16a34a]'
                : changeDirection === 'down'
                ? 'text-[#ef4444]'
                : 'text-[#71717a]'
            }`}
          >
            {changeDirection === 'up' && <TrendingUp className="w-3.5 h-3.5 mr-0.5" />}
            {changeDirection === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
            {changeDirection === 'neutral' && <Minus className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtext && <div className="mt-1 text-[11px] text-[#8f8f8f]">{subtext}</div>}
    </div>
  );
};
