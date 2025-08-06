import React from 'react';
import Footer from '../components/Footer';

const Testimonials = () => {
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 transition-all duration-300 ${
          index < rating ? 'text-[#1393c4]' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Hero Background Effect */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 -left-8 w-16 h-16 sm:w-24 sm:h-24 lg:w-36 lg:h-36 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white/10 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl relative z-20">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="space-y-4 sm:space-y-6">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 tracking-wider uppercase drop-shadow-2xl">
              TESTIMONIALS
            </h1>
            
            {/* Subheading */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white/90 tracking-wide drop-shadow-lg">
              Where Every Detail Counts
            </h2>
            
            {/* Decorative Line */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-white/60"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
              <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-white/60"></div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-gray-200 hover:border-[#1393c4] transform hover:-translate-y-1 relative overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              
              {/* Quote Icon */}
              <div className="flex justify-center mb-3">
                <div className="w-8 h-8 bg-[#1393c4] rounded-full flex items-center justify-center shadow-md">
                  <svg 
                    className="w-4 h-4 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 text-center italic font-medium">
                "{testimonial.review}"
              </p>

              {/* Rating Stars */}
              <div className="flex justify-center mb-3">
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Customer Name */}
              <div className="text-center">
                <h3 className="font-bold text-[#1393c4] text-sm mb-1">
                  {testimonial.name}
                </h3>
                <div className="inline-block">
                  <p className="text-[#1393c4] text-xs font-semibold bg-[#1393c4]/10 px-2 py-1 rounded-full border border-[#1393c4]/20">
                    ✓ Verified Customer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Testimonials;