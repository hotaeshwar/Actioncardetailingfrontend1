import React from 'react';

const BusinessDescription = ({ setCurrentView }) => {
  const handleAboutClick = () => {
    if (setCurrentView) {
      setCurrentView('about');
    }
  };

  return (
    <div className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-8 lg:p-12">
          {/* Main content container */}
          <div className="text-center lg:text-left">
            {/* Business description text */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-cyan-500 block">
                <span className="font-semibold">Locally owned and operated since 2011</span>, 
                specialized in <span className="font-medium">deep interior cleaning</span>, 
                <span className="font-medium"> paint correction</span>, 
                <span className="font-medium"> Ceramic coating</span>, and 
                <span className="font-medium"> Window tinting</span>. 
                We are <span className="font-semibold">MPI accredited auto detailing shop</span>. 
                We are proud to be member of <span className="font-semibold">CFIB and BBB with A+ rating</span>. 
                Our reputation is backed up by several accolades that prove our years of commitment to consumer care. 
                Our most recent has come in the form of a 
                <span className="font-bold"> 2025 Consumer Choice Award</span>. 
                We're proud to be the <span className="font-semibold">only winner in our industry</span>. 
                We have team of <span className="font-medium">factory trained professionals</span> to work on your vehicle. 
                We are certified <span className="font-semibold">XPEL certified dealer and installation center</span>.
              </span>
            </div>

            {/* Call-to-action button */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={handleAboutClick}
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4
                  text-sm md:text-base lg:text-lg font-semibold
                  text-white bg-blue-600 hover:bg-blue-700
                  rounded-lg shadow-md hover:shadow-lg
                  transform hover:scale-105 transition-all duration-300
                  focus:outline-none focus:ring-4 focus:ring-blue-300
                  active:scale-95
                  w-full sm:w-auto max-w-xs sm:max-w-none
                "
              >
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDescription;