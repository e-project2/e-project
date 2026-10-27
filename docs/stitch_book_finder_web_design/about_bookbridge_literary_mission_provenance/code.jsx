import { useEffect, useRef } from "react";
import { initializePrototypePage } from "../prototypeRuntime.js";

const pageStylesheets = [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&amp;display=swap",
  },
];
const pageStyles =
  "\n      @layer base {\n        html,\n        body {\n          margin: 0;\n          padding: 0;\n        }\n        body {\n          overscroll-behavior: none;\n        }\n        main > :first-child {\n          margin-top: 0 !important;\n        }\n        main > :last-child {\n          margin-bottom: 0 !important;\n        }\n      }\n      ::-webkit-scrollbar {\n        display: none;\n      }\n    ";
const tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tertiary: "#240f00",
        "on-tertiary-fixed": "#2f1500",
        "inverse-on-surface": "#eaf1ff",
        outline: "#75777d",
        "on-secondary-fixed-variant": "#004395",
        "surface-bright": "#f8f9ff",
        "text-primary": "#0F172A",
        "on-tertiary-fixed-variant": "#6e3900",
        "on-secondary-container": "#fefcff",
        "on-tertiary-container": "#d97705",
        "surface-container-low": "#eff4ff",
        "surface-container-lowest": "#ffffff",
        "on-secondary-fixed": "#001a42",
        "surface-container-high": "#dce9ff",
        "surface-tint": "#545f73",
        "on-error-container": "#93000a",
        "border-subtle": "#E2E8F0",
        background: "#f8f9ff",
        "on-surface-variant": "#45474c",
        "surface-canvas": "#F8FAFC",
        "on-background": "#0b1c30",
        secondary: "#0058be",
        "surface-container": "#e5eeff",
        "primary-fixed": "#d8e3fb",
        "accent-indigo": "#6366F1",
        "on-error": "#ffffff",
        "tertiary-container": "#422000",
        "status-danger": "#EF4444",
        error: "#ba1a1a",
        "on-surface": "#0b1c30",
        "surface-variant": "#d3e4fe",
        "accent-gold-light": "#F59E0B",
        surface: "#f8f9ff",
        "outline-variant": "#c5c6cd",
        "secondary-fixed": "#d8e2ff",
        "primary-container": "#1e293b",
        "on-secondary": "#ffffff",
        "secondary-container": "#2170e4",
        "primary-fixed-dim": "#bcc7de",
        "on-primary": "#ffffff",
        primary: "#091426",
        "on-primary-fixed": "#111c2d",
        "surface-dim": "#cbdbf5",
        "inverse-primary": "#bcc7de",
        "status-info": "#0EA5E9",
        "on-primary-container": "#8590a6",
        "secondary-fixed-dim": "#adc6ff",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#d3e4fe",
        "status-success": "#10B981",
        "on-primary-fixed-variant": "#3c475a",
        "inverse-surface": "#213145",
        "tertiary-fixed-dim": "#ffb77d",
        "tertiary-fixed": "#ffdcc3",
        "error-container": "#ffdad6",
        "surface-card": "#FFFFFF",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "margin-mobile": "1.25rem",
        "gutter-mobile": "1rem",
        margin: "3rem",
        gutter: "1.5rem",
        "space-md": "1rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
      },
      fontFamily: {
        "display-hero-mobile": ["Playfair Display"],
        "title-md": ["Plus Jakarta Sans"],
        "headline-lg": ["Playfair Display"],
        "display-hero": ["Playfair Display"],
        "headline-sm": ["Playfair Display"],
        "label-md": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "label-sm": ["Plus Jakarta Sans"],
        "headline-md": ["Playfair Display"],
        "headline-lg-mobile": ["Playfair Display"],
        "body-lg": ["Plus Jakarta Sans"],
        "body-sm": ["Plus Jakarta Sans"],
      },
      fontSize: {
        "display-hero-mobile": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "title-md": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "600" }],
        "headline-lg": [
          "2.5rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.015em",
            fontWeight: "700",
          },
        ],
        "display-hero": [
          "3.5rem",
          {
            lineHeight: "4.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-sm": [
          "1.25rem",
          { lineHeight: "1.75rem", fontWeight: "600" },
        ],
        "label-md": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.01em",
            fontWeight: "600",
          },
        ],
        "body-md": ["1rem", { lineHeight: "1.625rem", fontWeight: "400" }],
        "label-sm": [
          "0.75rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0.025em",
            fontWeight: "600",
          },
        ],
        "headline-md": [
          "1.75rem",
          { lineHeight: "2.25rem", fontWeight: "600" },
        ],
        "headline-lg-mobile": [
          "1.75rem",
          { lineHeight: "2.25rem", fontWeight: "700" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.875rem", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }],
      },
    },
  },
};
const pageScripts = [];

