"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const RED   = "#FF2800";
const BLACK = "#080808";
const WHITE = "#fafafa";
const GREY  = "#666666";

export default function NewMoneyNav({ data }) {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen,    setMobileOpen]    = useState(false);

  const allLinks = [
    { label: "The Story",   key: "about",      href: "#about"      },
    { label: "Foundation",  key: "education",  href: "#education"  },
    { label: "The Record",  key: "experience", href: "#experience" },
    { label: "The Work",    key: "projects",   href: "#projects"   },
    { label: "The Arsenal", key: "skills",     href: "#skills"     },
    { label: "The Impact",  key: "community",  href: "#community"  },
    { label: "Let's Talk",  key: "email",      href: "#contact"    },
  ];

  const activeLinks = allLinks.filter((l) => {
    if (l.label === "The Story") return true;
    if (l.key === "email") return !!data?.email;
    const d = data?.[l.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  useEffect(() => {
    const ids = ["hero", ...activeLinks.map((l) => l.href.replace("#", ""))];
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sorted = ids
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
        .filter((s) => s.top !== Infinity)
        .sort((a, b) => a.top - b.top);
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].top - 120) { setActiveSection(sorted[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nm-link {
          font-size: 10px; font-weight: 900;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: ${GREY}; text-decoration: none;
          position: relative; padding: 4px 0;
          transition: color 0.2s ease; white-space: nowrap;
        }
        .nm-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: ${RED};
          transition: width 0.25s ease;
        }
        .nm-link:hover { color: ${WHITE}; }
        .nm-link:hover::after,
        .nm-link.active::after { width: 100%; }
        .nm-link.active { color: ${WHITE}; }

        /* Desktop nav links — hidden on mobile */
        .nm-desktop-links { display: flex; align-items: center; gap: 1.6rem; }
        .nm-hamburger { display: none; }

        @media (max-width: 767px) {
          .nm-desktop-links { display: none !important; }
          .nm-hamburger { display: flex !important; }
          .nm-nav-inner { padding: 0 1.25rem !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: BLACK,
        borderBottom: `1px solid ${scrolled ? "#1a1a1a" : "transparent"}`,
        transition: "border-color 0.3s ease",
      }}>
        {/* Ferrari red stripe at top */}
        <div style={{ height: "3px", background: RED }} />

        <div className="nm-nav-inner" style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "0 3rem", height: "62px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="#hero" onClick={(e) => go(e, "#hero")}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              background: RED,
              width: "34px", height: "34px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ color: WHITE, fontSize: "16px", fontWeight: 900, lineHeight: 1 }}>
                {(data?.name || "P").charAt(0).toUpperCase()}
              </span>
            </div>
            <span style={{
              fontSize: "13px", fontWeight: 900,
              color: WHITE, letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {data?.name?.split(" ")[0] || "Portfolio"}
            </span>
          </a>

          {/* Desktop links */}
          <div className="nm-desktop-links">
            {activeLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className={`nm-link${isActive ? " active" : ""}`}>
                  {link.label}
                </a>
              );
            })}
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  background: RED, color: WHITE,
                  fontSize: "10px", fontWeight: 900,
                  textTransform: "uppercase", letterSpacing: "0.18em",
                  textDecoration: "none", padding: "8px 20px",
                  transition: "background 0.2s ease", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#D42200"}
                onMouseLeave={(e) => e.currentTarget.style.background = RED}
              >
                My CV
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nm-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: WHITE, padding: "6px", alignItems: "center", justifyContent: "center" }}
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", top: "65px", left: 0, right: 0, zIndex: 199,
              background: "#0f0f0f", borderBottom: `3px solid ${RED}`,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "0.5rem 1.5rem 1.5rem" }}>
              {activeLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                    style={{
                      display: "block",
                      fontSize: "13px", fontWeight: 900,
                      textTransform: "uppercase", letterSpacing: "0.12em",
                      color: isActive ? RED : WHITE,
                      textDecoration: "none",
                      padding: "14px 0",
                      borderBottom: "1px solid #1a1a1a",
                      borderLeft: isActive ? `3px solid ${RED}` : "3px solid transparent",
                      paddingLeft: "10px",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
              {resumeSource && (
                <a
                  href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                  download="Resume.pdf"
                  style={{
                    display: "block", marginTop: "1.2rem",
                    background: RED, color: WHITE,
                    fontSize: "11px", fontWeight: 900,
                    textTransform: "uppercase", letterSpacing: "0.2em",
                    textDecoration: "none", padding: "14px 20px",
                    textAlign: "center",
                  }}
                >
                  Download CV ↓
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
