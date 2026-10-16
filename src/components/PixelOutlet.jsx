import { ArrowUpRight, MapPin, Phone, Smartphone, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { motion, useReducedMotion } from "framer-motion";
import "./PixelOutlet.css";

export default function PixelOutlet() {
  const reduceMotion = useReducedMotion();
  const reveal = (x, delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, x, y: 35, scale: 0.93 },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.85, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="pixel-section" id="google-pixel" aria-labelledby="pixel-title">
      <div className="pixel-panel">
        <motion.div className="pixel-copy" {...reveal(-65)}>
          <span className="pixel-eyebrow"><MapPin size={15} aria-hidden="true" /> ONLY IN MUZAFFARPUR</span>
          <h2 id="pixel-title">Your city's only<br /><span>Google Pixel outlet.</span></h2>
          <p>Explore Google Pixel at Shiv Shakti Mobile. Visit us for a hands-on live demo and find your next phone.</p>
          <motion.div className="pixel-highlights" {...reveal(-25, 0.15)}>
            <span><Smartphone size={17} aria-hidden="true" /> Pixel phones available</span>
            <span><Sparkles size={17} aria-hidden="true" /> Live demo in store</span>
          </motion.div>
          <motion.div className="pixel-actions" {...reveal(-25, 0.25)}>
            <a className="pixel-visit" href="#contact">Visit for a live demo <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="pixel-call" href="tel:+918877771149"><Phone size={16} aria-hidden="true" /> Ask about Pixel</a>
          </motion.div>
          <p className="pixel-address">Near Aditya Vision, Muzaffarpur</p>
        </motion.div>
        <motion.div className="pixel-demo" {...reveal(65, 0.12)}>
          <div className="pixel-wordmark"><FcGoogle size={34} aria-hidden="true" /><span>Google Pixel</span></div>
          <div className="pixel-product-visual">
            <motion.img src="/images/products/google-pixel-11-pro.webp" alt="Google Pixel phone, front display and rear camera" width="1200" height="675" loading="lazy" decoding="async"
              initial={reduceMotion ? false : { scale: 0.82 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </div>
          <span className="pixel-demo-status"><i aria-hidden="true" /> LIVE DEMO AVAILABLE</span>
          <h3>See it. Try it. Love it.</h3>
        </motion.div>
      </div>
    </section>
  );
}
