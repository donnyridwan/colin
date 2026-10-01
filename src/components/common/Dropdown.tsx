import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, LucideIcon } from 'lucide-react';

export interface DropdownOption {
  label: string;
  value: string;
  badge?: string;
  badgeColor?: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  size?: 'sm' | 'md';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Select option',
  icon: Icon,
  size = 'md',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-2.5 bg-white border border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#fafafa] rounded-[6px] text-xs font-medium text-[#374151] transition-all duration-150 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] focus:outline-none focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#171717]/5 ${
          size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5'
        } ${isOpen ? 'border-[#171717] ring-2 ring-[#171717]/5 bg-[#fafafa]' : ''}`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {Icon && <Icon className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#6b7280] shrink-0" />}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#4b5157] shrink-0 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-[#171717]' : ''
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-1 min-w-[160px] w-max max-w-xs bg-white border border-[#e5e7eb] rounded-[8px] shadow-[0px_8px_20px_rgba(0,0,0,0.08)] py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
          <div className="max-h-60 overflow-y-auto py-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-[calc(100%-8px)] mx-1 text-left px-2.5 py-1.5 rounded-[5px] text-xs flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-[#f4f4f5] text-[#09090b] font-semibold'
                      : 'text-[#4b5157] hover:bg-[#fafafa] hover:text-[#09090b]'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {option.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-[3px] font-medium ${
                          option.badgeColor || 'bg-[#f4f4f5] text-[#52525b]'
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#2563eb]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
