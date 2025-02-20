const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center p-4 mt-10 shadow-md">
      <p className="text-lg font-semibold">
        © 2025 Flight Price Prediction ✈️. All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:text-gray-300">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-gray-300">
          Terms of Service
        </a>
        <a href="#" className="hover:text-gray-300">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
