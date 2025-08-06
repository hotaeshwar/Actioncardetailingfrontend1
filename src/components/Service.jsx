// First, import React hooks
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSprayCan,
  faWindowMaximize,
  faCertificate,
  faUserCheck,
  faShield,
  faTrophy,
  faCheck,
  faHandshake,
  faTag,
  faStar,
  faTools,
  faPlay,
  faPause,
  faArrowRight,
  faTimes,
  faThumbsUp,
  faPhone,
  faHammer
} from '@fortawesome/free-solid-svg-icons';

// Import images and videos
import car1 from '../assets/images/car1.jpg';
import car2 from '../assets/images/car2.jpg';
import car3 from '../assets/images/car3.jpg';
import car4 from '../assets/images/car4.jpg';
import car5 from '../assets/images/car5.jpg';
import wash1 from '../assets/images/wash1.png';
import wash2 from '../assets/images/wash2.png';
import awardLogo from '../assets/images/award png.png';
import blogBanner from '../assets/images/blog-banner.jpg';
import car6 from '../assets/images/car6.jpg';
import VideoCarousel from './VideoCarousel';
import beforeAfterImage from '../assets/images/before-and-after-dent-repair.png';

// Import new card images for "Your Vehicle Deserves The Best" section
import certifiedExpertsImg from '../assets/images/Certified Experts.png';
import keepingCustomersHappyImg from '../assets/images/Keeping Customers Happy.png';
import licensedInsuredImg from '../assets/images/Licensed and insured.png';
import professionalInstallationImg from '../assets/images/Professional Installation.png';
import qualityGuaranteeImg from '../assets/images/Quality Guarantee.png';

// Import insurance image for MPI card
import insuranceImg from '../assets/images/insurance.png';

// Import custom auto detailing assets
import autoDetailingVideo from '../assets/images/Auto Detailing final.mp4';
import autoDetailingImage from '../assets/images/autodetailing.png';

// Import custom paint correction assets
import paintCorrectionVideo from '../assets/images/PaintcorrectionHomepage.mp4';
import paintCorrectionImage from '../assets/images/paint correction polishing.png';
import BusinessDescription from './BusinessDescription'; // Adjust path as needed

// Import custom window tinting assets
import windowTintingVideo from '../assets/images/WindowtintHomepage.mp4';
import windowTintingImage from '../assets/images/windowtint.png';

// Import custom ceramic coating assets
import ceramicCoatingVideo from '../assets/images/CeramicCoatingHomepage.mp4';

// Import custom paint protection film assets
import paintProtectionVideo from '../assets/images/PPFHomepage.mp4';

// Import custom dent repair assets
import dentRepairVideo from '../assets/images/Dent Repair.mp4';
import dentRepairImage from '../assets/images/dent repair.png';

// Import videos - ONLY the original 4 car washing videos
import carwashing1 from '../assets/images/carwashing1.mp4';
import carwashing2 from '../assets/images/carwashing2.mp4';
import carwashing3 from '../assets/images/carwashing3.mp4';
import carwashing4 from '../assets/images/carwashing4.mp4';

// Import the new award icon - BIGGER VERSION
import awardHome from '../assets/images/Awardhome.png';

// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animateId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const registerElement = useCallback((element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  return { visibleElements, registerElement };
};

