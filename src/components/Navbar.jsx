import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">📱</div>
        <div>
          <div className="logo-name">Shiv Shakti Mobile</div>
          <div className="logo-sub">Muzaffarpur, Bihar</div>
        </div>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#brands">Brands</a></li>
        <li><a href="#features">Why Choose Us</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  );
}
