import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ChatBot from './components/ChatBot'
import Service from './components/Service'
import CustomerReview from './components/CustomerReview'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import GiftCard from './components/GiftCard'
import Aboutus from './components/Aboutus'
import References from './components/References'  // Keep the old References component
import Testimonials from './components/Testimonials'  // Import the new Testimonials component
import CarDetailingWebsite from './components/CarDetailingWebsite'  // Import the new Auto Detailing component
import PaintCorrection from './components/PaintCorrection'  // Import the new Paint Correction component
import WindowTintingSite from './components/WindowTintingSite'  // Import the new Window Tinting component
import CeramicCoatings from './components/CeramicCoatings'  // Import the new Ceramic Coatings component
import RemediationClaim from './components/RemediationClaim'  // Import the new Remediation Claim component
import PaintProtectionFilm from './components/PaintProtectionFilm'  // Import the new Paint Protection Film component
import DentRepairComponent from './components/DentRepairComponent'  // Import the new Dent Repair component
import BeforeAfterVideo from './components/BeforeAfterVideo'  // Import the new Before After Video component
import Booking from './components/Booking'  // Import the new Booking component
import PaintPolishingForm from './components/PaintPolishingForm'  // Import the new Paint Polishing Form component

function App() {
  const [currentView, setCurrentView] = useState('home');
  
  const renderView = () => {
    switch(currentView) {
      case 'about':
        return <Aboutus />;
      case 'references':
        return <References />;
      case 'testimonials':  // Add the new testimonials case
        return <Testimonials />;
      case 'giftcard':
        return <GiftCard />;
      case 'auto-detailing':  // Add the new auto detailing case
        return <CarDetailingWebsite setCurrentView={setCurrentView} />;
      case 'paint-correction':  // Add the new paint correction case
        return <PaintCorrection />;
      case 'window-tinting':  // Add the new window tinting case
        return <WindowTintingSite />;
      case 'ceramic-coatings':  // Add the new ceramic coatings case
        return <CeramicCoatings />;
      case 'remediation-claim':  // Add the new remediation claim case
        return <RemediationClaim />;
      case 'paint-protection-film':  // Add the new paint protection film case
        return <PaintProtectionFilm />;
      case 'dent-repair':  // Add the new dent repair case
        return <DentRepairComponent />;
      case 'before-after':  // Add the new before after video case
        return <BeforeAfterVideo />;
      case 'booking':  // Add the new booking case
        return <Booking />;
      case 'paint-polishing':  // Add the new paint polishing form case
        return <PaintPolishingForm />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Service setCurrentView={setCurrentView} />
            <CustomerReview />
            <ContactForm />
            <Footer />
          </>
        );
    }
  };
  
  return (
    <div className="relative">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      {renderView()}
      <ChatBot />
    </div>
  )
}

export default App