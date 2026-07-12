import React from 'react';

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Experience</h2>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold">Technical Intern - AI/ML & Automation</h3>
        <p className="text-blue-400">CSIR-IIP, Govt. of India | Dec 2025 - Mar 2026</p>
        <ul className="list-disc ml-5 mt-4 text-gray-300">
          <li>Built Battery RUL prediction pipeline on NASA PCoE dataset.</li>
          <li>Automated ETL pipelines using Python and Bash, reducing manual effort by 40%.</li>
        </ul>
      </div>
    </div>
  );
}
