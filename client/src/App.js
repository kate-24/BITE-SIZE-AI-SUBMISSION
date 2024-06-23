import React, { Fragment, useState } from "react";
import "./App.css";
import InputAddress from "./components/InputAddress.js";
import ShowSummary from "./components/ShowSummary.js";
import Navtemp from "./components/Navtemp.js";

const App = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0); // State to manage background image index
  const backgrounds = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg", "/bg4.jpg", "/bg5.jpg"];

  const handleSearch = async (searchData) => {
    // Logic to handle search and update UI
    try {
      // Perform search operation
      console.log("Search performed with data:", searchData);

      // Update UI or navigate to a different component based on search result
      // For now, let's just set a background index (this can be replaced with actual logic)
      const newIndex = Math.floor(Math.random() * backgrounds.length);
      setBackgroundIndex(newIndex);
    } catch (err) {
      console.error("Error performing search:", err);
    }
  };

  return (
    <Fragment>
      <div
        className="App"
        style={{
          backgroundImage: `url(${backgrounds[backgroundIndex]})`,
        }}
      >
        <Navtemp />
        <InputAddress onSearch={handleSearch} />
      </div>
    </Fragment>
  );
};

export default App;
