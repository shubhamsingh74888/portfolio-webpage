import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SkillsOverview from "../components/SkillsOverview";
import FeaturedProjects from "../components/FeaturedProjects";
import Testimonials from "../components/Testimonials";

function TopologyBackground() {
  const nodes = [
    { cx: 80,  cy: 60,  r: 18 },
    { cx: 280, cy: 40,  r: 14 },
    { cx: 500, cy: 80,  r: 20 },
    { cx: 720, cy: 50,  r: 16 },
    { cx: 950, cy: 70,  r: 14 },
    { cx: 160, cy: 200, r: 16 },
    { cx: 380, cy: 180, r: 22 },
    { cx: 600, cy: 210, r: 18 },
    { cx: 820, cy: 190, r: 14 },
    { cx: 1050,cy: 200, r: 20 },
    { cx: 60,  cy: 340, r: 14 },
    { cx: 240, cy: 360, r: 18 },
    { cx: 460, cy: 330, r: 16 },
    { cx: 680, cy: 350, r: 22 },
    { cx: 900, cy: 340, r: 14 },
    { cx: 1100,cy: 360, r: 18 },
    { cx: 140, cy: 480, r: 20 },
    { cx: 360, cy: 500, r: 14 },
    { cx: 580, cy: 470, r: 18 },
    { cx: 800, cy: 490, r: 16 },
    { cx: 1020,cy: 480, r: 14 },
    { cx: 320, cy: 620, r: 16 },
    { cx: 540, cy: 600, r: 20 },
    { cx: 760, cy: 620, r: 14 },
    { cx: 980, cy: 610, r: 18 },
  ];

  const edges = [
    [0,1],[1,2],[2,3],[3,4],
    [0,5],[1,5],[1,6],[2,6],[2,7],[3,7],[3,8],[4,8],[4,9],
    [5,10],[5,11],[6,11],[6,12],[7,12],[7,13],[8,13],[8,14],[9,14],[9,15],
    [10,16],[11,16],[11,17],[12,17],[12,18],[13,18],[13,19],[14,19],[14,20],[15,20],
    [16,21],[17,21],[17,22],[18,22],[19,22],[19,23],[20,23],[20,24],
    [21,22],[22,23],[23,24],
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.13 }}
      >
        {/* Dashed edges */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="6,5"
          />
        ))}

        {/* Nodes - outer ring */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r} fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
            <circle cx={n.cx} cy={n.cy} r={n.r * 0.28} fill="#3b82f6"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <Hero />
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
        <TopologyBackground />
        <div className="relative z-10">
          <Stats />
          <SkillsOverview />
          <FeaturedProjects />
          <Testimonials />
        </div>
      </div>
    </main>
  );
}
