import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import MediaSections from "./components/MediaSections";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Brands />
      <MediaSections />
      <Features />
      <Contact />
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;
