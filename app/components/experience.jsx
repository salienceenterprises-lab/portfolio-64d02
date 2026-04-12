"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RED   = "#FF2800";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneyExperience({ data }) {
  const list = data?.experience || [];
  if (!list.length) return null;

  const [active, setActive] = useState(0);
  const job = list[active];

  // Resolve bullet points: highlights (builder) → responsibilities → bullets
  const bullets = Array.isArray(job?.highlights) && job.highlights.length
    ? job.highlights
    : Array.isArray(job?.responsibilities) && job.responsibilities.length
    ? job.responsibilities
    : Array.isArray(job?.bullets) && job.bullets.length
    ? job.bullets
    : [];

  // Stack tags from builder field
  const stack = Array.isArray(job?.stack) ? job.stack
    : Array.isArray(job?.tags) ? job.tags
    : Array.isArray(job?.tech) ? job.tech
    : [];

  return (
    <section id="experience" style={{ background: "#0a0a0a", borderTop: `1px solid #1a1a1a` }}>
      <style>{`
        @media(max-width:768px){
          .nm-exp-inner { padding: 4rem 1.25rem !important; }
          .nm-exp-tabs { grid-template-columns: 1fr !important; border: 1px solid #1a1a1a; }
          .nm-exp-tabs > div:first-child { border-right: none !important; border-bottom: 1px solid #1a1a1a; }
          .nm-exp-detail { padding: 1.5rem !important; }
        }
      `}</style>
      <div className="nm-exp-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "5rem" }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, color: RED, textTransform: "uppercase", letterSpacing: "0.3em" }}>03</span>
          <div style={{ width: "48px", height: "2px", background: RED }} />
          <span style={{ fontSize: "10px", fontWeight: 900, color: GREY, textTransform: "uppercase", letterSpacing: "0.3em" }}>The Record</span>
        </motion.div>

        <div className="nm-exp-tabs" style={{ display: "grid", gridTemplateColumns: "280px 1fr", border: "1px solid #1a1a1a" }}>
          {/* Left: company tabs */}
          <div style={{ borderRight: "1px solid #1a1a1a" }}>
            {list.map((item, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: active === i ? "#141414" : "transparent",
                  border: "none",
                  borderLeft: active === i ? `3px solid ${RED}` : "3px solid transparent",
                  borderBottom: "1px solid #1a1a1a",
                  padding: "1.6rem 1.8rem",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                <div style={{
                  fontSize: "13px", fontWeight: 900,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  color: active === i ? WHITE : GREY,
                  marginBottom: "4px", transition: "color 0.2s",
                }}>
                  {item.company || item.employer || item.organization || ""}
                </div>
                <div style={{
                  fontSize: "10px", fontWeight: 700,
                  color: active === i ? "rgba(255,40,0,0.7)" : "#3a3a3a",
                  textTransform: "uppercase", letterSpacing: "0.12em",
                  transition: "color 0.2s",
                }}>
                  {item.period || item.duration || item.years || ""}
                </div>
              </button>
            ))}
          </div>

          {/* Right: detail */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="nm-exp-detail" style={{ padding: "2.8rem 3rem", background: "#0f0f0f" }}
            >
              <div style={{
                fontSize: "10px", fontWeight: 900, color: RED,
                textTransform: "uppercase", letterSpacing: "0.25em",
                marginBottom: "0.6rem",
              }}>
                {job?.role || job?.title || job?.position || ""}
              </div>
              <h3 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                fontWeight: 900, color: WHITE,
                textTransform: "uppercase", letterSpacing: "-0.02em",
                margin: "0 0 2rem", lineHeight: 0.95,
              }}>
                {job?.company || job?.employer || job?.organization || ""}
              </h3>
              <div style={{ width: "40px", height: "3px", background: RED, marginBottom: "2rem" }} />

              {/* Description as paragraph */}
              {job?.description && (
                <p style={{
                  fontSize: "14px", color: GREY, lineHeight: 1.75,
                  marginBottom: bullets.length ? "1.5rem" : 0,
                }}>
                  {job.description}
                </p>
              )}

              {/* Highlight bullets */}
              {bullets.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {bullets.map((b, j) => (
                    <div key={j} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <span style={{ color: RED, fontSize: "10px", marginTop: "5px", flexShrink: 0, fontWeight: 900 }}>→</span>
                      <span style={{ fontSize: "14px", color: GREY, lineHeight: 1.75, fontWeight: 400 }}>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Stack tags */}
              {stack.length > 0 && (
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: "6px",
                  marginTop: "1.8rem", paddingTop: "1.5rem",
                  borderTop: "1px solid #1a1a1a",
                }}>
                  {stack.map((tag, j) => (
                    <span key={j} style={{
                      fontSize: "9px", fontWeight: 900,
                      textTransform: "uppercase", letterSpacing: "0.14em",
                      color: RED, border: `1px solid rgba(255,40,0,0.3)`,
                      padding: "3px 10px",
                    }}>
                      {typeof tag === "string" ? tag : tag?.name || String(tag)}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
