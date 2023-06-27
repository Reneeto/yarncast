import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Display from "./components/Display";
import Filters from "./components/Filters";

const App = () => {
  return (
    <div>
      <Header />
      <Filters />
      <Display />
      <Footer />
    </div>
  );
};

export default App;
