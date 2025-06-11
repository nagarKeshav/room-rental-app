import React from 'react';
import { Home, Users, Shield, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting house owners and students to create perfect living arrangements. 
            We bridge the gap between those who have space and those who need it.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              We believe that finding the right place to live should be simple, safe, and affordable. 
              Our platform connects verified house owners with responsible students, creating a 
              trusted community where everyone benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quality Homes</h3>
              <p className="text-gray-600">
                We verify all properties to ensure students get safe, comfortable, 
                and well-maintained living spaces that feel like home.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Trusted Community</h3>
              <p className="text-gray-600">
                Our platform builds trust through verified profiles, reviews, 
                and a support system that protects both students and house owners.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Secure Platform</h3>
              <p className="text-gray-600">
                Advanced security measures and verification processes ensure 
                safe transactions and communications for all our users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2023, our platform was born from a simple observation: students 
                struggled to find affordable, safe housing while many house owners had 
                empty rooms they wanted to rent to responsible tenants.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We started as a small local initiative and have grown into a trusted 
                platform that serves thousands of students and house owners. Our focus 
                has always been on building genuine connections and ensuring positive 
                experiences for everyone involved.
              </p>
              <div className="flex items-center space-x-4">
                <Heart className="w-8 h-8 text-orange-600" />
                <span className="text-lg font-semibold text-gray-800">
                  Built with care for our community
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                  <div className="text-gray-600">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
                  <div className="text-gray-600">Trusted Owners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-gray-600">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we serve our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Transparency</h3>
              <p className="text-gray-600">
                Clear communication and honest dealings in every interaction.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Safety</h3>
              <p className="text-gray-600">
                Prioritizing the security and well-being of all community members.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Affordability</h3>
              <p className="text-gray-600">
                Making quality housing accessible to students on any budget.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community</h3>
              <p className="text-gray-600">
                Building lasting relationships and a supportive network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions or want to learn more? We'd love to hear from you and 
            help you find your perfect housing solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-orange-600" />
              <span className="text-gray-700">Kota, Rajasthan</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-orange-600" />
              <span className="text-gray-700">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-orange-600" />
              <span className="text-gray-700">lokocode8@gmail.com</span>
            </div>
          </div>
          <button onClick={() => navigate('/contact')} className="mt-8 bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors">
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
}