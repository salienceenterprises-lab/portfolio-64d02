"use client";
import React from "react";
import { motion } from "framer-motion";

const RED   = "#FF2800";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneySkills({ data }) {
  const skills = data?.skills || [];
  if (!skills.length) return null;

  // Normalise: flat string array OR grouped {category, items[]} objects
  const groups = (() => {
    if (typeof skills[0] === "object" && skills[0] !== null && (skills[0].items || skills[0].category || skills[0].skills)) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return [{ category: "The Full Arsenal", items: skills }];
  })();

  return (
    <section id="skills" style={{ background: RED, position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){.nm-skills-inner{padding:4rem 1.25rem!important;} .nm-skills-grid{grid-template-columns:1fr!important;}}`}</style>
      {/* Ghost text */}
      <div style={{
        position: "absolute", top: "-3rem", right: "-1rem",
        fontSize: "clamp(8rem, 18vw, 22rem)",
        fontWeight: 900, color: "rgba(0,0,0,0.1)",
        lineHeight: 1, pointerEvents: "none",
        letterSpacing: "-0.04em", textTransform: "uppercase",
        userSelect: "none",
      }}>
        WINS
      </div>

      <div className="nm-skills-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem", position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4rem" }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.3em" }}>05</span>
          <div style={{ width: "48px", height: "2px", background: "rgba(255,255,255,0.4)" }} />
          <span style={{ fontSize: "10px", fontWeight: 900, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.3em" }}>The Arsenal</span>
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
          Everything I Know,<br />I Deploy Daily.
        </motion.h2>

        <div className="nm-skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px", background: "rgba(0,0,0,0.2)" }}>
          {groups.map((group, gi) => (
            <motion.div key={gi}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              style={{
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
                padding: "2.5rem",
              }}
            >
              <div style={{
                fontSize: "10px", fontWeight: 900, color: WHITE,
                textTransform: "uppercase", letterSpacing: "0.2em",
                marginBottom: "1.8rem", paddingBottom: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              }}>
                {group.category}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {group.items.map((skill, si) => {
                  const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                  return (
                    <div key={si} style={{
                      padding: "9px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", gap: "10px",
                    }}>
                      <span style={{ color: WHITE, fontSize: "9px", fontWeight: 900 }}>→</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em" }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
