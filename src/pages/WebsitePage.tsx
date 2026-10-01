import React, { useState } from 'react';
import {
  Globe,
  Gauge,
  TrendingUp,
  Download,
  Search,
  RefreshCw,
  Plus,
  Smartphone,
  Monitor,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  GA4_KPIS,
  GA4_PAGES,
  PAGESPEED_MOBILE,
  PAGESPEED_DESKTOP,
  TRACKED_PAGES,
} from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { Dropdown } from '../components/common/Dropdown';
import { TrackedPageItem } from '../types';

export const WebsitePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'ga4' | 'pagespeed' | 'tracked'>('ga4');
  const [trackedPagesList, setTrackedPagesList] = useState<TrackedPageItem[]>(TRACKED_PAGES);
  const [newUrlInput, setNewUrlInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter sources
  const filteredPages = GA4_PAGES.filter((item) => {
    const matchesSearch =
      item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sourceMedium.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource =
      sourceFilter === 'All'
        ? true
        : sourceFilter === 'organic'
        ? item.sourceMedium.includes('organic')
        : sourceFilter === 'referral'
        ? item.sourceMedium.includes('referral')
        : sourceFilter === 'direct'
        ? item.sourceMedium.includes('direct')
        : true;
    return matchesSearch && matchesSource;
  });

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const displayedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddTrackedPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrlInput.trim()) return;
    const newEntry: TrackedPageItem = {
      page: newUrlInput.startsWith('/') ? newUrlInput : `/${newUrlInput}`,
      source: 'Pinned URL',
      sessions28d: 0,
      psiPerf: 'Pending',
      lcp: 'Pending',
      sfStatus: '200',
    };
    setTrackedPagesList([newEntry, ...trackedPagesList]);
    setNewUrlInput('');
  };

  const handleExportCSV = () => {
    const headers = 'Page,Source / Medium,Sessions,Users,Engagement,Key events\n';
    const rows = filteredPages
      .map(
        (p) =>
          `"${p.page}","${p.sourceMedium}",${p.sessions},${p.users},"${p.engagement}",${p.keyEvents}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ga4-top-pages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* Sub-navigation tabs (Rackwise clean pill/line) */}
      <div className="flex border-b border-[#efefef] gap-2">
        <button
          onClick={() => setActiveTab('ga4')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 transition-colors ${
            activeTab === 'ga4'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          GA4 — Top Pages & Traffic
        </button>
        <button
          onClick={() => setActiveTab('pagespeed')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 transition-colors ${
            activeTab === 'pagespeed'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          PageSpeed Core Web Vitals
        </button>
        <button
          onClick={() => setActiveTab('tracked')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 transition-colors ${
            activeTab === 'tracked'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          Tracked Pages ({trackedPagesList.length})
        </button>
      </div>

      {/* SECTION 1: GA4 TOP PAGES (From PDF Page 1 & 2) */}
      {(activeTab === 'ga4' || activeTab === 'pagespeed') && (
        <div className="space-y-4">
          {/* Header Info Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[8px] bg-white border border-[#efefef] text-xs shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#010101] uppercase tracking-wide">GA4 — Top Pages</span>
              <span className="text-[#d4d4d8]">|</span>
              <a
                href={GA4_KPIS.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#2563eb] hover:underline font-mono inline-flex items-center gap-1"
              >
                {GA4_KPIS.domain} <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[#d4d4d8] hidden md:inline">·</span>
              <span className="text-[#71717a] hidden md:inline">{GA4_KPIS.dateRange}</span>
              <span className="text-[#d4d4d8] hidden md:inline">·</span>
              <span className="text-[#71717a] hidden md:inline">{GA4_KPIS.totalRows} rows</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#71717a] font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
              Data from yesterday · {GA4_KPIS.asOf}
            </div>
          </div>

          {/* 4 KPI Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <StatCard
              label="Sessions"
              value={GA4_KPIS.sessions.value}
              change={GA4_KPIS.sessions.change}
              changeDirection="up"
              subtext="vs previous 28 days"
              accentColor="blue"
            />
            <StatCard
              label="Users"
              value={GA4_KPIS.users.value}
              change={GA4_KPIS.users.change}
              changeDirection="up"
              subtext="vs previous 28 days"
              accentColor="indigo"
            />
            <StatCard
              label="Pageviews"
              value={GA4_KPIS.pageviews.value}
              change={GA4_KPIS.pageviews.change}
              changeDirection="up"
              subtext="vs previous 28 days"
              accentColor="emerald"
            />
            <StatCard
              label="Key Events"
              value={GA4_KPIS.keyEvents.value}
              change="0"
              changeDirection="neutral"
              subtext="Conversions recorded"
              accentColor="slate"
            />
          </div>

          {/* GA4 Table with filter & search */}
          {activeTab === 'ga4' && (
            <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
              {/* Filter controls */}
              <div className="p-3.5 border-b border-[#efefef] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
                <div className="flex flex-1 items-center gap-2.5">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 text-[#a1a1aa] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter by page or source..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-8 pr-3 py-1.5 rounded-[6px] bg-white border border-[#e3e3e3] text-xs text-[#18181b] placeholder-[#a1a1aa] focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <Dropdown
                    value={sourceFilter}
                    onChange={(val) => {
                      setSourceFilter(val);
                      setCurrentPage(1);
                    }}
                    options={[
                      { label: 'All Sources', value: 'All' },
                      { label: 'Organic Search', value: 'organic' },
                      { label: 'Referral', value: 'referral' },
                      { label: 'Direct', value: 'direct' },
                    ]}
                  />
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-[#71717a]">
                    Showing {filteredPages.length} pages
                  </span>
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] text-xs font-medium transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-2.5 px-4">Page</th>
                      <th className="py-2.5 px-4">Source / Medium</th>
                      <th className="py-2.5 px-4 text-right">Sessions</th>
                      <th className="py-2.5 px-4 text-right">Users</th>
                      <th className="py-2.5 px-4 text-right">Engagement</th>
                      <th className="py-2.5 px-4 text-right">Key Events</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#efefef] text-[#27272a]">
                    {displayedPages.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#fafafa] transition-colors">
                        <td className="py-2.5 px-4 font-mono text-[#2563eb] hover:underline max-w-xs truncate font-medium">
                          {row.page}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-[#71717a] text-[11px]">
                          {row.sourceMedium}
                        </td>
                        <td className="py-2.5 px-4 text-right font-semibold text-[#010101]">
                          {row.sessions}
                        </td>
                        <td className="py-2.5 px-4 text-right text-[#52525b]">{row.users}</td>
                        <td className="py-2.5 px-4 text-right">
                          <span
                            className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                              parseInt(row.engagement) >= 80
                                ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                                : parseInt(row.engagement) >= 40
                                ? 'bg-[#fefce8] text-[#a16207] border border-[#fef08a]'
                                : 'bg-[#f4f4f5] text-[#71717a]'
                            }`}
                          >
                            {row.engagement}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right text-[#a1a1aa] font-mono">
                          {row.keyEvents}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-3 border-t border-[#efefef] flex items-center justify-between text-xs text-[#71717a] bg-white">
                <div>
                  Page {currentPage} of {totalPages || 1} · {filteredPages.length} rows
                </div>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1 rounded-[4px] bg-white border border-[#e3e3e3] text-[#52525b] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#fafafa]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1 rounded-[4px] bg-white border border-[#e3e3e3] text-[#52525b] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#fafafa]"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: PAGESPEED INSIGHTS (From PDF Page 2) */}
      {(activeTab === 'pagespeed' || activeTab === 'ga4') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between p-3.5 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
            <div>
              <h2 className="text-xs font-bold text-[#010101] uppercase tracking-wider flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#2563eb]" />
                PageSpeed Insights — Core Web Vitals
              </h2>
              <div className="text-[11px] text-[#71717a] font-mono mt-0.5">
                https://aizonemarketing.io/ · Data as of Sep 27, 2026
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white font-medium text-xs transition-colors shadow-sm">
              <RefreshCw className="w-3 h-3" />
              Run PageSpeed
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Mobile Card */}
            <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#efefef]">
                <div className="flex items-center gap-2 text-[#010101] font-semibold text-xs">
                  <Smartphone className="w-4 h-4 text-[#d97706]" />
                  <span>MOBILE PERFORMANCE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-[#fefce8] text-[#a16207] border border-[#fef08a] font-medium">
                  Needs Improvement
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-5 text-center">
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">Performance</div>
                  <div className="text-[20px] font-bold text-[#d97706] mt-0.5">{PAGESPEED_MOBILE.performance}</div>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">SEO</div>
                  <div className="text-[20px] font-bold text-[#16a34a] mt-0.5">{PAGESPEED_MOBILE.seo}</div>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">Accessibility</div>
                  <div className="text-[20px] font-bold text-[#16a34a] mt-0.5">{PAGESPEED_MOBILE.accessibility}</div>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">Best Practices</div>
                  <div className="text-[20px] font-bold text-[#16a34a] mt-0.5">{PAGESPEED_MOBILE.bestPractices}</div>
                </div>
              </div>

              {/* Vitals Diagnostics */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">Largest Contentful Paint (LCP)</span>
                  <span className="font-mono font-semibold text-[#dc2626]">{PAGESPEED_MOBILE.lcp} (High)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">Cumulative Layout Shift (CLS)</span>
                  <span className="font-mono font-semibold text-[#16a34a]">{PAGESPEED_MOBILE.cls} (Good)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">Total Blocking Time (TBT)</span>
                  <span className="font-mono font-semibold text-[#16a34a]">{PAGESPEED_MOBILE.tbt} (Good)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">First Contentful Paint (FCP)</span>
                  <span className="font-mono font-semibold text-[#d97706]">{PAGESPEED_MOBILE.fcp}</span>
                </div>
              </div>
            </div>

            {/* Desktop Card */}
            <div className="bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#efefef]">
                <div className="flex items-center gap-2 text-[#010101] font-semibold text-xs">
                  <Monitor className="w-4 h-4 text-[#16a34a]" />
                  <span>DESKTOP PERFORMANCE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] font-medium">
                  Good Condition
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-5 text-center">
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">Performance</div>
                  <div className="text-[20px] font-bold text-[#16a34a] mt-0.5">{PAGESPEED_DESKTOP.performance}</div>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">SEO</div>
                  <div className="text-[20px] font-bold text-[#16a34a] mt-0.5">{PAGESPEED_DESKTOP.seo}</div>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">Accessibility</div>
                  <div className="text-[20px] font-bold text-[#16a34a] mt-0.5">{PAGESPEED_DESKTOP.accessibility}</div>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <div className="text-[9px] font-semibold text-[#71717a] uppercase">Best Practices</div>
                  <div className="text-[20px] font-bold text-[#16a34a] mt-0.5">{PAGESPEED_DESKTOP.bestPractices}</div>
                </div>
              </div>

              {/* Vitals Diagnostics */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">Largest Contentful Paint (LCP)</span>
                  <span className="font-mono font-semibold text-[#16a34a]">{PAGESPEED_DESKTOP.lcp} (Fast)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">Cumulative Layout Shift (CLS)</span>
                  <span className="font-mono font-semibold text-[#16a34a]">{PAGESPEED_DESKTOP.cls}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">Total Blocking Time (TBT)</span>
                  <span className="font-mono font-semibold text-[#16a34a]">{PAGESPEED_DESKTOP.tbt}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#efefef]">
                  <span className="text-[#71717a]">First Contentful Paint (FCP)</span>
                  <span className="font-mono font-semibold text-[#16a34a]">{PAGESPEED_DESKTOP.fcp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TRACKED PAGES (From PDF Page 2) */}
      {(activeTab === 'tracked' || activeTab === 'pagespeed') && (
        <div className="space-y-3.5 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
            <div>
              <h3 className="text-xs font-bold text-[#010101] uppercase tracking-wider">TRACKED PAGES</h3>
              <p className="text-[11px] text-[#71717a] mt-0.5">
                Home + top-traffic pages (auto from GA4) + your pinned URLs · measured weekly by PageSpeed
              </p>
            </div>

            <form onSubmit={handleAddTrackedPage} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="https://aizonemarketing.io/page…"
                value={newUrlInput}
                onChange={(e) => setNewUrlInput(e.target.value)}
                className="px-2.5 py-1.5 rounded-[6px] bg-white border border-[#e3e3e3] text-xs text-[#18181b] placeholder-[#a1a1aa] focus:outline-none focus:border-[#171717] w-52"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white font-medium text-xs transition-colors shrink-0 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add URL
              </button>
            </form>
          </div>

          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-4">PAGE</th>
                  <th className="py-2.5 px-4">SOURCE</th>
                  <th className="py-2.5 px-4 text-right">SESSIONS 28D</th>
                  <th className="py-2.5 px-4 text-center">PSI PERF M/D</th>
                  <th className="py-2.5 px-4 text-center">LCP M/D</th>
                  <th className="py-2.5 px-4 text-center">SF STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efefef] text-[#27272a]">
                {trackedPagesList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-2.5 px-4 font-mono text-[#2563eb] font-medium">{item.page}</td>
                    <td className="py-2.5 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-[#f4f4f5] text-[#52525b]">
                        {item.source}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-[#010101]">
                      {item.sessions28d}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-medium text-[#27272a]">
                      {item.psiPerf}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono text-[#71717a]">{item.lcp}</td>
                    <td className="py-2.5 px-4 text-center">
                      {item.sfStatus === '200' ? (
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] font-mono text-[10px] font-semibold">
                          200 OK
                        </span>
                      ) : (
                        <span className="text-[#a1a1aa] font-mono">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
