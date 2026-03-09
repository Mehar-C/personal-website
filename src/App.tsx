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
  link?: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "kites",
    company: "iKITES Technologies",
    role: "AI Innovation Intern",
    location: "Remote, IN",
    period: "JUNE 2025 – PRESENT",
    link: "https://www.ikites.ai/",
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
    link: "https://zoomifi.com/",
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
    link: "https://www.bce.ca/",
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
    link: "https://www.rcatsone.com/",
    bullets: [
      "Developed backend services using Java, Spring Boot, and Node.js to support identity and network testing platforms.",
      "Designed REST APIs and data models to improve system performance and reliability.",
      "Created automation scripts and UML-based system designs to reduce manual operational overhead."
    ]
  }
];

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string;
  category: "full-stack" | "frontend-uiux" | "backend-ml" | "frontend-ml";
  link?: string;
  repo?: string;
  image?: string;
  video?: string;
};

type Article = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  link?: string;
  image?: string;
};

const FEATURED_PROJECTS: Project[] = [
  {
    id: "measured-motion",
    title: "Measured Motion",
    subtitle: "Making movement measurable.",
    description:
      "A project born from dance and recovery. It analyzes motion footage to surface patterns in joint movement and stress, turning raw visual input into structured feedback. Built to explore how data and design can make the body's mechanics more visible.",
    techStack: "Python · OpenCV · TypeScript · React",
    category: "full-stack",
    image: "/pictures/measured-motion.jpg"
  }
];

const PROJECTS: Project[] = [
  {
    id: "grid-1",
    title: "Anchor",
    subtitle: "Stress & Focus Monitoring App",
    description:
      "A prototype wellness application that uses wearable sensor data to infer stress and focus levels over time. Built to explore how physiological signals can be translated into meaningful feedback for self-awareness and habit tracking.",
    techStack: "Apple Watch data, Sensor analysis, TypeScript / React (prototype)",
    category: "full-stack"
  },
  {
    id: "grid-2",
    title: "Kinective",
    subtitle: "Gesture-Based Interaction Prototype",
    description:
      "An experimental project exploring gesture recognition as an input method using motion data. Designed to translate human movement into digital actions, with a focus on accessibility, responsiveness, and real-time interaction.",
    techStack: "Computer Vision, Motion Tracking, Python / JavaScript (prototype)",
    category: "frontend-ml"
  },
  {
    id: "grid-3",
    title: "See And Steer (SAS)",
    subtitle: "Computer Vision–Driven Navigation Prototype",
    description:
      "A hackathon project built at Hack Western 10 that explored using computer vision to assist with navigation and directional decision-making. The project focused on interpreting visual input in real time and translating it into actionable guidance, emphasizing accessibility, rapid prototyping, and practical application.",
    techStack: "Computer Vision, Python, OpenCV",
    category: "backend-ml"
  },
  {
    id: "grid-4",
    title: "AshuChandhok Designs",
    subtitle: "Project Portfolio & Design Showcase",
    description:
      "A custom-built portfolio site created to showcase visual design work, branding projects, and creative experiments. Focused on clean layouts, smooth navigation, and presenting creative work in a clear, professional format.",
    techStack: "HTML · CSS · JavaScript",
    category: "frontend-uiux",
    link: "https://ashuchandhok.com"
  },
  {
    id: "grid-5",
    title: "Anki-Byte",
    subtitle: "Anki Quick-Add Chrome Extension",
    description:
      "Built a Chrome extension that integrates with Anki via the AnkiConnect API, enabling one-click creation of flashcards from highlighted web content. Handles deck selection, card field mapping, and local API communication through a minimal popup UI.",
    techStack: "JavaScript, Chrome Extensions API, AnkiConnect",
    category: "full-stack",
    image: "/pictures/ankibyte.jpg"
  }
];

