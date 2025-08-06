import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  const testimonials = [
    {
      id: 1,
      name: "Charles Morgan",
      review: "Great personal service! Phenomenal job! Exceeded all expectations! I would highly recommend Action Car Detailing!",
      rating: 5
    },
    {
      id: 2,
      name: "Nav Boparai",
      review: "Awesome service. Quality service. Experienced staff. Meet my expectations 👌",
      rating: 5
    },
    {
      id: 3,
      name: "Thiané Diop",
      review: "Very accommodating to my time restrictions and did a spotless job. The car looks fantastic inside and out!",
      rating: 5
    },
    {
      id: 4,
      name: "Michael Singson",
      review: "Great work. Everything was done as promised. Very accommodating and great customer relationship. Kudos to Bal and his staff! :)",
      rating: 5
    },
    {
      id: 5,
      name: "Dana Coulson",
      review: "Went above and beyond my expectations. Did an amazing job and very reasonably priced!! Great customer service as well, would highly recommend bringing your vehicle here!",
      rating: 5
    },
    {
      id: 6,
      name: "Chee Tan",
      review: "Highly recommended for anyone. Staff is extremely polite and courteous. Takes pride and their work and prices are reasonable. Can't go wrong with a clean and detailed car... and fast service too!",
      rating: 5
    },
    {
      id: 7,
      name: "Adam Kennedy",
      review: "My car is absolutely spotless and well worth the cost. The owner/employee is very pleasant. Would highly recommend this business especially in comparison to other establishments, definitely going back!",
      rating: 5
    },
    {
      id: 8,
      name: "Sarah Johnson",
      review: "Exceptional service and prices are very affordable as compared to others. Had my carpets and Engine shampooed in past as well but with Action Car detailing it looks like brand new. Owner and employees are very kind and friendly. Highly recommend this place.",
      rating: 5
    }
  ];

  // Update cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      // Always show only 1 card at a time
      setCardsToShow(1);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev >= testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-3 h-3 transition-all duration-300 ${
          index < rating ? 'text-yellow-400' : 'text-white/40'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white pt-20 sm:pt-24 md:pt-28 pb-8">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        
        {/* Testimonials Carousel */}
        <div className="relative mb-8 max-w-sm mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-14 sm:-left-18 md:-left-22 top-1/2 -translate-y-1/2 z-10 bg-[#1393c4] text-white p-3 rounded-full shadow-lg hover:bg-[#0f7ca8] transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-14 sm:-right-18 md:-right-22 top-1/2 -translate-y-1/2 z-10 bg-[#1393c4] text-white p-3 rounded-full shadow-lg hover:bg-[#0f7ca8] transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="flex-shrink-0 w-full flex justify-center"
                >
                  <div className="bg-[#1393c4] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-[#1393c4] hover:border-[#0f7ca8] transform hover:-translate-y-1 w-full max-w-xs mx-2">
                    
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <svg 
                          className="w-4 h-4 text-[#1393c4]" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-white text-base leading-relaxed mb-5 text-center italic font-medium min-h-[120px] flex items-center justify-center px-2">
                      "{testimonial.review}"
                    </p>

                    {/* Rating Stars */}
                    <div className="flex justify-center mb-4">
                      <div className="flex space-x-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>

                    {/* Customer Name */}
                    <div className="text-center">
                      <h3 className="font-bold text-white text-lg mb-3">
                        {testimonial.name}
                      </h3>
                      <div className="inline-block">
                        <p className="text-white text-sm font-semibold bg-white/25 px-4 py-2 rounded-full border border-white/40">
                          ✓ Verified Customer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-[#1393c4]' : 'bg-[#1393c4]/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Header Section - Moved below cards with medium text */}
        <div className="text-center pb-8 sm:pb-12">
          <div className="space-y-2">
            {/* Main Heading */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1393c4] tracking-wide uppercase">
              TESTIMONIALS
            </h1>
            
            {/* Subheading */}
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#1393c4]/80 tracking-wide">
              Where Every Detail Counts
            </h2>
            
            {/* Decorative Line */}
            <div className="flex justify-center items-center space-x-3 mt-3">
              <div className="w-6 sm:w-8 md:w-12 h-0.5 bg-[#1393c4]/60"></div>
              <div className="w-1.5 h-1.5 bg-[#1393c4] rounded-full"></div>
              <div className="w-6 sm:w-8 md:w-12 h-0.5 bg-[#1393c4]/60"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Testimonials;