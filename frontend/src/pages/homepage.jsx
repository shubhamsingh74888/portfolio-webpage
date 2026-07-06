import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import SkillsOverview from '../components/SkillsOverview';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';

export default function HomePage() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      {/* 1. Your New Animated Floating Hero */}
      <Hero />
      
      {/* 2. Your Old Scrollable Sections */}
      <div className="bg-white dark:bg-gray-900">
        <Stats />
        <SkillsOverview />
        <FeaturedProjects />
        <Testimonials />
      </div>
    </main>
  );
}
