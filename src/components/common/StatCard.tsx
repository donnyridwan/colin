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
  badgeColor = 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]',
  onClick,
  accentColor = 'blue',
}) => {
  const getIconStyles = () => {
    switch (accentColor) {
      case 'emerald':
        return 'bg-[#f0fdf4] text-[#16a34a] border border-[#dcfce7]';
      case 'indigo':
        return 'bg-[#f5f3ff] text-[#7c3aed] border border-[#ede9fe]';
      case 'amber':
        return 'bg-[#fffbeb] text-[#d97706] border border-[#fef3c7]';
      case 'rose':
        return 'bg-[#fff1f2] text-[#e11d48] border border-[#ffe4e6]';
      case 'slate':
        return 'bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]';
      case 'blue':
      default:
        return 'bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 ${
        onClick
          ? 'cursor-pointer hover:border-[#cbd5e1] hover:shadow-[0px_3px_8px_rgba(0,0,0,0.06)] group'
          : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#64748b] tracking-tight">{label}</span>

        <div className="flex items-center gap-1.5">
          {badge && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}
          {Icon && (
            <div className={`w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 transition-transform ${getIconStyles()} ${onClick ? 'group-hover:scale-105' : ''}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      <div className="text-[30px] sm:text-[32px] font-bold text-[#0f172a] tracking-tight leading-none my-2.5">
        {value}
      </div>

      <div className="flex items-center flex-wrap gap-2 pt-0.5">
        {change && (
          <div
            className={`inline-flex items-center text-xs font-semibold ${
              changeDirection === 'up'
                ? 'text-[#16a34a]'
                : changeDirection === 'down'
                ? 'text-[#dc2626]'
                : 'text-[#64748b]'
            }`}
          >
            {changeDirection === 'up' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
            {changeDirection === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
            {changeDirection === 'neutral' && <Minus className="w-3.5 h-3.5 mr-1" />}
            {change}
          </div>
        )}

        {subtext && (
          <span className="text-xs text-[#94a3b8] font-normal truncate">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
