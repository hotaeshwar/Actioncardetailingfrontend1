import { useState, useEffect, useRef } from 'react';
import actionCarLogo from '../assets/images/action car logo.png';
import awardLogo from '../assets/images/award png.png';

const Navbar = ({ currentView, setCurrentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesDropdownOpen, setMobileServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  const handleNavClick = (view, href = null) => {
    if (href) {
      if (href === '#auto-detailing') {
        setCurrentView('auto-detailing');
      } else if (href === '#paint-correction') {
        setCurrentView('paint-correction');
      } else if (href === '#window-tinting') {
        setCurrentView('window-tinting');
      } else if (href === '#ceramic-coating') {
        setCurrentView('ceramic-coatings');
      } else if (href === '#remediation-claims') {
        setCurrentView('remediation-claim');
      } else if (href === '#paint-protection-film') {
        setCurrentView('paint-protection-film');
      } else if (href === '#dent-repair') {
        setCurrentView('dent-repair');
      } else if (href === '#before-after') {
        setCurrentView('before-after');
      } else if (href.startsWith('#') && currentView === 'home') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (href.startsWith('#')) {
        setCurrentView('home');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      setCurrentView(view);
    }
    setIsMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', view: 'home' },
    { name: 'ABOUT', view: 'about' },
    { name: 'GIFT CARD', view: 'giftcard' },
    { name: 'SERVICES', href: '#services', hasDropdown: true },
    { name: 'BEFORE & AFTER', href: '#before-after' },
    { name: 'TESTIMONIALS', view: 'testimonials' },
    { name: 'REFERENCES', view: 'references' }, // Fixed: This should work now
  ];

  const serviceItems = [
    { name: 'AUTO DETAILING', href: '#auto-detailing' },
    { name: 'PAINT CORRECTION POLISHING', href: '#paint-correction' },
    { name: 'WINDOW TINTING', href: '#window-tinting' },
    { name: 'CERAMIC COATING', href: '#ceramic-coating' },
    { name: 'PAINT PROTECTION FILM', href: '#paint-protection-film' },
    { name: 'DENT REPAIR', href: '#dent-repair' },
    { name: 'REMEDIATION CLAIMS', href: '#remediation-claims' },
  ];

  return (
    <>
      {/* Navbar with transparent background that becomes white on scroll */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="transition-all duration-300">
          <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
            <div className="flex items-center justify-between h-28 sm:h-32 md:h-36 lg:h-28 xl:h-32 relative px-2 sm:px-3 md:px-4">
              {/* Logo - Left side positioned with negative margin to move more left */}
              <div className="flex-shrink-0 transform transition-transform hover:scale-105 cursor-pointer z-10 lg:w-80 lg:flex lg:justify-start lg:-ml-4" onClick={() => handleNavClick('home')}>
                <img 
                  className="h-20 sm:h-24 md:h-28 lg:h-20 xl:h-24 w-auto filter drop-shadow-lg max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[240px] xl:max-w-[280px] object-contain" 
                  src={actionCarLogo} 
                  alt="Action Car Detailing Logo" 
                />
              </div>

              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex items-center justify-center space-x-0.5 xl:space-x-1 flex-1">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative" ref={link.name === 'SERVICES' ? dropdownRef : null}>
                    {link.hasDropdown ? (
                      <button
                        onClick={toggleServicesDropdown}
                        className={`mafia-nav-link flex items-center text-xs ${
                          currentView === 'services' || currentView === 'auto-detailing' || currentView === 'paint-correction' || currentView === 'window-tinting' || currentView === 'ceramic-coatings' || currentView === 'remediation-claim' || currentView === 'paint-protection-film' || currentView === 'dent-repair' ? 'bg-blue-700' : ''
                        }`}
                      >
                        <span>{link.name}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-3 w-3 inline ml-1 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link.view, link.href)}
                        className={`mafia-nav-link text-xs ${
                          currentView === link.view || (link.href === '#before-after' && currentView === 'before-after') ? 'bg-blue-700' : ''
                        }`}
                      >
                        <span>{link.name}</span>
                      </button>
                    )}
                    
                    {link.name === 'SERVICES' && servicesDropdownOpen && (
                      <div className="absolute mt-2 w-48 lg:w-52 xl:w-56 bg-black rounded-md shadow-2xl overflow-hidden z-20 border border-blue-800">
                        <div className="py-1">
                          {serviceItems.map((service) => (
                            <button
                              key={service.name}
                              onClick={() => handleNavClick(null, service.href)}
                              className={`w-full text-left block px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm text-gray-200 hover:bg-blue-800 hover:text-white transition-colors duration-200 border-l-4 border-transparent hover:border-white ${
                                (service.href === '#auto-detailing' && currentView === 'auto-detailing') ||
                                (service.href === '#paint-correction' && currentView === 'paint-correction') ||
                                (service.href === '#window-tinting' && currentView === 'window-tinting') ||
                                (service.href === '#ceramic-coating' && currentView === 'ceramic-coatings') ||
                                (service.href === '#remediation-claims' && currentView === 'remediation-claim') ||
                                (service.href === '#paint-protection-film' && currentView === 'paint-protection-film') ||
                                (service.href === '#dent-repair' && currentView === 'dent-repair')
                                  ? 'bg-blue-800 border-white' : ''
                              }`}
                            >
                              {service.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Award Logo - Clickable with link */}
              <div className="flex-shrink-0 transform transition-transform hover:scale-105 cursor-pointer z-10 lg:w-80 lg:flex lg:justify-center">
                <a 
                  href="https://www.ccaward.com/award-winners/winnipeg-greater-region/best-automobile-detailing/action-car-detailing/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img 
                    className="h-36 sm:h-40 md:h-44 lg:h-56 xl:h-60 w-auto filter drop-shadow-lg max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[560px] xl:max-w-[600px] object-contain" 
                    src={awardLogo} 
                    alt="Consumer Choice Award 2025"
                  />
                </a>
              </div>

              {/* Stylish Mobile Menu Button with Vivid Ozone Color */}
              <div className="lg:hidden absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center z-50">
                <button
                  onClick={toggleMenu}
                  className="relative inline-flex items-center justify-center p-3 rounded-full text-white focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, #1393c4 0%, #0f7ba3 50%, #1393c4 100%)`,
                    boxShadow: `
                      0 4px 15px rgba(19, 147, 196, 0.4),
                      0 2px 8px rgba(19, 147, 196, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {/* Animated hamburger lines */}
                    <div className="absolute w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out transform" 
                         style={{
                           top: isMenuOpen ? '50%' : '30%',
                           transform: isMenuOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%)',
                           opacity: isMenuOpen ? 1 : 1
                         }}></div>
                    <div className="absolute w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out" 
                         style={{
                           top: '50%',
                           transform: 'translateY(-50%)',
                           opacity: isMenuOpen ? 0 : 1
                         }}></div>
                    <div className="absolute w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out transform" 
                         style={{
                           top: isMenuOpen ? '50%' : '70%',
                           transform: isMenuOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-50%)',
                           opacity: isMenuOpen ? 1 : 1
                         }}></div>
                  </div>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 pointer-events-none transition-opacity duration-300"
                       style={{
                         background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                         opacity: isMenuOpen ? 0.5 : 0
                       }}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-95 shadow-2xl z-40 mt-32 overflow-y-auto backdrop-blur-sm">
            <div className="px-2 sm:px-3 md:px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileServicesDropdownOpen(!mobileServicesDropdownOpen)}
                        className="w-full flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base md:text-lg font-medium text-white hover:text-blue-300 hover:bg-blue-900 transition-all duration-200"
                        style={{
                          background: mobileServicesDropdownOpen ? 'linear-gradient(90deg, #1393c4 0%, rgba(19, 147, 196, 0.1) 100%)' : 'transparent'
                        }}
                      >
                        {link.name}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-300 ${mobileServicesDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          style={{ color: '#1393c4' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileServicesDropdownOpen && (
                        <div className="pl-4 sm:pl-6 md:pl-8 space-y-1">
                          {serviceItems.map((service) => (
                            <button
                              key={service.name}
                              onClick={() => handleNavClick(null, service.href)}
                              className={`w-full text-left block px-3 sm:px-4 py-2 sm:py-3 rounded-md text-xs sm:text-sm md:text-base font-medium text-gray-200 hover:text-white transition-all duration-200 border-l-2 ${
                                (service.href === '#auto-detailing' && currentView === 'auto-detailing') ||
                                (service.href === '#paint-correction' && currentView === 'paint-correction') ||
                                (service.href === '#window-tinting' && currentView === 'window-tinting') ||
                                (service.href === '#ceramic-coating' && currentView === 'ceramic-coatings') ||
                                (service.href === '#remediation-claims' && currentView === 'remediation-claim') ||
                                (service.href === '#paint-protection-film' && currentView === 'paint-protection-film') ||
                                (service.href === '#dent-repair' && currentView === 'dent-repair')
                                  ? 'bg-blue-800 border-white' : 'border-blue-700 hover:bg-blue-800'
                              }`}
                            >
                              {service.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.view, link.href)}
                      className={`w-full text-left block px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base md:text-lg font-medium text-white transition-all duration-200 ${
                        currentView === link.view || (link.href === '#before-after' && currentView === 'before-after') 
                          ? 'text-white' 
                          : 'hover:text-blue-300'
                      }`}
                      style={{
                        background: (currentView === link.view || (link.href === '#before-after' && currentView === 'before-after'))
                          ? 'linear-gradient(90deg, #1393c4 0%, rgba(19, 147, 196, 0.1) 100%)'
                          : 'transparent',
                        borderLeft: (currentView === link.view || (link.href === '#before-after' && currentView === 'before-after'))
                          ? '4px solid #1393c4'
                          : '4px solid transparent'
                      }}
                    >
                      {link.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          .mafia-nav-link {
            position: relative;
            display: inline-block;
            padding: 0.3rem 0.5rem;
            font-size: 0.65rem;
            font-weight: 500;
            text-transform: uppercase;
            color: white;
            background-color: #87CEEB;
            clip-path: polygon(10% 0, 100% 0%, 90% 100%, 0% 100%);
            margin: 0 0.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: none;
            cursor: pointer;
            white-space: nowrap;
          }

          @media (min-width: 1024px) {
            .mafia-nav-link {
              padding: 0.35rem 0.6rem;
              font-size: 0.7rem;
              margin: 0 0.15rem;
            }
          }
          
          @media (min-width: 1280px) {
            .mafia-nav-link {
              padding: 0.4rem 0.75rem;
              font-size: 0.75rem;
              margin: 0 0.2rem;
            }
          }

          @media (min-width: 1536px) {
            .mafia-nav-link {
              padding: 0.45rem 0.85rem;
              font-size: 0.8rem;
              margin: 0 0.25rem;
            }
          }

          /* iPad Pro specific fix */
          @media (min-width: 1024px) and (max-width: 1366px) {            
            .mafia-nav-link {
              padding: 0.4rem 0.6rem !important;
              font-size: 0.7rem !important;
              margin: 0 0.1rem !important;
              min-width: auto !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }

          .mafia-nav-link:hover {
            background-color: #4682B4;
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;