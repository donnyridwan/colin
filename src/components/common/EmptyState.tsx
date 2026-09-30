import React from 'react';
import { LucideIcon, PlusCircle, ExternalLink, HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  tips?: string[];
  suggestedFromAudit?: {
    title: string;
    description: string;
  }[];
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  category,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  tips,
  suggestedFromAudit,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header banner */}
      <div className="bg-white border border-[#efefef] rounded-[8px] p-8 text-center shadow-[0px_1px_2px_rgba(0,0,0,0.03)] relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-[8px] bg-[#f4f4f5] text-[#18181b] mb-4">
          <Icon className="w-7 h-7" />
        </div>

        <div className="inline-block px-2.5 py-0.5 rounded-[4px] text-[10px] font-semibold bg-[#f4f4f5] text-[#52525b] border border-[#e4e4e7] mb-2.5 uppercase tracking-wide">
          {category} · Placeholder Page
        </div>

        <h2 className="text-xl font-bold text-[#010101] mb-2 tracking-tight">{title}</h2>
        <p className="text-[#71717a] max-w-lg mx-auto text-xs leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {actionText && (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#171717] hover:bg-[#262626] text-white font-medium text-xs transition-colors shadow-sm active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              {actionText}
            </button>
          )}

          {secondaryActionText && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-white hover:bg-[#fafafa] border border-[#e3e3e3] text-[#171717] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)] active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {secondaryActionText}
            </button>
          )}
        </div>
      </div>

      {/* Audit Suggestions / Pending Connections if any */}
      {suggestedFromAudit && suggestedFromAudit.length > 0 && (
        <div className="mt-6 bg-white border border-[#efefef] rounded-[8px] p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <h3 className="text-xs font-semibold text-[#18181b] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            Relevant Tasks & Notes from Current Audit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedFromAudit.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#efefef] hover:border-[#e4e4e7] transition-colors"
              >
                <div className="text-xs font-semibold text-[#171717] mb-1">{item.title}</div>
                <div className="text-[11px] text-[#71717a] leading-normal">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informative Tips */}
      {tips && tips.length > 0 && (
        <div className="mt-4 p-3.5 rounded-[6px] bg-[#fafafa] border border-[#efefef] flex items-start gap-2.5 text-xs text-[#71717a]">
          <HelpCircle className="w-4 h-4 text-[#a1a1aa] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#27272a]">Why is this page empty?</span>
            <ul className="list-disc list-inside space-y-0.5 text-[#71717a] text-[11px]">
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
