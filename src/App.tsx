import { useEffect, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { AboutPage } from './components/AboutPage';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection } from './components/ContactSection';
import { EngagementEstimator } from './components/EngagementEstimator';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar, type PageView } from './components/Navbar';
import { ServicesSection } from './components/ServicesSection';
import { type InquirySource } from './services/inquiryService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() =>
    window.location.hash === '#about' ? 'about' : 'home'
  );
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');
  const [inquirySource, setInquirySource] = useState<InquirySource>('contact-form');
  const [prefillKey, setPrefillKey] = useState<number>(0);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#about') {
        setCurrentPage('about');
      } else if (window.location.hash === '' || window.location.hash === '#') {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const scrollToElement = (elementId: string, focusInputId?: string) => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const target = document.getElementById(elementId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (focusInputId) {
          window.setTimeout(() => {
            const input = document.getElementById(focusInputId);
            if (input instanceof HTMLElement) {
              input.focus({ preventScroll: true });
            }
          }, 320);
        }
      }, 40);
    });
  };

  const handleNavigate = (page: PageView, sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    if (sectionId) {
      scrollToElement(
        sectionId,
        sectionId === 'contact' ? 'contact-name' : undefined
      );
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrefillContact = (
    messageText: string,
    source: InquirySource = 'contact-form'
  ) => {
    setInquirySource(source);
    setPrefilledMessage(messageText);
    setPrefillKey((k) => k + 1);
    scrollToElement('contact', 'contact-name');
  };

  const handleBookAudit = () => {
    handlePrefillContact(
      'Technical Audit Request: We would like to schedule a 25-minute infrastructure and security audit. Please share your next available slot.',
      'contact-form'
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#E8EDF4] text-[#111317] flex flex-col">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onBookAudit={handleBookAudit}
        />

        <main className="flex-1">
          {currentPage === 'home' && (
            <motion.div
              key="page-home"
              initial={{ opacity: 0.92, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroSection
                onPrimaryAction={handleBookAudit}
                onSecondaryAction={() => handleNavigate('home', 'services')}
              />
              <ServicesSection
                onSelectServiceForContact={(serviceTitle) =>
                  handlePrefillContact(
                    `We would like to discuss ${serviceTitle} for our team. Please share availability for a technical discovery call.`,
                    'contact-form'
                  )
                }
              />
              <CaseStudiesSection
                onRequestSimilarOutcome={(caseTitle) =>
                  handlePrefillContact(
                    `We are interested in an architecture engagement similar to "${caseTitle}". Here is a quick overview of our current environment:`,
                    'contact-form'
                  )
                }
              />
              <EngagementEstimator
                onApplyScope={(scope) => handlePrefillContact(scope, 'scope-estimator')}
              />
              <ContactSection
                prefilledMessage={prefilledMessage}
                inquirySource={inquirySource}
                prefillKey={prefillKey}
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="page-about"
              initial={{ opacity: 0.92, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutPage
                onBackHome={() => handleNavigate('home')}
                onContactTeam={() =>
                  handlePrefillContact(
                    'Leadership Call Request: We would like to speak with a principal engineer regarding our infrastructure roadmap.',
                    'contact-form'
                  )
                }
                onApplyForRole={(roleTitle) =>
                  handlePrefillContact(
                    `Application Inquiry: ${roleTitle}\n\nLink to GitHub / Portfolio / LinkedIn:\nBrief summary of relevant experience:`,
                    'careers'
                  )
                }
              />
              <ContactSection
                prefilledMessage={prefilledMessage}
                inquirySource={inquirySource}
                prefillKey={prefillKey}
              />
            </motion.div>
          )}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </MotionConfig>
  );
}
