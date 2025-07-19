// Responsive, edge-to-edge landing page layout
import React from 'react';
import { 
  Users, 
  Zap, 
  MessageSquare, 
  Shield, 
  Github, 
  Linkedin,
  ChevronDown,
  Star,
  Globe,
  Settings,
  Smartphone,
  ListChecks,
  Briefcase,
  ShoppingCart,
  FileBarChart2,
  BookOpen,
  Package,
  ReceiptText
} from 'lucide-react';
import UmarImg from '../assets/Umar.jpg';
import TalhaImg from '../assets/Talha.png';
import HasnainImg from '../assets/Hasnain.jpg';

function LandingPage() {
  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Users className="h-8 w-8 text-pink-500 mr-2" />
                <span className="text-xl font-bold text-gray-900">CRMSolution</span>
              </div>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-900 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#features" className="text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#about" className="text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
                  Contact
                </a>
              </div>
            </div>
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <a 
                href="/auth/login" 
                className="text-gray-700 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Login
              </a>
              <a 
                href="/auth/register" 
                className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-pink-50 to-pink-100 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Free, Open-Source CRM to 
                    <span className="text-pink-500"> Grow Your Business</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Organize leads, manage clients, and automate campaigns — without spending a dime.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/auth/login" 
                    className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 text-center"
                  >
                    Use CRM
                  </a>
                  <button 
                    onClick={scrollToFeatures}
                    className="border-2 border-pink-400 text-pink-500 hover:bg-pink-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center"
                  >
                    Learn More
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">CRM Dashboard</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
                        <div className="w-3 h-3 bg-pink-200 rounded-full"></div>
                        <div className="w-3 h-3 bg-pink-100 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-pink-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Active Leads</span>
                          <span className="text-2xl font-bold text-pink-500">247</span>
                        </div>
                      </div>
                      <div className="bg-pink-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Closed Deals</span>
                          <span className="text-2xl font-bold text-pink-400">89</span>
                        </div>
                      </div>
                      <div className="bg-pink-200 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Revenue</span>
                          <span className="text-2xl font-bold text-pink-600">$45K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Modern Businesses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                CRMSolution offers a comprehensive suite of tools to help you manage every aspect of your business.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lead Management</h3>
                <p className="text-gray-600">Track, nurture, and convert leads efficiently with smart automation.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <ListChecks className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Task Management</h3>
                <p className="text-gray-600">Assign, track, and complete tasks to boost team productivity.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <ShoppingCart className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sales Tracking</h3>
                <p className="text-gray-600">Monitor sales pipelines, deals, and performance in real time.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Briefcase className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Management</h3>
                <p className="text-gray-600">Plan, execute, and track projects with collaborative tools.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Package className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Inventory</h3>
                <p className="text-gray-600">Manage stock, supplies, and inventory with ease.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cash Book</h3>
                <p className="text-gray-600">Track cash flow, expenses, and income in one place.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <ReceiptText className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Vouchers</h3>
                <p className="text-gray-600">Create, manage, and track vouchers and receipts.</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <FileBarChart2 className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reporting & Analytics</h3>
                <p className="text-gray-600">Gain insights with detailed reports and analytics dashboards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CRMSolution Section */}
      <section className="py-20 bg-pink-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose CRMSolution?
              </h2>
              <p className="text-xl text-gray-600">
                Built for businesses that want powerful CRM capabilities without the cost.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open-Source & Free Forever</h3>
                <p className="text-gray-600">No hidden fees, no subscription costs. Use it forever, completely free.</p>
              </div>

              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Customize</h3>
                <p className="text-gray-600">Adapt the CRM to fit your unique business needs and workflows.</p>
              </div>

              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-hosted or Cloud</h3>
                <p className="text-gray-600">Deploy on your own servers or use our cloud hosting options.</p>
              </div>

              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Integration Ready</h3>
                <p className="text-gray-600">Connect with Google Calendar, Mailchimp, WhatsApp Business, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Credits Section */}
      <section id="about" className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Meet the talent behind CRMSolution
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={UmarImg} 
                    alt="Muhammad Umar"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-pink-100"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Muhammad Umar</h3>
                <p className="text-pink-500 font-medium mb-3">Full Stack Developer</p>
                <p className="text-gray-600 text-sm">Expert in frontend, backend, UI/UX, and database optimization.</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={TalhaImg} 
                    alt="Muhammad Talha"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-pink-100"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Muhammad Talha</h3>
                <p className="text-pink-500 font-medium mb-3">Backend Developer</p>
                <p className="text-gray-600 text-sm">Expert in backend development and system architecture.</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={HasnainImg} 
                    alt="Muhammad Hasnain"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-pink-100"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Muhammad Hasnain</h3>
                <p className="text-pink-500 font-medium mb-3">Full Stack Developer</p>
                <p className="text-gray-600 text-sm">Focuses on API development and third-party integrations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-pink-400 to-pink-300 w-full">
        <div className="w-full text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Start using CRMSolution and level up your business.
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Join thousands of businesses already using our free CRM solution.
            </p>
            <a 
              href="/auth/login" 
              className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-block"
            >
              Use CRM
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Logo and Description */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-pink-400 mr-2" />
                  <span className="text-xl font-bold">CRMSolution</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  The free, open-source CRM solution that helps businesses grow without breaking the bank.
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/muhammadumar126/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="https://github.com/shkumar156" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-4 text-sm">Get the latest updates and features.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button className="bg-pink-400 hover:bg-pink-500 px-4 py-2 rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 CRMSolution. All rights reserved. Built by Muhammad Umar, Muhammad Talha, and Muhammad Hasnain.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;