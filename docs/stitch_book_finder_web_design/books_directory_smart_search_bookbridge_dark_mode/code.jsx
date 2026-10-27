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
  '\n          (function initBooksDirectory() {\n            const searchInput = document.getElementById("search-input");\n            const clearSearchBtn = document.getElementById("clear-search");\n            const langRadios = document.querySelectorAll(\n              \'input[name="lang-filter"]\',\n            );\n            const genreCheckboxes =\n              document.querySelectorAll(".genre-checkbox");\n            const levelButtons = document.querySelectorAll(".level-btn");\n            const periodRadios = document.querySelectorAll(\n              \'input[name="period-filter"]\',\n            );\n            const clearAllBtn = document.getElementById("clear-all-btn");\n            const resetFiltersHero =\n              document.getElementById("reset-filters-hero");\n            const resetEmptyBtn = document.getElementById("reset-empty-btn");\n            const sortSelect = document.getElementById("sort-select");\n            const booksGrid = document.getElementById("books-grid");\n            const bookCards = Array.from(\n              document.querySelectorAll(".book-card"),\n            );\n            const visibleCountEl = document.getElementById("visible-count");\n            const noResultsState = document.getElementById("no-results-state");\n            const viewGridBtn = document.getElementById("view-grid-btn");\n            const viewListBtn = document.getElementById("view-list-btn");\n            const bookmarkBtns = document.querySelectorAll(".bookmark-btn");\n\n            let currentLevel = "all";\n\n            bookmarkBtns.forEach((btn) => {\n              btn.addEventListener("click", (e) => {\n                e.stopPropagation();\n                const icon = btn.querySelector(".material-symbols-outlined");\n                if (icon.textContent === "bookmark_border") {\n                  icon.textContent = "bookmark";\n                  icon.style.fontVariationSettings = "\'FILL\' 1";\n                  btn.classList.add("text-primary");\n                  btn.classList.remove("text-on-surface-variant");\n                } else {\n                  icon.textContent = "bookmark_border";\n                  icon.style.fontVariationSettings = "\'FILL\' 0";\n                  btn.classList.remove("text-primary");\n                  btn.classList.add("text-on-surface-variant");\n                }\n              });\n            });\n\n            viewListBtn.addEventListener("click", () => {\n              booksGrid.classList.remove(\n                "sm:grid-cols-2",\n                "md:grid-cols-2",\n                "xl:grid-cols-4",\n              );\n              booksGrid.classList.add("grid-cols-1");\n              viewListBtn.classList.add(\n                "bg-surface-container-highest",\n                "text-primary",\n              );\n              viewListBtn.classList.remove("text-on-surface-variant");\n              viewGridBtn.classList.remove(\n                "bg-surface-container-highest",\n                "text-primary",\n              );\n              viewGridBtn.classList.add("text-on-surface-variant");\n            });\n\n            viewGridBtn.addEventListener("click", () => {\n              booksGrid.classList.add(\n                "sm:grid-cols-2",\n                "md:grid-cols-2",\n                "xl:grid-cols-4",\n              );\n              booksGrid.classList.remove("grid-cols-1");\n              viewGridBtn.classList.add(\n                "bg-surface-container-highest",\n                "text-primary",\n              );\n              viewGridBtn.classList.remove("text-on-surface-variant");\n              viewListBtn.classList.remove(\n                "bg-surface-container-highest",\n                "text-primary",\n              );\n              viewListBtn.classList.add("text-on-surface-variant");\n            });\n\n            levelButtons.forEach((btn) => {\n              btn.addEventListener("click", () => {\n                levelButtons.forEach((b) => {\n                  b.classList.remove(\n                    "bg-primary-container",\n                    "text-on-primary-container",\n                  );\n                  b.classList.add(\n                    "bg-surface-container",\n                    "text-on-surface-variant",\n                  );\n                });\n                btn.classList.add(\n                  "bg-primary-container",\n                  "text-on-primary-container",\n                );\n                btn.classList.remove(\n                  "bg-surface-container",\n                  "text-on-surface-variant",\n                );\n                currentLevel = btn.getAttribute("data-level");\n                filterAndSortBooks();\n              });\n            });\n\n            searchInput.addEventListener("input", () => {\n              if (searchInput.value.trim().length > 0) {\n                clearSearchBtn.classList.remove("hidden");\n              } else {\n                clearSearchBtn.classList.add("hidden");\n              }\n              filterAndSortBooks();\n            });\n\n            clearSearchBtn.addEventListener("click", () => {\n              searchInput.value = "";\n              clearSearchBtn.classList.add("hidden");\n              filterAndSortBooks();\n            });\n\n            function resetAll() {\n              searchInput.value = "";\n              clearSearchBtn.classList.add("hidden");\n              document.querySelector(\n                \'input[name="lang-filter"][value="all"]\',\n              ).checked = true;\n              document.querySelector(\n                \'input[name="period-filter"][value="all"]\',\n              ).checked = true;\n              genreCheckboxes.forEach((cb) => (cb.checked = false));\n\n              currentLevel = "all";\n              levelButtons.forEach((b) => {\n                if (b.getAttribute("data-level") === "all") {\n                  b.classList.add(\n                    "bg-primary-container",\n                    "text-on-primary-container",\n                  );\n                  b.classList.remove(\n                    "bg-surface-container",\n                    "text-on-surface-variant",\n                  );\n                } else {\n                  b.classList.remove(\n                    "bg-primary-container",\n                    "text-on-primary-container",\n                  );\n                  b.classList.add(\n                    "bg-surface-container",\n                    "text-on-surface-variant",\n                  );\n                }\n              });\n\n              sortSelect.value = "title-asc";\n              filterAndSortBooks();\n            }\n\n            clearAllBtn.addEventListener("click", resetAll);\n            resetFiltersHero.addEventListener("click", resetAll);\n            resetEmptyBtn.addEventListener("click", resetAll);\n\n            langRadios.forEach((r) =>\n              r.addEventListener("change", filterAndSortBooks),\n            );\n            genreCheckboxes.forEach((cb) =>\n              cb.addEventListener("change", filterAndSortBooks),\n            );\n            periodRadios.forEach((r) =>\n              r.addEventListener("change", filterAndSortBooks),\n            );\n            sortSelect.addEventListener("change", filterAndSortBooks);\n\n            function filterAndSortBooks() {\n              const query = searchInput.value.toLowerCase().trim();\n              const selectedLang = document.querySelector(\n                \'input[name="lang-filter"]:checked\',\n              ).value;\n              const selectedPeriod = document.querySelector(\n                \'input[name="period-filter"]:checked\',\n              ).value;\n              const checkedGenres = Array.from(genreCheckboxes)\n                .filter((cb) => cb.checked)\n                .map((cb) => cb.value.toLowerCase());\n\n              let visibleCards = [];\n\n              bookCards.forEach((card) => {\n                const title = card.getAttribute("data-title");\n                const author = card.getAttribute("data-author");\n                const lang = card.getAttribute("data-lang");\n                const genre = card.getAttribute("data-genre").toLowerCase();\n                const level = card.getAttribute("data-level");\n                const year = parseInt(card.getAttribute("data-year"), 10);\n\n                const matchesQuery =\n                  !query || title.includes(query) || author.includes(query);\n\n                const matchesLang =\n                  selectedLang === "all" || lang === selectedLang;\n\n                const matchesLevel =\n                  currentLevel === "all" || level === currentLevel;\n\n                let matchesGenre = true;\n                if (checkedGenres.length > 0) {\n                  matchesGenre = checkedGenres.some((g) => genre.includes(g));\n                }\n\n                let matchesPeriod = true;\n                if (selectedPeriod === "pre-1950") matchesPeriod = year < 1950;\n                else if (selectedPeriod === "1950-2000")\n                  matchesPeriod = year >= 1950 && year <= 2000;\n                else if (selectedPeriod === "post-2000")\n                  matchesPeriod = year > 2000;\n\n                if (\n                  matchesQuery &&\n                  matchesLang &&\n                  matchesLevel &&\n                  matchesGenre &&\n                  matchesPeriod\n                ) {\n                  card.classList.remove("hidden");\n                  visibleCards.push(card);\n                } else {\n                  card.classList.add("hidden");\n                }\n              });\n\n              const sortValue = sortSelect.value;\n              visibleCards.sort((a, b) => {\n                if (sortValue === "title-asc") {\n                  return a\n                    .getAttribute("data-title")\n                    .localeCompare(b.getAttribute("data-title"));\n                } else if (sortValue === "title-desc") {\n                  return b\n                    .getAttribute("data-title")\n                    .localeCompare(a.getAttribute("data-title"));\n                } else if (sortValue === "year-asc") {\n                  return (\n                    parseInt(a.getAttribute("data-year")) -\n                    parseInt(b.getAttribute("data-year"))\n                  );\n                } else if (sortValue === "year-desc") {\n                  return (\n                    parseInt(b.getAttribute("data-year")) -\n                    parseInt(a.getAttribute("data-year"))\n                  );\n                } else if (sortValue === "pages-asc") {\n                  return (\n                    parseInt(a.getAttribute("data-pages")) -\n                    parseInt(b.getAttribute("data-pages"))\n                  );\n                } else if (sortValue === "pages-desc") {\n                  return (\n                    parseInt(b.getAttribute("data-pages")) -\n                    parseInt(a.getAttribute("data-pages"))\n                  );\n                } else if (sortValue === "popular") {\n                  return (\n                    parseInt(b.getAttribute("data-popular")) -\n                    parseInt(a.getAttribute("data-popular"))\n                  );\n                }\n                return 0;\n              });\n\n              visibleCards.forEach((card) => booksGrid.appendChild(card));\n\n              visibleCountEl.textContent = visibleCards.length;\n              if (visibleCards.length === 0) {\n                booksGrid.classList.add("hidden");\n                noResultsState.classList.remove("hidden");\n              } else {\n                booksGrid.classList.remove("hidden");\n                noResultsState.classList.add("hidden");\n              }\n            }\n\n            filterAndSortBooks();\n          })();\n        ',
];

