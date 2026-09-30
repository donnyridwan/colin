import React from 'react';
import {
  Megaphone,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  DollarSign,
  TrendingUp,
  Target,
  Layers,
} from 'lucide-react';
import { MenuId, TaskItem, TaskStatus } from '../types';

interface PaidMediaPageProps {
  onNavigate: (menu: MenuId) => void;
  tasks?: TaskItem[];
  onUpdateStatus?: (taskId: string, newStatus: TaskStatus) => void;
}

export const PaidMediaPage: React.FC<PaidMediaPageProps> = ({
  onNavigate,
  tasks = [],
  onUpdateStatus,
}) => {
  // Extract the 3 specific Ads tasks from PDF Page 6
  const adsTasks = tasks.filter(
    (t) =>
      t.task.toLowerCase().includes('ads') ||
      t.task.toLowerCase().includes('google ads')
  );

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* 1. Header status card */}
      <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-[6px] bg-[#fef9f0] text-[#d97706] flex items-center justify-center shrink-0">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold text-[#010101] tracking-tight">
                Paid Media — Pre-Launch Setup
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#fefce8] text-[#a16207] border border-[#fef08a] uppercase tracking-wide">
                Strategy & Setup Phase
              </span>
            </div>
            <p className="text-[11px] text-[#71717a] mt-0.5">
              Live campaign telemetry will populate once ad accounts and conversion tracking are configured.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('connections')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white text-xs font-medium transition-colors shadow-sm active:scale-95"
          >
            <span>Connect Ad Accounts</span>
          </button>
        </div>
      </div>

      {/* 2. Projected Campaign KPI Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider">Total Ad Spend</span>
          <div className="text-[22px] font-bold text-[#010101] mt-1">$0.00</div>
          <span className="text-[11px] text-[#a1a1aa]">Awaiting campaign activation</span>
        </div>

        <div className="p-4 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider">Target Blended ROAS</span>
          <div className="text-[22px] font-bold text-[#010101] mt-1">3.5x</div>
          <span className="text-[11px] text-[#16a34a] font-medium">Estimated benchmark</span>
        </div>

        <div className="p-4 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider">Conversion Actions</span>
          <div className="text-[22px] font-bold text-[#010101] mt-1">0</div>
          <span className="text-[11px] text-[#a1a1aa]">GA4 Key events linked</span>
        </div>
      </div>

      {/* 3. Pre-Launch Action Checklist (Directly from PDF Page 6) */}
      <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#efefef]">
          <div>
            <h3 className="text-xs font-bold text-[#010101] uppercase tracking-wide flex items-center gap-2">
              <Target className="w-4 h-4 text-[#2563eb]" />
              Pre-Launch Setup & Approval Checklist (From PDF Audit Page 6)
            </h3>
            <p className="text-[11px] text-[#71717a] mt-0.5">
              These 3 core tasks must be completed and approved before running paid search or social ads.
            </p>
          </div>

          <button
            onClick={() => onNavigate('task-db')}
            className="text-[12px] text-[#2563eb] hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>View in Task DB</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#efefef]">
          {adsTasks.length > 0 ? (
            adsTasks.map((t) => (
              <div
                key={t.id}
                className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-[#52525b]">{t.id}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-[3px] bg-[#fafafa] border border-[#e4e4e7] font-semibold text-[#52525b]">
                      {t.lane}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-[4px] font-semibold ${
                        t.status === 'Completed'
                          ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                          : t.status === 'Assigned'
                          ? 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]'
                          : 'bg-[#fefce8] text-[#a16207] border border-[#fef08a]'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#18181b]">{t.task}</div>
                  <div className="text-[11px] text-[#71717a] mt-0.5">
                    Raised: <span className="font-mono text-[#52525b]">{t.date}</span> · Priority: <span className="text-[#dc2626] font-medium">{t.priority}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {onUpdateStatus && t.status !== 'Completed' && (
                    <button
                      onClick={() => onUpdateStatus(t.id, 'Completed')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-medium transition-colors shadow-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Mark Ready</span>
                    </button>
                  )}
                  {t.status === 'Completed' && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#16a34a] font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Ready for Launch</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-[#71717a]">
              No ads tasks found in the database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
