import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 sm:px-10 py-16 max-w-7xl mx-auto text-gray-800">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary">
          About <span className="text-gray-800">Us</span>
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          We are committed to transforming healthcare by connecting patients with expert doctors through a seamless digital platform.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src={assets.about_image}
            alt="Doctor consulting with patient"
            className="rounded-xl shadow-xl w-full h-auto object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Our Story</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            Our platform emerged from a simple idea: healthcare should be accessible, transparent, and patient-centric. We've built a bridge between patients and top-tier medical professionals, eliminating traditional barriers to quality care.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Our Mission</h3>
              <p className="text-base leading-relaxed text-gray-700">
                To simplify and modernize healthcare by creating trusted connections between doctors and patients. From seamless appointment booking to secure health records and virtual consultations, we're redefining healthcare delivery.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Our Vision</h3>
              <p className="text-base leading-relaxed text-gray-700">
                To become the most accessible digital healthcare ecosystem, delivering quality medical care through intuitive technology. We're committed to empowering individuals to take control of their health journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50 rounded-xl px-6 sm:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Our Platform</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We stand out in the digital healthcare space through our unwavering commitment to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Verified Specialists</h3>
            <p className="text-gray-600">
              Every doctor on our platform undergoes rigorous credential verification, ensuring you receive care from qualified professionals.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">24/7 Availability</h3>
            <p className="text-gray-600">
              Access healthcare when you need it most with our round-the-clock virtual consultation services.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Transparent Pricing</h3>
            <p className="text-gray-600">
              No hidden fees or surprise bills. We believe in complete transparency for all our services.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Platform</h3>
            <p className="text-gray-600">
              Your health data is protected with enterprise-grade security and strict compliance with privacy regulations.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Easy Scheduling</h3>
            <p className="text-gray-600">
              Book, reschedule, or cancel appointments with just a few taps, saving you time and hassle.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Patient Community</h3>
            <p className="text-gray-600">
              Join a supportive network of patients and access exclusive health resources and educational content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;