export default function BooksDirectorySmartSearchBookbridgeDarkMode() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "books_directory_smart_search_bookbridge_dark_mode",
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
              aria-current="page"
              className="px-space-md py-space-xs rounded-lg transition-colors bg-surface-container-high text-primary font-semibold"
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
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/3 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <section className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-lg pt-space-lg pb-space-md">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md mb-space-sm"
              >
                <a
                  className="hover:text-primary transition-colors flex items-center gap-1"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    home
                  </span>
                  <span>Archive</span>
                </a>
                <span className="text-on-surface-variant/40">/</span>
                <span className="text-on-surface">Catalogue Index</span>
                <span className="text-on-surface-variant/40">/</span>
                <span className="text-primary font-semibold">Smart Search</span>
              </nav>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-lg">
                <div className="space-y-space-xs">
                  <div className="inline-flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-caps text-label-caps uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px]">
                      local_library
                    </span>
                    <span>Comprehensive Indexation</span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    Books Directory
                    <span className="font-serif italic font-normal text-primary">
                      &amp; Smart Search
                    </span>
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                    Traverse multilingual manuscripts, rare translations, and
                    canonical prose through multi-tier bibliometric taxonomy.
                  </p>
                </div>
                <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Index Coverage
                    </span>
                    <span
                      className="font-label-lg text-label-lg text-on-surface"
                      id="results-count-text"
                    >
                      Showing
                      <strong className="text-primary" id="visible-count">
                        10
                      </strong>
                      of 10 books cataloged
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">
                      auto_stories
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <main className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-lg pb-space-2xl">
              <div className="flex flex-col lg:flex-row items-start gap-gutter-lg">
                <aside
                  className="w-full lg:w-80 flex-shrink-0 transition-all duration-300"
                  id="filter-sidebar"
                >
                  <div className="bg-surface-container-low/90 backdrop-blur-xl rounded-xl p-space-md lg:p-space-lg space-y-space-lg shadow-xl sticky top-24">
                    <div className="flex items-center justify-between pb-space-sm">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          tune
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          Filter Stacks
                        </span>
                      </div>
                      <button
                        className="font-label-md text-label-md text-primary hover:text-primary-fixed underline underline-offset-4 cursor-pointer transition-colors"
                        id="clear-all-btn"
                        type="button"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-space-xs">
                      <label
                        className="font-label-md text-label-md text-on-surface flex items-center justify-between"
                        htmlFor="search-input"
                      >
                        <span>Keyword / Title / Author</span>
                        <span className="text-on-surface-variant text-[11px] font-label-caps uppercase">
                          Live Filter
                        </span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                          search
                        </span>
                        <input
                          className="w-full bg-surface-container rounded-lg pl-9 pr-8 py-2 text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                          id="search-input"
                          placeholder="e.g. Kiều, Orwell, Camus..."
                          type="text"
                        />
                        <button
                          className="hidden absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                          id="clear-search"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-space-xs">
                      <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant block">
                        Language
                      </span>
                      <div className="space-y-1.5 pt-1" id="language-filters">
                        <label className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              defaultChecked
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer"
                              name="lang-filter"
                              type="radio"
                              defaultValue="all"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              All Languages
                            </span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                            10
                          </span>
                        </label>
                        <label className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer"
                              name="lang-filter"
                              type="radio"
                              defaultValue="Vietnamese"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              Vietnamese
                            </span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                            3
                          </span>
                        </label>
                        <label className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer"
                              name="lang-filter"
                              type="radio"
                              defaultValue="English"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              English
                            </span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                            2
                          </span>
                        </label>
                        <label className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer"
                              name="lang-filter"
                              type="radio"
                              defaultValue="French"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              French
                            </span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                            1
                          </span>
                        </label>
                        <label className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer"
                              name="lang-filter"
                              type="radio"
                              defaultValue="Japanese"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              Japanese
                            </span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                            2
                          </span>
                        </label>
                        <label className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer"
                              name="lang-filter"
                              type="radio"
                              defaultValue="Spanish"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              Spanish
                            </span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                            1
                          </span>
                        </label>
                        <label className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer"
                              name="lang-filter"
                              type="radio"
                              defaultValue="Russian"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              Russian
                            </span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                            1
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-space-xs">
                      <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant block">
                        Genre &amp; Taxonomy
                      </span>
                      <div
                        className="grid grid-cols-2 gap-1.5 pt-1"
                        id="genre-filters"
                      >
                        <label className="flex items-center gap-2 px-2 py-1 rounded bg-surface-container/60 hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="genre-checkbox accent-primary-container w-3.5 h-3.5 rounded"
                            type="checkbox"
                            defaultValue="Fiction"
                          />
                          <span className="font-label-md text-label-md text-on-surface">
                            Fiction
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded bg-surface-container/60 hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="genre-checkbox accent-primary-container w-3.5 h-3.5 rounded"
                            type="checkbox"
                            defaultValue="Philosophy"
                          />
                          <span className="font-label-md text-label-md text-on-surface">
                            Philosophy
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded bg-surface-container/60 hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="genre-checkbox accent-primary-container w-3.5 h-3.5 rounded"
                            type="checkbox"
                            defaultValue="Sci-Fi"
                          />
                          <span className="font-label-md text-label-md text-on-surface">
                            Sci-Fi
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded bg-surface-container/60 hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="genre-checkbox accent-primary-container w-3.5 h-3.5 rounded"
                            type="checkbox"
                            defaultValue="Historical"
                          />
                          <span className="font-label-md text-label-md text-on-surface">
                            Historical
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded bg-surface-container/60 hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="genre-checkbox accent-primary-container w-3.5 h-3.5 rounded"
                            type="checkbox"
                            defaultValue="Romance"
                          />
                          <span className="font-label-md text-label-md text-on-surface">
                            Romance
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded bg-surface-container/60 hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="genre-checkbox accent-primary-container w-3.5 h-3.5 rounded"
                            type="checkbox"
                            defaultValue="Satire"
                          />
                          <span className="font-label-md text-label-md text-on-surface">
                            Satire
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-space-xs">
                      <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant block">
                        Curated Difficulty
                      </span>
                      <div
                        className="flex flex-wrap gap-1.5 pt-1"
                        id="level-filters"
                      >
                        <button
                          className="level-btn px-2.5 py-1 rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container transition-all"
                          data-level="all"
                          type="button"
                        >
                          All Levels
                        </button>
                        <button
                          className="level-btn px-2.5 py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface transition-all"
                          data-level="Beginner"
                          type="button"
                        >
                          Beginner
                        </button>
                        <button
                          className="level-btn px-2.5 py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface transition-all"
                          data-level="Intermediate"
                          type="button"
                        >
                          Intermediate
                        </button>
                        <button
                          className="level-btn px-2.5 py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface transition-all"
                          data-level="Advanced"
                          type="button"
                        >
                          Advanced
                        </button>
                      </div>
                    </div>
                    <div className="space-y-space-xs">
                      <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant block">
                        Publication Period
                      </span>
                      <div className="space-y-1.5 pt-1" id="period-filters">
                        <label className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            defaultChecked
                            className="accent-primary-container w-3.5 h-3.5 rounded cursor-pointer"
                            name="period-filter"
                            type="radio"
                            defaultValue="all"
                          />
                          <span className="font-body-md text-body-md text-on-surface">
                            All Eras
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="accent-primary-container w-3.5 h-3.5 rounded cursor-pointer"
                            name="period-filter"
                            type="radio"
                            defaultValue="pre-1950"
                          />
                          <span className="font-body-md text-body-md text-on-surface">
                            Before 1950
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="accent-primary-container w-3.5 h-3.5 rounded cursor-pointer"
                            name="period-filter"
                            type="radio"
                            defaultValue="1950-2000"
                          />
                          <span className="font-body-md text-body-md text-on-surface">
                            1950 – 2000
                          </span>
                        </label>
                        <label className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-container cursor-pointer transition-colors">
                          <input
                            className="accent-primary-container w-3.5 h-3.5 rounded cursor-pointer"
                            name="period-filter"
                            type="radio"
                            defaultValue="post-2000"
                          />
                          <span className="font-body-md text-body-md text-on-surface">
                            Post-2000
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-space-xs">
                      <button
                        className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 transition-colors"
                        id="reset-filters-hero"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          restart_alt
                        </span>
                        <span>Reset Applied Filters</span>
                      </button>
                    </div>
                  </div>
                </aside>
                <div className="flex-1 w-full space-y-space-lg">
                  <div className="bg-surface-container-low/70 backdrop-blur-md rounded-xl p-space-sm md:p-space-md flex flex-wrap items-center justify-between gap-space-md shadow-md">
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          sort
                        </span>
                        <span>Order by:</span>
                      </span>
                      <div className="relative">
                        <select
                          className="appearance-none bg-surface-container text-on-surface font-label-md text-label-md pl-3 pr-8 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-sm"
                          id="sort-select"
                        >
                          <option value="title-asc">Title: A → Z</option>
                          <option value="title-desc">Title: Z → A</option>
                          <option value="year-asc">
                            Publication Year (Oldest)
                          </option>
                          <option value="year-desc">
                            Publication Year (Newest)
                          </option>
                          <option value="pages-asc">
                            Page Count (Shortest)
                          </option>
                          <option value="pages-desc">
                            Page Count (Longest)
                          </option>
                          <option value="popular">
                            Popularity / Scholarly Acclaim
                          </option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[16px]">
                          expand_more
                        </span>
                      </div>
                      <div
                        className="hidden items-center gap-1.5"
                        id="active-tag-pills"
                      />
                    </div>
                    <div className="flex items-center gap-space-xs ml-auto">
                      <button
                        className="lg:hidden px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5"
                        id="toggle-filter-view"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          tune
                        </span>
                        <span>Filters</span>
                      </button>
                      <div className="inline-flex p-1 bg-surface-container rounded-lg gap-0.5">
                        <button
                          aria-label="Grid View"
                          className="w-8 h-8 rounded flex items-center justify-center bg-surface-container-highest text-primary shadow-sm transition-colors"
                          id="view-grid-btn"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            grid_view
                          </span>
                        </button>
                        <button
                          aria-label="List View"
                          className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                          id="view-list-btn"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            view_list
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-gutter transition-all duration-300"
                    id="books-grid"
                  >
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="nguyen du"
                      data-genre="Historical Fiction"
                      data-lang="Vietnamese"
                      data-level="Advanced"
                      data-pages={3254}
                      data-popular={99}
                      data-title="truyen kieu the tale of kieu"
                      data-year={1820}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Dark vintage Vietnamese archival manuscript cover of Truyen Kieu Nguyen Du with gilded classical calligraphy motifs, rich indigo ink, deep amber illumination, and aged textured deckle-edge paper inside an atmospheric scholar sanctuary."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX6K_QMarONYuIkP794pfyYASHcGDwAIOFzBpSqzqBJmsn-vL-zGp7j23gQfZVbybVXGngYmqXRlASVHK356SoW6uQmtS9YiyfwdYhAx7J-ShZsnfgz6FUSEmF6_p8Pv7Jf6cBzGor9-kWtP_ljN4lwhpedYCRSOyD9D54flyAvvx_61w4W7rVYsrHkLfj8s_eQdgLKArE5K5nV6PeIdeXyJquQ1PtahVnePTOGw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark Truyen Kieu"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1820 CE
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Advanced
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Vietnamese
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Historical
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            Truyện Kiều
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Nguyễn Du
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              3,254 lines
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.9 (1.8k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="antoine de saint-exupery"
                      data-genre="Fiction Philosophy"
                      data-lang="French"
                      data-level="Beginner"
                      data-pages={96}
                      data-popular={98}
                      data-title="le petit prince the little prince"
                      data-year={1943}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Artistic deep nocturnal cover of Le Petit Prince standing on a miniature solitary asteroid with deep gold stars, atmospheric cobalt night cosmos, celestial dust, cinematic vintage French literary style with warm amber glowing nebula."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYd-RXeagk8y6befBGST5347Cff8ZvzOeMq2iDUWt4Iw2YaIoSsciaNctN0nLRmLDpUN-QMkBFZMuXuD4B7aKgcNYtvJ6aG2mU0HWtPqy0jEzloBGVEzDnDd7nMf1SVqc6k4zKVOsUNd9Gfe-oStjDz723uYrjk3vdZVdk4ez1O6K2mLq0034G-uewIcKM_sUyScUksIyx6yW3FsbSCjtgw4WP3Rn7Nw9JPpiHSw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark Le Petit Prince"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1943
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Beginner
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              French
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Philosophy
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            Le Petit Prince
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Antoine de Saint-Exupéry
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              96 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.9 (4.2k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="george orwell"
                      data-genre="Sci-Fi Fiction"
                      data-lang="English"
                      data-level="Intermediate"
                      data-pages={328}
                      data-popular={97}
                      data-title="1984 nineteen eighty-four"
                      data-year={1949}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Brutalist dystopian book cover of 1984 by George Orwell featuring a giant glowing watchful eye silhouette, architectural concrete surveillance towers, deep slate darkness, with subtle amber backlight beam casting heavy noir shadows."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYemwu0SIF2XHBd9QJuu3UyqkdchzQkSBzzznk41aLqpBHh6trTESztdKXdi7AS6kcR0krAG-u_9xGipJw3lSDSlgdJC_5y2ZgHQQ72T198CFw7TB4TixIRQr0RrMb-JcVFj9HsGTKSQuBIU6PgQV8Ofm8mdBy7-Kouz7UKPRuXpofkH16vXdr7PTqzS6MiZhnf5d1KPfc8xUO90MNMxEkx1USnqR1LXEZkcuI9A"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark 1984"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1949
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Intermediate
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              English
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Sci-Fi
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            1984
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            George Orwell
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              328 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.8 (3.5k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="f. scott fitzgerald"
                      data-genre="Fiction Romance"
                      data-lang="English"
                      data-level="Intermediate"
                      data-pages={180}
                      data-popular={93}
                      data-title="the great gatsby"
                      data-year={1925}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Art Deco dark book cover design for The Great Gatsby, opulent geometric gold foil filigree lines against midnight blue slate velvet background, distant piercing emerald green dock light through mist."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJcN4g9YMPB2SsfC_yYeoZi5tJHNcc_AY0Pga2A8EjJJ8pvCGK5xVOy0A5_6hOfP5_uEbH3Xy19jou996xIkOAXtOcSBxv-2S4YnYpgN959bm6i6qOWyFMTqmgtkX9_frVZpTW74gibh9z5xFFW2ECEPnCuVpkk6kZQS7ms7cZNsfIzFBINe5KhpnGamRaidl5Oow9PzQbJllbZ0YNgbU9SjN3FamP72CW85jMJg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark Gatsby"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1925
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Intermediate
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              English
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Romance
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            The Great Gatsby
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            F. Scott Fitzgerald
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              180 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.7 (2.9k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="haruki murakami"
                      data-genre="Fiction Romance"
                      data-lang="Japanese"
                      data-level="Intermediate"
                      data-pages={296}
                      data-popular={94}
                      data-title="norwegian wood"
                      data-year={1987}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Melancholic Japanese book cover for Norwegian Wood by Haruki Murakami, minimalist winter pine forest shrouded in pale mountain fog, deep charcoal nightfall tones, quiet vinyl record motif with crimson accent detail."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQQUdQcHPBAqfgOW7qJKeAvZEZ52H83yVupRKejNnnbbvvUuTCAXMn9X_YexuNUO-DbnyQ4cOaW-aua_2jjL-x2FEqzczpWVoE7V0BDmTZmq20TBj1RviCqF64iXRDLjA7s-cIOUbpOBE2K4dY-DsZn2X734dcTqQYv8jERFPLYflYc9NBiXU-jAyeXpAWDnAXDQ_IzRbdI9v2N4lKeQ-VjPdzovuVipNmNONNUg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark Norwegian Wood"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1987
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Intermediate
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Japanese
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Fiction
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            Norwegian Wood
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Haruki Murakami
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              296 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.7 (2.1k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="natsume soseki"
                      data-genre="Fiction Philosophy"
                      data-lang="Japanese"
                      data-level="Advanced"
                      data-pages={248}
                      data-popular={91}
                      data-title="kokoro the heart"
                      data-year={1914}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Refined Japanese literary Meiji-era book cover of Kokoro by Natsume Soseki, subtle traditional sumi-e ink wash, quiet tea room shadows, amber candlelight bleeding through sliding shoji lattice paper."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC11C_XtyAATPEY4f087-x7vSsJgVcNYjv2mg2-0jAv9F2M72BSsk5eIMn-eXnYNDKZvTrREP1jOfrVNBRKJLa7X_OCTQox3I78r9ChaGsxtbQgU6uc6FqLaweUSJHm65_cr811kFQsQmQWORq4sd00PGH9IGuky9zLl6Ug4s2XNfi8h8-Nmd8hVOwKnnITeael7Bq9xeBMOrEECyRBFicuEmq5KNfxeV6wpZOCcg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark Kokoro"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1914
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Advanced
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Japanese
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Philosophy
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            Kokoro
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Natsume Sōseki
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              248 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.8 (1.2k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="fyodor dostoevsky"
                      data-genre="Fiction Philosophy"
                      data-lang="Russian"
                      data-level="Advanced"
                      data-pages={671}
                      data-popular={96}
                      data-title="crime and punishment"
                      data-year={1866}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Intense psychological archival Russian book jacket of Crime and Punishment by Fyodor Dostoevsky, somber Saint Petersburg cobblestone streets in winter dusk, silhouette figure walking into amber gaslamp radiance."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJTf0dUpLYqKVLMEwfddpSUFaDWO0njWZHSYAOkdXWeX1T8u79mq2wRd3LEMl1yiFdtM0Bxg4ih2UNI4A2xyetj8KfjmacIYq4ipNNxX3bJmH68JLmwXDkvQYYopqE30f9fc0ghjtD4Tw7U9Im6w5NGLxDJvFsDYgBP478_a_tTsX2mByiWJBCMTnmQ5L0TPs216nh4aF1hXVm1iUK4JJOsr1rtVUlYiri4GHGKg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark Crime and Punishment"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1866
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Advanced
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Russian
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Philosophy
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            Crime and Punishment
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Fyodor Dostoevsky
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              671 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.9 (3.1k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="to hoai"
                      data-genre="Fiction"
                      data-lang="Vietnamese"
                      data-level="Beginner"
                      data-pages={144}
                      data-popular={92}
                      data-title="de men phieu luu ky diary of a cricket"
                      data-year={1941}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Charming nocturnal folklore illustration cover for Vietnamese classic De Men Phieu Luu Ky by To Hoai, whimsical meadow under moonlight, glowing fireflies, deep teal foliage, warm golden lantern gleams."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGCCoo5TKcxnFG1R1TGfT_FL8-srPnjUzvpJqXqidEjiolVxoEnhiHUolMtyoACGXYoSDsn7bjhDdoyR57EhU3Mv1lSD_XuW4fMOSdDuysObfsoh2Uwvwrz3slrS74DtcPil9ZeIUfgrMHftgFlsDUMJI4vGShTZpLOkbicfgXtE_pA8MCghaVxU3w3088skHkE3yLBnsiJ3PSf033RL41vBIYMw3co8HS7YXYJg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark De Men"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1941
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Beginner
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Vietnamese
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Fiction
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            Dế Mèn Phiêu Lưu Ký
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Tô Hoài
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              144 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.8 (1.5k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="gabriel garcia marquez"
                      data-genre="Fiction Historical"
                      data-lang="Spanish"
                      data-level="Advanced"
                      data-pages={417}
                      data-popular={98}
                      data-title="one hundred years of solitude cien anos de soledad"
                      data-year={1967}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Magical realist dark atmospheric cover of One Hundred Years of Solitude by Gabriel Garcia Marquez, glowing yellow butterflies fluttering across ancient midnight Macondo mansion ruins under starry tropical sky."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWz6PjY4ChQU1gDocPb7zbtju0ip8-p0_nyAPj3r1FKVWug0zLhjcFx83xzNZz1007YTRmPmM2blgfmNmFgH8_QrELAJ_KGVu5cVFBNAFiaQxr2NIIeKXbyyJ3O9lkwtXO8vtO_EyxKZIqm7yTq3pL5E6Z5qkGZGuvXGhhud6B6fH-ZpDnTl3Q5PVeQZNw12YBqPd-7zdHYJPlB-6CeoQK2I8qGEmbiLY74WbV0Q"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark 100 Years"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1967
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Advanced
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Spanish
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Historical
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            One Hundred Years of Solitude
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Gabriel García Márquez
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              417 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.9 (4.8k)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      className="book-card group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-md"
                      data-author="vu trong phung"
                      data-genre="Satire Fiction"
                      data-lang="Vietnamese"
                      data-level="Intermediate"
                      data-pages={260}
                      data-popular={90}
                      data-title="so do dumb luck"
                      data-year={1936}
                    >
                      <div className="relative w-full aspect-[2/3] bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt="Dramatic 1930s colonial Hanoi satirical book cover for So Do Vu Trong Phung, art deco Vietnamese typography, dark silhouettes of dandy tennis players, rich dark crimson shadows and amber lamp light glow."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWps9jiDj4PS6SB8Yg5hJszdZQIzqFQDqZichtPoS6X6ddfGkMXxEPsex6JoUdPNjdraTsS_0xnVm7iGrJ3D9XLoczdpgMFnf05vjGlJwO_Zf3AUa6zcSsziVWuiNqBb5dG1gPItV5chpsQl-ho51UdZtdYpqFnHvvBNg8e2A6rAoheqyXC5p-KfLSKqLcUxSAj1wH7DP-_nkwXyfheTIP_LUuh2gcU3rtzBxkeQ"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90" />
                        <button
                          aria-label="Bookmark So Do"
                          className="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_border
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold">
                            1936
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-caps text-label-caps">
                            Intermediate
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Vietnamese
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface-variant">
                              Satire
                            </span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            Số Đỏ (Dumb Luck)
                          </h2>
                          <a
                            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors block"
                            href="#"
                          >
                            Vũ Trọng Phụng
                          </a>
                        </div>
                        <div className="pt-space-xs space-y-space-sm">
                          <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                menu_book
                              </span>
                              260 pages
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <span
                                className="material-symbols-outlined text-[15px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              4.7 (980)
                            </span>
                          </div>
                          <button
                            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                            type="button"
                          >
                            <span>View Archival Record</span>
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div
                    className="hidden flex-col items-center justify-center py-space-2xl px-space-lg text-center bg-surface-container-low/40 rounded-xl"
                    id="no-results-state"
                  >
                    <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-space-md">
                      <span className="material-symbols-outlined text-[32px]">
                        menu_book
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                      No Archival Volumes Found
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg">
                      No manuscripts match your multi-criteria query parameters.
                      Broaden the filters or explore alternative keywords.
                    </p>
                    <button
                      className="px- space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-fixed transition-colors"
                      id="reset-empty-btn"
                      type="button"
                    >
                      Reset All Filters
                    </button>
                  </div>
                  <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-sm">
                    <div className="font-label-md text-label-md text-on-surface-variant">
                      Viewing folio page
                      <span className="text-on-surface font-bold">1</span> of
                      <span className="text-on-surface">1</span> in active query
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant/40 cursor-not-allowed font-label-md text-label-md flex items-center gap-1"
                        disabled
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          chevron_left
                        </span>
                        <span>Prior</span>
                      </button>
                      <button
                        className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold flex items-center justify-center"
                        type="button"
                      >
                        1
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant/40 cursor-not-allowed font-label-md text-label-md flex items-center gap-1"
                        disabled
                        type="button"
                      >
                        <span>Next</span>
                        <span className="material-symbols-outlined text-[16px]">
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
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
