import { useEffect, useRef } from "react";
import { initializePrototypePage } from "../prototypeRuntime.js";

const pageStylesheets = [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Inter:wght@400;500;600;700&amp;display=swap",
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
        "on-tertiary-fixed": "#2f1500",
        surface: "#0f131c",
        secondary: "#adc6ff",
        "surface-bright": "#353942",
        "on-secondary-fixed": "#001a42",
        "surface-variant": "#31353e",
        "primary-container": "#f59e0b",
        "tertiary-fixed-dim": "#ffb77d",
        primary: "#ffc174",
        "on-surface": "#dfe2ee",
        "surface-container-lowest": "#0a0e16",
        "on-primary": "#472a00",
        "secondary-container": "#0566d9",
        "surface-container": "#1c2028",
        "on-tertiary-container": "#6a3700",
        "on-secondary-fixed-variant": "#004395",
        "surface-container-high": "#262a33",
        error: "#ffb4ab",
        background: "#0f131c",
        "on-tertiary": "#4d2600",
        "surface-container-highest": "#31353e",
        "on-tertiary-fixed-variant": "#6e3900",
        "on-background": "#dfe2ee",
        "on-surface-variant": "#d8c3ad",
        "surface-tint": "#ffb95f",
        "on-secondary-container": "#e6ecff",
        "tertiary-container": "#ff9837",
        outline: "#a08e7a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",
        "on-primary-fixed": "#2a1700",
        "surface-container-low": "#181c24",
        tertiary: "#ffc08e",
        "tertiary-fixed": "#ffdcc3",
        "primary-fixed": "#ffddb8",
        "outline-variant": "#534434",
        "on-primary-fixed-variant": "#653e00",
        "secondary-fixed-dim": "#adc6ff",
        "on-primary-container": "#613b00",
        "secondary-fixed": "#d8e2ff",
        "on-secondary": "#002e6a",
        "inverse-primary": "#855300",
        "primary-fixed-dim": "#ffb95f",
        "inverse-surface": "#dfe2ee",
        "inverse-on-surface": "#2c3039",
        "surface-dim": "#0f131c",
        "error-container": "#93000a",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "gutter-lg": "2.5rem",
        "space-lg": "1.5rem",
        "margin-sm": "1rem",
        "margin-lg": "4rem",
        margin: "1.5rem",
        "space-xl": "2.5rem",
        "gutter-sm": "1rem",
        gutter: "1.5rem",
        "space-2xl": "4rem",
        "space-md": "1rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
      },
      fontFamily: {
        "headline-xl": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "label-md": ["Inter"],
        "display-lg": ["Playfair Display"],
        "headline-xl-mobile": ["Playfair Display"],
        "body-xl": ["Plus Jakarta Sans"],
        "display-lg-mobile": ["Playfair Display"],
        "body-lg": ["Plus Jakarta Sans"],
        "label-caps": ["Inter"],
        "body-md": ["Plus Jakarta Sans"],
        "headline-sm": ["Playfair Display"],
        "label-lg": ["Inter"],
      },
      fontSize: {
        "headline-xl": [
          "40px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.015em",
            fontWeight: "600",
          },
        ],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "500" }],
        "headline-lg": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "-0.01em",
            fontWeight: "500",
          },
        ],
        "label-md": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.02em",
            fontWeight: "500",
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
        "headline-xl-mobile": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
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
        "display-lg-mobile": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "body-lg": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "label-caps": [
          "11px",
          {
            lineHeight: "16px",
            letterSpacing: "0.08em",
            fontWeight: "700",
          },
        ],
        "body-md": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "label-lg": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.01em",
            fontWeight: "600",
          },
        ],
      },
    },
  },
};
const pageScripts = [
  '\n          (function initAdminBookEditor() {\n            window.addTag = function (inputEl) {\n              const val = inputEl.value.trim();\n              if (!val) return;\n              const tagContainer = document.getElementById("tagContainer");\n              const chip = document.createElement("span");\n              chip.className =\n                "inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors hover:bg-error/20 hover:text-error cursor-pointer";\n              chip.innerHTML = `${val} <span class="material-symbols-outlined text-[14px]">close</span>`;\n              chip.onclick = function () {\n                chip.remove();\n              };\n              tagContainer.insertBefore(chip, inputEl.parentElement);\n              inputEl.value = "";\n            };\n\n            const cefrTabs = document.querySelectorAll(".cefr-tab");\n            const cefrLabel = document.getElementById("cefrActiveLabel");\n            const cefrDescriptions = {\n              A1: "Target: A1 (Foundational / Beginner Folio)",\n              A2: "Target: A2 (Elementary / High Frequency)",\n              B1: "Target: B1 (Intermediate / Narrative Autonomy)",\n              B2: "Target: B2 (Upper-Intermediate / Subtle Allegory)",\n              C1: "Target: C1 (Advanced Scholarly Nuance)",\n              C2: "Target: C2 (Mastery / Classical Stylistics)",\n            };\n\n            cefrTabs.forEach((tab) => {\n              tab.addEventListener("click", () => {\n                const lvl = tab.dataset.level;\n\n                if (tab.classList.contains("bg-primary-container")) {\n                  tab.className =\n                    "cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors";\n                } else {\n                  tab.className =\n                    "cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps bg-primary-container text-on-primary-container font-bold shadow-sm";\n                }\n                if (cefrDescriptions[lvl]) {\n                  cefrLabel.textContent = cefrDescriptions[lvl];\n                }\n              });\n            });\n\n            function persistToLocalStorage() {\n              const bookPayload = {\n                id: "book-004",\n                title: document.getElementById("bookTitle").value,\n                subtitle: document.getElementById("subtitle").value,\n                isbn: document.getElementById("isbnInput").value,\n                callNumber: document.getElementById("callNumberInput").value,\n                publisher: document.getElementById("firstPublisher").value,\n                blurb: document.getElementById("editorialBlurb").value,\n                quote: document.getElementById("keyQuote").value,\n                timestamp: new Date().toISOString(),\n              };\n\n              try {\n                localStorage.setItem(\n                  "bookbridge_bk_004",\n                  JSON.stringify(bookPayload),\n                );\n              } catch (e) {}\n\n              const indicator = document.getElementById("syncStatusIndicator");\n              const now = new Date();\n              const timeStr = now.toLocaleTimeString([], {\n                hour: "2-digit",\n                minute: "2-digit",\n              });\n              indicator.textContent = `Synced to LocalStorage at ${timeStr}`;\n\n              const originalText =\n                document.getElementById("bottomSaveBtn").innerHTML;\n              document.getElementById("bottomSaveBtn").innerHTML =\n                `<span class="material-symbols-outlined text-[18px]">check_circle</span> Saved!`;\n              setTimeout(() => {\n                document.getElementById("bottomSaveBtn").innerHTML =\n                  originalText;\n              }, 1800);\n            }\n\n            document\n              .getElementById("bottomSaveBtn")\n              .addEventListener("click", persistToLocalStorage);\n            document\n              .getElementById("topSaveBtn")\n              .addEventListener("click", persistToLocalStorage);\n\n            window.addEventListener("keydown", function (e) {\n              if ((e.ctrlKey || e.metaKey) && e.key === "s") {\n                e.preventDefault();\n                persistToLocalStorage();\n              }\n            });\n\n            document\n              .getElementById("exportJsonBtn")\n              .addEventListener("click", () => {\n                const bookPayload = {\n                  id: "book-004",\n                  canonicalTitle: "Le Petit Prince",\n                  authors: [\n                    { id: "auth-007", name: "Antoine de Saint-Exupéry" },\n                  ],\n                  provenance: "Open Library / BnF Gallica Master Folio",\n                  cefrLevel: "A2-B1",\n                  parallelLanguage: "vi",\n                  audioURL:\n                    "https://cdn.bookbridge.org/audio/archival/fr/petit-prince-gerard-philipe-1954.m4a",\n                };\n                const dataStr =\n                  "data:text/json;charset=utf-8," +\n                  encodeURIComponent(JSON.stringify(bookPayload, null, 2));\n                const dlAnchor = document.createElement("a");\n                dlAnchor.setAttribute("href", dataStr);\n                dlAnchor.setAttribute(\n                  "download",\n                  "bookbridge_bk_004_record.json",\n                );\n                dlAnchor.click();\n              });\n\n            const blurbArea = document.getElementById("editorialBlurb");\n            const blurbCounter = document.getElementById("blurbCount");\n            if (blurbArea && blurbCounter) {\n              blurbArea.addEventListener("input", () => {\n                blurbCounter.textContent = `${blurbArea.value.length} / 220 chars`;\n              });\n            }\n          })();\n        ',
];

