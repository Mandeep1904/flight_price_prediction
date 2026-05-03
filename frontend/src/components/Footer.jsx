import { Plane, Mail, Github, Linkedin, Twitter, Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Brand & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Plane className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">FlightPredict</h3>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              AI-powered flight price predictions to help you save on travel.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">hello@flightpredict.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center space-x-3">
            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-200">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-200">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-200">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-6 pt-6 text-center">
          <div className="text-sm text-gray-600">
            © 2025 FlightPredict. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;