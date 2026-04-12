"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const RED   = "#FF2800";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneyProjects({ data }) {
  const list = data?.projects || [];
  if (!list.length) return null;

  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={{ background: "#0f0f0f", borderTop: `3px solid ${RED}` }}>
      <style>{`
        @media(max-width:768px){
          .nm-proj-inner { padding: 4rem 1.25rem !important; }
          .nm-proj-row { grid-template-columns: 1fr !important; gap: 1rem !important; padding: 1.5rem !important; }
          .nm-proj-index { display: none !important; }
          .nm-proj-links { justify-content: flex-start !important; }
        }
      `}</style>
      <div className="nm-proj-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5rem", flexWrap: "wrap", gap: "1rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "10px", fontWeight: 900, color: RED, textTransform: "uppercase", letterSpacing: "0.3em" }}>04</span>
            <div style={{ width: "48px", height: "2px", background: RED }} />
            <span style={{ fontSize: "10px", fontWeight: 900, color: GREY, textTransform: "uppercase", letterSpacing: "0.3em" }}>The Work</span>
          </div>
          <span style={{ fontSize: "10px", fontWeight: 900, color: "#2a2a2a", textTransform: "uppercase", letterSpacing: "0.2em" }}>
            {list.length} WINS
          </span>
        </motion.div>

        {/* Full-width row list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#1a1a1a" }}>
          {list.map((project, i) => {
            const isHov = hovered === i;
            const tags = Array.isArray(project.stack) ? project.stack
              : Array.isArray(project.tags) ? project.tags
              : Array.isArray(project.technologies) ? project.technologies
              : Array.isArray(project.tech) ? project.tech
              : [];

            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? "#141414" : "#0a0a0a",
                  transition: "background 0.25s ease",
                }}
              >
                {/* Aspect-ratio image */}
                {project.imageBase64 && (
                  <div style={{
                    width: "100%", paddingTop: "38%", position: "relative",
                    overflow: "hidden",
                    borderBottom: `1px solid ${isHov ? RED + "30" : "#1a1a1a"}`,
                    transition: "border-color 0.25s ease",
                  }}>
                    <img
                      src={project.imageBase64}
                      alt={project.title || project.name}
                      style={{
                        position: "absolute", inset: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center top",
                        display: "block",
                        opacity: isHov ? 1 : 0.75,
                        filter: "brightness(0.9) contrast(1.05) saturate(0.9)",
                        transition: "opacity 0.25s ease",
                      }}
                    />
                    {/* Red tint on hover */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(to top, rgba(255,40,0,${isHov ? "0.12" : "0"}) 0%, transparent 50%)`,
                      transition: "background 0.25s ease",
                      pointerEvents: "none",
                    }} />
                  </div>
                )}

                <div
                  className="nm-proj-row"
                  style={{
                    padding: "2.2rem 2.5rem",
                    display: "grid",
                    gridTemplateColumns: "72px 1fr auto",
                    gap: "2rem", alignItems: "center",
                    borderLeft: `3px solid ${isHov ? RED : "transparent"}`,
                    transition: "border-color 0.25s ease",
                    cursor: "default",
                  }}
                >
                  {/* Index */}
                  <div className="nm-proj-index" style={{
                    fontSize: "40px", fontWeight: 900,
                    color: isHov ? RED : "#1a1a1a",
                    letterSpacing: "-0.04em", lineHeight: 1,
                    transition: "color 0.25s ease",
                    userSelect: "none",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 style={{
                      fontSize: "20px", fontWeight: 900,
                      textTransform: "uppercase", letterSpacing: "-0.01em",
                      color: isHov ? WHITE : GREY,
                      marginBottom: "0.5rem", transition: "color 0.25s ease",
                    }}>
                      {project.title || project.name || ""}
                    </h3>
                    {project.description && (
                      <p style={{
                        fontSize: "13.5px", color: isHov ? GREY : "#444",
                        lineHeight: 1.65, margin: "0 0 1rem",
                        maxWidth: "600px", fontWeight: 400,
                        transition: "color 0.25s ease",
                      }}>
                        {project.description}
                      </p>
                    )}
                    {tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {tags.map((tag, j) => (
                          <span key={j} style={{
                            fontSize: "9px", fontWeight: 900,
                            textTransform: "uppercase", letterSpacing: "0.14em",
                            color: isHov ? RED : "#333",
                            border: `1px solid ${isHov ? RED + "50" : "#1a1a1a"}`,
                            padding: "3px 10px",
                            transition: "all 0.25s ease",
                          }}>
                            {typeof tag === "string" ? tag : tag?.name || String(tag)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="nm-proj-links" style={{ display: "flex", gap: "10px" }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        style={{
                          width: "38px", height: "38px",
                          border: `1px solid ${isHov ? RED + "60" : "#1a1a1a"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: isHov ? RED : "#333", textDecoration: "none",
                          transition: "all 0.25s ease",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={14} />
                      </a>
                    )}
                    {(project.live || project.url || project.link || project.demo) && (
                      <a href={project.live || project.url || project.link || project.demo} target="_blank" rel="noopener noreferrer"
                        style={{
                          width: "38px", height: "38px",
                          border: `1px solid ${isHov ? RED + "60" : "#1a1a1a"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: isHov ? RED : "#333", textDecoration: "none",
                          transition: "all 0.25s ease",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
