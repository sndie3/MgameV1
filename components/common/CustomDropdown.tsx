import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
  placeholder?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export default function CustomDropdown({
  value,
  onChange,
  options,
  disabled = false,
  placeholder = 'Select',
  isOpen: controlledIsOpen,
  onToggle,
  onClose,
}: CustomDropdownProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(false);
        } else if (onClose) {
          onClose();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [controlledIsOpen, onClose]);

  const handleSelect = (option: string) => {
    onChange(option);
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div className="w-full bg-[#121212] text-white font-bold text-[18px] uppercase outline-none flex items-center justify-between px-4 py-2 rounded">
        <span className={value ? '' : 'text-gray-400'}>{value || placeholder}</span>
        <button
          type="button"
          onClick={() => !disabled && onToggle && onToggle()}
          disabled={disabled}
          className={`p-1 rounded ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer hover:bg-[#2a2a2a]'}`}
        >
          {isOpen ? (
            <ChevronUp size={20} className="text-[#8A8F98]" />
          ) : (
            <ChevronDown size={20} className="text-[#8A8F98]" />
          )}
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#3A3A3A] rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
          {!value && (
            <div
              onClick={() => handleSelect('')}
              className="px-4 py-3 text-gray-400 hover:bg-[#2a2a2a] cursor-pointer text-sm"
            >
              {placeholder}
            </div>
          )}
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-3 hover:bg-[#2a2a2a] cursor-pointer text-sm ${
                value === option ? 'text-white font-bold' : 'text-white'
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
