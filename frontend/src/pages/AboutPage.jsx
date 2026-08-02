import React, { useState } from 'react';

const devopsProjects = [
  {
    title: 'wanderlust-infra',
    role: 'DevOps Engineer (Self-directed)',
    period: '2025',
    highlights: [
      'Provisioned 41 AWS resources via modular Terraform with S3/DynamoDB remote state locking',
      'Diagnosed and resolved Terraform destroy failures caused by orphaned ALBs',
      'Configured CloudWatch alarms → SNS for sub-60-second incident detection',
    ],
    tech: ['Terraform', 'AWS', 'CloudWatch', 'SNS', 'Jenkins'],
  },
  {
    title: 'Wanderlust-Mega-Project',
    role: 'DevOps Engineer (Self-directed)',
    period: '2025',
    highlights: [
      'Resolved CI/CD race condition between GitOps push and ArgoCD sync',
      'Fixed ArgoCD OutOfSync failures from immutable StorageClass fields',
      'Integrated SonarQube quality gates and Trivy container scanning into Jenkins pipelines',
    ],
    tech: ['Kubernetes', 'ArgoCD', 'Jenkins', 'SonarQube', 'Trivy', 'Helm'],
  },
];

const S = {
  page: {
    background: '#f3f2ef',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  // ── Hero card ──
  heroCard: {
    maxWidth: 860,
    margin: '0 auto',
    background: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,.12)',
  },
  banner: {
    height: 160,
    background: 'linear-gradient(135deg, #0077b5 0%, #004471 60%, #00a0dc 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bannerSvg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18,
  },
  heroBody: { padding: '0 28px 28px', position: 'relative' },
  avatarRing: {
    width: 120, height: 120,
    borderRadius: '50%',
    border: '4px solid #fff',
    background: 'linear-gradient(135deg, #0077b5 30%, #00a0dc)',
    marginTop: -60,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 38, color: '#fff', fontWeight: 700,
    boxShadow: '0 2px 8px rgba(0,0,0,.18)',
    overflow: 'hidden',
    flexShrink: 0,
  },
  heroName: { fontSize: 26, fontWeight: 700, color: '#000', margin: 0, letterSpacing: '-0.3px' },
  pronounBadge: {
    background: '#0077b5', color: '#fff',
    fontSize: 11, fontWeight: 600, borderRadius: 4,
    padding: '2px 7px', letterSpacing: 0.4,
  },
  heroHeadline: { color: '#333', fontSize: 15, margin: '6px 0 0', lineHeight: 1.55, maxWidth: 640 },
  // ── Section card ──
  card: {
    maxWidth: 860,
    margin: '16px auto 0',
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,.10)',
    padding: '36px 44px 40px',
  },
  sectionTitle: {
    display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8,
  },
  sectionH: {
    fontSize: 36, fontWeight: 700, color: '#1a3c4d', margin: 0, letterSpacing: '-0.4px',
    fontFamily: "'Georgia', serif",
  },
  underline: { width: 60, height: 2.5, background: '#0077b5', borderRadius: 2, marginBottom: 24 },
  // ── About text ──
  leadPara: { fontSize: 18, color: '#1a3c4d', lineHeight: 1.8, margin: '0 0 18px', fontFamily: "'Georgia', serif" },
  bodyPara: { fontSize: 15, color: '#444', lineHeight: 1.85, marginBottom: 14 },
  // ── Experience ──
  expCard: {
    border: '1px solid #e5e7eb',
    borderRadius: 14,
    padding: '20px 22px',
    marginBottom: 14,
    background: '#fff',
  },
  expHeader: { display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 },
  expLogo: {
    width: 44, height: 44, borderRadius: 10,
    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, flexShrink: 0, overflow: 'hidden',
  },
  expRole: { fontSize: 15, fontWeight: 700, color: '#111', margin: 0 },
  expCompany: { fontSize: 13, fontWeight: 600, color: '#2563eb', marginTop: 2 },
  expMeta: { display: 'flex', gap: 14, marginTop: 4, flexWrap: 'wrap' },
  expMetaItem: { fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 },
  typeBadge: {
    fontSize: 10, fontWeight: 600, padding: '3px 9px',
    background: '#eff6ff', color: '#2563eb', borderRadius: 20,
    flexShrink: 0,
  },
  descText: { fontSize: 13.5, color: '#4b5563', lineHeight: 1.7, marginBottom: 14 },
  highlightLabel: {
    fontSize: 10.5, fontWeight: 700, color: '#9ca3af',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  highlightItem: { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7 },
  highlightText: { fontSize: 13, color: '#4b5563', lineHeight: 1.6 },
  techRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  techChip: {
    fontSize: 11, padding: '3px 10px',
    background: '#f3f4f6', color: '#374151',
    borderRadius: 6, border: '1px solid #e5e7eb',
  },
  impactRow: {
    display: 'flex', alignItems: 'center', gap: 8,
    paddingTop: 12, marginTop: 12,
    borderTop: '1px solid #f3f4f6',
  },
  impactBadge: {
    fontSize: 11.5, fontWeight: 700,
    color: '#16a34a', background: '#f0fdf4',
    padding: '2px 10px', borderRadius: 20,
  },
  // ── Project cards ──
  projCard: {
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: '16px 18px',
    marginBottom: 12,
    background: '#fafafa',
  },
  projTitle: { fontSize: 13.5, fontWeight: 700, color: '#111', margin: 0 },
  projMeta: { fontSize: 11.5, color: '#6b7280', marginTop: 2 },
  selfBadge: {
    fontSize: 10, padding: '2px 9px',
    background: '#f3f4f6', color: '#4b5563', borderRadius: 20,
  },
  projDot: {
    width: 7, height: 7, borderRadius: '50%',
    background: '#3b82f6', flexShrink: 0, marginTop: 5,
  },
  projText: { fontSize: 12, color: '#4b5563', lineHeight: 1.6 },
  projTechChip: {
    fontSize: 10, padding: '2px 8px',
    background: '#eff6ff', color: '#2563eb',
    border: '1px solid #bfdbfe', borderRadius: 5,
  },
  // ── Education ──
  eduCard: {
    border: '1px solid #e5e7eb',
    borderRadius: 14,
    padding: '18px 20px',
    marginBottom: 12,
    background: '#fff',
  },
  eduDot: {
    width: 14, height: 14, borderRadius: '50%',
    background: '#8b5cf6', border: '3px solid #ede9fe',
    flexShrink: 0, marginTop: 4,
  },
  eduDeg: { fontSize: 14.5, fontWeight: 700, color: '#111', margin: 0 },
  eduOrg: { fontSize: 13, fontWeight: 600, color: '#8b5cf6', marginTop: 2 },
  eduMeta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  eduBadge: {
    fontSize: 10.5, fontWeight: 600,
    padding: '3px 11px', borderRadius: 20,
    background: '#faf5ff', color: '#7c3aed',
    border: '1px solid #e9d5ff', flexShrink: 0,
  },
  // ── Resume ──
  resumeCard: {
    maxWidth: 860,
    margin: '16px auto 40px',
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,.10)',
    padding: '32px 44px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
  },
  resumeTitle: { fontSize: 20, fontWeight: 700, color: '#1a3c4d', margin: 0, fontFamily: "'Georgia', serif" },
  resumeSub: { fontSize: 13.5, color: '#6b7280', marginTop: 4 },
  btnView: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    background: '#fff', color: '#0077b5',
    border: '1.5px solid #0077b5', borderRadius: 8,
    padding: '9px 22px', fontSize: 14, fontWeight: 600,
    textDecoration: 'none', cursor: 'pointer',
  },
  btnDownload: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    background: '#0077b5', color: '#fff',
    border: 'none', borderRadius: 8,
    padding: '9px 22px', fontSize: 14, fontWeight: 600,
    textDecoration: 'none', cursor: 'pointer',
  },
};

