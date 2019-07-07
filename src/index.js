import React from "react";
import ReactDOM from "react-dom";

import Gallery from "./Gallery";
import "./styles.css";

const photos = {
  1: "/one.jpg",
  2: "/two.jpg",
  3: "/three.jpg",
  4: "/four.jpg",
  5: "/five.jpg",
  6: "/six.jpg"
};

function App() {
  return (
    <div className="App">
      <Gallery photos={photos} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
