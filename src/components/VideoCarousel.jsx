import React, { useState, useEffect, useRef } from 'react';

const VideoCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // Video sources - replace with your actual video paths
  const videos = [
    '/src/assets/images/carasoul1.MP4',
    '/src/assets/images/carasoul2.MP4',
    '/src/assets/images/carasoul3.MP4',
    '/src/assets/images/carasoul4.MP4',
    '/src/assets/images/carasoul5.MP4',
    '/src/assets/images/carasoul6.MP4'
  ];

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [videos.length]);

  // Auto-play current video
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Main container */}
      <div className="relative">
        {/* Card stack container */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] perspective-1000">
          {videos.map((video, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            const isPrev = offset === -1 || (currentIndex === 0 && index === videos.length - 1);
            const isNext = offset === 1 || (currentIndex === videos.length - 1 && index === 0);
            
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 sm:duration-700 ease-in-out transform-gpu ${
                  isActive
                    ? 'z-30 translate-x-0 translate-y-0 scale-100 opacity-100 rotate-0'
                    : isPrev
                    ? 'z-20 -translate-x-4 sm:-translate-x-6 md:-translate-x-8 translate-y-2 sm:translate-y-3 md:translate-y-4 scale-95 sm:scale-95 md:scale-95 opacity-60 -rotate-1 sm:-rotate-2 md:-rotate-3'
                    : isNext
                    ? 'z-20 translate-x-4 sm:translate-x-6 md:translate-x-8 translate-y-2 sm:translate-y-3 md:translate-y-4 scale-95 sm:scale-95 md:scale-95 opacity-60 rotate-1 sm:rotate-2 md:rotate-3'
                    : 'z-10 translate-y-4 sm:translate-y-6 md:translate-y-8 scale-90 sm:scale-90 md:scale-90 opacity-0'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Video Card */}
                <div className="w-full h-full bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden border border-gray-100">
                  {/* Card Header */}
                  <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600">
                        Video {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Video Content */}
                  <div className="relative flex-1 h-full bg-black">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video overlay with play button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20">
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                            <div className="w-0 h-0 border-l-[12px] sm:border-l-[16px] md:border-l-[20px] border-l-gray-800 border-t-[8px] sm:border-t-[10px] md:border-t-[12px] border-t-transparent border-b-[8px] sm:border-b-[10px] md:border-b-[12px] border-b-transparent ml-0.5 sm:ml-0.5 md:ml-1"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card number badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-black/70 text-white px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full text-xs sm:text-sm font-bold backdrop-blur-md">
                      {index + 1} / {videos.length}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center group"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center group"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2 md:gap-3 mt-4 sm:mt-6 md:mt-8">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-6 h-2 sm:w-8 sm:h-2.5 md:w-12 md:h-3 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                : 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>


    </div>
  );
};

export default VideoCardCarousel;