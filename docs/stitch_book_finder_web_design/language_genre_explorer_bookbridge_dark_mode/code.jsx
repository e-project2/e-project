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
  '\n        (function initExplorerInteractions() {\n          let currentLanguage = "vietnamese";\n          let currentGenre = "all";\n          let currentCefr = "all";\n          let searchQuery = "";\n\n          const langCards = document.querySelectorAll(".language-card");\n          const genreChips = document.querySelectorAll(".genre-chip");\n          const cefrPills = document.querySelectorAll(".cefr-pill");\n          const bookCards = document.querySelectorAll(".book-card");\n          const searchInput = document.getElementById("book-filter-input");\n          const heading = document.getElementById("current-explorer-heading");\n          const displayedCount = document.getElementById("displayed-count");\n          const nullState = document.getElementById("no-results-state");\n          const resetBtn = document.getElementById("reset-filters-btn");\n\n          const languageLabels = {\n            vietnamese: "Vietnamese",\n            english: "English",\n            french: "French",\n            japanese: "Japanese",\n            spanish: "Spanish",\n          };\n\n          function applyFilters() {\n            let visible = 0;\n\n            bookCards.forEach((card) => {\n              const genre = card.dataset.genre;\n              const level = card.dataset.level;\n              const title = (card.dataset.title || "").toLowerCase();\n              const author = (card.dataset.author || "").toLowerCase();\n\n              const matchesGenre =\n                currentGenre === "all" || genre === currentGenre;\n              const matchesCefr =\n                currentCefr === "all" || level === currentCefr;\n              const matchesSearch =\n                !searchQuery ||\n                title.includes(searchQuery) ||\n                author.includes(searchQuery);\n\n              if (matchesGenre && matchesCefr && matchesSearch) {\n                card.classList.remove("hidden");\n                card.classList.add("flex");\n                visible++;\n              } else {\n                card.classList.add("hidden");\n                card.classList.remove("flex");\n              }\n            });\n\n            displayedCount.textContent = visible;\n\n            if (visible === 0) {\n              nullState.classList.remove("hidden");\n            } else {\n              nullState.classList.add("hidden");\n            }\n\n            const activeGenreBtn = document.querySelector(\n              \'.genre-chip[data-genre="\' + currentGenre + \'"]\',\n            );\n            const genreLabel = activeGenreBtn\n              ? activeGenreBtn.textContent.replace(/\\(\\d+\\)/, "").trim()\n              : "All Genres";\n            heading.textContent =\n              "Exploring World Literature in " +\n              languageLabels[currentLanguage] +\n              " & " +\n              genreLabel;\n          }\n\n          langCards.forEach((card) => {\n            card.addEventListener("click", () => {\n              langCards.forEach((c) => {\n                c.classList.remove(\n                  "bg-surface-container-high",\n                  "ring-1",\n                  "ring-primary-container/70",\n                );\n                c.classList.add("bg-surface-container-low");\n                const badge = c.querySelector(".material-symbols-outlined");\n                if (badge) {\n                  badge.textContent = "circle";\n                  badge.classList.remove("text-primary");\n                  badge.classList.add("text-outline-variant");\n                }\n              });\n\n              card.classList.remove("bg-surface-container-low");\n              card.classList.add(\n                "bg-surface-container-high",\n                "ring-1",\n                "ring-primary-container/70",\n              );\n              const badge = card.querySelector(".material-symbols-outlined");\n              if (badge) {\n                badge.textContent = "check_circle";\n                badge.classList.remove("text-outline-variant");\n                badge.classList.add("text-primary");\n              }\n\n              currentLanguage = card.dataset.lang || "vietnamese";\n              applyFilters();\n            });\n          });\n\n          genreChips.forEach((chip) => {\n            chip.addEventListener("click", () => {\n              genreChips.forEach((c) => {\n                c.classList.remove(\n                  "bg-primary-container",\n                  "text-on-primary-container",\n                );\n                c.classList.add(\n                  "bg-surface-container",\n                  "text-on-surface-variant",\n                );\n              });\n              chip.classList.remove(\n                "bg-surface-container",\n                "text-on-surface-variant",\n              );\n              chip.classList.add(\n                "bg-primary-container",\n                "text-on-primary-container",\n              );\n              currentGenre = chip.dataset.genre || "all";\n              applyFilters();\n            });\n          });\n\n          cefrPills.forEach((pill) => {\n            pill.addEventListener("click", () => {\n              cefrPills.forEach((p) => {\n                p.classList.remove(\n                  "bg-surface-container-highest",\n                  "text-primary",\n                  "font-semibold",\n                );\n                p.classList.add(\n                  "bg-surface-container",\n                  "text-on-surface-variant",\n                );\n              });\n              pill.classList.remove(\n                "bg-surface-container",\n                "text-on-surface-variant",\n              );\n              pill.classList.add(\n                "bg-surface-container-highest",\n                "text-primary",\n                "font-semibold",\n              );\n              currentCefr = pill.dataset.level || "all";\n              applyFilters();\n            });\n          });\n\n          if (searchInput) {\n            searchInput.addEventListener("input", (e) => {\n              searchQuery = e.target.value.trim().toLowerCase();\n              applyFilters();\n            });\n          }\n\n          if (resetBtn) {\n            resetBtn.addEventListener("click", () => {\n              currentGenre = "all";\n              currentCefr = "all";\n              searchQuery = "";\n              if (searchInput) searchInput.value = "";\n\n              genreChips.forEach((c) => {\n                if (c.dataset.genre === "all") {\n                  c.classList.add(\n                    "bg-primary-container",\n                    "text-on-primary-container",\n                  );\n                  c.classList.remove(\n                    "bg-surface-container",\n                    "text-on-surface-variant",\n                  );\n                } else {\n                  c.classList.remove(\n                    "bg-primary-container",\n                    "text-on-primary-container",\n                  );\n                  c.classList.add(\n                    "bg-surface-container",\n                    "text-on-surface-variant",\n                  );\n                }\n              });\n\n              cefrPills.forEach((p) => {\n                if (p.dataset.level === "all") {\n                  p.classList.add(\n                    "bg-surface-container-highest",\n                    "text-primary",\n                    "font-semibold",\n                  );\n                  p.classList.remove(\n                    "bg-surface-container",\n                    "text-on-surface-variant",\n                  );\n                } else {\n                  p.classList.remove(\n                    "bg-surface-container-highest",\n                    "text-primary",\n                    "font-semibold",\n                  );\n                  p.classList.add(\n                    "bg-surface-container",\n                    "text-on-surface-variant",\n                  );\n                }\n              });\n\n              applyFilters();\n            });\n          }\n        })();\n      ',
];

