import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Shield, Star, Award, Clock, Zap, X } from 'lucide-react';
import Footer from '../components/Footer';
import PaintPolishingForm from '../components/PaintPolishingForm';
import PPFVideo from '../assets/images/PPF (1).mp4';

const PaintProtectionFilm = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentText, setCurrentText] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const runningTexts = [
    "ROAD DEBRIS",
    "HIGHWAY SCRATCHES", 
    "ROCK CHIPS",
    "WEATHER DAMAGE"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % runningTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleGetQuote = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const packages = [
    {
      name: "BUMPER ONLY",
      price: "$599",
      serviceTime: "1 Day",
      features: [
        "Essential shield for maintaining the pristine condition of the most impact-prone portion of your vehicle",
        "Provides robust protection against impacts, scratches, and road debris",
        "Specifically designed for non-chrome bumpers",
        "Expertly installed, computer cut kits that wrap all leading edges",
        "10-year warranty against peeling, cracking, and yellowing"
      ]
    },
    {
      name: "ECONOMY KIT", 
      price: "$999",
      serviceTime: "1.5 Day",
      features: [
        "Full bumper",
        "Mirror caps",
        "24\" hood / fender tips",
        "Expertly installed, computer cut kits that wrap all leading edges",
        "10-year warranty against peeling, cracking, and yellowing"
      ]
    },
    {
      name: "FULL FRONT",
      price: "$1499", 
      serviceTime: "1.5 Day",
      features: [
        "Everything in the partial front",
        "Full hood / fender",
        "Pillars & Partial Roof",
        "Mirror and doors handles insert"
      ]
    },
    {
      name: "OFFSET TIRE PACKAGE",
      price: "$1999",
      serviceTime: "2 Days", 
      features: [
        "Everything in full front",
        "Rockers",
        "Lower doors"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Preserve Your Car's Resale Value",
      description: "Paint Protection Film will lock-in and enhance your paint's gloss and shine to keep your car looking new at all times."
    },
    {
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Enhance Long Term Aesthetics", 
      description: "Scratches from years of driving and washing won't be an issue, scratches fade away once heat is applied."
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Reduce Maintenance Costs",
      description: "Action car Detailing installs the world's number one paint protection film. This advanced PPF comes backed with a 10-year warranty."
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Guard Against Rock Chips And Scratches",
      description: "Paint Protection Film is the highest level of paint protection and is the #1 recommended solution."
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Peace Of Mind With Warranty",
      description: "Paint Protection Film comes with a fully transferable warranty to ensure the next owners peace of mind."
    }
  ];

  const faqData = [
    {
      question: "Preserve Car's Resale Value",
      answer: [
        "PPF prevents scratches and chips, maintaining your car's pristine condition.",
        "Potential buyers are willing to pay more for a well-preserved vehicle.",
        "Resale value can increase significantly, offsetting the cost of PPF.",
        "You avoid the depreciation associated with paint damage",
        "PPF adds to the appeal of your vehicle when you decide to sell or trade it."
      ]
    },
    {
      question: "Enhance Long-Term Aesthetics", 
      answer: [
        "PPF is nearly invisible, so it doesn't alter your car's original appearance.",
        "It shields your car's paint from UV rays, preventing fading and oxidation.",
        "Environmental factors like bird droppings and tree sap won't harm your paint.",
        "Your car will maintain a showroom shine for years to come.",
        "PPF ensures that your vehicle always looks brand new."
      ]
    },
    {
      question: "Reduce Maintenance Costs",
      answer: [
        "PPF eliminates the need for frequent waxing and polishing.",
        "Paint touch-ups and repairs become less necessary.",
        "You save money on detailing and cosmetic maintenance",
        "PPF simplifies the upkeep of your vehicle's exterior.",
        "Over time, the cost savings from reduced maintenance add up."
      ]
    },
    {
      question: "Guard Against Road Hazards",
      answer: [
        "PPF acts as a shield against rocks, gravel, and debris on the road.",
        "It prevents unsightly dings, dents, and paint chips.",
        "Insect impacts and road tar won't damage your paint.",
        "Your car's front end remains free from damage caused by road hazards.",
        "PPF provides proactive protection for high-impact areas."
      ]
    },
    {
      question: "Peace Of Mind With Warranty",
      answer: [
        "Our PPF installations come with 10-Year warranty for added security.",
        "You're covered in case of damage or defects in the film.",
        "Our warranty offer long-term protection.",
        "It provides peace of mind, knowing your investment is safeguarded.",
        "You can enjoy your new car without worrying about potential paint damage and repair costs."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Mobile-Responsive Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - Mobile Responsive */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <source src={PPFVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Text Content Below Video - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#1393c4] via-[#1393c4] to-[#94c5db] bg-clip-text text-transparent leading-tight">
            PAINT PROTECTION FILM
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4" style={{ color: '#1393c4' }}>Say Goodbye To...</p>
          <div className="h-8 sm:h-12 md:h-16 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold animate-pulse" style={{ color: '#1393c4' }}>
              {runningTexts[currentText]}
            </h2>
          </div>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-[#1393c4] to-[#94c5db] mx-auto rounded-full"></div>
        </div>
      </section>

      {/* PPF Specialist Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <p className="max-w-4xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: '#1393c4' }}>
              Below you will find our Paint Protection Film options, these packages are custom tailored to your vehicle needs. Our PPF installation comes with a 10 Year Manufacturer Warranty, self healing properties and installed by trained and experienced technicians.
            </p>
          </div>

          {/* Video Section - Mobile Responsive */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8" style={{ color: '#1393c4' }}>
              WATCH VIDEO
            </h3>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#1393c4' }}>
              <div className="aspect-video">
                <iframe 
                  src="https://www.youtube.com/embed/hI4lW8uNRqY" 
                  title="XPEL ULTIMATE PLUS Paint Protection Film"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PPF Section - Mobile Grid Responsive */}
      <section className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#f0f9ff' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16" style={{ color: '#1393c4' }}>
            WHY PAINT PROTECTION FILM?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-4 sm:p-6 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300 shadow-xl text-white" style={{ background: 'linear-gradient(to bottom, #1393c4, #0f7a9c)' }}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ color: '#1393c4' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-blue-100">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peace of Mind Section - Mobile Layout */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8" style={{ color: '#1393c4' }}>
              Enjoy Peace of Mind and Protect Your Investment
            </h2>
            <p className="max-w-4xl mx-auto text-base sm:text-lg leading-relaxed mb-6 sm:mb-8" style={{ color: '#1393c4' }}>
              PPF or "Clear Bra" is designed to minimize damage from rock chips, scratches, and road debris. 
              We use templates that have been modified to custom wrap edges where applicable for an invisible install and because of our 
              meticulous installation process we stand behind our workmanship and your satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div className="order-2 lg:order-1">
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Car Protection Image</span>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#1393c4' }}>INCREASE AND RETAIN RESELL VALUE</h3>
                <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#1393c4' }}>
                  Enhance the long-term value of your vehicle with our premium protection solutions. Our cutting-edge products not only shield your car from the elements but also ensure that it's resell value remains at its peak, making it a smart investment for years to come.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#1393c4' }}>HIGHEST LEVEL OF PROTECTION</h3>
                <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#1393c4' }}>
                  Experience unmatched defense. Our advanced solutions provide the utmost protection against chips, scratches, and the elements.
                </p>
              </div>
            </div>
          </div>

          {/* XPEL Section - Mobile Responsive */}
          <div className="rounded-2xl p-6 sm:p-8 md:p-12 text-white" style={{ background: 'linear-gradient(to right, #1393c4, #0f7a9c)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              <div>
                <div className="mb-6 sm:mb-8">
                  <div className="h-12 sm:h-16 mb-3 sm:mb-4 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg sm:text-xl">XPEL</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Why XPEL?</h3>
                  <p className="text-blue-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Not all Paint Protection Film is created equally. XPEL ULTIMATE PLUS is the industry leader for a reason. A trusted non-yellowing paint protection film that can self-heal minor scratches and swirls in the top coat.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/20 rounded-lg p-4 flex items-center justify-center h-24 sm:h-32">
                    <span className="text-white font-semibold text-sm sm:text-base">XPEL ULTIMATE PLUS</span>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 flex items-center justify-center h-24 sm:h-32">
                    <span className="text-white font-semibold text-sm sm:text-base">Tesla Protection</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-200 mb-2 sm:mb-3">Self-Healing Topcoat</h4>
                  <p className="text-blue-100 text-sm sm:text-base">Constructed from a polyurethane, ULTIMATE PLUS will self-heal light scratches & swirls</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-200 mb-2 sm:mb-3">Non-Yellowing</h4>
                  <p className="text-blue-100 text-sm sm:text-base">Proprietary film will not yellow from UV exposure, staying nearly invisible</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-200 mb-2 sm:mb-3">Stain Resistant</h4>
                  <p className="text-blue-100 text-sm sm:text-base">ULTIMATE PLUS is stain resistant & will maintain clarity against contaminants</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-200 mb-2 sm:mb-3">Prevents Wear & Tear</h4>
                  <p className="text-blue-100 text-sm sm:text-base">Stop rock chips, nicks & scratches in the paint, and keep your vehicle looking new</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-200 mb-2 sm:mb-3">Edge Seal Technology</h4>
                  <p className="text-blue-100 text-sm sm:text-base">Lifting & delamination are a thing of the past as our Edge Seal Technology ensures film stays stuck & keeps surfaces protected</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-200 mb-2 sm:mb-3">Warranty and Durability</h4>
                  <p className="text-blue-100 text-sm sm:text-base">Superior Impact Protection and Industry Leading 10 Year Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Section - Mobile Responsive */}
      <section className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#f0f9ff' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8" style={{ color: '#1393c4' }}>
            FINANCING AVAILABLE
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: '#1393c4' }}>Click below to learn more</p>
          <div className="h-12 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto max-w-xs">
            <span className="text-gray-600 font-semibold">Financeit Logo</span>
          </div>
        </div>
      </section>

      {/* Packages Section - Mobile Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16" style={{ color: '#1393c4' }}>
            SELECT YOUR COVERAGE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="rounded-2xl p-4 sm:p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-2xl text-white" style={{ background: 'linear-gradient(to bottom, #1393c4, #0f7a9c)' }}>
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-full h-24 sm:h-32 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-white font-semibold text-xs sm:text-sm">Car Part</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-200 mb-2">{pkg.name}</h3>
                  <div className="text-xl sm:text-2xl font-bold mb-2">Starting at {pkg.price}</div>
                  <div className="text-blue-100 text-sm">Service Time {pkg.serviceTime}</div>
                </div>
                
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <h4 className="text-blue-200 font-semibold text-sm">WHAT IS INCLUDED:</h4>
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-200 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-blue-100 text-xs sm:text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={handleGetQuote}
                  className="w-full bg-white py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 text-sm sm:text-base"
                  style={{ color: '#1393c4' }}
                >
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Road Doesn't Have to Win - Mobile Layout */}
      <section className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#f0f9ff' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-2xl shadow-2xl flex items-center justify-center">
                <span className="text-gray-500">Stressed Driver Image</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#1393c4' }}>
                THE ROAD DOESN'T HAVE TO WIN...
              </h2>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: '#1393c4' }}>
                <p>We get it. The thought of rock chips, scratches, weathering, oxidation, UV rays, stains, and fading create STRESS and ANXIETY.</p>
                <p>Fact- There is 100% chance that doing nothing will ensure inevitable damage!</p>
                <p className="text-lg sm:text-xl font-semibold">We Provide The Peace of mind you and your vehicle deserve</p>
              </div>
              <button 
                onClick={handleGetQuote}
                className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:opacity-90"
                style={{ background: 'linear-gradient(to right, #1393c4, #0f7a9c)' }}
              >
                Get A Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Trust Section - Mobile Text */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: '#1393c4' }}>
            When you pay for a product with extensive warranties, you want to use a solid company for the service. The world's top paint 
            protection films offer up to 10 years of warranty. You need a company with a long history of successful projects and just as 
            importantly, future longevity. Yes, films are guaranteed based on the quality of the film itself. However, it's the shop that 
            guarantees the work done. You want a company like us because you know we will be here, doing what we do and standing by our 
            products. Our meticulous attention to detail here at <span className="font-bold">ACTION CAR DETAILING</span> is sure to keep your mind at ease. You can rest 
            assured knowing your vehicle will receive an expert application of a superior PPF product.
          </p>
          <button 
            onClick={handleGetQuote}
            className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:opacity-90"
            style={{ background: 'linear-gradient(to right, #1393c4, #0f7a9c)' }}
          >
            Get A Free Quote
          </button>
        </div>
      </section>

      {/* FAQ Section - Mobile Responsive */}
      <section className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#f0f9ff' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4" style={{ color: '#1393c4' }}>
              DISCOVER THE HIGHEST LEVEL OF PAINT PROTECTION FILM IN WINNIPEG
            </h2>
            <h3 className="text-lg sm:text-2xl font-bold mb-6 sm:mb-8" style={{ color: '#1393c4' }}>
              WHY DO I NEED PAINT PROTECTION FILM?
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-xl" style={{ background: 'linear-gradient(to right, #1393c4, #0f7a9c)' }}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 sm:p-6 text-left flex justify-between items-center hover:bg-black/10 transition-colors duration-300 text-white"
                >
                  <h4 className="text-base sm:text-xl font-semibold pr-4">{faq.question}</h4>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-white/20 backdrop-blur-sm">
                    <div className="space-y-2 sm:space-y-3">
                      {faq.answer.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-200 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-blue-100 text-xs sm:text-sm">{point}</p>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={handleGetQuote}
                      className="mt-4 sm:mt-6 bg-white px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-blue-50 text-sm sm:text-base"
                      style={{ color: '#1393c4' }}
                    >
                      GET MY QUOTE
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Paint Polishing Form - Mobile Responsive */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white p-2 rounded-full hover:opacity-80 transition-colors duration-200"
              style={{ backgroundColor: '#1393c4' }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <PaintPolishingForm />
          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default PaintProtectionFilm;