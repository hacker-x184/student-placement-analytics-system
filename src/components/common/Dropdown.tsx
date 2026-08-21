import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 w-56 rounded-lg bg-white border border-[#e2e8f0] shadow-[0px_8px_30px_rgba(15,23,42,0.12),0px_2px_8px_rgba(15,23,42,0.06)] py-1.5 focus:outline-none ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={`divider-${index}`} className="my-1 border-t border-[#e2e8f0]" />;
            }

            return (
              <button
                key={item.id || index}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors text-left ${
                  item.disabled
                    ? 'opacity-40 cursor-not-allowed text-[#737686]'
                    : item.danger
                    ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/40'
                    : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
