import React, { useState } from 'react';
import { Car, Clock, Plus, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Check, User, Mail, Phone, MessageSquare } from 'lucide-react';

const Booking = () => {
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
    
    // Add days of the current month only
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
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (day) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate < today;
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
    if (day && !isPastDate(day)) {
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
      '_captcha': 'false'
    };

    Object.keys(bookingSummary).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = bookingSummary[key];
      formElement.appendChild(input);
    });

    document.body.appendChild(formElement);
    formElement.submit();

    alert('Booking submitted successfully! We will confirm your appointment within 24 hours.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-400 mb-2 md:mb-4">VEHICLE TYPE</h2>
              <p className="text-sky-300 text-xs sm:text-sm md:text-base lg:text-lg">Select vehicle type below.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    selectedVehicle.id === vehicle.id
                      ? 'border-blue-400 bg-blue-400 text-white'
                      : 'border-blue-200 hover:border-blue-300 bg-blue-50'
                  }`}
                >
                  <div className="text-center">
                    <vehicle.icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 ${
                      selectedVehicle.id === vehicle.id ? 'text-white' : 'text-blue-400'
                    }`} />
                    <h3 className={`font-semibold text-xs sm:text-sm md:text-base lg:text-lg ${
                      selectedVehicle.id === vehicle.id ? 'text-white' : 'text-sky-400'
                    }`}>{vehicle.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-400 mb-2 md:mb-4">WASH PACKAGES</h2>
              <p className="text-sky-300 text-xs sm:text-sm md:text-base lg:text-lg">Which wash is best for your vehicle?</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {washPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-sky-400 mb-2">{pkg.name} ({pkg.duration})</h3>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-300 mb-2">
                      {pkg.price}<span className="text-lg sm:text-xl md:text-2xl">.00 CAD</span>
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {pkg.features.map((feature, index) => (
                      <p key={index} className="text-xs sm:text-sm md:text-base text-sky-300 leading-relaxed">
                        {feature}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base"
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
          <div className="space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-400 mb-2 md:mb-4">ADD-ON OPTIONS</h2>
              <p className="text-sky-300 text-xs sm:text-sm md:text-base lg:text-lg">Add services to your package.</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {addOnOptions.map((addon) => (
                <div
                  key={addon.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 md:p-6 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-colors duration-300"
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <h3 className="font-semibold text-sky-400 text-sm sm:text-base md:text-lg mb-1">{addon.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-sky-300">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {addon.duration}
                      </span>
                      <span className="font-semibold text-sky-400">
                        {addon.price === 0 ? '0.00 CAD' : `${addon.price}.00 CAD`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddOnToggle(addon)}
                    className={`px-3 sm:px-4 md:px-6 py-2 rounded-full font-semibold transition-colors duration-300 text-xs sm:text-sm md:text-base ${
                      selectedAddOns.find(item => item.id === addon.id)
                        ? 'bg-blue-400 text-white'
                        : 'bg-blue-200 text-sky-400 hover:bg-blue-300'
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
                className="bg-blue-400 hover:bg-blue-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-400 mb-2 md:mb-4">SELECT DATE AND TIME</h2>
              <p className="text-sky-300 text-xs sm:text-sm md:text-base lg:text-lg">Click on any date and time to make a booking.</p>
            </div>
            
            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  className="p-2 hover:bg-blue-200 rounded-lg text-sky-400 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-sky-400">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  className="p-2 hover:bg-blue-200 rounded-lg text-sky-400 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-sky-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 mb-6">
                {getDaysInMonth(currentMonth).map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    disabled={!day || isPastDate(day)}
                    className={`
                      aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200
                      ${!day ? 'invisible' : ''}
                      ${isPastDate(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-200 cursor-pointer'}
                      ${isToday(day) ? 'bg-blue-500 text-white font-bold' : ''}
                      ${selectedDate.includes(`${day}`) && selectedDate.includes(months[currentMonth.getMonth()]) ? 'bg-blue-300 text-white font-bold' : day && !isPastDate(day) ? 'text-sky-600 hover:text-sky-800' : ''}
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Selected Date Display */}
              {selectedDate && (
                <div className="text-center mb-4">
                  <p className="text-sky-600 font-semibold">Selected Date: {selectedDate}</p>
                </div>
              )}

              {/* Time Slots */}
              <div>
                <h3 className="text-lg font-bold text-sky-400 mb-4 text-center">Available Times</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      disabled={!selectedDate}
                      className={`py-2 px-3 text-sm border rounded-lg transition-all duration-200 ${
                        !selectedDate 
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                          : selectedTime === time
                          ? 'bg-blue-500 text-white border-blue-500 font-bold'
                          : 'border-blue-300 text-sky-600 hover:bg-blue-100 hover:border-blue-400 cursor-pointer'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              {selectedDate && selectedTime && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
                  >
                    Continue to Booking Summary
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-400 mb-2 md:mb-4">BOOKING SUMMARY</h2>
              <p className="text-sky-300 text-xs sm:text-sm md:text-base lg:text-lg">Please provide us with your contact information.</p>
            </div>

            {/* Booking Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 md:p-6 text-center border border-blue-200">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 sm:mb-3" />
                <div className="text-xs sm:text-sm text-sky-300 mb-1">Your Appointment Date</div>
                <div className="font-semibold text-sm sm:text-base text-sky-400">{selectedDate || '?'}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 md:p-6 text-center border border-blue-200">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 sm:mb-3" />
                <div className="text-xs sm:text-sm text-sky-300 mb-1">Your Appointment Time</div>
                <div className="font-semibold text-sm sm:text-base text-sky-400">{selectedTime || '?'}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 md:p-6 text-center border border-blue-200">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 sm:mb-3" />
                <div className="text-xs sm:text-sm text-sky-300 mb-1">Total Price</div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl text-sky-400">{getTotalPrice()}.00 CAD</div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-sky-400 mb-2">First name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sky-400 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-sky-400 mb-2">Last name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sky-400 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-sky-400 mb-2">Your E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sky-400 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-sky-400 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sky-400 text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-sky-400 mb-2">Vehicle Make and Model *</label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={bookingData.vehicleMake}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sky-400 text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-sky-400 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={bookingData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none bg-white text-sky-400 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <p className="text-xs sm:text-sm text-sky-300 mb-4 md:mb-6 leading-relaxed">
                  We will confirm your appointment with you by phone or e-mail within 24 hours of your request. Vehicle pickup will be the next day for services scheduled later in the afternoon.
                </p>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-colors duration-300"
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

  return (
    <div className="min-h-screen bg-blue-50 py-4 sm:py-6 md:py-8 lg:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-12 px-4">
          <div className="flex items-center w-full max-w-2xl">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div className="flex-1 flex items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base lg:text-lg mx-auto ${
                    step <= currentStep 
                      ? 'bg-blue-400 text-white shadow-lg' 
                      : 'bg-white text-blue-300 border-2 border-blue-200'
                  }`}>
                    {step < currentStep ? <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : step}
                  </div>
                </div>
                {step < 5 && (
                  <div className="flex-1 flex items-center px-2 sm:px-3 md:px-4">
                    <div className={`w-full h-1 sm:h-1.5 md:h-2 rounded-full ${step < currentStep ? 'bg-blue-400' : 'bg-blue-200'}`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 border border-blue-100">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {currentStep > 1 && currentStep < 5 && (
          <div className="flex justify-between mt-4 sm:mt-6 md:mt-8">
            <button
              onClick={handlePrev}
              className="flex items-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-sky-400 hover:text-sky-600 transition-colors duration-300"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm md:text-base">Previous</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;