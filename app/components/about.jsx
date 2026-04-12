"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const RED   = "#FF2800";
const BLACK = "#080808";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneyAbout({ data }) {
  const skills = data?.skills || [];
  const flatSkills = skills.flatMap?.((s) =>
    typeof s === "object" && s.items ? s.items : [s]
  ) || skills;

  const socials = [
    data?.github   && { icon: <FaGithub size={14} />,      href: data.github,            label: data.github.split("/").pop() },
    data?.linkedin && { icon: <FaLinkedin size={14} />,    href: data.linkedin,          label: "LinkedIn" },
    data?.email    && { icon: <FaEnvelope size={14} />,    href: `mailto:${data.email}`, label: data.email },
    data?.website  && { icon: <FaGlobe size={14} />,       href: data.website,           label: "Website" },
    data?.location && { icon: <FaMapMarkerAlt size={14} />, href: null,                  label: data.location },
  ].filter(Boolean);

  return (
    <section id="about" style={{ background: "#0f0f0f", borderTop: `3px solid ${RED}` }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "5rem" }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, color: RED, textTransform: "uppercase", letterSpacing: "0.3em" }}>01</span>
          <div style={{ width: "48px", height: "2px", background: RED }} />
          <span style={{ fontSize: "10px", fontWeight: 900, color: GREY, textTransform: "uppercase", letterSpacing: "0.3em" }}>The Story</span>
        </motion.div>

        {/* Big statement */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          style={{
            fontSize: "clamp(2.5rem, 5.5vw, 6rem)",
            fontWeight: 900, textTransform: "uppercase",
            letterSpacing: "-0.03em", lineHeight: 0.9,
            color: WHITE, margin: "0 0 1.5rem",
          }}
        >
          I Don't Follow<br />
          <span style={{ color: RED }}>Trends. I Set Them.</span>
        </motion.h2>

        <div style={{ width: "60px", height: "3px", background: RED, marginBottom: "4rem" }} />

        <div className="nm-two-col" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "6rem", alignItems: "start" }}>
          {/* Left: bio + skills */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: "16px", fontWeight: 400, color: GREY,
                lineHeight: 1.85, margin: "0 0 3.5rem",
              }}
            >
              {data?.bio || "Self-made. Results-driven. Not here to blend in. Built a career the hard way — through relentless execution, bold decisions, and the refusal to settle for average. Every position held was earned. Every result delivered."}
            </motion.p>

            {flatSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div style={{
                  fontSize: "9px", fontWeight: 900, color: RED,
                  textTransform: "uppercase", letterSpacing: "0.3em",
                  marginBottom: "1.2rem",
                }}>The Arsenal (Partial List)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {flatSkills.slice(0, 16).map((skill, i) => {
                    const label = typeof skill === "string" ? skill : skill?.name || String(skill);
                    return (
                      <span key={i} style={{
                        fontSize: "11px", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.1em",
                        color: WHITE, border: "1px solid #2a2a2a",
                        padding: "6px 14px", background: "#141414",
                        transition: "all 0.2s ease", cursor: "default",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = WHITE; }}
                      >{label}</span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: contacts */}
          {socials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div style={{
                border: "1px solid #1a1a1a",
                borderTop: `3px solid ${RED}`,
                padding: "2.5rem",
                background: "#141414",
              }}>
                <div style={{
                  fontSize: "9px", fontWeight: 900, color: RED,
                  textTransform: "uppercase", letterSpacing: "0.3em",
                  marginBottom: "2rem",
                }}>Direct Lines</div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {socials.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "13px 0",
                      borderBottom: i < socials.length - 1 ? "1px solid #1a1a1a" : "none",
                    }}>
                      <div style={{ color: RED, flexShrink: 0 }}>{s.icon}</div>
                      {s.href ? (
                        <a href={s.href} target="_blank" rel="noopener noreferrer"
                          style={{
                            fontSize: "13px", fontWeight: 600, color: GREY,
                            textDecoration: "none", transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = WHITE}
                          onMouseLeave={(e) => e.currentTarget.style.color = GREY}
                        >{s.label}</a>
                      ) : (
                        <span style={{ fontSize: "13px", fontWeight: 600, color: GREY }}>{s.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
