import React, { useEffect, useState } from "react";

type Profile = {
  name: string;
  title: string;
  location: string;
  summary: string;
  skills: string[];
  projects: { name: string; description: string; link: string }[];
};

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "kites",
    company: "iKITES Technologies",
    role: "AI Innovation Intern",
    location: "Remote, IN",
    period: "JUNE 2025 – PRESENT",
    bullets: [
      "Designed and implemented AI-enabled data processing pipelines that integrate medical imaging modalities and structured metadata.",
      "Developed scalable workflows for ingesting, transforming, and validating multimodal medical data using Python.",
      "Ensured data security, traceability, and reproducibility within cloud-based analysis systems."
    ]
  },
  {
    id: "zoomifi",
    company: "Zoomifi Inc",
    role: "Software Engineer Intern",
    location: "San Francisco, CA",
    period: "May 2025 – August 2025",
    bullets: [
      "Implemented a serverless backend using AWS Lambda, API Gateway, DynamoDB, and S3 to support scalable, event-driven applications.",
      "Designed and implemented RESTful APIs for authentication, onboarding, and transaction workflows.",
      "Integrated third-party webhooks (Stripe, Clover) with idempotent processing and robust error handling.",
      "Improved system reliability and maintainability through modular design and clear API contracts."
    ]
  },
  {
    id: "bell",
    company: "Bell Canada",
    role: "Data Analyst Intern",
    location: "Toronto, ON",
    period: "May 2024 – August 2024",
    bullets: [
      "Applied machine learning models to analyze large-scale datasets and identify performance anomalies.",
      "Developed data pipelines using SQL to support forecasting, monitoring, and decision-making.",
      "Strengthened system reliability through predictive analytics and automation."
    ]
  },
  {
    id: "rcatsone",
    company: "RCATSONE Inc",
    role: "Software Developer Intern",
    location: "Mississauga, ON",
    period: "May 2023 – August 2023",
    bullets: [
      "Developed backend services using Java, Spring Boot, and Node.js to support identity and network testing platforms.",
      "Designed REST APIs and data models to improve system performance and reliability.",
      "Created automation scripts and UML-based system designs to reduce manual operational overhead."
    ]
  }
];

type Project = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  stack: string;
  link?: string;
  repo?: string;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    id: "highlight-1",
    name: "Signal Studio",
    subtitle: "A minimal analytics dashboard for side projects.",
    description:
      "Design and implementation of a real‑time analytics dashboard with a Java backend and TypeScript frontend, focused on clean visuals and smooth interactions.",
    stack: "Java · Spring Boot · React · TypeScript",
    image: "/projects/signal-studio.jpg"
  },
  {
    id: "highlight-2",
    name: "Motion Portfolio",
    subtitle: "A personal site experiment in subtle motion.",
    description:
      "Exploration of typography, motion, and micro‑interactions to build a portfolio that feels fast and polished on any device.",
    stack: "React · TypeScript · Framer Motion",
    image: "/projects/motion-portfolio.jpg"
  },
  {
    id: "grid-1",
    name: "API Toolkit",
    subtitle: "Developer‑friendly REST utilities.",
    description:
      "Collection of APIs and helpers that standardize auth, logging, and error handling across projects.",
    stack: "Java · Spring Boot"
  },
  {
    id: "grid-2",
    name: "Design Sandbox",
    subtitle: "Components for rapid prototyping.",
    description:
      "A small library of layout and motion primitives used to quickly prototype new UI ideas.",
    stack: "TypeScript · React"
  },
  {
    id: "grid-3",
    name: "Study Planner",
    subtitle: "Simple scheduling for deep work.",
    description:
      "Planning tool to block focused time and keep track of tasks without getting in the way.",
    stack: "React · TypeScript"
  },
  {
    id: "grid-4",
    name: "Playground APIs",
    subtitle: "Tiny services for experiments.",
    description:
      "Lightweight Java services powering experiments in data viz, search, and personalization.",
    stack: "Java · REST"
  }
];

const HERO_QUESTIONS: string[] = [
  "Would you rather be a washer or a dryer?",
  "How would you describe the colour yellow to a blind person?",
  "If you could only eat three foods for the rest of your life, what would they be?",
  "If you could have any superpower, what would it be?",
  "If you could be a colour, what would it be?",
  "If you could have any superpower, what would it be?",
  "Do you think you are more of a '?' or an '!'?",
  "Would you rather be able to speak any language or be able to understand any language?",
  "Would you rather only be able to eat sweeets or only be able to eat savoury foods?"
];

type Theme = "dark" | "light";

type HeroPixelFieldProps = {
  width?: number;
  height?: number;
};

