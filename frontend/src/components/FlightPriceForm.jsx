import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { 
  Calendar, 
  MapPin, 
  Plane, 
  Clock, 
  Users, 
  TrendingUp,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const FlightPriceForm = () => {
  const [formData, setFormData] = useState({
    Dep_Time: "",
    Arrival_Time: "",
    Source: "Delhi",
    Destination: "Cochin",
    stops: "0",
    airline: "Jet Airways",
  });

  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Convert departure and arrival time strings into Date objects
    const depTime = new Date(formData.Dep_Time);
    const arrivalTime = new Date(formData.Arrival_Time);
  
    // Check if the departure time is in the future and arrival time is in the past
    const currentTime = new Date();
  
    if (depTime > currentTime && arrivalTime < currentTime) {
      toast.error("Departure date is in the future and arrival date is in the past!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsLoading(false);
      return;
    }
  
    // Check if arrival date is before departure date
    if (arrivalTime < depTime) {
      toast.error("Arrival date cannot be before departure date!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsLoading(false);
      return;
    }
  
    try {
      const API_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000"; // Fallback for development
      const response = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setPrediction(data.prediction_text);
      toast.success("Price prediction generated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error submitting the form:", error.message);
      toast.error("Something went wrong! Please try again.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cities = [
    { value: "Delhi", label: "Delhi" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Chennai", label: "Chennai" },
    { value: "Cochin", label: "Cochin" },
    { value: "New Delhi", label: "New Delhi" },
    { value: "Hyderabad", label: "Hyderabad" }
  ];

  const airlines = [
    { value: "Jet Airways", label: "Jet Airways" },
    { value: "IndiGo", label: "IndiGo" },
    { value: "Air India", label: "Air India" },
    { value: "Multiple carriers", label: "Multiple carriers" },
    { value: "SpiceJet", label: "SpiceJet" },
    { value: "Vistara", label: "Vistara" },
    { value: "Air Asia", label: "Air Asia" },
    { value: "GoAir", label: "GoAir" },
    { value: "Multiple carriers Premium economy", label: "Multiple carriers Premium" },
    { value: "Jet Airways Business", label: "Jet Airways Business" },
    { value: "Vistara Premium economy", label: "Vistara Premium" },
    { value: "Trujet", label: "Trujet" }
  ];

  const stops = [
    { value: "0", label: "Non-stop", icon: "✈️" },
    { value: "1", label: "1 Stop", icon: "1️⃣" },
    { value: "2", label: "2 Stops", icon: "2️⃣" },
    { value: "3", label: "3 Stops", icon: "3️⃣" },
    { value: "4", label: "4 Stops", icon: "4️⃣" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>AI-Powered Price Prediction</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find the Best Flight Prices
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get accurate price predictions powered by machine learning to make smarter travel decisions.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form  onSubmit={handleSubmit}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="space-y-6">
                {/* Flight Route */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>From</span>
                    </label>
                    <select
                      name="Source"
                      value={formData.Source}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      required
                    >
                      {cities.map(city => (
                        <option key={city.value} value={city.value}>{city.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>To</span>
                    </label>
                    <select
                      name="Destination"
                      value={formData.Destination}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      required
                    >
                      {cities.map(city => (
                        <option key={city.value} value={city.value}>{city.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span>Departure</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="Dep_Time"
                      value={formData.Dep_Time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>Arrival</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="Arrival_Time"
                      value={formData.Arrival_Time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Stops */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span>Stops</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {stops.map(stop => (
                      <label key={stop.value} className="relative">
                        <input
                          type="radio"
                          name="stops"
                          value={stop.value}
                          checked={formData.stops === stop.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-3 border-2 rounded-xl text-center text-sm font-medium cursor-pointer transition-all duration-200 ${
                          formData.stops === stop.value 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-300'
                        }`}>
                          <div className="text-lg mb-1">{stop.icon}</div>
                          <div>{stop.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Airline */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Plane className="w-4 h-4 text-blue-500" />
                    <span>Preferred Airline</span>
                  </label>
                  <select
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    {airlines.map(airline => (
                      <option key={airline.value} value={airline.value}>{airline.label}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Predicting...</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        <span>Predict Flight Price</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Prediction Result */}
              {prediction && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Price Prediction</h3>
                      <p className="text-green-800 text-lg font-medium">{prediction}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50/50 backdrop-blur-sm border border-blue-200/30 rounded-2xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">How it works</p>
                <p className="text-blue-700/80">Our AI analyzes historical flight data, seasonal trends, and market patterns to provide accurate price predictions for your travel dates.</p>
              </div>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default FlightPriceForm;