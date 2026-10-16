import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import PixelOutlet from "./components/PixelOutlet";
import MediaSections from "./components/MediaSections";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import ScrollEffects from "./components/ScrollEffects";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Brands />
      <PixelOutlet />
      <MediaSections />
      <Features />
      <Contact />
      <Footer />
      <FloatingActions />
      <ScrollEffects />
    </div>
  );
}

export default App;
