import React, { useState } from 'react';
import { Phone, Mail, Send, User, FileText, Sparkles, MessageSquare } from 'lucide-react';
import emailjs from 'emailjs-com';
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    userType: '',
    message: ''
  });
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  emailjs.send('service_cl4rznk', 'template_nuhva3u', formData, 'tKzKuHb2y45gKrO3Z')
    .then((result) => {
      console.log(result.text);
      alert('✨ Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        userType: '',
        message: ''
      });
    }, (error) => {
      console.log(error.text);
      alert('❌ Failed to send message.');
    })
    .finally(() => setIsSubmitting(false));
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
          
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-3xl animate-pulse"></div>
          
          <div className="relative p-10">
            <div className="space-y-8">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-hover:text-orange-600">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-4 transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-orange-500' : 'text-gray-400'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 placeholder-gray-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-hover:text-orange-600">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-4 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-orange-500' : 'text-gray-400'
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 placeholder-gray-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Phone & User Type Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-hover:text-orange-600">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-4 transition-colors duration-300 ${
                      focusedField === 'phone' ? 'text-orange-500' : 'text-gray-400'
                    }`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 placeholder-gray-400"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-hover:text-orange-600">
                    You are a *
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('userType')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-4 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 text-gray-700"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="student">🎓 Student looking for housing</option>
                    <option value="owner">🏠 House owner</option>
                    <option value="other">👤 Other</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-hover:text-orange-600">
                  Subject *
                </label>
                <div className="relative">
                  <div className={`absolute left-4 top-4 transition-colors duration-300 ${
                    focusedField === 'subject' ? 'text-orange-500' : 'text-gray-400'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 placeholder-gray-400"
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-hover:text-orange-600">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  rows="6"
                  className="w-full px-4 py-4 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 placeholder-gray-400 resize-none"
                  placeholder="Tell us more about your inquiry... We're here to help! ✨"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-600 hover:to-pink-600'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>Send Message</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            We typically respond within 24 hours ⚡
          </p>
        </div>
      </div>
    </div>
  );
}