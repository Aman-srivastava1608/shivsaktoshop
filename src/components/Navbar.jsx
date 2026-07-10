import { Menu, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./Navbar.css";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#brands", label: "Brands" },
  { href: "#features", label: "Why Choose Us" },
  { href: "#contact", label: "Contact Us" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">
          <Smartphone size={24} aria-hidden="true" />
        </div>
        <div>
          <div className="logo-name">Shiv Shakti Mobile</div>
          <div className="logo-sub">Muzaffarpur, Bihar</div>
        </div>
      </div>
      <button
        className="navbar-menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <ul id="primary-navigation" className={`navbar-links ${isMenuOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={activeSection === item.href ? "is-active" : ""}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
