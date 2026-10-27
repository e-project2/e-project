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
  '\n          (function initBookDetailsInteractions() {\n            const shelfBtn = document.getElementById("shelfDropdownBtn");\n            const shelfMenu = document.getElementById("shelfDropdownMenu");\n            const shelfLabel = document.getElementById("currentShelfLabel");\n            const arrowIcon = document.getElementById("dropdownArrow");\n            const bookmarkBtn = document.getElementById("quickBookmarkBtn");\n            const bookmarkIcon = document.getElementById("bookmarkIcon");\n\n            let isDropdownOpen = false;\n            let isBookmarked = true;\n\n            if (shelfBtn && shelfMenu) {\n              shelfBtn.addEventListener("click", (e) => {\n                e.stopPropagation();\n                isDropdownOpen = !isDropdownOpen;\n                if (isDropdownOpen) {\n                  shelfMenu.classList.remove("hidden");\n                  shelfMenu.classList.add("flex");\n                  arrowIcon.style.transform = "rotate(180deg)";\n                } else {\n                  shelfMenu.classList.add("hidden");\n                  shelfMenu.classList.remove("flex");\n                  arrowIcon.style.transform = "rotate(0deg)";\n                }\n              });\n\n              const statusOptions =\n                shelfMenu.querySelectorAll(".status-option");\n              statusOptions.forEach((option) => {\n                option.addEventListener("click", () => {\n                  const status = option.getAttribute("data-status");\n                  shelfLabel.textContent = status;\n                  shelfMenu.classList.add("hidden");\n                  shelfMenu.classList.remove("flex");\n                  arrowIcon.style.transform = "rotate(0deg)";\n                  isDropdownOpen = false;\n                });\n              });\n\n              document.addEventListener("click", (e) => {\n                if (\n                  !shelfMenu.contains(e.target) &&\n                  !shelfBtn.contains(e.target)\n                ) {\n                  shelfMenu.classList.add("hidden");\n                  shelfMenu.classList.remove("flex");\n                  if (arrowIcon) arrowIcon.style.transform = "rotate(0deg)";\n                  isDropdownOpen = false;\n                }\n              });\n            }\n\n            if (bookmarkBtn && bookmarkIcon) {\n              bookmarkBtn.addEventListener("click", () => {\n                isBookmarked = !isBookmarked;\n                if (isBookmarked) {\n                  bookmarkIcon.style.fontVariationSettings = "\'FILL\' 1";\n                  bookmarkIcon.classList.add("text-on-tertiary-container");\n                  bookmarkIcon.classList.remove("text-outline");\n                } else {\n                  bookmarkIcon.style.fontVariationSettings = "\'FILL\' 0";\n                  bookmarkIcon.classList.remove("text-on-tertiary-container");\n                  bookmarkIcon.classList.add("text-outline");\n                }\n              });\n            }\n          })();\n        ',
];

