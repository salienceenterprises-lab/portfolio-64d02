"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const RED   = "#FF2800";
const BLACK = "#080808";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneyHero({ data }) {
  const hasPhoto     = !!data?.heroImageBase64;
  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;
  const nameParts    = (data?.name || "Portfolio").toUpperCase().split(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  const stats = [
    data?.experience?.length && { label: "Positions Held",   value: `${data.experience.length}+` },
    data?.projects?.length   && { label: "Projects Shipped", value: `${data.projects.length}+`   },
    data?.skills?.length     && { label: "Skills Mastered",  value: `${Math.min((data.skills.flat?.()?.length || data.skills.length), 30)}+` },
  ].filter(Boolean);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: BLACK,
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "65px",
    }}>
      {/* Background red diagonal */}
      {hasPhoto && (
        <div className="nm-bg-panel" style={{
          position: "absolute", top: 0, right: 0,
          width: "42%", height: "100%",
          background: "#0f0f0f",
          borderLeft: `3px solid ${RED}`,
          pointerEvents: "none",
        }} />
      )}

      {/* Large faded "NEW MONEY" watermark */}
      <div style={{
        position: "absolute", bottom: "-2rem", left: "-1rem",
        fontSize: "clamp(6rem, 16vw, 18rem)",
        fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: `1px rgba(255,40,0,0.06)`,
        pointerEvents: "none", userSelect: "none",
        letterSpacing: "-0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        NEW MONEY
      </div>

      <style>{`
        @media(max-width:768px){
          .nm-hero-grid { grid-template-columns: 1fr !important; padding: 2.5rem 1.25rem 5rem !important; gap: 2rem !important; }
          .nm-name-word { font-size: clamp(3rem, 14vw, 5rem) !important; }
          .nm-slogan { max-width: 100% !important; font-size: 14px !important; }
          .nm-cta-row { flex-direction: column !important; gap: 10px !important; }
          .nm-cta-row button, .nm-cta-row a { width: 100% !important; justify-content: center !important; text-align: center !important; }
          .nm-stats { flex-wrap: wrap !important; gap: 1.5rem 0 !important; }
          .nm-stat-item { padding-right: 1.5rem !important; margin-right: 1.5rem !important; min-width: 80px !important; }
          .nm-photo-wrap { min-height: 300px !important; max-height: 420px !important; }
          .nm-bg-panel { display: none !important; }
          .nm-badge span { letter-spacing: 0.12em !important; font-size: 9px !important; }
        }
        @media(max-width:400px){
          .nm-name-word { font-size: clamp(2.6rem, 15vw, 3.5rem) !important; }
        }
      `}</style>
      <div className="nm-hero-grid" style={{
        maxWidth: "1400px", margin: "0 auto",
        padding: "5rem 3rem", width: "100%",
        position: "relative", zIndex: 1,
        display: "grid",
        gridTemplateColumns: hasPhoto ? "1fr 420px" : "1fr",
        gap: "4rem", alignItems: "center",
      }}>
        {/* Left: identity */}
        <div>
          {/* Status badge */}
          <motion.div
            className="nm-badge"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "2rem" }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: RED, color: WHITE,
              fontSize: "10px", fontWeight: 900,
              textTransform: "uppercase", letterSpacing: "0.25em",
              padding: "6px 18px",
            }}>
              <span style={{ width: "6px", height: "6px", background: WHITE, borderRadius: "50%", display: "inline-block" }} />
              {data?.title || "Visionary. Builder. Winner."}
            </span>
          </motion.div>

          {/* Name — massive, stacked */}
          <div style={{ marginBottom: "2.5rem" }}>
            {nameParts.map((word, i) => (
              <motion.div
                key={i}
                className="nm-name-word"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  fontSize: "clamp(4rem, 10vw, 11rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.88,
                  textTransform: "uppercase",
                  color: i === nameParts.length - 1 ? RED : WHITE,
                  display: "block",
                }}
              >
                {word}
              </motion.div>
            ))}
          </div>

          {/* Quote / slogan */}
          {(data?.sloganHeroSection || data?.bio) && (
            <motion.p
              className="nm-slogan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                fontSize: "15px", fontWeight: 500,
                color: GREY, lineHeight: 1.8,
                maxWidth: "500px", margin: "0 0 3rem",
                borderLeft: `3px solid ${RED}`,
                paddingLeft: "1.4rem",
              }}
            >
              {data?.sloganHeroSection || data?.bio?.slice(0, 180) + "…"}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="nm-cta-row"
            style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "3.5rem" }}
          >
            <button onClick={() => scrollTo("contact")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: RED, color: WHITE,
                border: "none", padding: "15px 40px",
                fontSize: "11px", fontWeight: 900,
                textTransform: "uppercase", letterSpacing: "0.2em",
                cursor: "pointer", transition: "all 0.2s ease",
                boxShadow: `0 8px 32px rgba(255,40,0,0.35)`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#D42200"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,40,0,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = RED; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,40,0,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Make It Happen <FaArrowRight size={12} />
            </button>
            <button onClick={() => scrollTo("projects")}
              style={{
                background: "transparent", color: WHITE,
                border: "1px solid #333", padding: "14px 36px",
                fontSize: "11px", fontWeight: 900,
                textTransform: "uppercase", letterSpacing: "0.2em",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = WHITE; }}
            >
              See The Work
            </button>
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  fontSize: "10px", fontWeight: 900,
                  textTransform: "uppercase", letterSpacing: "0.2em",
                  color: "rgba(255,40,0,0.5)", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = RED}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,40,0,0.5)"}
              >
                Download CV ↓
              </a>
            )}
          </motion.div>

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="nm-stats"
              style={{ display: "flex", gap: "0", borderTop: "1px solid #1a1a1a", paddingTop: "2rem" }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="nm-stat-item" style={{
                  paddingRight: "2.5rem", marginRight: "2.5rem",
                  borderRight: i < stats.length - 1 ? "1px solid #1a1a1a" : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                    fontWeight: 900, color: RED,
                    letterSpacing: "-0.04em", lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: "9px", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.18em",
                    color: GREY, marginTop: "5px",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right: photo */}
        {hasPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            style={{ position: "relative", alignSelf: "stretch" }}
          >
            {/* Red top bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: "4px", background: RED, zIndex: 2,
            }} />

            <div className="nm-photo-wrap" style={{
              overflow: "hidden",
              height: "100%", minHeight: "500px",
              border: "1px solid #1a1a1a",
              position: "relative",
            }}>
              <img
                src={data.heroImageBase64}
                alt={data.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top",
                  display: "block",
                  filter: "brightness(0.92) contrast(1.05) saturate(0.9)",
                }}
              />
              {/* Red gradient at bottom */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(255,40,0,0.15) 0%, transparent 40%)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Name plate */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "rgba(8,8,8,0.88)",
              backdropFilter: "blur(8px)",
              padding: "14px 20px",
              borderTop: `3px solid ${RED}`,
            }}>
              <div style={{ fontSize: "14px", fontWeight: 900, color: WHITE, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {data.name}
              </div>
              {data?.title && (
                <div style={{ fontSize: "10px", fontWeight: 700, color: RED, textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "3px" }}>
                  {data.title}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
