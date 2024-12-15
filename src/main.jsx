import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import "react-image-gallery/styles/css/image-gallery.css";
// Supports weights 200-900
import '@fontsource-variable/cairo';


// register Swiper custom elements
register();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
