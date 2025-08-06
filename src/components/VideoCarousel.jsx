import React, { useState, useEffect, useRef } from 'react';

const VideoCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [videosReady, setVideosReady] = useState(false);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);

  // Video sources - replace with your actual video paths
  const videos = [
    '/src/assets/images/carasoul1.MP4',
    '/src/assets/images/carasoul2.MP4',
    '/src/assets/images/carasoul3.MP4',
    '/src/assets/images/carasoul4.MP4',
    '/src/assets/images/carasoul5.MP4',
    '/src/assets/images/carasoul6.MP4'
  ];

  // Test autoplay capability on component mount
  useEffect(() => {
    const testAutoplay = async () => {
      try {
        // Create a test video element to check autoplay support
        const testVideo = document.createElement('video');
        testVideo.muted = true;
        testVideo.playsInline = true;
        testVideo.volume = 0;
        
        // Try to play an empty video
        testVideo.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWF2YzEAAAAIZnJlZQAACKtmZGF0AAAAAFmdHJla2AAAKHZ0cmFrAAAAXGJlZHNhAAAARGRkZHNhAAAAKGFkdHNhAAAAgGZnZXBhAAAAUgAAAAAAAAABAAAAAQAAAA==';
        
        await testVideo.play();
        testVideo.remove();
        setAutoplayEnabled(true);
        console.log('Autoplay is supported');
      } catch (error) {
        console.log('Autoplay is blocked by browser, will use click-to-play fallback');
        setAutoplayEnabled(false);
      }
    };

    testAutoplay();
  }, []);

  // Start carousel auto-advance
  useEffect(() => {
    if (autoplayEnabled && videosReady) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 6000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videos.length, autoplayEnabled, videosReady]);

  // Handle video playback
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    
    if (currentVideo) {
      // Pause all other videos
      videoRefs.current.forEach((video, index) => {
        if (video && index !== currentIndex) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Play current video
      if (currentVideo.readyState >= 3) {
        playCurrentVideo();
      }
    }
  }, [currentIndex, autoplayEnabled]);

  const playCurrentVideo = async () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo) return;

    try {
      currentVideo.currentTime = 0;
      await currentVideo.play();
      console.log(`Video ${currentIndex} playing`);
    } catch (error) {
      console.log(`Video ${currentIndex} autoplay failed:`, error.name);
      // Don't show error to user, just silently fail
    }
  };

  // Enable autoplay on any user interaction
  const enableAutoplay = async () => {
    if (!autoplayEnabled) {
      setAutoplayEnabled(true);
      await playCurrentVideo();
      
      // Start the interval
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 6000);
      }
    }
  };

  const goToSlide = async (index) => {
    await enableAutoplay();
    setCurrentIndex(index);
  };

  const goToPrevious = async () => {
    await enableAutoplay();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = async () => {
    await enableAutoplay();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleVideoCanPlay = (index) => {
    console.log(`Video ${index} can play`);
    if (index === videos.length - 1) {
      setVideosReady(true);
    }
    
    // If this is the current video and autoplay is enabled, try to play it
    if (index === currentIndex && autoplayEnabled) {
      playCurrentVideo();
    }
  };

  const handleVideoError = (index, error) => {
    console.error(`Video ${index} error:`, error);
  };

  // Handle page visibility change to restart videos when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && autoplayEnabled) {
        setTimeout(() => {
          playCurrentVideo();
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentIndex, autoplayEnabled]);

  return (
    <div 
      className="w-full bg-gray-50 py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8"
      onClick={enableAutoplay}
    >
      {/* Main container */}
      <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto relative">
        {/* Single Card container */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white shadow-xl shadow-gray-300/50 hover:shadow-2xl hover:shadow-gray-400/30 transition-shadow duration-300">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {videos.map((video, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
              >
                {/* Video Card */}
                <div className="w-full h-72 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[36rem] bg-black overflow-hidden flex items-center justify-center relative">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onCanPlay={() => handleVideoCanPlay(index)}
                    onError={(e) => handleVideoError(index, e.target.error)}
                    onLoadedMetadata={() => console.log(`Video ${index} metadata loaded`)}
                    style={{ 
                      // Ensure videos are optimized for autoplay
                      pointerEvents: 'none'
                    }}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10">
                    {/* Show play button only if autoplay is not enabled and this is the current video */}
                    {!autoplayEnabled && index === currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            enableAutoplay();
                          }}
                          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                        >
                          <div className="w-0 h-0 border-l-[16px] sm:border-l-[18px] md:border-l-[24px] lg:border-l-[28px] border-l-gray-800 border-t-[10px] sm:border-t-[12px] md:border-t-[15px] lg:border-t-[17px] border-t-transparent border-b-[10px] sm:border-b-[12px] md:border-b-[15px] lg:border-b-[17px] border-b-transparent ml-1"></div>
                        </button>
                      </div>
                    )}

                    {/* Autoplay indicator */}
                    {autoplayEnabled && index === currentIndex && (
                      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-3 sm:left-4 md:left-5 lg:left-6 bg-green-500/80 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded text-xs sm:text-sm font-medium backdrop-blur-sm">
                        Auto Playing
                      </div>
                    )}
                  </div>

                  {/* Card number badge */}
                  <div className="absolute top-3 sm:top-4 md:top-5 lg:top-6 right-3 sm:right-4 md:right-5 lg:right-6 bg-black/80 text-white px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-bold backdrop-blur-md">
                    {index + 1} / {videos.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute -left-5 sm:-left-6 md:-left-8 lg:-left-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/95 hover:bg-white rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center group"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute -right-5 sm:-right-6 md:-right-8 lg:-right-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/95 hover:bg-white rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center group"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Subtle autoplay hint for first-time visitors */}
        {!autoplayEnabled && (
          <div className="absolute top-4 sm:top-5 md:top-6 lg:top-8 left-4 sm:left-5 md:left-6 lg:left-8 bg-blue-500/90 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-medium animate-pulse backdrop-blur-sm">
            Tap anywhere to start
          </div>
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 sm:w-10 md:w-12 lg:w-14 h-2.5 sm:h-3 md:h-3.5 lg:h-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                : 'w-2.5 sm:w-3 md:w-3.5 lg:w-4 h-2.5 sm:h-3 md:h-3.5 lg:h-4 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCardCarousel;