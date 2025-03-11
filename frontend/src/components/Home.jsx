import { useRef, useState } from "react";
import FlightPriceForm from "./FlightPriceForm";
import Footer from "./Footer";
import Header from "./Header";
import ModelInfo from "./ModelInfo";

const Home = () => {
  const formRef = useRef(null);
  const [showModelInfo, setShowModelInfo] = useState(false);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {showModelInfo ? (
        <ModelInfo goBack={() => setShowModelInfo(false)} />
      ) : (
        <div className="min-h-screen bg-gray-100 flex flex-col">
          {/* Navbar */}
          <Header scrollToForm={scrollToForm} showModelInfo={() => setShowModelInfo(true)} />

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
            {/* Left Side Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">Check out better flight deals</h2>
              <p className="text-gray-600 mt-4 text-lg">
                Flight price prediction helps travelers estimate ticket prices in advance,
                allowing them to book at the best possible rates. It utilizes machine learning
                and past trends to provide accurate insights.
              </p>
              <p className="text-gray-600 mt-2 text-lg">
                This website is designed to help you find the best time to book your flight and save money on air travel.
              </p>
            </div>

            {/* Right Side Image */}
            <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
              <img
                src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-08/07/full/1722995892-9811.jpg?im=FitAndFill=(826,465)"
                alt="Airplane"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Form Section */}
          <div ref={formRef} className="flex flex-col items-center min-h-screen bg-gray-100 pb-5">
            <div className="relative w-full flex justify-center mt-3">
              <div className="max-w-5xl w-full p-5 bg-white shadow-2xl rounded-3xl">
                <FlightPriceForm />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col bg-gray-100">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
