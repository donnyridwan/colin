import React from 'react';
import { Menu, Search, CheckCircle2 } from 'lucide-react';
import { MenuId } from '../../types';

interface HeaderProps {
  currentMenu: MenuId;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
}

const MENU_TITLES: Record<MenuId, { title: string; subtitle: string }> = {
  overview: {
    title: 'Overview',
    subtitle: 'AI Site Audit & Multi-Channel Health Summary',
  },
  website: {
    title: 'Website',
    subtitle: 'GA4 Traffic, Landing Pages & Core Web Vitals',
  },
  'search-marketing': {
    title: 'Search Marketing',
    subtitle: 'Google Search Console Queries & Screaming Frog Site Audit',
  },
  'paid-media': {
    title: 'Paid Media',
    subtitle: 'Google Ads & Meta Ads Performance',
  },
  'social-media': {
    title: 'Social Media',
    subtitle: 'Social Channels, Reach & Engagement',
  },
  'email-marketing': {
    title: 'Email Marketing',
    subtitle: 'Newsletters & Email Campaign Funnels',
  },
  cro: {
    title: 'CRO',
    subtitle: 'Conversion Rate Optimization & Experiments',
  },
  strategies: {
    title: 'Strategies',
    subtitle: 'Marketing Strategy & Execution Roadmap',
  },
  reports: {
    title: 'Reports',
    subtitle: 'Automated Client Reports & Reviews',
  },
  'brand-brief': {
    title: 'Brand Brief',
    subtitle: 'Brand Guidelines & Value Proposition',
  },
  'actionable-items': {
    title: 'Actionable Items',
    subtitle: 'Audit Action Tasks & Approvals',
  },
  'task-db': {
    title: 'Task Database',
    subtitle: 'Centralized Tasks from Audit (PDF Page 6)',
  },
  connections: {
    title: 'Connections',
    subtitle: 'Data Sources & Connected Integrations (PDF Page 1)',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'System & Crawl Station Event Logs',
  },
  'images-graphics': {
    title: 'Images & Graphics',
    subtitle: 'Creative Brand & Campaign Assets',
  },
  videos: {
    title: 'Videos',
    subtitle: 'Video Ad Creatives & Video Content',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentMenu,
  onOpenMobile,
  onOpenSearch,
}) => {
  const currentInfo = MENU_TITLES[currentMenu] || {
    title: 'Dashboard',
    subtitle: 'AIZone Marketing Client Portal',
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#efefef] px-4 sm:px-6 flex items-center justify-between shrink-0">
      {/* Left: Mobile hamburger & current page title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenMobile}
          className="p-1.5 -ml-1 rounded-[6px] text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-[15px] sm:text-[16px] font-semibold text-[#010101] tracking-tight leading-snug">
            {currentInfo.title}
          </h1>
          <p className="hidden sm:block text-[11px] text-[#8f8f8f] leading-none">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls: Client domain & Search command palette */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Verified domain indicator from PDF (✓ aizonemarketing.io) */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#fafafa] border border-[#efefef] text-[11px] text-[#52525b] font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
          <span>aizonemarketing.io</span>
        </div>

        {/* Global Search trigger button (⌘K) */}
        <button
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#52525b] hover:text-[#18181b] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]"
          title="Search anything (⌘ K)"
        >
          <Search className="w-3.5 h-3.5 text-[#71717a]" />
          <span className="hidden sm:inline text-xs">Search</span>
          <kbd className="px-1.5 py-0.5 bg-[#f4f4f5] border border-[#e4e4e7] rounded text-[10px] text-[#71717a] font-mono font-semibold">⌘K</kbd>
        </button>
      </div>
    </header>
  );
};
