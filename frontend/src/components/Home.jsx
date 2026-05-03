import { lazy, Suspense, useRef, useState } from "react";
import { 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Brain,
  Zap,
} from "lucide-react";
import Header from "./Header";
import FlightPriceForm from "./FlightPriceForm";
import Footer from "./Footer";

const ModelInfo = lazy(() => import("./ModelInfo"));

const Home = () => {
  const formRef = useRef(null);
  const [showModelInfo, setShowModelInfo] = useState(false);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze historical data to predict flight prices with high accuracy."
    },
    {
      icon: Zap,
      title: "Real-Time Analysis",
      description: "Get instant price predictions based on current market trends and seasonal patterns."
    },
    {
      icon: Shield,
      title: "Reliable & Secure",
      description: "Your data is protected with enterprise-grade security while delivering consistent results."
    }
  ];

  const stats = [
    { value: "95%", label: "Accuracy Rate" },
    { value: "50K+", label: "Predictions Made" },
    { value: "12M+", label: "Saved for Users" },
    { value: "4.9★", label: "User Rating" }
  ];

  const airlines = [
    "IndiGo", "Air India", "SpiceJet", "Vistara", "GoAir", "AirAsia"
  ];

  if (showModelInfo) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">
            Loading model analytics...
          </div>
        }
      >
        <ModelInfo goBack={() => setShowModelInfo(false)} />
      </Suspense>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header scrollToForm={scrollToForm} showModelInfo={() => setShowModelInfo(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white mt-4">
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>AI-Powered Predictions</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Smart Flight Price
                <br />
                <span className="text-blue-600">Predictions</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Save money on flights with AI-powered price predictions. Get accurate forecasts 
                and book at the perfect time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={scrollToForm}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Start Predicting</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setShowModelInfo(true)}
                  className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Aircraft in flight"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">₹12,450</div>
                    <div className="text-sm text-gray-600">Avg. Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose FlightPredict?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI and machine learning, we help you make smarter travel decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-20 bg-gray-50">
          <FlightPriceForm />
      </section>

      {/* Airlines Section */}
      <section className="bg-gray-50 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Supported Airlines
            </h2>
            <p className="text-gray-600">
              Get predictions for all major Indian airlines
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {airlines.map((airline, index) => (
              <div key={index} className="text-gray-600 font-medium">
                {airline}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
