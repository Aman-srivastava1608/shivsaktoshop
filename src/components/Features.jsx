import "./Features.css";

const features = [
  { icon: "✅", title: "100% Genuine Products", desc: "Every phone is sold in a sealed box with complete authenticity assurance." },
  { icon: "💰", title: "Competitive Pricing", desc: "Transparent pricing, attractive offers, and no hidden charges." },
  { icon: "🔧", title: "Expert Repair Service", desc: "Fast and reliable repairs handled by experienced technicians." },
  { icon: "🔄", title: "Exchange Offers", desc: "Upgrade to a new phone with excellent value for your old device." },
  { icon: "📦", title: "Easy EMI Options", desc: "Buy your preferred smartphone with convenient installment plans." },
  { icon: "🤝", title: "After-Sales Support", desc: "Dedicated assistance even after your purchase is complete." },
];

export default function Features() {
  return (
    <section id="features" style={{ background: "#f5f7fa", padding: "60px 48px" }}>
      <h2 className="section-title">Why Choose Us</h2>
      <div className="features-grid">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
