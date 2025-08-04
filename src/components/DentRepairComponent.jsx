import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Shield, Clock, Star, ArrowRight, Phone } from 'lucide-react';
import dentRepairVideo from '../assets/images/Dent Repair.mp4';
import Footer from '../components/Footer';

const DentRepairComponent = () => {
  const [activeTab, setActiveTab] = useState('hail');
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef(null);

  // Handle scroll for animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if element should be visible based on scroll position
  const isVisible = (offset = 400) => {
    return scrollY > offset;
  };

  useEffect(() => {
    // Optimized single video handling
    const video = videoRef.current;
    
    if (video) {
      // Essential settings only
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      // Minimal preload for faster start
      video.preload = 'none';
      
      // Device-specific object-fit adjustments - 16:10 FOR MOBILE/TABLETS, FULL-SCREEN FOR DESKTOP
      const adjustVideoFit = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Mobile screens (below 768px) - Force 16:10 aspect ratio
        if (width < 768) {
          const idealHeight = width / (16/10); // Calculate 16:10 height
          
          video.style.objectFit = 'cover';
          video.style.width = '100vw';
          video.style.height = `${idealHeight}px`;
          video.style.objectPosition = 'center center';
          
          // Center the video container vertically in viewport
          video.style.top = '50%';
          video.style.left = '0';
          video.style.transform = 'translateY(-50%)';
          video.style.position = 'absolute';
        }
        // iPad Mini: 768x1024, iPad Air: 820x1180 - 16:10 cinematic
        else if (width >= 768 && width < 1024) {
          const idealHeight = width / (16/10);
          
          video.style.objectFit = 'cover';
          video.style.width = '100vw';
          video.style.height = `${idealHeight}px`;
          video.style.objectPosition = 'center center';
          video.style.top = '50%';
          video.style.left = '0';
          video.style.transform = 'translateY(-50%)';
          video.style.position = 'absolute';
        }
        // iPad Pro: 1024x1366 - 16:10 cinematic 
        else if (width >= 1024 && width < 1280) {
          const idealHeight = width / (16/10);
          
          video.style.objectFit = 'cover';
          video.style.width = '100vw';
          video.style.height = `${idealHeight}px`;
          video.style.objectPosition = 'center center';
          video.style.top = '50%';
          video.style.left = '0';
          video.style.transform = 'translateY(-50%)';
          video.style.position = 'absolute';
        }
        // Desktop and Laptop screens (1280px and above) - Full screen as original
        else {
          video.style.objectFit = 'cover';
          video.style.objectPosition = 'center center';
          video.style.height = '100vh';
          video.style.width = '100vw';
          video.style.top = '0';
          video.style.left = '0';
          video.style.transform = 'none';
          video.style.position = 'absolute';
        }
      };
      
      // Apply initial adjustments
      adjustVideoFit();
      
      // Reapply on orientation change
      window.addEventListener('resize', adjustVideoFit);
      window.addEventListener('orientationchange', adjustVideoFit);
      
      // Simple autoplay with minimal error handling
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          // Single fallback attempt
          document.addEventListener('click', () => video.play().catch(() => {}), { once: true });
        }
      };
      
      // Start playing immediately
      playVideo();
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', adjustVideoFit);
        window.removeEventListener('orientationchange', adjustVideoFit);
      };
    }
  }, []);

  const services = [
    {
      id: 'hail',
      title: 'Hail Damage Repair',
      description: 'Professional hail damage restoration using paintless dent repair techniques',
      features: ['Insurance claim assistance', 'Quick turnaround', 'Factory finish maintained']
    },
    {
      id: 'door',
      title: 'Door Ding Repair',
      description: 'Remove unsightly door dings and parking lot damage',
      features: ['Same-day service', 'No paint needed', 'Cost-effective solution']
    },
    {
      id: 'minor',
      title: 'Minor Dent Repair',
      description: 'Fix small to medium dents without compromising your paint',
      features: ['Eco-friendly process', 'Original paint preserved', 'Warranty included']
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Insurance Approved',
      description: 'We work directly with your insurance company'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Service',
      description: 'Most repairs completed within 2-4 hours'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Expert Technicians',
      description: 'Certified professionals with years of experience'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Quality Guarantee',
      description: 'Lifetime warranty on all paintless dent repairs'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Custom CSS for animations */}
      <style jsx>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fade-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-in-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fade-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
      `}</style>

      {/* Hero Video Section with Responsive Video - Updated to match Hero component */}
      <section className="relative h-screen w-full overflow-hidden bg-snow">
        {/* Video background - single optimized video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            src={dentRepairVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster=""
            controls={false}
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              objectPosition: 'center center'
            }}
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Services Section */}
          <div className={`text-center mb-12 sm:mb-16 fade-in-up ${isVisible(200) ? 'visible' : ''}`}>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl text-cyan-500 mb-0">
              <span className="font-bold">Professional</span>
            </h3>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cyan-500 mb-6">
              <span className="font-bold">Dent Repair Services</span>
            </h1>
          </div>

          <div className="max-w-4xl mx-auto mb-16">

            {/* Service Tabs */}
            <div className="space-y-6">
              
              {/* Tab Navigation */}
              <div className={`flex flex-col sm:flex-row gap-2 justify-center fade-in-up ${isVisible(400) ? 'visible' : ''}`}>
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg stagger-${index + 1} ${
                      activeTab === service.id
                        ? 'bg-cyan-600 text-white shadow-cyan-200 transform scale-105'
                        : 'bg-white text-cyan-500 hover:bg-cyan-50 border-2 border-cyan-200 hover:border-cyan-300'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-bold">{service.title}</span>
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className={`bg-white rounded-2xl p-8 sm:p-10 shadow-xl border-2 border-cyan-100 scale-in ${isVisible(600) ? 'visible' : ''}`}>
                {services.map((service) => (
                  activeTab === service.id && (
                    <div key={service.id} className="space-y-6 text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-cyan-500">
                        <span>{service.title}</span>
                      </h3>
                      <p className="text-cyan-600 text-lg sm:text-xl leading-relaxed">
                        <span>{service.description}</span>
                      </p>
                      
                      <div className="space-y-4 max-w-md mx-auto">
                        {service.features.map((feature, index) => (
                          <div key={index} className={`flex items-center space-x-4 bg-cyan-50 p-4 rounded-lg fade-in-left stagger-${index + 1} ${isVisible(700) ? 'visible' : ''}`}>
                            <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                            <span className="text-cyan-600 font-medium text-base sm:text-lg">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`pt-6 fade-in-up ${isVisible(800) ? 'visible' : ''}`}>
                        <button className="bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-600 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto">
                          <span>Get Free Estimate</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 text-center shadow-xl border-2 border-cyan-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 fade-in-up stagger-${index + 1} ${isVisible(900) ? 'visible' : ''}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-full mb-6 shadow-lg">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-cyan-500 mb-3">
                  <span>{benefit.title}</span>
                </h4>
                <p className="text-cyan-600 leading-relaxed">
                  <span>{benefit.description}</span>
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`bg-white rounded-3xl p-10 sm:p-16 text-center shadow-2xl border-2 border-cyan-100 scale-in ${isVisible(1200) ? 'visible' : ''}`}>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-500">
              <span className="block">Ready to Restore</span>
              <span className="text-cyan-600">Your Vehicle?</span>
            </h3>
            <p className="text-xl sm:text-2xl mb-10 text-cyan-600 leading-relaxed">
              <span className="block">Contact Action Car Wash today for a</span>
              <span className="font-bold text-cyan-500">free estimate</span>
              <span> on your dent repair needs</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className={`bg-cyan-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-cyan-600 transition-all duration-300 flex items-center space-x-3 shadow-lg transform hover:scale-105 fade-in-left ${isVisible(1400) ? 'visible' : ''}`}>
                <Phone className="w-6 h-6" />
                <span>Call Now</span>
              </button>
              <button className={`border-2 border-cyan-500 text-cyan-500 px-10 py-5 rounded-xl font-bold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-105 fade-in-right ${isVisible(1400) ? 'visible' : ''}`}>
                <span>Schedule Online</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default DentRepairComponent;