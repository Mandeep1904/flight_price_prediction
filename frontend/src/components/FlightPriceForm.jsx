import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert departure and arrival time strings into Date objects
    const depTime = new Date(formData.Dep_Time);
    const arrivalTime = new Date(formData.Arrival_Time);

    // Check if the departure time is in the future and arrival time is in the past
    const currentTime = new Date();

    if (depTime > currentTime && arrivalTime < currentTime) {
      toast.error("Departure date is in the future and arrival date is in the past!");
      return;
    }

    // Check if arrival date is before departure date
    if (arrivalTime < depTime) {
      toast.error("Arrival date cannot be before departure date!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/predict", formData);
      setPrediction(response.data.prediction_text);
    } catch (error) {
      console.error("Error submitting the form", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="absolute inset-0 bg-cover bg-center bg-opacity-50" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/033/307/449/non_2x/airplane-flying-at-sunset-transporting-passengers-on-a-business-journey-generated-by-ai-free-photo.jpg')" }}></div>

      {/* Form */}
      <div className="container mx-auto mt-10 max-w-4xl bg-white bg-opacity-80 shadow-md rounded-lg p-6 z-10 relative">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Departure Date</h5>
              <input
                type="datetime-local"
                name="Dep_Time"
                value={formData.Dep_Time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="card bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Arrival Date</h5>
              <input
                type="datetime-local"
                name="Arrival_Time"
                value={formData.Arrival_Time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="card bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Source 📍</h5>
              <select
                name="Source"
                value={formData.Source}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="Delhi">Delhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div className="card bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Destination 📍</h5>
              <select
                name="Destination"
                value={formData.Destination}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="Cochin">Cochin</option>
                <option value="Delhi">Delhi</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div className="card bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Stoppage</h5>
              <select
                name="stops"
                value={formData.stops}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="0">Non-Stop</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="card bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Which Airline you want to travel?</h5>
              <select
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="Jet Airways">Jet Airways</option>
                <option value="IndiGo">IndiGo</option>
                <option value="Air India">Air India</option>
                <option value="Multiple carriers">Multiple carriers</option>
                <option value="SpiceJet">SpiceJet</option>
                <option value="Vistara">Vistara</option>
                <option value="Air Asia">Air Asia</option>
                <option value="GoAir">GoAir</option>
                <option value="Multiple carriers Premium economy">Multiple carriers Premium economy</option>
                <option value="Jet Airways Business">Jet Airways Business</option>
                <option value="Vistara Premium economy">Vistara Premium economy</option>
                <option value="Trujet">Trujet</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded shadow hover:bg-blue-700"
            >
              Predict
            </button>
          </div>
        </form>

        {prediction && (
          <div className="mt-6 p-4 bg-green-50 text-green-800 border border-green-300 rounded">
            <h3>{prediction}</h3>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default FlightPriceForm;