export default function AboutBookbridgeLiteraryMissionProvenance() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "about_bookbridge_literary_mission_provenance",
      stylesheets: pageStylesheets,
      styles: pageStyles,
      tailwindConfig,
      scripts: pageScripts,
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-surface text-on-surface font-body-md text-body-md antialiased selection:bg-surface-variant selection:text-primary"
    >
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-4 shrink-0">
            <img
              alt="BookBridge Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDzO_GBPm8isEUkTqlc0rXu0_CDktn0QcjBDQc8lwZ2oQyRpG9MkPFYhbvUKXmBhdK2GJgYVYAMhG2Vx6oj7aqnEb4cuLSFnSJK5356BnlaaQZo6m4C2iQsyTsxqQXmfC8dHRL30N8OSPQzTEYbxyaJZy0d3kun6iP7ROH7IBhuU9vkHTy06UR-JLKph1gjAHaH89kBMePOEsWbliDR50dnSmBfid-LCRtFZaQ"
            />
            <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">
              BookBridge
            </span>
          </div>
          <nav
            className="hidden xl:flex items-center gap-1"
            data-active-classes="text-primary font-bold bg-surface-container rounded-full"
          >
            <a
              className="px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="home"
              href="#"
            >
              Home
            </a>
            <a
              className="px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="directory"
              href="#"
            >
              Directory
            </a>
            <a
              className="px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="explorer"
              href="#"
            >
              Explorer
            </a>
            <a
              className="px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="collections"
              href="#"
            >
              Collections
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="my-library"
              href="#"
            >
              My Library
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                3 saved
              </span>
            </a>
            <a
              aria-current="page"
              className="px-3 py-1.5 transition-colors text-primary font-bold bg-surface-container rounded-full"
              data-path="about"
              href="#"
            >
              About
            </a>
            <a
              className="px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="contact"
              href="#"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Search Catalog"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
            </button>
            <button
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                light_mode
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-96 left-10 w-80 h-80 bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
              <nav className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                <a
                  className="hover:text-primary transition-colors flex items-center gap-1"
                  data-path="home"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    home
                  </span>
                  Home
                </a>
                <span className="material-symbols-outlined text-[14px] text-outline">
                  chevron_right
                </span>
                <span className="text-primary font-semibold">
                  About BookBridge
                </span>
              </nav>
            </div>
            <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-tertiary-container shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
                    <span className="font-label-sm text-label-sm tracking-wide font-semibold">
                      Scholarly Open Access • Curatorial Mission
                    </span>
                  </div>
                  <h1 className="font-display-hero text-display-hero text-primary font-bold tracking-tight leading-tight">
                    Bridging Worlds Through the
                    <span className="italic font-normal text-on-tertiary-container">
                      Architecture
                    </span>
                    of Letters
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    BookBridge was established as a sovereign digital reading
                    sanctuary—an intersection where world literature across
                    Vietnamese, English, French, Japanese, and Spanish
                    traditions converges. Conceived without behavioral trackers,
                    subscriptions, or digital gating, we preserve public domain
                    masterpieces with archival reverence for the deliberate
                    polyglot reader.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all"
                      data-path="directory"
                      href="#"
                    >
                      <span>Enter Canonical Catalog</span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container transition-all"
                      href="#how-it-works"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        menu_book
                      </span>
                      <span>Our Hermeneutic Method</span>
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-xl bg-surface-container-high">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      alt="Warm atmospheric archival library reading room with sunbeams through tall windows illuminating mahogany bookshelves, antique book spines, and a scholar's wooden study desk in literary modernist style with deep navy and amber accents"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWhraDRYWb_oV-l8vGL0Rhvx3T2bnQJvGGRvs4jMOMVVr97rxeU9-s2yQDYV7t19Dk5vRpE5EUtR6CXRkMArHJdSGH7dbhRuywsbbPjd6ezLuK_EZhLWcGCmdJFibMbmAT-Iz5A5kP1IFpno1Lf8chDUrVh9yAKvbK65r-f5w6PI7TeipyqgMMC_qUvUrz4S6NL1L55wHzxjzzbp23O1P-lDMkEUUe45g9WqIA6g"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-6 rounded-[16px] bg-surface-card/90 backdrop-blur-md shadow-lg space-y-2">
                      <div className="flex items-center justify-between text-on-tertiary-container font-label-sm text-label-sm">
                        <span className="font-semibold tracking-wider uppercase">
                          Archival Codex
                        </span>
                        <span>Open Folio #04-V</span>
                      </div>
                      <p className="font-headline-sm text-headline-sm text-primary italic font-medium">
                        “Words are bridges that outlast the rivers they span.”
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          verified
                        </span>
                        <span>Public domain preservation initiative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <div className="p-8 rounded-[16px] bg-surface-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[24px]">
                      public
                    </span>
                  </div>
                  <div>
                    <div className="font-headline-md text-headline-md text-primary font-bold">
                      20+ Masterworks
                    </div>
                    <div className="font-label-md text-label-md text-on-tertiary-container font-semibold mt-0.5">
                      5 Major Literary Canons
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Curated from classic Vietnamese, Francophone,
                    Anglo-American, Latin American, and Japanese historical
                    epochs with verified textual integrity.
                  </p>
                </div>
                <div className="p-8 rounded-[16px] bg-surface-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[24px]">
                      lock_reset
                    </span>
                  </div>
                  <div>
                    <div className="font-headline-md text-headline-md text-primary font-bold">
                      100% Client-Side
                    </div>
                    <div className="font-label-md text-label-md text-on-tertiary-container font-semibold mt-0.5">
                      Zero Data Mining
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Every reading session, note, and personal bookmark is stored
                    strictly within browser LocalStorage. No surveillance,
                    account walls, or telemetries.
                  </p>
                </div>
                <div className="p-8 rounded-[16px] bg-surface-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[24px]">
                      auto_stories
                    </span>
                  </div>
                  <div>
                    <div className="font-headline-md text-headline-md text-primary font-bold">
                      CEFR Aligned
                    </div>
                    <div className="font-label-md text-label-md text-on-tertiary-container font-semibold mt-0.5">
                      Polyglot Progression
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Categorized by lexical density and linguistic proficiency
                    (A2 to C2), allowing language scholars to bridge native
                    fluency with timeless prose.
                  </p>
                </div>
              </div>
            </section>
            <section
              className="w-full bg-surface-container-low py-20"
              id="how-it-works"
            >
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-widest font-bold">
                      Operational Praxis
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                      How to Traverse the BookBridge Library
                    </h2>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                    Engineered for thoughtful immersion. From macroscopic genre
                    landscapes down to granular syntactic annotations.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="p-8 rounded-[16px] bg-surface-card shadow-md flex flex-col justify-between space-y-8 relative overflow-hidden group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-headline-md text-headline-md text-on-tertiary-container font-bold">
                          01
                        </span>
                        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-medium">
                          Catalog Explorer
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-primary font-bold">
                        Discover &amp; Multi-Faceted Filtering
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Filter through the index via language dialect, temporal
                        epoch, reading cadence, or CEFR difficulty rating.
                        Discover forgotten treatises and modern staples within
                        seconds.
                      </p>
                    </div>
                    <div className="p-4 rounded-[12px] bg-surface-container-low space-y-2.5">
                      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                        <span>Filter Facet</span>
                        <span className="text-primary font-semibold">
                          Active Value
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
                          Vietnamese
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-surface-card text-on-surface font-label-sm text-label-sm">
                          Realism
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-surface-card text-on-surface font-label-sm text-label-sm">
                          B2 Level
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 rounded-[16px] bg-surface-card shadow-md flex flex-col justify-between space-y-8 relative overflow-hidden group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-headline-md text-headline-md text-on-tertiary-container font-bold">
                          02
                        </span>
                        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-medium">
                          Hermeneutics
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-primary font-bold">
                        Deep Contextual Dossiers
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Every title carries an exhaustive biographical profile
                        of the author, historical milieu notes, critical
                        reviews, thematic taxonomy, and restored cover
                        lithographs.
                      </p>
                    </div>
                    <div className="p-4 rounded-[12px] bg-surface-container-low space-y-3">
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span>Thematic Density Graph</span>
                        <span className="text-on-tertiary-container font-semibold">
                          Analytical Mode
                        </span>
                      </div>
                      <svg
                        className="w-full h-10 text-on-tertiary-container"
                        fill="none"
                        viewBox="0 0 200 40"
                      >
                        <path
                          d="M0 32 Q 25 10, 50 24 T 100 8 T 150 28 T 200 12"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                        />
                        <circle
                          className="fill-primary"
                          cx={100}
                          cy={8}
                          r={4}
                        />
                        <circle
                          className="fill-primary"
                          cx={150}
                          cy={28}
                          r={4}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-8 rounded-[16px] bg-surface-card shadow-md flex flex-col justify-between space-y-8 relative overflow-hidden group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-headline-md text-headline-md text-on-tertiary-container font-bold">
                          03
                        </span>
                        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-medium">
                          Private Reading Desk
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-primary font-bold">
                        Autonomous Browser Desk
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Pin volumes to your local shelf, adjust typography for
                        nocturnal reading, and log completed pages. The entire
                        state remains tethered purely to your machine.
                      </p>
                    </div>
                    <div className="p-4 rounded-[12px] bg-surface-container-low space-y-2">
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span>Local Reader State</span>
                        <span className="text-primary font-bold">
                          78% Synced
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                        <div className="w-[78%] h-full bg-on-tertiary-container rounded-full" />
                      </div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant pt-1">
                        Stored in persistent IndexedDB / localStorage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                      library_books
                    </span>
                    The Canonical 20 Selection
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                    Curated for Enduring Resonance &amp; Cultural Symmetry
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    The BookBridge primary corpus contains twenty benchmark
                    texts selected through rigorous curatorial deliberation.
                    Rather than amassing thousands of unverified digital scans,
                    we distill canonical milestones that represent distinct
                    linguistic breakthroughs.
                  </p>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 mt-1">
                        <span className="material-symbols-outlined text-[18px]">
                          balance
                        </span>
                      </div>
                      <div>
                        <h4 className="font-title-md text-title-md text-primary font-semibold">
                          Philosophical Weight
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Works that grapple with existential human dignity,
                          socio-political transformations, and the interior
                          landscape of memory.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 mt-1">
                        <span className="material-symbols-outlined text-[18px]">
                          translate
                        </span>
                      </div>
                      <div>
                        <h4 className="font-title-md text-title-md text-primary font-semibold">
                          Linguistic &amp; Pedagogical Merit
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Ideal syntactic structures for bilingual comparative
                          reading, academic translation studies, and CEFR
                          learners.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 mt-1">
                        <span className="material-symbols-outlined text-[18px]">
                          history_edu
                        </span>
                      </div>
                      <div>
                        <h4 className="font-title-md text-title-md text-primary font-semibold">
                          Cultural Provenance
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Balancing Vietnamese national epics like
                          <em className="italic">Truyện Kiều</em> alongside
                          global titan works by Saint-Exupéry, Orwell, Sōseki,
                          and García Márquez.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-64">
                    <div className="space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase">
                        Vietnamese Epic
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-primary font-bold line-clamp-2">
                        Truyện Kiều
                      </h5>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Nguyễn Du
                      </p>
                    </div>
                    <div className="pt-4 border-t-0 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Luc Bat Verse</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container font-semibold">
                        C1
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-64">
                    <div className="space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase">
                        Vietnamese Prose
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-primary font-bold line-clamp-2">
                        Dế Mèn Phiêu Lưu Ký
                      </h5>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Tô Hoài
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Allegory</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container font-semibold">
                        B1
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-64">
                    <div className="space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase">
                        Vietnamese Satire
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-primary font-bold line-clamp-2">
                        Số Đỏ (Dumb Luck)
                      </h5>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Vũ Trọng Phụng
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Modernist</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container font-semibold">
                        B2
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-64">
                    <div className="space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase">
                        French Poetics
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-primary font-bold line-clamp-2">
                        Le Petit Prince
                      </h5>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        A. de Saint-Exupéry
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Philosophical</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container font-semibold">
                        A2
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-64">
                    <div className="space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase">
                        Japanese Classics
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-primary font-bold line-clamp-2">
                        Kokoro (心)
                      </h5>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Natsume Sōseki
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Meiji Era</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container font-semibold">
                        B2
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-64 bg-primary-container text-on-primary">
                    <div className="space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase">
                        Magical Realism
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-on-primary font-bold line-clamp-2">
                        Cien Años de Soledad
                      </h5>
                      <p className="font-body-sm text-body-sm text-on-primary-container">
                        G. García Márquez
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between font-label-sm text-label-sm text-on-primary-container">
                      <span>Macondo Canon</span>
                      <span className="px-2 py-0.5 rounded bg-primary font-semibold text-on-primary">
                        C2
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full bg-surface-canvas py-20">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
                <div className="space-y-3 max-w-2xl">
                  <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-widest font-bold">
                    Provenance &amp; Attribution
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                    Open Knowledge &amp; Archival Collaborations
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    BookBridge operates on the generous shoulders of global open
                    access institutions, public bibliographic repositories, and
                    digital preservation foundations.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-[12px] bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[26px]">
                          account_balance
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary font-bold">
                        Open Library &amp; IA
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Bibliographic metadata, MARC-21 format schemas, and
                        synchronized ISBN/LCCN records provided via open API
                        registries.
                      </p>
                    </div>
                    <div className="pt-2 font-label-sm text-label-sm text-on-tertiary-container font-semibold flex items-center gap-1">
                      <span>Metadata Provider</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_outward
                      </span>
                    </div>
                  </div>
                  <div className="p-6 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-[12px] bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[26px]">
                          history
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary font-bold">
                        BnF Gallica
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Archival French and colonial Indochinese periodical
                        collections, high-fidelity scans, and early 20th-century
                        critical reception essays.
                      </p>
                    </div>
                    <div className="pt-2 font-label-sm text-label-sm text-on-tertiary-container font-semibold flex items-center gap-1">
                      <span>Digital Heritage</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_outward
                      </span>
                    </div>
                  </div>
                  <div className="p-6 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-[12px] bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[26px]">
                          menu_book
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary font-bold">
                        Project Gutenberg
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Clean UTF-8 raw text corpuses, public domain clearance
                        verifications, and non-restrictive reading
                        redistribution models.
                      </p>
                    </div>
                    <div className="pt-2 font-label-sm text-label-sm text-on-tertiary-container font-semibold flex items-center gap-1">
                      <span>Full-Text Archives</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_outward
                      </span>
                    </div>
                  </div>
                  <div className="p-6 rounded-[16px] bg-surface-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-[12px] bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[26px]">
                          palette
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary font-bold">
                        Visual Arts Guild
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Editorial portraiture, historical typography
                        reproductions, and book covers sourced respectfully
                        through Unsplash and Wikimedia Commons.
                      </p>
                    </div>
                    <div className="pt-2 font-label-sm text-label-sm text-on-tertiary-container font-semibold flex items-center gap-1">
                      <span>Creative Commons</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_outward
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
              <div className="p-10 lg:p-14 rounded-[16px] bg-primary text-on-primary shadow-xl relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                      school
                    </span>
                    Academic Demonstration v1.4 • Built with Modern Web
                    Standards
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-on-primary font-bold tracking-tight">
                    An Open-Source Digital Humanities Prototype
                  </h3>
                  <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                    This deployment of BookBridge was constructed as an academic
                    eProject exploring the intersection of modern semantic web
                    architectures, accessibility standards (WCAG AAA), and
                    digital literature preservation. All literary excerpts
                    remain the property of their respective estates or rest in
                    the global public domain under Creative Commons guidelines.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-on-tertiary-container text-on-tertiary font-label-md text-label-md hover:brightness-110 shadow-md transition-all"
                      data-path="directory"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        search
                      </span>
                      <span>Browse Canonical Directory</span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:bg-surface-tint/20 transition-all"
                      data-path="collections"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        collections_bookmark
                      </span>
                      <span>Explore Reading Collections</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  alt="BookBridge Logo"
                  className="h-7 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDzO_GBPm8isEUkTqlc0rXu0_CDktn0QcjBDQc8lwZ2oQyRpG9MkPFYhbvUKXmBhdK2GJgYVYAMhG2Vx6oj7aqnEb4cuLSFnSJK5356BnlaaQZo6m4C2iQsyTsxqQXmfC8dHRL30N8OSPQzTEYbxyaJZy0d3kun6iP7ROH7IBhuU9vkHTy06UR-JLKph1gjAHaH89kBMePOEsWbliDR50dnSmBfid-LCRtFZaQ"
                />
                <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                  BookBridge
                </span>
              </div>
              <p className="font-headline-sm text-headline-sm italic text-on-tertiary-container font-normal">
                “Bridge Worlds, Discover Voices Through Books”
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                A scholarly digital reading platform curated for reflective
                readers, archival researchers, and bibliophiles.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                Explore
              </h4>
              <ul className="space-y-2">
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="directory"
                    href="#"
                  >
                    Book Directory
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="explorer"
                    href="#"
                  >
                    Interactive Explorer
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="collections"
                    href="#"
                  >
                    Themed Shelves
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="author-profile"
                    href="#"
                  >
                    Author Profiles
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                Collections
              </h4>
              <ul className="space-y-2">
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="collections"
                    href="#"
                  >
                    Literary Modernism
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="collections"
                    href="#"
                  >
                    Curated Anthologies
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="collections"
                    href="#"
                  >
                    Global Dissertations
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="my-library"
                    href="#"
                  >
                    Personal Archival Shelf
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                Resources
              </h4>
              <ul className="space-y-2">
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="about"
                    href="#"
                  >
                    Editorial Standards
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="about"
                    href="#"
                  >
                    Archival Citations
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="contact"
                    href="#"
                  >
                    Scholarly Inquiry
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="contact"
                    href="#"
                  >
                    Community Reader Notes
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                Legal
              </h4>
              <ul className="space-y-2">
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#"
                  >
                    Privacy Charter
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#"
                  >
                    Public Domain Notice
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#"
                  >
                    Metadata Usage Rights
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#"
                  >
                    Open Access Ethics
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">
              BookBridge Academic eProject Demo © 2026. Interactive local
              storage reading tracker.
            </p>
            <div className="flex items-center gap-6">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                v1.4 Archive Build
              </span>
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                <span className="material-symbols-outlined text-[14px]">
                  bookmarks
                </span>
                Local Persistence Active
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
