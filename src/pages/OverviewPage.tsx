import React from 'react';
import {
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Activity,
  Globe,
  Gauge,
  Search,
  Play,
} from 'lucide-react';
import {
  AI_AUDIT_DATA,
  GA4_KPIS,
  GSC_KPIS,
  CRAWL_OVERVIEW,
} from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { MenuId, TaskItem } from '../types';

interface OverviewPageProps {
  onNavigate: (menu: MenuId) => void;
  tasks: TaskItem[];
  onToggleTaskStatus: (taskId: string) => void;
  onRunAudit?: () => void;
  isAuditing?: boolean;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  tasks,
  onToggleTaskStatus,
  onRunAudit,
  isAuditing = false,
}) => {
  const openTasks = tasks.filter((t) => t.status !== 'Completed');
  const highPriorityTasks = openTasks.filter((t) => t.priority === 'High');
  const confirmedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* 1. AI SITE AUDIT EXECUTIVE CARD (From PDF Page 1) */}
      <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#efefef] pb-4 mb-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#f2f6fd] text-[#2563eb] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-semibold text-[#010101] tracking-tight">AI site audit</h2>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-[4px] bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]">
                  {AI_AUDIT_DATA.findingsCount} findings
                </span>
                <span className="text-[10px] text-[#71717a] font-mono">
                  Last run {AI_AUDIT_DATA.lastRun}
                </span>
              </div>
              <p className="text-[11px] text-[#71717a] mt-0.5">
                Reads the crawl, GA4, Search Console, PageSpeed and Clarity together, scores the site and files what it finds as tasks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Run Audit · Pro button from PDF Page 1 */}
            {onRunAudit && (
              <button
                onClick={onRunAudit}
                disabled={isAuditing}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-medium text-xs transition-all shadow-sm active:scale-95 ${
                  isAuditing
                    ? 'bg-[#e4e4e7] text-[#a1a1aa] cursor-not-allowed'
                    : 'bg-[#171717] hover:bg-[#262626] text-white'
                }`}
              >
                {isAuditing ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run audit · Pro</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => onNavigate('task-db')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] text-xs font-medium transition-colors"
            >
              <span>View Task DB</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Synthesis Statement */}
        <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#efefef] text-[13px] text-[#3f3f46] leading-relaxed">
          <p className="flex items-start gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-2 shrink-0" />
            <span>{AI_AUDIT_DATA.summary}</span>
          </p>
        </div>
      </div>

      {/* 2. FOUR PRIMARY AUDIT KPI CARDS (Rackwise Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          label="Open Tasks"
          value={openTasks.length}
          subtext="Issues awaiting action"
          badge="Audit Sync"
          badgeColor="bg-[#fefce8] text-[#a16207] border border-[#fef08a]"
          accentColor="amber"
          onClick={() => onNavigate('task-db')}
        />
        <StatCard
          label="Confirmed"
          value={confirmedTasks.length}
          subtext="Issues verified & closed"
          badge="Completed"
          badgeColor="bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]"
          accentColor="emerald"
          onClick={() => onNavigate('task-db')}
        />
        <StatCard
          label="High Priority Open"
          value={highPriorityTasks.length}
          subtext="Urgent technical/ads items"
          badge="Critical"
          badgeColor="bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]"
          accentColor="rose"
          onClick={() => onNavigate('actionable-items')}
        />
        <StatCard
          label="Active Connections"
          value={AI_AUDIT_DATA.activeConnections}
          subtext="GA4, GSC, PSI, SF, Clarity"
          badge="All Green"
          badgeColor="bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]"
          accentColor="blue"
          onClick={() => onNavigate('connections')}
        />
      </div>

      {/* 3. MULTI-CHANNEL HEALTH SNAPSHOT (GA4, GSC, PageSpeed, Crawl) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* GA4 Traffic Snapshot */}
        <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[6px] bg-[#f2f6fd] text-[#2563eb] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[#010101]">GA4 Traffic & Engagement</h3>
                  <div className="text-[11px] text-[#8f8f8f] font-mono">aizonemarketing.io · Last 28 days</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('website')}
                className="text-[12px] text-[#2563eb] hover:text-[#1d4ed8] font-medium inline-flex items-center gap-0.5"
              >
                Deep Dive <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-3">
              <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider">Sessions</span>
                <div className="text-[20px] font-bold text-[#010101] mt-0.5">{GA4_KPIS.sessions.value}</div>
                <div className="text-[11px] text-[#16a34a] font-medium flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-3 h-3" /> {GA4_KPIS.sessions.change}
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider">Users</span>
                <div className="text-[20px] font-bold text-[#010101] mt-0.5">{GA4_KPIS.users.value}</div>
                <div className="text-[11px] text-[#16a34a] font-medium flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-3 h-3" /> {GA4_KPIS.users.change}
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider">Pageviews</span>
                <div className="text-[20px] font-bold text-[#010101] mt-0.5">{GA4_KPIS.pageviews.value}</div>
                <div className="text-[11px] text-[#16a34a] font-medium flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-3 h-3" /> {GA4_KPIS.pageviews.change}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#52525b] bg-[#fafafa] p-2.5 rounded-[6px] border border-[#efefef]">
              <span className="font-semibold text-[#18181b]">Top Landing Page:</span>{' '}
              <code className="text-[#2563eb] font-mono">/home-copy/</code> (31 sessions, 84% engagement rate)
            </div>
          </div>
        </div>

        {/* Screaming Frog Crawl Score & Health Snapshot */}
        <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[6px] bg-[#fef9f0] text-[#d97706] flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[#010101]">Screaming Frog Crawl Health</h3>
                  <div className="text-[11px] text-[#8f8f8f] font-mono">478 pages crawled · Sep 28, 2026</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('search-marketing')}
                className="text-[12px] text-[#2563eb] hover:text-[#1d4ed8] font-medium inline-flex items-center gap-0.5"
              >
                Crawl Audit <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="flex items-baseline gap-1 bg-[#fafafa] px-3.5 py-2 rounded-[6px] border border-[#efefef]">
                <span className="text-[26px] font-bold text-[#010101]">{CRAWL_OVERVIEW.score}</span>
                <span className="text-[11px] text-[#71717a]">/ 100</span>
                <span className="ml-2 text-[10px] font-medium px-2 py-0.5 rounded-[4px] bg-[#fefce8] text-[#a16207] border border-[#fef08a]">
                  {CRAWL_OVERVIEW.scoreLabel}
                </span>
              </div>
              <div className="text-[11px] text-[#71717a] leading-tight">
                Avg crawl: <span className="text-[#18181b] font-mono font-medium">{CRAWL_OVERVIEW.avgTime}</span>
                <br />
                Non-indexable: <span className="text-[#d97706] font-medium">{CRAWL_OVERVIEW.nonIndexable} pages</span>
              </div>
            </div>

            {/* HTTP Status Breakdown bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#71717a]">
                <span>Healthy 2xx (100)</span>
                <span>3xx Redirects (226)</span>
                <span>Broken 4xx/5xx (151)</span>
              </div>
              <div className="h-2 w-full bg-[#f4f4f5] rounded-full overflow-hidden flex">
                <div style={{ width: '21%' }} className="bg-[#16a34a] h-full" title="Healthy 2xx" />
                <div style={{ width: '47%' }} className="bg-[#eab308] h-full" title="3xx Redirects" />
                <div style={{ width: '31%' }} className="bg-[#ef4444] h-full" title="Broken 4xx/5xx" />
                <div style={{ width: '1%' }} className="bg-[#a1a1aa] h-full" title="Blocked" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SEARCH CONSOLE & PAGESPEED QUICK COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GSC Quick Card */}
        <div className="p-4 rounded-[8px] bg-white border border-[#efefef] flex items-center justify-between shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#faf6fd] text-[#7c3aed] flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-[#71717a] font-medium">Google Search Console</div>
              <div className="text-[14px] font-semibold text-[#010101] mt-0.5">
                {GSC_KPIS.impressions.value} Impressions <span className="text-[11px] text-[#16a34a] font-medium">({GSC_KPIS.impressions.change})</span>
              </div>
              <div className="text-[11px] text-[#71717a]">Avg Position: <span className="text-[#18181b] font-medium">{GSC_KPIS.avgPosition.value}</span></div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('search-marketing')}
            className="p-1.5 rounded-[6px] bg-[#fafafa] hover:bg-[#f4f4f5] text-[#52525b] border border-[#efefef] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* PageSpeed Quick Card */}
        <div className="p-4 rounded-[8px] bg-white border border-[#efefef] flex items-center justify-between shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#f2f6fd] text-[#2563eb] flex items-center justify-center">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-[#71717a] font-medium">PageSpeed Insights Score</div>
              <div className="text-[14px] font-semibold text-[#010101] mt-0.5 flex items-center gap-2">
                <span className="text-[#16a34a]">Desktop: 85</span>
                <span className="text-[#d4d4d8]">|</span>
                <span className="text-[#d97706]">Mobile: 67</span>
              </div>
              <div className="text-[11px] text-[#71717a]">Mobile LCP requires optimization (13.4s)</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('website')}
            className="p-1.5 rounded-[6px] bg-[#fafafa] hover:bg-[#f4f4f5] text-[#52525b] border border-[#efefef] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. TOP ACTIONABLE TASKS SECTION */}
      <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-[14px] font-semibold text-[#010101] flex items-center gap-2">
              Action Items Requiring Attention
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-[4px] bg-[#fefce8] text-[#a16207] border border-[#fef08a]">
                {openTasks.length} pending
              </span>
            </h3>
            <p className="text-[11px] text-[#71717a] mt-0.5">
              High-impact generated tasks filed automatically by the AI audit.
            </p>
          </div>
          <button
            onClick={() => onNavigate('actionable-items')}
            className="text-[12px] text-[#2563eb] hover:text-[#1d4ed8] font-medium inline-flex items-center gap-0.5"
          >
            Manage All Actionable Items <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#efefef] border border-[#efefef] rounded-[6px] overflow-hidden">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fafafa] transition-colors"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => onToggleTaskStatus(task.id)}
                  className="mt-0.5 w-4 h-4 rounded border-[#d4d4d8] text-[#171717] focus:ring-[#171717] cursor-pointer"
                />
                <div>
                  <div
                    className={`text-[13px] font-medium ${
                      task.status === 'Completed'
                        ? 'line-through text-[#a1a1aa]'
                        : 'text-[#18181b]'
                    }`}
                  >
                    {task.task}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.2 rounded-[3px] ${
                        task.lane === 'TECHNICAL'
                          ? 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]'
                          : 'bg-[#faf6fd] text-[#7c3aed] border border-[#ede9fe]'
                      }`}
                    >
                      {task.lane}
                    </span>
                    <span className="text-[10px] text-[#71717a] font-mono">Date: {task.date}</span>
                    {task.priority === 'High' && (
                      <span className="text-[10px] font-medium text-[#dc2626] flex items-center gap-0.5">
                        <AlertTriangle className="w-2.5 h-2.5" /> High Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-[4px] ${
                    task.status === 'Completed'
                      ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                      : task.status === 'Awaiting approval'
                      ? 'bg-[#fefce8] text-[#a16207] border border-[#fef08a]'
                      : 'bg-[#f4f4f5] text-[#52525b]'
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