const ARTICLES: Article[] = [
  {
    id: "article-1",
    title: "The Thermodynamics of Peter Parker: A Multiverse Audit",
    subtitle:
      "My favourite superhero explaining possibly my least favourite topic in physics",
    tag: "",
    link: "https://substack.com/home/post/p-186830131",
    image: "/pictures/thermodynamics-cover.jpg"
  },
  {
    id: "article-2",
    title: "The Concept of *The Concept*",
    subtitle: "I tried explaining conceptual whimsy through fluid mechanics",
    tag: "",
    link: "https://substack.com/home/post/p-187474627",
    image: "/pictures/concept-cover.jpg"
  },
  {
    id: "article-3",
    title: "The Art of Platonic Love: An Ode to Girlhood",
    subtitle:
      "A manifesto on the psychic, healing, and slightly unhinged power of the women who make everything brighter.",
    tag: "",
    link: "https://substack.com/home/post/p-190356489",
    image: "/pictures/sub3.jpeg"
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
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.5;

    const influenceRadius = 80;
    const maxPush = 26;

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

    const maskImage = new Image();
    maskImage.src = "/pictures/mehar.jpg";

    let animationFrameId: number;

    maskImage.onload = () => {
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d");
      if (!maskCtx) {
        return;
      }

      // Draw the mask image centered and scaled to fit the field
      const scale =
        Math.min(width / maskImage.width, height / maskImage.height) * 0.9;
      const drawWidth = maskImage.width * scale;
      const drawHeight = maskImage.height * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      maskCtx.clearRect(0, 0, width, height);
      maskCtx.drawImage(maskImage, offsetX, offsetY, drawWidth, drawHeight);
      const maskData = maskCtx.getImageData(0, 0, width, height).data;

      pixels.length = 0;
      for (let y = spacing / 2; y < height - spacing / 2; y += spacing) {
        for (let x = spacing / 2; x < width - spacing / 2; x += spacing) {
          const ix = Math.floor(x);
          const iy = Math.floor(y);
          const idx = (iy * width + ix) * 4;
          const alpha = maskData[idx + 3] / 255;
          // Only place pixels where the photo is visible
          if (alpha > 0.2) {
            pixels.push({ baseX: x, baseY: y, x, y });
          }
        }
      }

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
            (p.baseX - centerX) * (p.baseX - centerX) +
              (p.baseY - centerY) * (p.baseY - centerY)
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
    };

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
  const [aboutTitle, setAboutTitle] = useState<string>("");
  const [aboutIsCode, setAboutIsCode] = useState<boolean>(true);
  const [experienceTitle, setExperienceTitle] = useState<string>("");
  const [experienceIsCode, setExperienceIsCode] = useState<boolean>(true);
  const [projectsTitle, setProjectsTitle] = useState<string>("");
  const [projectsIsCode, setProjectsIsCode] = useState<boolean>(true);
  const [writingTitle, setWritingTitle] = useState<string>("");
  const [writingIsCode, setWritingIsCode] = useState<boolean>(true);
  const [activeArticleIndex, setActiveArticleIndex] = useState<number>(0);

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
            "I build things, ask really random questions, and love a good cup of coffee.",
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
    const text = `Hello! i'm ${name.toLowerCase()}.`;
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

  useEffect(() => {
    const codeText = 'system.out.println("about me")';
    const finalText = "#about me";
    let typingInterval: number | undefined;
    let delayTimeout: number | undefined;

    const startCycle = () => {
      setAboutIsCode(true);
      setAboutTitle("");
      let index = 0;

      typingInterval = window.setInterval(() => {
        index += 1;
        if (index <= codeText.length) {
          setAboutTitle(codeText.slice(0, index));
        } else {
          if (typingInterval !== undefined) {
            window.clearInterval(typingInterval);
            typingInterval = undefined;
          }
          setAboutIsCode(false);
          setAboutTitle(finalText);
          delayTimeout = window.setTimeout(() => {
            startCycle();
          }, 10000);
        }
      }, 70);
    };

    startCycle();

    return () => {
      if (typingInterval !== undefined) {
        window.clearInterval(typingInterval);
      }
      if (delayTimeout !== undefined) {
        window.clearTimeout(delayTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const codeText = 'system.out.println("experience")';
    const finalText = "#experience";
    let typingInterval: number | undefined;
    let delayTimeout: number | undefined;

    const startCycle = () => {
      setExperienceIsCode(true);
      setExperienceTitle("");
      let index = 0;

      typingInterval = window.setInterval(() => {
        index += 1;
        if (index <= codeText.length) {
          setExperienceTitle(codeText.slice(0, index));
        } else {
          if (typingInterval !== undefined) {
            window.clearInterval(typingInterval);
            typingInterval = undefined;
          }
          setExperienceIsCode(false);
          setExperienceTitle(finalText);
          delayTimeout = window.setTimeout(() => {
            startCycle();
          }, 10000);
        }
      }, 70);
    };

    startCycle();

    return () => {
      if (typingInterval !== undefined) {
        window.clearInterval(typingInterval);
      }
      if (delayTimeout !== undefined) {
        window.clearTimeout(delayTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const codeText = 'system.out.println("projects")';
    const finalText = "#projects";
    let typingInterval: number | undefined;
    let delayTimeout: number | undefined;

    const startCycle = () => {
      setProjectsIsCode(true);
      setProjectsTitle("");
      let index = 0;

      typingInterval = window.setInterval(() => {
        index += 1;
        if (index <= codeText.length) {
          setProjectsTitle(codeText.slice(0, index));
        } else {
          if (typingInterval !== undefined) {
            window.clearInterval(typingInterval);
            typingInterval = undefined;
          }
          setProjectsIsCode(false);
          setProjectsTitle(finalText);
          delayTimeout = window.setTimeout(() => {
            startCycle();
          }, 10000);
        }
      }, 70);
    };

    startCycle();

    return () => {
      if (typingInterval !== undefined) {
        window.clearInterval(typingInterval);
      }
      if (delayTimeout !== undefined) {
        window.clearTimeout(delayTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const codeText = 'system.out.println("I also write sometimes")';
    const finalText = "#I also write sometimes";
    let typingInterval: number | undefined;
    let delayTimeout: number | undefined;

    const startCycle = () => {
      setWritingIsCode(true);
      setWritingTitle("");
      let index = 0;

      typingInterval = window.setInterval(() => {
        index += 1;
        if (index <= codeText.length) {
          setWritingTitle(codeText.slice(0, index));
        } else {
          if (typingInterval !== undefined) {
            window.clearInterval(typingInterval);
            typingInterval = undefined;
          }
          setWritingIsCode(false);
          setWritingTitle(finalText);
          delayTimeout = window.setTimeout(() => {
            startCycle();
          }, 10000);
        }
      }, 70);
    };

    startCycle();

    return () => {
      if (typingInterval !== undefined) {
        window.clearInterval(typingInterval);
      }
      if (delayTimeout !== undefined) {
        window.clearTimeout(delayTimeout);
      }
    };
  }, []);

  const renderGreeting = () => {
    if (!typedGreeting) {
      return null;
    }

    // While the text is still typing, show the raw typing string.
    if (typedGreeting.length < fullGreeting.length) {
      return typedGreeting;
    }

    // Once the typing is done, render a fixed string with an explicit space
    // before the highlighted name so spacing is always correct.
    return (
      <>
        {"Hello! i'm "}
        <span className="hero-name-accent">{firstName.toLowerCase()}</span>
        {"."}
      </>
    );
  };

  const renderSectionTitle = (
    isCode: boolean,
    title: string,
    highlightTarget: string,
    finalText: string
  ) => {
    if (!isCode) {
      return finalText;
    }

    if (!title) {
      return null;
    }

    const lowerTitle = title.toLowerCase();
    const lowerTarget = highlightTarget.toLowerCase();
    const idx = lowerTitle.indexOf(lowerTarget);

    if (idx === -1) {
      return title;
    }

    const before = title.slice(0, idx);
    const namePart = title.slice(idx, idx + highlightTarget.length);
    const after = title.slice(idx + highlightTarget.length);

    return (
      <>
        {before}
        <span className="section-title-accent">{namePart}</span>
        {after}
      </>
    );
  };

  const featuredProjects = FEATURED_PROJECTS;
  const [activeProjectFilter, setActiveProjectFilter] = useState<
    "all" | "full-stack" | "frontend-uiux" | "backend-ml" | "frontend-ml"
  >("all");

  const otherProjects =
    activeProjectFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeProjectFilter);

  const activeFeatured =
    featuredProjects[(activeFeaturedIndex % featuredProjects.length + featuredProjects.length) %
      featuredProjects.length];

  const activeArticle =
    ARTICLES[(activeArticleIndex % ARTICLES.length + ARTICLES.length) % ARTICLES.length];

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
        </div>
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-visual">
            <div className="hero-visual-inner hero-visual-inner--with-photo">
              <img
                src="/pictures/mehar-portrait.jpg"
                alt={profile?.name || "Mehar Chatha"}
                className="hero-photo"
              />
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
            <div className="hero-actions">
              <a href="#projects" className="hero-icon-link" aria-label="View projects">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="hero-icon"
                >
                  <path
                    d="M12 5v14m0 0l-5-5m5 5 5-5"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="hero-icon-label">View my work</span>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section section-about">
          <div className="section-header section-header--pink">
            <h2 className="section-title">
              <span className={aboutIsCode ? "section-title-code" : ""}>
                {renderSectionTitle(aboutIsCode, aboutTitle, "about me", "#about me")}
              </span>
              <span className="section-title-line" />
            </h2>
            <p>.</p>
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
                <HeroPixelField width={240} height={260} />
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section section-experience">
          <div className="section-header section-header--grey">
            <h2 className="section-title">
              <span className={experienceIsCode ? "section-title-code" : ""}>
                {renderSectionTitle(experienceIsCode, experienceTitle, "experience", "#experience")}
              </span>
              <span className="section-title-line" />
            </h2>
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
                      <span className="experience-company">
                        @{" "}
                        {active.link ? (
                          <a
                            href={active.link}
                            target="_blank"
                            rel="noreferrer"
                            className="experience-company-link"
                          >
                            {active.company}
                          </a>
                        ) : (
                          active.company
                        )}
                      </span>
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
          <div className="section-header section-header--pink">
            <h2 className="section-title">
              <span className={projectsIsCode ? "section-title-code" : ""}>
                {renderSectionTitle(projectsIsCode, projectsTitle, "projects", "#projects")}
              </span>
              <span className="section-title-line" />
            </h2>
            <p>A few things I&apos;ve built for fun and learning.</p>
          </div>

          <div className="featured-project">
            <div className="featured-project-card">
              {activeFeatured.link ? (
                <a
                  href={activeFeatured.link}
                  target="_blank"
                  rel="noreferrer"
                  className="featured-project-link"
                >
                  <div className="featured-project-media">
                    {activeFeatured.video ? (
                      <video
                        className="featured-project-video"
                        src={activeFeatured.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      activeFeatured.image && (
                        <img
                          src={activeFeatured.image}
                          alt={activeFeatured.title}
                          className="featured-project-image"
                        />
                      )
                    )}
                    <div className="featured-project-overlay">
                      <p className="featured-project-label">Featured</p>
                      <h3 className="featured-project-title">{activeFeatured.title}</h3>
                      <p className="featured-project-subtitle">{activeFeatured.subtitle}</p>
                      <p className="featured-project-description">
                        {activeFeatured.description}
                        {activeFeatured.id === "measured-motion" && (
                          <>
                            {" "}
                            <span className="featured-project-status">
                              <strong>
                                <em>still very much in progress.</em>
                              </strong>
                            </span>
                          </>
                        )}
                      </p>
                      <p className="featured-project-stack">{activeFeatured.techStack}</p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="featured-project-media">
                  {activeFeatured.video ? (
                    <video
                      className="featured-project-video"
                      src={activeFeatured.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    activeFeatured.image && (
                      <img
                        src={activeFeatured.image}
                        alt={activeFeatured.title}
                        className="featured-project-image"
                      />
                    )
                  )}
                  <div className="featured-project-overlay">
                    <p className="featured-project-label">Featured</p>
                    <h3 className="featured-project-title">{activeFeatured.title}</h3>
                    <p className="featured-project-subtitle">{activeFeatured.subtitle}</p>
                    <p className="featured-project-description">
                      {activeFeatured.description}
                      {activeFeatured.id === "measured-motion" && (
                        <>
                          {" "}
                          <span className="featured-project-status">
                            <strong>
                              <em>still very much in progress.</em>
                            </strong>
                          </span>
                        </>
                      )}
                    </p>
                    <p className="featured-project-stack">{activeFeatured.techStack}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="projects-filter">
            {[
              { id: "all", label: "All" },
              { id: "full-stack", label: "Full-Stack" },
              { id: "frontend-uiux", label: "Frontend / UI-UX" },
              { id: "backend-ml", label: "Backend / ML" },
              { id: "frontend-ml", label: "Frontend + ML (Hybrid)" }
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={
                  "projects-filter-chip" +
                  (activeProjectFilter === filter.id ? " projects-filter-chip--active" : "")
                }
                onClick={() =>
                  setActiveProjectFilter(filter.id as typeof activeProjectFilter)
                }
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {otherProjects.map((project) => {
              const content = (
                <>
                  <div className="project-header">
                    <div className="project-orbit-dot" />
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-body">{project.description}</p>
                  <p className="project-stack">{project.techStack}</p>
                </>
              );

              return project.link ? (
                <a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card hover-lift project-card--link"
                >
                  {content}
                </a>
              ) : (
                <article key={project.id} className="project-card hover-lift">
                  {content}
                </article>
              );
            })}
          </div>
        </section>

        <section id="writing" className="section section-contact">
          <div className="section-header section-header--grey">
            <h2 className="section-title">
              <span className={writingIsCode ? "section-title-code" : ""}>
                {renderSectionTitle(
                  writingIsCode,
                  writingTitle,
                  "I also write sometimes",
                  "#I also write sometimes"
                )}
              </span>
              <span className="section-title-line" />
            </h2>
            <p>Some random thoughts explained through terms I need to know for my courses.</p>
          </div>
          <div className="writing-shell">
            <div className="writing-carousel">
              <button
                type="button"
                className="writing-arrow"
                onClick={() =>
                  setActiveArticleIndex(
                    (prev) => (prev - 1 + ARTICLES.length) % ARTICLES.length
                  )
                }
                aria-label="Previous article"
              >
                ‹
              </button>

              <div className="writing-track">
                {[0, 1].map((offset) => {
                  const article =
                    ARTICLES[
                      (activeArticleIndex + offset + ARTICLES.length) % ARTICLES.length
                    ];

                  return (
                    <a
                      key={article.id}
                      href={article.link || "#"}
                      className="writing-card hover-lift writing-card--hero"
                      target={article.link ? "_blank" : undefined}
                      rel={article.link ? "noreferrer" : undefined}
                    >
                      <div
                        className="writing-cover"
                        style={
                          article.image
                            ? {
                                backgroundImage: `url(${article.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                              }
                            : undefined
                        }
                      >
                        {article.tag && <span className="writing-tag">{article.tag}</span>}
                      </div>
                      <div className="writing-meta">
                        <h3>{article.title}</h3>
                        <p>{article.subtitle}</p>
                        <span className="writing-read-link">Read article →</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <button
                type="button"
                className="writing-arrow"
                onClick={() => setActiveArticleIndex((prev) => (prev + 1) % ARTICLES.length)}
                aria-label="Next article"
              >
                ›
              </button>
            </div>

            <div className="writing-controls">
              {ARTICLES.map((article, index) => (
                <button
                  key={article.id}
                  type="button"
                  className={
                    "writing-dot" + (index === activeArticleIndex ? " writing-dot--active" : "")
                  }
                  onClick={() => setActiveArticleIndex(index)}
                  aria-label={`Go to article: ${article.title}`}
                />
              ))}
            </div>
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


