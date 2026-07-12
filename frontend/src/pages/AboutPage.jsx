import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Your Profile Picture */}
        <img 
          src="/profile.jpg" 
          alt="Shubham Singh" 
          className="w-48 h-48 rounded-full shadow-lg object-cover" 
        />
        
        <div>
          <p className="text-gray-300 leading-relaxed mb-4">
            I am a Cloud Support Engineer and DevOps practitioner with a strong foundation in AWS infrastructure, Kubernetes, and CI/CD automation. Currently pursuing my MCA at Garden City University (expected June 2026), I specialize in troubleshooting complex deployments, optimizing cloud costs, and implementing robust monitoring solutions.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Recently, I completed a Technical Internship at CSIR-IIP (Govt. of India), where I built an end-to-end Machine Learning pipeline for battery life prediction, reducing manual data handling by 40% through Bash and Python automation. I am passionate about root cause analysis and building reliable, scalable systems.
          </p>
        </div>
      </div>
    </div>
  );
}
