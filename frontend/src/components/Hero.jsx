import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  // 1. Amplified floating animation (More vertical movement + subtle rotation drift)
  const floatingAnimation = (delay, yOffset, baseRotation) => ({
    y: [0, yOffset, 0],
    rotate: [baseRotation, baseRotation + 4, baseRotation - 2, baseRotation],
    transition: {
      duration: 8, // Smooth, floaty duration
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }
  });

  // 2. Generate random stars for the background
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // Sizes between 1px and 3px
      twinkleDuration: Math.random() * 3 + 2, // Twinkle speed: 2s to 5s
      fallDuration: Math.random() * 30 + 20, // Falling speed: 20s to 50s
      delay: -Math.random() * 30, // Random start times so they don't fall together
    }));
  }, []);

  return (
    <section className="relative min-h-screen bg-[#080c12] overflow-hidden flex flex-col items-center justify-center font-sans text-white pt-20">
      
      {/* Custom CSS for Falling & Blinking Stars */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 8px 2px rgba(255,255,255,0.8); }
          }
          @keyframes fall {
            0% { transform: translateY(-10vh) translateX(0); }
            100% { transform: translateY(110vh) translateX(5vw); }
          }
        `}
      </style>

      {/* Animated Starfield Background */}
      <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#080c12] to-[#080c12]">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `
                twinkle ${star.twinkleDuration}s infinite ease-in-out ${star.delay}s,
                fall ${star.fallDuration}s infinite linear ${star.delay}s
              `,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-8">
        <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">Building Since 2024</p>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none mb-2">
          Shubham
          <br />
          <span className="text-[#22d3ee]">Singh</span>
        </h1>
        
        <p className="text-gray-400 mt-6 mb-10 text-sm md:text-base tracking-wide">
          DevOps & Cloud Engineer • AWS • Kubernetes • GitOps
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Terraform', 'Jenkins', 'ArgoCD', 'EKS', 'Docker', 'Prometheus', 'Grafana'].map((tech) => (
            <span key={tech} className="px-4 py-1.5 text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/20 rounded-md">
              {tech}
            </span>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex items-center gap-4">
          <a href="#projects" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
            View projects
            <ArrowDownIcon className="w-4 h-4" />
          </a>
          <a href="https://github.com/shubhamsingh74888" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full hover:bg-gray-800 transition-colors">
            GitHub
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Floating Card 1: Terraform (Left) */}
      <motion.div 
        animate={floatingAnimation(0, -35, -6)} 
        className="hidden lg:block absolute left-[10%] top-[35%] w-72 bg-[#111827] border border-gray-700 rounded-xl shadow-2xl p-5 z-20"
      >
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-mono space-y-2">
          <p className="text-gray-400">wanderlust-infra</p>
          <p><span className="text-[#22d3ee]">terraform</span> <span className="text-gray-400">apply</span></p>
          <p className="text-green-400">✓ 41 resources added</p>
          <p className="text-green-400">✓ EKS cluster active</p>
          <p className="mt-4"><span className="text-gray-400">ap-south-1</span> <span className="text-yellow-400">ready</span></p>
        </div>
      </motion.div>

      {/* Floating Card 2: Jenkins Pipeline (Top Right) */}
      <motion.div 
        animate={floatingAnimation(1.5, -45, 3)}
        className="hidden lg:block absolute right-[12%] top-[25%] w-64 bg-[#0f1923] border border-gray-800 rounded-xl shadow-2xl p-5 z-20"
      >
        <span className="text-[10px] text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-1 rounded">CI/CD</span>
        <h3 className="text-sm font-bold mt-3 mb-1">Jenkins Pipeline</h3>
        <p className="text-xs text-gray-500 mb-4">SonarQube → Trivy<br/>→ ECR → ArgoCD sync</p>
        <p className="text-3xl font-bold text-[#22d3ee]">0</p>
        <p className="text-[10px] text-gray-500">deploy failures this week</p>
      </motion.div>

      {/* Floating Card 3: EKS Health (Bottom Right) */}
      <motion.div 
        animate={floatingAnimation(0.8, -25, -2)}
        className="hidden lg:block absolute right-[15%] bottom-[20%] w-56 bg-[#0d1b13] border border-green-900/50 rounded-xl shadow-2xl p-5 z-20"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_1px_#22c55e]"></div>
          <span className="text-xs text-green-500 font-semibold">EKS healthy</span>
        </div>
        <div className="space-y-2 font-mono text-[10px]">
          <div className="flex justify-between"><span className="text-gray-400">CPU</span><span>18%</span></div>
          <div className="flex justify-between"><span className="text-gray-400">pods</span><span>6/6</span></div>
          <div className="flex justify-between"><span className="text-gray-400">ALB 5xx</span><span>0</span></div>
          <div className="flex justify-between"><span className="text-gray-400">alerts</span><span>0 firing</span></div>
        </div>
      </motion.div>
    </section>
  );
}
