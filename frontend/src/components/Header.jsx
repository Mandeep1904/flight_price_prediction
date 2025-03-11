import PropTypes from "prop-types";

const Header = ({ scrollToForm, showModelInfo }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Flight Price Prediction ✈️</h1>
      
      <div className="flex gap-4">
        <button
          onClick={scrollToForm}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
        >
          Go to Prediction
        </button>

        <button
          onClick={showModelInfo}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
        >
          Model Info
        </button>
      </div>
    </nav>
  );
};

Header.propTypes = {
  scrollToForm: PropTypes.func.isRequired,
  showModelInfo: PropTypes.func.isRequired,
};

export default Header;
