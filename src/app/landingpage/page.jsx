// src/components/MorePage.js
'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // replacing react-router-dom
import './Page.css';
import { useTheme } from '@/components/ThemeProvider';
import { LuContrast } from 'react-icons/lu';


export default function MorePage() {
  const { theme, toggleTheme } = useTheme(); // ✅ move it here
const router = useRouter();

  const mockups = [
  '/assets/preview.png',
  '/assets/team.png'
];


const features = [
  { title: 'Real‑time Collaboration', desc: 'Bubbles,Chat, avatars & live updates in one space.' },
  { title: 'Smart Room Management', desc: 'Join virtual rooms instantly, effortlessly.' },
  { title: 'Secure & Scalable', desc: 'Built with modern tools for reliability and growth.' }
];



  // state for popups
  const [openPanel, setOpenPanel] = useState('');
  const [showBio, setShowBio] = useState(false);
  const hoverTimeout = React.useRef(null);
  const [isExiting, setIsExiting] = useState(false);




    return (
  <div className={`morepage ${theme}`}>
      <header className="mp-header glass">
        <div className="left"><img src="/assets/gimpa.png" alt="GIMPA Logo" />
         <h1>GIMPA VLE</h1></div>
        <nav className="nav">
          {['GIMPA', 'Features', 'Resources', 'Contact', 'Team', 'Behind the app'].map(label => (
            <div
  key={label}
  className="nav-item"
  onMouseEnter={() => {
    if (label !== 'Login') {
      setOpenPanel(label);
      if (label === 'Behind the app') {
        hoverTimeout.current = setTimeout(() => {
          setShowBio(true);
        }, 1000); // wait 1 second
      }
    }
  }}
  onMouseLeave={() => {
    setOpenPanel('');
    clearTimeout(hoverTimeout.current);
    setShowBio(false);
  }}
>

              {label === 'GIMPA' ? (
                <a href="https://gimpa.edu.gh" target="_blank" rel="noopener noreferrer">{label}</a>
              ) : label === 'Login' ? (
                <button onClick={() => router.push('/login')}>{label}</button>
              ) : (
                <span>{label}</span>
              )}

              {openPanel === label && label !== 'GIMPA' && (
                <div className="dropdown glass">
                  {label==='Features' && features.map(f => <div key={f.title}>{f.title}</div>)}
                  {label==='Resources' && (
                    <>
                      <div>Help Center</div>
                      <div>FAQ & Guides</div>
                      <div>Release Notes</div>
                    </>
                  )}
                  {label==='Contact' && (
                    <>
                      <div>@info@gimpa.edu.gh</div>
                      <div>📞 +233 50 162 0138</div>
                      <div>📞 +233 33 209 5432</div>
                      <div>📞 +233 30 290 8076</div>
                    </>
                  )}
     {label === 'Behind the app' && (
  <>
    <div className="behind-panel-clickable">
      <div><strong>CMD</strong></div>
      <div>delphine.cmd@gmail.com</div>
      <div>📞 +233 55 904 4181</div>
      <div className="bio-hint">(Hover to see more)</div>
    </div>

    {showBio && (
      <div className="bio-panel">
        <img src="/assets/your-photo.png" alt="Delphine Mawuli" className="bio-photo-circle" />
        <p><strong>Delphine Mawuli Camon</strong></p>
        <div className="bio-text">
        <strong>Delphine Mawuli Camon</strong> is a driven Computer Science student at GIMPA,
        passionately shaping the future of technology. As the founder and CEO of CMD, she spearheads
        innovative solutions in web design, animation, artificial intelligence, software development,
        cybersecurity, and tech research. Her visionary leadership empowers CMD to deliver transformative
        digital experiences and positions her as a leader in the global tech landscape.
      </div>
      </div>
    )}
  </>
)}

                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="right">
          <button className="toggle-mode" onClick={toggleTheme}>
        <LuContrast size={20} />
        </button>
       </div>
      </header>

      <section className="hero glass">
        <div className="hero-content">
          <h2>Welcome to GIMPA Virtual Learning Environment</h2>
          <p>Your all‑in‑one space for secure, modern, and shared learning.</p>
          <div className="ctas">
            <button
        className={`breathe-button ${isExiting ? 'fade-out' : ''}`}
        onClick={() => {
            setIsExiting(true);
            setTimeout(() => router.push('/login'), 600);
        }}
        >
        Get Started
        </button>
          </div>
        </div>
        <div className="mockup-stack">
  {mockups.map((src, i) => (
    <img
      key={i}
      src={src}
      alt=""
      className={i === 1 ? 'team-image' : ''}
    />
  ))}
</div>

      </section>

      <section className="features-section">
        {features.map((f,i)=>
          <div key={i} className="feature-card glass">
            <h3>{f.title}</h3><p>{f.desc}</p>
          </div>
        )}
      </section>

      <footer className="footer glass">
        <p>© {new Date().getFullYear()} — Built by CMD</p>
      </footer>
    </div>
  );
}
