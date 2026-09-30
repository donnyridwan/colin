import React, { useState } from 'react';
import {
  Search,
  Download,
  Upload,
  CheckCircle2,
  TrendingUp,
  Link2,
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

export const SearchMarketingPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'gsc' | 'crawl-summary' | 'crawl-urls' | 'keywords' | 'backlinks'
  >('gsc');

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
      {/* Search Marketing sub-navigation tabs (Rackwise style) */}
      <div className="flex border-b border-[#efefef] overflow-x-auto gap-2">
        <button
          onClick={() => setActiveSubTab('gsc')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors ${
            activeSubTab === 'gsc'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          GSC — Search Queries
        </button>
        <button
          onClick={() => setActiveSubTab('crawl-summary')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors ${
            activeSubTab === 'crawl-summary'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          Screaming Frog Audit & Issues
        </button>
        <button
          onClick={() => setActiveSubTab('crawl-urls')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors ${
            activeSubTab === 'crawl-urls'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          Crawled URLs ({CRAWLED_URLS.length})
        </button>
        <button
          onClick={() => setActiveSubTab('keywords')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors ${
            activeSubTab === 'keywords'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          Keywords — Rankings (SEMrush)
        </button>
        <button
          onClick={() => setActiveSubTab('backlinks')}
          className={`px-3 py-2 text-xs font-semibold tracking-tight border-b-2 whitespace-nowrap transition-colors ${
            activeSubTab === 'backlinks'
              ? 'border-[#171717] text-[#010101]'
              : 'border-transparent text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          Backlinks (Ahrefs)
        </button>
      </div>

      {/* 1. GOOGLE SEARCH CONSOLE TAB (From PDF Page 2) */}
      {activeSubTab === 'gsc' && (
        <div className="space-y-4">
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

          {/* GSC 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <StatCard
              label="Clicks"
              value={GSC_KPIS.clicks.value}
              change={GSC_KPIS.clicks.change}
              subtext="Organic search clicks"
              accentColor="slate"
            />
            <StatCard
              label="Impressions"
              value={GSC_KPIS.impressions.value}
              change={GSC_KPIS.impressions.change}
              changeDirection="up"
              subtext="Search result visibility"
              accentColor="blue"
            />
            <StatCard
              label="CTR"
              value={GSC_KPIS.ctr.value}
              change={GSC_KPIS.ctr.change}
              subtext="Click-through rate"
              accentColor="indigo"
            />
            <StatCard
              label="Avg Position"
              value={GSC_KPIS.avgPosition.value}
              change={GSC_KPIS.avgPosition.change}
              changeDirection="up"
              subtext="Average ranking rank"
              accentColor="emerald"
            />
          </div>

          {/* GSC Search Queries Table */}
          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="p-3.5 border-b border-[#efefef] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#010101] uppercase tracking-wider">
                Top Organic Search Queries
              </h3>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] text-xs font-medium transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Query</th>
                  <th className="py-2.5 px-4">Landing Page</th>
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
                    <td className="py-2.5 px-4 font-mono text-[#2563eb] hover:underline max-w-xs truncate">
                      {row.page}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-[#71717a]">{row.clicks}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-[#010101]">
                      {row.impressions}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-[#52525b]">{row.ctr}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-[#16a34a]">
                      {row.position.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. SCREAMING FROG AUDIT & ISSUES TAB (From PDF Page 2 & 3) */}
      {activeSubTab === 'crawl-summary' && (
        <div className="space-y-4">
          {/* Crawl Score Banner */}
          <div className="p-5 rounded-[8px] bg-white border border-[#efefef] shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-[8px] bg-[#fafafa] border border-[#efefef]">
                <span className="text-[24px] font-bold text-[#d97706]">{CRAWL_OVERVIEW.score}</span>
                <span className="text-[9px] text-[#71717a] font-semibold">/ 100</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#010101]">CRAWL SCORE</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-[#fefce8] text-[#a16207] border border-[#fef08a] font-medium">
                    {CRAWL_OVERVIEW.scoreLabel}
                  </span>
                </div>
                <p className="text-xs text-[#71717a] mt-0.5">
                  {CRAWL_OVERVIEW.pagesCrawled} pages crawled · avg {CRAWL_OVERVIEW.avgTime} ·{' '}
                  {CRAWL_OVERVIEW.redirects3xx} redirects (3xx) · {CRAWL_OVERVIEW.nonIndexable} non-indexable
                </p>
                <div className="text-[11px] text-[#a1a1aa] font-mono mt-0.5">
                  Schedule: {CRAWL_OVERVIEW.schedule}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button className="px-3.5 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] text-[#171717] text-xs font-medium border border-[#e3e3e3] transition-colors inline-flex items-center gap-1.5 shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
                <Upload className="w-3.5 h-3.5" />
                Upload SF export
              </button>
            </div>
          </div>

          {/* HTTP Status Bar */}
          <div className="bg-white border border-[#efefef] rounded-[8px] p-4 space-y-2.5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] inline-block" />
                <span className="text-[#3f3f46] font-medium">Healthy (2xx): {CRAWL_OVERVIEW.healthy2xx}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] inline-block" />
                <span className="text-[#3f3f46] font-medium">Redirects (3xx): {CRAWL_OVERVIEW.redirects3xx}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block" />
                <span className="text-[#3f3f46] font-medium">Broken (4xx/5xx): {CRAWL_OVERVIEW.broken4xx5xx}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a1a1aa] inline-block" />
                <span className="text-[#71717a] font-medium">Blocked / errored: {CRAWL_OVERVIEW.blocked}</span>
              </div>
            </div>

            <div className="h-2 w-full bg-[#f4f4f5] rounded-full overflow-hidden flex">
              <div style={{ width: '21%' }} className="bg-[#16a34a] h-full" />
              <div style={{ width: '47%' }} className="bg-[#eab308] h-full" />
              <div style={{ width: '31%' }} className="bg-[#ef4444] h-full" />
              <div style={{ width: '1%' }} className="bg-[#a1a1aa] h-full" />
            </div>
          </div>

          {/* Audit Issues Table with Filter */}
          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="p-3.5 border-b border-[#efefef] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setIssueFilter('ALL')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-colors ${
                    issueFilter === 'ALL'
                      ? 'bg-[#171717] text-white'
                      : 'bg-white text-[#71717a] hover:bg-[#f4f4f5] border border-[#e4e4e7]'
                  }`}
                >
                  All ({CRAWL_ISSUES.length})
                </button>
                <button
                  onClick={() => setIssueFilter('ERROR')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-colors ${
                    issueFilter === 'ERROR'
                      ? 'bg-[#dc2626] text-white'
                      : 'bg-white text-[#dc2626] hover:bg-[#fef2f2] border border-[#fecaca]'
                  }`}
                >
                  Errors (3)
                </button>
                <button
                  onClick={() => setIssueFilter('WARNING')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-colors ${
                    issueFilter === 'WARNING'
                      ? 'bg-[#d97706] text-white'
                      : 'bg-white text-[#d97706] hover:bg-[#fefce8] border border-[#fef08a]'
                  }`}
                >
                  Warnings (2)
                </button>
                <button
                  onClick={() => setIssueFilter('NOTICE')}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-colors ${
                    issueFilter === 'NOTICE'
                      ? 'bg-[#7c3aed] text-white'
                      : 'bg-white text-[#7c3aed] hover:bg-[#faf6fd] border border-[#ede9fe]'
                  }`}
                >
                  Notices (4)
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#16a34a] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 14 passed
                </span>
                <span className="text-[#d4d4d8]">|</span>
                <button className="text-[#71717a] hover:text-[#18181b] inline-flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Export all
                </button>
              </div>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Severity</th>
                  <th className="py-2.5 px-4">Issue Description</th>
                  <th className="py-2.5 px-4 text-right">Affected Pages</th>
                  <th className="py-2.5 px-4 text-right">Action Dispatched</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efefef] text-[#27272a]">
                {filteredIssues.map((issue, idx) => (
                  <tr key={idx} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-2.5 px-4">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider ${
                          issue.type === 'ERROR'
                            ? 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]'
                            : issue.type === 'WARNING'
                            ? 'bg-[#fefce8] text-[#a16207] border border-[#fef08a]'
                            : 'bg-[#faf6fd] text-[#7c3aed] border border-[#ede9fe]'
                        }`}
                      >
                        {issue.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#010101]">{issue.title}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-[#18181b]">
                      {issue.count}{' '}
                      <span className="text-[#a1a1aa] font-normal">({issue.percentage})</span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-medium ${
                          issue.actionTag === 'Task created'
                            ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                            : issue.actionTag === 'Send to tech'
                            ? 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]'
                            : 'bg-[#faf6fd] text-[#7c3aed] border border-[#ede9fe]'
                        }`}
                      >
                        {issue.actionTag === 'Task created' && <CheckCircle2 className="w-3 h-3" />}
                        {issue.actionTag}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Crawl History Table (From PDF Page 3) */}
          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)] p-4">
            <h3 className="text-xs font-bold text-[#010101] uppercase tracking-wider mb-1">
              CRAWL HISTORY & TRENDS
            </h3>
            <p className="text-[11px] text-[#71717a] mb-3">
              Pages crawled and health score over time
            </p>

            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#efefef] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2 px-3">DATE</th>
                  <th className="py-2 px-3 text-right">PAGES</th>
                  <th className="py-2 px-3 text-right">BROKEN</th>
                  <th className="py-2 px-3 text-right">NON-IDX</th>
                  <th className="py-2 px-3 text-right">AVG TIME</th>
                  <th className="py-2 px-3 text-right">HEALTH SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efefef] font-mono text-[#27272a]">
                {CRAWL_HISTORY.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fafafa]">
                    <td className="py-2 px-3 text-[#71717a]">{row.date}</td>
                    <td className="py-2 px-3 text-right font-medium text-[#010101]">{row.pages}</td>
                    <td className="py-2 px-3 text-right text-[#dc2626] font-medium">{row.broken}</td>
                    <td className="py-2 px-3 text-right text-[#d97706] font-medium">{row.nonIdx}</td>
                    <td className="py-2 px-3 text-right text-[#71717a]">{row.avgTime}</td>
                    <td className="py-2 px-3 text-right font-bold text-[#16a34a]">
                      {row.health} / 100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. CRAWLED URLS DETAILED TABLE (From PDF Page 4 & 5) */}
      {activeSubTab === 'crawl-urls' && (
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-[8px] bg-white border border-[#efefef] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex flex-1 items-center gap-2.5">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-[#a1a1aa] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by URL or title…"
                  value={urlSearch}
                  onChange={(e) => setUrlSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-[6px] bg-white border border-[#e3e3e3] text-xs text-[#18181b] placeholder-[#a1a1aa] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <Dropdown
                value={urlStatusFilter}
                onChange={(val) => setUrlStatusFilter(val)}
                options={[
                  { label: 'All Status Codes', value: 'ALL' },
                  { label: '200 OK', value: '200' },
                  { label: '301 Redirect', value: '301' },
                  { label: '404 Client Error', value: '404' },
                ]}
              />
            </div>

            <div className="text-xs text-[#71717a]">
              Showing {filteredUrls.length} crawled URLs
            </div>
          </div>

          <div className="bg-white border border-[#efefef] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
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
          </div>
        </div>
      )}

      {/* 4. KEYWORDS — RANKINGS (From PDF Page 5) */}
      {activeSubTab === 'keywords' && (
        <div className="bg-white border border-[#efefef] rounded-[8px] p-8 text-center shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <div className="inline-flex p-3 rounded-[6px] bg-[#f2f6fd] text-[#2563eb] mb-3">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#010101]">KEYWORDS — RANKINGS</h3>
          <p className="text-xs text-[#71717a] mt-0.5 max-w-md mx-auto">
            SEMrush organic positions · upload a CSV to start.
          </p>

          <div className="mt-6 border-2 border-dashed border-[#e4e4e7] hover:border-[#171717] rounded-[8px] p-8 max-w-lg mx-auto bg-[#fafafa] transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-[#a1a1aa] mx-auto mb-2" />
            <div className="text-xs font-semibold text-[#18181b]">
              Drop a CSV here or click to browse
            </div>
            <div className="text-[11px] text-[#71717a] mt-0.5">
              Organic Research → Positions → Export (.csv)
            </div>
          </div>
        </div>
      )}

      {/* 5. BACKLINKS (From PDF Page 5-6) */}
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
