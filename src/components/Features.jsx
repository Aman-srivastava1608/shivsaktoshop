import { BadgeCheck, Banknote, Headphones, PackageCheck, Repeat2, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import "./Features.css";

const features = [
  { Icon: BadgeCheck, title: "100% Genuine Products", desc: "Every phone is sold in a sealed box with complete authenticity assurance." },
  { Icon: Banknote, title: "Competitive Pricing", desc: "Transparent pricing, attractive offers, and no hidden charges." },
  { Icon: Wrench, title: "Expert Repair Service", desc: "Fast and reliable repairs handled by experienced technicians." },
  { Icon: Repeat2, title: "Exchange Offers", desc: "Upgrade to a new phone with excellent value for your old device." },
  { Icon: PackageCheck, title: "Easy EMI Options", desc: "Buy your preferred smartphone with convenient installment plans." },
  { Icon: Headphones, title: "After-Sales Support", desc: "Dedicated assistance even after your purchase is complete." },
];

export default function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="features"
      className="features-section"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <h2 className="section-title">Why Choose Us</h2>
      <div className="features-ticker" aria-label="Why choose Shiv Shakti Mobile">
        <div className="features-ticker-track">
          <FeatureSet />
          <FeatureSet ariaHidden />
        </div>
      </div>
    </motion.section>
  );
}

function FeatureSet({ ariaHidden = false }) {
  return (
    <div className="feature-card-set" aria-hidden={ariaHidden}>
      {features.map((feature) => (
        <article className="feature-card" key={feature.title}>
          <div className="feature-icon">
            <feature.Icon size={26} aria-hidden="true" />
          </div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-desc">{feature.desc}</p>
        </article>
      ))}
    </div>
  );
}
