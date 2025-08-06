import React, { useState } from 'react';
import { User, Phone, Mail, Car, Calendar, MessageSquare } from 'lucide-react';

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    makeModel: '',
    pickDateTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Store form data before clearing it
      const submissionData = { ...formData };
      
      // Show success message first
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        makeModel: '',
        pickDateTime: ''
      });
      setIsSubmitting(false);

      // Wait 3 seconds before submitting to show success message
      setTimeout(() => {
        // Use a hidden form submission approach with stored data
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://formsubmit.co/actioncardetailing@gmail.com';
        form.style.display = 'none';

        // Add form fields using stored submission data
        const fields = [
          { name: 'name', value: submissionData.name },
          { name: 'phone', value: submissionData.phone },
          { name: 'email', value: submissionData.email },
          { name: 'makeModel', value: submissionData.makeModel },
          { name: 'pickDateTime', value: submissionData.pickDateTime },
          { name: '_subject', value: 'New Quote Request' },
          { name: '_captcha', value: 'false' },
          { name: '_template', value: 'table' },
          { name: '_next', value: window.location.origin } // Redirect to home page
        ];

        fields.forEach(field => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = field.name;
          input.value = field.value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.phone && formData.email && formData.makeModel && formData.pickDateTime;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="w-8 h-8 text-[#1393c4]" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#1393c4]">GET YOUR QUOTE</h1>
          </div>
          <p className="text-[#1393c4]">Fill out the form below to receive a customized quote.</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:border-[#1393c4] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:border-[#1393c4] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:border-[#1393c4] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Make and Model Field */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Vehicle Make and Model *
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="makeModel"
                  value={formData.makeModel}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Toyota Camry 2020"
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:border-[#1393c4] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Pick Date/Time Field */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                Preferred Date/Time *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="datetime-local"
                  name="pickDateTime"
                  value={formData.pickDateTime}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:border-[#1393c4] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`py-3 px-8 rounded-lg font-medium transition-all duration-200 ${
                  !isFormValid || isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-[#1393c4] text-white hover:bg-[#1393c4]/90'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Get My Quote'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <h3 className="font-bold text-lg text-green-800 mb-2">Quote Request Submitted Successfully!</h3>
                  <p className="text-green-700 mb-2">Thank you for your interest!</p>
                  <p className="text-green-600 text-sm mb-3">We'll review your information and get back to you within 24 hours with a customized quote.</p>
                  <p className="text-green-600 text-xs">Redirecting to home page in a moment...</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl mb-2">❌</div>
                  <h3 className="font-bold text-lg text-red-800 mb-2">Submission Error</h3>
                  <p className="text-red-600 text-sm">There was an error submitting your request. Please try again or contact us directly.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            📞 Need immediate assistance? Call us directly or we'll review your information and provide a customized quote within 24 hours.
          </p>
          <p className="text-gray-500 text-sm">
            * Required fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quote;