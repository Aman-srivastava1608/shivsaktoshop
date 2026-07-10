import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Contact.css";

const PHONE_NUMBER = "+91 8877771149";
const PHONE_LINK = "tel:+918877771149";
const WHATSAPP_URL = "https://wa.me/918877771149";
const INSTAGRAM_URL = "https://www.instagram.com/shiv_shakti_mobile_muzaffarpur";
const MAPS_URL = "https://maps.app.goo.gl/X4XiD2iur2Dmz6H87";

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <h2 className="section-title">Contact Us</h2>
      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-row">
            <a
              href={MAPS_URL}
              className="contact-icon-link location"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shiv Shakti Mobile location on Google Maps"
            >
              <MapPin size={22} aria-hidden="true" />
            </a>
            <div>
              <div className="contact-label">Store Address</div>
              <div className="contact-value">
                Near Aditya Vision,<br />Muzaffarpur, Bihar - 842001
              </div>
            </div>
          </div>

          <div className="contact-row">
            <a
              href={PHONE_LINK}
              className="contact-icon-link phone"
              aria-label={`Call Shiv Shakti Mobile at ${PHONE_NUMBER}`}
            >
              <Phone size={22} aria-hidden="true" />
            </a>
            <div>
              <div className="contact-label">Phone</div>
              <div className="contact-value">
                <a href={PHONE_LINK}>{PHONE_NUMBER}</a>
              </div>
            </div>
          </div>

          <div className="contact-row">
            <a
              href={WHATSAPP_URL}
              className="contact-icon-link whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Shiv Shakti Mobile on WhatsApp"
            >
              <FaWhatsapp size={23} aria-hidden="true" />
            </a>
            <div>
              <div className="contact-label">WhatsApp</div>
              <div className="contact-value">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="contact-row">
            <a
              href={INSTAGRAM_URL}
              className="contact-icon-link instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shiv Shakti Mobile Instagram profile"
            >
              <FaInstagram size={22} aria-hidden="true" />
            </a>
            <div>
              <div className="contact-label">Instagram</div>
              <div className="contact-value">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  @shiv_shakti_mobile_muzaffarpur
                </a>
              </div>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-icon-static">
              <Clock size={22} aria-hidden="true" />
            </span>
            <div>
              <div className="contact-label">Shop Timings</div>
              <div className="contact-value">
                9:00 AM to 9:00 PM
                <span className="open-badge">Open Today</span>
              </div>
            </div>
          </div>

          <div className="contact-actions">
            <a href={PHONE_LINK} className="contact-cta primary">
              <Phone size={18} aria-hidden="true" />
              Call Now
            </a>
            <a
              href={WHATSAPP_URL}
              className="contact-cta whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={MAPS_URL}
              className="contact-cta secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={18} aria-hidden="true" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="map-placeholder">
          <div className="map-inner">
            <a
              href={MAPS_URL}
              className="map-icon-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shiv Shakti Mobile on Google Maps"
            >
              <MapPin size={42} aria-hidden="true" />
            </a>
            <p>View on Google Maps</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              Get Directions -&gt;
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
