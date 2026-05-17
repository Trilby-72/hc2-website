import { useState, useEffect, useRef } from "react";
import { Users, Calculator, BarChart2, UserCheck, Heart, Building2, Stethoscope, BookOpen, Cpu, Car, MapPin, Target, Handshake, Zap, Settings, LifeBuoy, Users2, HardHat, Radio, Landmark } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Industries", id: "industries" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  {
    icon: <Users size={28} strokeWidth={1.5} color="#B01A2E" />,
    title: "Human Resources",
    desc: "End-to-end Workday HCM implementations, optimisations, and ongoing support — covering core HR, compensation, benefits, and talent management for organisations of all sizes.",
  },
  {
    icon: <Calculator size={28} strokeWidth={1.5} color="#B01A2E" />,
    title: "Payroll",
    desc: "Workday Payroll configuration, compliance, and testing — built for Australian regulatory requirements. We ensure accuracy, auditability, and seamless integration with your finance systems.",
  },
  {
    icon: <BarChart2 size={28} strokeWidth={1.5} color="#B01A2E" />,
    title: "Workforce Management",
    desc: "Scheduling, time tracking, absence management, and labour analytics within Workday. Optimise your workforce deployment and reduce manual processes across complex environments.",
  },
  {
    icon: <UserCheck size={28} strokeWidth={1.5} color="#B01A2E" />,
    title: "Recruitment",
    desc: "Workday Recruiting implementation and enhancement — from job requisitions and candidate pipelines to onboarding. Streamline your talent acquisition and deliver a standout candidate experience.",
  },
  {
    icon: <Settings size={28} strokeWidth={1.5} color="#B01A2E" />,
    title: "Workday Administration",
    desc: "Ongoing Workday tenant administration, configuration management, and system maintenance — keeping your platform optimised, compliant, and aligned with evolving business needs.",
  },
  {
    icon: <LifeBuoy size={28} strokeWidth={1.5} color="#B01A2E" />,
    title: "AMS",
    desc: "Application Management Services to support your Workday environment post-go-live. From break-fix and enhancements to release management, we keep your system running at its best.",
  },
];

const INDUSTRIES = [
  { label: "Not-for-Profit", icon: <Heart size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "Mission-driven organisations deserve streamlined HR. We understand NFP compliance, funding structures, and workforce complexity." },
  { label: "Aged Care", icon: <Building2 size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "Navigating aged care workforce regulations, rostering complexity, and high staff turnover — we've done it before." },
  { label: "Health", icon: <Stethoscope size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "From hospitals to allied health providers, we manage the nuances of healthcare workforce and payroll requirements." },
  { label: "Early Learning", icon: <BookOpen size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "ECEC sector expertise across award interpretation, ratio compliance, and educator lifecycle management." },
  { label: "Technology & Communication", icon: <Radio size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "Fast-scaling tech and communications companies need HR systems that grow with them. We configure Workday to match your velocity." },
  { label: "Automotive Retail", icon: <Car size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "Complex commission structures, multi-site operations, and varied employment types — we navigate automotive retail with confidence." },
  { label: "Community & Aged Care", icon: <Users2 size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "Supporting community service providers with workforce tools that reflect the complexity of care delivery, funding models, and sector regulation." },
  { label: "Banking & Finance", icon: <Landmark size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "Complex remuneration structures, regulatory compliance, and large-scale workforce requirements — we bring Workday precision to financial services environments." },
  { label: "Mining", icon: <HardHat size={24} strokeWidth={1.5} color="#B01A2E" />, desc: "Remote workforces, fly-in fly-out arrangements, and complex enterprise agreements — we bring Workday expertise to the resources sector." },
];

const LOGO_URL = "https://media.base44.com/images/public/user_6a090414654036ae9771bb72/f3f85cb9a_image001.png";