// Animated Section Wrapper Component
const AnimatedSection = ({ children, animationId, delay = 0, className = "" }) => {
  const { visibleElements, registerElement } = useScrollAnimation();
  const elementRef = useRef(null);

  useEffect(() => {
    registerElement(elementRef.current);
  }, [registerElement]);

  const isVisible = visibleElements.has(animationId);

  return (
    <div
      ref={elementRef}
      data-animate-id={animationId}
      className={`transition-all duration-1000 ease-out ${isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
        } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};

const Service = ({ setCurrentView }) => {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const modalRef = useRef(null);

  // Flip card state and modal state for small screens
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardModalRef = useRef(null);

  // NEW: Blue card modal state for "Your Vehicle Deserves The Best" section
  const [isBlueCardModalOpen, setIsBlueCardModalOpen] = useState(false);
  const [selectedBlueCard, setSelectedBlueCard] = useState(null);
  const blueCardModalRef = useRef(null);

  // Scroll animation hook
  const { visibleElements, registerElement } = useScrollAnimation();

  // Updated data arrays using imported assets
  const carImages = [car1, car2, car3, car4, car5];

  // CLEANED VIDEO ARRAY - Only original 4 car washing videos
  const videos = [
    {
      src: carwashing1,
      title: "Premium Detailing",
      description: "Complete exterior detailing"
    },
    {
      src: carwashing2,
      title: "Complete Exterior and Interior Detailing",
      description: "Professional Detailing services"
    },
    {
      src: carwashing3,
      title: "Interior Detailing",
      description: "Deep cleaning and protection"
    },
  ];

  // Professional service data with custom auto detailing
  const servicesData = {
    "Auto Detailing": {
      title: "Premium Auto Detailing",
      shortDescription: "Complete interior and exterior restoration services",
      icon: null,
      customMedia: {
        type: 'video',
        src: autoDetailingVideo,
        alt: "Professional Auto Detailing Service"
      },
      gradientFrom: "sky-400",
      gradientTo: "sky-600",
      hoverColor: "sky-600",
      fullDescription: "Our comprehensive auto detailing service combines advanced techniques with premium-grade products to restore your vehicle to showroom condition. From paint correction polishing to interior deep cleaning, we provide meticulous attention to every detail of your vehicle.",
      features: [
        "Professional hand wash with premium soaps and microfiber techniques",
        "Clay bar treatment to remove embedded contaminants and surface pollution",
        "Deep interior cleaning with commercial-grade steam cleaning equipment",
        "Leather conditioning and protective treatment with UV protection",
        "Dashboard and trim restoration using specialized automotive products",
        "Complete tire and wheel detailing with protective coating application"
      ],
      image: car1,
      price: "Starting at $199",
      guarantee: "100% satisfaction guaranteed or we'll make it right",
      linkTo: 'auto-detailing'
    },
    "Paint Correction Polishing": {
      title: "Paint Correction Polishing",
      shortDescription: "Restore gloss, clarity, and a factory-fresh finish",
      icon: null,
      customMedia: {
        type: 'video',
        src: paintCorrectionVideo,
        alt: "Paint Correction Polishing Service"
      },
      gradientFrom: "sky-300",
      gradientTo: "sky-500",
      hoverColor: "sky-600",
      fullDescription: "Our paint correction polishing service eliminates imperfections like swirls, scratches, and oxidation — bringing your vehicle's paint back to life with a deep, flawless shine.",
      features: [
        "Scratch and swirl mark removal for a refined finish",
        "Oxidation and UV damage correction to restore color",
        "Hologram and buffer trail elimination",
        "Bird dropping etching safely corrected",
        "Water spot damage removal from paint and clear coat",
        "Correction of automatic car wash-induced abrasions"
      ],
      image: car3,
      price: "Starting at $299",
      guarantee: "Mirror-finish results backed by our craftsmanship warranty",
      linkTo: 'paint-correction'
    },
    "Window Tinting": {
      title: "Automotive Window Film",
      shortDescription: "Get Ready to Enjoy Every Drive with XPEL PRIME",
      icon: null,
      customMedia: {
        type: 'video',
        src: windowTintingVideo,
        alt: "Window Tinting Service"
      },
      gradientFrom: "sky-500",
      gradientTo: "sky-700",
      hoverColor: "sky-600",
      fullDescription: "Stay cool and comfortable behind the wheel with XPEL PRIME. Our cutting-edge window tint doesn't just look great — it blocks out heat, shields you from harmful UV rays, cuts down glare, and still keeps your view perfectly clear. Experience the perfect blend of protection and driving comfort every time you hit the road.",
      features: [
        "Premium ceramic film technology for superior performance",
        "99% UV ray blocking for interior and occupant protection",
        "Up to 80% heat rejection for improved comfort and efficiency",
        "Significant glare reduction for safer driving",
        "Lifetime warranty against bubbling, peeling, and fading",
        "Computer-cut precision templates for perfect fitment"
      ],
      image: car4,
      price: "Starting at $249",
      guarantee: "Lifetime warranty with professional installation guarantee",
      linkTo: 'window-tinting'
    },
    "Ceramic Coating": {
      title: "Automotive Ceramic Coating",
      shortDescription: "Leave Water (and Worries) Behind with FUSION PLUS™",
      icon: null,
      customMedia: {
        type: 'video',
        src: ceramicCoatingVideo,
        alt: "Ceramic Coating Service"
      },
      gradientFrom: "sky-400",
      gradientTo: "sky-600",
      hoverColor: "sky-600",
      fullDescription: "Keep your ride looking spotless without the extra effort. FUSION PLUS creates a strong bond with your car's surface to repel water, dirt, and grime, making cleanups quick and easy. Less fuss, more time to enjoy the drive.",
      features: [
        "9H hardness ceramic protection exceeding OEM paint durability",
        "5+ years of verified protection and performance",
        "Enhanced gloss and color depth for premium appearance",
        "Superior hydrophobic properties for easy maintenance",
        "Chemical and contaminant resistance",
        "UV damage prevention and color fade protection"
      ],
      image: wash1,
      price: "Starting at $599",
      guarantee: "5-year performance warranty with certified application",
      linkTo: 'ceramic-coatings'
    },
    "Paint Protection Film": {
      title: "Paint Protection Film",
      shortDescription: "Invisible protection against chips, scratches, and road debris",
      icon: null,
      customMedia: {
        type: 'video',
        src: paintProtectionVideo,
        alt: "Paint Protection Film Service"
      },
      gradientFrom: "sky-300",
      gradientTo: "sky-500",
      hoverColor: "sky-600",
      fullDescription: "Our advanced PPF provides unmatched defense with self-healing technology and a 10-year manufacturer warranty — preserving your vehicle's paint and long-term value.",
      features: [
        "Guards against rock chips, scratches, and road debris",
        "Self-healing properties for long-term clarity and shine",
        "Helps retain resale value by protecting original paint",
        "Reduces maintenance caused by frequent washing or wear",
        "Installed using custom-fit templates for near-invisible finish",
        "Backed by XPEL Ultimate Plus+ and a 10-year warranty"
      ],
      image: wash2,
      price: "Starting at $899",
      guarantee: "10-year warranty covering film performance and installation",
      linkTo: 'paint-protection-film'
    },
    "Dent Repair": {
      title: "Professional Dent Repair",
      shortDescription: "Paintless dent removal and traditional repair services",
      icon: null,
      customMedia: {
        type: 'video',
        src: dentRepairVideo,
        alt: "Dent Repair Service"
      },
      gradientFrom: "sky-400",
      gradientTo: "sky-600",
      hoverColor: "sky-600",
      fullDescription: "Our expert dent repair technicians use advanced paintless dent removal (PDR) techniques and traditional repair methods to restore your vehicle's body to its original condition.",
      features: [
        "Paintless Dent Removal (PDR) for minor dents and dings",
        "Traditional bodywork for more extensive damage",
        "Hail damage repair and restoration",
        "Door ding and parking lot damage correction",
        "Creased and sharp dent repair capabilities",
        "Insurance claim assistance and documentation"
      ],
      image: beforeAfterImage,
      price: "Starting at $150",
      guarantee: "100% satisfaction with warranty on all repair work",
      linkTo: 'dent-repair'
    }
  };

  // Updated card data with imported images for blue card design - USING NEW AWARD ICON
  const blueCardData = [
    {
      id: 'licensed-insured',
      title: 'Licensed & Insured',
      description: 'We got it covered! Our company is fully licensed and insured with over 14 years experience in the service industry.',
      fullDescription: 'Our company is fully licensed and insured with over 14 years experience in the service industry. We maintain comprehensive coverage to protect both our customers and our team during all service operations.',
      image: licensedInsuredImg,
      tag: 'Premium Service',
      features: [
        'Comprehensive liability insurance coverage',
        'Licensed professionals with 14+ years experience',
        'Bonded and insured for customer protection',
        'Industry-certified operations'
      ]
    },
    {
      id: 'professional-installation',
      title: 'Professional Installation',
      description: 'Our experienced detailing and installation team has the knowledge and ability to provide superior service on any make and model.',
      fullDescription: 'Our experienced detailing and installation team has the knowledge and ability to provide superior service on any make and model. We use industry-leading techniques and tools to ensure perfect results every time.',
      image: professionalInstallationImg,
      tag: 'Premium Service',
      features: [
        'Expert installation on all vehicle makes and models',
        'Industry-leading techniques and equipment',
        'Precision workmanship guaranteed',
        'Ongoing professional training and certification'
      ]
    },
    {
      id: 'certified-experts',
      title: 'Certified Experts',
      description: 'All our installers have been extensively trained. We really believe in the quality of our work and our people.',
      fullDescription: 'All our installers have been extensively trained and certified in the latest automotive detailing and protection techniques. We really believe in the quality of our work and our people, which is why we invest heavily in ongoing education and training.',
      image: certifiedExpertsImg,
      tag: 'Premium Service',
      features: [
        'Extensively trained and certified technicians',
        'Ongoing education in latest techniques',
        'Quality-focused team culture',
        'Proven track record of excellence'
      ]
    },
    {
      id: 'quality-guarantee',
      title: 'Quality Guarantee',
      description: 'We guarantee our customers the best installation services and manufacture warranty options in the industry.',
      fullDescription: 'We guarantee our customers the best installation services and manufacture warranty options in the industry. Our commitment to quality means we stand behind every job with comprehensive warranties and satisfaction guarantees.',
      image: qualityGuaranteeImg,
      tag: 'Premium Service',
      features: [
        'Best-in-class installation warranties',
        'Comprehensive manufacturer guarantees',
        '100% satisfaction promise',
        'Quality workmanship backed by years of experience'
      ]
    },
    {
      id: 'keeping-customers-happy',
      title: 'Keeping Customers Happy',
      description: 'Our company is responsive, friendly, and provides timely, relevant information whenever our customers need it.',
      fullDescription: 'Our company is responsive, friendly, and provides timely, relevant information whenever our customers need it. We pride ourselves on exceptional customer service and building lasting relationships with every client.',
      image: keepingCustomersHappyImg,
      tag: 'Premium Service',
      features: [
        'Responsive customer service team',
        'Friendly and professional staff',
        'Timely communication and updates',
        'Customer satisfaction is our priority'
      ]
    }
  ];

  // Card data for Why Choose Us section - UPDATED with BIGGER award logo sizing
  const cardData = {
    'card5': {
      frontTitle: 'Reputable Since 2011',
      icon: faThumbsUp,
      backTitle: 'Reputable Since 2011',
      backContent: 'Locally owned and operated serving Winnipeg with excellence for over a decade. Our commitment to quality has made us the trusted choice for thousands of satisfied customers.',
      features: [
        'Over 14 years of experience',
        'Thousands of satisfied customers',
        'Locally owned and operated',
        'Established reputation in Winnipeg'
      ]
    },
    'card6': {
      frontTitle: 'MPI Accredited',
      icon: faTrophy,
      customImage: insuranceImg,
      backTitle: 'MPI Accredited',
      backContent: 'Only Auto Detailing shop in Winnipeg accredited by MPI. This exclusive accreditation demonstrates our commitment to meeting the highest industry standards.',
      features: [
        'Exclusive MPI accreditation',
        'Meets highest industry standards',
        'Recognized quality and reliability',
        'Insurance approved services'
      ]
    },
    'card7': {
      frontTitle: 'Award Winning',
      icon: faStar,
      customImage: awardHome,
      backTitle: 'Award Winning',
      backContent: 'Winner of Consumer Choice Award 2025 in Auto Detailing Category. This prestigious award recognizes our outstanding service and customer satisfaction.',
      features: [
        'Consumer Choice Award 2025 winner',
        'Outstanding customer satisfaction',
        'Industry recognition',
        'Proven track record of excellence'
      ]
    },
    'card8': {
      frontTitle: 'Transparent Pricing',
      icon: faTag,
      backTitle: 'Transparent Pricing',
      backContent: 'Up front pricing with no hidden fees. One stop shop for all your auto detailing needs. We believe in honest, straightforward pricing you can trust.',
      features: [
        'No hidden fees or surprises',
        'Upfront transparent pricing',
        'Complete service packages',
        'One-stop shop convenience'
      ]
    }
  };

  // Section Divider Component with animation
  const SectionDivider = ({ animationId }) => (
    <AnimatedSection animationId={animationId} className="relative py-8 sm:py-12 md:py-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-4 sm:px-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );

  // Screen size state
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and device type on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setIsMobile(width < 1400);
      setIsMobileDevice(isMobile || width < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Flip card handler
  const handleFlipCard = (cardId) => {
    if (isMobile) {
      const cardInfo = cardData[cardId];
      if (cardInfo) {
        setTimeout(() => {
          setSelectedCard(cardInfo);
          setIsCardModalOpen(true);
          document.body.style.overflow = 'hidden';
        }, 50);
      }
    } else {
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(cardId)) {
          newSet.delete(cardId);
        } else {
          newSet.add(cardId);
        }
        return newSet;
      });
    }
  };

  // NEW: Blue card modal handlers
  const openBlueCardModal = (cardData) => {
    setSelectedBlueCard(cardData);
    setIsBlueCardModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBlueCardModal = () => {
    setIsBlueCardModalOpen(false);
    setSelectedBlueCard(null);
    document.body.style.overflow = 'auto';
  };

  // Card modal handlers
  const closeCardModal = () => {
    setIsCardModalOpen(false);
    setSelectedCard(null);
    document.body.style.overflow = 'auto';
  };

  // Handlers
  const handlePlayPause = useCallback(() => {
    if (videoRefs.current[currentSlide]) {
      if (isPlaying) {
        videoRefs.current[currentSlide].pause();
      } else {
        videoRefs.current[currentSlide].play().catch(error => {
          console.log("Play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [currentSlide, isPlaying]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsPlaying(true);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % videos.length);
  }, [currentSlide, videos.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + videos.length) % videos.length);
  }, [currentSlide, videos.length, goToSlide]);

  // Service modal handlers
  const openModal = (serviceName) => {
    setSelectedService(servicesData[serviceName]);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle service booking/navigation
  const handleBookService = () => {
    if (selectedService?.linkTo && setCurrentView) {
      setCurrentView(selectedService.linkTo);
      closeModal();
    } else {
      console.log('Book service:', selectedService.title);
    }
  };

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && event.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
      if (cardModalRef.current && !cardModalRef.current.contains(event.target) && event.target.classList.contains('card-modal-backdrop')) {
        closeCardModal();
      }
      if (blueCardModalRef.current && !blueCardModalRef.current.contains(event.target) && event.target.classList.contains('blue-card-modal-backdrop')) {
        closeBlueCardModal();
      }
    };

    if (isModalOpen || isCardModalOpen || isBlueCardModalOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isModalOpen, isCardModalOpen, isBlueCardModalOpen]);

  // Close modals with escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (isBlueCardModalOpen) closeBlueCardModal();
        if (isCardModalOpen) closeCardModal();
        if (isModalOpen) closeModal();
      }
    };

    if (isModalOpen || isCardModalOpen || isBlueCardModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen, isCardModalOpen, isBlueCardModalOpen]);

  // Listen for window resize to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && (isCardModalOpen || isBlueCardModalOpen)) {
        closeCardModal();
        closeBlueCardModal();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isCardModalOpen, isBlueCardModalOpen]);

  // Effects - Optimized video management
  useEffect(() => {
    const interval = isMobileDevice ? 10000 : 8000;

    intervalRef.current = setInterval(() => {
      if (isPlaying) {
        nextSlide();
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, nextSlide, isMobileDevice]);

  // Optimized video loading and playback
  useEffect(() => {
    const playCurrentVideo = async () => {
      try {
        videoRefs.current.forEach((video, index) => {
          if (video && index !== currentSlide) {
            video.pause();
            video.currentTime = 0;
          }
        });

        const currentVideo = videoRefs.current[currentSlide];
        if (currentVideo) {
          if (isMobileDevice) {
            currentVideo.load();
            await new Promise(resolve => {
              currentVideo.addEventListener('loadeddata', resolve, { once: true });
              setTimeout(resolve, 2000);
            });
          }

          try {
            await currentVideo.play();
            setIsVideoLoaded(true);
          } catch (playError) {
            console.log("Video play failed, retrying:", playError);
            setTimeout(async () => {
              try {
                await currentVideo.play();
              } catch (retryError) {
                console.log("Video play retry failed:", retryError);
              }
            }, 500);
          }
        }
      } catch (error) {
        console.log("Video management error:", error);
      }
    };

    playCurrentVideo();
  }, [currentSlide, isMobileDevice]);

  // Updated renderServiceCard function to handle custom media with animation wrapper
  const renderServiceCard = (icon, title, description, customIcon = null, index = 0) => {
    const serviceData = servicesData[title];

    return (
      <AnimatedSection
        animationId={`service-card-${index}`}
        delay={index * 100}
        className="group cursor-pointer bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50 backdrop-blur-lg rounded-2xl shadow-xl shadow-sky-300/30 hover:shadow-2xl hover:shadow-sky-500/30 transition-all duration-500 p-6 sm:p-8 text-center transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden border border-sky-200/50"
      >
        <div
          onClick={() => openModal(title)}
          className="w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-sky-400/10 to-sky-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="absolute top-4 right-4 w-2 h-2 bg-sky-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-8 left-6 w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-sky-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-xl shadow-sky-500/30 group-hover:shadow-2xl group-hover:shadow-sky-500/40 transform group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Check if this service has custom media */}
                {serviceData?.customMedia ? (
                  serviceData.customMedia.type === 'video' ? (
                    title === "Auto Detailing" ? (
                      <img
                        src={autoDetailingImage}
                        alt={serviceData.customMedia.alt}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    ) : title === "Paint Correction Polishing" ? (
                      <img
                        src={paintCorrectionImage}
                        alt={serviceData.customMedia.alt}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    ) : title === "Window Tinting" ? (
                      <img
                        src={windowTintingImage}
                        alt={serviceData.customMedia.alt}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    ) : title === "Ceramic Coating" ? (
                      <img
                        src={wash2}
                        alt={serviceData.customMedia.alt}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    ) : title === "Paint Protection Film" ? (
                      <img
                        src={wash1}
                        alt={serviceData.customMedia.alt}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    ) : title === "Dent Repair" ? (
                      <img
                        src={dentRepairImage}
                        alt={serviceData.customMedia.alt}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    ) : (
                      <video
                        src={serviceData.customMedia.src}
                        alt={serviceData.customMedia.alt}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded z-10 relative group-hover:scale-110 transition-transform duration-300"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    )
                  ) : (
                    <img
                      src={serviceData.customMedia.src}
                      alt={serviceData.customMedia.alt}
                      className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  )
                ) : title === "Ceramic Coating" ? (
                  <img
                    src={wash2}
                    alt="Ceramic Coating"
                    className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : title === "Paint Protection Film" ? (
                  <img
                    src={wash1}
                    alt="Paint Protection Film"
                    className="w-16 h-16 sm:w-18 sm:h-18 object-contain z-10 relative group-hover:scale-110 transition-transform duration-300"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : customIcon ? (
                  customIcon
                ) : (
                  <FontAwesomeIcon icon={icon} className="text-white text-2xl sm:text-3xl z-10 relative group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
              <p className="text-sm sm:text-base text-cyan-400 mb-4 leading-relaxed">{description}</p>
              <div className="flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors group-hover:scale-110 group-hover:font-semibold">
                <span className="text-sm sm:text-base mr-2">View Details</span>
                <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    );
  };

  // UPDATED Blue Card Component with Modal Click Handler and Fixed Height
  const renderBlueCard = (cardData, index = 0) => (
    <AnimatedSection
      animationId={`blue-card-${index}`}
      delay={index * 120}
      className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-105"
    >
      <div
        onClick={() => openBlueCardModal(cardData)}
        className="relative bg-gradient-to-br from-[#1393c4] via-[#1393c4] to-[#0f7ba8] rounded-2xl sm:rounded-3xl shadow-2xl shadow-[#1393c4]/50 group-hover:shadow-3xl group-hover:shadow-[#1393c4]/60 overflow-hidden w-full aspect-square p-4 sm:p-6 md:p-8 fixed-card-height"
      >

        {/* Decorative Circle - Top Right */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-white/30 flex items-center justify-center opacity-80">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/50 rounded-full"></div>
        </div>

        {/* Decorative Small Circles */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full opacity-60"></div>
        <div className="absolute top-1/3 right-6 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/25 rounded-full opacity-40"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>

        {/* Content Container - Fixed Height Layout */}
        <div className="relative z-10 flex flex-col h-full justify-between text-center fixed-content-layout">

          {/* Top Section - Icon */}
          <div className="flex-shrink-0 flex justify-center pt-2 sm:pt-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black/20 border border-white/30 group-hover:scale-110 transition-all duration-500">
              <img
                src={cardData.image}
                alt={cardData.title}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 object-contain group-hover:scale-110 transition-transform duration-300"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={(e) => {
                  console.log(`Failed to load image: ${cardData.image}`);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Middle Section - Title (Fixed Height) */}
          <div className="flex-grow flex flex-col justify-center px-1 sm:px-2 card-title-section">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg leading-tight group-hover:scale-105 transition-transform duration-300 card-title-text">
              {cardData.title}
            </h3>

            {/* Description - Visible on larger screens with fixed lines */}
            <p className="hidden lg:block text-xs text-white/85 leading-relaxed drop-shadow-md group-hover:text-white/95 transition-colors duration-300 px-1 card-description-text">
              {cardData.description.length > 60 ? `${cardData.description.substring(0, 60)}...` : cardData.description}
            </p>
          </div>

          {/* Bottom Section - Tag */}
          <div className="flex-shrink-0 pb-2 sm:pb-3">
            <div className="scale-90 group-hover:scale-100 transition-all duration-500 opacity-80 group-hover:opacity-100">
              <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 bg-white/25 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm border border-white/30 shadow-lg font-medium">
                {cardData.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Subtle Border Glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-white/25 transition-all duration-500"></div>
      </div>
    </AnimatedSection>
  );

  const renderSparkleCard = (id, icon, title, description, index = 0) => (
    <AnimatedSection
      animationId={`sparkle-card-${index}`}
      delay={index * 150}
      className="group min-h-[16rem] sm:min-h-[18rem] md:min-h-[20rem] lg:min-h-[24rem] xl:min-h-[26rem] relative perspective-1000"
    >
      <div className="relative w-full h-full transform-gpu transition-all duration-700 group-hover:rotate-y-12 group-hover:-translate-y-2 sm:group-hover:-translate-y-4 group-hover:scale-105">
        <div className="absolute w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/50 group-hover:shadow-3xl group-hover:shadow-sky-500/50">
          <div className="w-full h-full bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 via-transparent to-sky-600/30"></div>

            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-white/80 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            <div className="absolute bottom-4 left-3 sm:bottom-8 sm:left-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-300/80 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 delay-300"></div>
            <div className="absolute top-1/3 right-4 sm:right-8 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-sky-200/80 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300 delay-500"></div>
            <div className="absolute bottom-1/3 left-2 sm:left-4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 delay-700"></div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>

            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/30 sm:border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 z-10">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 xs:mb-3 sm:mb-4 md:mb-6 shadow-xl shadow-black/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/30">
                <FontAwesomeIcon icon={icon} className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white group-hover:scale-110 transition-transform duration-700" />
              </div>

              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-cyan-400 mb-2 xs:mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-500 text-center drop-shadow-lg leading-tight px-1">{title}</h3>

              <p className="text-xs xs:text-sm sm:text-base text-cyan-300/90 text-center max-w-xs px-1 xs:px-2 md:px-4 leading-relaxed group-hover:opacity-100 transition-all duration-500 drop-shadow-md">{description}</p>

              <div className="mt-2 xs:mt-3 sm:mt-4 md:mt-6 scale-0 group-hover:scale-100 transition-all duration-500 opacity-0 group-hover:opacity-100">
                <span className="inline-block px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm border border-white/30 shadow-lg">
                  Premium Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );

  // FIXED Complete Flip Card Component - CONSISTENT BACK SIDE LAYOUT
  const renderFlipCard = (id, frontTitle, iconOrComponent, backTitle, backContent, index = 0) => {
    const isFlipped = flippedCards.has(id);
    const icon = typeof iconOrComponent === 'object' && !React.isValidElement(iconOrComponent) ? iconOrComponent : faThumbsUp;

    return (
      <AnimatedSection
        animationId={`flip-card-${index}`}
        delay={index * 120}
        className="flip-card-container group relative cursor-pointer touch-manipulation fixed-flip-card-height"
        style={{
          perspective: '1000px',
          height: '20rem' // FIXED HEIGHT
        }}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFlipCard(id);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFlipCard(id);
          }}
          className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-gpu ${isFlipped ? 'mobile-flip-card-flipped' : ''} ${!isMobile ? 'group-hover:rotate-y-180' : ''}`}
          style={{
            transformStyle: isMobile ? 'flat' : 'preserve-3d',
            height: '20rem' // FIXED HEIGHT
          }}
        >
          {/* Front Side */}
          <div
            className="flip-card-front w-full h-full rounded-xl sm:rounded-2xl shadow-2xl shadow-sky-900/50 overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              height: '20rem', // FIXED HEIGHT
              position: isMobile ? 'relative' : 'absolute'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 relative mirror-card">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out skew-x-12 mirror-shine"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-70"></div>
              <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mirror-reflection"></div>
              <div className="absolute bottom-0 right-0 w-1/4 h-2/3 bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>

              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full transition-opacity duration-300"></div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black/30 border border-white/30 group-hover:scale-110 transition-all duration-300">
                    {cardData[id]?.customImage ? (
                      <img
                        src={cardData[id].customImage}
                        alt={frontTitle}
                        className={`object-contain ${id === 'card7' ?
                            // Award Winning card - BIGGER SIZE using awardHome
                            'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40' :
                            // Other cards - Regular size
                            'w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20'
                          }`}
                        onError={(e) => {
                          console.log(`${frontTitle} image failed to load, using fallback icon`);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-2xl sm:text-3xl md:text-4xl text-white"
                      />
                    )}
                    {/* Fallback FontAwesome icon - hidden by default when images are present */}
                    {cardData[id]?.customImage && (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-2xl sm:text-3xl md:text-4xl text-white"
                        style={{ display: 'none' }}
                      />
                    )}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4 drop-shadow-lg leading-tight px-2 text-center">
                  {frontTitle}
                </h3>

                <div className="flex items-center text-cyan-300/80 text-sm sm:text-base group-hover:text-cyan-300 transition-all duration-300">
                  <span className="mr-2 font-medium">
                    {isMobile ? 'Tap' : 'Hover'} for details
                  </span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Back Side - FIXED CONSISTENT LAYOUT */}
          <div
            className={`flip-card-back ${isMobile ? 'hidden' : 'hidden xl:block'} w-full h-full rounded-xl sm:rounded-2xl shadow-2xl shadow-sky-900/50 overflow-hidden`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              height: '20rem' // FIXED HEIGHT
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 relative overflow-hidden mirror-card">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out skew-x-12 mirror-shine delay-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-70"></div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500"></div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-16 translate-x-10 sm:translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-sky-400/20 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>

              {/* CONSISTENT CONTENT LAYOUT */}
              <div className="flex flex-col h-full justify-center items-center text-center relative z-10 p-6">

                {/* Icon/Image Container - CONSISTENT SIZE */}
                <div className="mb-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-2xl shadow-black/40 border border-white/30 mirror-element">
                    {cardData[id]?.customImage ? (
                      <img
                        src={cardData[id].customImage}
                        alt={backTitle}
                        className="w-14 h-14 object-contain"
                        onError={(e) => {
                          console.log(`${backTitle} back image failed to load, using fallback icon`);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-2xl text-white"
                      />
                    )}
                    {/* Fallback FontAwesome icon - hidden by default when images are present */}
                    {cardData[id]?.customImage && (
                      <FontAwesomeIcon
                        icon={icon}
                        className="text-2xl text-white"
                        style={{ display: 'none' }}
                      />
                    )}
                  </div>
                </div>

                {/* Title - CONSISTENT SIZE */}
                <h3 className="text-xl font-bold text-cyan-400 mb-3 drop-shadow-lg leading-tight px-2">
                  {backTitle}
                </h3>

                {/* Content - CONSISTENT SIZE AND SPACING */}
                <p className="text-sm text-cyan-300/90 leading-relaxed drop-shadow-md px-2 max-w-sm text-center">
                  {backContent}
                </p>

                {/* Decorative Line - CONSISTENT */}
                <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    );
  };

  // Service Modal Component - Fixed version
  const ServiceModal = () => {
    if (!isModalOpen || !selectedService) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

        <div
          ref={modalRef}
          className="relative bg-white rounded-2xl shadow-3xl max-w-2xl w-full mx-auto overflow-hidden transform transition-all duration-500 opacity-100 scale-100 border border-gray-200"
          style={{ maxHeight: '90vh' }}
        >
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
            {/* Paint Protection Film */}
            {selectedService.title === "Paint Protection Film" ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <video
                  src={paintProtectionVideo}
                  className="w-full h-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            ) :
              /* Professional Dent Repair */
              selectedService.title === "Professional Dent Repair" ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <video
                    src={dentRepairVideo}
                    className="w-full h-full object-cover object-center"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              ) :
                /* Premium Auto Detailing */
                selectedService.title === "Premium Auto Detailing" ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <video
                      src={autoDetailingVideo}
                      className="w-full h-full object-cover object-center"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                ) :
                  /* Paint Correction Polishing */
                  selectedService.title === "Paint Correction Polishing" ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <video
                        src={paintCorrectionVideo}
                        className="w-full h-full object-cover object-center"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  ) :
                    /* Automotive Window Film */
                    selectedService.title === "Automotive Window Film" ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <video
                          src={windowTintingVideo}
                          className="w-full h-full object-cover object-center"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      </div>
                    ) :
                      /* Automotive Ceramic Coating */
                      selectedService.title === "Automotive Ceramic Coating" ? (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <video
                            src={ceramicCoatingVideo}
                            className="w-full h-full object-cover object-center"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        </div>
                      ) : (
                        /* Fallback to image */
                        <img
                          src={selectedService.image}
                          alt={selectedService.title}
                          className="w-full h-full object-cover object-center"
                        />
                      )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white text-lg sm:text-xl" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{selectedService.title}</h2>
              <p className="text-base sm:text-lg opacity-90 drop-shadow-md">{selectedService.shortDescription}</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
            <p className="text-base sm:text-lg text-cyan-400 mb-6 sm:mb-8 leading-relaxed">{selectedService.fullDescription}</p>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-500 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full mr-3"></div>
              Features
            </h3>
            <ul className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {selectedService.features.map((feature, index) => (
                <li key={index} className="flex items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <FontAwesomeIcon icon={faCheck} className="text-sky-500 mt-1 mr-3 text-lg flex-shrink-0" />
                  <span className="text-base sm:text-lg text-cyan-400">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gradient-to-r from-sky-50 to-sky-100 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border border-sky-200">
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg text-cyan-400 font-semibold">Starting Price</span>
                <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">{selectedService.price}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-between items-center">
            <button
              onClick={closeModal}
              className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-300 rounded-xl text-base sm:text-lg text-cyan-400 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 font-medium"
            >
              Close
            </button>
            <button
              onClick={handleBookService}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-base sm:text-lg text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"
            >
              {selectedService.linkTo ? 'Learn More' : 'Book Service'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // FIXED Card Modal Component for ACTION CAR DETAILING cards - NO LOGO, CONSISTENT HEIGHT
  const CardModal = () => {
    if (!isCardModalOpen || !selectedCard) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 card-modal-backdrop"
        style={{ display: isMobile ? 'flex' : 'none' }}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <div
          ref={cardModalRef}
          className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 rounded-2xl shadow-3xl max-w-sm w-full mx-auto overflow-hidden transform transition-all duration-500 opacity-100 scale-100 border-2 border-white/20 fixed-modal-height"
          style={{ maxHeight: '85vh', height: 'auto' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative p-6 text-center border-b border-white/20">
            <button
              onClick={closeCardModal}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </button>

            {/* REMOVED LOGO SECTION - Just show title without icon */}
            <h2 className="text-xl font-bold text-cyan-400 mb-2 drop-shadow-lg pt-4">{selectedCard.backTitle}</h2>
          </div>

          <div className="p-6 overflow-y-auto modal-content-scroll" style={{ maxHeight: '60vh' }}>
            <p className="text-cyan-300/90 text-base leading-relaxed mb-6 drop-shadow-md">
              {selectedCard.backContent}
            </p>

            <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
              <div className="w-4 h-4 bg-white/30 rounded-full mr-3"></div>
              Key Benefits
            </h3>

            <ul className="space-y-3">
              {selectedCard.features.map((feature, index) => (
                <li key={index} className="flex items-start p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <FontAwesomeIcon icon={faCheck} className="text-white mt-1 mr-3 text-sm flex-shrink-0" />
                  <span className="text-cyan-300/90 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20 rounded-full mx-auto mb-3"></div>
                <span className="text-cyan-300/80 text-sm font-medium">
                  Trusted by thousands of customers
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 p-4 bg-white/5">
            <button
              onClick={closeCardModal}
              className="w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-semibold backdrop-blur-sm border border-white/30"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Blue Card Modal Component for "Your Vehicle Deserves The Best" section
  const BlueCardModal = () => {
    if (!isBlueCardModalOpen || !selectedBlueCard) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 blue-card-modal-backdrop">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <div
          ref={blueCardModalRef}
          className="relative bg-gradient-to-br from-[#1393c4] via-[#1393c4] to-[#0f7ba8] rounded-2xl shadow-3xl max-w-md w-full mx-auto overflow-hidden transform transition-all duration-500 opacity-100 scale-100 border-2 border-white/20"
          style={{ maxHeight: '90vh' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative p-6 text-center border-b border-white/20">
            <button
              onClick={closeBlueCardModal}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </button>

            {/* Icon and Title */}
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 shadow-xl shadow-black/40 border border-white/30">
              <img
                src={selectedBlueCard.image}
                alt={selectedBlueCard.title}
                className="w-10 h-10 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={(e) => {
                  console.log(`Modal ${selectedBlueCard.title} image failed to load`);
                  e.target.style.display = 'none';
                }}
              />
            </div>

            <h2 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{selectedBlueCard.title}</h2>
          </div>

          <div className="p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <p className="text-white/90 text-base leading-relaxed mb-6 drop-shadow-md">
              {selectedBlueCard.fullDescription}
            </p>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <div className="w-4 h-4 bg-white/30 rounded-full mr-3"></div>
              Key Features
            </h3>

            <ul className="space-y-3 mb-6">
              {selectedBlueCard.features.map((feature, index) => (
                <li key={index} className="flex items-start p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <FontAwesomeIcon icon={faCheck} className="text-white mt-1 mr-3 text-sm flex-shrink-0" />
                  <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-center">
                <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30 shadow-lg font-medium">
                  {selectedBlueCard.tag}
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20 rounded-full mx-auto mt-3"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 p-4 bg-white/5">
            <button
              onClick={closeBlueCardModal}
              className="w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-semibold backdrop-blur-sm border border-white/30"
            >
              Perfect!
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* CHOOSE YOUR SERVICE Section */}
      <AnimatedSection
        animationId="service-hero"
        className="py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection
            animationId="service-hero-title"
            className="text-center mb-8 sm:mb-10 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative">
              <span className="relative z-10 text-sky-400 drop-shadow-2xl">
                CHOOSE YOUR SERVICE
              </span>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 lg:w-48 h-1 sm:h-2 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
            </h2>
            <p className="text-xl sm:text-2xl text-cyan-400 max-w-3xl mx-auto leading-relaxed">
              Transform your vehicle with our premium detailing services
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {renderServiceCard(null, "Auto Detailing", "Complete interior and exterior detailing services", null, 0)}
            {renderServiceCard(null, "Paint Correction Polishing", "Restore gloss, clarity, and a factory-fresh finish", null, 1)}
            {renderServiceCard(null, "Window Tinting", "Premium tinting solutions", null, 2)}
            {renderServiceCard(null, "Ceramic Coating", "Long-lasting protection", null, 3)}
            {renderServiceCard(null, "Paint Protection Film", "Film installation", null, 4)}
            {renderServiceCard(null, "Dent Repair", "Paintless dent removal and traditional repair services", null, 5)}
          </div>
        </div>
      </AnimatedSection>

      {/* Section Divider */}
      <SectionDivider animationId="divider-1" />
      {/* FREE PAINT EVALUATION Banner */}
      <AnimatedSection
        animationId="paint-evaluation"
        className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-4 sm:mb-6">
            <span className="block text-sky-400 drop-shadow-2xl">FREE PAINT EVALUATION</span>
            <span className="block text-sky-400 drop-shadow-2xl">
              & ESTIMATE
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-cyan-400 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
            Professional assessment of your vehicle's paint condition - absolutely free!
          </p>
        </div>
      </AnimatedSection>

      {/* Section Divider */}
      <SectionDivider animationId="divider-2" />

      {/* PERFECT SOLUTIONS FOR ALL VEHICLES Section */}
      <AnimatedSection
        animationId="perfect-solutions"
        className="py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection
            animationId="perfect-solutions-title"
            className="text-center mb-8 sm:mb-10 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative">
              <span className="relative z-10 text-sky-400 drop-shadow-2xl">
                PERFECT SOLUTIONS
              </span>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 lg:w-48 h-1 sm:h-2 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
            </h2>
            <p className="text-xl sm:text-2xl text-cyan-400 max-w-3xl mx-auto leading-relaxed">
              FOR ALL VEHICLES
            </p>
          </AnimatedSection>

          {/* Video Slider - Mobile Optimized with Navigation */}
          <AnimatedSection
            animationId="video-slider"
            delay={200}
            className="relative max-w-6xl mx-auto rounded-3xl shadow-3xl shadow-black/50 overflow-hidden border-4 border-white/20"
          >
            <div className="relative aspect-video bg-black">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? "auto" : isMobileDevice ? "none" : "metadata"}
                    poster={index === currentSlide ? undefined : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"}
                    onLoadedData={() => {
                      if (index === currentSlide) {
                        setIsVideoLoaded(true);
                      }
                    }}
                    onError={(e) => {
                      console.log(`Video ${index} error:`, e);
                    }}
                    onWaiting={() => {
                      console.log(`Video ${index} buffering...`);
                    }}
                    onCanPlay={() => {
                      if (index === currentSlide) {
                        console.log(`Video ${index} can play`);
                      }
                    }}
                    style={{
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-end justify-center p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="w-full text-center">
                      <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2 drop-shadow-lg leading-tight">
                        {video.title}
                      </h3>
                      <p className="text-cyan-300/90 text-sm sm:text-lg md:text-xl drop-shadow-md leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Loading indicator for mobile */}
                  {isMobileDevice && !isVideoLoaded && index === currentSlide && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group"
              aria-label="Next video"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} className="text-white text-sm sm:text-base group-hover:text-cyan-400 transition-colors duration-300" />
              ) : (
                <FontAwesomeIcon icon={faPlay} className="text-white text-sm sm:text-base group-hover:text-cyan-400 transition-colors duration-300 ml-0.5" />
              )}
            </button>

            {/* Video indicators - Mobile friendly with click functionality */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentSlide === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                    }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Section Divider */}
      <SectionDivider animationId="divider-3" />

      {/* QUALITY SERVICE & YOUR VEHICLE DESERVES THE BEST - Combined Section */}
      <AnimatedSection
        animationId="quality-service-combined"
        className="py-4 md:py-6 lg:py-8 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* QUALITY SERVICE */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 sm:mb-4 tracking-wider">
            <span className="text-sky-400 drop-shadow-2xl">
              QUALITY SERVICE
            </span>
          </h2>

          {/* YOUR VEHICLE DESERVES THE BEST - No gap */}
          <div className="mb-8 sm:mb-10 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1">
              <span className="text-sky-400 drop-shadow-2xl">
                YOUR VEHICLE DESERVES
              </span>
            </h3>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-sky-400 drop-shadow-2xl relative inline-block">
              THE BEST
              {/* Underline below THE BEST */}
              <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 lg:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Blue Cards Grid - Custom 3-2 Layout */}
      <AnimatedSection
        animationId="blue-cards-grid"
        className="pb-8 md:pb-12 lg:pb-16 xl:pb-20 relative overflow-hidden bg-white -mt-4 blue-cards-container"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Custom Grid Layout - 3 on top, 2 on bottom */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">

            {/* Top Row - 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 justify-items-center">
              {blueCardData.slice(0, 3).map((card, index) => (
                <div key={card.id || `blue-card-top-${index}`} className="w-full max-w-xs lg:max-w-sm">
                  {renderBlueCard(card, index)}
                </div>
              ))}
            </div>

            {/* Bottom Row - 2 Cards Centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 justify-items-center max-w-2xl mx-auto">
              {blueCardData.slice(3, 5).map((card, index) => (
                <div key={card.id || `blue-card-bottom-${index}`} className="w-full max-w-xs lg:max-w-sm">
                  {renderBlueCard(card, index + 3)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
      <VideoCarousel />
      {/* Section Divider */}
      <SectionDivider animationId="divider-4" />

      {/* WHY CHOOSE ACTION CAR DETAILING Section - Enhanced Flip Cards with Modal Support */}
      <AnimatedSection
        animationId="why-choose"
        className="py-8 md:py-12 lg:py-16 xl:py-20 relative bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection
            animationId="why-choose-title"
            className="text-center mb-8 sm:mb-10 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative">
              <span className="relative z-10 text-sky-400 drop-shadow-2xl">
                ACTION CAR DETAILING
              </span>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 lg:w-48 h-1 sm:h-2 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {Object.entries(cardData).map(([cardId, data], index) => (
              <div key={cardId}>
                {renderFlipCard(cardId, data.frontTitle, data.icon, data.backTitle, data.backContent, index)}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Service Modal */}
      <ServiceModal />
      <BusinessDescription setCurrentView={setCurrentView} />

      {/* FIXED Card Modal for Small Screens - ACTION CAR DETAILING */}
      <CardModal />

      {/* NEW Blue Card Modal for "Your Vehicle Deserves The Best" section */}
      <BlueCardModal />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes mirrorShine {
          0% { transform: translateX(-100%) skewX(12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) skewX(12deg); opacity: 0; }
        }
        
        @keyframes mirrorReflection {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        .mirror-card {
          position: relative;
          overflow: hidden;
        }
        
        .mirror-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%) skewX(12deg);
          transition: transform 1.5s ease-in-out;
        }
        
        .group:hover .mirror-shine {
          transform: translateX(200%) skewX(12deg);
        }
        
        .mirror-reflection {
          position: absolute;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
          opacity: 0;
          transition: all 0.7s ease-in-out;
        }
        
        .group:hover .mirror-reflection {
          opacity: 1;
          animation: mirrorReflection 2s ease-in-out;
        }
        
        .mirror-element {
          position: relative;
          overflow: hidden;
        }
        
        .mirror-element::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transition: left 1s ease-in-out;
          z-index: 10;
        }
        
        .group:hover .mirror-element::before {
          left: 100%;
        }
        
        .mirror-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            rgba(255,255,255,0.1) 0%, 
            transparent 25%, 
            transparent 50%, 
            rgba(255,255,255,0.05) 75%, 
            transparent 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        
        .group:hover .mirror-card::after {
          opacity: 1;
        }

        .mobile-flip-card-flipped {
          transform: rotateY(180deg) !important;
        }
        
        /* FIXED FLIP CARD HEIGHT STYLES - NO ELONGATION */
        .fixed-flip-card-height {
          height: 20rem !important;
          min-height: 20rem !important;
          max-height: 20rem !important;
        }
        
        .flip-card-container {
          height: 20rem !important;
          min-height: 20rem !important;
          max-height: 20rem !important;
          display: block;
        }
        
        .flip-card-inner {
          width: 100%;
          height: 20rem !important;
          min-height: 20rem !important;
          max-height: 20rem !important;
          position: relative;
        }
        
        .flip-card-front,
        .flip-card-back {
          width: 100%;
          height: 20rem !important;
          min-height: 20rem !important;
          max-height: 20rem !important;
          border-radius: 0.75rem;
        }
        
        /* FIXED MODAL HEIGHT STYLES */
        .fixed-modal-height {
          max-height: 85vh !important;
          height: auto !important;
        }
        
        .modal-content-scroll {
          max-height: 60vh !important;
          overflow-y: auto !important;
        }
        
        /* FIXED BLUE CARD HEIGHT STYLES */
        .fixed-card-height {
          height: auto !important;
          min-height: 280px !important;
          max-height: 350px !important;
        }
        
        .fixed-content-layout {
          height: 100% !important;
          min-height: 280px !important;
        }
        
        .card-title-section {
          flex-grow: 1 !important;
          min-height: 60px !important;
          max-height: 120px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
        }
        
        .card-title-text {
          line-height: 1.2 !important;
          word-wrap: break-word !important;
          hyphens: auto !important;
        }
        
        .card-description-text {
          line-height: 1.3 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        
        @media (max-width: 1399px) {
          .flip-card-container {
            height: 20rem !important;
            min-height: 20rem !important;
            max-height: 20rem !important;
          }
          
          .flip-card-inner {
            transform-style: flat !important;
            height: 20rem !important;
            min-height: 20rem !important;
            max-height: 20rem !important;
          }
          
          .flip-card-front {
            position: relative !important;
            display: block !important;
            height: 20rem !important;
            min-height: 20rem !important;
            max-height: 20rem !important;
          }
          
          .flip-card-back {
            display: none !important;
          }
        }
        
        @media (min-width: 1024px) and (max-width: 1399px) {
          .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 1.5rem !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1.25rem !important;
          }
        }
        
        @media (min-width: 480px) and (max-width: 767px) {
          .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 1rem !important;
          }
        }
        
        @media (max-width: 479px) {
          .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 {
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
            gap: 1rem !important;
          }
          
          .flip-card-container {
            height: 18rem !important;
            min-height: 18rem !important;
            max-height: 18rem !important;
          }
          
          .flip-card-inner,
          .flip-card-front {
            height: 18rem !important;
            min-height: 18rem !important;
            max-height: 18rem !important;
          }
          
          .fixed-card-height {
            min-height: 250px !important;
            max-height: 300px !important;
          }
          
          .fixed-content-layout {
            min-height: 250px !important;
          }
        }
        
        @media (min-width: 1400px) {
          .flip-card-inner {
            transform-style: preserve-3d !important;
          }
          
          .flip-card-front {
            position: absolute !important;
          }
          
          .flip-card-back {
            display: block !important;
            position: absolute !important;
          }
          
          .group:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
          
          .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 2rem !important;
          }
        }
        
        .mobile-flip-card-flipped {
          transform: none !important;
        }
        
        @media (max-width: 1399px) {
          .group:hover [class*="rotate"] {
            transform: none !important;
          }
        }
        
        .mobile-flip-card-front,
        .mobile-flip-card-back {
          position: relative !important;
          min-height: inherit !important;
        }
        
        @media (max-width: 1399px) {
          [style*="transform-style: preserve-3d"] {
            transform-style: flat !important;
          }
          
          .mobile-flip-card-flipped {
            transform: none !important;
          }
          
          .group:hover [class*="rotate-y-180"] {
            transform: none !important;
          }
        }

        .mirror-card,
        .mirror-element,
        .mirror-shine,
        .mirror-reflection {
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .mirror-shine,
          .mirror-reflection,
          .mirror-element::before {
            animation: none !important;
            transition: none !important;
          }
          
          .mobile-flip-card-flipped,
          .group:hover [class*="rotate"],
          .group:hover [class*="scale"],
          .group:hover [class*="translate"] {
            transition: none !important;
            animation: none !important;
          }
          
          * {
            transition: none !important;
            animation: none !important;
          }
        }

        .cursor-pointer:focus-visible {
          outline: 2px solid #0ea5e9;
          outline-offset: 2px;
          border-radius: 0.5rem;
        }
        
        button:focus-visible {
          outline: 2px solid #0ea5e9;
          outline-offset: 2px;
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (hover: none) and (pointer: coarse) {
          .group:hover .mirror-shine {
            transform: translateX(200%) skewX(12deg);
          }
          
          .cursor-pointer.touch-manipulation {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Scroll Animation Styles */
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-stagger-1 { transition-delay: 100ms; }
        .scroll-stagger-2 { transition-delay: 200ms; }
        .scroll-stagger-3 { transition-delay: 300ms; }
        .scroll-stagger-4 { transition-delay: 400ms; }
        .scroll-stagger-5 { transition-delay: 500ms; }
        .scroll-stagger-6 { transition-delay: 600ms; }

        /* Enhanced spacing for better flow */
        .section-spacing {
          padding-top: clamp(2rem, 5vw, 4rem);
          padding-bottom: clamp(2rem, 5vw, 4rem);
        }
        
        .section-spacing-large {
          padding-top: clamp(3rem, 8vw, 6rem);
          padding-bottom: clamp(3rem, 8vw, 6rem);
        }
        
        .section-spacing-small {
          padding-top: clamp(1rem, 3vw, 2rem);
          padding-bottom: clamp(1rem, 3vw, 2rem);
        }

        /* Smooth transitions for all elements */
        .transition-smooth {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .transition-smooth-slow {
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Enhanced grid spacing */
        .grid-enhanced {
          gap: clamp(1rem, 4vw, 2.5rem);
        }
        
        @media (min-width: 640px) {
          .grid-enhanced {
            gap: clamp(1.5rem, 4vw, 3rem);
          }
        }
        
        @media (min-width: 1024px) {
          .grid-enhanced {
            gap: clamp(2rem, 4vw, 3.5rem);
          }
        }

        /* Performance optimizations */
        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .section-spacing {
            padding-top: clamp(1.5rem, 4vw, 3rem);
            padding-bottom: clamp(1.5rem, 4vw, 3rem);
          }
          
          .section-spacing-large {
            padding-top: clamp(2rem, 6vw, 4rem);
            padding-bottom: clamp(2rem, 6vw, 4rem);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .scroll-animate,
          .transition-smooth,
          .transition-smooth-slow {
            transition: none !important;
            animation: none !important;
          }
          
          .scroll-animate {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Square Blue Cards Responsive Design - 3-2 Layout with Vivid Azure */
        
        /* Custom aspect-square utility for perfect squares */
        .aspect-square {
          aspect-ratio: 1 / 1;
        }
        
        /* Add blue-cards-container class for targeting */
        .blue-cards-container {
          width: 100%;
        }
        
        /* Mobile Phones (320px - 479px) */
        @media (max-width: 479px) {
          .blue-cards-container .grid {
            gap: 1rem !important;
          }
          
          .blue-cards-container .max-w-xs {
            max-width: 280px !important;
            width: 100% !important;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 280px !important;
            max-height: 280px !important;
          }
          
          .blue-cards-container h3 {
            font-size: 0.875rem !important;
            line-height: 1.2 !important;
          }
          
          .blue-cards-container .text-xs {
            font-size: 0.75rem !important;
          }
        }
        
        /* Small Mobile (480px - 640px) */
        @media (min-width: 480px) and (max-width: 640px) {
          .blue-cards-container .grid {
            gap: 1.25rem !important;
          }
          
          .blue-cards-container .max-w-xs {
            max-width: 300px !important;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 300px !important;
            max-height: 300px !important;
          }
        }
        
        /* Small Tablets (641px - 768px) */
        @media (min-width: 641px) and (max-width: 768px) {
          .blue-cards-container .grid {
            gap: 1.5rem !important;
          }
          
          .blue-cards-container .max-w-xs {
            max-width: 280px !important;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 280px !important;
            max-height: 280px !important;
          }
          
          /* Top row - 3 cards in 2 columns on small tablets */
          .blue-cards-container .grid.lg\\:grid-cols-3 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .blue-cards-container .grid.lg\\:grid-cols-3 > :nth-child(3) {
            grid-column: span 2 !important;
            justify-self: center !important;
          }
        }
        
        /* iPad Mini Portrait (769px - 834px) */
        @media (min-width: 769px) and (max-width: 834px) {
          .blue-cards-container .grid {
            gap: 1.5rem !important;
          }
          
          .blue-cards-container .max-w-xs {
            max-width: 220px !important;
          }
          
          .blue-cards-container .lg\\:max-w-sm {
            max-width: 240px !important;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 220px !important;
            max-height: 240px !important;
          }
          
          .blue-cards-container h3 {
            font-size: 0.875rem !important;
          }
        }
        
        /* iPad Air/Pro Portrait (835px - 1024px) */
        @media (min-width: 835px) and (max-width: 1024px) {
          .blue-cards-container .grid {
            gap: 2rem !important;
          }
          
          .blue-cards-container .max-w-xs {
            max-width: 240px !important;
          }
          
          .blue-cards-container .lg\\:max-w-sm {
            max-width: 260px !important;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 240px !important;
            max-height: 260px !important;
          }
        }
        
        /* iPad Pro Landscape & Desktop (1025px+) */
        @media (min-width: 1025px) {
          .blue-cards-container .grid {
            gap: 2.5rem !important;
          }
          
          .blue-cards-container .max-w-xs {
            max-width: 280px !important;
          }
          
          .blue-cards-container .lg\\:max-w-sm {
            max-width: 320px !important;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 280px !important;
            max-height: 320px !important;
          }
        }

        /* Specific iPad Device Targeting for Square Cards */
        @media only screen 
          and (min-device-width: 768px) 
          and (max-device-width: 834px) 
          and (-webkit-min-device-pixel-ratio: 1) {
          /* iPad Mini */
          .blue-cards-container .grid.lg\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(200px, 1fr)) !important;
            justify-content: center;
          }
          
          .blue-cards-container .grid.sm\\:grid-cols-2:last-child {
            grid-template-columns: repeat(2, minmax(200px, 240px)) !important;
            justify-content: center;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 200px !important;
            max-height: 220px !important;
          }
        }

        @media only screen 
          and (min-device-width: 768px) 
          and (max-device-width: 1024px) 
          and (-webkit-min-device-pixel-ratio: 2) {
          /* iPad Air/Pro */
          .blue-cards-container .grid.lg\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(220px, 1fr)) !important;
            justify-content: center;
          }
          
          .blue-cards-container .grid.sm\\:grid-cols-2:last-child {
            grid-template-columns: repeat(2, minmax(220px, 260px)) !important;
            justify-content: center;
          }
          
          .blue-cards-container .aspect-square {
            min-height: 220px !important;
            max-height: 240px !important;
          }
        }

        /* Enhanced Card Content for Square Layout */
        .blue-cards-container .aspect-square .flex.flex-col {
          height: 100% !important;
        }
        
        .blue-cards-container h3 {
          word-wrap: break-word;
          hyphens: auto;
          overflow-wrap: break-word;
          text-align: center;
        }
        
        .blue-cards-container p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }

        /* Vivid Azure Color Enhancements */
        .bg-vivid-azure {
          background: linear-gradient(135deg, #1393c4 0%, #0f7ba8 100%);
        }
        
        .shadow-vivid-azure {
          box-shadow: 0 25px 50px -12px rgba(19, 147, 196, 0.5);
        }
        
        .shadow-vivid-azure-hover {
          box-shadow: 0 35px 60px -12px rgba(19, 147, 196, 0.6);
        }

        /* Performance optimizations for square cards */
        .blue-cards-container * {
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* Animation improvements */
        .blue-cards-container .group:hover {
          transform: translateY(-8px) scale(1.05);
        }
        
        @media (max-width: 768px) {
          .blue-cards-container .group:hover {
            transform: translateY(-4px) scale(1.02);
          }
        }

        /* Ensure proper spacing and centering */
        .blue-cards-container .flex.flex-col {
          align-items: center;
          width: 100%;
        }
        
        .blue-cards-container .grid {
          width: 100%;
          place-items: center;
        }

        /* Text visibility improvements */
        .blue-cards-container .text-white {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .blue-cards-container .drop-shadow-lg {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
        }

        /* Enhanced Card Content Responsiveness */
        .blue-cards-container .flex-grow {
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          min-height: 0 !important;
        }
        
        .blue-cards-container h3 {
          line-height: 1.2 !important;
          margin-bottom: 0.75rem !important;
          word-wrap: break-word !important;
          hyphens: auto !important;
        }
        
        .blue-cards-container p {
          line-height: 1.4 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 3 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }

        /* Show description on larger tablets and desktop */
        @media (min-width: 769px) {
          .blue-cards-container p.hidden {
            display: block !important;
          }
        }

        /* Video Navigation Button Styles */
        .video-nav-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .video-nav-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .video-nav-btn:active {
          transform: scale(0.95);
        }

        /* Enhanced touch targets for mobile */
        @media (max-width: 768px) {
          .video-nav-btn {
            width: 3rem !important;
            height: 3rem !important;
            min-width: 44px;
            min-height: 44px;
          }
          
          .video-nav-btn svg {
            width: 1.25rem !important;
            height: 1.25rem !important;
          }
        }

        /* Video indicator enhancements */
        .video-indicators button {
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .video-indicators button:hover {
          transform: scale(1.2);
        }
        
        .video-indicators button:focus-visible {
          outline: 2px solid #0ea5e9;
          outline-offset: 2px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};

export default Service;