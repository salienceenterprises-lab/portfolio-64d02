"use client";
import React from "react";
import portfolioData from "../profile.json";
import NewMoneyNav       from "./components/nav";
import NewMoneyHero      from "./components/hero";
import NewMoneyAbout     from "./components/about";
import NewMoneyEducation from "./components/education";
import NewMoneyExperience from "./components/experience";
import NewMoneyProjects  from "./components/projects";
import NewMoneySkills    from "./components/skills";
import NewMoneyCommunity from "./components/community";
import NewMoneyContact   from "./components/contact";

export default function DeployedPortfolio() {
  const data = portfolioData;

  if (!data) return (
    <div style={{
      minHeight: "100vh", background: "#080808",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontSize: "10px", color: "#333", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 900 }}>
        Loading…
      </span>
    </div>
  );

  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 68px; }
        ::placeholder { color: #2a2a2a; }
        textarea { resize: none; }
        @media (max-width: 1023px) {
          .nm-two-col { grid-template-columns: 1fr !important; }
          .nm-exp-grid { grid-template-columns: 1fr !important; }
          .nm-exp-grid > *:first-child { border-right: none !important; border-bottom: 1px solid #1a1a1a; }
        }
        @media (max-width: 767px) {
          section > div { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>

      <NewMoneyNav       data={data} />
      <NewMoneyHero      data={data} />
      <NewMoneyAbout     data={data} />
      <NewMoneyEducation data={data} />
      <NewMoneyExperience data={data} />
      <NewMoneyProjects  data={data} />
      <NewMoneySkills    data={data} />
      <NewMoneyCommunity data={data} />
      <NewMoneyContact   data={data} />
    </div>
  );
}
