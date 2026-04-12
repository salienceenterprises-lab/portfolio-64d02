"use client";
import React from "react";
import { motion } from "framer-motion";

const RED   = "#FF2800";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneyEducation({ data }) {
  const list = data?.education || [];
  if (!list.length) return null;

  return (
    <section id="education" style={{ background: RED, position: "relative", overflow: "hidden" }}>
      {/* Ghost text */}
      <div style={{
        position: "absolute", bottom: "-2rem", right: "-1rem",
        fontSize: "clamp(8rem, 18vw, 20rem)",
        fontWeight: 900, color: "rgba(0,0,0,0.12)",
        lineHeight: 1, pointerEvents: "none",
        letterSpacing: "-0.04em", textTransform: "uppercase",
        userSelect: "none",
      }}>
        BUILT
      </div>

      <style>{`
        @media(max-width:768px){
          .nm-edu-inner { padding: 4rem 1.25rem !important; }
          .nm-edu-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
          .nm-edu-date { text-align: left !important; }
        }
      `}</style>
      <div className="nm-edu-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem", position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4rem" }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.3em" }}>02</span>
          <div style={{ width: "48px", height: "2px", background: "rgba(255,255,255,0.4)" }} />
          <span style={{ fontSize: "10px", fontWeight: 900, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.3em" }}>The Foundation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
            fontWeight: 900, textTransform: "uppercase",
            letterSpacing: "-0.03em", color: WHITE,
            lineHeight: 0.9, margin: "0 0 4rem",
          }}
        >
          Where It<br />Started.
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.15)" }}>
          {list.map((edu, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="nm-edu-row"
              style={{
                background: "rgba(0,0,0,0.25)",
                padding: "2.2rem 2.5rem",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2rem", alignItems: "start",
                backdropFilter: "blur(4px)",
              }}
            >
              <div>
                <h3 style={{
                  fontSize: "20px", fontWeight: 900,
                  color: WHITE, textTransform: "uppercase",
                  letterSpacing: "-0.01em", margin: "0 0 6px",
                }}>
                  {edu.degree || edu.field || edu.title || ""}
                </h3>
                {(edu.institution || edu.school) && (
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                    {edu.institution || edu.school}
                  </div>
                )}
                {edu.location && (
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 500, marginBottom: "6px", letterSpacing: "0.06em" }}>
                    {edu.location}
                  </div>
                )}
                {edu.description && (
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0.7rem 0 0", fontWeight: 400 }}>
                    {edu.description}
                  </p>
                )}
                {Array.isArray(edu.achievements) && edu.achievements.filter(Boolean).length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginTop: "0.75rem" }}>
                    {edu.achievements.filter(Boolean).map((a, ai) => (
                      <div key={ai} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <span style={{ color: WHITE, fontSize: "9px", fontWeight: 900, marginTop: "5px", flexShrink: 0 }}>→</span>
                        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontWeight: 400 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="nm-edu-date" style={{
                fontSize: "11px", fontWeight: 900,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase", letterSpacing: "0.15em",
                whiteSpace: "nowrap", textAlign: "right",
              }}>
                {edu.period || edu.duration || edu.years || edu.year || ""}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
