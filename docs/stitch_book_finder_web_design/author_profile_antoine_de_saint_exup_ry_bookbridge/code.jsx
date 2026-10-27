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
const pageScripts = [
  '\n          const followBtn = document.getElementById("follow-btn");\n          if (followBtn) {\n            let isFollowing = false;\n            followBtn.addEventListener("click", () => {\n              isFollowing = !isFollowing;\n              if (isFollowing) {\n                followBtn.classList.remove("bg-on-tertiary-container");\n                followBtn.classList.add("bg-primary");\n                followBtn.innerHTML =\n                  \'<span class="material-symbols-outlined text-[18px]">check</span><span>Scholar Alerts Active</span>\';\n              } else {\n                followBtn.classList.add("bg-on-tertiary-container");\n                followBtn.classList.remove("bg-primary");\n                followBtn.innerHTML =\n                  \'<span class="material-symbols-outlined text-[18px]">notifications_active</span><span>Follow Author / Add Scholar Alerts</span>\';\n              }\n            });\n          }\n\n          document.querySelectorAll(".bookmark-btn").forEach((btn) => {\n            btn.addEventListener("click", (e) => {\n              e.preventDefault();\n              const icon = btn.querySelector(".material-symbols-outlined");\n              if (icon.textContent === "bookmark_border") {\n                icon.textContent = "bookmark";\n                icon.style.fontVariationSettings = "\'FILL\' 1";\n                btn.classList.add("text-on-tertiary-container");\n              } else {\n                icon.textContent = "bookmark_border";\n                icon.style.fontVariationSettings = "\'FILL\' 0";\n                btn.classList.remove("text-on-tertiary-container");\n              }\n            });\n          });\n\n          document.querySelectorAll(".work-filter-btn").forEach((button) => {\n            button.addEventListener("click", () => {\n              document.querySelectorAll(".work-filter-btn").forEach((b) => {\n                b.classList.remove(\n                  "bg-surface-container-lowest",\n                  "text-primary",\n                  "shadow-sm",\n                );\n                b.classList.add("text-on-surface-variant");\n              });\n              button.classList.add(\n                "bg-surface-container-lowest",\n                "text-primary",\n                "shadow-sm",\n              );\n              button.classList.remove("text-on-surface-variant");\n            });\n          });\n        ',
];

