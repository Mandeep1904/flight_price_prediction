import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { 
  ArrowLeft, 
  Brain, 
  BarChart3, 
  Database, 
  Settings, 
  Award, 
  TrendingUp,
  CheckCircle,
  Target,
  Zap
} from "lucide-react";

const modelPerformance = [
  { model: "Random Forest", r2: 0.81, color: "#10B981" },
  { model: "Decision Tree", r2: 0.72, color: "#3B82F6" },
  { model: "Linear Regression", r2: 0.61, color: "#8B5CF6" },
  { model: "SVR", r2: -0.00041, color: "#EF4444" },
];

const datasetColumns = [
  {
    name: "Airline",
    role: "Categorical",
    description: "Identifies the airline operating the flight. Different airlines have different pricing strategies.",
    icon: "✈️"
  },
  {
    name: "Date_of_Journey",
    role: "Date",
    description: "The date of travel; ticket prices fluctuate based on seasonality and demand.",
    icon: "📅"
  },
  {
    name: "Source",
    role: "Categorical",
    description: "The departure city; impacts price due to airport charges and demand.",
    icon: "📍"
  },
  {
    name: "Destination",
    role: "Categorical",
    description: "The arrival city; fares vary based on destination popularity and availability.",
    icon: "🎯"
  },
  {
    name: "Route",
    role: "Text",
    description: "The path taken from source to destination, influencing price based on stopovers and distance.",
    icon: "🗺️"
  },
  {
    name: "Dep_Time",
    role: "Time",
    description: "Departure time; peak hours tend to have higher prices due to demand.",
    icon: "🕐"
  },
  {
    name: "Arrival_Time",
    role: "Time",
    description: "Arrival time; red-eye flights are often cheaper compared to prime hours.",
    icon: "🕕"
  },
  {
    name: "Duration",
    role: "Numerical",
    description: "Total flight duration; direct flights cost more than longer, connecting ones.",
    icon: "⏱️"
  },
  {
    name: "Total_Stops",
    role: "Numerical",
    description: "Number of stopovers; more stops usually lead to lower prices but longer travel times.",
    icon: "🔄"
  },
  {
    name: "Additional_Info",
    role: "Text",
    description: "Miscellaneous details such as baggage info, meal availability, which can affect pricing.",
    icon: "ℹ️"
  },
  {
    name: "Price",
    role: "Target Variable",
    description: "The actual flight price to be predicted based on the other factors.",
    icon: "💰"
  },
];

const ModelInfo = ({ goBack }) => {
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-blue-600">
            R² Score: <span className="font-bold">{payload[0].value.toFixed(3)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    ),
    label: PropTypes.string
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Model Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            <span>Model Performance</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Model Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into our machine learning model&apos;s performance, architecture, and the data that powers accurate flight price predictions.
          </p>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Model Performance Comparison</h2>
                  <p className="text-gray-600">R² scores across different algorithms</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={modelPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="model" 
                      stroke="#6B7280" 
                      fontSize={12}
                      fontWeight={500}
                    />
                    <YAxis 
                      stroke="#6B7280" 
                      domain={[-0.1, 1]} 
                      fontSize={12}
                      fontWeight={500}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="r2" 
                      fill="#3B82F6" 
                      name="R² Score" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {modelPerformance.map((model, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{model.r2.toFixed(3)}</div>
                    <div className="text-sm text-gray-600">{model.model}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Random Forest */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border border-green-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Why Random Forest?</h2>
                  <p className="text-gray-600">The champion algorithm</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Random Forest is chosen due to its ensemble learning approach, reducing overfitting 
                    and improving generalization. It creates multiple decision trees and averages their 
                    results for more accurate predictions.
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      "Handles missing values efficiently",
                      "Works well with categorical data",
                      "Resistant to outliers",
                      "Provides feature importance"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">81.34%</div>
                    <div className="text-gray-600 font-medium">Accuracy Score</div>
                    <div className="mt-4 text-sm text-gray-500">
                      After hyperparameter tuning
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Information */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dataset Features</h2>
                  <p className="text-gray-600">Understanding the data that powers predictions</p>
                </div>
              </div>

              <div className="grid gap-4">
                {datasetColumns.map((col, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{col.icon}</div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{col.name}</h3>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {col.role}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{col.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hyperparameter Tuning */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Hyperparameter Tuning</h2>
                  <p className="text-gray-600">Optimization for peak performance</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 text-lg mb-6">
                    Hyperparameter tuning significantly improved the model&apos;s accuracy. 
                    Here are the key optimized parameters:
                  </p>

                  <div className="space-y-4">
                    {[
                      { param: "n_estimators", desc: "Increased number of trees in the forest, enhancing stability." },
                      { param: "max_depth", desc: "Limited depth to prevent overfitting." },
                      { param: "min_samples_split", desc: "Ensured minimum samples per split for generalization." },
                      { param: "min_samples_leaf", desc: "Avoided tiny branches that overfit training data." }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-xl p-4">
                        <div className="font-semibold text-gray-900 mb-1">{item.param}</div>
                        <div className="text-gray-600 text-sm">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Performance Improvement</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">Before Tuning</span>
                      <span className="font-bold text-red-600">79.75%</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">After Tuning</span>
                      <span className="font-bold text-green-600">81.34%</span>
                    </div>
                    
                    <div className="text-center mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">+1.59%</div>
                      <div className="text-sm text-gray-600">Improvement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-12"></div>
    </div>
  );
};

ModelInfo.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default ModelInfo;