export default function AdminManageBookDetailsRecordEditorBookbridge() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "admin_manage_book_details_record_editor_bookbridge",
      stylesheets: pageStylesheets,
      styles: pageStyles,
      tailwindConfig,
      scripts: pageScripts,
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-background font-body-md text-body-md text-on-surface antialiased"
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-margin-lg flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-md text-headline-md text-primary tracking-tight">
                BookBridge
              </span>
              <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps tracking-widest uppercase">
                Curation Desk
              </span>
            </div>
            <nav
              className="hidden xl:flex items-center gap-space-xs"
              data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"
            >
              <a
                className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150"
                data-path="catalog-overview"
                href="#"
              >
                Catalog Overview
              </a>
              <a
                aria-current="page"
                className="px-space-md py-space-sm transition-colors duration-150 bg-primary-container text-on-primary-container font-semibold rounded-lg"
                data-path="manage-books"
                href="#"
              >
                Manage Books
              </a>
              <a
                className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150"
                data-path="manage-authors"
                href="#"
              >
                Manage Authors
              </a>
              <a
                className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150"
                data-path="archival-requests"
                href="#"
              >
                Archival Requests
              </a>
              <a
                className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150"
                data-path="audit-log"
                href="#"
              >
                Audit Log
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="hidden md:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-md text-label-md text-on-surface-variant">
                LocalStorage Active
              </span>
            </div>
            <button
              aria-label="Notifications"
              className="relative p-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-150"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <a
              className="hidden lg:inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-150"
              href="#"
            >
              <span>↗ View Public Library</span>
            </a>
            <div className="flex items-center gap-space-sm pl-space-sm rounded-lg hover:bg-surface-container-low transition-colors duration-150 cursor-pointer">
              <div className="hidden sm:flex flex-col text-right">
                <span className="font-label-md text-label-md text-on-surface font-medium">
                  Dr. M. D'Artois
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Senior Curator
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          <section className="w-full px-margin-lg py-space-lg bg-surface-container-lowest/80 backdrop-blur-md">
            <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs">
                <nav
                  aria-label="Archival Breadcrumb"
                  className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant"
                >
                  <a
                    className="hover:text-primary transition-colors duration-150"
                    href="#"
                  >
                    Admin Console
                  </a>
                  <span className="material-symbols-outlined text-[14px]">
                    chevron_right
                  </span>
                  <a
                    className="hover:text-primary transition-colors duration-150"
                    href="#"
                  >
                    Manage Books
                  </a>
                  <span className="material-symbols-outlined text-[14px]">
                    chevron_right
                  </span>
                  <span className="text-primary font-medium">
                    Edit Record #BK-004
                  </span>
                </nav>
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Le Petit Prince
                  </h1>
                  <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-primary/10 text-primary">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      verified
                    </span>
                    <span className="font-label-caps text-label-caps uppercase tracking-wider">
                      Published • Public Domain Verified
                    </span>
                  </div>
                  <span className="hidden md:inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">
                      history_edu
                    </span>
                    <span>Last modified: Today, 14:32 by M. D'Artois</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm">
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-bright transition-colors duration-150 shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    visibility
                  </span>
                  <span>Preview Public Page</span>
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface-variant hover:text-error hover:bg-surface-container-highest font-label-lg text-label-lg transition-colors duration-150"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    undo
                  </span>
                  <span>Discard Changes</span>
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-md"
                  id="topSaveBtn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    cloud_sync
                  </span>
                  <span>Save &amp; Sync to LocalStorage</span>
                </button>
              </div>
            </div>
          </section>
          <main className="w-full px-margin-lg py-space-xl">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
              <div className="lg:col-span-5 flex flex-col gap-space-xl">
                <div className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-md shadow-xl flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        auto_stories
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Book Cover Asset
                      </h2>
                    </div>
                    <span className="px-space-sm py-space-xs rounded-full bg-surface-container-highest font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                      Ratio 2:3 • 300 DPI
                    </span>
                  </div>
                  <div className="relative group rounded-lg overflow-hidden bg-surface-container-lowest shadow-2xl aspect-[2/3] flex items-center justify-center">
                    <img
                      alt="Book Cover Canvas Preview"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      id="coverPreviewImage"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4lYLeWzxfuzCFJtnb9uNtdHeq12fsxJWeMcmZ6ESTiNFLjwV0y52eFtbEWoYVjwY0QERclw9R_dapwW5YiWM2scd_3gxH2Mo0MMVaT0vZ1B-bFqkXEXN8HO17nJlL8AJ18cu-lidgDV-YxLHX3GDGfv-TYqRnYyAR0nMqYxWaxdEmWXih1jAkCJCBBwt6m2ZXMsmrQyshJPJXXVj65xqEY0FaUnWaXVw5l0A_V-q9cZtpuc2VCok"
                    />
                    <div className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-space-lg text-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[36px]">
                        image_search
                      </span>
                      <p className="font-headline-sm text-headline-sm text-on-surface">
                        Archival Cover Fidelity
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
                        1840 × 2760 px, WebP Lossless, Cleaned folio plate
                      </p>
                      <button
                        className="mt-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-highest text-on-surface hover:text-primary font-label-md text-label-md flex items-center gap-space-xs transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          fullscreen
                        </span>
                        Inspect High-Res Scan
                      </button>
                    </div>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-high/60 flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between gap-space-sm">
                      <button
                        className="flex-1 inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-bright font-label-md text-label-md transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          upload_file
                        </span>
                        <span>Replace Cover Image</span>
                      </button>
                      <button
                        className="p-space-sm rounded-lg bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
                        title="Crop & Align"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          crop
                        </span>
                      </button>
                      <button
                        className="p-space-sm rounded-lg bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
                        title="Color Calibration"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          palette
                        </span>
                      </button>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant text-center">
                      Drag file here or supply direct archival TIFF/WebP master
                    </p>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <label
                      className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant flex items-center justify-between"
                      htmlFor="coverProvenance"
                    >
                      <span>Image Provenance &amp; Repository Source</span>
                      <span className="text-primary font-normal">
                        Verified Public Domain
                      </span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        account_balance
                      </span>
                      <input
                        className="w-full pl-10 pr-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                        id="coverProvenance"
                        type="text"
                        defaultValue="Open Library / BnF Gallica Master Folio (Gallica ID: btv1b10500142r)"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      fingerprint
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Core Identifiers
                    </h2>
                  </div>
                  <div className="flex flex-col gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                        System Unique Identifier (UUID)
                      </label>
                      <div className="flex items-center justify-between px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md">
                        <span className="text-secondary font-mono">
                          book-004-saint-exupery-prince
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                          lock
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="isbnInput"
                      >
                        ISBN-13 / MARC-21 Control No.
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                          id="isbnInput"
                          type="text"
                          defaultValue="978-0156012195"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-caps text-label-caps">
                          MARC: 001
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="callNumberInput"
                      >
                        Archive Call Number / Shelf Mark
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                          id="callNumberInput"
                          type="text"
                          defaultValue="RES-8-Y2-1402 (Vault Rare B-14)"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-on-surface-variant">
                          qr_code_2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        inventory_2
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Archival Categorization
                      </h2>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                  </div>
                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    <label className="flex items-center gap-space-md p-space-sm rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
                      <input
                        defaultChecked
                        className="w-4 h-4 rounded bg-surface-container text-primary accent-primary-container focus:ring-primary"
                        type="checkbox"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Featured Masterpiece (Staff Pick)
                        </span>
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          Promotes publication to primary library rotunda
                          showcases
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center gap-space-md p-space-sm rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
                      <input
                        defaultChecked
                        className="w-4 h-4 rounded bg-surface-container text-primary accent-primary-container focus:ring-primary"
                        type="checkbox"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Include in Curated 20
                        </span>
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          Indexed within foundational world literature
                          collection
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <label
                      className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                      htmlFor="pdTierSelect"
                    >
                      Public Domain Legal Tier
                    </label>
                    <select
                      className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                      id="pdTierSelect"
                    >
                      <option selected value="global-pd">
                        Global Public Domain (Berne Convention &gt;70pma)
                      </option>
                      <option value="cc0">CC0 1.0 Universal Dedicated</option>
                      <option value="academic">
                        Academic Fair Use / Archival Exemption
                      </option>
                      <option value="national-estate">
                        National Cultural Heritage Restitution
                      </option>
                    </select>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-lowest flex flex-col gap-space-sm mt-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                        LocalStorage Payload
                      </span>
                      <span className="font-mono font-label-md text-label-md text-secondary">
                        38.4 KB (Encrypted)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "22%" }}
                      />
                    </div>
                    <div className="flex items-center justify-between pt-space-xs">
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Status: Synced (Revision 14.2)
                      </span>
                      <button
                        className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary hover:underline"
                        id="exportJsonBtn"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          data_object
                        </span>
                        <span>Export Raw JSON</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-high/40 flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                    history_toggle_off
                  </span>
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Critical Archival Notation
                    </span>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Original Gallimard copyright registered in France in 1946;
                      US initial edition 1943 enters unrestricted archival
                      digitization under federal restorative clause.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-space-xl">
                <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        menu_book
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Bibliographic Foundation
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Section 01 / 04
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div className="flex flex-col gap-space-xs md:col-span-2">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="bookTitle"
                      >
                        Canonical Title (Display)
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-headline-sm text-headline-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                        id="bookTitle"
                        type="text"
                        defaultValue="Le Petit Prince"
                      />
                    </div>
                    <div className="flex flex-col gap-space-xs md:col-span-2">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="subtitle"
                      >
                        Bilingual / Parallel Script Subtitle
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                        id="subtitle"
                        type="text"
                        defaultValue="The Little Prince / 王子さま / El Principito"
                      />
                    </div>
                    <div className="flex flex-col gap-space-xs md:col-span-2">
                      <div className="flex items-center justify-between">
                        <label
                          className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                          htmlFor="authorSelect"
                        >
                          Primary Author / Folio Attributor
                        </label>
                        <a
                          className="font-label-md text-label-md text-primary hover:underline flex items-center gap-space-xs"
                          href="#"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            person_add
                          </span>
                          <span>+ Add New Author Record</span>
                        </a>
                      </div>
                      <select
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                        id="authorSelect"
                      >
                        <option selected value="auth-007">
                          Antoine de Saint-Exupéry (ID: auth-007) [1900–1944]
                        </option>
                        <option value="auth-002">
                          Albert Camus (ID: auth-002) [1913–1960]
                        </option>
                        <option value="auth-009">
                          Marcel Proust (ID: auth-009) [1871–1922]
                        </option>
                        <option value="auth-014">
                          Simone de Beauvoir (ID: auth-014) [1908–1986]
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="origLang"
                      >
                        Original Composition Language
                      </label>
                      <select
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                        id="origLang"
                      >
                        <option selected value="fr">
                          Français (French Standard)
                        </option>
                        <option value="en">English</option>
                        <option value="vi">Tiếng Việt (Vietnamese)</option>
                        <option value="ja">日本語 (Japanese)</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="pubYear"
                      >
                        Year of First Inscription
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                        id="pubYear"
                        type="number"
                        defaultValue={1943}
                      />
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="firstPublisher"
                      >
                        First Edition Publisher
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                        id="firstPublisher"
                        type="text"
                        defaultValue="Reynal & Hitchcock, New York"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-space-sm">
                      <div className="flex flex-col gap-space-xs">
                        <label
                          className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                          htmlFor="pageCount"
                        >
                          Pages
                        </label>
                        <input
                          className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-center"
                          id="pageCount"
                          type="number"
                          defaultValue={96}
                        />
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label
                          className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                          htmlFor="readTime"
                        >
                          Reading Est.
                        </label>
                        <input
                          className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary text-center"
                          id="readTime"
                          type="text"
                          defaultValue="1.5 hrs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        school
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Curatorial &amp; Pedagogical Classification
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Section 02 / 04
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <label
                      className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                      htmlFor="primaryGenre"
                    >
                      Primary Literary Genre
                    </label>
                    <select
                      className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                      id="primaryGenre"
                    >
                      <option selected value="philosophical-novella">
                        Philosophical Allegory / Fable Novella
                      </option>
                      <option value="bildungsroman">
                        Bildungsroman / Coming-of-Age
                      </option>
                      <option value="magical-realism">
                        Magical Realism &amp; Mythopoetics
                      </option>
                      <option value="existential-classic">
                        Existentialist Classic Fiction
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-space-sm">
                    <label className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant flex items-center justify-between">
                      <span>
                        Curatorial Tags &amp; Thematic Micro-Descriptors
                      </span>
                      <span className="text-on-surface-variant font-label-md">
                        Click chip to dismiss • Press enter to add
                      </span>
                    </label>
                    <div
                      className="flex flex-wrap items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-lowest min-h-[52px]"
                      id="tagContainer"
                    >
                      <span
                        className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors hover:bg-error/20 hover:text-error cursor-pointer"
                        onClick={(event) => {
                          event.currentTarget.remove();
                        }}
                      >
                        French Classic
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </span>
                      <span
                        className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors hover:bg-error/20 hover:text-error cursor-pointer"
                        onClick={(event) => {
                          event.currentTarget.remove();
                        }}
                      >
                        Allegorical Tale
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </span>
                      <span
                        className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors hover:bg-error/20 hover:text-error cursor-pointer"
                        onClick={(event) => {
                          event.currentTarget.remove();
                        }}
                      >
                        Philosophy of Friendship
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </span>
                      <span
                        className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors hover:bg-error/20 hover:text-error cursor-pointer"
                        onClick={(event) => {
                          event.currentTarget.remove();
                        }}
                      >
                        Aviation Solitude
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </span>
                      <span
                        className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors hover:bg-error/20 hover:text-error cursor-pointer"
                        onClick={(event) => {
                          event.currentTarget.remove();
                        }}
                      >
                        Sahara Desert
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </span>
                      <div className="inline-flex items-center ml-1">
                        <input
                          className="bg-transparent font-label-md text-label-md text-on-surface placeholder:text-on-surface-variant focus:outline-none w-28"
                          id="newTagInput"
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              window.addTag(event.currentTarget);
                            }
                          }}
                          placeholder="+ Append tag..."
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <label className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                        CEFR Language Proficiency Gradient
                      </label>
                      <span
                        className="font-label-md text-label-md text-primary font-medium"
                        id="cefrActiveLabel"
                      >
                        Target: A2-B1 (Pre-Intermediate to Intermediate)
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-space-xs p-1 rounded-lg bg-surface-container-lowest">
                      <button
                        className="cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
                        data-level="A1"
                        type="button"
                      >
                        A1
                      </button>
                      <button
                        className="cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps bg-primary-container text-on-primary-container font-bold shadow-sm"
                        data-level="A2"
                        type="button"
                      >
                        A2
                      </button>
                      <button
                        className="cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps bg-primary-container text-on-primary-container font-bold shadow-sm"
                        data-level="B1"
                        type="button"
                      >
                        B1
                      </button>
                      <button
                        className="cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
                        data-level="B2"
                        type="button"
                      >
                        B2
                      </button>
                      <button
                        className="cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
                        data-level="C1"
                        type="button"
                      >
                        C1
                      </button>
                      <button
                        className="cefr-tab py-space-sm rounded-lg font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
                        data-level="C2"
                        type="button"
                      >
                        C2
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <label className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                      Designated Target Reader Cohorts
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                      <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors">
                        <input
                          defaultChecked
                          className="w-4 h-4 rounded bg-surface-container text-primary accent-primary-container"
                          type="checkbox"
                        />
                        <span className="font-label-md text-label-md text-on-surface">
                          Universal (All Ages)
                        </span>
                      </label>
                      <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors">
                        <input
                          defaultChecked
                          className="w-4 h-4 rounded bg-surface-container text-primary accent-primary-container"
                          type="checkbox"
                        />
                        <span className="font-label-md text-label-md text-on-surface">
                          Philosophers
                        </span>
                      </label>
                      <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors">
                        <input
                          defaultChecked
                          className="w-4 h-4 rounded bg-surface-container text-primary accent-primary-container"
                          type="checkbox"
                        />
                        <span className="font-label-md text-label-md text-on-surface">
                          Language Learners
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        format_quote
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Synopsis &amp; Archival Inscriptions
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Section 03 / 04
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="editorialBlurb"
                      >
                        Editorial Blurb (Concise 2-Sentence Micro-Summary)
                      </label>
                      <span
                        className="font-label-md text-label-md text-on-surface-variant"
                        id="blurbCount"
                      >
                        184 / 220 chars
                      </span>
                    </div>
                    <textarea
                      className="w-full p-space-md rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed resize-none shadow-inner"
                      id="editorialBlurb"
                      rows={2}
                      defaultValue={
                        "A stranded aviator in the Sahara awakens to find a golden-haired child from Asteroid B-612. Through whimsical encounters, the novella contemplates love, loneliness, and the invisible truths of the human heart."
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="extendedSynopsis"
                      >
                        Extended Scholarly Narrative Synopsis
                      </label>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Markdown &amp; Rich Folio Enabled
                      </span>
                    </div>
                    <div className="rounded-lg overflow-hidden bg-surface-container">
                      <div className="flex items-center gap-1 p-space-xs bg-surface-container-high/80 border-b border-surface-container-highest">
                        <button
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                          title="Bold"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            format_bold
                          </span>
                        </button>
                        <button
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                          title="Italic"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            format_italic
                          </span>
                        </button>
                        <button
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                          title="Heading"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            title
                          </span>
                        </button>
                        <span className="h-4 w-px bg-surface-container-highest mx-1" />
                        <button
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                          title="Blockquote"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            format_quote
                          </span>
                        </button>
                        <button
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                          title="Bulleted List"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            format_list_bulleted
                          </span>
                        </button>
                        <button
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                          title="Insert Footnote / Hyperlink"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            link
                          </span>
                        </button>
                        <span className="h-4 w-px bg-surface-container-highest mx-1" />
                        <span className="text-on-surface-variant font-label-caps text-label-caps ml-auto pr-2">
                          Curatorial Standard v2.4
                        </span>
                      </div>
                      <textarea
                        className="w-full p-space-md bg-transparent text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed resize-y"
                        id="extendedSynopsis"
                        rows={6}
                        defaultValue={
                          'Written in exile in New York during the darkest months of the Second World War, *Le Petit Prince* transcends the boundaries of juvenile fiction to deliver an indictment of utilitarian adulthood.\n\nThe narrator crashes in the Sahara Desert, isolated from human society with only eight days of water. There he meets the Little Prince, a tiny boy who has traveled across celestial spheres after abandoning his singular, proud rose. Along his celestial pilgrimage, he encounters allegories of human folly: a monarch who rules nobody, a vain man starved for acclaim, a tippler trapped in circular guilt, and a businessman counting stars he cannot touch. \n\nIt is only when the Prince encounters a desert fox that he learns the art of "taming"—the voluntary binding of souls that renders an otherwise ordinary being entirely unique in all the universe.'
                        }
                      />
                    </div>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-lowest flex flex-col gap-space-sm">
                    <label className="font-label-caps text-label-caps uppercase tracking-wider text-primary flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        stars
                      </span>
                      Canonical Key Folio Inscription / Anchor Quote
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full p-space-md rounded-lg bg-surface-container text-primary font-headline-sm text-headline-sm italic focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-inner"
                        id="keyQuote"
                        rows={2}
                        defaultValue={
                          "“On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.”"
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
                      <div className="flex flex-col gap-space-xs">
                        <label
                          className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                          htmlFor="speakerAttr"
                        >
                          Speaker Attribution
                        </label>
                        <input
                          className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                          id="speakerAttr"
                          type="text"
                          defaultValue="The Fox to the Little Prince (Chapter XXI)"
                        />
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label
                          className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                          htmlFor="quoteContext"
                        >
                          Philosophical Archetype
                        </label>
                        <input
                          className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                          id="quoteContext"
                          type="text"
                          defaultValue="Epistemology of Tenderness & Perception"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-lg mb-space-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        translate
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Dual-Reader &amp; Bilingual Engine Linkage
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Section 04 / 04
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container">
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Parallel Split-Pane Reading Mode
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        Permits reader side-by-side synchronized paragraph
                        alignment with phonetic gloss
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        defaultChecked
                        className="sr-only peer"
                        id="bilingualToggle"
                        type="checkbox"
                      />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary-container after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="targetLang"
                      >
                        Synchronized Parallel Target Language
                      </label>
                      <select
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                        id="targetLang"
                      >
                        <option selected value="vi">
                          Tiếng Việt (Bản dịch Hoàng Tử Bé - Bùi Giáng / Vĩnh
                          Lạc)
                        </option>
                        <option value="en">
                          English (Katherine Woods Canonical Translation)
                        </option>
                        <option value="ja">
                          日本語 (内藤濯 訳 - Iwanami Shoten)
                        </option>
                        <option value="es">
                          Español (Bonifacio del Carril)
                        </option>
                        <option value="de">
                          Deutsch (Grete &amp; Josef Leitgeb)
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="translationLicense"
                      >
                        Translation Rights Status
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                        id="translationLicense"
                        type="text"
                        defaultValue="Free Scholarly Open Access • Approved"
                      />
                    </div>
                    <div className="flex flex-col gap-space-xs md:col-span-2">
                      <label
                        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant"
                        htmlFor="audioCantosUrl"
                      >
                        Master Audio Narration Canto Source (FLAC/MP3 stream)
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                          graphic_eq
                        </span>
                        <input
                          className="w-full pl-10 pr-24 py-space-sm rounded-lg bg-surface-container text-on-surface font-body-md text-body-md font-mono focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                          id="audioCantosUrl"
                          type="text"
                          defaultValue="https://cdn.bookbridge.org/audio/archival/fr/petit-prince-gerard-philipe-1954.m4a"
                        />
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-space-sm py-1 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-caps text-label-caps uppercase tracking-wider transition-colors"
                          type="button"
                        >
                          Test Track
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <aside className="sticky bottom-0 z-40 w-full bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-high py-space-md px-margin-lg shadow-2xl">
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                  <span
                    className="font-label-md text-label-md text-on-surface font-medium"
                    id="syncStatusIndicator"
                  >
                    Draft auto-saved 2 mins ago
                  </span>
                </div>
                <span className="hidden md:inline text-surface-container-highest">
                  |
                </span>
                <span className="hidden md:inline font-label-md text-label-md text-on-surface-variant">
                  LocalStorage Mirror:
                  <code className="text-primary font-mono">
                    key:bookbridge_bk_004
                  </code>
                </span>
              </div>
              <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                <button
                  className="px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg transition-colors duration-150"
                  id="revertStateBtn"
                  type="button"
                >
                  Revert to Initial State
                </button>
                <button
                  className="px-space-md py-space-sm rounded-lg text-error hover:bg-error/10 font-label-lg text-label-lg transition-colors duration-150 inline-flex items-center gap-space-xs"
                  id="deleteRecordBtn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete_forever
                  </span>
                  <span>Delete Book Record</span>
                </button>
                <button
                  className="px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg font-bold hover:brightness-110 active:scale-95 transition-all duration-150 shadow-lg inline-flex items-center gap-space-xs"
                  id="bottomSaveBtn"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    save
                  </span>
                  <span>Save Changes (Ctrl+S)</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <footer className="w-full bg-surface-container-lowest">
        <div className="w-full px-margin-lg py-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary">
              BookBridge
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant">
              — Archival Administration &amp; Curatorial Console v2.4.0
            </span>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="font-label-md text-label-md text-on-surface-variant">
                Encrypted Archival Repository Stable
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">
              © 2024 BookBridge Foundation. All records preserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
