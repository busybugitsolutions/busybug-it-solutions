import { BrandLogo } from './BrandLogo';
import { type PageView } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#C8D2E0] bg-[#E1E8F2] py-12">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
            >
              <BrandLogo markSize={32} textClassName="text-lg font-bold tracking-tight text-[#111317]" />
            </button>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#525866]">
              Managed IT systems, cybersecurity hardening, cloud architecture, and technical advisory
              for resilient modern businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-[0.85fr_1.05fr_1.45fr] md:col-span-8">
            <div>
              <p className="text-xs font-semibold text-[#111317]">Company</p>
              <ul className="mt-3 space-y-2.5 text-sm leading-5 text-[#525866]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'case-studies')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    Case Studies
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#111317]">Services</p>
              <ul className="mt-3 space-y-2.5 text-sm leading-5 text-[#525866]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'services')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    Managed IT Services
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'services')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    Cybersecurity
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'services')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    Cloud Solutions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'services')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    IT Consulting
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold text-[#111317]">Direct Contact</p>
              <ul className="mt-3 space-y-2.5 text-sm leading-5 text-[#525866]">
                <li>
                  <a
                    href="mailto:busybugitsolutions@gmail.com"
                    className="block text-left leading-5 whitespace-nowrap hover:text-[#111317] transition-colors"
                  >
                    busybugitsolutions@gmail.com
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'contact')}
                    className="block text-left leading-5 hover:text-[#111317] transition-colors cursor-pointer"
                  >
                    Contact Form
                  </button>
                </li>
                <li>

                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#E2E5E9] pt-6 text-xs text-[#525866] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} BusyBug IT Solutions. All rights reserved.</p>
          <p>Managed IT · Cloud Engineering · Cybersecurity · Technical Advisory</p>
        </div>
      </div>
    </footer>
  );
}
