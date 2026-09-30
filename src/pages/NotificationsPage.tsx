import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between p-3.5 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-xs font-bold text-[#010101] uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2563eb]" />
            Audit & System Notifications
          </h2>
          <p className="text-[11px] text-[#71717a] mt-0.5">
            Automated notifications generated from weekly scheduled crawls and telemetry alerts.
          </p>
        </div>
        <button className="text-xs text-[#2563eb] hover:underline font-medium">
          Mark all as read
        </button>
      </div>

      <div className="space-y-2.5">
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
