import PropTypes from "prop-types";
import { Plane, Info, Menu, X, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

const Header = ({ scrollToForm, showModelInfo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Header */}
      <nav className="fixed w-full top-0 z-50 px-4 pt-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-lg shadow-black/5 px-6 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-semibold text-gray-900">FlightPredict</h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <button
                  onClick={scrollToForm}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="font-medium">Predict</span>
                </button>

                <button
                  onClick={showModelInfo}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="font-medium">Info</span>
                </button>

                <div className="w-px h-4 bg-gray-300 mx-2"></div>

                <button
                  onClick={scrollToForm}
                  className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-gray-700" />
                ) : (
                  <Menu className="w-4 h-4 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg shadow-black/10 p-4">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    scrollToForm();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100/80 transition-all duration-200"
                >
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">Predict Price</span>
                </button>

                <button
                  onClick={() => {
                    showModelInfo();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100/80 transition-all duration-200"
                >
                  <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Info className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="font-medium text-sm">Model Info</span>
                </button>

                <button
                  onClick={() => {
                    scrollToForm();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gray-900 text-white px-3 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 mt-3"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  );
};

Header.propTypes = {
  scrollToForm: PropTypes.func.isRequired,
  showModelInfo: PropTypes.func.isRequired,
};

export default Header;