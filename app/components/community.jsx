"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const RED   = "#FF2800";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneyCommunity({ data }) {
  const list = data?.community || data?.volunteering || data?.involvement || [];
  if (!list.length) return null;

  return (
    <section id="community" style={{ background: "#0a0a0a", borderTop: `1px solid #1a1a1a` }}>
      <style>{`@media(max-width:768px){.nm-comm-inner{padding:4rem 1.25rem!important;} .nm-comm-grid{grid-template-columns:1fr!important;}}`}</style>
      <div className="nm-comm-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "5rem" }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, color: RED, textTransform: "uppercase", letterSpacing: "0.3em" }}>06</span>
          <div style={{ width: "48px", height: "2px", background: RED }} />
          <span style={{ fontSize: "10px", fontWeight: 900, color: GREY, textTransform: "uppercase", letterSpacing: "0.3em" }}>The Impact</span>
        </motion.div>

        <div className="nm-comm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2px", background: "#1a1a1a" }}>
          {list.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{
                background: "#0f0f0f",
                padding: "2.5rem",
                borderTop: `3px solid ${RED}`,
                display: "flex", flexDirection: "column",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#141414"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#0f0f0f"}
            >
              <h3 style={{
                fontSize: "16px", fontWeight: 900,
                textTransform: "uppercase", color: WHITE,
                margin: "0 0 6px", letterSpacing: "0.02em",
              }}>
                {item.title || item.role || item.name}
              </h3>
              {(item.organization || item.company) && (
                <div style={{ fontSize: "11px", fontWeight: 700, color: RED, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "1rem" }}>
                  {item.organization || item.company}
                </div>
              )}
              {item.description && (
                <p style={{ fontSize: "13px", color: GREY, lineHeight: 1.7, margin: "0 0 1rem", fontWeight: 400, flex: 1 }}>
                  {item.description}
                </p>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #1a1a1a" }}>
                {(item.duration || item.years || item.period) && (
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    {item.duration || item.years || item.period}
                  </span>
                )}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      fontSize: "10px", fontWeight: 900, color: RED,
                      textDecoration: "none", textTransform: "uppercase",
                      letterSpacing: "0.15em", transition: "opacity 0.2s",
                      marginLeft: "auto",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    See It <FaExternalLinkAlt size={9} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
