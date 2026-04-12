"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";

const RED   = "#FF2800";
const BLACK = "#080808";
const WHITE = "#fafafa";
const GREY  = "#888888";

export default function NewMoneyContact({ data }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "#141414",
    border: "none",
    borderBottom: `2px solid ${focused === field ? RED : "#1a1a1a"}`,
    color: WHITE,
    fontSize: "14px",
    padding: "14px 0",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit", fontWeight: 400,
    boxSizing: "border-box",
    letterSpacing: "0.02em",
  });

  const socials = [
    data?.github   && { icon: <FaGithub size={16} />,   href: data.github,            label: "GitHub" },
    data?.linkedin && { icon: <FaLinkedin size={16} />,  href: data.linkedin,          label: "LinkedIn" },
    data?.email    && { icon: <FaEnvelope size={16} />,  href: `mailto:${data.email}`, label: "Email" },
  ].filter(Boolean);

  return (
    <section id="contact" style={{ background: "#080808", borderTop: `3px solid ${RED}` }}>
      <style>{`@media(max-width:768px){.nm-contact-inner{padding:4rem 1.25rem 9rem!important;} .nm-contact-form{padding:2rem 1.25rem!important;}}`}</style>
      <div className="nm-contact-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem 9rem" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "3.5rem" }}
        >
          <span style={{ fontSize: "10px", fontWeight: 900, color: RED, textTransform: "uppercase", letterSpacing: "0.3em" }}>07</span>
          <div style={{ width: "48px", height: "2px", background: RED }} />
          <span style={{ fontSize: "10px", fontWeight: 900, color: GREY, textTransform: "uppercase", letterSpacing: "0.3em" }}>Let's Talk</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(2.8rem, 6vw, 7rem)",
            fontWeight: 900, textTransform: "uppercase",
            letterSpacing: "-0.04em", color: WHITE,
            lineHeight: 0.88, margin: "0 0 6rem",
          }}
        >
          You Want Me<br />
          <span style={{ color: RED }}>On Your Team.</span>
        </motion.h2>

        <div className="nm-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p style={{
              fontSize: "15px", fontWeight: 400, color: GREY,
              lineHeight: 1.85, maxWidth: "380px", margin: "0 0 3rem",
              borderLeft: `3px solid ${RED}`, paddingLeft: "1.4rem",
            }}>
              I don't do mediocre. If you've got a serious opportunity — a real challenge that needs real results — let's talk.
            </p>

            {data?.email && (
              <a href={`mailto:${data.email}`}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontSize: "14px", fontWeight: 700, color: WHITE,
                  textDecoration: "none", marginBottom: "2.5rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = RED}
                onMouseLeave={(e) => e.currentTarget.style.color = WHITE}
              >
                <FaArrowRight size={12} style={{ color: RED }} />
                {data.email}
              </a>
            )}

            {socials.length > 0 && (
              <div style={{ display: "flex", gap: "10px" }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "42px", height: "42px",
                      border: "1px solid #1a1a1a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: GREY, textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED; e.currentTarget.style.background = "rgba(255,40,0,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.color = GREY; e.currentTarget.style.background = "transparent"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="nm-contact-form"
            style={{ background: "#0f0f0f", padding: "3rem", border: "1px solid #1a1a1a" }}
          >
            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{
                  width: "60px", height: "60px", background: RED,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", fontSize: "24px", color: WHITE, fontWeight: 900,
                }}>✓</div>
                <h3 style={{ fontSize: "20px", fontWeight: 900, color: WHITE, textTransform: "uppercase", marginBottom: "0.5rem", letterSpacing: "0.04em" }}>
                  Message Received.
                </h3>
                <p style={{ fontSize: "13px", color: GREY }}>I'll be in touch. Expect a direct reply.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.25em", color: GREY, marginBottom: "8px" }}>Your Name</label>
                  <input type="text" placeholder="First Last" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={inputStyle("name")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.25em", color: GREY, marginBottom: "8px" }}>Email</label>
                  <input type="email" placeholder="you@company.com" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    style={inputStyle("email")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.25em", color: GREY, marginBottom: "8px" }}>What Do You Need?</label>
                  <textarea rows={4} placeholder="Make it worth my time…" required
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), resize: "none" }} />
                </div>
                <button type="submit" disabled={status === "sending"}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    background: RED, color: WHITE, border: "none",
                    padding: "15px 40px",
                    fontSize: "11px", fontWeight: 900,
                    textTransform: "uppercase", letterSpacing: "0.2em",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.6 : 1,
                    transition: "all 0.2s ease", width: "fit-content",
                    boxShadow: status === "sending" ? "none" : "0 6px 24px rgba(255,40,0,0.3)",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.background = "#D42200"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = RED; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {status === "sending" ? "Sending…" : <>Send It <FaArrowRight size={11} /></>}
                </button>
                {status === "error" && (
                  <p style={{ fontSize: "12px", color: RED, margin: 0 }}>Something went wrong. Try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "5rem", paddingTop: "2rem",
          borderTop: "1px solid #1a1a1a",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontSize: "10px", color: "#2a2a2a", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
            © {new Date().getFullYear()} {data?.name?.toUpperCase() || ""} — ALL RIGHTS RESERVED
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "16px", height: "3px", background: RED }} />
            <span style={{ fontSize: "9px", fontWeight: 900, color: "#2a2a2a", textTransform: "uppercase", letterSpacing: "0.2em" }}>NEW MONEY</span>
          </div>
          <span style={{ fontSize: "10px", color: "#2a2a2a", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
            Built with <span style={{ fontWeight: 900, color: RED }}>Salience</span>
          </span>
        </div>
      </div>
    </section>
  );
}
