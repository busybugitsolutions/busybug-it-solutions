import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type PageView = 'home' | 'about' | 'admin';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (page: PageView, sectionId?: string) => {
    setMobileOpen(false);
    onNavigate(page, sectionId);
  };

  const contactPageTarget: PageView = currentPage === 'about' ? 'about' : 'home';

  return (
    <header className="sticky top-0 z-40 border-b border-[#C8D2E0] bg-[#E8EDF4]/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand Emblem + Single-line Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706] cursor-pointer"
        >
          <BrandLogo markSize={28} textClassName="text-lg font-bold tracking-tight text-[#111317]" />
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525866]"
        >
          <button
            type="button"
            onClick={() => handleLinkClick('home', 'services')}
            className="hover:text-[#111317] transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('home', 'case-studies')}
            className="hover:text-[#111317] transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
          >
            Case Studies
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('about')}
            className={`transition-colors whitespace-nowrap shrink-0 underline-offset-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706] ${
              currentPage === 'about'
                ? 'text-[#111317] underline decoration-[#D97706] decoration-2'
                : 'hover:text-[#111317] hover:underline'
            }`}
          >
            About Us
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('home', 'engagement')}
            className="hover:text-[#111317] transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
          >
            Engagement
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick(contactPageTarget, 'contact')}
            className="hover:text-[#111317] transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick(contactPageTarget, 'contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#111317] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#262A33] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
          >
            Book Technical Audit
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-lg border border-[#E2E5E9] bg-white text-[#111317] hover:bg-[#F2F3F5] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="border-t border-[#E2E5E9] bg-white px-6 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => handleLinkClick('home', 'services')}
              className="flex min-h-[44px] items-center justify-between text-left text-sm font-medium text-[#111317] border-b border-[#F2F3F5] py-2 cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('home', 'case-studies')}
              className="flex min-h-[44px] items-center justify-between text-left text-sm font-medium text-[#111317] border-b border-[#F2F3F5] py-2 cursor-pointer"
            >
              Case Studies
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('about')}
              className={`flex min-h-[44px] items-center justify-between text-left text-sm font-medium border-b border-[#F2F3F5] py-2 cursor-pointer ${
                currentPage === 'about' ? 'text-[#B45309]' : 'text-[#111317]'
              }`}
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('home', 'engagement')}
              className="flex min-h-[44px] items-center justify-between text-left text-sm font-medium text-[#111317] border-b border-[#F2F3F5] py-2 cursor-pointer"
            >
              Engagement
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick(contactPageTarget, 'contact')}
              className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#111317] px-4 py-2.5 text-sm font-semibold text-white cursor-pointer"
            >
              Book Technical Audit
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
