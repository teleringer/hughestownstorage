
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: [],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const submitData = new URLSearchParams();
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('interests', formData.interests.join(', '));
      submitData.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/submit/c8a1c0bf-8ad4-4e45-b5b1-3d8e9c2a7f14', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData
      });

      if (response.ok) {
        setSubmitStatus('Thank you! Your message has been sent successfully.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          interests: [],
          message: ''
        });
      } else {
        setSubmitStatus('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Google Map */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.123456789!2d-75.8765432!3d41.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c51234567890ab%3A0x1234567890abcdef!2s133%20New%20St%2C%20Hughestown%2C%20PA%2018640!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hughestown Self-Storage Location"
            ></iframe>
            
            {/* Map Direction Links */}
            <div className="p-4 bg-white border-t flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
              <a 
                href="https://hughestownstorage.com/directions-google" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer flex items-center justify-center"
              >
                <i className="ri-map-pin-line mr-2"></i>
                Get Directions (Google Maps)
              </a>
              <a 
                href="https://hughestownstorage.com/directions-apple" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer flex items-center justify-center"
              >
                <i className="ri-map-pin-line mr-2"></i>
                Get Directions (Apple Maps)
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <i className="ri-map-pin-line text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">133 New Street<br/>Hughestown, PA 18640</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <i className="ri-phone-line text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(570) 362-6150</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <i className="ri-mail-line text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">office@hughestownstorage.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <i className="ri-time-line text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                  <p className="text-gray-600">Monday - Saturday: 8:30 AM - 5:30 PM<br/>Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <i className="ri-key-line text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Gate Access</h3>
                  <p className="text-gray-600">6:00 AM - 10:00 PM Every Day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} data-readdy-form id="contact-form">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter area code and number"
                  />
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I'm Interested in <em>(check all that apply)</em>:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Sales',
                    'Support',
                    'Moving Supplies',
                    '10x10 self-storage',
                    '10x15 self-storage',
                    '10x20 self-storage',
                    '10x30 self-storage',
                    'Car/Trailer/Boat Storage',
                    'RV Storage',
                    'Document Storage',
                    'Conference/Meeting Room Rental',
                    'Other'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Questions | Comments | Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Enter your message (max 500 characters)"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || formData.message.length > 500}
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>

              {/* Status Message */}
              {submitStatus && (
                <div className={`mt-4 p-3 rounded-md ${
                  submitStatus.includes('error') 
                    ? 'bg-red-100 text-red-700 border border-red-300' 
                    : 'bg-green-100 text-green-700 border border-green-300'
                }`}>
                  {submitStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
