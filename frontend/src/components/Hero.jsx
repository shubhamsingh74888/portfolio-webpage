import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1,
      dur: Math.random() * 4 + 2,
      delay: -Math.random() * 6,
    })), []);

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%,100%{opacity:0.1;transform:scale(0.8)}
          50%{opacity:0.9;transform:scale(1.3);box-shadow:0 0 8px 2px rgba(100,200,255,0.5)}
        }
      `}</style>
      {stars.map(s => (
        <div key={s.id} className="absolute rounded-full bg-blue-100" style={{
          left: s.left, top: s.top,
          width: `${s.size}px`, height: `${s.size}px`,
          animation: `twinkle ${s.dur}s infinite ease-in-out ${s.delay}s`,
        }} />
      ))}
    </>
  );
}

function Cloud({ top, left, scale, dur, delay }) {
  return (
    <div className="absolute pointer-events-none" style={{
      top, left, transform: `scale(${scale})`,
      animation: `cloudDrift ${dur}s infinite ease-in-out ${delay}s`,
    }}>
      <div className="relative" style={{ width: 140, height: 60 }}>
        <div className="absolute bg-white rounded-full opacity-95" style={{ width: 80, height: 40, bottom: 0, left: 20 }} />
        <div className="absolute bg-white rounded-full opacity-90" style={{ width: 55, height: 55, bottom: 14, left: 30 }} />
        <div className="absolute bg-white rounded-full opacity-95" style={{ width: 40, height: 38, bottom: 10, left: 68 }} />
        <div className="absolute bg-white rounded-full opacity-85" style={{ width: 35, height: 32, bottom: 18, left: 8 }} />
        <div className="absolute bg-white rounded-sm opacity-95" style={{ width: 120, height: 22, bottom: 0, left: 0, borderRadius: 4 }} />
      </div>
    </div>
  );
}

export default function Hero() {
  const { isDarkMode } = useTheme();

  const floatingAnimation = (delay, yOffset, baseRotation) => ({
    y: [0, yOffset, 0],
    rotate: [baseRotation, baseRotation + 6, baseRotation - 3, baseRotation],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
  });

  return (
    <section className={`relative min-h-screen overflow-hidden flex flex-col items-center justify-center font-sans pt-24 pb-16 transition-colors duration-500 ${
      isDarkMode
        ? 'bg-[#050810] text-white'
        : 'text-[#0f2a4a]'
    }`}
    style={!isDarkMode ? {
      background: 'linear-gradient(180deg, #7ec8e3 0%, #a8daf0 40%, #d4edf9 75%, #e8f5fb 100%)'
    } : {}}>

      {/* Dark: stars */}
      {isDarkMode && (
        <div className="absolute inset-0 z-0 opacity-80 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#170c32] via-[#050810] to-[#020408]">
          <StarField />
        </div>
      )}

      {/* Light: sun + clouds */}
      {!isDarkMode && (
        <>
          <style>{`
            @keyframes sunpulse {
              0%,100%{box-shadow:0 0 35px 12px rgba(255,215,0,0.4)}
              50%{box-shadow:0 0 55px 22px rgba(255,215,0,0.6)}
            }
            @keyframes cloudDrift {
              0%,100%{transform:translateX(0) scale(var(--cs,1))}
              50%{transform:translateX(18px) scale(var(--cs,1))}
            }
          `}</style>
          {/* Sun */}
          <div className="absolute z-0 rounded-full" style={{
            top: 40, right: 80, width: 72, height: 72,
            background: 'radial-gradient(circle, #ffe066 35%, #ffd700 65%, #ffb700 100%)',
            animation: 'sunpulse 4s infinite ease-in-out',
          }} />
          {/* Clouds */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Cloud top="30px"  left="5%"  scale={1}    dur={6} delay={0}    />
            <Cloud top="80px"  left="60%" scale={0.65} dur={8} delay={-2}   />
            <Cloud top="150px" left="15%" scale={0.8}  dur={7} delay={-4}   />
            <Cloud top="55px"  left="35%" scale={0.55} dur={9} delay={-1.5} />
            <Cloud top="200px" left="70%" scale={1.1}  dur={7} delay={-3}   />
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <p className={`text-sm tracking-widest uppercase mb-4 font-medium ${isDarkMode ? 'text-[#22d3ee]' : 'text-[#1d6fa4]'}`}>
          Cloud Support Engineer
        </p>

        <h1 className={`text-6xl md:text-8xl font-extrabold tracking-tight leading-none mb-2 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400' : 'text-[#0f2a4a]'}`}>
          Shubham<br />
          <span className={isDarkMode ? 'text-[#22d3ee]' : 'text-[#1a7dc4]'}>Singh</span>
        </h1>

        <p className={`mt-6 mb-10 text-sm md:text-base tracking-wide max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-[#334155]'}`}>
          Troubleshooting AWS infrastructure, Kubernetes clusters, and CI/CD pipelines. Immediate joiner focused on root cause analysis and automation.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['AWS', 'EKS', 'Terraform', 'Jenkins', 'Docker', 'Python', 'Linux'].map((tech) => (
            <span key={tech} className={`px-4 py-1.5 text-xs font-medium rounded-md backdrop-blur-sm ${
              isDarkMode
                ? 'text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/20'
                : 'text-[#0e5a8a] bg-[#0e5a8a]/10 border border-[#0e5a8a]/25'
            }`}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#projects" className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full transition-colors ${
            isDarkMode
              ? 'bg-[#22d3ee] text-gray-900 hover:bg-[#1fb8d0]'
              : 'bg-[#1a7dc4] text-white hover:bg-[#145f96]'
          }`}>
            View projects <ArrowDownIcon className="w-4 h-4" />
          </a>
          <a href="https://github.com/shubhamsingh74888" target="_blank" rel="noreferrer"
            className={`flex items-center gap-2 px-6 py-3 border rounded-full transition-colors ${
              isDarkMode
                ? 'border-gray-600 bg-black/30 backdrop-blur-sm hover:bg-gray-800 text-white'
                : 'border-[#1a7dc4]/40 bg-white/40 backdrop-blur-sm hover:bg-white/70 text-[#0f2a4a]'
            }`}>
            GitHub <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div animate={floatingAnimation(0, -40, -8)}
        className="hidden lg:block absolute left-[8%] top-[30%] w-72 rounded-xl shadow-2xl p-5 z-20 backdrop-blur-md"
        style={{ background: isDarkMode ? 'rgba(15,20,35,0.8)' : 'rgba(255,255,255,0.75)', border: isDarkMode ? '1px solid #374151' : '1px solid rgba(26,125,196,0.2)' }}>
        <div className="flex gap-2 mb-4"><div className="w-3 h-3 rounded-full bg-red-500"/><div className="w-3 h-3 rounded-full bg-yellow-500"/><div className="w-3 h-3 rounded-full bg-green-500"/></div>
        <div className="text-xs font-mono space-y-2">
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>wanderlust-infra</p>
          <p><span className="text-[#22d3ee]">terraform</span> <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>apply</span></p>
          <p className="text-green-500">✓ 41 resources added</p>
          <p className="mt-2"><span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>ap-south-1</span> <span className="text-yellow-400">ready</span></p>
        </div>
      </motion.div>

      <motion.div animate={floatingAnimation(1.2, -50, 5)}
        className="hidden lg:block absolute right-[10%] top-[20%] w-64 rounded-xl shadow-2xl p-5 z-20 backdrop-blur-md"
        style={{ background: isDarkMode ? 'rgba(10,15,24,0.8)' : 'rgba(255,255,255,0.75)', border: isDarkMode ? '1px solid #1f2937' : '1px solid rgba(26,125,196,0.2)' }}>
        <span className="text-[10px] text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-1 rounded">Automation</span>
        <h3 className={`text-sm font-bold mt-3 mb-1 ${isDarkMode ? 'text-white' : 'text-[#0f2a4a]'}`}>Battery RUL Prediction</h3>
        <p className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Python → Pandas → XGBoost</p>
        <p className="text-2xl font-bold text-[#22d3ee]">40%</p>
        <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>reduction in manual effort</p>
      </motion.div>
    </section>
  );
}
