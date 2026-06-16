import { useEffect, useRef, useState } from "react";
import { FaApple } from "react-icons/fa";
import {
  SiMotorola,
  SiOneplus,
  SiOppo,
  SiSamsung,
  SiVivo,
  SiXiaomi,
} from "react-icons/si";
import "./Brands.css";

function RealmeLogo() {
  return (
    <svg className="brand-svg-logo realme-wordmark" viewBox="0 0 180 48" role="img" aria-label="Realme">
      <rect width="180" height="48" rx="10" fill="#FFC915" />
      <text
        x="90"
        y="32"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="0"
        fill="#111111"
      >
        realme
      </text>
    </svg>
  );
}

const brands = [
  { name: "Samsung", Icon: SiSamsung, color: "#1428A0" },
  { name: "Apple", Icon: FaApple, color: "#1D1D1F" },
  { name: "Vivo", Icon: SiVivo, color: "#415FFF" },
  { name: "Oppo", Icon: SiOppo, color: "#046A38" },
  { name: "Realme", customLogo: <RealmeLogo /> },
  { name: "Xiaomi", Icon: SiXiaomi, color: "#FF6900" },
  { name: "OnePlus", Icon: SiOneplus, color: "#EB0029" },
  { name: "Motorola", Icon: SiMotorola, color: "#001428" },
];

export default function Brands() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brands"
      ref={sectionRef}
      className={`brands-section ${isVisible ? "is-visible" : ""}`}
    >
      <h2 className="section-title">Top Smartphone Brands Available</h2>
      <div className="brand-ticker" aria-label="Available smartphone brands">
        <div className="brand-ticker-track">
          <BrandLogoSet />
          <BrandLogoSet ariaHidden />
        </div>
      </div>
    </section>
  );
}

function BrandLogoSet({ ariaHidden = false }) {
  return (
    <div className="brand-logo-set" aria-hidden={ariaHidden}>
      {brands.map((brand) => {
        const Icon = brand.Icon;

        return (
          <div className="brand-logo-card" key={brand.name}>
            {Icon ? (
              <Icon
                className="brand-logo-icon"
                style={{ color: brand.color }}
                aria-hidden="true"
              />
            ) : (
              brand.customLogo
            )}
            <span className="brand-logo-name">{brand.name}</span>
          </div>
        );
      })}
    </div>
  );
}
