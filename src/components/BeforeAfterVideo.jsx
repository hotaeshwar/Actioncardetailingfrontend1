import React from 'react';
import beforeAfterVideo from '../assets/images/Before AND After.mp4';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const BeforeAfterVideo = () => {
  return (
    <div className="min-h-screen bg-snow">
      <div className="w-full min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl aspect-video rounded-none sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-none sm:shadow-lg md:shadow-xl lg:shadow-2xl">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="metadata"
            webkit-playsinline="true"
          >
            <source src={beforeAfterVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
        {/* Contact Form Section */}
      <ContactForm />
      <Footer />
    </div>
  );
};

export default BeforeAfterVideo;