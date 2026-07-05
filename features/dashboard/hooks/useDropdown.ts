import { useState, useEffect, useCallback } from 'react';

export function useDropdown() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = useCallback((dropdownId: string) => {
    setOpenDropdown(prev => prev === dropdownId ? null : dropdownId);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropdown]);

  return {
    openDropdown,
    toggleDropdown,
    closeDropdown,
  };
}
