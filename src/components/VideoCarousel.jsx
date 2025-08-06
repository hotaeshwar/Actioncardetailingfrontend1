import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const VideoCardCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [videoErrors, setVideoErrors] = useState({});
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);

  // Updated video paths that work in both development and production
  const videos = [
    {
      // Try multiple possible paths for each video
      src: [
        '/assets/images/carasoul1.MP4',    // Production path
        '/src/assets/images/carasoul1.MP4', // Development path
        './assets/images/carasoul1.MP4',   // Relative path
        'assets/images/carasoul1.MP4'      // Alternative relative path
      ],
      title: "Premium Detailing",
      description: "Complete exterior detailing"
    },
    {
      src: [
        '/assets/images/carasoul2.MP4',
        '/src/assets/images/carasoul2.MP4',
        './assets/images/carasoul2.MP4',
        'assets/images/carasoul2.MP4'
      ],
      title: "Complete Exterior and Interior Detailing",
      description: "Professional Detailing services"
    },
    {
      src: [
        '/assets/images/carasoul3.MP4',
        '/src/assets/images/carasoul3.MP4',
        './assets/images/carasoul3.MP4',
        'assets/images/carasoul3.MP4'
      ],
      title: "Interior Detailing",
      description: "Deep cleaning and protection"
    },
  ];

  // Function to find working video source
  const findWorkingVideoSource = useCallback(async (srcArray) => {
    for (const src of srcArray) {
      try {
        const response = await fetch(src, { method: 'HEAD' });
        if (response.ok) {
          return src;
        }
      } catch (error) {
        // Continue to next source
        continue;
      }
    }
    return null;
  }, []);

  // Initialize working video sources
  const [workingVideoSources, setWorkingVideoSources] = useState({});

  useEffect(() => {
    const initializeVideoSources = async () => {
      const sources = {};
      for (let i = 0; i < videos.length; i++) {
        const workingSrc = await findWorkingVideoSource(videos[i].src);
        if (workingSrc) {
          sources[i] = workingSrc;
        }
      }
      setWorkingVideoSources(sources);
    };

    initializeVideoSources();
  }, [findWorkingVideoSource, videos]);

  // Memoize callback functions to prevent unnecessary re-renders
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

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileDevice(isMobile || window.innerWidth < 768);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = isMobileDevice ? 10000 : 8000;

    if (isPlaying && Object.keys(workingVideoSources).length > 0) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, nextSlide, isMobileDevice, workingVideoSources]);

  // Handle video playback
  const handlePlayPause = useCallback(() => {
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo && workingVideoSources[currentSlide]) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play().catch(error => {
          console.log("Play failed:", error);
          setVideoErrors(prev => ({...prev, [currentSlide]: true}));
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [currentSlide, isPlaying, workingVideoSources]);

  // Enhanced video loading and playback with better error handling
  useEffect(() => {
    const playCurrentVideo = async () => {
      if (!workingVideoSources[currentSlide]) {
        setIsVideoLoaded(false);
        return;
      }

      try {
        // Pause all other videos
        videoRefs.current.forEach((video, index) => {
          if (video && index !== currentSlide) {
            video.pause();
            video.currentTime = 0;
          }
        });

        const currentVideo = videoRefs.current[currentSlide];
        if (currentVideo && isPlaying) {
          // Reset error state
          setVideoErrors(prev => ({...prev, [currentSlide]: false}));
          
          if (isMobileDevice) {
            currentVideo.load();
            await new Promise(resolve => {
              const onLoadedData = () => {
                currentVideo.removeEventListener('loadeddata', onLoadedData);
                resolve();
              };
              currentVideo.addEventListener('loadeddata', onLoadedData);
              setTimeout(resolve, 3000); // Fallback timeout
            });
          }

          try {
            await currentVideo.play();
            setIsVideoLoaded(true);
          } catch (playError) {
            console.log("Video play failed:", playError);
            setIsVideoLoaded(false);
            setVideoErrors(prev => ({...prev, [currentSlide]: true}));
          }
        }
      } catch (error) {
        console.log("Video management error:", error);
        setIsVideoLoaded(false);
        setVideoErrors(prev => ({...prev, [currentSlide]: true}));
      }
    };

    playCurrentVideo();
  }, [currentSlide, isMobileDevice, isPlaying, workingVideoSources]);

  // If no working video sources found, show message
  if (Object.keys(workingVideoSources).length === 0) {
    return (
      <div className="py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative max-w-6xl mx-auto rounded-3xl shadow-3xl shadow-black/50 overflow-hidden border-4 border-white/20">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg mb-2">Loading videos...</p>
                <p className="text-sm text-white/70">Please ensure video files are properly uploaded to your server</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Video Carousel */}
        <div className="relative max-w-6xl mx-auto rounded-3xl shadow-3xl shadow-black/50 overflow-hidden border-4 border-white/20">
          <div className="relative aspect-video bg-black">
            {videos.map((video, index) => {
              const workingSrc = workingVideoSources[index];
              const hasError = videoErrors[index];
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  {workingSrc && !hasError ? (
                    <>
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={workingSrc}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload={index === 0 ? "auto" : isMobileDevice ? "none" : "metadata"}
                        onLoadedData={() => {
                          if (index === currentSlide) {
                            setIsVideoLoaded(true);
                            setVideoErrors(prev => ({...prev, [index]: false}));
                          }
                        }}
                        onError={(e) => {
                          console.log(`Video ${index} error:`, e);
                          setIsVideoLoaded(false);
                          setVideoErrors(prev => ({...prev, [index]: true}));
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                    </>
                  ) : (
                    // Fallback content when video is not available
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                        <p className="text-white/80">{video.description}</p>
                        <p className="text-sm text-white/60 mt-2">Video temporarily unavailable</p>
                      </div>
                    </div>
                  )}

                  {/* Loading indicator */}
                  {workingSrc && !hasError && !isVideoLoaded && index === currentSlide && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-white/70 text-sm">Loading video...</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group"
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-cyan-400 transition-colors duration-300" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-cyan-400 transition-colors duration-300 ml-0.5" />
            )}
          </button>

          {/* Video indicators */}
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
        </div>
      </div>
    </div>
  );
};

export default VideoCardCarousel;
