import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Car, Clock, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Footer from '../components/Footer';
import Booking from '../components/Booking';
import ContactForm from '../components/ContactForm';
import googlePng from '../assets/images/google png.png';
import autoDetailingVideo from '../assets/images/Auto Detailing final.mp4';

const BookingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    message: ''
  });

  const vehicleTypes = [
    { id: 'coupe', name: 'Coupe (2 doors) size car', icon: Car, selected: false },
    { id: 'sedan', name: 'Sedan (4 doors)', icon: Car, selected: false },
    { id: 'compact-suv', name: 'Compact Small SUV', icon: Car, selected: false },
    { id: 'large-suv', name: 'Large SUV/Van/Truck', icon: Car, selected: false }
  ];

  const washPackages = [
    {
      id: 'silver',
      name: 'Silver Package',
      duration: '5-6 Hours',
      price: 180,
      features: [
        'Interior Vacuum, Carpet and Seats Shampoo',
        'Interior panels Steam Clean & Polish',
        'Exterior Hand Wash',
        'Door jambs Wipe Down',
        'Windows Clean',
        'Trunk Vacuum',
        'Extra Charge for Pet Hairs Removal and Heavily soiled vehicles'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Package',
      duration: '6-7 Hours',
      price: 250,
      features: [
        'Silver package plus Engine Shampoo',
        'Headliner Shampoo',
        'Hand Carnauba Wax',
        'Trunk Shampoo',
        'Complete interior and exterior detailing package',
        'Extra Charge for Pet Hairs Removal and Heavily soiled vehicles'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond Package',
      duration: '7-8 Hours',
      price: 390,
      features: [
        'Gold package plus Paint Decontamination wash',
        'Paint Clay bar treatment',
        'Tar removal',
        'Paint correction polish (One stage)',
        'Extra Charge for Pet Hairs Removal',
        'excessive tar removal and Heavily soiled vehicles'
      ]
    }
  ];

  const addOnOptions = [
    { id: 'pet-removal', name: 'Pet hairs removal', price: 0, duration: '0min' },
    { id: 'headlight', name: 'Headlights Restoration (30 min)', price: 80, duration: '0min' },
    { id: 'odor', name: 'Odor Elimination and sanitization (180 min)', price: 80, duration: '0min' },
    { id: 'fabric', name: 'Fabric protector (carpet and seats) (40 min)', price: 80, duration: '0min' },
    { id: 'decontamination', name: 'Decontamination Wash (30 min)', price: 30, duration: '0min' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return selectedVehicle !== '';
      case 2: return selectedPackage !== null;
      case 3: return true; // Add-ons are optional
      case 4: return selectedDate !== '' && selectedTime !== '';
      case 5: return bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone && bookingData.vehicleMake;
      default: return false;
    }
  };

  const getTotalPrice = () => {
    const packagePrice = selectedPackage ? selectedPackage.price : 0;
    const addOnPrice = selectedAddOns.reduce((total, addon) => total + addon.price, 0);
    return packagePrice + addOnPrice;
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    handleNext();
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    handleNext();
  };

  const handleAddOnToggle = (addon) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(item => item.id === addon.id);
      if (exists) {
        return prev.filter(item => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleDateSelect = (day) => {
    if (day) {
      const selected = `${months[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`;
      setSelectedDate(selected);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      handleNext();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const formElement = document.createElement('form');
    formElement.action = 'https://formsubmit.co/actioncardetailing@gmail.com';
    formElement.method = 'POST';
    formElement.style.display = 'none';

    const bookingSummary = {
      'Vehicle Type': selectedVehicle.name,
      'Package': selectedPackage.name,
      'Add-ons': selectedAddOns.map(addon => addon.name).join(', ') || 'None',
      'Appointment Date': selectedDate,
      'Appointment Time': selectedTime,
      'Total Price': `${getTotalPrice()}.00 CAD`,
      'First Name': bookingData.firstName,
      'Last Name': bookingData.lastName,
      'Email': bookingData.email,
      'Phone': bookingData.phone,
      'Vehicle Make/Model': bookingData.vehicleMake,
      'Message': bookingData.message,
      '_subject': 'New Car Wash Booking Request',
      '_replyto': bookingData.email,
      '_captcha': 'false',
      '_next': window.location.origin
    };

    Object.keys(bookingSummary).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = bookingSummary[key];
      formElement.appendChild(input);
    });

    document.body.appendChild(formElement);

    alert('Booking submitted successfully! We will confirm your appointment within 24 hours. Redirecting to homepage...');

    formElement.submit();
    onClose();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedVehicle('');
    setSelectedPackage(null);
    setSelectedAddOns([]);
    setSelectedDate('');
    setSelectedTime('');
    setBookingData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      vehicleMake: '',
      message: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">VEHICLE TYPE</h2>
              <p className="text-white/80 text-sm sm:text-base">Select vehicle type below.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${selectedVehicle.id === vehicle.id
                    ? 'border-white bg-white/20 text-white'
                    : 'border-white/30 hover:border-white/70 text-white/80 hover:text-white'
                    }`}
                >
                  <div className="text-center">
                    <vehicle.icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 text-white" />
                    <h3 className="font-semibold text-sm sm:text-base">{vehicle.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">WASH PACKAGES</h2>
              <p className="text-white/80 text-sm sm:text-base">Which wash is best for your vehicle?</p>
            </div>
            <div className="grid grid-cols-1 gap-6 max-h-96 overflow-y-auto">
              {washPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-xl border-2 border-white/30 p-4 sm:p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1393c4] mb-2">{pkg.name} ({pkg.duration})</h3>
                    <div className="text-2xl sm:text-3xl font-bold text-[#1393c4] mb-2">
                      {pkg.price}<span className="text-lg">.00 CAD</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                    {pkg.features.map((feature, index) => (
                      <p key={index} className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {feature}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className="w-full bg-[#1393c4] hover:bg-[#1393c4]/90 text-white py-2 sm:py-3 px-4 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">ADD-ON OPTIONS</h2>
              <p className="text-white/80 text-sm sm:text-base">Add services to your package.</p>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {addOnOptions.map((addon) => (
                <div
                  key={addon.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white rounded-xl border-2 border-white/30 hover:border-white/70 transition-colors duration-300"
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <h3 className="font-semibold text-[#1393c4] text-sm sm:text-base mb-1">{addon.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {addon.duration}
                      </span>
                      <span className="font-semibold text-[#1393c4]">
                        {addon.price === 0 ? '0.00 CAD' : `${addon.price}.00 CAD`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddOnToggle(addon)}
                    className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-colors duration-300 text-xs sm:text-sm ${selectedAddOns.find(item => item.id === addon.id)
                      ? 'bg-[#1393c4] text-white'
                      : 'border-2 border-[#1393c4] text-[#1393c4] hover:bg-[#1393c4] hover:text-white'
                      }`}
                  >
                    {selectedAddOns.find(item => item.id === addon.id) ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-white text-[#1393c4] px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base hover:bg-white/90"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">SELECT DATE AND TIME</h2>
              <p className="text-white/80 text-sm sm:text-base">Choose your preferred date and time.</p>
            </div>

            <div className="bg-white/20 rounded-xl border-2 border-white/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-white">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="p-2 hover:bg-white/20 rounded-lg text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="p-2 hover:bg-white/20 rounded-lg text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-white py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 mb-6">
                {getDaysInMonth(currentMonth).map((day, index) => {
                  const isToday = day &&
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentMonth.getMonth() &&
                    new Date().getFullYear() === currentMonth.getFullYear();

                  const isSelected = selectedDate === `${months[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`;

                  return (
                    <button
                      key={index}
                      onClick={() => day && handleDateSelect(day)}
                      disabled={!day}
                      className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors duration-200 ${!day
                        ? 'cursor-default'
                        : isSelected
                          ? 'bg-white text-[#1393c4]'
                          : isToday
                            ? 'bg-white/20 text-white'
                            : 'hover:bg-white/10 text-white/80 hover:text-white'
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="border-t border-white/30 pt-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Available Times</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-colors duration-200 ${selectedTime === time
                          ? 'bg-white text-[#1393c4] border-white'
                          : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/70'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">BOOKING SUMMARY</h2>
              <p className="text-white/80 text-sm sm:text-base">Please provide us with your contact information.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white/20 rounded-xl p-3 sm:p-4 text-center border border-white/30">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2" />
                <div className="text-xs text-white/80 mb-1">Date</div>
                <div className="font-semibold text-xs sm:text-sm text-white">{selectedDate || '?'}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3 sm:p-4 text-center border border-white/30">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2" />
                <div className="text-xs text-white/80 mb-1">Time</div>
                <div className="font-semibold text-xs sm:text-sm text-white">{selectedTime || '?'}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3 sm:p-4 text-center border border-white/30">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2" />
                <div className="text-xs text-white/80 mb-1">Total</div>
                <div className="font-bold text-sm sm:text-lg text-white">{getTotalPrice()}.00 CAD</div>
              </div>
            </div>

            <div className="bg-white/20 rounded-xl border-2 border-white/30 p-4 max-h-80 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">First name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/60 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Last name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/60 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/60 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/60 text-sm"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-white mb-1">Vehicle Make and Model *</label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={bookingData.vehicleMake}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/60 text-sm"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-white mb-1">Message</label>
                  <textarea
                    name="message"
                    value={bookingData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none bg-white/10 text-white placeholder-white/60 text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-white/80 mb-3 leading-relaxed">
                  We will confirm your appointment within 24 hours.
                </p>
                <button
                  onClick={handleSubmit}
                  className="bg-white text-[#1393c4] px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300 hover:bg-white/90"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleClose}></div>

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1393c4]/20 bg-[#1393c4]/10">
            <h1 className="text-lg sm:text-xl font-bold text-[#1393c4]">A La Carte Package Form</h1>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[#1393c4]/20 rounded-full transition-colors duration-300"
            >
              <X className="w-5 h-5 text-[#1393c4]" />
            </button>
          </div>

          <div className="flex items-center justify-center py-4 px-4 bg-[#1393c4]/10 border-b border-[#1393c4]/20">
            <div className="flex items-center w-full max-w-lg">
              {[1, 2, 3, 4, 5].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex-1 flex items-center">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mx-auto ${step <= currentStep
                      ? 'bg-[#1393c4] text-white shadow-lg'
                      : 'bg-white text-[#1393c4] border-2 border-[#1393c4]/30'
                      }`}>
                      {step < currentStep ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : step}
                    </div>
                  </div>
                  {step < 5 && (
                    <div className="flex-1 flex items-center px-1 sm:px-2">
                      <div className={`w-full h-1 rounded-full ${step < currentStep ? 'bg-[#1393c4]' : 'bg-[#1393c4]/30'}`} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)] bg-[#1393c4]">
            {renderStep()}
          </div>

          <div className="flex justify-between p-4 sm:p-6 border-t border-[#1393c4]/20 bg-white">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-[#1393c4] text-[#1393c4] hover:bg-[#1393c4] hover:text-white shadow-md hover:shadow-lg'
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep < 5 && (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${!isStepValid()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#1393c4] text-white hover:bg-[#1393c4]/90 shadow-md hover:shadow-lg'
                  }`}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CarDetailingWebsite = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(Array(7).fill(false)); // Updated to 7 for Booking + ContactForm sections
  const videoRef = useRef(null);

  useEffect(() => {
    // Video handling with responsive sizing like Hero component
    const video = videoRef.current;

    if (video) {
      // Essential settings only
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');

      // Minimal preload for faster start
      video.preload = 'none';

      // Device-specific object-fit adjustments - 16:10 FOR MOBILE/TABLETS, FULL-SCREEN FOR DESKTOP
      const adjustVideoFit = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Mobile screens (below 768px) - Force 16:10 aspect ratio
        if (width < 768) {
          const idealHeight = width / (16 / 10); // Calculate 16:10 height

          video.style.objectFit = 'cover';
          video.style.width = '100vw';
          video.style.height = `${idealHeight}px`;
          video.style.objectPosition = 'center center';

          // Center the video container vertically in viewport
          video.style.top = '50%';
          video.style.left = '0';
          video.style.transform = 'translateY(-50%)';
          video.style.position = 'absolute';
        }
        // iPad Mini: 768x1024, iPad Air: 820x1180 - 16:10 cinematic
        else if (width >= 768 && width < 1024) {
          const idealHeight = width / (16 / 10);

          video.style.objectFit = 'cover';
          video.style.width = '100vw';
          video.style.height = `${idealHeight}px`;
          video.style.objectPosition = 'center center';
          video.style.top = '50%';
          video.style.left = '0';
          video.style.transform = 'translateY(-50%)';
          video.style.position = 'absolute';
        }
        // iPad Pro: 1024x1366 - 16:10 cinematic 
        else if (width >= 1024 && width < 1280) {
          const idealHeight = width / (16 / 10);

          video.style.objectFit = 'cover';
          video.style.width = '100vw';
          video.style.height = `${idealHeight}px`;
          video.style.objectPosition = 'center center';
          video.style.top = '50%';
          video.style.left = '0';
          video.style.transform = 'translateY(-50%)';
          video.style.position = 'absolute';
        }
        // Desktop and Laptop screens (1280px and above) - Full screen as original
        else {
          video.style.objectFit = 'cover';
          video.style.objectPosition = 'center center';
          video.style.height = '100vh';
          video.style.width = '100vw';
          video.style.top = '0';
          video.style.left = '0';
          video.style.transform = 'none';
          video.style.position = 'absolute';
        }
      };

      // Apply initial adjustments
      adjustVideoFit();

      // Reapply on orientation change
      window.addEventListener('resize', adjustVideoFit);
      window.addEventListener('orientationchange', adjustVideoFit);

      // Simple autoplay with minimal error handling
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          // Single fallback attempt
          document.addEventListener('click', () => video.play().catch(() => { }), { once: true });
        }
      };

      // Start playing immediately
      playVideo();

      // Cleanup
      return () => {
        window.removeEventListener('resize', adjustVideoFit);
        window.removeEventListener('orientationchange', adjustVideoFit);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative">
        {/* Video Container with responsive sizing */}
        <div className="relative w-full h-screen sm:h-auto sm:aspect-video lg:h-screen overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              objectPosition: 'center center'
            }}
          >
            <source src={autoDetailingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Hero Content - positioned below video with reduced spacing */}
        <div className={`animate-section transition-all duration-1000 ease-in-out ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: '#1393c4' }}>
                AUTO DETAILING
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with reduced spacing */}
      <section className={`animate-section py-8 sm:py-12 bg-white transition-all duration-1000 ease-in-out ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-base text-sky-400 leading-relaxed">
                Action car detailing is made up of a team of experts who can handle any size vehicles in any condition. We are dedicated to getting the job done right, there is no better place in Winnipeg to get your car detailed. Quality products, quality work and quality service is our promise.
              </p>

              <p className="text-base text-sky-400 leading-relaxed">
                We are passionate about cars that's why we take our time with each vehicle. Our chemical and allergy-free interior cleaning methods will leave your car's interior spotless and scentless- the way it should be.
              </p>

              <div className="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-600">
                <p className="text-base text-sky-400 font-medium">
                  Action car Detailing offers a very thorough, deep cleaning of interior and exterior. We specialize in Auto Detailing, Ceramic Coating, Window Tinting, Paint Protection Film (PPF), and Paintless Dent Removal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-sky-50 rounded-lg">
                <div className="text-2xl font-bold text-sky-400 mb-1">14+</div>
                <div className="text-sky-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-sky-50 rounded-lg">
                <div className="text-2xl font-bold text-sky-400 mb-1">A+</div>
                <div className="text-sky-400 text-sm">BBB Rating</div>
              </div>
              <div className="text-center p-4 bg-sky-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-sky-400 mx-auto mb-1" />
                <div className="text-sky-400 text-sm">MPI Accredited</div>
              </div>
              <div className="text-center p-4 bg-sky-50 rounded-lg">
                <Star className="w-6 h-6 text-sky-400 mx-auto mb-1" />
                <div className="text-sky-400 text-sm">Premium Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-400 mb-4">
              OUR EXCLUSIVE 5-STEP SYSTEM
            </h2>
            <p className="text-sky-400 text-base max-w-3xl mx-auto">
              Our proven process ensures your vehicle receives the most thorough cleaning possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-sky-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white text-sky-600 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  1
                </div>
                <h3 className="text-xl font-bold">Step 1:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Our Forced Air Extractor thoroughly cleans between and under seats, inside the dash seams and venting ducts, and all other hard-to-reach areas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-sky-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white text-sky-600 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  2
                </div>
                <h3 className="text-xl font-bold">Step 2:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Turbo brush vacuuming removes deeply embedded sand, dirt and pet hair..
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-sky-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white text-sky-600 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  3
                </div>
                <h3 className="text-xl font-bold">Step 3:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Dual action brushing and biodegradable shampoo loosens and emulsifies dirt, oils, and stubborn stains.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-sky-600 text-white p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white text-sky-600 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  4
                </div>
                <h3 className="text-xl font-bold">Step 4:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Our exclusive Italian Dry Steam System™ lifts and removes any remaining residue, leaving your carpets and upholstery bright, soft, and dry.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-sky-600 text-white p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-2">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white text-sky-600 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  5
                </div>
                <h3 className="text-xl font-bold">Step 5:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Final turbo brush vacuuming removes any remaining residue, leaving your interior perfectly clean and fresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`animate-section py-12 sm:py-16 bg-sky-50 transition-all duration-1000 ease-in-out ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-400 mb-4">
              Our Services
            </h2>
            <p className="text-sky-400 text-base max-w-3xl mx-auto">
              Comprehensive detailing services to keep your vehicle in pristine condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Interior Detailing",
                description: "Deep cleaning of seats, carpets, dashboard, and all interior surfaces",
                features: ["Steam cleaning", "Stain removal", "Odor elimination", "Leather conditioning"]
              },
              {
                title: "Exterior Detailing",
                description: "Complete exterior wash, polish, and protection services",
                features: ["Paint correction", "Ceramic coating", "Wax application", "Chrome polishing"]
              },
              {
                title: "Full Service Package",
                description: "Complete interior and exterior detailing for the ultimate clean",
                features: ["Interior deep clean", "Exterior polish", "Paint protection", "Quality guarantee"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-sky-600">
                <h3 className="text-xl font-bold text-sky-400 mb-3">{service.title}</h3>
                <p className="text-sky-400 mb-4 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sky-400 text-sm">
                      <CheckCircle className="w-4 h-4 text-sky-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={openBookingModal}
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Now
            </button>
            <p className="text-sky-500 mt-3 text-sm">
              Customize your own detailing package with our interactive booking form
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-400 mb-4">
              Read some of our Reviews
            </h2>

            <div className="inline-flex items-center justify-center bg-white border-2 border-sky-500 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sky-100 rounded-full flex items-center justify-center">
                <img
                  src={googlePng}
                  alt="Google Reviews"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                review: "Absolutely amazing service! My car looks brand new. The attention to detail is incredible and the team is very professional."
              },
              {
                name: "Mike Chen",
                rating: 5,
                review: "Been using Action Car Detailing for 3 years now. Consistently excellent results every time. Highly recommend!"
              },
              {
                name: "Lisa Rodriguez",
                rating: 5,
                review: "The 5-step system really works. My interior was completely transformed. Worth every penny!"
              }
            ].map((review, index) => (
              <div key={index} className="bg-sky-50 p-6 rounded-xl border-l-4 border-sky-600">
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-sky-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sky-400 mb-3 italic text-sm">"{review.review}"</p>
                <p className="font-semibold text-sky-400 text-sm">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section - Added above ContactForm */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Booking />
      </section>

      {/* ContactForm Section - Added below Booking section */}
      <section className={`animate-section py-12 sm:py-16 bg-sky-50 transition-all duration-1000 ease-in-out ${isVisible[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="[&>*]:before:hidden [&>*]:after:hidden">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  );
};

export default CarDetailingWebsite;