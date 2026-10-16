import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Accessories.css";

const accessories = [
  { name: "Charging Adapters", detail: "Apple 20W USB-C Power Adapter", image: "adapter" },
  { name: "Data Cables", detail: "Apple USB-C Charge Cable", image: "cable" },
  { name: "Earphones", detail: "Apple EarPods with USB-C", image: "earbuds" },
  { name: "Screen Protectors", detail: "Belkin UltraGlass protection", image: "glass" },
  { name: "Mobile Covers", detail: "Apple Clear Case with MagSafe", image: "cover" },
  { name: "Power Banks", detail: "Anker MagGo portable charging", image: "powerbank" },
];

export default function Accessories() {
  const reduceMotion = useReducedMotion();
  const carouselRef = useRef(null);
  const interaction = useRef({ dragging: false, touching: false, until: 0 });
  const pause = () => { interaction.current.until = performance.now() + 1500; };
  const move = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    pause();
    const width = carousel.firstElementChild.firstElementChild.offsetWidth;
    if (direction < 0 && carousel.scrollLeft < 250) carousel.scrollLeft += width;
    if (direction > 0 && carousel.scrollLeft >= width) carousel.scrollLeft -= width;
    carousel.scrollBy({ left: direction * (window.innerWidth <= 700 ? 192 : 242), behavior: reduceMotion ? "auto" : "smooth" });
  };
  useEffect(() => {
    if (reduceMotion) return;
    let frame;
    let previous = 0;
    let remainder = 0;
    const tick = (now) => {
      const carousel = carouselRef.current;
      const state = interaction.current;
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (carousel && !document.hidden && !state.dragging && !state.touching && now > state.until) {
        const width = carousel.firstElementChild.firstElementChild.offsetWidth;
        remainder += elapsed * 0.045;
        const pixels = Math.floor(remainder);
        remainder -= pixels;
        carousel.scrollLeft += pixels;
        if (width && carousel.scrollLeft >= width) carousel.scrollLeft -= width;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);
  return (
    <section id="accessories" className="accessories-section" aria-labelledby="accessories-title">
      <div className="accessories-heading">
          <h2 id="accessories-title" className="section-title">Original Mobile Accessories</h2>
      <div className="accessories-controls" aria-label="Scroll accessories">
        <button type="button" onClick={() => move(-1)} aria-label="Previous accessories"><ChevronLeft size={20} /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next accessories"><ChevronRight size={20} /></button>
      </div>
      </div>
      <motion.div ref={carouselRef} className="accessories-carousel" tabIndex={0} aria-label="Original accessories. Swipe, drag or use arrow keys to explore."
        onWheel={pause}
        onTouchStart={() => { interaction.current.touching = true; pause(); }}
        onTouchMove={pause}
        onTouchEnd={() => { interaction.current.touching = false; pause(); }}
        onTouchCancel={() => { interaction.current.touching = false; pause(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onPointerDown={(event) => {
          pause();
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          const carousel = event.currentTarget;
          if (!reduceMotion && carousel.scrollLeft < 1) carousel.scrollLeft = carousel.firstElementChild.firstElementChild.offsetWidth;
          interaction.current.dragging = true;
          interaction.current.x = event.clientX;
          interaction.current.left = carousel.scrollLeft;
          carousel.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!interaction.current.dragging) return;
          event.currentTarget.scrollLeft = interaction.current.left - (event.clientX - interaction.current.x);
        }}
        onPointerUp={() => { interaction.current.dragging = false; pause(); }}
        onPointerCancel={() => { interaction.current.dragging = false; pause(); }}
        onLostPointerCapture={() => { interaction.current.dragging = false; }}
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.7 }}>
        <div className="accessories-track">
          {[false, true].map((duplicate) => (
            <div className="accessories-set" key={String(duplicate)} aria-hidden={duplicate}>
              {accessories.map((item) => (
                <article className="accessory-card" key={item.image}>
                  <div className="accessory-image">
                    <img src={`/images/accessories/${item.image}.jpg`} alt={duplicate ? "" : item.detail} width="240" height="180" loading="eager" decoding="async" draggable={false} />
                  </div>
                  <div className="accessory-info"><h3>{item.name}</h3><p>{item.detail}</p></div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
