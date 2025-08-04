import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import car6 from '../assets/images/car6.jpg';
import bbbLogo from '../assets/images/bbb_logo.png.png';
import refMurray from '../assets/images/ref_murray1.jpg.png';
import refRightlook from '../assets/images/ref_rightlook.jpg.png';
import refWaverley from '../assets/images/ref_waverley.jpg.png';
import refBestbuy from '../assets/images/ref_bestbuy-1.jpg.png';
import Footer from '../components/Footer';

const CarDetailingReference = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  // Scroll animation handler
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      const windowHeight = window.innerHeight;
      const newVisibleElements = new Set(visibleElements);

      elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = elementTop < windowHeight - 100;

        if (elementVisible && !visibleElements.has(index)) {
          newVisibleElements.add(index);
          element.classList.add('animate-in');
        }
      });

      if (newVisibleElements.size !== visibleElements.size) {
        setVisibleElements(newVisibleElements);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleElements]);

  const handlePrivacyPolicyDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://actioncardetailing.ca/wp-content/uploads/2019/03/OnlinePrivacyPolicy.mr11.pdf';
    link.download = 'Privacy_Policy.pdf';
    link.target = '_blank';
    link.click();
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100 relative overflow-hidden pt-16">
      
      {/* Add CSS for scroll animations */}
      <style jsx>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-animate-delay-1 {
          transition-delay: 0.1s;
        }
        
        .scroll-animate-delay-2 {
          transition-delay: 0.2s;
        }
        
        .scroll-animate-delay-3 {
          transition-delay: 0.3s;
        }
        
        .scroll-animate-delay-4 {
          transition-delay: 0.4s;
        }
        
        .scroll-animate-fade {
          opacity: 0;
          transition: opacity 1s ease-out;
        }
        
        .scroll-animate-fade.animate-in {
          opacity: 1;
        }
        
        .scroll-animate-scale {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate-scale.animate-in {
          opacity: 1;
          transform: scale(1);
        }
        
        .scroll-animate-slide-up {
          opacity: 0;
          transform: translateY(80px);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate-slide-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-animate-slide-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate-slide-left.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-animate-slide-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate-slide-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${car6})`
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-transparent to-blue-50/90" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6">

        {/* Partner Logos Row */}
        <div className="mb-6 md:mb-8 w-full max-w-6xl scroll-animate">
          <div className="bg-gradient-to-r from-sky-50 to-sky-100 py-3 md:py-4 px-4 md:px-6 rounded-xl shadow-lg border border-sky-200">
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 lg:gap-8">

              {/* Rightlook */}
              <div className="relative group scroll-animate scroll-animate-delay-1">
                <img 
                  src={refRightlook} 
                  alt="Rightlook" 
                  className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-500 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg rounded-lg"
                />
                <div className="absolute inset-0 bg-sky-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Murray Hyundai */}
              <div className="relative group scroll-animate scroll-animate-delay-2">
                <img 
                  src={refMurray} 
                  alt="Murray Hyundai" 
                  className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-500 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg rounded-lg"
                />
                <div className="absolute inset-0 bg-sky-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Waverley */}
              <div className="relative group scroll-animate scroll-animate-delay-3">
                <img 
                  src={refWaverley} 
                  alt="Gauthier's Waverley" 
                  className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-500 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg rounded-lg"
                />
                <div className="absolute inset-0 bg-sky-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* BestBuy Auto */}
              <div className="relative group scroll-animate scroll-animate-delay-4">
                <img 
                  src={refBestbuy} 
                  alt="BestBuy Auto" 
                  className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-500 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg rounded-lg"
                />
                <div className="absolute inset-0 bg-sky-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <div className="text-center mb-4 md:mb-6 scroll-animate scroll-animate-slide-up">
          <div className="text-sky-600 text-sm md:text-base font-bold mb-3 drop-shadow-lg animate-pulse">
            DOWNLOAD OUR PRIVACY POLICY
          </div>

          <button
            onClick={handlePrivacyPolicyDownload}
            className="bg-gradient-to-r from-sky-100 to-sky-200 hover:from-sky-200 hover:to-sky-300 text-sky-700 px-3 md:px-4 py-2 rounded-lg border-2 border-sky-300 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
          >
            <Download className="w-4 h-4" />
            <span className="font-semibold">Action Car Detailing Privacy Policy</span>
          </button>
        </div>

        {/* Contact Information with BBB Badge - Responsive Version */}
        <div className="w-full max-w-2xl lg:max-w-3xl scroll-animate scroll-animate-scale">
          <div className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white text-center shadow-xl rounded-xl overflow-hidden border-2 border-sky-300">

            {/* BBB Badge - Top Center */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg p-4 md:p-6 shadow-xl border-2 border-sky-100 transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center">
                  {/* Only BBB Logo Image - Bigger Size */}
                  <div>
                    <img 
                      src={bbbLogo} 
                      alt="BBB Logo" 
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Text Content - Responsive */}
            <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
              <div className="space-y-2">
                <div className="text-sm md:text-base font-bold leading-tight">
                  CONTACT US FOR OUR RATES AND
                </div>
                <div className="text-sm md:text-base font-bold mb-4 leading-tight">
                  SERVICES
                </div>

                {/* Phone Number */}
                <div className="bg-gradient-to-r from-sky-600 to-sky-700 inline-block px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                  <a
                    href="tel:+12047750005"
                    className="text-lg md:text-2xl font-bold hover:text-sky-100 transition-colors duration-300 drop-shadow-lg"
                  >
                    (204) 775-0005
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* External Footer Component */}
      <div className="scroll-animate">
        <Footer />
      </div>

      {/* Bottom right corner text */}
      <div className="absolute bottom-4 right-4 text-sky-500 text-xs opacity-70 z-10 scroll-animate scroll-animate-fade">
        Delta Auto Service
      </div>
    </div>
  );
};

export default CarDetailingReference;