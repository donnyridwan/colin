import React from 'react';
import {
  Unplug,
  CheckCircle,
  RefreshCw,
  Plus,
  BarChart3,
  Search,
  Gauge,
  Bug,
  Eye,
  TrendingUp,
  Link2,
  Megaphone,
  Target,
} from 'lucide-react';
import { CONNECTIONS } from '../data/mockData';

export const ConnectionsPage: React.FC = () => {
  const activeConnections = CONNECTIONS.filter((c) => c.status === 'connected');
  const otherConnections = CONNECTIONS.filter((c) => c.status !== 'connected');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'Search':
        return <Search className="w-4 h-4" />;
      case 'Gauge':
        return <Gauge className="w-4 h-4" />;
      case 'Bug':
        return <Bug className="w-4 h-4" />;
      case 'Eye':
        return <Eye className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      case 'Link2':
        return <Link2 className="w-4 h-4" />;
      case 'Megaphone':
        return <Megaphone className="w-4 h-4" />;
      case 'Target':
        return <Target className="w-4 h-4" />;
      default:
        return <Unplug className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-4 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#010101] tracking-tight">Active Integrations & APIs</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] font-medium">
              5/5 Active Connections
            </span>
          </div>
          <p className="text-xs text-[#71717a] mt-0.5 max-w-xl">
            Live telemetry data feeds powering the automated audit scores, task generation, and client performance views.
          </p>
        </div>

        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] text-[#171717] text-xs font-medium border border-[#e3e3e3] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
          <RefreshCw className="w-3.5 h-3.5" />
          Sync All Data Now
        </button>
      </div>

      {/* 5 Connected Services */}
      <div>
        <h3 className="text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5" />
          Active Connected Data Sources (5)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {activeConnections.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-[8px] bg-white border border-[#efefef] hover:border-[#d4d4d8] transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-medium bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                    Connected
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#010101]">{item.name}</div>
                <div className="text-[11px] text-[#71717a] mt-0.5">{item.service}</div>

                <div className="mt-3 p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef] text-[11px] text-[#3f3f46] font-mono">
                  {item.account}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#efefef] flex items-center justify-between text-[11px] text-[#71717a]">
                <span>Last sync: {item.lastSynced}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available / Pending Integrations */}
      <div className="pt-2">
        <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-[#2563eb]" />
          Available & Pending Integrations ({otherConnections.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {otherConnections.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-[8px] bg-white border border-[#efefef] flex flex-col justify-between shadow-[0px_1px_2px_rgba(0,0,0,0.02)]"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-7 h-7 rounded-[6px] bg-[#f4f4f5] text-[#52525b] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-[4px] bg-[#f4f4f5] text-[#71717a]">
                    {item.status === 'pending' ? 'Pending Setup' : 'Not Connected'}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#010101]">{item.name}</div>
                <div className="text-[11px] text-[#71717a] mt-0.5">{item.service}</div>
                <div className="text-[11px] text-[#a1a1aa] mt-2">{item.details}</div>
              </div>

              <button className="mt-3.5 w-full py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] text-[#171717] text-xs font-medium border border-[#e3e3e3] transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
