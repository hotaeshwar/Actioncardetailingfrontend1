import { useState, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: '',
    agreeToPolicy: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[^0-9]/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    if (!formData.agreeToPolicy) {
      newErrors.agreeToPolicy = 'You must agree to the privacy policy';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Create form element for FormSubmit
      const formElement = document.createElement('form');
      formElement.action = 'https://formsubmit.co/actioncardetailing@gmail.com'; // Replace with your email
      formElement.method = 'POST';
      formElement.style.display = 'none';

      // Prepare form data for submission
      const submissionData = {
        'Customer Name': formData.name,
        'Mobile Number': formData.mobile,
        'Message': formData.message,
        'Source': 'Website Chat Widget',
        'Timestamp': new Date().toLocaleString(),
        '_subject': 'New Message from Website Chat',
        '_replyto': formData.mobile, // Use mobile as reply-to for SMS follow-up
        '_captcha': 'false',
        '_template': 'table' // Makes the email look nicer
      };

      // Add form fields
      Object.keys(submissionData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = submissionData[key];
        formElement.appendChild(input);
      });

      // Submit form
      document.body.appendChild(formElement);
      formElement.submit();

      // Show success message
      alert('Message sent successfully! We\'ll get back to you shortly by text.');
      
      // Reset form
      setFormData({
        name: '',
        mobile: '',
        message: '',
        agreeToPolicy: false
      });
      
      // Optionally close the chat widget after successful submission
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Enhanced Chat Button with improved visibility */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChat}
          className={`relative group w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 ${
            isOpen 
              ? 'bg-gradient-to-br from-red-400 via-red-500 to-pink-500 shadow-red-400/50' 
              : 'bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 shadow-sky-400/50 hover:shadow-sky-400/70'
          }`}
        >
          {/* Animated pulse ring */}
          <div className={`absolute inset-0 rounded-full ${isOpen ? 'bg-red-300' : 'bg-sky-300'} opacity-75 animate-ping`}></div>
          <div className={`absolute inset-0 rounded-full ${isOpen ? 'bg-red-300' : 'bg-sky-300'} opacity-50 animate-ping`} style={{ animationDelay: '1s' }}></div>
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {isOpen ? (
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </div>
          
          {/* Notification badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">1</span>
            </div>
          )}
        </button>
      </div>

      {/* Enhanced Chat Dialog - Mobile First Design */}
      <div
        className={`fixed z-40 transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }
        
        /* Mobile: Full screen overlay */
        inset-0 bg-black bg-opacity-50 backdrop-blur-sm
        
        /* Tablet and up: Card positioning */
        md:inset-auto md:bg-transparent md:backdrop-blur-none
        md:bottom-20 md:right-4 md:w-96 md:h-auto
        
        /* Large desktop */
        lg:right-6 lg:w-96
        `}
      >
        <div 
          className={`w-full h-full bg-white transition-all duration-500 ease-out transform ${
            isOpen 
              ? 'translate-y-0 scale-100' 
              : 'translate-y-full md:translate-y-8 scale-95'
          }
          
          /* Mobile: Full screen */
          md:h-auto md:max-h-[600px] md:rounded-2xl md:shadow-2xl
          
          /* Card shadow and border */
          md:border md:border-gray-200 md:shadow-sky-400/20
          
          flex flex-col overflow-hidden
          `}
        >
          {/* Header with enhanced gradient and close button */}
          <div className="relative bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 text-white p-4 md:p-5">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-12 translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Message Us</h3>
                    <div className="flex items-center text-sm text-sky-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      We're online
                    </div>
                  </div>
                </div>
                
                {/* Close button - Enhanced visibility */}
                <button
                  onClick={toggleChat}
                  className="w-10 h-10 bg-white bg-opacity-30 hover:bg-opacity-50 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white border-opacity-50"
                >
                  <svg className="w-6 h-6 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-sm text-sky-100">
                Send us a message and we'll get back to you shortly by text.
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-b from-sky-50 to-white p-4 border-b border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm border border-gray-200 flex-1">
                <p className="text-sm text-sky-600">Hi there! 👋 Send us a message to learn more about our services.</p>
              </div>
            </div>
          </div>

          {/* Form Container with improved scrolling */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-sky-500 mb-2 group-hover:text-sky-600 transition-colors">
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 ${
                    errors.name 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-sky-200 hover:border-sky-300 focus:bg-sky-50'
                  }`}
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>}
              </div>

              {/* Mobile Field */}
              <div className="group">
                <label className="block text-sm font-medium text-sky-500 mb-2 group-hover:text-sky-600 transition-colors">
                  MOBILE NUMBER
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 ${
                    errors.mobile 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-sky-200 hover:border-sky-300 focus:bg-sky-50'
                  }`}
                  placeholder="Enter your mobile number"
                  disabled={isSubmitting}
                />
                {errors.mobile && <p className="mt-1 text-xs text-red-500 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.mobile}
                </p>}
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-sm font-medium text-sky-500 mb-2 group-hover:text-sky-600 transition-colors">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 resize-none ${
                    errors.message 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-sky-200 hover:border-sky-300 focus:bg-sky-50'
                  }`}
                  placeholder="Type your message here..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-red-500 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.message}
                </p>}
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToPolicy"
                    checked={formData.agreeToPolicy}
                    onChange={handleChange}
                    className={`mt-1 w-4 h-4 text-sky-400 border-2 rounded focus:ring-2 focus:ring-sky-400 transition-colors ${
                      errors.agreeToPolicy ? 'border-red-400' : 'border-sky-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  <label className="text-xs text-sky-500 leading-relaxed">
                    By checking this box, you agree to our{' '}
                    <a href="#" className="text-sky-600 hover:text-sky-700 underline">Privacy Policy</a>
                    {' '}and consent to receive communications from us.
                  </label>
                </div>
                {errors.agreeToPolicy && (
                  <p className="text-xs text-red-500 flex items-center ml-7">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.agreeToPolicy}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="bg-sky-50 rounded-xl p-3 space-y-2 text-xs text-sky-400">
                <p>By submitting, you authorize Action Car Detailing to send text messages with offers & other information.</p>
                <p>Message/data rates may apply. Reply HELP for help or STOP to cancel.</p>
                <p>
                  <a href="#" className="text-sky-500 hover:underline">Use is subject to terms.</a>
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-500 hover:via-sky-600 hover:to-sky-700 text-white hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0'
                }`}
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;