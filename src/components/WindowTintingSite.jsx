import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Shield, Sun, Zap, Wifi, CheckCircle, Play } from 'lucide-react';
import Footer from '../components/Footer';
// Import Window Tint Video
import windowTintVideo from '../assets/images/window tint (1).mp4';

const WindowTintingSite = () => {
  const [selectedTint, setSelectedTint] = useState(35);
  const [selectedFilm, setSelectedFilm] = useState('prime-cs');
  const videoRef = useRef(null);

  useEffect(() => {
    // Optimized single video handling similar to Hero component
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

  const tintOptions = [5, 20, 35, 50, 70];
  
  const filmTypes = {
    'prime-cs': {
      name: 'Prime Color Stable',
      subtitle: 'Cost Effective Quality',
      description: 'Safety and Color Stability Like Never Before. When comfort and cost is key, dyed window tint won\'t let you down. PRIME CS BLACK can cut out the glare, protect your skin from harmful UV rays, and make any journey that much more enjoyable.',
      features: ['UV Ray Protection - SPF 500 protection from 99% harmful UV Rays', 'Good Looks - Stylish statement that won\'t fade or turn purple', 'Crystal Clear Signal - Clear communication in today\'s digital world'],
      grade: 'GOOD',
      logo: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/cs1.jpg.webp',
      carImage: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/goodcar.jpg'
    },
    'prime-hp': {
      name: 'Prime HP',
      subtitle: 'Heat Rejection Tint',
      description: 'XPEL High Performance window tint like PRIME HP BLACK can give your vehicle the look & feel you want without breaking the bank. Providing powerful UV protection and a full spectrum selection of VLTs, HP window tint is a great film option for vehicles of all varieties.',
      features: ['High Performance Technology - Blocks 53% infrared heat to keep vehicle cooler', 'UV Ray Protection - Blocks the vast majority of the sun\'s heat-causing radiation', 'Blend Performance & Value - Ceramic Window Tint is a perfect marriage of value and performance', 'Crystal Clear Signal - Clear Communication in today\'s digital world'],
      grade: 'BETTER',
      logo: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image14.jpg.webp',
      carImage: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image24.jpg'
    },
    'nano-ceramic': {
      name: 'NANO-CERAMIC (IR)',
      subtitle: 'Max UV & Heat Rejection Tint',
      description: 'There\'s no better place to start than the top. If you\'re looking for maximum performance & protection, look no further than nano-ceramic PRIME XR. Ceramic tint is designed to provide the most heat rejection possible, while reflecting harmful UV rays to keep you safe. This window tint will your vehicle cooler & more comfortable wherever you\'re headed.',
      features: ['Nano Ceramic Technology - Blocks 85% infrared heat', 'UV Ray Protection - SPF 1000 protection from 99% harmful UV Rays'],
      grade: 'BEST',
      logo: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image17.png',
      carImage: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image3.jpg.webp'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="bg-white">
        {/* Hero Video - with responsive container similar to Hero component */}
        <div className="relative h-screen w-full overflow-hidden bg-white">
          {/* Video background - single optimized video */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover object-center"
              src={windowTintVideo}
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
            >
              <source src={windowTintVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Responsive gradient overlay - height adjusts with screen size */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 md:h-1/3 lg:h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* Responsive scroll indicator - position and size adjust with screen */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center">
              <span className="text-white text-xs sm:text-sm md:text-base mb-1 sm:mb-2 tracking-widest font-medium drop-shadow-md">SCROLL</span>
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-sky-500/40 animate-pulse"></div>
                <div className="animate-bounce bg-sky-600/90 p-1.5 sm:p-2 rounded-full shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Content - positioned below video */}
        <div className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{color: '#1393c4'}}>
              WINDOW TINTING
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{color: '#1393c4'}}>
              Say Goodbye to...
            </p>
            <div className="text-lg md:text-xl font-semibold mb-8" style={{color: '#1393c4'}}>
              SUN GLARE | SKIN RADIATION | UV DAMAGE | FADED INTERIORS
            </div>
            <p className="text-xl md:text-2xl mb-12" style={{color: '#1393c4'}}>
              Before It Happens
            </p>
            <button 
              className="text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:opacity-90"
              style={{backgroundColor: '#1393c4'}}
            >
              Get Quote Now
            </button>
          </div>
        </div>
      </section>

      {/* Why Window Tinting Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{color: '#1393c4'}}>
                WHY WINDOW TINTING?
              </h2>
              <div className="mb-8">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/action1.jpg.webp" 
                  alt="Tint Levels"
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-6 rounded-xl" style={{backgroundColor: '#f0f9ff', borderColor: '#1393c4', borderWidth: '1px'}}>
                <h3 className="text-2xl font-bold mb-4" style={{color: '#1393c4'}}>
                  Experience a New Level of Heat Rejection, UV Protection, & Good Looks
                </h3>
                <p className="leading-relaxed mb-6" style={{color: '#1393c4'}}>
                  We recommend Ceramic window film for maximum heat rejection, glare reduction, and comfort. Gone are the days of needing dark windows to provide relief; even our ultra-light films provide extreme heat reduction, so choose your shade based on your style. All films provide +99% UV protection & Lifetime Warranty. Protect delicate interiors and your loved ones!!!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl text-white" style={{backgroundColor: '#1393c4'}}>
                  <div className="flex items-center mb-3">
                    <Sun className="text-white mr-3" size={24} />
                    <h4 className="font-bold">Superior Heat Rejection</h4>
                  </div>
                  <p className="text-blue-100">Our multilayer nano-ceramic particle technology blocks up to 98% of the infrared heat</p>
                </div>

                <div className="p-6 rounded-xl text-white" style={{backgroundColor: '#1393c4'}}>
                  <div className="flex items-center mb-3">
                    <Shield className="text-white mr-3" size={24} />
                    <h4 className="font-bold">UV Ray Protection</h4>
                  </div>
                  <p className="text-blue-100">XPEL PRIME XR PLUS provides SPF 1,000 protection that effectively blocks over 99% of harmful UV rays</p>
                </div>

                <div className="p-6 rounded-xl text-white" style={{backgroundColor: '#1393c4'}}>
                  <div className="flex items-center mb-3">
                    <Zap className="text-white mr-3" size={24} />
                    <h4 className="font-bold">Greater Clarity</h4>
                  </div>
                  <p className="text-blue-100">Advanced nano construction in XPEL PRIMETM XR provides superior performance without reducing outbound visibility</p>
                </div>

                <div className="p-6 rounded-xl text-white" style={{backgroundColor: '#1393c4'}}>
                  <div className="flex items-center mb-3">
                    <Wifi className="text-white mr-3" size={24} />
                    <h4 className="font-bold">Crystal Clear Signal</h4>
                  </div>
                  <p className="text-blue-100">In the digital world, clear communication is key. PRIME XR PLUS construction will not interfere with radio, cellular, or Bluetooth signals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Window Tint as Easy as 1,2,3 */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'}}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{color: '#1393c4'}}>
            Window Tint as Easy as <span style={{color: '#1393c4', opacity: 0.8}}>1, 2, 3</span>:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{background: 'linear-gradient(135deg, #1393c4 0%, #0ea5e9 100%)'}}>1</div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#1393c4'}}>Select the Film</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/filmselection-1.jpg.webp" 
                  alt="Film Selection"
                  className="w-full rounded mb-4"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-white px-3 py-2 rounded" style={{backgroundColor: '#1393c4', opacity: 0.7}}>
                    <span>PRIME CS</span>
                    <span>GOOD</span>
                  </div>
                  <div className="flex items-center justify-between text-white px-3 py-2 rounded" style={{backgroundColor: '#1393c4', opacity: 0.85}}>
                    <span>PRIME HP</span>
                    <span>BETTER</span>
                  </div>
                  <div className="flex items-center justify-between text-white px-3 py-2 rounded" style={{backgroundColor: '#1393c4'}}>
                    <span>PRIME XR</span>
                    <span>BEST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{background: 'linear-gradient(135deg, #1393c4 0%, #0ea5e9 100%)'}}>2</div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#1393c4'}}>Select the Coverage</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/action1.jpg.webp" 
                  alt="Coverage Selection"
                  className="w-full rounded mb-4"
                />
                <div className="flex justify-center space-x-2">
                  {tintOptions.map((tint) => (
                    <button
                      key={tint}
                      className={`px-3 py-2 rounded ${
                        selectedTint === tint 
                          ? 'text-white' 
                          : 'hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: selectedTint === tint ? '#1393c4' : '#f0f9ff',
                        color: selectedTint === tint ? 'white' : '#1393c4'
                      }}
                      onClick={() => setSelectedTint(tint)}
                    >
                      {tint}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{background: 'linear-gradient(135deg, #1393c4 0%, #0ea5e9 100%)'}}>3</div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#1393c4'}}>Select the Shade</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/step3.jpg.webp" 
                  alt="Shade Selection"
                  className="w-full rounded mb-4"
                />
                <div className="flex justify-center space-x-2 text-sm" style={{color: '#1393c4'}}>
                  <span>5%</span>
                  <span>20%</span>
                  <span>35%</span>
                  <span>50%</span>
                  <span>70%</span>
                  <span>NONE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="text-center">
            <div className="relative inline-block max-w-2xl mx-auto">
              <img 
                src="https://actioncardetailing.ca/wp-content/uploads/2021/05/step3.jpg.webp" 
                alt="XPEL PRIME Window Film Video"
                className="w-full rounded-lg shadow-2xl"
              />
              <a 
                href="https://youtu.be/RPLIOjXU_oQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center rounded-lg hover:opacity-75 transition-all duration-300"
                style={{backgroundColor: 'rgba(19, 147, 196, 0.5)'}}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#1393c4'}}>
                  <Play className="text-white ml-1" size={32} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Film Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{color: '#1393c4'}}>
            1. WHAT FILM?
          </h2>
          <p className="text-center max-w-4xl mx-auto mb-16 leading-relaxed" style={{color: '#1393c4'}}>
            Many shops offering window tint will quote you pricing based on their lowest grade film just to get you in the door. Once there, they educate you on films and upsell you after you realize the kind of film you desire and the number of windows you really need (eg Cal legal), thus you end up spending much more then you originally thought.
          </p>
          <p className="text-center max-w-4xl mx-auto mb-16 font-semibold" style={{color: '#1393c4'}}>
            We are straight forward with all of our Pricing and Options as we treat our clients as we like to be treated; no surprises! The Color Stable, Ceramic or Nano Ceramic choice simply comes down to budget as both films lines we carry are quality, lifetime warrantied products.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(filmTypes).map(([key, film]) => (
              <div key={key} className={`rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${selectedFilm === key ? 'ring-4' : ''}`} 
                   style={{
                     background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                     ringColor: selectedFilm === key ? '#1393c4' : 'transparent'
                   }}>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2" style={{color: '#1393c4'}}>{film.name}</h3>
                    <div className="mb-4">
                      <img 
                        src={film.logo} 
                        alt={`${film.name} Logo`}
                        className="h-16 mx-auto mb-2"
                      />
                    </div>
                    <p className="font-semibold" style={{color: '#1393c4'}}>{film.subtitle}</p>
                  </div>

                  <div className="mb-6">
                    <img 
                      src="https://actioncardetailing.ca/wp-content/uploads/2021/05/xpel.png.webp" 
                      alt="XPEL Logo"
                      className="w-24 mx-auto mb-4"
                    />
                    <img 
                      src={film.carImage} 
                      alt={`${film.name} Car`}
                      className="w-full rounded-lg"
                    />
                  </div>

                  <div className={`text-center text-4xl font-black mb-6`} style={{color: '#1393c4'}}>
                    {film.grade}
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{color: '#1393c4'}}>{film.description}</p>

                  <div className="space-y-3">
                    {film.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 flex-shrink-0" style={{color: '#1393c4'}} size={16} />
                        <span className="text-sm" style={{color: '#1393c4'}}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedFilm(key)}
                    className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedFilm === key 
                        ? 'text-white' 
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: selectedFilm === key ? '#1393c4' : '#f0f9ff',
                      color: selectedFilm === key ? 'white' : '#1393c4'
                    }}
                  >
                    Select Film
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Coverage Section */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'}}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8" style={{color: '#1393c4'}}>
            2. WHAT COVERAGE?
          </h2>
          <p className="text-center max-w-4xl mx-auto mb-16 leading-relaxed" style={{color: '#1393c4'}}>
            For maximum UV Protection, heat rejection, and comfort we recommend doing as much as the budget allows. A chain is only as strong as its weakest link and for highest levels of interior protection consider all glass. Many think that factory "privacy" glass is a protective tint but unfortunately it is shaded for looks only and does not help with UV or Heat.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8" style={{color: '#1393c4'}}>TWO FRONTS ONLY:</h3>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/side.png.webp" 
                  alt="Two Fronts Only"
                  className="w-full max-w-md mx-auto mb-6"
                />
                <button 
                  className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                  style={{backgroundColor: '#1393c4'}}
                >
                  Get A Quote
                </button>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8" style={{color: '#1393c4'}}>SIDES AND BACK:</h3>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/side_back.png.webp" 
                  alt="Sides and Back"
                  className="w-full max-w-md mx-auto mb-6"
                />
                <button 
                  className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                  style={{backgroundColor: '#1393c4'}}
                >
                  Get A Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Shade Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8" style={{color: '#1393c4'}}>
            3. Choose Your Shade
          </h2>
          <p className="text-center max-w-4xl mx-auto mb-16 leading-relaxed" style={{color: '#1393c4'}}>
            This is where your style and personal preference gets to take control. We can stay consistent all around or mix the shades up a bit. Tint shades are so subjective as everyone has different taste so we take the time to determine what is best for you. There are local laws that dictate what the state allows on front doors and windshield so please ask and we will be happy to educate you. CLICK on the box below to experience the interactive Xpel Simulator
          </p>

          <div className="text-center mb-12">
            <div className="p-8 rounded-xl shadow-xl inline-block" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)'}}>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#1393c4'}}>PRIME</h3>
              <h4 className="text-xl mb-6" style={{color: '#1393c4'}}>Window Tint Simulator</h4>
              <p className="mb-6" style={{color: '#1393c4'}}>Select a vehicle type and color. Then see how the different tint percentages, or as we call it Variable Light Transfers (VLT's), could look on the front, sides, and back of your vehicle.</p>
              <img 
                src="https://actioncardetailing.ca/wp-content/uploads/2021/05/image10.png.webp" 
                alt="Window Tint Simulator"
                className="w-full max-w-2xl mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Tinting Process */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'}}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{color: '#1393c4'}}>
            OUR TINTING PROCESS
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{background: 'linear-gradient(135deg, #1393c4 0%, #0ea5e9 100%)'}}>
                1
              </div>
              <h3 className="text-2xl font-bold mb-6" style={{color: '#1393c4'}}>WE PREP</h3>
              <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/prep.jpg.webp" 
                  alt="We Prep"
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="leading-relaxed" style={{color: '#1393c4'}}>
                Using Xpels DAP software and the best patterns available we computer cut all film for a precise fit. We then thermally shrink each panel onto the glass and shave all edges for a smooth install.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{background: 'linear-gradient(135deg, #1393c4 0%, #0ea5e9 100%)'}}>
                2
              </div>
              <h3 className="text-2xl font-bold mb-6" style={{color: '#1393c4'}}>WE PLOT</h3>
              <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/plot.jpg.webp" 
                  alt="We Plot"
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="leading-relaxed" style={{color: '#1393c4'}}>
                Using Xpels DAP software and the best patterns available we computer cut all film for a precise fit. We then thermally shrink each panel onto the glass and shave all edges for a smooth install.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{background: 'linear-gradient(135deg, #1393c4 0%, #0ea5e9 100%)'}}>
                3
              </div>
              <h3 className="text-2xl font-bold mb-6" style={{color: '#1393c4'}}>WE EXECUTE</h3>
              <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-lg">
                <img 
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/execute.jpg.webp" 
                  alt="We Execute"
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="leading-relaxed" style={{color: '#1393c4'}}>
                We don't take short cuts and aren't a "volume" shop that rushes the jobs in and out to remain profitable; Rather one that goes the extra mile to help you choose the right film, make the install as dust-free as possible, and return the vehicle cleaner than we received it. We want you to find value in how we treat both you and your vehicle, ultimately earning your repeat and referral business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-white" style={{background: 'linear-gradient(135deg, #1393c4 0%, #0ea5e9 100%)'}}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Experience the ultimate in UV protection, heat rejection, and style with our professional window tinting services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105" style={{color: '#1393c4'}}>
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105" style={{'&:hover': {color: '#1393c4'}}}>
              Call Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WindowTintingSite;