const WORKDAY_SALES_LOGO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABNAE0DASIAAhEBAxEB/8QAHQAAAwACAwEBAAAAAAAAAAAABgcIBAUAAgkDAf/EAEIQAAEDAwICBgUKAwcFAAAAAAECAwQFBhEABxIhCBMiMUFRFBc3V5UJFSMyYXF2kbTRdbPTFjNCQ1JioXKBguHw/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJc2ssC49ybvjW1bUTrpDvaeeXyajND6zjivBI/MnAAJIGrv2x6J+2NrQmXK/CXdVUABcfmkpYCvEIZSeHh/6+I/brp0D7Ih21srGuFTKfnO4nFSn3CntBlKlIaRnywCv73DqgtAAepTaP3cWz8Pb/bXPUptH7uLZ+Ht/to/18o8qNIKxHkMvFs4WELCuE+Rx3aAF9Sm0fu4tn4e3+2uepTaP3cWz8Pb/bRpWKnTaNTXqnWKhEp0FgAvSZTyWmmwSACpaiAOZA5nx1l6AA9Sm0fu4tn4e3+2sWqbDbO1GGuI/t5Qm0LHNUdjqFj7ltkKH/Y6ZOuaCFOkf0UHbWpMq69unpdRpscKdl0x88b7DY5lbagPpEjxBHEAM5VzxKWvZggEYIyDrzA6WtjxLC3wrFLprKWabMCKhDaSMBtDuSpAHglKwsAeQGg9AOjh7BbG/gkb+WNH+gDo4ewWxv4JG/ljR/oBrdSOqXtpc0VL1SZL1Kko6ynNdbJRltQy0jI4l+SQQT3Ag6kjbGr02zq1KlWrDptYVT7KeVIq9tU+RHkxFJTlImsOOKYcfKv/ACBGSMDGm4ekJUot5rp0216Uqkm73bXQ4xWR6cHEu9Wl/wBGKO0g8s4Vyz3+Z5E3ks2RXBSSmsxnHUy1RH5NMeZZmejIK3g0pQHFwpBPgDg40Ez3fc95VHbC7KLVanVavSqxZ8SqwXJDipQMgTG0uJQ8GGgTwqSVISFBJ5BRwdHVMvfcSX0hJ1Hk3QzTnGLpMVqhyFPHr6SO5aI7cReSpGVh9T6UhQwoJHewro32pES1LWuW3aFWazT69V40BCxCdbwlwgKKMp7axnCUjkpQUM5B1t6vvXZNInvwar88w34ohGYHKW8REEpILRdUAQ39YAgnIOQAcHQKzo7X5dNT3XFv1m65tylyJLcmOx1ExmnEPHg6yO7HadhqA7ISVKCvLuOqc0AJ3espV6KtZMqcX01IUkzBCc9DE4gn0brscPW8iOHz5d+tttpftv7h0BNdtoznICx2XZERbKVHiUkpSVDCiCk54ScZAPPloCnUAfKO+2+jfhtj9TJ1f+oA+Ud9t9G/DbH6mToLA6OHsFsb+CRv5Y0f6AOjh7BbG/gkb+WNH+gALB2pti1a1Wq6un02pVmp1uXVUVF2ntiTHD6+PqUuc1cKTnByO88hoFofRxi0v5slJu112q0+VNWagqmNddLZktLaWiQvPG6sJWQFlQA8EjwYO5G7W3m3qCm6rnhw5OMphtkvSVeX0SAVAHzIA+3SEurpuWzGdW3bNl1SpAckuzZKIoJ8+FIcJH5H7tA5qrtKiXtNa9kRbikQpVsvQpMCppjJWQ/FPYWponBB58s/nrrWtpVVmnXczUbkW5KuhmmplSEQwkIXECQVpTxf4yknGeznHPUyTOm7eS1gw7MoDKcnIddecOPDmCn/AO8tbKkdOGqIdAq+30N9s95i1FTRH24UhWf+NA9aVsRTqbujLu+PUaW5ElVhVaXGk29FkTEyVHiIRMcCltt8fbASkKSR2VDno52ls1rb/bukWczPXUG6a2tsSFthsucS1LzwgnH1sd/hpT2J0udqLidRGqr1RtqSshI9PY4mST5ONlQA+1QSNPikVKnVentVGkz4s+G8OJqRGdS42seYUkkHQZWoA+Ud9t9G/DbH6mTq/wDUAfKO+2+jfhtj9TJ0FY7I1mlW90arRrVbnsQKdEoEZx+Q8rhShIbH5nwAHMnAHPUs7/8AS0r9xPyKHtw49Q6NzbVUccMySPNJ/wAlPljt/aO7Qfv9X65P2Y2jjx5739mF0ItiOnk2qbHcU06pRHeQngAB7snHecovQfSQ89JfckSHXHnnFFS3HFFSlKPeSTzJ0X7bWKq6G59YqtUboVr0kJVU6q62Vhsq+o02gc3HVY5JH3kga2Oz+0lc3ORIXRajTYwiS22JZlLUkMNraec69RAICB1Ck578qT56Z72yu4NSseh2HKqtr0RiHKLrUd155Lk+pSULcS052COtSwyME4ASpPeSdAuJl1bS04iHQ9rHKww2rHp1drUhL7w8+rjKbQ3nyyrHmdZtNpW2O47opluxJNiXQ72YMSTOMqmznPBkOrAcYWo8klZWknAJBI0TWV0eJNWjSaa7WKbMuGdbcWsU+Gw84kwUvPR8Kkko4eSHHcpSVHsZxzTnDoGxrZsyqVabXqfNnyqcmTQY0RTwcKTUGoyJC09XjgXlWE54uY7OQQAS1Xp06kVSVS6nFdiTYjqmZDDqeFba0nCkkeYI0S7ZblXptxVhULTrciFxKBejE8ceR9jjZ7KuXLPePAjTn3Y2P3FuW9Isioy6HIqzsWnR33o6ZCFygp0xFSnUuICgUlDZcVgAhaVDOTqcKgwiLPkRm5DUlDLqm0vNE8DgBI4k5wcHvGg9Iejl0ibb3UZRR56G6LdSEZXCUv6KTjvUwo9/mUHtD/cATqcPlHfbfRvw2x+pk6myDKkwZrM2FIdjSWHEuMvNLKVtrSchSSOYIPPI05+mJVajU73tVuuv9dXYdn05mrKKQkiUoOPLBAAAP0o/9aDC2frFvXVZU3aG86mzSWJMr0+3qxIP0UCbw8Km3D4NOjAJ7knnjPMAN/2Tc9iV5dFumkv0+UMlsqGW30/621jsrT9oP/Oh3TFs7ei/bboibf8AT4lboKeSaVW4iJsZI8khwEpH2JIHM8tAK21dlxW3Bq8Gh1R6FHrEX0SehASeuaznhyQSnn4jBwSM4J0Vx98t1o9WrFWZvCUibWShU130dntKQ31aVIHBhpQR2eJASceOtod7GFHiXs3tKpR5k/MLicn7g8APuAA1z11xvcztN8Dd/r6AWp259906emfBuF6PKTT4tNS62y2FJjxlNqZQDw8uEtI7X1jjmTk5z5e825kqlO0x26HUxnXXHSGorDa0KW+mQrgWlAUgdahKwEkBJHIAZGt16643uZ2m+Bu/19c9dcb3M7TfA3f6+g/Ie/t9j51m1SZ85VqVTHaXDnq4WPQmHllb+G2kpC1qPCQpWeEjODywptNr11xvcztN8Dd/r67s79Vinq6+3LA24tyan+7m0+30l9s+aVOqXj8saDL2o2+hWzBZ3S3VYVT7dhEP0ulPjgk1x8c0NtoPPqs8JUsjGPMEkLC+LkqV4XfVLnrDnWTqlJU+7juTk8kp/wBqRhIHkBrl33TcV31ldYueszKtOWMddJcKilP+lI7kp59wAGtNoP/Z";