export default function AboutPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={S.page}>

      {/* ── 1. LINKEDIN HERO CARD ── */}
      <div style={S.heroCard}>
        <div style={S.banner}>
          <svg style={S.bannerSvg} viewBox="0 0 860 160">
            <circle cx="680" cy="80" r="70" stroke="#fff" strokeWidth="1.5" fill="none"/>
            <circle cx="680" cy="80" r="44" stroke="#fff" strokeWidth="1" fill="none"/>
            <line x1="610" y1="80" x2="200" y2="80" stroke="#fff" strokeWidth="1"/>
            <line x1="500" y1="80" x2="500" y2="40" stroke="#fff" strokeWidth="1"/>
            <circle cx="500" cy="40" r="4" fill="#fff"/>
            <line x1="350" y1="80" x2="350" y2="110" stroke="#fff" strokeWidth="1"/>
            <circle cx="350" cy="110" r="4" fill="#fff"/>
            <line x1="200" y1="80" x2="150" y2="30" stroke="#fff" strokeWidth="1"/>
            <circle cx="150" cy="30" r="4" fill="#fff"/>
          </svg>
        </div>

        <div style={S.heroBody}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={S.avatarRing}>
              {!imgError ? (
                <img
                  src="/shubham-profile-pic.jpg"
                  alt="Shubham Singh"
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <span>SS</span>
              )}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h1 style={S.heroName}>Shubham Singh</h1>
              <span style={S.pronounBadge}>He/Him</span>
            </div>
            <p style={S.heroHeadline}>
              DevOps Engineer · AWS · Kubernetes · Terraform · Jenkins · ArgoCD ·
              Resolved real EKS production incidents · Govt. Intern · ICIEM-2026 Speaker · MCA 2026 · Bangalore
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. ABOUT SECTION ── */}
      <div style={S.card}>
        <div style={S.sectionTitle}>
          <svg width="40" height="40" viewBox="0 0 48 48">
            <polygon points="24,4 46,44 2,44" fill="none" stroke="#0077b5" strokeWidth="2.5"/>
            <polygon points="24,16 38,40 10,40" fill="#e8f4fc" stroke="#00a0dc" strokeWidth="1.5"/>
          </svg>
          <h2 style={S.sectionH}>About me<span style={{ color: '#00a0dc' }}>.</span></h2>
        </div>
        <div style={S.underline} />

        <p style={S.leadPara}>
          I'm a <strong style={{ color: '#0077b5' }}>DevOps Engineer</strong>,{' '}
          <strong style={{ color: '#0077b5' }}>cloud practitioner</strong> and{' '}
          <strong style={{ color: '#0077b5' }}>ML enthusiast</strong> building resilient, scalable
          systems — resolving real EKS production incidents, automating pipelines, and shipping
          reliable infrastructure without sacrificing performance.
        </p>
        <p style={S.bodyPara}>
          Based in <strong>Bengaluru</strong>, I specialize in AWS infrastructure, Kubernetes
          orchestration, and CI/CD automation. Currently pursuing my{' '}
          <strong>MCA at Garden City University</strong> (expected June 2026), I completed a Technical
          Internship at <strong>CSIR-IIP (Govt. of India)</strong>, where I built an end-to-end Machine
          Learning pipeline for battery life prediction — cutting manual data handling by 40% through
          Bash and Python automation.
        </p>
        <p style={{ ...S.bodyPara, marginBottom: 0 }}>
          I presented at <strong>ICIEM-2026</strong> as a Speaker and care deeply about root cause
          analysis, cloud cost optimization, and building monitoring solutions that surface issues
          before users do.
        </p>
      </div>

      {/* ── 3. EXPERIENCE SECTION ── */}
      <div style={{ ...S.card, marginTop: 16 }}>
        <div style={S.sectionTitle}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="14" width="36" height="26" rx="4" stroke="#0077b5" strokeWidth="2.5"/>
            <path d="M16 14v-4a2 2 0 012-2h12a2 2 0 012 2v4" stroke="#0077b5" strokeWidth="2.5"/>
            <line x1="6" y1="26" x2="42" y2="26" stroke="#00a0dc" strokeWidth="1.5"/>
          </svg>
          <h2 style={S.sectionH}>Experience<span style={{ color: '#00a0dc' }}>.</span></h2>
        </div>
        <div style={S.underline} />

        {/* Internship label */}
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>
          Internship
        </p>

        {/* CSIR-IIP Card */}
        <div style={S.expCard}>
          <div style={S.expHeader}>
            <div style={S.expLogo}>
              <img
                src="/csir-certificate.jpg"
                alt="CSIR-IIP"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '🏛️'; }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
                <div>
                  <p style={S.expRole}>Technical Intern — AI/ML & Automation</p>
                  <p style={S.expCompany}>CSIR-IIP, Govt. of India</p>
                </div>
                <span style={S.typeBadge}>Internship</span>
              </div>
              <div style={S.expMeta}>
                <span style={S.expMetaItem}>📅 Dec 2025 — Mar 2026</span>
                <span style={S.expMetaItem}>📍 Dehradun, India (Remote)</span>
              </div>
            </div>
          </div>

          <p style={S.descText}>
            Worked on an end-to-end Machine Learning pipeline for predicting battery Remaining Useful
            Life (RUL) using multi-sensor degradation data from the NASA PCoE dataset.
          </p>

          <p style={S.highlightLabel}>Key Contributions</p>
          {[
            'Built and evaluated 4 ML models (Random Forest, Gradient Boosting, XGBoost, SVR) using leave-one-battery-out cross-validation',
            'Automated ETL data pipelines using Python and Bash scripting, reducing manual data handling effort by 40%',
            'Engineered features from voltage, current, and temperature battery cycling curves',
            'Maintained version-controlled environments and reproducible experiment pipelines using Git',
            'Documented model comparison results and delivered findings to CSIR-IIP research team',
          ].map((pt, i) => (
            <div key={i} style={S.highlightItem}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="8" cy="8" r="7.5" stroke="#22c55e" strokeWidth="1"/>
                <path d="M4.5 8l2.5 2.5 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={S.highlightText}>{pt}</span>
            </div>
          ))}

          <p style={{ ...S.highlightLabel, marginTop: 14 }}>Tech Stack</p>
          <div style={S.techRow}>
            {['Python', 'XGBoost', 'scikit-learn', 'Pandas', 'Bash', 'Git', 'Jupyter', 'NumPy'].map(t => (
              <span key={t} style={S.techChip}>{t}</span>
            ))}
          </div>

          <div style={S.impactRow}>
            <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Impact:</span>
            <span style={S.impactBadge}>✦ 40% reduction in manual effort</span>
          </div>
        </div>

        {/* Project experience label */}
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1.2, margin: '20px 0 12px' }}>
          Project Experience
        </p>

        {devopsProjects.map((proj, i) => (
          <div key={i} style={S.projCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 10 }}>
              <div>
                <p style={S.projTitle}>{proj.title}</p>
                <p style={S.projMeta}>{proj.role} · {proj.period}</p>
              </div>
              <span style={S.selfBadge}>Self-directed</span>
            </div>

            <div style={{ marginBottom: 10 }}>
              {proj.highlights.map((h, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div style={S.projDot} />
                  <span style={S.projText}>{h}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {proj.tech.map(t => (
                <span key={t} style={S.projTechChip}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── 4. EDUCATION SECTION ── */}
      <div style={{ ...S.card, marginTop: 16 }}>
        <div style={S.sectionTitle}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <path d="M24 8L44 18L24 28L4 18L24 8Z" stroke="#8b5cf6" strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M10 23v10c0 4 6.27 7 14 7s14-3 14-7V23" stroke="#8b5cf6" strokeWidth="2.5" strokeLinejoin="round"/>
            <line x1="44" y1="18" x2="44" y2="28" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <h2 style={{ ...S.sectionH, color: '#3b1a6e' }}>Education<span style={{ color: '#8b5cf6' }}>.</span></h2>
        </div>
        <div style={{ ...S.underline, background: '#8b5cf6' }} />

        {/* MCA */}
        <div style={S.eduCard}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={S.eduDot} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <p style={S.eduDeg}>Master of Computer Applications (MCA)</p>
                  <p style={S.eduOrg}>Garden City University, Bangalore</p>
                  <p style={S.eduMeta}>Focused on Cloud Computing and DevOps Engineering</p>
                </div>
                <span style={S.eduBadge}>2024 – June 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* BCA placeholder — add your undergrad if you want */}
        <div style={S.eduCard}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ ...S.eduDot, background: '#6366f1', border: '3px solid #e0e7ff' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <p style={S.eduDeg}>Bachelor of Computer Applications (BCA)</p>
                  <p style={{ ...S.eduOrg, color: '#6366f1' }}>Add your undergraduate college here</p>
                  <p style={S.eduMeta}>Add specialization or focus area</p>
                </div>
                <span style={{ ...S.eduBadge, color: '#4f46e5', background: '#eef2ff', border: '1px solid #c7d2fe' }}>
                  Add years
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. RESUME SECTION ── */}
      <div style={S.resumeCard}>
        <div>
          <h2 style={S.resumeTitle}>Resume</h2>
          <p style={S.resumeSub}>Shubham Singh — DevOps Engineer · MCA 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="/shubham_resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={S.btnView}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            View Resume
          </a>
          <a
            href="/shubham_resume.pdf"
            download="Shubham_Singh_Resume.pdf"
            style={S.btnDownload}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Resume
          </a>
        </div>
      </div>

    </div>
  );
}
