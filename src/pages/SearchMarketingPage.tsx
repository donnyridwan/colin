import React, { useState } from 'react';
import {
  Search,
  Download,
  Upload,
  CheckCircle2,
  TrendingUp,
  Link2,
  Activity,
  Layers,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import {
  GSC_KPIS,
  GSC_QUERIES,
  CRAWL_OVERVIEW,
  CRAWL_ISSUES,
  CRAWL_HISTORY,
  CRAWLED_URLS,
} from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { Dropdown } from '../components/common/Dropdown';
import { MenuId } from '../types';

interface SearchMarketingPageProps {
  onNavigate?: (menu: MenuId) => void;
}

export const SearchMarketingPage: React.FC<SearchMarketingPageProps> = ({ onNavigate }) => {
  // Reorganized into 4 clean functional tabs (Unified Keywords, Technical Crawl, Crawled URLs, and Off-page Backlinks)
  const [activeSubTab, setActiveSubTab] = useState<
    'keywords' | 'crawl-summary' | 'crawl-urls' | 'backlinks'
  >('keywords');

  const [issueFilter, setIssueFilter] = useState<'ALL' | 'ERROR' | 'WARNING' | 'NOTICE'>('ALL');
  const [urlSearch, setUrlSearch] = useState('');
  const [urlStatusFilter, setUrlStatusFilter] = useState<string>('ALL');

  const filteredIssues = CRAWL_ISSUES.filter((issue) => {
    if (issueFilter === 'ALL') return true;
    return issue.type === issueFilter;
  });

  const filteredUrls = CRAWLED_URLS.filter((item) => {
    const matchesSearch = item.url.toLowerCase().includes(urlSearch.toLowerCase());
    const matchesStatus =
      urlStatusFilter === 'ALL'
        ? true
        : urlStatusFilter === '200'
        ? item.status === 200
        : urlStatusFilter === '301'
        ? item.status === 301
        : urlStatusFilter === '404'
        ? item.status === 404
        : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* Sub-navigation tabs (Clean Light Mode Rackwise style) */}
      <div className="flex border-b border-[#efefef] overflow-x-auto gap-2">
        <button
          onClick={() => setActiveSubTab('keywords')}
          className={`px-3.5 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'keywords'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Organic Keywords & Rankings (GSC + SEMrush)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('crawl-summary')}
          className={`px-3.5 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'crawl-summary'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Technical Crawl Audit (Screaming Frog)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('crawl-urls')}
          className={`px-3.5 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'crawl-urls'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Crawled URLs ({CRAWLED_URLS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('backlinks')}
          className={`px-3.5 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'backlinks'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Off-Page Backlinks (Ahrefs)</span>
        </button>
      </div>

      {/* 1. ORGANIC KEYWORDS & RANKINGS (Poin 5: Unifying GSC Queries & SEMrush Keywords) */}
      {activeSubTab === 'keywords' && (
        <div className="space-y-5">
          {/* GSC Queries Header bar from PDF Page 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[8px] bg-white border border-[#efefef] text-xs shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#010101] uppercase tracking-wide">GSC — SEARCH QUERIES</span>
              <span className="text-[#d4d4d8]">|</span>
              <span className="text-[#2563eb] font-mono">https://aizonemarketing.io/</span>
              <span className="text-[#d4d4d8] hidden md:inline">·</span>
              <span className="text-[#71717a] hidden md:inline">{GSC_KPIS.dateRange}</span>
              <span className="text-[#d4d4d8] hidden md:inline">·</span>
              <span className="text-[#71717a] hidden md:inline">{GSC_QUERIES.length} rows</span>
            </div>
            <div className="text-[#71717a] font-mono text-[11px]">
              Data from 2 days ago · {GSC_KPIS.asOf} · ✓ aizonemarketing.io
            </div>
          </div>

          {/* 4 GSC Primary KPI StatCards (PDF Page 2) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <StatCard
              label="Clicks"
              value={GSC_KPIS.clicks.value}
              subtext="Organic search clicks"
              badge="GSC"
              accentColor="blue"
            />
            <StatCard
              label="Impressions"
              value={GSC_KPIS.impressions.value}
              subtext={`Visibility (${GSC_KPIS.impressions.change})`}
              badge="Top Performer"
              badgeColor="bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]"
              accentColor="emerald"
            />
            <StatCard
              label="CTR"
              value={GSC_KPIS.ctr.value}
              subtext="Click-through rate"
              badge="GSC"
              accentColor="amber"
            />
            <StatCard
              label="Avg Position"
              value={GSC_KPIS.avgPosition.value}
              subtext={`Google ranking (${GSC_KPIS.avgPosition.change})`}
              badge="Improved"
              badgeColor="bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]"
              accentColor="indigo"
            />
          </div>

          {/* GSC Search Queries Table (PDF Page 2) */}
          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="p-3.5 border-b border-[#efefef] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
                <input
                  type="text"
                  placeholder="Filter by query or page..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-[6px] border border-[#efefef] text-xs bg-[#fafafa] placeholder-[#a1a1aa] focus:outline-none focus:border-[#171717] focus:bg-white"
                />
              </div>

              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
                <Download className="w-3.5 h-3.5 text-[#52525b]" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Query</th>
                    <th className="py-2.5 px-4">Target Page</th>
                    <th className="py-2.5 px-4 text-right">Clicks</th>
                    <th className="py-2.5 px-4 text-right">Impr.</th>
                    <th className="py-2.5 px-4 text-right">CTR</th>
                    <th className="py-2.5 px-4 text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efefef] text-[#27272a]">
                  {GSC_QUERIES.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fafafa] transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#010101]">{row.query}</td>
                      <td className="py-2.5 px-4 font-mono text-[#2563eb] text-[11px] truncate max-w-xs">
                        {row.page}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono">{row.clicks}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-medium">{row.impressions}</td>
                      <td className="py-2.5 px-4 text-right font-mono">{row.ctr}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-[#16a34a]">
                        {row.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-[#efefef] bg-[#fafafa] text-[11px] text-[#71717a] flex items-center justify-between">
              <span>Showing Page 1 of 1 · {GSC_QUERIES.length} rows</span>
            </div>
          </div>

          {/* Unified SEMrush Organic Positions Dropzone (Moved directly under GSC per Poin 5) */}
          <div className="bg-white border border-[#efefef] rounded-[8px] p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#efefef]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[6px] bg-[#f2f6fd] text-[#2563eb] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#010101] uppercase tracking-wide">
                    KEYWORDS — RANKINGS (SEMrush)
                  </h3>
                  <p className="text-[11px] text-[#71717a]">
                    Cross-reference organic Google Search Console queries with full SEMrush position tracking.
                  </p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)] self-start sm:self-center">
                <Upload className="w-3.5 h-3.5 text-[#52525b]" />
                <span>Upload CSV</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-[#e4e4e7] hover:border-[#171717] rounded-[8px] p-6 text-center bg-[#fafafa] transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-[#a1a1aa] mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-[#18181b]">
                Drop a CSV here or click to browse
              </div>
              <div className="text-[11px] text-[#71717a] mt-0.5">
                Organic Research → Positions → Export (.csv)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TECHNICAL SITE AUDIT TAB (From PDF Page 3) */}
      {activeSubTab === 'crawl-summary' && (
        <div className="space-y-5">
          {/* Header Info Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[8px] bg-white border border-[#efefef] text-xs shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#010101] uppercase tracking-wide">
                SCREAMING FROG — SITE AUDIT
              </span>
              <span className="text-[#d4d4d8]">|</span>
              <span className="text-[#71717a]">Data as of {CRAWL_OVERVIEW.date}</span>
              <span className="text-[#d4d4d8]">·</span>
              <span className="text-[#18181b] font-medium">{CRAWL_OVERVIEW.pagesCrawled} pages</span>
              <span className="text-[#d4d4d8]">·</span>
              <span className="text-[#16a34a] font-medium">scheduled crawl</span>
            </div>

            <div className="flex items-center gap-2">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('notifications')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#2563eb] hover:underline font-medium"
                >
                  <span>View Crawl Logs in Notifications</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
                <Upload className="w-3.5 h-3.5 text-[#52525b]" />
                <span>Upload SF export</span>
              </button>
            </div>
          </div>

          {/* Crawl score card & Health breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Score box */}
            <div className="p-5 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider">CRAWL SCORE</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[36px] font-bold text-[#010101] leading-none">{CRAWL_OVERVIEW.score}</span>
                  <span className="text-xs text-[#71717a]">/ 100</span>
                  <span className="ml-2 px-2 py-0.5 rounded-[4px] bg-[#fefce8] text-[#a16207] border border-[#fef08a] text-[10px] font-bold uppercase">
                    {CRAWL_OVERVIEW.scoreLabel}
                  </span>
                </div>
                <div className="text-xs text-[#71717a] mt-3 space-y-1">
                  <div>{CRAWL_OVERVIEW.pagesCrawled} pages crawled · avg {CRAWL_OVERVIEW.avgTime}</div>
                  <div className="text-[#a16207] font-medium">{CRAWL_OVERVIEW.redirects3xx} redirects (3xx) · {CRAWL_OVERVIEW.nonIndexable} non-indexable</div>
                </div>
              </div>
            </div>

            {/* Error counts */}
            <div className="lg:col-span-2 p-5 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded-[6px] bg-[#fef2f2] border border-[#fecaca]">
                    <span className="text-[10px] font-bold text-[#dc2626] uppercase">Errors</span>
                    <div className="text-2xl font-bold text-[#dc2626] mt-0.5">{CRAWL_OVERVIEW.errors}</div>
                  </div>
                  <div className="p-3 rounded-[6px] bg-[#fefce8] border border-[#fef08a]">
                    <span className="text-[10px] font-bold text-[#a16207] uppercase">Warnings</span>
                    <div className="text-2xl font-bold text-[#a16207] mt-0.5">{CRAWL_OVERVIEW.warnings}</div>
                  </div>
                  <div className="p-3 rounded-[6px] bg-[#eff6ff] border border-[#bfdbfe]">
                    <span className="text-[10px] font-bold text-[#2563eb] uppercase">Notices</span>
                    <div className="text-2xl font-bold text-[#2563eb] mt-0.5">{CRAWL_OVERVIEW.notices}</div>
                  </div>
                </div>

                {/* HTTP Status Breakdown bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#52525b] font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#16a34a]" /> Healthy (2xx): 100</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#eab308]" /> Redirects (3xx): 226</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ef4444]" /> Broken (4xx/5xx): 151</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#a1a1aa]" /> Blocked: 1</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#f4f4f5] rounded-full overflow-hidden flex">
                    <div style={{ width: '21%' }} className="bg-[#16a34a] h-full" />
                    <div style={{ width: '47%' }} className="bg-[#eab308] h-full" />
                    <div style={{ width: '31%' }} className="bg-[#ef4444] h-full" />
                    <div style={{ width: '1%' }} className="bg-[#a1a1aa] h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 9 Issues Filter & Table */}
          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="p-3.5 border-b border-[#efefef] flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-xs font-bold text-[#010101] mr-2">FILTER ISSUES:</span>
                <button
                  onClick={() => setIssueFilter('ALL')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold ${
                    issueFilter === 'ALL'
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#f4f4f5] text-[#52525b] hover:bg-[#e4e4e7]'
                  }`}
                >
                  All ({CRAWL_ISSUES.length})
                </button>
                <button
                  onClick={() => setIssueFilter('ERROR')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold ${
                    issueFilter === 'ERROR'
                      ? 'bg-[#ef4444] text-white'
                      : 'bg-[#fef2f2] text-[#dc2626] hover:bg-[#fee2e2]'
                  }`}
                >
                  Errors (3)
                </button>
                <button
                  onClick={() => setIssueFilter('WARNING')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold ${
                    issueFilter === 'WARNING'
                      ? 'bg-[#eab308] text-white'
                      : 'bg-[#fefce8] text-[#a16207] hover:bg-[#fef08a]'
                  }`}
                >
                  Warnings (2)
                </button>
                <button
                  onClick={() => setIssueFilter('NOTICE')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold ${
                    issueFilter === 'NOTICE'
                      ? 'bg-[#2563eb] text-white'
                      : 'bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe]'
                  }`}
                >
                  Notices (4)
                </button>
              </div>

              <div className="text-[11px] text-[#16a34a] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>14 checks passed</span>
              </div>
            </div>

            <div className="divide-y divide-[#efefef]">
              {filteredIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-[#fafafa] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider shrink-0 ${
                        issue.type === 'ERROR'
                          ? 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]'
                          : issue.type === 'WARNING'
                          ? 'bg-[#fefce8] text-[#a16207] border border-[#fef08a]'
                          : 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]'
                      }`}
                    >
                      {issue.type}
                    </span>
                    <span className="text-xs font-semibold text-[#010101]">{issue.title}</span>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-mono font-bold text-[#18181b]">
                      {issue.count}{' '}
                      <span className="text-[10px] font-normal text-[#71717a]">
                        ({issue.percentage})
                      </span>
                    </span>

                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-[4px] ${
                        issue.actionTag === 'Task created'
                          ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                          : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7]'
                      }`}
                    >
                      {issue.actionTag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crawl History 8 Weeks Table (PDF Page 3 & 4) */}
          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="p-3.5 border-b border-[#efefef] bg-[#fafafa]">
              <h3 className="text-xs font-bold text-[#010101] uppercase tracking-wide">
                CRAWL HISTORY (8 WEEKS)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4 text-right">Pages</th>
                    <th className="py-2.5 px-4 text-right">Broken (4xx)</th>
                    <th className="py-2.5 px-4 text-right">Non-Indexable</th>
                    <th className="py-2.5 px-4 text-right">Avg Response</th>
                    <th className="py-2.5 px-4 text-right">Health Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efefef] font-mono text-[#27272a]">
                  {CRAWL_HISTORY.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fafafa] transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-[#010101]">{row.date}</td>
                      <td className="py-2.5 px-4 text-right">{row.pages}</td>
                      <td className="py-2.5 px-4 text-right text-[#dc2626] font-bold">{row.broken}</td>
                      <td className="py-2.5 px-4 text-right text-[#a16207]">{row.nonIdx}</td>
                      <td className="py-2.5 px-4 text-right">{row.avgTime}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-[#16a34a]">{row.health}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. CRAWLED URLS DATABASE (From PDF Page 4 & 5) */}
      {activeSubTab === 'crawl-urls' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="p-3.5 border-b border-[#efefef] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
                  <input
                    type="text"
                    value={urlSearch}
                    onChange={(e) => setUrlSearch(e.target.value)}
                    placeholder="Filter by URL or title…"
                    className="pl-8 pr-3 py-1.5 rounded-[6px] border border-[#efefef] text-xs bg-[#fafafa] placeholder-[#a1a1aa] focus:outline-none focus:border-[#171717] focus:bg-white w-64"
                  />
                </div>

                <div className="w-36">
                  <Dropdown
                    value={urlStatusFilter}
                    onChange={(val) => setUrlStatusFilter(val)}
                    options={[
                      { label: 'All Statuses', value: 'ALL' },
                      { label: '200 OK', value: '200' },
                      { label: '301 Redirect', value: '301' },
                      { label: '404 Broken', value: '404' },
                    ]}
                  />
                </div>
              </div>

              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
                <Download className="w-3.5 h-3.5 text-[#52525b]" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">URL</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Indexability</th>
                    <th className="py-2.5 px-4 text-right">Title Len</th>
                    <th className="py-2.5 px-4 text-right">Meta Len</th>
                    <th className="py-2.5 px-4 text-right">Words</th>
                    <th className="py-2.5 px-4 text-right">Size</th>
                    <th className="py-2.5 px-4 text-right">Depth</th>
                    <th className="py-2.5 px-4 text-right">Inlinks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efefef] font-mono text-[#27272a]">
                  {filteredUrls.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fafafa] transition-colors">
                      <td className="py-2.5 px-4 text-[#2563eb] font-medium max-w-xs truncate">
                        {row.url}
                      </td>
                      <td className="py-2.5 px-4">
                        <span
                          className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                            row.status === 200
                              ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                              : row.status === 301
                              ? 'bg-[#fefce8] text-[#a16207] border border-[#fef08a]'
                              : 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-[#52525b] text-[11px]">
                        {row.indexability}
                      </td>
                      <td className="py-2.5 px-4 text-right">{row.titleLen}</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={row.metaLen === 0 ? 'text-[#dc2626] font-bold' : ''}>
                          {row.metaLen}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right">{row.words}</td>
                      <td className="py-2.5 px-4 text-right">{row.size}</td>
                      <td className="py-2.5 px-4 text-right">{row.depth}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-[#010101]">{row.inlinks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-[#efefef] bg-[#fafafa] text-[11px] text-[#71717a] flex items-center justify-between">
              <span>Showing {filteredUrls.length} of {CRAWLED_URLS.length} URLs</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. OFF-PAGE BACKLINKS AUDIT (From PDF Page 5-6) */}
      {activeSubTab === 'backlinks' && (
        <div className="bg-white border border-[#efefef] rounded-[8px] p-8 text-center shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <div className="inline-flex p-3 rounded-[6px] bg-[#faf6fd] text-[#7c3aed] mb-3">
            <Link2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#010101]">BACKLINKS AUDIT</h3>
          <p className="text-xs text-[#71717a] mt-0.5 max-w-md mx-auto">
            Backlinks export — source URL, target, anchor, domain rating.
          </p>

          <div className="mt-6 border-2 border-dashed border-[#e4e4e7] hover:border-[#171717] rounded-[8px] p-8 max-w-lg mx-auto bg-[#fafafa] transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-[#a1a1aa] mx-auto mb-2" />
            <div className="text-xs font-semibold text-[#18181b]">
              Drop an Ahrefs / SEMrush backlinks CSV, or click to browse
            </div>
            <div className="text-[11px] text-[#71717a] mt-0.5">
              Ahrefs Site Explorer → Backlinks → Export (.csv)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
