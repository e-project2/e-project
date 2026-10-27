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
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&amp;family=Plus+Jakarta+Sans:wght@400;500;600&amp;display=swap",
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
        "primary-fixed": "#ffddb8",
        "inverse-surface": "#dfe2ee",
        "on-primary-fixed": "#2a1700",
        tertiary: "#ffc08e",
        "tertiary-fixed": "#ffdcc3",
        "inverse-on-surface": "#2c3039",
        "tertiary-fixed-dim": "#ffb77d",
        "outline-variant": "#534434",
        "surface-container": "#1c2028",
        surface: "#0f131c",
        background: "#0f131c",
        outline: "#a08e7a",
        "on-surface": "#dfe2ee",
        "tertiary-container": "#ff9837",
        "surface-dim": "#0f131c",
        "surface-bright": "#353942",
        "on-secondary-fixed-variant": "#004395",
        "secondary-fixed": "#d8e2ff",
        "primary-container": "#f59e0b",
        "on-surface-variant": "#d8c3ad",
        "surface-tint": "#ffb95f",
        "on-primary": "#472a00",
        "surface-variant": "#31353e",
        "primary-fixed-dim": "#ffb95f",
        "surface-container-highest": "#31353e",
        "on-primary-container": "#613b00",
        "on-tertiary-fixed-variant": "#6e3900",
        "on-secondary": "#002e6a",
        "error-container": "#93000a",
        "on-background": "#dfe2ee",
        "on-error": "#690005",
        secondary: "#adc6ff",
        "secondary-container": "#0566d9",
        "surface-container-high": "#262a33",
        "surface-container-lowest": "#0a0e16",
        "secondary-fixed-dim": "#adc6ff",
        "on-secondary-fixed": "#001a42",
        "on-tertiary": "#4d2600",
        "on-tertiary-container": "#6a3700",
        "on-secondary-container": "#e6ecff",
        error: "#ffb4ab",
        "on-tertiary-fixed": "#2f1500",
        "surface-container-low": "#181c24",
        "on-error-container": "#ffdad6",
        "inverse-primary": "#855300",
        primary: "#ffc174",
        "on-primary-fixed-variant": "#653e00",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "margin-sm": "1rem",
        "space-sm": "0.5rem",
        "space-2xl": "4rem",
        "space-lg": "1.5rem",
        margin: "1.5rem",
        "gutter-lg": "2.5rem",
        "margin-lg": "4rem",
        "space-xl": "2.5rem",
        "space-xs": "0.25rem",
        "space-md": "1rem",
        gutter: "1.5rem",
        "gutter-sm": "1rem",
      },
      fontFamily: {
        "display-lg-mobile": ["Playfair Display"],
        "label-lg": ["Inter"],
        "headline-xl": ["Playfair Display"],
        "headline-xl-mobile": ["Playfair Display"],
        "body-lg": ["Plus Jakarta Sans"],
        "headline-sm": ["Playfair Display"],
        "label-caps": ["Inter"],
        "display-lg": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "label-md": ["Inter"],
        "headline-lg": ["Playfair Display"],
        "body-xl": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
      },
      fontSize: {
        "display-lg-mobile": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "label-lg": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.01em",
            fontWeight: "600",
          },
        ],
        "headline-xl": [
          "40px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.015em",
            fontWeight: "600",
          },
        ],
        "headline-xl-mobile": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "body-lg": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "label-caps": [
          "11px",
          {
            lineHeight: "16px",
            letterSpacing: "0.08em",
            fontWeight: "700",
          },
        ],
        "display-lg": [
          "56px",
          {
            lineHeight: "68px",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "500" }],
        "label-md": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.02em",
            fontWeight: "500",
          },
        ],
        "headline-lg": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "-0.01em",
            fontWeight: "500",
          },
        ],
        "body-xl": [
          "20px",
          {
            lineHeight: "34px",
            letterSpacing: "-0.005em",
            fontWeight: "400",
          },
        ],
        "body-md": ["14px", { lineHeight: "22px", fontWeight: "400" }],
      },
    },
  },
};
const pageScripts = [
  '\n        (function () {\n          const canonData = {\n            all: {\n              title: "Focus: Pan-Continental Integration",\n              count: "20 Editions Cataloged",\n              desc: "Uniting classic literature across centuries. Each work serves as a linguistic beacon, carefully prepared with CEFR lexicons, dual translations, and historical context.",\n            },\n            vietnamese: {\n              title: "Tradition: Vietnamese Verse & Epics",\n              count: "4 Core Volumes (Kiều, Chinh Phụ Ngâm)",\n              desc: "Synthesizing classical chữ Nôm phonetics and modern quốc ngữ. Explore the profound 3,254 lục bát couplets of Nguyễn Du alongside comprehensive historical commentaries.",\n            },\n            satire: {\n              title: "Tradition: 20th Century Colonial Satire",\n              count: "3 Volumes (Vũ Trọng Phụng & Contemporaries)",\n              desc: "Sharp, biting explorations of urban modernization, moral hypocrisies, and stylistic realism capturing the tensions of early 20th-century Indochina.",\n            },\n            french: {\n              title: "Tradition: Symbolist & Flâneur Poetics",\n              count: "5 Volumes (Baudelaire, Rimbaud, Verlaine)",\n              desc: "Original rhythmic cadence and metered prose aligned with nuanced English and Vietnamese translations, enriched with BnF archival facsimiles.",\n            },\n            japanese: {\n              title: "Tradition: Meiji & Taishō Modern Classics",\n              count: "4 Volumes (Akutagawa, Sōseki, Dazai)",\n              desc: "Introspective psychological realism and historical folk tales translated with furigana parallel glossaries and linguistic progression tiers.",\n            },\n            magical: {\n              title: "Tradition: Hispanic & Magical Realism",\n              count: "4 Volumes (Borges, Cervantes, Rulfo)",\n              desc: "Metaphysical labyrinths and epic journeys rendered with cross-textual motif trackers and lexical footnotes.",\n            },\n          };\n\n          const container = document.getElementById("canon-tags-container");\n          const titleEl = document.getElementById("canon-preview-title");\n          const countEl = document.getElementById("canon-preview-count");\n          const descEl = document.getElementById("canon-preview-desc");\n\n          if (container) {\n            const buttons = container.querySelectorAll(".canon-tag");\n            buttons.forEach((btn) => {\n              btn.addEventListener("click", () => {\n                buttons.forEach((b) => {\n                  b.classList.remove(\n                    "bg-primary-container",\n                    "text-on-primary-container",\n                  );\n                  b.classList.add(\n                    "bg-surface-container-high",\n                    "text-on-surface",\n                  );\n                });\n\n                btn.classList.remove(\n                  "bg-surface-container-high",\n                  "text-on-surface",\n                );\n                btn.classList.add(\n                  "bg-primary-container",\n                  "text-on-primary-container",\n                );\n\n                const key = btn.getAttribute("data-filter") || "all";\n                const info = canonData[key] || canonData.all;\n\n                if (titleEl) titleEl.textContent = info.title;\n                if (countEl) countEl.textContent = info.count;\n                if (descEl) descEl.textContent = info.desc;\n              });\n            });\n          }\n        })();\n      ',
];