export default function AuthorProfileAntoineDeSaintExupRyBookbridge() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "author_profile_antoine_de_saint_exup_ry_bookbridge",
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDzO_GBPm8isEUkTqlc0rXu0_CDktn0QcjBDQc8lwZ2oQyRpG9MkPFYhbvUKXmBhdK2GJgYVYAMhG2Vx6oj7aqnEb4cuLSFnSJK5356BnlaaQpZo6m4C2iQsyTsxqQXmfC8dHRL30N8OSPQzTEYbxyaJZy0d3kun6iP7ROH7IBhuU9vkHTy06UR-JLKph1gjAHaH89kBMePOEsWbliDR50dnSmBfid-LCRtFZaQ"
            />
            <span className="font-headline-md text-headline-md tracking-tight text-primary">
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
              className="px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
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
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <section className="w-full bg-surface-container-low/70 py-4">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant"
              >
                <a className="hover:text-primary transition-colors" href="#">
                  Home
                </a>
                <span className="material-symbols-outlined text-[14px]">
                  chevron_right
                </span>
                <a className="hover:text-primary transition-colors" href="#">
                  Authors
                </a>
                <span className="material-symbols-outlined text-[14px]">
                  chevron_right
                </span>
                <span className="text-primary font-semibold">
                  Antoine de Saint-Exupéry
                </span>
              </nav>
              <div className="flex items-center gap-4">
                <a
                  className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-tertiary-container hover:text-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    west
                  </span>
                  <span>Back to Book Directory</span>
                </a>
                <span className="text-outline-variant">•</span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px] text-accent-gold-light">
                    verified
                  </span>
                  BnF Verified Archival Entry #1944-EXUP
                </span>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-12 lg:py-16">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="bg-surface-container-lowest rounded-xl p-8 lg:p-12 shadow-xl shadow-primary/5 flex flex-col lg:flex-row gap-10 lg:gap-14 items-start relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-surface-container/60 blur-3xl pointer-events-none" />
                <div className="absolute right-12 bottom-6 text-on-surface-variant/10 font-headline-lg select-none pointer-events-none text-[120px] leading-none font-bold">
                  1900
                </div>
                <div className="flex flex-col items-center shrink-0 w-full lg:w-72">
                  <div className="relative group">
                    <div className="w-56 h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl shadow-primary/20 bg-surface-container p-1">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        alt="Classic sepia-toned vintage portrait of Antoine de Saint-Exupéry in authentic 1930s aviation leather jacket and pilot cap, thoughtful philosophical gaze, cinematic archival lighting, textured grain of historical literary press photography."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZvpKrcPuvTbSTT8xdu7ywaKQfoh4pBvANFcfoSnbGl5P9A84m4ApddvR0V_kGR3uQKi2wnNPGsIMD_7JLrqNcIXvq77PtnA8xO_PHqsG5Ac_y1knYQrSWFt3zIQSUkLwHKc54qOxmrJ8w2l4XH9Rb1PrK-ARP2bnwgJclSwqCc3UVVQMGxhiBXzobtnJwiKRTYOQs1_3yua9qwedhu2YAv-DcceQi_cQCPjnLkg"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-1 bg-surface-container-high rounded-full p-2.5 shadow-md flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-tertiary-container text-[26px]">
                        flight_takeoff
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-status-success inline-block" />
                      Public Domain Collection
                    </div>
                    <p className="font-label-sm text-label-sm text-outline mt-2 tracking-wide uppercase">
                      Died for France (Mort pour la France)
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-6 w-full">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                        Archival Dossier
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Fonds Littéraire Français
                      </span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                      Antoine de Saint-Exupéry
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant italic">
                      1900 – 1944 <span className="mx-2">•</span> Lyon, France
                      <span className="mx-2">•</span> Disappeared near Île de
                      Riou, Mediterranean Sea
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      Pioneering Aviator
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      Philosophical Novelist
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      Poet &amp; Illustrator
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      French Resistance Free Forces
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="bg-surface p-4 rounded-lg">
                      <div className="font-headline-sm text-headline-sm text-primary">
                        3
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Works Cataloged
                      </div>
                    </div>
                    <div className="bg-surface p-4 rounded-lg">
                      <div className="font-headline-sm text-headline-sm text-primary">
                        12.8k
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Active Readers
                      </div>
                    </div>
                    <div className="bg-surface p-4 rounded-lg">
                      <div className="font-headline-sm text-headline-sm text-on-tertiary-container flex items-center gap-1">
                        4.9
                        <span
                          className="material-symbols-outlined text-[18px] text-accent-gold-light"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Scholarly Rating
                      </div>
                    </div>
                    <div className="bg-surface p-4 rounded-lg">
                      <div className="font-headline-sm text-headline-sm text-primary">
                        100+
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Global Translations
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      className="px-6 py-3 rounded-full bg-on-tertiary-container text-on-primary font-label-md text-label-md flex items-center gap-2 hover:opacity-90 shadow-md shadow-on-tertiary-container/20 transition-all"
                      id="follow-btn"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        notifications_active
                      </span>
                      <span>Follow Author / Add Scholar Alerts</span>
                    </button>
                    <button className="px-5 py-3 rounded-full bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container transition-all">
                      <span className="material-symbols-outlined text-[18px]">
                        translate
                      </span>
                      <span>Original French Editions</span>
                    </button>
                    <button className="px-4 py-3 rounded-full bg-surface text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-1.5 transition-all">
                      <span className="material-symbols-outlined text-[18px]">
                        format_quote
                      </span>
                      <span>Cite Dossier</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-8">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <article className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-[2px] bg-on-tertiary-container" />
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container">
                        Literary Odyssey
                      </span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-primary">
                      The Pilot-Philosopher of the Human Condition
                    </h2>
                    <p className="font-body-lg text-body-lg text-text-primary leading-relaxed">
                      Antoine Marie Jean-Baptiste Roger, comte de Saint-Exupéry,
                      lived at the razor-edge intersection of pioneering
                      aviation and introspective moral philosophy. In an epoch
                      when open-cockpit flights across uncharted deserts and
                      mountainous terrain constituted mortal gambles,
                      Saint-Exupéry transformed altitude into a transcendental
                      vantage point over human fragility.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm relative overflow-hidden">
                    <div className="absolute -left-2 -top-4 text-surface-container text-[110px] font-headline-lg select-none pointer-events-none leading-none">
                      “
                    </div>
                    <blockquote className="relative z-10 font-headline-md text-headline-md italic text-primary leading-snug">
                      “What is essential is invisible to the eye. It is only
                      with the heart that one can see rightly.”
                    </blockquote>
                    <p className="mt-4 font-label-sm text-label-sm text-on-surface-variant tracking-wide uppercase font-semibold">
                      — Le Petit Prince, Cap d’Antibes / New York (1942–1943)
                    </p>
                  </div>
                  <div className="space-y-5 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    <p>
                      Flying pioneering postal routes across the Sahara and
                      South America for Latecoère and Aéropostale, Saint-Exupéry
                      confronted elemental solitude. His miraculous 1935
                      survival following a crash in the Libyan Desert—battling
                      hallucinations, dehydration, and mirages for four days
                      before rescue by a Bedouin nomad—crystallized the
                      foundational symbols of his masterpieces: sand, wells,
                      solitary celestial bodies, and unvarnished camaraderie.
                    </p>
                    <p>
                      During World War II, exiled in North America and consumed
                      with despair over occupied France, he crafted the
                      allegorical fable <em>The Little Prince</em> alongside his
                      existential reflections in <em>Wind, Sand and Stars</em>.
                      Rejoining the Free French Air Force despite advanced age
                      and chronic injuries, he departed Borgo airfield in
                      Corsica on July 31, 1944, aboard a Lockheed F-5B Lightning
                      on an aerial reconnaissance mission over the Rhône Valley.
                      He never returned. His silver identity bracelet was
                      recovered off the coast of Marseille in 1998, enshrining
                      his life in heroic eternity.
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-6 flex gap-4 items-start">
                    <span className="material-symbols-outlined text-on-tertiary-container text-[24px] shrink-0 mt-0.5">
                      menu_book
                    </span>
                    <div>
                      <h3 className="font-title-md text-title-md text-primary">
                        Curatorial Commentary: Technology as Spiritual Crucible
                      </h3>
                      <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                        Unlike futurists who glorified mechanical force,
                        Saint-Exupéry considered the airplane merely an
                        instrument of perception—a tool peeling away earthly
                        trivialities to confront humanity with its absolute
                        obligations to fraternity, memory, and spiritual
                        guardianship.
                      </p>
                    </div>
                  </div>
                </article>
                <aside className="lg:col-span-5 space-y-6">
                  <div className="bg-surface-container-lowest rounded-xl p-6 lg:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-2">
                      <h3 className="font-title-md text-title-md text-primary">
                        Archival Milestones
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                        1900–1944
                      </span>
                    </div>
                    <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container">
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-on-tertiary-container" />
                        <span className="font-label-sm text-label-sm text-outline">
                          1926 • Casablanca – Dakar
                        </span>
                        <h4 className="font-title-md text-title-md text-primary mt-0.5">
                          Airmail Pioneer with Aéropostale
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Named Cape Juby airfield superintendent in Tarfaya,
                          negotiating safe returns with rebellious desert
                          tribes.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="font-label-sm text-label-sm text-outline">
                          1931 • Paris, France
                        </span>
                        <h4 className="font-title-md text-title-md text-primary mt-0.5">
                          Prix Femina for 'Night Flight'
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Praised by André Gide for illuminating silent stoicism
                          and leadership under South American night skies.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-on-tertiary-container" />
                        <span className="font-label-sm text-label-sm text-outline">
                          1935 • Wadi Natrun, Sahara
                        </span>
                        <h4 className="font-title-md text-title-md text-primary mt-0.5">
                          The Great Saharan Survival
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Paris-to-Saigon air race crash; wandering through
                          desert hallucinations becomes seminal literary memory.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="font-label-sm text-label-sm text-outline">
                          1939 • Académie Française
                        </span>
                        <h4 className="font-title-md text-title-md text-primary mt-0.5">
                          Grand Prix du Roman
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Awarded for <em>Terre des Hommes</em>; published in
                          English as <em>Wind, Sand and Stars</em>.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-error" />
                        <span className="font-label-sm text-label-sm text-outline">
                          31 July 1944 • Mediterranean
                        </span>
                        <h4 className="font-title-md text-title-md text-primary mt-0.5">
                          Final Reconnaissance Sortie
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Flight mission GR II/33 from Bastia-Borgo. Vanished at
                          altitude, resolving into myth.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-3">
                    <div className="h-44 rounded-lg overflow-hidden relative">
                      <img
                        className="w-full h-full object-cover"
                        alt="Archival black and white photograph of an antique Latecoere biplane sitting on a windblown Saharan desert runway at Cape Juby Tarfaya with desert sands, historical aviation atmosphere."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6lONqGPWq58Q2-r5BfN4senxI3nTjOYg0QhLOy9w35A2B34prfpIGzrlXz3jZhw5wLzfUvFakMa_KNITznZKXa3VsgSWh3F-YcaE-JXdWq9hYphQEYCessZq5_qcrvUwvJ3mO_0os5EgOMnPA-jO7UGRAcQ-L1E8Vf5KxqgCyuWoQNQWOlOcVCmFNVDzflUQ1jLtGSdz8jrHfkqIZAjCZ6ZhS5vjGQcs3Nvtk0Q"
                      />
                      <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
                        Archival Document: Tarfaya Outpost, 1928
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                      “The desert is beautiful because it conceals a well
                      somewhere in its expanse...”
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface-container-low/50 py-16">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container font-semibold">
                    Scholarly Hermeneutics
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary mt-1">
                    Philosophical Pillars in Saint-Exupéry's Canon
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                  Core existential motifs analyzed across BookBridge's
                  comparative literature reading groups.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        group
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-primary">
                      Existential Humanism &amp; Fraternity
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Belief that an individual only discovers true purpose
                      through unconditional responsibility to comrades and
                      fellow travelers across void.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-tertiary-container">
                      Ref: Wind, Sand &amp; Stars
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        wb_sunny
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-primary">
                      The Desert as Spiritual Metaphor
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      The stark silence of sands serves as a sanctuary stripping
                      human pretense, revealing internal truth, thirst, and
                      invisible waters.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-tertiary-container">
                      Ref: Le Petit Prince
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        child_care
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-primary">
                      Childhood Wonder vs. Utilitarianism
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      A lament against sterile adult quantification,
                      bean-counting ledger logic, and the tragic decay of
                      imaginative empathy.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-tertiary-container">
                      Ref: Asteroid B-612
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        nightlight
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-primary">
                      Duty, Solitude &amp; Fragile Bonds
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      The sacred gravity of taming relationships: “You become
                      responsible, forever, for what you have tamed.”
                    </p>
                  </div>
                  <div className="pt-4 mt-4 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-tertiary-container">
                      Ref: Vol de Nuit
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-16">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase tracking-wider">
                      BookBridge Digital Archive
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      3 Editions
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-primary mt-1">
                    Cataloged Works by Saint-Exupéry
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface-container overflow-x-auto self-start lg:self-auto">
                  <button
                    className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm transition-all work-filter-btn"
                    data-lang="all"
                  >
                    All Editions
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-all work-filter-btn"
                    data-lang="french"
                  >
                    French Originals
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-all work-filter-btn"
                    data-lang="english"
                  >
                    English Translations
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-all work-filter-btn"
                    data-lang="vietnamese"
                  >
                    Vietnamese Editions
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1">
                  <div className="relative w-full aspect-[4/5] bg-surface-container-high overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Classic illustrated book cover of The Little Prince standing on a tiny golden asteroid surrounded by deep navy cosmic stars, watercolor aesthetic, warm yellow scarf fluttering in cosmos, elegant editorial typography."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDodHy4e10b_2ubHmOikek-cKr4IU3L5kIKL-pGpPlhjOJuON-xSTjiAkZtRYADoV68AgzoQX8ZRjeQ9ajnaWXplV-t740zHb61tOS5hHPSLI-MLZlI84C1PBwOXlDrMvDdYIzFofvetUtCvbq7sv34t4ydoAt09QbtOJ0FgztxycZ1RG_5hSt5NxKIX_LmT4LqTyNL6M8CQn8WO82cQNNpci4NfOuw-zFhKh7pHQ"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
                        Canonical Masterpiece
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-on-tertiary-container/90 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
                        French / Multilingual
                      </span>
                    </div>
                    <button
                      aria-label="Quick Bookmark"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-primary hover:text-on-tertiary-container transition-colors shadow-sm bookmark-btn"
                      data-title="Le Petit Prince"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_border
                      </span>
                    </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                        <span>1943 • 96 Pages</span>
                        <span className="flex items-center gap-1 text-on-tertiary-container font-semibold">
                          <span
                            className="material-symbols-outlined text-[16px] text-accent-gold-light"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          4.8 / 5.0
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
                        Le Petit Prince (The Little Prince)
                      </h3>
                      <p className="font-label-md text-label-md text-outline font-normal">
                        Philosophical Allegory • Illustrated Parable
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        A stranded aviator in the Sahara meets an
                        extraterrestrial prince who reflects on vanity,
                        kingship, love for a unique rose, and the secrets of the
                        fox.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-3">
                      <a
                        className="flex-1 py-2.5 px-4 rounded-full bg-primary text-on-primary font-label-sm text-label-sm text-center hover:bg-primary-container transition-colors shadow-sm"
                        href="#"
                      >
                        View Work Details
                      </a>
                      <a
                        className="py-2.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center justify-center transition-colors"
                        href="#"
                        title="Read Archival Scan"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          auto_stories
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1">
                  <div className="relative w-full aspect-[4/5] bg-surface-container-high overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Vintage 1930s editorial art deco book cover of Night Flight Vol de Nuit showing an aerodynamic mail plane soaring over dark Patagonian Andes mountains under a starless stormy tempest sky, deep Prussian blue and metallic silver tones."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCkChJLR7AoHRa2chsoDZ_GrUsh0QE3Uo56NOdcLN1NpEB8YLA5ciZHqAOKU9WHLnetrJATFxH7poTNH7xMedUwEw3IvsQ21DI5cFiDYmIcZiL-nrTkYkpTMK2KyMOGN6Icq0hhQ7GTC89Xvq6xId4UEIWQ6Zq353azzWudVSn2zBbJBcsIs20K_DC5vLC_4mUsGL9hUZIinQvNURtJc-D09fFG-mL6U8SQyg0lg"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                        Prix Femina Winner
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
                        French / English
                      </span>
                    </div>
                    <button
                      aria-label="Quick Bookmark"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-primary hover:text-on-tertiary-container transition-colors shadow-sm bookmark-btn"
                      data-title="Vol de Nuit"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_border
                      </span>
                    </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                        <span>1931 • 128 Pages</span>
                        <span className="flex items-center gap-1 text-on-tertiary-container font-semibold">
                          <span
                            className="material-symbols-outlined text-[16px] text-accent-gold-light"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          4.7 / 5.0
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
                        Vol de Nuit (Night Flight)
                      </h3>
                      <p className="font-label-md text-label-md text-outline font-normal">
                        Aviation Fiction • Existential Humanist Drama
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Explores the severe discipline of Rivière, an airmail
                        director in Buenos Aires, confronting fate as pilot
                        Fabien enters an inescapable Andean cyclone.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-3">
                      <a
                        className="flex-1 py-2.5 px-4 rounded-full bg-primary text-on-primary font-label-sm text-label-sm text-center hover:bg-primary-container transition-colors shadow-sm"
                        href="#"
                      >
                        View Work Details
                      </a>
                      <a
                        className="py-2.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center justify-center transition-colors"
                        href="#"
                        title="Read Archival Scan"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          auto_stories
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1">
                  <div className="relative w-full aspect-[4/5] bg-surface-container-high overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Refined minimalist book cover for Wind Sand and Stars Terre des Hommes displaying an endless undulating Saharan desert sand dune ridge at dusk with warm amber horizon and a tiny human footprint silhouette, evocative literary cover."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4zkd6uKtV-S6ipOSOtXHCzoDSsg7wqYNjEjADc4uGK77KlbVacb1hLXPiKySC0qJmNRwggA0DO1R8FeNa6aIx5tTyyRRteBiYa-pgJpqcrJT9yDI7mQAUw3z2OGrbO_5CBR7EE9ltpOEzrqp0cNVFJFfbytdbUJMDuJbgbSdCDAtrzbm8Q-COLsdpX9fQyYJFoux-VPdahRsZRsHZq13nSOrza80yU_B2fKDqbQ"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                        Grand Prix du Roman
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
                        French / English / VN
                      </span>
                    </div>
                    <button
                      aria-label="Quick Bookmark"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-primary hover:text-on-tertiary-container transition-colors shadow-sm bookmark-btn"
                      data-title="Terre des Hommes"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_border
                      </span>
                    </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                        <span>1939 • 240 Pages</span>
                        <span className="flex items-center gap-1 text-on-tertiary-container font-semibold">
                          <span
                            className="material-symbols-outlined text-[16px] text-accent-gold-light"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          4.9 / 5.0
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
                        Terre des Hommes (Wind, Sand and Stars)
                      </h3>
                      <p className="font-label-md text-label-md text-outline font-normal">
                        Memoir • Philosophical Essay • Humanist Reflections
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Lyrical autobiographical chapters chronicling fellow
                        aviator Henri Guillaumet’s Andean rescue, the Libyan
                        crash survival, and human solidarity.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-3">
                      <a
                        className="flex-1 py-2.5 px-4 rounded-full bg-primary text-on-primary font-label-sm text-label-sm text-center hover:bg-primary-container transition-colors shadow-sm"
                        href="#"
                      >
                        View Work Details
                      </a>
                      <a
                        className="py-2.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center justify-center transition-colors"
                        href="#"
                        title="Read Archival Scan"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          auto_stories
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface-container-low/60 py-16">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container font-semibold">
                      Literary Orbit &amp; Era
                    </span>
                    <h2 className="font-headline-md text-headline-md text-primary mt-1">
                      Contemporary French Voices (1930–1950)
                    </h2>
                  </div>
                  <a
                    className="font-label-sm text-label-sm text-on-tertiary-container hover:text-primary transition-colors flex items-center gap-1"
                    href="#"
                  >
                    <span>Browse 20th Century French Movement</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-surface-container">
                      <img
                        className="w-full h-full object-cover"
                        alt="Monochrome archival portrait of Albert Camus with upturned trench coat collar and cigarette, thoughtful intellectual expression, 1940s vintage atmosphere."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh6FFN7NGcEfT1NHMVD59YROv8iteMSgSq1y7kobxw-iSCDgP-vUyrBP0QpNbyPGyv8gmEQc-vD1OOuckbTMvowso60mLvZKGyDAk7Bw2I_OL20nLuJ5yLTv6QQwfozhblqa0dPuVgPfV7bxyuGTVfMg3tnkb7fWkT6DRSw9qoAq1lu08BFdeS9nFGhuLEiFBJAE-be0tkB9OqnXJrhSlQTxWbfAuntEQNdHIL8g"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-outline">
                        Absurdism • Moral Resistance
                      </span>
                      <h3 className="font-title-md text-title-md text-primary hover:text-secondary cursor-pointer">
                        Albert Camus
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Shared Exupéry's rejection of dogmatic abstractions in
                        favor of direct human solidarity and Mediterranean
                        lucidity.
                      </p>
                      <div className="pt-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          4 Works on BookBridge
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-surface-container">
                      <img
                        className="w-full h-full object-cover"
                        alt="Archival vintage portrait of French writer and adventurer Andre Malraux during the 1930s, intense gaze, heroic humanism intellectual portrait."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA3VFbjd5K1rdYxzn2ka_pIVG3ZC5u09nug6D2nPKWFGoMc77kmcT1iYG65IEEBo7pQ3Kv0Q1yYzWhpk70mqkPfHMRrWInS3OACKjfFSeXUpgWLQm2OOfjypyxN22VNcxbScAHwktSexM_sBIDGz28rhne52Hd1xGUrxnekw_JovduBOXxbLCllJ2MU3Ia_SCqiiRtwyQSFOMMiDIOwbruzmsBSWgGAftS2xQvRg"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-outline">
                        Heroic Humanism • Action
                      </span>
                      <h3 className="font-title-md text-title-md text-primary hover:text-secondary cursor-pointer">
                        André Malraux
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Explored the metaphysics of courage and physical action
                        as humanity's primary bulwark against oblivion.
                      </p>
                      <div className="pt-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          3 Works on BookBridge
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-surface-container">
                      <img
                        className="w-full h-full object-cover"
                        alt="Archival portrait of philosopher Jean-Paul Sartre in classic Parisian cafe study, 1940s intellectual French literary existentialism."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6re2zwu45_SrunsVsQubnRwAtCAbqxmKcis8euPOkfErBBT3LyOOE7FXUL8T_chzPKvUYoBsIbOXFBVvrSJ_grgDrdz3GcaxWHVN7_6IjgDjwqTXj3joZyCGemcFxw_gGiZTpenuavNA1mWXfdBDwNOhfc0WndgRov6ETwBSs1W1lPa110cSH8eBwFIn-xFcTTfPVa7H2qFRusSy6JvmuRytoVG52pfeT7BLofg"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-outline">
                        Existential Philosophy
                      </span>
                      <h3 className="font-title-md text-title-md text-primary hover:text-secondary cursor-pointer">
                        Jean-Paul Sartre
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        Wrote admiringly on Exupéry’s aviation prose as an
                        authentic embodiment of freedom and responsibility.
                      </p>
                      <div className="pt-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          6 Works on BookBridge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">
                      history_edu
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">
                      Archival Provenance &amp; Public Domain Ethics
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Textual records and editorial annotations for Antoine de
                    Saint-Exupéry are cross-referenced with the
                    <strong className="text-primary">
                      Bibliothèque nationale de France (BnF Gallica)
                    </strong>
                    and the
                    <strong className="text-primary">
                      Open Library Academic Metadata Registry
                    </strong>
                    . Works are preserved under open-access educational
                    guidelines for scholarly research and non-commercial
                    pedagogy.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button className="px-5 py-2.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      file_download
                    </span>
                    <span>Download RIS Citation</span>
                  </button>
                  <button className="px-5 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      open_in_new
                    </span>
                    <span>BnF Record #FRBNF11923397</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDzO_GBPm8isEUkTqlc0rXu0_CDktn0QcjBDQc8lwZ2oQyRpG9MkPFYhbvUKXmBhdK2GJgYVYAMhG2Vx6oj7aqnEb4cuLSFnSJK5356BnlaaQpZo6m4C2iQsyTsxqQXmfC8dHRL30N8OSPQzTEYbxyaJZy0d3kun6iP7ROH7IBhuU9vkHTy06UR-JLKph1gjAHaH89kBMePOEsWbliDR50dnSmBfid-LCRtFZaQ"
                />
                <span className="font-headline-sm text-headline-sm tracking-tight text-primary">
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
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary">
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
                    data-path="gallery"
                    href="#"
                  >
                    Cover Visual Gallery
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
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary">
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
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary">
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
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary">
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
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-tertiary-container">
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