export default function BookDetailsLePetitPrinceBookbridge() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "book_details_le_petit_prince_bookbridge",
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
              aria-current="page"
              className="px-3 py-1.5 transition-colors text-primary font-bold bg-surface-container rounded-full"
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
          <div className="w-full bg-surface-container-low/60 backdrop-blur-md">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant"
              >
                <a
                  className="hover:text-primary transition-colors"
                  data-path="home"
                  href="#"
                >
                  Home
                </a>
                <span className="material-symbols-outlined text-[16px] text-outline">
                  chevron_right
                </span>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="directory"
                  href="#"
                >
                  Books
                </a>
                <span className="material-symbols-outlined text-[16px] text-outline">
                  chevron_right
                </span>
                <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
                  Le Petit Prince
                </span>
              </nav>
              <a
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest shadow-sm text-primary font-label-md text-label-md hover:bg-surface-container transition-all"
                data-path="directory"
                href="#"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                Back to Books Directory
              </a>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="relative w-full max-w-[420px] mx-auto lg:max-w-none group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-surface-container-high/60 via-surface-variant/30 to-transparent rounded-2xl blur-xl -z-10" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest p-4 transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-surface-container shadow-inner">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Vintage hardcover book edition of Le Petit Prince with golden foil debossed celestial stars, small solitary asteroid B-612, delicate painted red desert rose in glass cloche, and delicate watercolor tones in midnight blue and warm amber parchment paper texture, exquisite archival photograph"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBun0TCeDm-1x8Wjgsxx2OwBhceZ0-nQnSL_Hzy_eWGF0o5TCEm7v47QEjNmss0uaYqRJCq0cfrscCkUM1fCtd5_7j6dnuHTJiCpxTAbwMkTbmrEhlJoRksROLF1-m8OQTE8CrtmHQYvEFj5m-f9AX6TM8RbGaP0zNp6ppw6SHOJspX3u0V_Xw5nk56uYGSuIm1-YSnSVwStI3Gon9ViNGoa5bm8WKcuAi72kWLzg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary-container/85 backdrop-blur-md text-on-secondary-container font-label-sm text-label-sm tracking-wider uppercase">
                          Archival Copy
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
                        <div className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-accent-gold-light text-[20px]"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          <span className="font-label-md text-label-md font-bold">
                            4.88
                          </span>
                          <span className="text-on-primary/75 text-body-sm font-body-sm">
                            (124k reviews)
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary/80">
                          Ref: 1943-NYC
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-on-tertiary-container" />
                  <div className="flex items-center justify-between pl-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-on-tertiary-container text-[20px]"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        local_library
                      </span>
                      <span className="font-label-md text-label-md text-primary font-semibold">
                        In Your Library
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-tertiary-container font-label-sm text-label-sm font-bold">
                      Currently Reading
                    </span>
                  </div>
                  <div className="pl-2 space-y-1.5">
                    <div className="flex justify-between items-baseline font-body-sm text-body-sm text-on-surface-variant">
                      <span className>Reading Progress</span>
                      <span className="text-primary font-semibold">
                        Page 42 of 96
                        <span className="text-on-tertiary-container font-bold">
                          (44%)
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className="h-full bg-on-tertiary-container rounded-full transition-all duration-500"
                        style={{ width: "44%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1" id="shelfSelectorContainer">
                    <button
                      className="w-full h-12 px-6 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-between shadow-md hover:bg-primary-container transition-all"
                      id="shelfDropdownBtn"
                      type="button"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark_add
                        </span>
                        <span id="currentShelfLabel" className>
                          Currently Reading
                        </span>
                      </span>
                      <span
                        className="material-symbols-outlined text-[20px] transition-transform duration-200"
                        id="dropdownArrow"
                      >
                        expand_more
                      </span>
                    </button>
                    <div
                      className="hidden absolute top-full left-0 right-0 mt-2 p-2 bg-surface-container-lowest rounded-xl shadow-xl z-30 flex-col gap-1 transition-all"
                      id="shelfDropdownMenu"
                    >
                      <button
                        className="status-option w-full text-left px-4 py-2.5 rounded-lg hover:bg-surface-container font-body-sm text-body-sm text-on-surface flex items-center justify-between"
                        data-status="To Read"
                        type="button"
                      >
                        <span className>To Read</span>
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          schedule
                        </span>
                      </button>
                      <button
                        className="status-option w-full text-left px-4 py-2.5 rounded-lg bg-surface-container font-body-sm text-body-sm text-primary font-semibold flex items-center justify-between"
                        data-status="Currently Reading"
                        type="button"
                      >
                        <span className>Currently Reading</span>
                        <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">
                          auto_stories
                        </span>
                      </button>
                      <button
                        className="status-option w-full text-left px-4 py-2.5 rounded-lg hover:bg-surface-container font-body-sm text-body-sm text-on-surface flex items-center justify-between"
                        data-status="Completed"
                        type="button"
                      >
                        <span className>Completed</span>
                        <span className="material-symbols-outlined text-[18px] text-status-success">
                          check_circle
                        </span>
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label="Toggle Quick Bookmark"
                    className="h-12 w-12 rounded-full bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container flex items-center justify-center transition-all group"
                    id="quickBookmarkBtn"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-[22px] transition-colors text-on-tertiary-container"
                      id="bookmarkIcon"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      bookmark
                    </span>
                  </button>
                  <button
                    aria-label="Cite Work"
                    className="h-12 w-12 rounded-full bg-surface-container-lowest text-on-surface-variant shadow-sm hover:bg-surface-container hover:text-primary flex items-center justify-center transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      format_quote
                    </span>
                  </button>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-primary">
                      Archival Metadata
                    </h3>
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                      MARC-21 Compliant
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 font-body-sm text-body-sm divide-y divide-surface-container/60">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          translate
                        </span>
                        Original Language
                      </span>
                      <span className="font-semibold text-primary">
                        Français (French)
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          calendar_today
                        </span>
                        First Published
                      </span>
                      <span className="font-semibold text-primary">
                        1943 (Reynal &amp; Hitchcock, NY)
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          menu_book
                        </span>
                        Page Count
                      </span>
                      <span className="font-semibold text-primary">
                        96 pages
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          category
                        </span>
                        Genre
                      </span>
                      <span className="font-semibold text-primary">
                        Philosophical Fiction / Fable
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          school
                        </span>
                        Reading Level
                      </span>
                      <span className="font-semibold text-secondary">
                        Beginner to Intermediate (A2–B1)
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          group
                        </span>
                        Suitable Audience
                      </span>
                      <span className="font-semibold text-primary">
                        All Ages • Philosophers • Youths
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-outline">
                          fingerprint
                        </span>
                        Repository Index / ISBN
                      </span>
                      <span className="font-mono text-label-sm font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">
                        book-004
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-10">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                      French Classic
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                      Philosophical Allegory
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                      Original Illustrations
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-variant text-secondary font-label-sm text-label-sm font-semibold">
                      World Literature
                    </span>
                  </div>
                  <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary tracking-tight">
                    Le Petit Prince <br />
                    <span className="italic font-normal text-on-surface-variant text-headline-md font-headline-md block mt-1">
                      (The Little Prince)
                    </span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all group"
                      href="#"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-secondary-container flex items-center justify-center font-bold font-label-sm text-label-sm">
                        AS
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-label-sm text-label-sm text-outline">
                          Written by
                        </span>
                        <span className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                          Antoine de Saint-Exupéry
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-outline group-hover:translate-x-0.5 transition-transform">
                        open_in_new
                      </span>
                    </a>
                    <span className="text-on-surface-variant font-body-sm text-body-sm flex items-center gap-1.5">
                      <span
                        className="material-symbols-outlined text-[18px] text-accent-gold-light"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        verified
                      </span>
                      Canonical Public Domain Edition
                    </span>
                  </div>
                </div>
                <div className="relative bg-surface-container-low rounded-2xl p-8 xl:p-10 shadow-sm overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-accent-gold-light/10 rounded-full blur-2xl" />
                  <span className="material-symbols-outlined absolute top-6 right-6 text-on-tertiary-container/20 text-6xl select-none">
                    format_quote
                  </span>
                  <div className="relative z-10 space-y-4">
                    <p className="font-headline-md text-headline-md italic text-primary leading-relaxed">
                      “On ne voit bien qu'avec le cœur. L'essentiel est
                      invisible pour les yeux.”
                    </p>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">
                      “It is only with the heart that one can see rightly; what
                      is essential is invisible to the eye.”
                    </p>
                    <div className="pt-2 flex items-center gap-3 font-label-md text-label-md text-on-tertiary-container font-semibold uppercase tracking-wider">
                      <span className="w-8 h-0.5 bg-on-tertiary-container" />
                      The Fox to the Little Prince (Chapter XXI)
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px]">
                      history_edu
                    </span>
                    <h2 className="font-headline-md text-headline-md text-primary">
                      Synopsis &amp; Narrative Architecture
                    </h2>
                  </div>
                  <div className="space-y-4 text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
                    <p className>
                      Stranded in the desolation of the Sahara Desert following
                      a mechanical plane failure, an aviator is awakened at
                      daybreak by an ethereal boy requesting the sketch of a
                      sheep. This miraculous encounter unfolds into an expansive
                      chronicle of the Prince’s journey away from his minuscule
                      home,
                      <strong>Asteroid B-612</strong>, where he painstakingly
                      tended three miniature volcanoes and sheltered a proud,
                      demanding, yet beloved rose.
                    </p>
                    <p className>
                      Before arriving on Earth, the boy visits neighboring
                      planets inhabited by solitary, tragic caricatures of adult
                      vanity: an autocratic king with no subjects, an obsessive
                      conceited man demanding applause, a drunkard drinking to
                      drown his shame, and a ledger-bound businessman claiming
                      stars as capital. Through each vignette, Saint-Exupéry
                      exposes the absurdity of adult materialism and utilitarian
                      blindness.
                    </p>
                    <p className>
                      The emotional nucleus arrives in the terrestrial desert
                      through the encounter with the <strong>Fox</strong>, who
                      imparts the transcendent philosophy of “taming” (
                      <em>apprivoiser</em>)—the deliberate cultivation of
                      relational bonds that transform an ordinary flower into a
                      singular, sacred devotion in all the universe.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      psychology_alt
                    </span>
                    Key Themes &amp; Literary Value
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                        <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">
                          favorite
                        </span>
                        Friendship &amp; Cultivated Love
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        The concept of <em>taming</em> defines affection not as
                        an effortless accident, but as an active moral
                        responsibility that demands vulnerability, fidelity, and
                        patience.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          child_care
                        </span>
                        Innocence vs. Adulthood
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        A relentless critique of grown-up narrowness that
                        fixates on figures, titles, and ownership while ignoring
                        beauty, joy, affection, and existential clarity.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                        <span className="material-symbols-outlined text-status-info text-[20px]">
                          wb_sunny
                        </span>
                        Solitude &amp; Desert Wandering
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        The barren Sahara serves as both literal exile and
                        spiritual hermitage, stripping human existence down to
                        essential survival and unmediated spiritual clarity.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                        <span className="material-symbols-outlined text-accent-indigo text-[20px]">
                          auto_stories
                        </span>
                        Mortality &amp; Memory
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        The poignant departure of the Little Prince redefines
                        death not as an end, but as a shedding of the earthly
                        vessel to return to one's cherished origin.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        language
                      </span>
                      <h3 className="font-title-md text-title-md text-primary">
                        Pedagogical Notes for Francophile Learners
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-semibold">
                      CEFR A2 – B1
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container-low/70 space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider font-bold">
                        Grammar Dynamics
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Primarily written in the <em>Passé Simple</em> for
                        formal narrative progression juxtaposed with
                        conversational
                        <em>Passé Composé</em> and clear
                        <em>Imparfait</em> descriptions.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-container-low/70 space-y-2">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider font-bold">
                        Lexical Nuance
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Mastery of terms like <em>apprivoiser</em> (to tame /
                        create ties), <em>un baobab</em> (neglected spiritual
                        weeds), and <em>un paravent</em> (screen for fragile
                        things).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 lg:mt-28 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container font-semibold">
                    Curated Associations
                  </span>
                  <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary">
                    Readers Also Consulted
                  </h2>
                </div>
                <a
                  className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors"
                  data-path="collections"
                  href="#"
                >
                  View Philosophical Allegories Shelf
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-surface-container">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Intricate Vietnamese lacquer painting book cover of The Tale of Kieu by Nguyen Du featuring classical flowing lotus motifs, silk embroidery styling, deep indigo and golden leaf highlights, traditional East Asian literary artwork"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqwehQROQFqm0wEyLqCDihQxWfA-yIbK2v4T5MDgmyU_vPCbs6ZDzA5wtYANPBW-opauKXNe1bEvpVPtgNSWJ-kO-IeGItoSA0yIn4MlZU1-pTd0sbwkMXoXZaFrOvyDo1e3bNfZNdC3D1oJTfCG7LaiiuAvzVoWXjblmG-ImDG6FHghJylff7ks4VSNRhL3vBAj1vqeelFl7k58DzAsPVpbTm621GalSN5yXfEA"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary-container/80 backdrop-blur-md text-on-secondary-container font-label-sm text-label-sm">
                        Epic Poem
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Truyện Kiều
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Nguyễn Du
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2">
                    <a
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1.5"
                      href="#"
                    >
                      <span className>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        visibility
                      </span>
                    </a>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-surface-container">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Minimalist artistic book cover of Jonathan Livingston Seagull with a lone pure white bird soaring over a mist-covered azure ocean at dawn, serene spiritual atmosphere, subtle gradient skies"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB68-QMAWjbwIjIkoS0OOEjrtzYIOT4lwKMGEv0sWXpucc5z2P5AL_GsUZtYjEoaTIqFd5HzHXXpO6F-KP7ra2lC7G9AX3-Yvr6PNcC0wNfC2pYf0JbuWxqR8YGK4mRDMU6NmWIhfN7v-WF9ZBH6XhLtrPPNZgU3vbJUq5VCChHtiqa4M5MfSM10VJujWbEbl6XnljoC-XwpS_4gYeG-5jMxoCCrEtvmtx9TWLyQg"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary-container/80 backdrop-blur-md text-on-secondary-container font-label-sm text-label-sm">
                        Fable
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Jonathan Livingston Seagull
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Richard Bach
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2">
                    <a
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1.5"
                      href="#"
                    >
                      <span className>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        visibility
                      </span>
                    </a>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-surface-container">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Mystical desert book cover illustration of The Alchemist showing golden sand dunes, an ethereal glowing pyramid in the distance, sapphire blue night sky dotted with celestial stars, artistic editorial style"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4zNeaUwAE89F9DZIDNYIod_2okQEotEoMe1dcIIPlDkLFCSKB4l5x2mM2fFAmZ8wJVL3kQGk4pC7cfDbv1IhIw6NR5j1OYYPKjrX_lWgn34jB_GaxR8_1J3L5HB3BkRVg-LqniChGmZdHzcLj_y3WpyKmtDkm6cvqD4VLUibth2-8xN9PIt8ISEMpy3eH4Niq7na5N09rPm__jSYYItbnrQc7WnqqvD44tTJKPQ"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary-container/80 backdrop-blur-md text-on-secondary-container font-label-sm text-label-sm">
                        Quest Narrative
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        The Alchemist
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Paulo Coelho
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2">
                    <a
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1.5"
                      href="#"
                    >
                      <span className>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        visibility
                      </span>
                    </a>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-surface-container">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Atmospheric book cover for Norwegian Wood featuring dense quiet pine forest covered in quiet mist, subtle deep forest green and burgundy tones, melancholy nostalgic Japanese literary cover design"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCErwGq8csw2MuaNB9FRbc40y6CNH0LmfvcrAL-6uayea3UFfpMgXZA0JfBf7CsgSWWX97MxwVZ4SutQYlDDvkl0C__Z7P__DEO1NDCdnNRLzIA3FlS2od8vI0_-hSIVSgvXeQ7t9MN1uvpetPQzts3qDpwDzZEtMf2op1thVdvyvBM7xNZ7soOwUqLca_Lga-V5HiGTOqK38xrouJA4INUSM55EPOt2PEnNXWLA"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary-container/80 backdrop-blur-md text-on-secondary-container font-label-sm text-label-sm">
                        Reflective Fiction
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Norwegian Wood
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Haruki Murakami
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2">
                    <a
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1.5"
                      href="#"
                    >
                      <span className>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        visibility
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
