import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const modelPerformance = [
  { model: "Random Forest", r2: 0.81 },
  { model: "Decision Tree", r2: 0.72 },
  { model: "Linear Regression", r2: 0.61 },
  { model: "SVR", r2: -0.00041 },
];

const datasetColumns = [
  {
    name: "Airline",
    role: "Categorical",
    description:
      "Identifies the airline operating the flight. Different airlines have different pricing strategies.",
  },
  {
    name: "Date_of_Journey",
    role: "Date",
    description:
      "The date of travel; ticket prices fluctuate based on seasonality and demand.",
  },
  {
    name: "Source",
    role: "Categorical",
    description:
      "The departure city; impacts price due to airport charges and demand.",
  },
  {
    name: "Destination",
    role: "Categorical",
    description:
      "The arrival city; fares vary based on destination popularity and availability.",
  },
  {
    name: "Route",
    role: "Text",
    description:
      "The path taken from source to destination, influencing price based on stopovers and distance.",
  },
  {
    name: "Dep_Time",
    role: "Time",
    description:
      "Departure time; peak hours tend to have higher prices due to demand.",
  },
  {
    name: "Arrival_Time",
    role: "Time",
    description:
      "Arrival time; red-eye flights are often cheaper compared to prime hours.",
  },
  {
    name: "Duration",
    role: "Numerical",
    description:
      "Total flight duration; direct flights cost more than longer, connecting ones.",
  },
  {
    name: "Total_Stops",
    role: "Numerical",
    description:
      "Number of stopovers; more stops usually lead to lower prices but longer travel times.",
  },
  {
    name: "Additional_Info",
    role: "Text",
    description:
      "Miscellaneous details such as baggage info, meal availability, which can affect pricing.",
  },
  {
    name: "Price",
    role: "Numerical (Target Variable)",
    description:
      "The actual flight price to be predicted based on the other factors.",
  },
];

const ModelInfo = ({ goBack }) => {
  return (
    <div className="p-6 bg-white min-h-screen text-gray-900 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Flight Price Prediction model’s Stats
      </h1>

      {/* Chart Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Different Models’ Performances
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={modelPerformance}>
            <XAxis dataKey="model" stroke="#333" />
            <YAxis stroke="#333" domain={[-0.1, 1]} />
            <Tooltip
              cursor={{ fill: "#ddd" }}
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
            />
            <Bar dataKey="r2" fill="#4A90E2" name="R² Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Dataset Information Table */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Dataset Columns & Their Roles
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2">Column Name</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">
                  Impact on Prediction
                </th>
              </tr>
            </thead>
            <tbody>
              {datasetColumns.map((col, index) => (
                <tr key={index} className="bg-white text-gray-700">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {col.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{col.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {col.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={goBack}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

ModelInfo.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default ModelInfo;