const HeroPixelField: React.FC<HeroPixelFieldProps> = ({ width = 280, height = 300 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: width / 2,
    y: height / 2,
    active: false
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    type Pixel = {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
    };

    const pixels: Pixel[] = [];
    const spacing = 8;
    const centerX = width / 2;
    const centerY = height * 0.42;
    const radius = Math.min(width, height) * 0.42;

    for (let y = spacing / 2; y < height - spacing / 2; y += spacing) {
      for (let x = spacing / 2; x < width - spacing / 2; x += spacing) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
          pixels.push({ baseX: x, baseY: y, x, y });
        }
      }
    }

    const handleMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true
      };
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    const influenceRadius = 80;
    const maxPush = 26;

    let animationFrameId: number;
    const render = () => {
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      for (const p of pixels) {
        let tx = p.baseX;
        let ty = p.baseY;

        if (mouse.active) {
          const dx = p.baseX - mouse.x;
          const dy = p.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

          if (dist < influenceRadius) {
            const force = (influenceRadius - dist) / influenceRadius;
            const offset = force * maxPush;
            tx = p.baseX + (dx / dist) * offset;
            ty = p.baseY + (dy / dist) * offset;
          }
        }

        // ease back towards target position
        p.x += (tx - p.x) * 0.12;
        p.y += (ty - p.y) * 0.12;

        const radialDist = Math.sqrt(
          (p.baseX - centerX) * (p.baseX - centerX) + (p.baseY - centerY) * (p.baseY - centerY)
        );
        const intensity = 1 - radialDist / radius;

        // vertical gradient: white (top) -> pink (bottom)
        const topY = centerY - radius;
        const bottomY = centerY + radius;
        const clampedY = Math.max(topY, Math.min(bottomY, p.baseY));
        const t = (clampedY - topY) / (bottomY - topY || 1); // 0 at top, 1 at bottom

        const r = Math.round(255 * (1 - t) + 244 * t);
        const g = Math.round(255 * (1 - t) + 114 * t);
        const b = Math.round(255 * (1 - t) + 182 * t);
        const alpha = 0.5 + intensity * 0.45; // 0.5–0.95 for brighter pixels

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="hero-pixel-canvas" />;
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [typedGreeting, setTypedGreeting] = useState<string>("");
  const [fullGreeting, setFullGreeting] = useState<string>("");
  const [activeExperienceId, setActiveExperienceId] = useState<string>(EXPERIENCES[0].id);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState<number>(0);
  const [theme, setTheme] = useState<Theme>("light");
  const [navScrolled, setNavScrolled] = useState<boolean>(false);
  const [heroQuestion] = useState<string>(
    () => HERO_QUESTIONS[Math.floor(Math.random() * HERO_QUESTIONS.length)]
  );
  const [heroAnswer, setHeroAnswer] = useState<string>("");

  useEffect(() => {
    // Adjust the URL if you change the backend port
    fetch("http://localhost:8080/api/profile")
      .then((res) => res.json())
      .then((data: Profile) => setProfile(data))
      .catch(() => {
        // Fallback content if backend is not running
        setProfile({
          name: "Mehar Chatha",
          title: "Software Engineer & Creative Technologist",
          location: "Toronto, Canada",
          summary:
            "I build things, ask really random questions, and enjoy a good cup of coffee.",
          skills: ["Java", "TypeScript", "React", "Spring Boot", "REST APIs", "UI/UX"],
          projects: [
            {
              name: "Interactive Portfolio",
              description: "A responsive, animated portfolio showcasing my work and personality.",
              link: "#projects"
            },
            {
              name: "API-Driven Dashboard",
              description: "Real-time data visualization dashboard powered by Java and TypeScript.",
              link: "#projects"
            }
          ]
        });
      });
  }, []);

  const firstName = (profile?.name || "Mehar Chatha").split(" ")[0];

  useEffect(() => {
    const name = (profile?.name || "Mehar Chatha").split(" ")[0];
    const text = `Hey, it's ${name.toLowerCase()}.`;
    setFullGreeting(text);
    setTypedGreeting("");

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedGreeting(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [profile?.name]);

  const renderGreeting = () => {
    if (!typedGreeting) {
      return null;
    }

    const lowerFirst = firstName.toLowerCase();
    const lowerTyped = typedGreeting.toLowerCase();
    const idx = lowerTyped.indexOf(lowerFirst);

    if (idx === -1) {
      return typedGreeting;
    }

    const before = typedGreeting.slice(0, idx).trimEnd();
    const namePart = typedGreeting.slice(idx, idx + lowerFirst.length);
    const after = typedGreeting.slice(idx + lowerFirst.length);

    return (
      <>
        {before}
        {" "}
        <span className="hero-name-accent">{namePart}</span>
        {after}
      </>
    );
  };

  const featuredProjects = PROJECTS.slice(0, 2);
  const otherProjects = PROJECTS.slice(2);

  const activeFeatured =
    featuredProjects[(activeFeaturedIndex % featuredProjects.length + featuredProjects.length) %
      featuredProjects.length];

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("mehar-theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("mehar-theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 10);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page">
      <nav
        className={`nav${navScrolled ? " nav--scrolled" : ""}`}
      >
        <div className="nav-left">
          <span className="logo-dot" />
          <span className="logo-text">MeharC</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#experience" className="nav-link">
            Experience
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#writing" className="nav-link">
            Writing
          </a>
        </div>
        <div className="nav-icons">
          <a href="mailto:meharchatha@gmail.com" className="nav-icon nav-icon--email" aria-label="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="3" ry="3" />
              <polyline points="4 7 12 13 20 7" fill="none" />
            </svg>
          </a>
          <a
            href="https://github.com/Mehar-Chatha"
            target="_blank"
            rel="noreferrer"
            className="nav-icon nav-icon--github"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0 0 6.8 9.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.3.9 1.3.9.8 1.3 2.1.9 2.6.7.1-.6.3-1 .6-1.2-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.8-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.2.2 2.2.1 2.4.6.8 1 1.7 1 2.8 0 3.8-2.4 4.7-4.7 4.9.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 22 12C22 6.5 17.5 2 12 2Z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/mehar-c-b1a243127/"
            target="_blank"
            rel="noreferrer"
            className="nav-icon nav-icon--linkedin"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <rect x="6" y="10" width="2.5" height="7.5" />
              <circle cx="7.25" cy="7" r="1.25" />
              <path d="M11 10h2.4v1.2a2.5 2.5 0 0 1 2.2-1.2c2 0 2.4 1.3 2.4 3v4.5H15.5V14c0-.7 0-1.5-1-1.5s-1.2.7-1.2 1.4v3.6H11Z" />
            </svg>
          </a>
          <a
            href="https://substack.com/@meharchatha?utm_source=user-menu"
            target="_blank"
            rel="noreferrer"
            className="nav-icon nav-icon--substack"
            aria-label="Substack"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="4" width="16" height="3" />
              <rect x="4" y="9" width="16" height="3" />
              <path d="M12 20 4 15v-3h16v3Z" />
            </svg>
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            <span className="theme-icon theme-icon--sun" />
            <span className="theme-icon theme-icon--moon" />
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-visual">
            <div className="hero-visual-inner">
              <HeroPixelField />
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-greeting">
                {renderGreeting()}
                <span
                  className={
                    "typing-cursor" +
                    (typedGreeting.length === fullGreeting.length && fullGreeting.length > 0
                      ? " typing-cursor--done"
                      : "")
                  }
                >
                  |
                </span>
              </span>
            </h1>
            <p className="hero-subtitle">
              {profile?.summary ||
                "A blend of Java backends, TypeScript frontends, and smooth motion to tell your story online."}
            </p>
            <div className="hero-actions">
              <a href="#projects" className="hero-icon-link" aria-label="View projects">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="hero-icon"
                >
                  <path
                    d="M9.75 3.75l1.5 1.5-1.5 2.25 1.5 1.5-3.5 3.5a1.5 1.5 0 11-2.12-2.12l3.5-3.5 1.5 1.5 2.25-1.5-1.5-1.5 1.5-1.5 3 3-1.25 2.16 2.09 2.1 2.16-1.25 3 3-1.5 1.5-1.5-1.5-2.25 1.5-1.5-1.5-2.16 1.25-3-3 1.25-2.16-2.09-2.09-2.16 1.25-3-3 1.5-1.5z"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <p className="hero-eyebrow hero-question-label">{heroQuestion}</p>
            <input
              className="hero-question-input"
              type="text"
              placeholder="Type your answer here…"
              value={heroAnswer}
              onChange={(e) => setHeroAnswer(e.target.value)}
            />
            <div className="hero-meta">
              <span className="pill pill-soft">
                Based in {profile?.location || "somewhere on Earth"}
              </span>
              <span className="pill">
                Loves{" "}
                {(profile?.skills || ["Java", "TypeScript", "Animations"])
                  .slice(0, 3)
                  .join(" · ")}
              </span>
            </div>
          </div>
        </section>

        <section id="about" className="section section-about">
          <div className="section-header">
            <h2>/ about me</h2>
            <p>A short snapshot of who I am and how I like to work.</p>
          </div>
          <div className="about-layout">
            <div className="about-main">
              <p>
                I'm currently an Engineering Student at McMaster University, and I'm currently
                working @{" "}
                <span className="about-company-highlight">iKITES Technologies</span> on{" "}
                <span className="about-highlight-em">AI-powered multimodal analysis</span>. Previously
                I was at <span className="about-company-highlight">Zoomifi Inc</span> and{" "}
                <span className="about-company-highlight">Bell Canada</span>.
              </p>
              <p>
                Other than my insanely high screen time on cursor, I enjoy watching how some of my
                favourite TV shows and movies were made, I dance, and I really enjoy eating.
              </p>
              <div className="about-meta">
                <div className="about-meta-group">
                  <p className="about-label">technologies I've worked with</p>
                  <div className="about-chips">
                    <span className="about-chip">Python, Java, C++, SQL &amp; React</span>
                    <span className="about-chip">Spring Boot, Django, Flask, FastAPI</span>
                    <span className="about-chip">AWS, DynamoDB, S3, Lambda</span>
                  </div>
                </div>
      
              </div>
            </div>
            <div className="about-photo-wrapper">
              <div className="about-photo-frame">
                <img
                  src="/mehar-photo.jpg"
                  alt="Mehar Chatha"
                  className="about-photo"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section section-experience">
          <div className="section-header">
            <h2>/ experience</h2>
          </div>
          <div className="experience-layout">
            <div className="experience-list">
              {EXPERIENCES.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  className={
                    "experience-item" +
                    (exp.id === activeExperienceId ? " experience-item--active" : "")
                  }
                  onClick={() => setActiveExperienceId(exp.id)}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            <div className="experience-detail">
              {(() => {
                const active =
                  EXPERIENCES.find((exp) => exp.id === activeExperienceId) || EXPERIENCES[0];

                return (
                  <>
                    <h3 className="experience-role">
                      {active.role}
                      <span className="experience-company">@ {active.company}</span>
                    </h3>
                    <p className="experience-meta">
                      <span>{active.period}</span>
                      <span> · {active.location}</span>
                    </p>
                    <ul className="experience-bullets">
                      {active.bullets.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        <section id="projects" className="section section-projects">
          <div className="section-header">
            <h2>/ pet projects</h2>
            <p>A few things I&apos;ve been building for fun and for learning.</p>
          </div>

          <div className="featured-project">
            <div className="featured-project-card">
              <div className="featured-project-media">
                {activeFeatured.image && (
                  <img
                    src={activeFeatured.image}
                    alt={activeFeatured.name}
                    className="featured-project-image"
                  />
                )}
                <div className="featured-project-overlay">
                  <p className="featured-project-label">Featured</p>
                  <h3 className="featured-project-title">{activeFeatured.name}</h3>
                  <p className="featured-project-subtitle">{activeFeatured.subtitle}</p>
                  <p className="featured-project-description">{activeFeatured.description}</p>
                  <p className="featured-project-stack">{activeFeatured.stack}</p>
                </div>
              </div>
            </div>

            <div className="featured-project-controls">
              <button
                type="button"
                className="featured-arrow"
                onClick={() =>
                  setActiveFeaturedIndex(
                    (activeFeaturedIndex - 1 + featuredProjects.length) % featuredProjects.length
                  )
                }
              >
                ←
              </button>
              <div className="featured-dots">
                {featuredProjects.map((proj, index) => (
                  <button
                    key={proj.id}
                    type="button"
                    className={
                      "featured-dot" +
                      (index === activeFeaturedIndex ? " featured-dot--active" : "")
                    }
                    onClick={() => setActiveFeaturedIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="featured-arrow"
                onClick={() =>
                  setActiveFeaturedIndex((activeFeaturedIndex + 1) % featuredProjects.length)
                }
              >
                →
              </button>
            </div>
          </div>

          <div className="projects-grid">
            {otherProjects.map((project) => (
              <article key={project.id} className="project-card hover-lift">
                <div className="project-header">
                  <div className="project-orbit-dot" />
                  <h3>{project.name}</h3>
                </div>
                <p className="project-subtitle">{project.subtitle}</p>
                <p>{project.description}</p>
                <p className="project-stack">{project.stack}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="writing" className="section section-contact">
          <div className="section-header">
            <h2>/ I also write</h2>
            <p>Occasional notes on building products, designing interfaces, and learning in public.</p>
          </div>
          <div className="contact-card floating-card">
            <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 12 }}>
              I keep a small Substack where I share longer thoughts, experiments, and notes from what
              I&apos;m working on.
            </p>
            <a
              href="https://substack.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary full-width"
            >
              Read on Substack
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile?.name || "Your Name"}</span>
        <span className="footer-dot" />
        <span>Built with Java &amp; TypeScript</span>
      </footer>
    </div>
  );
};

export default App;


