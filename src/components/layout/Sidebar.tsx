import React from 'react';
import {
  LayoutDashboard,
  Globe,
  Search,
  Megaphone,
  Share2,
  Mail,
  Zap,
  Compass,
  FileBarChart2,
  Palette,
  CheckSquare,
  Database,
  Unplug,
  Bell,
  Image,
  Video,
  ChevronRight,
  ShieldCheck,
  Search as SearchIcon,
} from 'lucide-react';
import { MenuId } from '../../types';

interface SidebarProps {
  currentMenu: MenuId;
  onSelectMenu: (menu: MenuId) => void;
  taskCount: number;
  actionableCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenSearch: () => void;
}

interface NavSection {
  title?: string;
  items: {
    id: MenuId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
    hasContent: boolean;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMenu,
  onSelectMenu,
  taskCount,
  actionableCount,
  isOpenMobile,
  onCloseMobile,
  onOpenSearch,
}) => {
  const sections: NavSection[] = [
    {
      items: [
        {
          id: 'overview',
          label: 'OVERVIEW',
          icon: LayoutDashboard,
          hasContent: true,
        },
      ],
    },
    {
      title: 'CHANNELS',
      items: [
        {
          id: 'website',
          label: 'WEBSITE',
          icon: Globe,
          hasContent: true,
          badge: 'GA4 + PSI',
          badgeColor: 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]',
        },
        {
          id: 'search-marketing',
          label: 'SEARCH MGKT',
          icon: Search,
          hasContent: true,
          badge: 'GSC + Crawl',
          badgeColor: 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]',
        },
        {
          id: 'paid-media',
          label: 'PAID MEDIA',
          icon: Megaphone,
          hasContent: false,
        },
        {
          id: 'social-media',
          label: 'SOCIAL MEDIA',
          icon: Share2,
          hasContent: false,
        },
        {
          id: 'email-marketing',
          label: 'EMAIL MGKT',
          icon: Mail,
          hasContent: false,
        },
        {
          id: 'cro',
          label: 'CRO',
          icon: Zap,
          hasContent: false,
        },
      ],
    },
    {
      title: 'PLANNING & REPORTS',
      items: [
        {
          id: 'strategies',
          label: 'STRATEGIES',
          icon: Compass,
          hasContent: false,
        },
        {
          id: 'reports',
          label: 'REPORTS',
          icon: FileBarChart2,
          hasContent: false,
        },
      ],
    },
    {
      title: 'MANAGEMENT & TASKS',
      items: [
        {
          id: 'brand-brief',
          label: 'BRAND BRIEF',
          icon: Palette,
          hasContent: false,
        },
        {
          id: 'actionable-items',
          label: 'ACTIONABLE ITEMS',
          icon: CheckSquare,
          hasContent: true,
          badge: actionableCount > 0 ? actionableCount : undefined,
          badgeColor: 'bg-[#fefce8] text-[#a16207] border border-[#fef08a]',
        },
        {
          id: 'task-db',
          label: 'TASK DB',
          icon: Database,
          hasContent: true,
          badge: taskCount,
          badgeColor: 'bg-[#f4f4f5] text-[#52525b] border border-[#e4e4e7]',
        },
      ],
    },
    {
      title: 'SETTINGS & SYNC',
      items: [
        {
          id: 'connections',
          label: 'CONNECTIONS',
          icon: Unplug,
          hasContent: true,
          badge: '5/5',
          badgeColor: 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]',
        },
        {
          id: 'notifications',
          label: 'NOTIFICATIONS',
          icon: Bell,
          hasContent: true,
          badge: '4',
          badgeColor: 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]',
        },
      ],
    },
    {
      title: 'ASSETS',
      items: [
        {
          id: 'images-graphics',
          label: 'IMAGES / GRAPHICS',
          icon: Image,
          hasContent: false,
        },
        {
          id: 'videos',
          label: 'VIDEOS',
          icon: Video,
          hasContent: false,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#fafafa] border-r border-[#efefef] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header (Rackwise Clean Style - Exactly h-16 to align perfectly with top Header) */}
        <div className="h-16 px-4 border-b border-[#efefef] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#171717] flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-sm">
              AI
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#010101] tracking-tight leading-snug">
                AIZone Marketing
              </div>
              <div className="text-[11px] text-[#8f8f8f] font-mono leading-none">
                aizonemarketing.io
              </div>
            </div>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c661] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c661]"></span>
          </span>
        </div>

        {/* Quick Search Bar (Directly from Rackwise Sidebar) */}
        <div className="px-3 pt-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full bg-white hover:bg-[#fafafa] hover:border-[#d4d4d8] border border-[#e3e3e3] flex h-[30px] items-center justify-between px-2 rounded-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.03)] text-[#636363] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-xs text-[#71717a] group-hover:text-[#18181b]">
              <SearchIcon className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-[#71717a]" />
              <span>Search menu, tasks...</span>
            </div>
            <span className="bg-[#f4f4f5] text-[10px] text-[#71717a] font-mono px-1 py-0.5 rounded-[4px] border border-[#e4e4e7]">
              ⌘ K
            </span>
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-0.5">
              {section.title && (
                <div className="px-2.5 text-[10px] font-semibold tracking-wider text-[#a1a1aa] uppercase mb-1">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectMenu(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-[12px] font-medium tracking-tight transition-colors ${
                      isActive
                        ? 'bg-[#f1f1f1] text-[#010101] font-semibold'
                        : 'text-[#6e6e6e] hover:text-[#010101] hover:bg-[#f1f1f1]/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#010101]'
                            : 'text-[#8f8f8f] group-hover:text-[#171717]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.2 rounded-[4px] ${
                            item.badgeColor || 'bg-[#f4f4f5] text-[#71717a]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {!item.hasContent && !isActive && (
                        <span className="text-[9px] text-[#a1a1aa] bg-[#f4f4f5] px-1 py-0.2 rounded-[3px]">
                          Empty
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3 h-3 transition-transform ${
                          isActive
                            ? 'text-[#71717a] translate-x-0.5'
                            : 'text-[#d4d4d8] opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer client status card (Rackwise style) */}
        <div className="p-3 border-t border-[#efefef] bg-white">
          <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#efefef] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
              <span className="text-[#3f3f46] font-medium">Audit Pro Tier</span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-[#16a34a]">Score: 73</span>
          </div>
        </div>
      </aside>
    </>
  );
};
