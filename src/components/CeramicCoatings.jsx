import React, { useState, useEffect, useRef } from 'react';
import { Play, Check, Shield, Star, Droplets, Settings, HardHat, Sun, Atom, Beaker } from 'lucide-react';
import Footer from '../components/Footer';
// Import Ceramic Coating Video
import ceramicCoatingVideo from '../assets/images/Copy of Ceramic coating.mp4';

const CeramicCoatings = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Optimized single video handling - same as Hero component
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

  const features = [
    {
      icon: <Check className="w-8 h-8 text-white" />,
      title: "Self-cleaning",
      description: "Its super hydrophobic effect makes any liquid bead up and roll off the surface, encapsulating dirt and grime."
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Permanent Protection",
      description: "The nano particles form a permanent barrier that can only be removed through abrasion like wet sanding."
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "Extreme Gloss",
      description: "The protective glass shield will keep the vehicle looking shiny and new."
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      title: "Corrosion and Oxidation Resistant",
      description: "XPEL Ceramic Coating creates a paint protection layer that prevents oxidation and corrosion."
    }
  ];

  const additionalFeatures = [
    {
      icon: <HardHat className="w-8 h-8 text-white" />,
      title: "Hardness above 9H",
      description: "The glass coat is above max 9H on the pencil test. The pencil test is used in the coating industry to determine a paints hardness."
    },
    {
      icon: <Sun className="w-8 h-8 text-white" />,
      title: "UV Protection",
      description: "With XPEL Fusion Plus Ceramic coating your paint won't fade or age due to the UV protection in the glass coating."
    },
    {
      icon: <Atom className="w-8 h-8 text-white" />,
      title: "Chemical Resistant",
      description: "The coating has 100% resistance against damaging contaminants and harsh chemicals."
    },
    {
      icon: <Beaker className="w-8 h-8 text-white" />,
      title: "Anti-graffiti",
      description: "Once cured, the coating provides protection from extreme temperatures ranging from -50 to 2,200 degrees Fahrenheit."
    }
  ];

  const packages = [
    {
      title: "XPEL FUSION PLUS LITE COATING",
      warranty: "1 YEAR WARRANTY",
      prices: {
        coupe: "$499",
        large: "$549",
        truck: "$599"
      },
      features: [
        "1 Layer of FUSION PLUS LITE Ceramic Coating"
      ],
      image: "https://actioncardetailing.ca/wp-content/uploads/2021/05/paint1.png.webp"
    },
    {
      title: "XPEL FUSION PLUS PAINT& PPF COATING",
      warranty: "4 YEARS WARRANTY",
      prices: {
        coupe: "$799",
        large: "$899",
        truck: "$999"
      },
      features: [
        "1 Layer of FUSION PLUS PAINT & PPF Ceramic Coating",
        "1 Layer of XPEL Fusion Plus Plastic and Trim",
        "1 Layer of XPEL Glass coating on Windshield and All Windows",
        "1 Layer of XPEL Wheel and caliper coating on the Rim Face & exhaust tips"
      ],
      image: "https://actioncardetailing.ca/wp-content/uploads/2021/05/paint1.png.webp"
    },
    {
      title: "XPEL FUSION PLUS PREMIUM COATING",
      warranty: "8 YEARS WARRANTY",
      prices: {
        coupe: "$1199",
        large: "$1349",
        truck: "$1599"
      },
      features: [
        "1 Layer of FUSION PLUS PREMIUM ceramic Coating",
        "1 Layer of XPEL Fusion Plus Plastic and Trim",
        "1 Layer of XPEL Glass coating on Windshield and All Windows",
        "1 Layer of XPEL Wheel and caliper coating on the Rim Face & exhaust tips"
      ],
      image: "https://actioncardetailing.ca/wp-content/uploads/2021/05/paint1.png.webp"
    }
  ];

  const addOns = [
    {
      title: "Upholstery Protection Package",
      prices: {
        coupe: "$249",
        large: "$299",
        truck: "$349"
      },
      features: ["1 Coat of Fusion Plus Upholstery"]
    },
    {
      title: "Wheels Face Package",
      price: "$199",
      features: ["1 Layer of 'Wheel and Caliper' on face of All Rims + Calipers"]
    },
    {
      title: "Glass Protection Package",
      prices: {
        coupe: "$169",
        large: "$179",
        truck: "$199"
      },
      features: ["2 Layers of 'Glass' to All Exterior Glass"]
    },
    {
      title: "Door Jamb Protection Package",
      prices: {
        coupe: "$200",
        large: "$250",
        truck: "$300"
      },
      features: ["1 Layer of Fusion Plus Premium"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900">
      {/* Hero Section with Video */}
      <section className="bg-white">
        {/* Hero Video - Responsive like Hero component */}
        <div className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover object-center"
              src={ceramicCoatingVideo}
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
        </div>
        
        {/* Hero Content - positioned below video */}
        <div className="bg-white py-8 sm:py-10 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-sky-400">
              Ceramic Coatings
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-sky-400 to-sky-200 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-white via-sky-50 to-sky-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-400 via-sky-400 to-sky-400 bg-clip-text text-transparent mb-0">
              NO OTHER COATING COMES CLOSE
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-sky-400">
              WATCH VIDEO
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gradient-to-br from-sky-900 to-sky-800 rounded-xl overflow-hidden shadow-2xl border-2 border-sky-400/30 hover:border-sky-400/60 transition-all duration-300">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-900 to-sky-800">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mb-4 cursor-pointer hover:from-sky-300 hover:to-sky-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 animate-pulse"
                      onClick={() => setIsVideoPlaying(true)}>
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <div className="text-white">
                      <div className="text-2xl font-bold">FUSION<span className="text-gradient bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">PLUS</span>™</div>
                      <div className="text-sm tracking-widest text-sky-300">CERAMIC COATING</div>
                      <div className="text-xs mt-2 flex items-center justify-center space-x-4 text-sky-200">
                        <span className="hover:text-sky-400 transition-colors">SATIN</span>
                        <span>|</span>
                        <span className="hover:text-sky-400 transition-colors">PREMIUM</span>
                        <span>|</span>
                        <span className="hover:text-sky-400 transition-colors">LITE</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://player.vimeo.com/video/957024834?h=166ff14d42&autoplay=1"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Protection Description */}
      <section className="py-12 bg-gradient-to-r from-sky-100 via-sky-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg md:text-xl text-sky-400 max-w-4xl mx-auto">
            <span className="text-sky-400 font-semibold bg-white px-2 py-1 rounded-md shadow-sm">Protect paint and surfaces</span> from wear and tear and harsh elements, exponentially reducing scratches, rock chips and maintenance.
          </p>
        </div>
      </section>

      {/* Look New Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-sky-50 to-sky-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-400 via-sky-400 to-sky-400 bg-clip-text text-transparent mb-8">
              LOOK NEW ALL THE TIME
            </h2>
            <p className="text-lg md:text-xl text-sky-400 max-w-4xl mx-auto">
              XPEL Ceramic Coating is a <span className="text-sky-400 font-semibold bg-white px-2 py-1 rounded-md shadow-sm">liquid nano-ceramic clear coat</span>, with 3 times the hardness and self cleaning properties.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-sky-300/50 group">
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-6 text-center group-hover:from-sky-400 group-hover:to-sky-500 transition-all duration-300">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-sky-400 mb-3 group-hover:text-sky-400 transition-colors">{feature.title}</h3>
                  <p className="text-sky-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-sky-300/50 group">
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-6 text-center group-hover:from-sky-400 group-hover:to-sky-500 transition-all duration-300">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-sky-900 mb-3 group-hover:text-sky-600 transition-colors">{feature.title}</h3>
                  <p className="text-sky-700 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Warranty Text */}
          <div className="text-center mt-16">
            <p className="text-lg md:text-xl text-sky-400 max-w-5xl mx-auto bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-sky-200/50">
              Each XPEL Ceramic Coating package comes with a manufacturer-backed warranty, and can be modified to include add-on protection with a layer of Ceramic Coating, or combined with interior treatments.
            </p>
          </div>
        </div>
      </section>

      {/* Financing Section - Removed "Click below to learn more" text and reduced spacing */}
      <section className="py-12 bg-gradient-to-r from-white via-sky-50 to-sky-100 border-t border-sky-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-sky-400 bg-clip-text text-transparent mb-8">
            FINANCING AVAILABLE
          </h2>

          <div className="max-w-md mx-auto">
            <img
              src="https://actioncardetailing.ca/wp-content/uploads/2021/05/financeit.jpg.webp"
              alt="Financeit Logo"
              className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>

      {/* Installation Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent mb-4">
              INSTALLATION PRICING
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent mb-4">
              BEST CERAMIC COATING PROTECTION
            </h3>
            <p className="text-lg text-sky-200 mb-8">
              All of our Ceramic Coating packages include:
            </p>
            <div className="text-xl space-y-2">
              <div className="hover:text-sky-400 transition-colors">Exterior Wash</div>
              <div className="hover:text-sky-400 transition-colors">Paint Decontamination</div>
              <div className="hover:text-sky-400 transition-colors">Paint Prep</div>
            </div>
            <p className="text-sm text-sky-300 mt-8 max-w-4xl mx-auto bg-sky-800/50 p-4 rounded-lg backdrop-blur-sm">
              ** Paint Correction will be charged additionally. For a more accurate quote on a Paint Correction, schedule 15 minutes appointment to have your paint evaluated (free of charge and no obligation)**
            </p>

            <a
              href="https://www.yocale.com/widget/action-car-detailing/offerings?gei=009eaMj_I7qdseMPjsjDiQc&hl=en-IN&index=0&locations=49895&merchant_id=B53547-L49895&rwg_token=ACgRB3eVv8FcyHcBwdjLyYYzxJndWpDdj5JwjbK0BM3Q95FVj7UlEJnsWUcag15NXETRnCinPLVndetSrXO4qeadV66Tuio0hQ%3D%3D&sort=alphabetically"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-8 py-3 border-2 border-sky-400 text-sky-400 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-sky-400/50"
            >
              Book now
            </a>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-sky-300/50 group">
                <div className="p-6">
                  <div className="mb-6 transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={pkg.image}
                      alt="Fusion Plus Package"
                      className="w-full h-32 object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-sky-400 text-center mb-2 group-hover:text-sky-400 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-sm text-sky-400 text-center mb-6 bg-sky-50 py-2 px-4 rounded-full">
                    {pkg.warranty}
                  </p>

                  <div className="space-y-2 mb-6 text-center bg-sky-50 p-4 rounded-lg">
                    <div className="text-sm">
                      <span className="font-semibold text-sky-400">Coupe/Small car</span> <span className="text-sky-400 font-bold">{pkg.prices.coupe}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-sky-400">Large car/Small SUV</span> <span className="text-sky-400 font-bold">{pkg.prices.large}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-sky-400">Large SUV/Truck</span> <span className="text-sky-400 font-bold">{pkg.prices.truck}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {pkg.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-sky-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-400 text-center mb-12">
            ADD-ONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gradient-to-br from-sky-600 to-sky-700 text-white rounded-lg p-6 hover:from-sky-500 hover:to-sky-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group">
                <h3 className="text-lg font-bold text-white text-center mb-4 group-hover:text-sky-100 transition-colors">
                  {addon.title}
                </h3>

                {addon.prices ? (
                  <div className="space-y-2 mb-4 text-center text-sm bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <div>Coupe/Small car <span className="text-sky-100 font-bold">{addon.prices.coupe}</span></div>
                    <div>Large car/Small SUV <span className="text-sky-100 font-bold">{addon.prices.large}</span></div>
                    <div>Large SUV/Truck <span className="text-sky-100 font-bold">{addon.prices.truck}</span></div>
                  </div>
                ) : (
                  <div className="text-center mb-4 bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <span className="font-semibold">All vehicles <span className="text-sky-100 font-bold">{addon.price}</span></span>
                  </div>
                )}

                <div className="space-y-2">
                  {addon.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full flex items-center justify-center mt-1">
                        <Check className="w-2.5 h-2.5 text-sky-600" />
                      </div>
                      <span className="text-xs text-sky-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Fusion Plus Card Section */}
      <section className="py-16 bg-gradient-to-br from-white via-sky-50 to-sky-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-sky-200/50 hover:border-sky-300/70 transition-all duration-300">
            {/* Top Section - Protect Your Vehicle */}
            <div className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-400 via-sky-400 to-sky-400 bg-clip-text text-transparent mb-8">
                    PROTECT YOUR VEHICLE WITH XPEL FUSION PLUS CERAMIC COATING
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"></span>
                      <span className="text-sky-400 font-semibold text-lg underline decoration-sky-400 hover:text-sky-400 transition-colors">FUSION PLUS LITE</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"></span>
                      <span className="text-sky-400 font-semibold text-lg underline decoration-sky-400 hover:text-sky-400 transition-colors">FUSION PLUS PAINT & PPF</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"></span>
                      <span className="text-sky-400 font-semibold text-lg underline decoration-sky-400 hover:text-sky-400 transition-colors">FUSION PLUS PREMIUM</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"></span>
                      <span className="text-sky-400 font-semibold text-lg underline decoration-sky-400 hover:text-sky-400 transition-colors">FUSION PLUS WHEEL & CALIPER</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"></span>
                      <span className="text-sky-400 font-semibold text-lg underline decoration-sky-400 hover:text-sky-400 transition-colors">FUSION PLUS GLASS</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"></span>
                      <span className="text-sky-400 font-semibold text-lg underline decoration-sky-400 hover:text-sky-400 transition-colors">FUSION PLUS PLASTIC & TRIMS</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"></span>
                      <span className="text-sky-400 font-semibold text-lg underline decoration-sky-400 hover:text-sky-400 transition-colors">FUSION PLUS UPHOLSTY</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 lg:pl-12">
                  <div className="max-w-md mx-auto hover:scale-105 transition-transform duration-300">
                    <img
                      src="https://actioncardetailing.ca/wp-content/uploads/2021/05/image14.png.webp"
                      alt="XPEL Logo"
                      className="w-full h-auto drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Fusion Plus Details */}
            <div className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 text-white p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
                    FUSION PLUS
                    <span className="block text-3xl md:text-4xl">CERAMIC COATING</span>
                  </h2>

                  <div className="space-y-4 text-sm md:text-base">
                    <p className="leading-relaxed bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      Developed to perform in a wide variety of surface types, <span className="font-bold">FUSION PLUS</span> Ceramic Coating offers unrivaled gloss, superior hydrophobic protection, and improved scratch resistance.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-3 rounded-lg hover:bg-white/30 transition-colors">
                      <span className="text-xl font-bold">+</span>
                      <span className="font-semibold">Provides protection from the elements</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-3 rounded-lg hover:bg-white/30 transition-colors">
                      <span className="text-xl font-bold">+</span>
                      <span className="font-semibold">Repels water, dirt & road grime</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-3 rounded-lg hover:bg-white/30 transition-colors">
                      <span className="text-xl font-bold">+</span>
                      <span className="font-semibold">Resist stains & chemical etching</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 lg:pl-12">
                  <img
                    src="https://actioncardetailing.ca/wp-content/uploads/2021/05/image15-1.jpg.webp"
                    alt="Fusion Plus Ceramic Coating Process"
                    className="w-full h-auto rounded-lg shadow-2xl border-4 border-white/30 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default CeramicCoatings;