export default function LanguageGenreExplorerBookbridgeDarkMode() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "language_genre_explorer_bookbridge_dark_mode",
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
              aria-current="page"
              className="px-space-md py-space-xs rounded-lg transition-colors bg-surface-container-high text-primary font-semibold"
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
              className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
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
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-primary-container/10 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-secondary-container/5 rounded-full blur-[90px] pointer-events-none" />
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg pt-space-xl pb-space-lg">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl">
                <div className="max-w-3xl space-y-space-xs">
                  <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      public
                    </span>
                    <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">
                      Polyglot Archival Index
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    Language &amp; Genre Explorer
                  </h1>
                  <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl">
                    Traverse literary canons across 5+ world languages and
                    discover timeless works curated by philosophical genres,
                    translation fidelity, and linguistic nuance.
                  </p>
                </div>
                <div className="flex items-center gap-space-md bg-surface-container-low p-space-sm rounded-xl shadow-md">
                  <div className="px-space-md py-space-xs">
                    <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Canon Editions
                    </div>
                    <div className="font-headline-md text-headline-md text-primary">
                      1,480+
                    </div>
                  </div>
                  <div className="w-px h-8 bg-surface-container-highest" />
                  <div className="px-space-md py-space-xs">
                    <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Traditions
                    </div>
                    <div className="font-headline-md text-headline-md text-secondary">
                      5 Canons
                    </div>
                  </div>
                  <div className="w-px h-8 bg-surface-container-highest" />
                  <div className="px-space-md py-space-xs">
                    <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Annotations
                    </div>
                    <div className="font-headline-md text-headline-md text-tertiary">
                      100% Scholarly
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded-xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center gap-space-xs">
                <div className="flex-1 flex items-center px-space-md gap-space-sm">
                  <span className="material-symbols-outlined text-outline text-[22px]">
                    manage_search
                  </span>
                  <input
                    className="w-full bg-transparent font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:outline-none py-space-sm"
                    id="book-filter-input"
                    placeholder="Search by title, original manuscript title, author, or philosophical thesis..."
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-space-xs px-space-xs pb-space-xs md:pb-0">
                  <button
                    className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      tune
                    </span>
                    <span>Metadata Filters</span>
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-md hover:brightness-110 active:scale-95 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      explore
                    </span>
                    <span>Discover</span>
                  </button>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg py-space-lg">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container font-label-caps text-label-caps flex items-center justify-center font-bold">
                    01
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Select Literary Canon &amp; Language
                  </h2>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant hidden sm:inline">
                  Active selection dictates typography and CEFR benchmarks
                </span>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md"
                id="language-deck"
              >
                <div
                  className="language-card group relative p-space-md bg-surface-container-high rounded-xl shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ring-1 ring-primary-container/70"
                  data-lang="vietnamese"
                >
                  <div className="flex items-start justify-between mb-space-sm">
                    <span className="px-space-xs py-0.5 rounded-full bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase">
                      Selected
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      check_circle
                    </span>
                  </div>
                  <div className="space-y-space-xs mb-space-md">
                    <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      Tiếng Việt
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Nom script legacy, modern national prose, and poignant
                      wartime memory narratives.
                    </p>
                  </div>
                  <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        menu_book
                      </span>
                      324 Volumes
                    </span>
                    <span className="px-space-xs py-0.5 bg-surface-container-lowest rounded text-primary font-label-caps text-label-caps font-semibold">
                      A1 – C2
                    </span>
                  </div>
                </div>
                <div
                  className="language-card group relative p-space-md bg-surface-container-low hover:bg-surface-container rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                  data-lang="english"
                >
                  <div className="flex items-start justify-between mb-space-sm">
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase">
                      Anglophone
                    </span>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] group-hover:text-primary transition-colors">
                      circle
                    </span>
                  </div>
                  <div className="space-y-space-xs mb-space-md">
                    <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      English
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Transatlantic romanticism, modernist
                      stream-of-consciousness, and post-colonial canons.
                    </p>
                  </div>
                  <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        menu_book
                      </span>
                      542 Volumes
                    </span>
                    <span className="px-space-xs py-0.5 bg-surface-container-lowest rounded text-on-surface-variant font-label-caps text-label-caps font-semibold">
                      A2 – C2
                    </span>
                  </div>
                </div>
                <div
                  className="language-card group relative p-space-md bg-surface-container-low hover:bg-surface-container rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                  data-lang="french"
                >
                  <div className="flex items-start justify-between mb-space-sm">
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase">
                      Francophonie
                    </span>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] group-hover:text-primary transition-colors">
                      circle
                    </span>
                  </div>
                  <div className="space-y-space-xs mb-space-md">
                    <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      Français
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Existentialist manifestos, 19th-century social realism,
                      and symbolist lyrical poetics.
                    </p>
                  </div>
                  <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        menu_book
                      </span>
                      210 Volumes
                    </span>
                    <span className="px-space-xs py-0.5 bg-surface-container-lowest rounded text-on-surface-variant font-label-caps text-label-caps font-semibold">
                      B1 – C2
                    </span>
                  </div>
                </div>
                <div
                  className="language-card group relative p-space-md bg-surface-container-low hover:bg-surface-container rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                  data-lang="japanese"
                >
                  <div className="flex items-start justify-between mb-space-sm">
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase">
                      East Asian
                    </span>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] group-hover:text-primary transition-colors">
                      circle
                    </span>
                  </div>
                  <div className="space-y-space-xs mb-space-md">
                    <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      日本語
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Heian court mono-no-aware aesthetics to Showa-era
                      psychological introspective realism.
                    </p>
                  </div>
                  <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        menu_book
                      </span>
                      186 Volumes
                    </span>
                    <span className="px-space-xs py-0.5 bg-surface-container-lowest rounded text-on-surface-variant font-label-caps text-label-caps font-semibold">
                      N5 – N1
                    </span>
                  </div>
                </div>
                <div
                  className="language-card group relative p-space-md bg-surface-container-low hover:bg-surface-container rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                  data-lang="spanish"
                >
                  <div className="flex items-start justify-between mb-space-sm">
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase">
                      Hispanophone
                    </span>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] group-hover:text-primary transition-colors">
                      circle
                    </span>
                  </div>
                  <div className="space-y-space-xs mb-space-md">
                    <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      Español
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Golden Age picaresque epics and Latin American magical
                      realist avant-garde.
                    </p>
                  </div>
                  <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        menu_book
                      </span>
                      218 Volumes
                    </span>
                    <span className="px-space-xs py-0.5 bg-surface-container-lowest rounded text-on-surface-variant font-label-caps text-label-caps font-semibold">
                      A2 – C2
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg py-space-md">
              <div className="bg-surface-container-low p-space-lg rounded-xl shadow-lg space-y-space-lg">
                <div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        category
                      </span>
                      <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                        Thematic Frameworks &amp; Genres
                      </span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Filter by philosophical perspective
                    </span>
                  </div>
                  <div
                    className="flex flex-wrap items-center gap-space-xs"
                    id="genre-filter-list"
                  >
                    <button
                      className="genre-chip px-space-md py-space-xs rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container shadow-sm transition-all"
                      data-genre="all"
                      type="button"
                    >
                      All Genres (20)
                    </button>
                    <button
                      className="genre-chip px-space-md py-space-xs rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-genre="philosophical"
                      type="button"
                    >
                      Philosophical Fiction (5)
                    </button>
                    <button
                      className="genre-chip px-space-md py-space-xs rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-genre="realism"
                      type="button"
                    >
                      Classic Realism (4)
                    </button>
                    <button
                      className="genre-chip px-space-md py-space-xs rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-genre="poetry"
                      type="button"
                    >
                      Epic Poetry &amp; Verse (2)
                    </button>
                    <button
                      className="genre-chip px-space-md py-space-xs rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-genre="magical"
                      type="button"
                    >
                      Magical Realism (3)
                    </button>
                    <button
                      className="genre-chip px-space-md py-space-xs rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-genre="satire"
                      type="button"
                    >
                      Social Satire &amp; Allegory (3)
                    </button>
                    <button
                      className="genre-chip px-space-md py-space-xs rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-genre="memoir"
                      type="button"
                    >
                      Archival Memoir &amp; Essays (3)
                    </button>
                  </div>
                </div>
                <div className="w-full h-px bg-surface-container-highest" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="space-y-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">
                        signal_cellular_alt
                      </span>
                      <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                        Reading Depth (CEFR Lexical Complexity)
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Calibrated to original vocabulary density and archaic
                      syntax.
                    </p>
                  </div>
                  <div
                    className="flex flex-wrap items-center gap-space-xs"
                    id="cefr-filter-list"
                  >
                    <button
                      className="cefr-pill px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-highest text-primary font-semibold shadow-sm transition-all"
                      data-level="all"
                      type="button"
                    >
                      All Levels
                    </button>
                    <button
                      className="cefr-pill px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-level="beginner"
                      type="button"
                    >
                      Beginner (A1–B1)
                    </button>
                    <button
                      className="cefr-pill px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-level="intermediate"
                      type="button"
                    >
                      Intermediate (B2)
                    </button>
                    <button
                      className="cefr-pill px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                      data-level="advanced"
                      type="button"
                    >
                      Advanced Academic (C1–C2)
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg pt-space-xl pb-space-2xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
                <div>
                  <div className="flex items-center gap-space-xs text-primary font-label-caps text-label-caps uppercase tracking-wider mb-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>Archival Repertoire</span>
                  </div>
                  <h2
                    className="font-headline-lg text-headline-lg text-on-surface"
                    id="current-explorer-heading"
                  >
                    Exploring World Literature in Vietnamese &amp; All Genres
                  </h2>
                </div>
                <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
                  <span>
                    Displaying
                    <strong
                      className="text-on-surface font-semibold"
                      id="displayed-count"
                    >
                      8
                    </strong>
                    masterworks
                  </span>
                  <div className="flex items-center bg-surface-container p-1 rounded-lg">
                    <button
                      aria-label="Grid View"
                      className="p-1 rounded bg-surface-container-highest text-primary"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        grid_view
                      </span>
                    </button>
                    <button
                      aria-label="List View"
                      className="p-1 rounded text-on-surface-variant hover:text-on-surface"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        view_agenda
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg"
                id="books-grid"
              >
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Nguyễn Du"
                  data-genre="poetry"
                  data-level="advanced"
                  data-title="Truyện Kiều"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Antiquarian Vietnamese manuscript cover of The Tale of Kieu by Nguyen Du, illuminated gold calligraphy on weathered charcoal handmade paper with delicate lotus filigree, cinematic ambient warm spotlight on dark moody background, museum archival photography, high texture richness."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvsldbtCjGvVnSkdOOc3alN9zm8c-XTDvS5mwXhtXQCdfYxVDZYJNTSxzsDxiN4C4LHU_Zf6vPA-wKiU9_S86Vdi7lsnW6868FWlM1mySBgyIhJg82x1M4MvMSoOVYugR4nJtmy0KqhoUjh28JWkBgBLV8CTXRK2zBkankEWHpGGOASzKXCF5l9u4LcXFcbVLzcEyxslGf3RmkPrj97TwLovwvTo96CF60glcdYA"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          National Epic
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-caps text-label-caps font-semibold">
                          CEFR C2
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        3,254 Verses
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Epic Poetry &amp; Verse
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1820 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Truyện Kiều
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Nguyễn Du
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        A seminal 3,254-line verse narrative exploring karmic
                        debt, filial devotion, and the existential trials of
                        Thúy Kiều.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Tô Hoài"
                  data-genre="philosophical"
                  data-level="beginner"
                  data-title="Dế Mèn Phiêu Lưu Ký"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Editorial book cover art of Diary of a Cricket by To Hoai, whimsical naturalist illustration of an adventurous golden cricket crossing lush deep emerald meadow grass under nocturnal amber twilight, elegant typography, rich dark contrast."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgwHHiu-9CmwB1r2N1MugskvaSwACCnE4JN_AhuPpeXlthXkSqWYYzAD_7L0Yy6fMo4wTDyZ5cLtoDnIlLqtGgpn8Py2Ibfvj4MQbW5dEZ2rJ89mL1xB8Wb0_sCepofHjdBwKmS4fuQFrcgO07Y8z6eR7i-hj7rR6rk-oYoMsm1Kzd_VRCY8Cod5qbODghLlufT0srpn_-nC2t4zFCH_X24_s4zqsmHX9LIo8mpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-secondary-fixed font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          Picaresque Fable
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-caps text-label-caps font-semibold">
                          CEFR B1
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        196 Pages
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Philosophical Allegory
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1941 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Dế Mèn Phiêu Lưu Ký
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Tô Hoài
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        A young cricket journeys across the pastoral wilderness
                        discovering fellowship, consequence, and humility.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Vũ Trọng Phụng"
                  data-genre="satire"
                  data-level="intermediate"
                  data-title="Số Đỏ"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Avant-garde modernist book cover for Dumb Luck by Vu Trong Phung, striking art deco geometric silhouettes of colonial Hanoi high society with biting satirical motifs, deep charcoal and vibrant amber gold highlights, ultra refined styling."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAELaaZhnIluqSNymxNkMQlED7RdKeRFeIzJ9rxjfEq9FnRkB_y3eHgpmytB0l10gRXl3iCeHfvPkHK61_Ecpa2WOe3lwkJ1gd3unPvBxmzR0ycnQ5T6AInlyhddLG9465sOOVws6kZbiNpofQl6Y4D9WhXBsHO1UfMZTxheG3QTrSJj8tdu-GKQiHXY1NWbCoaFInlEmYtnaxaG-fam5jRMEphgh64fAxMcQ-9NA"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-tertiary font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          Social Satire
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-caps text-label-caps font-semibold">
                          CEFR B2
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        264 Pages
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Social Satire &amp; Allegory
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1936 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Số Đỏ
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Vũ Trọng Phụng
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        The absurd, meteoric social rise of Red-Haired Xuân
                        within a bourgeois society seduced by westernization.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Ngô Tất Tố"
                  data-genre="realism"
                  data-level="intermediate"
                  data-title="Tắt Đèn"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Moody dramatic oil painting book cover of When the Light is Out by Ngo Tat To, solitary flickering oil lamp in a dark rustic rural earthen cottage during heavy rainfall, deep umber and glowing amber flame, raw emotional gravitas."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnhpyBMaMpCdY3Rg-g7OP7fJM9cpVTZBkxT36fyQfGA8rILmGPc-5sfYDA9phOe443T_2HOnuSWj4gq6Fk3pMBRaMqNGSK_4uZEmVHHBiKLTweJYlNq0cOEZbq6q0-ZmxZjrvrvJWMYcGvgWos1L3suUD5j9F4ve96HebMnW18FTkc_wavH9REzmQaP0tCU6YoK_qZu9AEcruuxWkew6z3E6zdp5Fu5ZbL5_OFew"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          Critical Realism
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-caps text-label-caps font-semibold">
                          CEFR B2
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        210 Pages
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Classic Realism
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1939 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Tắt Đèn
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Ngô Tất Tố
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        Chị Dậu's relentless courage confronting oppressive
                        colonial-feudal taxation to preserve her family.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Nam Cao"
                  data-genre="philosophical"
                  data-level="intermediate"
                  data-title="Lão Hạc"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Contemplative literary book cover art for Old Man Hac by Nam Cao, an elderly weathered farmer sitting with his loyal companion dog under a misty banyan tree at twilight, atmospheric monochrome sepia and gentle warm lantern glow, deeply dignified and sorrowful."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFvWEeB1UFnVKurQe4fLFA3DpnGk_Vye05NbF543IYDngW_mghu5M6-C5KSrxiwOp1gkDO2BVznvzGeuQ7ag4eA7SfJ8VwTrt_RtQ1VvczApQcdGpaXi7i_MhwLT-Cw2ZjNkL4dI3qxfJcyRN-TL7VsKLvOpGkYxCdauid5En0MSqf0WFTDsCE0I86mjcS4S9YS_UjTCGRGC1nSNCTWTpm-Q2bf2vTwFrfvyO1cw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-tertiary font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          Ethical Treatise
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-caps text-label-caps font-semibold">
                          CEFR B2
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        128 Pages
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Philosophical Fiction
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1943 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Lão Hạc
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Nam Cao
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        An unflinching meditation on poverty, human dignity, and
                        ultimate self-sacrifice in pre-modern rural Vietnam.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Bảo Ninh"
                  data-genre="philosophical"
                  data-level="advanced"
                  data-title="Nỗi Buồn Chiến Tranh"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Surreal psychological novel cover for The Sorrow of War by Bao Ninh, fractured misty jungle landscape transitioning into abstract rain-streaked memory fragments, muted olive and deep nocturnal slate with warm amber embers floating, poignant literary aesthetic."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpMRLK9Uo-4hGiM0CBfYJydpQGGQO37vcOKf3p9iyjLcRRDSWJX78SlbYyLDDD_juextRAEf20meYyIIbfSP8Rbfmqdfcc8bL7EROe11VA6WCSQFXu7aiyea5DKNsYsQDANlCgQZohRxpuz791VmcoJyjgPsAcWpRDkn6KlD6M0N0mgb_lRZgy5gmz5ohXQ6f0FCy8kxGsiGMavpZDDJlBPrJuFVGNYENmZFn6mg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          Modern Classic
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-caps text-label-caps font-semibold">
                          CEFR C1
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        318 Pages
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Philosophical Fiction
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1990 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Nỗi Buồn Chiến Tranh
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Bảo Ninh
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        Nonlinear, poetic recollections of a veteran grappling
                        with grief, fractured love, and historical permanence.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Thạch Lam"
                  data-genre="memoir"
                  data-level="beginner"
                  data-title="Hà Nội 36 Phố Phường"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Intimate watercolor architectural book cover for Hanoi 36 Guild Streets by Thach Lam, ancient colonial ochre tiled roofs, tranquil alleyways with peddlers carrying fragrant lotus flowers, soft morning mist, refined vintage print texture."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8oiRNtvxozxxH6lyC2M71p6qlz0CHgNAsbXsOZJrZLn0wR1iB-QcMYLNP-LeeN7cUgnykaq_EfLQVfGd73wg_6_AkOcB5rMPHiXwJuBfum__2JUId55XnEfPWPQ3KP5S8CDigPEO0oB1xi7Iqe8mtWqJrBOPUrQwsKqQnyEU-BNDIigLGxHzdDVzKvfeUEBDAuG80QZ5DBvcy7YGcAr1lBf8dDn6R1BHgS4fxww"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-secondary-fixed font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          Urban Lyricism
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-caps text-label-caps font-semibold">
                          CEFR B1
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        160 Pages
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Archival Memoir &amp; Essays
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1943 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Hà Nội 36 Phố Phường
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Thạch Lam
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        Delicate sensory portraits of the capital city: culinary
                        delicacies, artisan crafts, and gentle everyday poetics.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article
                  className="book-card group flex flex-col justify-between bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                  data-author="Nam Cao"
                  data-genre="realism"
                  data-level="advanced"
                  data-title="Chí Phèo"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Haunting psychological novel cover for Chi Pheo by Nam Cao, an expressive shadowed face under pale moonlight along a tranquil riverbank overgrown with moonlit banana trees, dramatic chiaroscuro lighting, deep midnight blues and amber rim light."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLDVvaUKoyzMUNBK87wPFhSO56fwVAG7Fj8IBkvx2Hbqr-GMax4Q4wUrOODOovXKh6mNj-6fdfTcFy4fLgFGES1u759QRB0JWkq4l_nZQRb40uZ78tE-TzFCzl8OIkJPpz8sYa0K1ff50jKJf3CK_7OTwImOSiz0eVJ01unDHwPJ9gMASjTkVmflPplR0G2cnvF6Jg9OY1fKIhy-O7oA_yGDYDhODEtoCN6NuRFQ"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30" />
                      <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-tertiary-fixed font-label-caps text-label-caps uppercase font-bold shadow-sm">
                          Existential Realism
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-caps text-label-caps font-semibold">
                          CEFR C1
                        </span>
                      </div>
                      <div className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface-variant font-label-caps text-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        144 Pages
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-tertiary uppercase">
                          Classic Realism
                        </span>
                        <span className="font-label-md text-label-md text-outline">
                          1941 CE
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Chí Phèo
                      </h3>
                      <p className="font-label-lg text-label-lg text-on-surface-variant">
                        Nam Cao
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant/90 line-clamp-2 pt-1">
                        The harrowing struggle of an outcast seeking
                        reconciliation with humanity and the desperate yearning
                        for goodness.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-md pt-0 flex items-center gap-space-xs">
                    <button
                      className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors"
                      type="button"
                    >
                      <span>View Archival Details</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
              </div>
              <div
                className="hidden py-space-2xl text-center bg-surface-container-low rounded-xl shadow-inner mt-space-md"
                id="no-results-state"
              >
                <span className="material-symbols-outlined text-outline text-[48px] mb-space-sm">
                  auto_stories
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">
                  No Volumes Found Matching Criteria
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-md mx-auto">
                  Try expanding your CEFR reading spectrum or selecting "All
                  Genres" to inspect more archival entries.
                </p>
                <button
                  className="mt-space-md inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md"
                  id="reset-filters-btn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    refresh
                  </span>
                  Reset Explorer Filters
                </button>
              </div>
            </section>
            <section className="max-w-[1440px] mx-auto px-margin md:px-margin-lg pb-space-2xl">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-space-xl shadow-2xl">
                <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-xl">
                  <div className="space-y-space-sm max-w-2xl">
                    <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-container/15 text-primary">
                      <span className="material-symbols-outlined text-[16px]">
                        translate
                      </span>
                      <span className="font-label-caps text-label-caps uppercase tracking-wider">
                        Parallel Reading Engine
                      </span>
                    </div>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Bilingual &amp; Annotated Editions Available
                    </h3>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">
                      Every volume within BookBridge incorporates side-by-side
                      vernacular translations, synchronized audio cantos,
                      etymological roots, and scholarly footnotes curated by
                      literary historians.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs">
                      <div className="flex items-center gap-space-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          splitscreen
                        </span>
                        <span className="font-label-md text-label-md">
                          Dynamic Split Screen
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          record_voice_over
                        </span>
                        <span className="font-label-md text-label-md">
                          Phonetic Guidance
                        </span>
                      </div>
                      <div className="flex items-center gap-space-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-tertiary text-[18px]">
                          verified
                        </span>
                        <span className="font-label-md text-label-md">
                          Peer-Reviewed Notes
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-space-sm shrink-0">
                    <button
                      className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        chrome_reader_mode
                      </span>
                      <span>Launch Dual-Reader Mode</span>
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg shadow transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        add_circle
                      </span>
                      <span>Request Language Addition</span>
                    </button>
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
