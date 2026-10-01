import React, { useState } from 'react';
import {
  Menu,
  SlidersHorizontal,
  ArrowUpDown,
  Download,
  Bell,
  MoreVertical,
  Play,
  Sparkles,
} from 'lucide-react';
import { MenuId } from '../../types';

interface HeaderProps {
  currentMenu: MenuId;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
  onRunAudit?: () => void;
  isAuditing?: boolean;
}

const MENU_TITLES: Record<
  MenuId,
  { title: string; subtitle: string; countBadge?: number | string }
> = {
  overview: {
    title: 'Report',
    subtitle: 'Multi-Channel AI Site Audit & Executive Summary',
    countBadge: 12,
  },
  website: {
    title: 'Website',
    subtitle: 'GA4 Traffic, Landing Pages & Core Web Vitals',
    countBadge: 67,
  },
  'search-marketing': {
    title: 'Search Marketing',
    subtitle: 'Google Search Console Queries & Screaming Frog Site Audit',
    countBadge: 478,
  },
  'paid-media': {
    title: 'Paid Media',
    subtitle: 'Google Ads & Meta Ads Performance',
    countBadge: 3,
  },
  'social-media': {
    title: 'Social Media',
    subtitle: 'Social Channels, Reach & Engagement',
    countBadge: 'Setup',
  },
  'email-marketing': {
    title: 'Email Marketing',
    subtitle: 'Newsletters & Email Campaign Funnels',
    countBadge: 'Setup',
  },
  cro: {
    title: 'CRO',
    subtitle: 'Conversion Rate Optimization & Experiments',
    countBadge: 'Clarity',
  },
  strategies: {
    title: 'Strategies',
    subtitle: 'Marketing Strategy & Execution Roadmap',
    countBadge: 'Plan',
  },
  reports: {
    title: 'Reports',
    subtitle: 'Automated Client Reports & Reviews',
    countBadge: 'Monthly',
  },
  'brand-brief': {
    title: 'Brand Brief',
    subtitle: 'Brand Guidelines & Value Proposition',
    countBadge: 'Brief',
  },
  'actionable-items': {
    title: 'Actionable Items',
    subtitle: 'Audit Action Tasks & Approvals',
    countBadge: 6,
  },
  'task-db': {
    title: 'Tasks',
    subtitle: 'Centralized Tasks from Audit (PDF Page 6)',
    countBadge: 15,
  },
  connections: {
    title: 'Connections',
    subtitle: 'Data Sources & Connected Integrations',
    countBadge: 5,
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'System & Crawl Station Event Logs',
    countBadge: 4,
  },
  'images-graphics': {
    title: 'Images & Graphics',
    subtitle: 'Creative Brand & Campaign Assets',
    countBadge: 'Assets',
  },
  videos: {
    title: 'Videos',
    subtitle: 'Video Ad Creatives & Video Content',
    countBadge: 'Media',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentMenu,
  onOpenMobile,
  onOpenSearch,
  onRunAudit,
  isAuditing = false,
}) => {
  const [selectedRange, setSelectedRange] = useState<'12m' | '30d' | '7d' | 'today'>('12m');

  const currentInfo = MENU_TITLES[currentMenu] || {
    title: 'Report',
    subtitle: 'AIZone Marketing Client Portal',
    countBadge: 12,
  };

  const showDateToolbar = ['overview', 'website', 'search-marketing', 'reports'].includes(currentMenu);

  return (
    <header className="bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 py-3.5 space-y-3 shrink-0">
      {/* Top Bar: Title + Count Badge and User Profile Tools */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="p-1.5 -ml-1 rounded-[8px] text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] lg:hidden transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <h1 className="text-[20px] sm:text-[22px] font-bold text-[#0f172a] tracking-tight leading-none">
              {currentInfo.title}
            </h1>
            {currentInfo.countBadge !== undefined && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0]">
                {currentInfo.countBadge}
              </span>
            )}
          </div>
        </div>

        {/* Right Tools: Avatar & Notifications */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-[8px] hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a] absolute top-2 right-2" />
          </button>

          <button
            className="p-2 rounded-[8px] hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] transition-colors"
            title="Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-[#e2e8f0]">
            <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-xs">
              DR
            </div>
          </div>
        </div>
      </div>

      {/* Action / Filter Bar matching Figma Trackly exactly */}
      {showDateToolbar && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
          {/* Trackly Segmented Date Filter */}
          <div className="flex items-center bg-[#f1f5f9] p-1 rounded-[10px] border border-[#e2e8f0] text-xs w-fit">
            <button
              type="button"
              onClick={() => setSelectedRange('12m')}
              className={`px-3 py-1 rounded-[8px] text-xs font-medium transition-all ${
                selectedRange === '12m'
                  ? 'bg-white text-[#0f172a] font-semibold shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              12 Months
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('30d')}
              className={`px-3 py-1 rounded-[8px] text-xs font-medium transition-all ${
                selectedRange === '30d'
                  ? 'bg-white text-[#0f172a] font-semibold shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              30 Days
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('7d')}
              className={`px-3 py-1 rounded-[8px] text-xs font-medium transition-all ${
                selectedRange === '7d'
                  ? 'bg-white text-[#0f172a] font-semibold shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              7 Days
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('today')}
              className={`px-3 py-1 rounded-[8px] text-xs font-medium transition-all ${
                selectedRange === 'today'
                  ? 'bg-white text-[#0f172a] font-semibold shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              Today
            </button>
          </div>

          {/* Action Buttons: Filter, Sort, Primary Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold shadow-2xs transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748b]" />
              <span>Filter</span>
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold shadow-2xs transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#64748b]" />
              <span>Sort</span>
            </button>

            {/* Primary Action Button (Export Reports / Run Audit) */}
            {onRunAudit ? (
              <button
                onClick={onRunAudit}
                disabled={isAuditing}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold shadow-xs transition-colors active:scale-95 disabled:opacity-50"
              >
                {isAuditing ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Audit · Pro</span>
                  </>
                )}
              </button>
            ) : (
              <button
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold shadow-xs transition-colors active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Reports</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
