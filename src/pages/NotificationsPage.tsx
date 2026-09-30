import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertOctagon,
  Calendar,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-12">
      {/* 1. Header card */}
      <div className="flex items-center justify-between p-4 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-xs font-bold text-[#010101] uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2563eb]" />
            Audit & System Notifications
          </h2>
          <p className="text-[11px] text-[#71717a] mt-0.5">
            Automated event logs generated from weekly scheduled crawls, PageSpeed audits, and task approvals.
          </p>
        </div>
        <button className="text-xs text-[#2563eb] hover:underline font-medium">
          Mark all as read
        </button>
      </div>

      {/* 2. CRAWL STATION AUDIT & CHANGE LOG (Integrated per Proposal Point 7 from PDF Page 3) */}
      <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3.5 border-b border-[#efefef]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[6px] bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-[#010101] uppercase tracking-wide">
                  Crawl Station — Weekly Audit Log
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
                  Done · 478 Pages
                </span>
              </div>
              <p className="text-[11px] text-[#71717a] mt-0.5 font-mono">
                Runs every Sun ~05:30 UTC when crawl station is online. (PDF Page 3)
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#52525b] bg-[#fafafa] px-2.5 py-1 rounded-[4px] border border-[#efefef] self-start sm:self-center">
            Scan Period: 2026-09-27 → 2026-09-28
          </div>
        </div>

        {/* Change metrics grid from PDF Page 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 text-center">
          <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
            <span className="text-[10px] text-[#71717a] font-medium block">New Broken</span>
            <span className="text-sm font-bold text-[#010101] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
            <span className="text-[10px] text-[#71717a] font-medium block">Fixed</span>
            <span className="text-sm font-bold text-[#16a34a] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
            <span className="text-[10px] text-[#71717a] font-medium block">New Pages</span>
            <span className="text-sm font-bold text-[#010101] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
            <span className="text-[10px] text-[#71717a] font-medium block">Removed</span>
            <span className="text-sm font-bold text-[#010101] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
            <span className="text-[10px] text-[#71717a] font-medium block">Titles Changed</span>
            <span className="text-sm font-bold text-[#010101] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
            <span className="text-[10px] text-[#71717a] font-medium block">Meta Lost</span>
            <span className="text-sm font-bold text-[#010101] font-mono mt-0.5 block">0</span>
          </div>
        </div>
      </div>

      {/* 3. System & Audit Notification Feed */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider px-1">
          Recent Event Feed
        </h3>

        {NOTIFICATIONS.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-[8px] border flex items-start gap-3 transition-colors ${
              item.read
                ? 'bg-white border-[#efefef] text-[#71717a]'
                : 'bg-white border-[#e4e4e7] shadow-[0px_1px_2px_rgba(0,0,0,0.03)] text-[#18181b]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5 ${
                item.type === 'warning'
                  ? 'bg-[#fefce8] text-[#a16207]'
                  : item.type === 'alert'
                  ? 'bg-[#fef2f2] text-[#dc2626]'
                  : item.type === 'success'
                  ? 'bg-[#f0fdf4] text-[#16a34a]'
                  : 'bg-[#eff6ff] text-[#2563eb]'
              }`}
            >
              {item.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
              {item.type === 'alert' && <AlertOctagon className="w-4 h-4" />}
              {item.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {item.type === 'info' && <Info className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#010101]">{item.title}</span>
                <span className="text-[10px] text-[#a1a1aa] font-mono shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-[#71717a] mt-0.5 leading-relaxed">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
