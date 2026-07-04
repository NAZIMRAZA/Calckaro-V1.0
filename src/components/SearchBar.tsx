import React, { useState, useEffect, useRef } from 'react';
import calculators from '../data/calculators.json';

interface CalculatorItem {
  slug: string;
  name: string;
  category: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
}

export default function SearchBar({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalculatorItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Run filtering on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(0);
      return;
    }

    const searchTerms = query.toLowerCase().split(/\s+/);
    const filtered = calculators.filter(calc => {
      const name = calc.name.toLowerCase();
      const desc = calc.metaDescription.toLowerCase();
      const slug = calc.slug.toLowerCase();
      
      // Match all search terms (basic fuzzy and query matching)
      return searchTerms.every(term => 
        name.includes(term) || 
        desc.includes(term) || 
        slug.includes(term)
      );
    });

    setResults(filtered.slice(0, 6)); // Limit to top 6 results
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[activeIndex];
      if (selected) {
        window.location.href = `/finance/${selected.slug}`;
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} class={`relative w-full ${variant === 'compact' ? 'max-w-[160px] sm:max-w-[200px]' : 'max-w-md'}`}>
      <div class="relative">
        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={variant === 'compact' ? 'Search...' : 'Search calculators (e.g. GST, Salary, HRA)...'} 
          class={`w-full rounded-xs border border-vercel-gray-medium bg-vercel-gray-dark text-white outline-none transition-all placeholder:text-ink-faint focus:border-vercel-blue ${
            variant === 'compact' ? 'px-3 py-1.5 text-xs' : 'px-4 py-3 text-sm'
          }`}
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div class="absolute z-50 left-0 right-0 mt-2 rounded-xs border border-vercel-gray-medium bg-vercel-black p-2 shadow-2xl space-y-1">
          {results.map((calc, idx) => (
            <a 
              key={calc.slug}
              href={`/finance/${calc.slug}`}
              class={`block rounded-xs p-3 transition-colors ${
                idx === activeIndex 
                  ? 'bg-vercel-gray-medium text-white border-l-2 border-vercel-blue' 
                  : 'text-ink-muted hover:bg-vercel-gray-dark hover:text-white'
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <div class="text-xs font-bold">{calc.name}</div>
              <div class="text-[10px] text-ink-muted line-clamp-1 mt-0.5">{calc.metaDescription}</div>
            </a>
          ))}
        </div>
      )}

      {/* No results notice */}
      {isOpen && query.trim() && results.length === 0 && (
        <div class="absolute z-50 left-0 right-0 mt-2 rounded-xs border border-vercel-gray-medium bg-vercel-black p-4 text-center text-xs text-ink-faint">
          No calculators found matching "{query}"
        </div>
      )}
    </div>
  );
}
