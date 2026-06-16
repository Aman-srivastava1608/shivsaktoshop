import { MapPin, Phone, Smartphone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

const PHONE_NUMBER = "+91 8877771149";
const PHONE_LINK = "tel:+918877771149";
const WHATSAPP_URL = "https://wa.me/918877771149";
const INSTAGRAM_URL = "https://www.instagram.com/shiv_shakti_mobile_muzaffarpur";
const MAPS_URL = "https://maps.app.goo.gl/X4XiD2iur2Dmz6H87";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">
            <Smartphone size={20} aria-hidden="true" />
            Shiv Sakti Mobile
          </div>
          <p className="footer-tagline">Muzaffarpur's Trusted Mobile Store</p>
          <div className="footer-contact-links">
            <a
              href={PHONE_LINK}
              className="footer-contact-link phone"
              aria-label={`Call Shiv Sakti Mobile at ${PHONE_NUMBER}`}
            >
              <Phone size={17} aria-hidden="true" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              className="footer-contact-link whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Shiv Sakti Mobile on WhatsApp"
            >
              <FaWhatsapp size={17} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              className="footer-contact-link instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shiv Sakti Mobile Instagram profile"
            >
              <FaInstagram size={17} aria-hidden="true" />
              <span>@shiv_shakti_mobile_muzaffarpur</span>
            </a>
            <a
              href={MAPS_URL}
              className="footer-contact-link maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shiv Sakti Mobile location on Google Maps"
            >
              <MapPin size={17} aria-hidden="true" />
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#brands">Brands</a>
          <a href="#features">Why Choose Us</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Shiv Sakti Mobile, Muzaffarpur, Bihar. All rights reserved.</p>
      </div>
    </footer>
  );
}