const WORKDAY_PARTNER_LOGO = "data:image/png;base64,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";

function useScrollSpy(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const handler = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(ids[i]);
          return;
        }
      }
      setActive(null);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HC2Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const active = useScrollSpy(["services", "industries", "about", "contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/maqkwdbw", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrors({ submit: "Something went wrong. Please try again or email us directly." });
      }
    } catch {
      setErrors({ submit: "Something went wrong. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", background: "#F0F4F8", color: "#1E3448" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: auto; }
        body { overflow-x: hidden; }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 4px 0;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #B01A2E;
          transition: width 0.25s ease;
        }
        .nav-link:hover, .nav-link.active { color: #fff; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .cta-btn {
          display: inline-block;
          background: #B01A2E;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .cta-btn:hover { background: #8f1525; transform: translateY(-1px); }

        .cta-btn-outline {
          display: inline-block;
          background: transparent;
          color: rgba(255,255,255,0.85);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 13px 32px;
          border: 2px solid rgba(255,255,255,0.3);
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .cta-btn-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.65); color: #fff; transform: translateY(-1px); }

        .service-card {
          background: #fff;
          border: 1px solid #dce6f0;
          padding: 36px 32px;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: default;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .service-card:hover {
          box-shadow: 0 12px 40px rgba(30,52,72,0.12), 0 2px 8px rgba(30,52,72,0.06);
          transform: translateY(-4px);
          border-color: #B01A2E;
        }

        .industry-card {
          background: #fff;
          padding: 28px 24px;
          border: 1px solid #dce6f0;
          border-left: 3px solid transparent;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .industry-card:hover {
          border-color: #dce6f0;
          border-left-color: #B01A2E;
          transform: translateX(4px);
          box-shadow: 0 4px 24px rgba(30,52,72,0.10);
        }

        .form-field {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #c8d6e5;
          font-family: inherit;
          font-size: 0.95rem;
          color: #2C3E50;
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-field:focus { border-color: #B01A2E; }
        .form-field.error { border-color: #B01A2E; background: #fef8f8; }

        .submit-btn {
          width: 100%;
          background: #B01A2E;
          color: #fff;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 16px;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover { background: #8f1525; }

        .section-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B01A2E;
          margin-bottom: 12px;
          display: block;
        }

        .service-fadein, .industry-fadein {
          display: flex;
          flex-direction: column;
        }
        .service-fadein > *, .industry-fadein > * {
          flex: 1;
        }

        @media (max-width: 768px) {
          .hero-headline { font-size: 2.6rem !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .industries-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { flex-direction: column !important; }
          .footer-grid { flex-direction: column !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .hero-headline { font-size: 2rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(30,52,72,0.97)" : "#1E3448",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.2)" : "none",
        transition: "background 0.3s, box-shadow 0.3s",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src={LOGO_URL} alt="HC2 Consulting"
              style={{ height: 44, objectFit: "contain", display: "block" }}
            />
          </div>
          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <button key={l.id} className={`nav-link${active === l.id ? " active" : ""}`} onClick={() => { scrollTo(l.id); setMenuOpen(false); }}>
                {l.label}
              </button>
            ))}
            <button className="cta-btn" style={{ padding: "10px 22px", fontSize: "0.82rem" }} onClick={() => scrollTo("contact")}>
              Get in Touch
            </button>
          </div>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 4 }}
            className="hamburger"
            aria-label="Menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2, transition: "0.3s",
                transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1
              }} />
            ))}
          </button>
        </div>
        {/* Mobile menu */}
        <div style={{
          background: "#1E3448", overflow: "hidden",
          maxHeight: menuOpen ? 320 : 0, transition: "max-height 0.35s ease",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none"
        }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className="nav-link" onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {l.label}
            </button>
          ))}
          <div style={{ padding: "16px 32px" }}>
            <button className="cta-btn" style={{ width: "100%" }} onClick={() => { scrollTo("contact"); setMenuOpen(false); }}>Get in Touch</button>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .hamburger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* HERO */}
      <section style={{
        background: "#1E3448",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 68,
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1660101477285-448428468eed?fm=jpg&q=80&w=2000&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }} />
        {/* Dark overlay — navy tinted for brand consistency */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(30,52,72,0.92) 0%, rgba(20,35,54,0.85) 50%, rgba(127,15,28,0.25) 100%)",
        }} />
        {/* Accent bar */}
        <div style={{ position: "absolute", left: 0, top: "40%", width: 4, height: "25%", background: "#B01A2E", zIndex: 2 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px", position: "relative", zIndex: 2, width: "100%" }}>
          {/* Workday badges */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 36, animation: "fadeSlideDown 0.7s ease both" }}>
            <img src={WORKDAY_PARTNER_LOGO} alt="Workday Services Partner" style={{ height: 72, objectFit: "contain", display: "block" }} />
            <img src={WORKDAY_SALES_LOGO} alt="Workday Sales Partner" style={{ height: 72, objectFit: "contain", display: "block" }} />
          </div>

          <h1 className="hero-headline" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "4.2rem",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.1,
            maxWidth: 720,
            marginBottom: 24,
            animation: "fadeSlideUp 0.8s ease 0.1s both"
          }}>
            Workday Expertise.<br />
            <span style={{ color: "#B01A2E" }}>Local Consultants.</span><br />
            Real Results.
          </h1>

          <p style={{
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.75,
            maxWidth: 560,
            marginBottom: 40,
            fontWeight: 300,
            animation: "fadeSlideUp 0.8s ease 0.2s both"
          }}>
            HC2 Consulting delivers specialist Workday HR, Payroll, Workforce Management, and Recruitment services — with Australian consultants who understand your industry, on the ground.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeSlideUp 0.8s ease 0.3s both" }}>
            <button className="cta-btn" onClick={() => scrollTo("contact")}>Enquire Now</button>
            <button className="cta-btn-outline" onClick={() => scrollTo("services")}>Our Services</button>
          </div>


        </div>

        <style>{`
          @keyframes fadeSlideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        `}</style>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 32px", background: "#1E3448", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -100, top: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(176,26,46,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, transparent, #B01A2E, transparent)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeIn>
            <span className="section-label">About HC2 Consulting</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 900, lineHeight: 1.15, maxWidth: 620, marginBottom: 24 }}>
              The Difference Is <span style={{ color: "#B01A2E" }}>Who Sits Across the Table</span>
            </h2>
          </FadeIn>

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 48 }}>
            <FadeIn delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.85, marginBottom: 24 }}>
                HC2 Consulting was founded on a simple principle: clients deserve expert consultants who are present, accountable, and invested in their success. We are an Australian Workday Services Partner with no offshore delivery model — every engagement is led and delivered by local specialists.
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.85 }}>
                Our team brings decades of combined Workday experience across HR, Payroll, Workforce Management, and Recruitment, with deep roots in complex, regulated industries where getting it wrong is not an option.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { title: "100% Local Delivery", body: "Every consultant is based in Australia. No handoffs to offshore teams, no knowledge gaps, no timezone friction." },
                  { title: "Sector-Specific Expertise", body: "We've worked inside the industries we serve, which means we speak your language and understand your compliance environment." },
                  { title: "Workday Focused", body: "We live and breathe Workday — from initial implementation through to continuous optimisation and ongoing support." },
                  { title: "Genuine Partnership", body: "We measure success by your outcomes, not our billable hours. Honest advice, transparent delivery, lasting relationships." },
                ].map((v, i) => (
                  <div key={i} style={{ display: "flex", gap: 20 }}>
                    <div style={{ width: 4, minWidth: 4, background: "#B01A2E", borderRadius: 2, marginTop: 4 }} />
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff", marginBottom: 6, fontSize: "1rem" }}>{v.title}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>{v.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 64, padding: "36px 40px", background: "rgba(176,26,46,0.08)", borderLeft: "4px solid #B01A2E" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontStyle: "italic", color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
                "We believe the best Workday outcomes come from consultants who are genuinely present — in your timezone, at your table, invested in your mission."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 32px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <span className="section-label">What We Do</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 900, color: "#1E3448", lineHeight: 1.15, maxWidth: 560, marginBottom: 16 }}>
              Workday Services, <span style={{ color: "#B01A2E" }}>End to End</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 560, marginBottom: 60 }}>
              Our consultants specialise exclusively in the Workday platform — meaning you get focused expertise, not a generalist who dabbles.
            </p>
          </FadeIn>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#dce6f0", alignItems: "stretch" }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="service-fadein">
                <div className="service-card">
                  <div style={{ marginBottom: 20 }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1E3448", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.75 }}>{s.desc}</p>
                  <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, color: "#B01A2E", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
                    onClick={() => scrollTo("contact")}>
                    Talk to us
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#B01A2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" style={{ padding: "100px 32px", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <span className="section-label">Sectors We Serve</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 900, color: "#1E3448", lineHeight: 1.15, maxWidth: 560, marginBottom: 16 }}>
              Deep <span style={{ color: "#B01A2E" }}>Industry Expertise</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 580, marginBottom: 60 }}>
              We don't just know Workday — we know the workforce challenges unique to your sector. That combination is what sets HC2 apart.
            </p>
          </FadeIn>

          <div className="industries-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
            {INDUSTRIES.map((ind, i) => (
              <FadeIn key={i} delay={i * 0.07} className="industry-fadein">
                <div className="industry-card">
                  <div style={{ marginBottom: 14 }}>{ind.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1E3448", marginBottom: 10 }}>{ind.label}</h3>
                  <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.7 }}>{ind.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 32px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <span className="section-label">Get in Touch</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 900, color: "#1E3448", lineHeight: 1.15, maxWidth: 560, marginBottom: 16 }}>
              Start the <span style={{ color: "#B01A2E" }}>Conversation</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 500, marginBottom: 56 }}>
              Whether you're evaluating Workday for the first time or looking to optimise an existing deployment, we'd love to understand your situation.
            </p>
          </FadeIn>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <FadeIn delay={0.1}>
              {!submitted ? (
                <div onSubmit={handleSubmit}>
                  <div className="form-row" style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1E3448", marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>Full Name *</label>
                      <input className={`form-field${errors.name ? " error" : ""}`} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jane Smith" />
                      {errors.name && <p style={{ color: "#B01A2E", fontSize: "0.78rem", marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1E3448", marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>Company *</label>
                      <input className={`form-field${errors.company ? " error" : ""}`} value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} placeholder="Acme Organisation" />
                      {errors.company && <p style={{ color: "#B01A2E", fontSize: "0.78rem", marginTop: 4 }}>{errors.company}</p>}
                    </div>
                  </div>
                  <div className="form-row" style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1E3448", marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>Email Address *</label>
                      <input className={`form-field${errors.email ? " error" : ""}`} type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="jane@company.com.au" />
                      {errors.email && <p style={{ color: "#B01A2E", fontSize: "0.78rem", marginTop: 4 }}>{errors.email}</p>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1E3448", marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>Phone Number</label>
                      <input className="form-field" type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+61 4XX XXX XXX" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#1E3448", marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>Message *</label>
                    <textarea className={`form-field${errors.message ? " error" : ""}`} rows={5} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Tell us about your Workday needs, the challenges you're facing, or what you'd like to achieve..." style={{ resize: "vertical" }} />
                    {errors.message && <p style={{ color: "#B01A2E", fontSize: "0.78rem", marginTop: 4 }}>{errors.message}</p>}
                  </div>
                  <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Sending..." : "Send Enquiry →"}
                  </button>
                  {errors.submit && <p style={{ color: "#B01A2E", fontSize: "0.85rem", marginTop: 10 }}>{errors.submit}</p>}
                  <p style={{ fontSize: "0.78rem", color: "#999", marginTop: 12 }}>We typically respond within one business day.</p>
                </div>
              ) : (
                <div style={{ padding: "48px 40px", background: "#F0F4F8", borderLeft: "4px solid #B01A2E", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 360 }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>✓</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "#1E3448", marginBottom: 12 }}>Thank You, {form.name.split(" ")[0]}.</h3>
                  <p style={{ color: "#64748B", lineHeight: 1.75 }}>Your enquiry has been received. A member of the HC2 Consulting team will be in touch within one business day.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name:"", company:"", email:"", phone:"", message:"" }); setErrors({}); }}
                    style={{ background: "none", border: "none", color: "#B01A2E", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", marginTop: 24, textAlign: "left", padding: 0 }}>
                    ← Submit another enquiry
                  </button>
                </div>
              )}
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <div style={{ marginBottom: 40 }}>
                  <h3 style={{ fontWeight: 700, color: "#1E3448", marginBottom: 8, fontSize: "1.1rem" }}>Why Talk to HC2?</h3>
                  <p style={{ color: "#64748B", lineHeight: 1.75, fontSize: "0.95rem" }}>
                    We offer a no-obligation discovery conversation to understand your goals, your current environment, and how Workday can help. No pressure, no jargon — just a direct conversation with an experienced consultant.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { icon: <MapPin size={20} strokeWidth={1.5} color="#B01A2E" />, t: "Based in Australia", d: "All consultants are local — no offshore handoffs." },
                    { icon: <Target size={20} strokeWidth={1.5} color="#B01A2E" />, t: "Workday Specialist", d: "Exclusively focused on Workday implementations and support." },
                    { icon: <Handshake size={20} strokeWidth={1.5} color="#B01A2E" />, t: "Trusted Partner", d: "Official Workday Services Partner status." },
                    { icon: <Zap size={20} strokeWidth={1.5} color="#B01A2E" />, t: "Fast Response", d: "We respond within one business day, always." },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, padding: "16px 20px", background: "#F0F4F8", borderLeft: "3px solid #B01A2E" }}>
                      <span style={{ marginTop: 2 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: "#1E3448", fontSize: "0.95rem", marginBottom: 3 }}>{item.t}</div>
                        <div style={{ color: "#64748B", fontSize: "0.88rem" }}>{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#132336", color: "rgba(255,255,255,0.6)", padding: "48px 32px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <img src={LOGO_URL} alt="HC2 Consulting" style={{ height: 40, objectFit: "contain", display: "block" }} />
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: 280, color: "rgba(255,255,255,0.5)" }}>
                Australian Workday Services Partner specialising in HR, Payroll, Workforce Management, and Recruitment.
              </p>
              <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
                <img src={WORKDAY_PARTNER_LOGO} alt="Workday Services Partner" style={{ height: 56, objectFit: "contain", display: "block" }} />
                <img src={WORKDAY_SALES_LOGO} alt="Workday Sales Partner" style={{ height: 56, objectFit: "contain", display: "block" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 64 }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Navigation</div>
                {NAV_LINKS.map(l => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 10, padding: 0, textAlign: "left", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
                    {l.label}
                  </button>
                ))}
              </div>

              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Services</div>
                {SERVICES.map(s => (
                  <div key={s.title} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 10 }}>{s.title}</div>
                ))}
              </div>

              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Connect</div>
                <a
                  href="https://au.linkedin.com/company/hc2-consulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: "0.8rem" }}>© {new Date().getFullYear()} HC2 Consulting. All rights reserved.</p>
            <p style={{ fontSize: "0.8rem" }}>Workday Services Partner · Australia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
