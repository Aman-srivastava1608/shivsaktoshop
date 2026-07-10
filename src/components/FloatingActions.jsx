import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./FloatingActions.css";

const PHONE_LINK = "tel:+918877771149";
const WHATSAPP_URL = "https://wa.me/918877771149";

export default function FloatingActions() {
  const [isHappyCustomersVisible, setIsHappyCustomersVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("happy-customers");

    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHappyCustomersVisible(entry.isIntersecting);
      },
      { threshold: 0.18 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`floating-actions ${isHappyCustomersVisible ? "is-happy-customers-visible" : ""}`}
      aria-label="Quick contact actions"
    >
      <a
        href={WHATSAPP_URL}
        className="floating-action whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Shiv Shakti Mobile on WhatsApp"
      >
        <FaWhatsapp size={28} aria-hidden="true" />
      </a>
      <a
        href={PHONE_LINK}
        className="floating-action call"
        aria-label="Call Shiv Shakti Mobile at +91 8877771149"
      >
        <Phone size={25} aria-hidden="true" />
      </a>
    </div>
  );
}
