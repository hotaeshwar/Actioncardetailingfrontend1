import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Droplets, Flame, Shield, Bug, Car, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import insuranceLogo from '../assets/images/insurance.png';
import heroBackground from '../assets/images/car6.jpg';

const RemediationClaim = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mpiClaimNo: '',
    mpiServiceCentre: '',
    vehicleMakeModel: '',
    preferredAppointment: '',
    message: 'tell us if your vehicle is driveable, if any other damage you have noticed'
  });

  const timeSlots = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', 
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the current month only - this prevents invalid dates
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (day) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate < today;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const handleDateSelect = (day) => {
    if (day && !isPastDate(day)) {
      const selected = `${months[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;
      setSelectedDate(selected);
      if (selectedTime) {
        setFormData(prev => ({
          ...prev,
          preferredAppointment: `${selected} at ${selectedTime}`
        }));
        setShowDatePicker(false);
      }
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        preferredAppointment: `${selectedDate} at ${time}`
      }));
      setShowDatePicker(false);
    }
  };

  const services = [
    { 
      name: 'Rodent Remediation', 
      icon: Bug, 
      description: 'Professional removal and cleanup of rodent infestations',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Mold Remediation', 
      icon: AlertTriangle, 
      description: 'Safe mold removal and prevention solutions',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Gas/Oil Spill Cleanup', 
      icon: Droplets, 
      description: 'Hazardous material cleanup and decontamination',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Water Damage Restoration', 
      icon: Droplets, 
      description: 'Complete water damage assessment and restoration',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Fire/Smoke Damage', 
      icon: Flame, 
      description: 'Fire and smoke damage cleanup and restoration',
      color: 'text-[#1393c4]'
    },
    { 
      name: 'Biohazard/Trauma Cleanup', 
      icon: Shield, 
      description: 'Specialized biohazard and trauma scene cleanup',
      color: 'text-[#1393c4]'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create form data for FormSubmit.co
    const formElement = document.createElement('form');
    formElement.action = 'https://formsubmit.co/actioncardetailing@gmail.com';
    formElement.method = 'POST';
    formElement.style.display = 'none';
    
    // Add form fields
    const fields = {
      'Name': formData.name,
      'Email': formData.email,
      'Phone': formData.phone,
      'MPI Claim No': formData.mpiClaimNo,
      'MPI Service Centre': formData.mpiServiceCentre,
      'Vehicle Make/Model': formData.vehicleMakeModel,
      'Preferred Appointment': formData.preferredAppointment,
      'Message': formData.message,
      '_subject': 'New MPI Remediation Claim Enquiry',
      '_replyto': formData.email,
      '_captcha': 'false'
    };
    
    Object.keys(fields).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      formElement.appendChild(input);
    });
    
    // Submit form
    document.body.appendChild(formElement);
    formElement.submit();
    
    // Show success message and reset form
    alert("Form submitted successfully!");
    setIsFormOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      mpiClaimNo: '',
      mpiServiceCentre: '',
      vehicleMakeModel: '',
      preferredAppointment: '',
      message: 'tell us if your vehicle is driveable, if any other damage you have noticed'
    });
    // Reset date picker states
    setSelectedDate('');
    setSelectedTime('');
    setShowDatePicker(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Animations CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up-1 {
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }
        
        .animate-fade-in-up-2 {
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }
        
        .animate-fade-in-up-3 {
          animation: fadeInUp 0.6s ease-out 0.5s both;
        }
        
        .animate-fade-in-up-4 {
          animation: fadeInUp 0.6s ease-out 0.7s both;
        }
        
        .animate-fade-in-up-5 {
          animation: fadeInUp 0.6s ease-out 0.9s both;
        }
        
        .animate-fade-in-up-6 {
          animation: fadeInUp 0.6s ease-out 1.1s both;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >

        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Insurance Logo matching image 2 design */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#1393c4] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <img 
                src={insuranceLogo} 
                alt="Insurance Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg">
            MANITOBA PUBLIC INSURANCE
          </h1>
          <div className="h-1 sm:h-2 w-20 sm:w-24 md:w-32 bg-[#1393c4] mx-auto rounded-full shadow-lg mb-6 sm:mb-8"></div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#1393c4] hover:bg-[#0f7ba3] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Open Enquiry Form
          </button>
        </div>
      </section>

      {/* Services Section */}
      <div className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1393c4] mb-4">
              Our Services
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#1393c4] mx-auto mb-4 sm:mb-6"></div>
            <p className="text-lg sm:text-xl text-[#1393c4] max-w-3xl mx-auto px-4">
              Professional remediation services backed by MPI accreditation and ICAR training
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const animationClass = `animate-fade-in-up-${index + 1}`;
              return (
                <div 
                  key={index}
                  className={`group bg-gradient-to-br from-blue-50 to-[#1393c4]/10 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-[#1393c4]/10 hover:to-[#1393c4]/20 hover:-translate-y-2 border border-[#1393c4]/20 cursor-pointer ${animationClass}`}
                  onClick={() => setIsFormOpen(true)}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#1393c4] mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-[#0f7ba3] shadow-lg`}>
                    <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#1393c4] group-hover:text-[#0f7ba3] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Enquiry Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1393c4]">Enquiry Form</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">MPI Claim no:</label>
                  <input
                    type="text"
                    name="mpiClaimNo"
                    value={formData.mpiClaimNo}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">MPI Service Centre:</label>
                  <input
                    type="text"
                    name="mpiServiceCentre"
                    value={formData.mpiServiceCentre}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Vehicle Make/Model</label>
                  <input
                    type="text"
                    name="vehicleMakeModel"
                    value={formData.vehicleMakeModel}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Preferred Appointment date/time</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="preferredAppointment"
                      value={formData.preferredAppointment}
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      readOnly
                      placeholder="Click to select date and time"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent text-sm sm:text-base cursor-pointer"
                    />
                    
                    {showDatePicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 w-full sm:w-96">
                        {/* Calendar Header */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <button onClick={handlePrevYear} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-700">{currentDate.getFullYear()}</span>
                            </div>
                            <button onClick={handleNextYear} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-gray-700">
                              {months[currentDate.getMonth()]}
                            </span>
                            <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex">
                          {/* Calendar */}
                          <div className="p-4 flex-1">
                            {/* Days of week header */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {daysOfWeek.map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                  {day}
                                </div>
                              ))}
                            </div>
                            
                            {/* Calendar days */}
                            <div className="grid grid-cols-7 gap-1">
                              {getDaysInMonth(currentDate).map((day, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleDateSelect(day)}
                                  disabled={!day || isPastDate(day)}
                                  className={`
                                    w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors
                                    ${!day ? 'invisible' : ''}
                                    ${isPastDate(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#1393c4]/20 hover:text-[#1393c4]'}
                                    ${isToday(day) ? 'bg-[#1393c4] text-white font-bold' : 'text-gray-700'}
                                    ${selectedDate.includes(`${day}`) && selectedDate.includes(months[currentDate.getMonth()]) ? 'bg-[#1393c4]/80 text-white font-bold' : ''}
                                  `}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time slots */}
                          <div className="border-l border-gray-200 w-24">
                            <div className="p-2 border-b border-gray-200">
                              <div className="text-xs font-medium text-gray-500 text-center">Time</div>
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                              {timeSlots.map(time => (
                                <button
                                  key={time}
                                  onClick={() => handleTimeSelect(time)}
                                  className={`w-full px-2 py-1 text-xs text-left hover:bg-[#1393c4]/20 hover:text-[#1393c4] border-b border-gray-100 transition-colors ${
                                    selectedTime === time ? 'bg-[#1393c4]/20 text-[#1393c4] font-medium' : ''
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1393c4] font-semibold mb-2 text-sm sm:text-base">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:border-transparent resize-none text-sm sm:text-base"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#1393c4] hover:bg-[#0f7ba3] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemediationClaim;
