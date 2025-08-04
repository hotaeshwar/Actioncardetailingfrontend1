import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Car, Clock, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1393c4' }}>VEHICLE TYPE</h2>
              <p className="text-sm sm:text-base" style={{ color: '#1393c4' }}>Select vehicle type below.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    selectedVehicle.id === vehicle.id
                      ? 'text-white'
                      : 'hover:border-opacity-70'
                  }`}
                  style={{
                    borderColor: '#1393c4',
                    backgroundColor: selectedVehicle.id === vehicle.id ? '#1393c4' : '#f0f9ff'
                  }}
                >
                  <div className="text-center">
                    <vehicle.icon className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 ${
                      selectedVehicle.id === vehicle.id ? 'text-white' : ''
                    }`} style={{ color: selectedVehicle.id === vehicle.id ? 'white' : '#1393c4' }} />
                    <h3 className={`font-semibold text-sm sm:text-base ${
                      selectedVehicle.id === vehicle.id ? 'text-white' : ''
                    }`} style={{ color: selectedVehicle.id === vehicle.id ? 'white' : '#1393c4' }}>{vehicle.name}</h3>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1393c4' }}>WASH PACKAGES</h2>
              <p className="text-sm sm:text-base" style={{ color: '#1393c4' }}>Which wash is best for your vehicle?</p>
            </div>
            <div className="grid grid-cols-1 gap-6 max-h-96 overflow-y-auto">
              {washPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-xl border-2 p-4 sm:p-6 hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}
                >
                  <div className="text-center mb-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#1393c4' }}>{pkg.name} ({pkg.duration})</h3>
                    <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#1393c4' }}>
                      {pkg.price}<span className="text-lg">.00 CAD</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                    {pkg.features.map((feature, index) => (
                      <p key={index} className="text-xs sm:text-sm leading-relaxed" style={{ color: '#1393c4' }}>
                        {feature}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className="w-full text-white py-2 sm:py-3 px-4 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base hover:opacity-90"
                    style={{ backgroundColor: '#1393c4' }}
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1393c4' }}>ADD-ON OPTIONS</h2>
              <p className="text-sm sm:text-base" style={{ color: '#1393c4' }}>Add services to your package.</p>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {addOnOptions.map((addon) => (
                <div
                  key={addon.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border-2 hover:border-opacity-70 transition-colors duration-300"
                  style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <h3 className="font-semibold text-sm sm:text-base mb-1" style={{ color: '#1393c4' }}>{addon.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm" style={{ color: '#1393c4' }}>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {addon.duration}
                      </span>
                      <span className="font-semibold" style={{ color: '#1393c4' }}>
                        {addon.price === 0 ? '0.00 CAD' : `${addon.price}.00 CAD`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddOnToggle(addon)}
                    className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-colors duration-300 text-xs sm:text-sm ${
                      selectedAddOns.find(item => item.id === addon.id)
                        ? 'text-white'
                        : 'text-white hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: selectedAddOns.find(item => item.id === addon.id) ? '#1393c4' : '#94c5db'
                    }}
                  >
                    {selectedAddOns.find(item => item.id === addon.id) ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={handleNext}
                className="text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base hover:opacity-90"
                style={{ backgroundColor: '#1393c4' }}
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1393c4' }}>SELECT DATE AND TIME</h2>
              <p className="text-sm sm:text-base" style={{ color: '#1393c4' }}>Choose your preferred date and time.</p>
            </div>
            
            <div className="rounded-xl border-2 p-4" style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold" style={{ color: '#1393c4' }}>
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="p-2 hover:bg-blue-200 rounded-lg"
                    style={{ color: '#1393c4' }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="p-2 hover:bg-blue-200 rounded-lg"
                    style={{ color: '#1393c4' }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-sm font-medium py-2" style={{ color: '#1393c4' }}>
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
                      className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        !day 
                          ? 'cursor-default' 
                          : isSelected
                            ? 'text-white'
                            : isToday
                              ? 'text-white'
                              : 'hover:bg-blue-100'
                      }`}
                      style={{
                        backgroundColor: !day 
                          ? 'transparent'
                          : isSelected
                            ? '#1393c4'
                            : isToday
                              ? '#94c5db'
                              : 'transparent',
                        color: !day 
                          ? 'transparent'
                          : isSelected || isToday
                            ? 'white'
                            : '#1393c4'
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="border-t pt-4" style={{ borderColor: '#1393c4' }}>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#1393c4' }}>Available Times</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-colors duration-200 ${
                          selectedTime === time
                            ? 'text-white'
                            : 'bg-white hover:bg-blue-100'
                        }`}
                        style={{
                          backgroundColor: selectedTime === time ? '#1393c4' : 'white',
                          borderColor: '#1393c4',
                          color: selectedTime === time ? 'white' : '#1393c4'
                        }}
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1393c4' }}>BOOKING SUMMARY</h2>
              <p className="text-sm sm:text-base" style={{ color: '#1393c4' }}>Please provide us with your contact information.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl p-3 sm:p-4 text-center border" style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" style={{ color: '#1393c4' }} />
                <div className="text-xs mb-1" style={{ color: '#1393c4' }}>Date</div>
                <div className="font-semibold text-xs sm:text-sm" style={{ color: '#1393c4' }}>{selectedDate || '?'}</div>
              </div>
              <div className="rounded-xl p-3 sm:p-4 text-center border" style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" style={{ color: '#1393c4' }} />
                <div className="text-xs mb-1" style={{ color: '#1393c4' }}>Time</div>
                <div className="font-semibold text-xs sm:text-sm" style={{ color: '#1393c4' }}>{selectedTime || '?'}</div>
              </div>
              <div className="rounded-xl p-3 sm:p-4 text-center border" style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}>
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" style={{ color: '#1393c4' }} />
                <div className="text-xs mb-1" style={{ color: '#1393c4' }}>Total</div>
                <div className="font-bold text-sm sm:text-lg" style={{ color: '#1393c4' }}>{getTotalPrice()}.00 CAD</div>
              </div>
            </div>

            <div className="rounded-xl border-2 p-4 max-h-80 overflow-y-auto" style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1393c4' }}>First name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-sm"
                    style={{ borderColor: '#1393c4', color: '#1393c4' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1393c4' }}>Last name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-sm"
                    style={{ borderColor: '#1393c4', color: '#1393c4' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1393c4' }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-sm"
                    style={{ borderColor: '#1393c4', color: '#1393c4' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1393c4' }}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-sm"
                    style={{ borderColor: '#1393c4', color: '#1393c4' }}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1393c4' }}>Vehicle Make and Model *</label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={bookingData.vehicleMake}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-sm"
                    style={{ borderColor: '#1393c4', color: '#1393c4' }}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1" style={{ color: '#1393c4' }}>Message</label>
                  <textarea
                    name="message"
                    value={bookingData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none bg-white text-sm"
                    style={{ borderColor: '#1393c4', color: '#1393c4' }}
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs mb-3 leading-relaxed" style={{ color: '#1393c4' }}>
                  We will confirm your appointment within 24 hours.
                </p>
                <button
                  onClick={handleSubmit}
                  className="text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300 hover:opacity-90"
                  style={{ backgroundColor: '#1393c4' }}
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
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-blue-100" style={{ backgroundColor: '#f0f9ff' }}>
            <h1 className="text-lg sm:text-xl font-bold" style={{ color: '#1393c4' }}>A La Carte Package Form</h1>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-blue-200 rounded-full transition-colors duration-300"
            >
              <X className="w-5 h-5" style={{ color: '#1393c4' }} />
            </button>
          </div>

          <div className="flex items-center justify-center py-4 px-4 border-b border-blue-100" style={{ backgroundColor: '#f0f9ff' }}>
            <div className="flex items-center w-full max-w-lg">
              {[1, 2, 3, 4, 5].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex-1 flex items-center">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mx-auto ${
                      step <= currentStep 
                        ? 'text-white shadow-lg' 
                        : 'bg-white border-2'
                    }`} style={{
                      backgroundColor: step <= currentStep ? '#1393c4' : 'white',
                      borderColor: step <= currentStep ? '#1393c4' : '#1393c4',
                      color: step <= currentStep ? 'white' : '#1393c4'
                    }}>
                      {step < currentStep ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : step}
                    </div>
                  </div>
                  {step < 5 && (
                    <div className="flex-1 flex items-center px-1 sm:px-2">
                      <div className={`w-full h-1 rounded-full`} style={{ backgroundColor: step < currentStep ? '#1393c4' : '#94c5db' }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {renderStep()}
          </div>

          {currentStep > 1 && currentStep < 5 && (
            <div className="flex justify-between p-4 sm:p-6 border-t border-blue-100" style={{ backgroundColor: '#f0f9ff' }}>
              <button
                onClick={handlePrev}
                className="flex items-center px-4 py-2 hover:opacity-70 transition-colors duration-300"
                style={{ color: '#1393c4' }}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span className="text-sm">Previous</span>
              </button>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CarDetailingWebsite = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(Array(5).fill(false));
  const videoRef = useRef(null);

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
    handleScroll();
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
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-screen overflow-hidden bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>
        </div>
        
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

      {/* About Section */}
      <section className={`animate-section py-8 sm:py-12 bg-white transition-all duration-1000 ease-in-out ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1393c4' }}>
              About Us
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: '#1393c4' }}>
                Action car detailing is made up of a team of experts who can handle any size vehicles in any condition. We are dedicated to getting the job done right, there is no better place in Winnipeg to get your car detailed. Quality products, quality work and quality service is our promise.
              </p>
              
              <p className="text-base leading-relaxed" style={{ color: '#1393c4' }}>
                We are passionate about cars that's why we take our time with each vehicle. Our chemical and allergy-free interior cleaning methods will leave your car's interior spotless and scentless- the way it should be.
              </p>
              
              <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}>
                <p className="text-base font-medium" style={{ color: '#1393c4' }}>
                  Action car Detailing offers a very thorough, deep cleaning of interior and exterior. We specialize in paint correction, ceramic coating and complete interior reconditioning. In Business for 14 years. Better Business Bureau accredited with an A+ rating. We are MPI accredited.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f0f9ff' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#1393c4' }}>14+</div>
                <div className="text-sm" style={{ color: '#1393c4' }}>Years Experience</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f0f9ff' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#1393c4' }}>A+</div>
                <div className="text-sm" style={{ color: '#1393c4' }}>BBB Rating</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f0f9ff' }}>
                <CheckCircle className="w-6 h-6 mx-auto mb-1" style={{ color: '#1393c4' }} />
                <div className="text-sm" style={{ color: '#1393c4' }}>MPI Accredited</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f0f9ff' }}>
                <Star className="w-6 h-6 mx-auto mb-1" style={{ color: '#1393c4' }} />
                <div className="text-sm" style={{ color: '#1393c4' }}>Premium Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1393c4' }}>
              OUR EXCLUSIVE 5-STEP SYSTEM
            </h2>
            <p className="text-base max-w-3xl mx-auto" style={{ color: '#1393c4' }}>
              Our proven process ensures your vehicle receives the most thorough cleaning possible
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-white p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#1393c4' }}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg mr-3" style={{ color: '#1393c4' }}>
                  1
                </div>
                <h3 className="text-xl font-bold">Step 1:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Our Forced Air Extractor thoroughly cleans between and under seats, inside the dash seams and venting ducts, and all other hard-to-reach areas.
              </p>
            </div>

            <div className="text-white p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#1393c4' }}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg mr-3" style={{ color: '#1393c4' }}>
                  2
                </div>
                <h3 className="text-xl font-bold">Step 2:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Turbo brush vacuuming removes deeply embedded sand, dirt, hair and animal dander.
              </p>
            </div>

            <div className="text-white p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#1393c4' }}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg mr-3" style={{ color: '#1393c4' }}>
                  3
                </div>
                <h3 className="text-xl font-bold">Step 3:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Dual action brushing and biodegradable shampoo loosens and emulsifies dirt, oils, and stubborn stains.
              </p>
            </div>

            <div className="text-white p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-1" style={{ backgroundColor: '#1393c4' }}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg mr-3" style={{ color: '#1393c4' }}>
                  4
                </div>
                <h3 className="text-xl font-bold">Step 4:</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Our exclusive Italian Dry Steam System™ lifts and removes any remaining residue, leaving your carpets and upholstery bright, soft, and dry.
              </p>
            </div>

            <div className="text-white p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-2" style={{ backgroundColor: '#1393c4' }}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg mr-3" style={{ color: '#1393c4' }}>
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
      <section className={`animate-section py-12 sm:py-16 transition-all duration-1000 ease-in-out ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ backgroundColor: '#f0f9ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1393c4' }}>
              Our Services
            </h2>
            <p className="text-base max-w-3xl mx-auto" style={{ color: '#1393c4' }}>
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
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4" style={{ borderColor: '#1393c4' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1393c4' }}>{service.title}</h3>
                <p className="mb-4 text-sm" style={{ color: '#1393c4' }}>{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm" style={{ color: '#1393c4' }}>
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#1393c4' }} />
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
              className="text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:opacity-90"
              style={{ backgroundColor: '#1393c4' }}
            >
              Book Now
            </button>
            <p className="mt-3 text-sm" style={{ color: '#1393c4' }}>
              Customize your own detailing package with our interactive booking form
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#1393c4' }}>
              Read some of our Reviews
            </h2>
            
            <div className="inline-flex items-center justify-center bg-white border-2 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" style={{ borderColor: '#1393c4' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f0f9ff' }}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-blue-500 flex items-center justify-center text-white font-bold">
                  G
                </div>
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
              <div key={index} className="p-6 rounded-xl border-l-4" style={{ backgroundColor: '#f0f9ff', borderColor: '#1393c4' }}>
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#1393c4' }} />
                    ))}
                  </div>
                </div>
                <p className="mb-3 italic text-sm" style={{ color: '#1393c4' }}>"{review.review}"</p>
                <p className="font-semibold text-sm" style={{ color: '#1393c4' }}>- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  );
};

export default CarDetailingWebsite;