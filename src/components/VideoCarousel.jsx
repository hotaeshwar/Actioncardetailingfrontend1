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
    <div className="w-full bg-gray-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      {/* Main container */}
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        {/* Single Card container with individual card transitions */}
        <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`w-full transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 translate-x-0 relative z-10' 
                  : index < currentIndex
                  ? 'opacity-0 -translate-x-full absolute top-0 left-0 z-0'
                  : 'opacity-0 translate-x-full absolute top-0 left-0 z-0'
              }`}
            >
              {/* Small Video Card - Dynamic sizing */}
              <div className="w-full min-h-48 max-h-96 bg-black overflow-hidden flex items-center justify-center">
                {/* Video Content */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="w-full h-auto max-w-full"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedMetadata={(e) => {
                      const video = e.target;
                      const container = video.closest('.w-full.min-h-48');
                      if (container && video.videoWidth && video.videoHeight) {
                        const aspectRatio = video.videoHeight / video.videoWidth;
                        const containerWidth = container.offsetWidth;
                        const calculatedHeight = containerWidth * aspectRatio;
                        
                        // Set height between min and max bounds
                        const minHeight = 192; // min-h-48
                        const maxHeight = 384; // max-h-96
                        const finalHeight = Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
                        
                        container.style.height = `${finalHeight}px`;
                      }
                    }}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video overlay with play button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20">
                    {index !== currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                          <div className="w-0 h-0 border-l-[14px] sm:border-l-[16px] md:border-l-[20px] border-l-gray-800 border-t-[8px] sm:border-t-[10px] md:border-t-[12px] border-t-transparent border-b-[8px] sm:border-b-[10px] md:border-b-[12px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card number badge */}
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                    {index + 1} / {videos.length}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows - positioned for small card */}
        <button
          onClick={goToPrevious}
          className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center group"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center group"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Compact dot indicators */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2.5 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCardCarousel;