import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollEffects() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll(
      ".section-title, .brand-ticker, .features-ticker, .shop-gallery-card, .offers-slider, .empty-media-state, .customer-card, .contact-row, .contact-actions, .map-placeholder, .footer-top, .footer-bottom"
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
        if (isIntersecting) {
          target.classList.add("scroll-visible");
        } else if (boundingClientRect.top >= window.innerHeight - 60 || boundingClientRect.bottom <= 0) {
          target.classList.remove("scroll-visible");
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });

    targets.forEach((target) => {
      const siblings = Array.from(target.parentElement.children);
      target.style.setProperty("--reveal-delay", `${(siblings.indexOf(target) % 5) * 110}ms`);
      target.style.setProperty("--reveal-x", target.matches(".section-title, .contact-row, .footer-top") ? "-65px" : target.matches(".map-placeholder") ? "65px" : "0px");
      target.classList.add("scroll-reveal");
      observer.observe(target);
    });

    const hero = document.querySelector(".hero");
    let frame;
    const updateHero = () => {
      frame = undefined;
      if (!hero) return;
      const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
      hero.style.setProperty("--hero-drift", `${progress * 120}px`);
      hero.style.setProperty("--hero-rotate", `${progress * -12}deg`);
      hero.style.setProperty("--hero-scale", `${1 + progress * 0.16}`);
    };
    const onScroll = () => {
      if (frame === undefined) frame = requestAnimationFrame(updateHero);
    };
    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame !== undefined) cancelAnimationFrame(frame);
      ["--hero-drift", "--hero-rotate", "--hero-scale"].forEach((property) => hero?.style.removeProperty(property));
      targets.forEach((target) => {
        target.classList.remove("scroll-reveal", "scroll-visible");
        target.style.removeProperty("--reveal-delay");
        target.style.removeProperty("--reveal-x");
      });
    };
  }, [reduceMotion]);

  return reduceMotion ? null : (
    <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
  );
}