export default function AboutBookbridgeLiteraryMissionProvenanceDarkMode() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "about_bookbridge_literary_mission_provenance_dark_mode",
      stylesheets: pageStylesheets,
      styles: pageStyles,
      tailwindConfig,
      scripts: pageScripts,
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen"
    >
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1440px] mx-auto px-margin md:px-margin-lg flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <a
              className="flex items-center gap-space-xs group"
              data-path="home"
              href="#"
            >
              <span className="material-symbols-outlined text-primary text-[28px] transition-transform duration-300 group-hover:scale-105">
                auto_stories
              </span>
              <span className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Book<span className="text-primary">Bridge</span>
              </span>
            </a>
          </div>
          <nav
            className="hidden xl:flex items-center gap-space-xs"
            data-active-classes="bg-surface-container-high text-primary font-semibold"
          >
            <a
              className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              data-path="home"
              href="#"
            >
              Home
            </a>
            <a
              className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              data-path="directory"
              href="#"
            >
              Directory
            </a>
            <a
              className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              data-path="explorer"
              href="#"
            >
              Explorer
            </a>
            <a
              className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              data-path="collections"
              href="#"
            >
              Collections
            </a>
            <a
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              data-path="my-library"
              href="#"
            >
              <span>My Library</span>
              <span className="px-1.5 py-0.5 rounded-full font-label-caps text-label-caps bg-primary-container text-on-primary-container">
                3 saved
              </span>
            </a>
            <a
              aria-current="page"
              className="px-space-md py-space-xs rounded-lg transition-colors bg-surface-container-high text-primary font-semibold"
              data-path="about"
              href="#"
            >
              About
            </a>
            <a
              className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              data-path="contact"
              href="#"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-space-sm md:gap-space-md">
            <button
              aria-label="Quick Search"
              className="p-space-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
            </button>
            <button
              aria-label="Toggle Light or Dark Mode"
              className="flex items-center p-1 bg-surface-container rounded-full hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">
                  light_mode
                </span>
              </span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-surface-container-highest text-primary shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <span className="material-symbols-outlined text-[16px]">
                  dark_mode
                </span>
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden">
            <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[160px] pointer-events-none -z-10" />
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg pt-space-xl pb-space-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
                <div className="lg:col-span-7 space-y-space-lg">
                  <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-container" />
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                      Literary Mission &amp; Provenance
                    </span>
                  </div>
                  <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                    Bridging Worlds Through the
                    <span className="italic text-primary">Architecture</span> of
                    Letters
                  </h1>
                  <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl leading-relaxed">
                    BookBridge is conceived as a digital sanctuary where the
                    weight of historical memory meets contemporary digital
                    autonomy. We assemble foundational texts across five
                    linguistic continents—curated not for algorithmic
                    extraction, but for human contemplation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs">
                    <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-space-xs">
                        public
                      </span>
                      <div className="font-label-lg text-label-lg text-on-surface">
                        Polyglot Canons
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        Vietnamese, English, French, Japanese &amp; Spanish
                        literary heritage.
                      </p>
                    </div>
                    <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-space-xs">
                        lock_open_right
                      </span>
                      <div className="font-label-lg text-label-lg text-on-surface">
                        Unconditional Openness
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        No subscriptions, paywalls, or closed proprietary
                        ecosystems.
                      </p>
                    </div>
                    <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[24px] mb-space-xs">
                        shield
                      </span>
                      <div className="font-label-lg text-label-lg text-on-surface">
                        Sovereign Privacy
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        100% in-browser storage. Zero surveillance or telemetry
                        harvest.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-xl p-space-lg bg-surface-container shadow-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-lowest/80 via-transparent to-primary-container/10 pointer-events-none" />
                    <div className="relative w-full h-[360px] rounded-lg overflow-hidden shadow-md">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Close up photograph of a medieval leather-bound archival codex illuminated under warm candlelight in an ancient European stone vaulted library. Gilded leaf pages with deep dark ink calligraphic inscriptions, surrounded by nocturnal indigo shadows and warm amber light flares."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRgtRErDPWKcnsd_CobBch0mzA_WlF4scxS4Ji4MOxGfQHLOBQgn8RwtTh-S2tBBCIFfJTI1c9-lzuyVBzmpdAZAzHDatmWSo-aMAgAGD9G46O9wXc2NHqy9m7xlwpi-GCFEyAFNnS5hpXT3ybs33RSqlRvuNBLsbFvPYBQxFluCdQaRNHlvAEih6ZwyW2NIOSLBf6pFw5Jd0hXjn42AKk0MXYmzD6-Xmf_z9XOg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent" />
                      <div className="absolute bottom-space-md left-space-md right-space-md p-space-md rounded-lg bg-surface-container-low/90 backdrop-blur-md shadow-lg">
                        <span className="material-symbols-outlined text-primary text-[22px] mb-1">
                          format_quote
                        </span>
                        <p className="font-headline-sm text-headline-sm text-on-surface italic leading-snug">
                          “Words are bridges that outlast the rivers they span.”
                        </p>
                        <div className="mt-space-xs flex items-center justify-between">
                          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">
                            Folio Provenance № 402
                          </span>
                          <span className="font-label-md text-label-md text-primary">
                            Archival Manuscript Registry
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-space-md flex items-center justify-between text-on-surface-variant font-label-md text-label-md pt-space-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          verified
                        </span>
                        Verified Open Humanities Asset
                      </span>
                      <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary">
                        Codex Rev. 2026.2
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg py-space-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors duration-300 shadow-md flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="p-space-sm rounded-lg bg-surface-container-highest text-primary">
                      <span className="material-symbols-outlined text-[28px]">
                        library_books
                      </span>
                    </span>
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                      Core Archival Corpus
                    </span>
                  </div>
                  <div className="my-space-md">
                    <div className="font-display-lg text-display-lg text-on-surface tracking-tight">
                      20+
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary mt-1">
                      Masterworks &amp; Primary Texts
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                      Carefully curated across 5 civilizational canons,
                      including the complete Tale of Kiều, Rashōmon, and
                      foundational European enlightenment treatises.
                    </p>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-4/5 rounded-full" />
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors duration-300 shadow-md flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="p-space-sm rounded-lg bg-surface-container-highest text-primary">
                      <span className="material-symbols-outlined text-[28px]">
                        database
                      </span>
                    </span>
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                      Total Sovereign Architecture
                    </span>
                  </div>
                  <div className="my-space-md">
                    <div className="font-display-lg text-display-lg text-on-surface tracking-tight">
                      100%
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary mt-1">
                      Client-Side Persistence
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                      All bookmarks, annotations, and reading progress reside
                      exclusively in browser LocalStorage. No tracking pixels,
                      analytics beacons, or remote logs.
                    </p>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-full rounded-full" />
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors duration-300 shadow-md flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="p-space-sm rounded-lg bg-surface-container-highest text-primary">
                      <span className="material-symbols-outlined text-[28px]">
                        translate
                      </span>
                    </span>
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                      Linguistic Stratification
                    </span>
                  </div>
                  <div className="my-space-md">
                    <div className="font-display-lg text-display-lg text-on-surface tracking-tight">
                      CEFR
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary mt-1">
                      Multi-Tier Reading Scales
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                      Every edition indexed by lexical density and CEFR scale
                      indicators (A2 through C2), fostering unhindered polyglot
                      language acquisition and study.
                    </p>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-3/4 rounded-full" />
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg py-space-2xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
                <div className="space-y-space-xs max-w-2xl">
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                    Operational Praxis
                  </span>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface">
                    How to Traverse the BookBridge Library
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    A scholar-crafted navigation methodology designed to
                    eliminate algorithmic serendipity in favor of intentional,
                    deep-focus scholarship.
                  </p>
                </div>
                <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high rounded-full text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    menu_book
                  </span>
                  System Manual v3.4
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
                <div className="relative p-space-xl rounded-xl bg-surface-container-low shadow-md group hover:bg-surface-container transition-all duration-300">
                  <div className="font-headline-xl text-headline-xl text-primary/40 font-bold mb-space-md tracking-tighter">
                    01
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                    Discover &amp; Multi-Faceted Filtering
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Sort by lexical CEFR level, chronological provenance,
                    canonical genre, and source language. Pinpoint rare
                    translations or raw bilingual parallel transcripts with
                    near-instantaneous indexing.
                  </p>
                  <div className="mt-space-lg pt-space-md flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Language Matrix
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      CEFR Index
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Century Filter
                    </span>
                  </div>
                </div>
                <div className="relative p-space-xl rounded-xl bg-surface-container-low shadow-md group hover:bg-surface-container transition-all duration-300">
                  <div className="font-headline-xl text-headline-xl text-primary/40 font-bold mb-space-md tracking-tighter">
                    02
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                    Deep Contextual Dossiers
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Beyond the raw text lies an intellectual atlas. Access
                    historical geopolitical milieu, author biographies, critical
                    essays, translation divergence maps, and phonetic
                    pronunciation companions.
                  </p>
                  <div className="mt-space-lg pt-space-md flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Milieu Dossiers
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Variant Analysis
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Historical Chronology
                    </span>
                  </div>
                </div>
                <div className="relative p-space-xl rounded-xl bg-surface-container-low shadow-md group hover:bg-surface-container transition-all duration-300">
                  <div className="font-headline-xl text-headline-xl text-primary/40 font-bold mb-space-md tracking-tighter">
                    03
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                    Autonomous Browser Desk
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Transform reading into active scholarship. Highlight
                    passages, bookmark chapter folios, and export clean Markdown
                    notes. All stored persistently on your hardware without
                    server handshake.
                  </p>
                  <div className="mt-space-lg pt-space-md flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Offline Cached
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Markdown Export
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container-highest font-label-caps text-label-caps text-on-surface">
                      Bespoke Typographic Scales
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg py-space-xl">
              <div className="p-space-xl rounded-xl bg-surface-container-low shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
                  <div className="lg:col-span-5 space-y-space-md">
                    <div className="inline-flex items-center gap-space-xs text-primary font-label-caps text-label-caps uppercase tracking-widest">
                      <span className="material-symbols-outlined text-[18px]">
                        stars
                      </span>
                      Canonical Genesis
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      The Canonical 20 Curation Philosophy
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      We reject the boundless, uncurated sprawl of endless ebook
                      depositories where quality deteriorates into forgotten
                      noise. The Canonical 20 represents an intentional nucleus:
                      twenty definitive masterworks across distinct
                      civilizations that demonstrate the sheer elasticity of
                      human language.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Each volume undergoes meticulous typographical
                      restoration, orthographic normalization, and rigorous
                      public-domain copyright certification.
                    </p>
                    <div className="pt-space-xs">
                      <a
                        className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-primary hover:bg-surface-container-highest font-label-lg text-label-lg transition-colors"
                        data-path="directory"
                        href="#"
                      >
                        <span>View Full 20-Codex Dossier</span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-space-md tracking-wider">
                        Select Archival Canons &amp; Traditions (Click to
                        Filter)
                      </div>
                      <div
                        className="flex flex-wrap gap-space-sm"
                        id="canon-tags-container"
                      >
                        <button
                          className="canon-tag active px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-primary-container text-on-primary-container transition-all flex items-center gap-1.5"
                          data-filter="all"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            all_inclusive
                          </span>
                          All Canons
                        </button>
                        <button
                          className="canon-tag px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-1.5"
                          data-filter="vietnamese"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            history_edu
                          </span>
                          Vietnamese Epic (Truyện Kiều)
                        </button>
                        <button
                          className="canon-tag px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-1.5"
                          data-filter="satire"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            theater_comedy
                          </span>
                          Colonial Satire &amp; Realism
                        </button>
                        <button
                          className="canon-tag px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-1.5"
                          data-filter="french"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            menu_book
                          </span>
                          French Symbolist Poetics
                        </button>
                        <button
                          className="canon-tag px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-1.5"
                          data-filter="japanese"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            nature_people
                          </span>
                          Japanese Modern Classics
                        </button>
                        <button
                          className="canon-tag px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-1.5"
                          data-filter="magical"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            auto_fix_high
                          </span>
                          Ibero-American Magical Realism
                        </button>
                      </div>
                    </div>
                    <div
                      className="mt-space-lg p-space-md rounded-lg bg-surface-container shadow-inner"
                      id="canon-preview"
                    >
                      <div className="flex items-center justify-between text-primary font-label-caps text-label-caps uppercase tracking-wider mb-space-xs">
                        <span id="canon-preview-title">
                          Focus: Pan-Continental Integration
                        </span>
                        <span id="canon-preview-count">
                          20 Editions Cataloged
                        </span>
                      </div>
                      <p
                        className="font-body-md text-body-md text-on-surface-variant"
                        id="canon-preview-desc"
                      >
                        Uniting classic literature across centuries. Each work
                        serves as a linguistic beacon, carefully prepared with
                        CEFR lexicons, dual translations, and historical
                        context.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg py-space-2xl">
              <div className="space-y-space-xs text-center max-w-2xl mx-auto mb-space-xl">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                  Digital Provenance &amp; Lineage
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface">
                  Open Knowledge Collaborations
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  BookBridge stands on the shoulders of grand digital archives,
                  library consortiums, and public-domain preservation pioneers.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-space-md shadow-sm">
                      <span className="material-symbols-outlined text-[28px]">
                        account_balance
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                      Open Library &amp; IA
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Metadata reconciliation, raw OCR spine validation, and
                      immutable archival backups powered by the Internet
                      Archive.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                      Universal Library Access
                    </span>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-space-md shadow-sm">
                      <span className="material-symbols-outlined text-[28px]">
                        local_library
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                      BnF Gallica
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      High-resolution folio scans and facsimile alignments for
                      19th-century French symbolist poetry and epistolary
                      drafts.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                      Bibliothèque Nationale de France
                    </span>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-space-md shadow-sm">
                      <span className="material-symbols-outlined text-[28px]">
                        auto_stories
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                      Project Gutenberg
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Clean foundational text files, free from copyright
                      encumbrance, reviewed for modern typographic formatting
                      and layout.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                      Public Domain Heritage
                    </span>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary mb-space-md shadow-sm">
                      <span className="material-symbols-outlined text-[28px]">
                        palette
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                      Visual Arts Guild
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Curated period woodcuts, illuminated letterheads, and
                      public open-access museum engravings paired with each
                      masterwork.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs">
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                      Open Museum Repository
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg pt-space-lg pb-space-2xl">
              <div className="relative rounded-2xl bg-gradient-to-r from-surface-container to-surface-container-high p-space-xl md:p-space-2xl overflow-hidden shadow-2xl">
                <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl space-y-space-md">
                  <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-caps text-label-caps uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[16px]">
                      code
                    </span>
                    Open-Source Digital Humanities Prototype
                  </div>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface">
                    Step Into the Sanctuaries of World Literature
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    Begin your journey through centuries of verse, philosophical
                    inquiry, and narrative splendor without barrier,
                    registration, or distraction.
                  </p>
                  <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                    <a
                      className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim font-label-lg text-label-lg transition-colors shadow-md"
                      data-path="directory"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        explore
                      </span>
                      <span>Browse Canonical Directory</span>
                    </a>
                    <a
                      className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-bright font-label-lg text-label-lg transition-colors shadow-sm"
                      data-path="collections"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">
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
      <footer className="w-full bg-surface-container-lowest py-space-2xl mt-space-2xl">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg pb-space-xl">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  auto_stories
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                  BookBridge
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                A digital sanctuary for archival discovery, rare volume
                curations, and contemplative scholarship.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-md lg:gap-space-lg">
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                data-path="home"
                href="#"
              >
                Home
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                data-path="directory"
                href="#"
              >
                Directory
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                data-path="explorer"
                href="#"
              >
                Explorer
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                data-path="collections"
                href="#"
              >
                Collections
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                data-path="about"
                href="#"
              >
                About
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                data-path="contact"
                href="#"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-lg">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="font-label-md text-label-md">
                © 2026 BookBridge Archive. All rights reserved.
              </span>
            </div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                Local Persistence Active
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
