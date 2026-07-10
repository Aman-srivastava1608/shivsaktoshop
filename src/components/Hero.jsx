import { MapPin, Phone, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: reduceMotion ? {} : { opacity: 1, y: 0 },
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          {...reveal}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <MapPin size={15} aria-hidden="true" />
          Near Aditya Vision, Muzaffarpur
        </motion.p>
        <motion.h1
          className="hero-title"
          {...reveal}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08, ease: "easeOut" }}
        >
          Every Brand, <span className="hero-highlight">All in One Place</span>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          {...reveal}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
        >
          Muzaffarpur's trusted destination for the latest smartphones and
          accessories, from Samsung to Apple and every leading brand in between.
        </motion.p>
        <motion.div
          className="hero-actions"
          {...reveal}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
        >
          <a href="tel:+918877771149" className="btn-primary">
            <Phone size={18} aria-hidden="true" />
            Call Now
          </a>
          <a href="#brands" className="btn-secondary">Explore Brands -&gt;</a>
        </motion.div>
      </div>
      <motion.div
        className="hero-visual"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
      >
        <div className="phone-mockup">
          <Smartphone size={118} strokeWidth={1.6} aria-hidden="true" />
          <span className="mockup-chip">Latest Models</span>
        </div>
      </motion.div>
    </section>
  );
}
