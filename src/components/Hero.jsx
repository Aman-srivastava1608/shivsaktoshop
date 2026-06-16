import { MapPin, Phone, Smartphone } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-eyebrow">
          <MapPin size={15} aria-hidden="true" />
          Near Aditya Vision, Muzaffarpur
        </p>
        <h1 className="hero-title">
          Every Brand, <span className="hero-highlight">All in One Place</span>
        </h1>
        <p className="hero-subtitle">
          Muzaffarpur's trusted destination for the latest smartphones and
          accessories, from Samsung to Apple and every leading brand in between.
        </p>
        <div className="hero-actions">
          <a href="tel:+918877771149" className="btn-primary">
            <Phone size={18} aria-hidden="true" />
            Call Now
          </a>
          <a href="#brands" className="btn-secondary">Explore Brands -&gt;</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="phone-mockup">
          <Smartphone size={118} strokeWidth={1.6} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
