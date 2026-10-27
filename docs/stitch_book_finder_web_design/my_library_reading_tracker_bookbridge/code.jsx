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
  '\n        let activeBookId = 1;\n        let activeMaxPages = 96;\n\n        const STORAGE_KEY = "bookbridge_saved_books";\n\n        function initLocalStorageData() {\n          if (!localStorage.getItem(STORAGE_KEY)) {\n            const defaultData = [\n              {\n                id: 1,\n                title: "Le Petit Prince",\n                author: "Antoine de Saint-Exupéry",\n                current: 42,\n                total: 96,\n                status: "reading",\n              },\n              {\n                id: 2,\n                title: "1984",\n                author: "George Orwell",\n                current: 180,\n                total: 328,\n                status: "reading",\n              },\n              {\n                id: 3,\n                title: "The Great Gatsby",\n                author: "F. Scott Fitzgerald",\n                current: 180,\n                total: 180,\n                status: "completed",\n              },\n              {\n                id: 4,\n                title: "Truyện Kiều",\n                author: "Nguyễn Du",\n                current: 0,\n                total: 240,\n                status: "toread",\n              },\n            ];\n            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));\n          }\n        }\n\n        function getBooks() {\n          try {\n            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];\n          } catch (e) {\n            return [];\n          }\n        }\n\n        function saveBooks(books) {\n          localStorage.setItem(STORAGE_KEY, JSON.stringify(books));\n          recalculateStats();\n        }\n\n        function openModal(title, currentPage, totalPages, bookId = 1) {\n          activeBookId = bookId;\n          activeMaxPages = totalPages;\n\n          const modal = document.getElementById("progress-modal");\n          const titleEl = document.getElementById("modal-book-title");\n          const inputEl = document.getElementById("current-page-input");\n          const maxInd = document.getElementById("max-page-indicator");\n          const valHint = document.getElementById("validation-hint");\n\n          titleEl.textContent = "Update Reading Progress: " + title;\n          inputEl.max = totalPages;\n          inputEl.value = currentPage;\n          maxInd.textContent = "/ " + totalPages + " pages";\n          valHint.textContent = "Enter pages read (0 - " + totalPages + ")";\n          valHint.className =\n            "mt-1.5 font-label-sm text-label-sm text-on-surface-variant";\n\n          modal.classList.remove("hidden");\n        }\n\n        function closeModal() {\n          document.getElementById("progress-modal").classList.add("hidden");\n        }\n\n        function validatePageInput(input) {\n          const val = parseInt(input.value) || 0;\n          const max = parseInt(input.max) || 100;\n          const hint = document.getElementById("validation-hint");\n\n          if (val < 0 || val > max) {\n            hint.textContent = "Value must be between 0 and " + max + ".";\n            hint.className =\n              "mt-1.5 font-label-sm text-label-sm text-status-danger";\n          } else {\n            hint.textContent =\n              "Valid page count. Enter pages read (0 - " + max + ")";\n            hint.className =\n              "mt-1.5 font-label-sm text-label-sm text-on-surface-variant";\n          }\n        }\n\n        function applyPreset(increment) {\n          const input = document.getElementById("current-page-input");\n          let val = (parseInt(input.value) || 0) + increment;\n          if (val > activeMaxPages) val = activeMaxPages;\n          input.value = val;\n          validatePageInput(input);\n        }\n\n        function markMaxPages() {\n          const input = document.getElementById("current-page-input");\n          input.value = activeMaxPages;\n          validatePageInput(input);\n        }\n\n        function handleProgressSubmit(e) {\n          e.preventDefault();\n          const input = document.getElementById("current-page-input");\n          const val = parseInt(input.value) || 0;\n\n          if (val < 0 || val > activeMaxPages) return;\n\n          const books = getBooks();\n          const target = books.find((b) => b.id === activeBookId);\n          if (target) {\n            target.current = val;\n            if (val >= target.total) {\n              target.status = "completed";\n            } else if (val > 0) {\n              target.status = "reading";\n            }\n            saveBooks(books);\n          }\n\n          const pct = Math.round((val / activeMaxPages) * 100);\n          const textEl = document.getElementById("pg-text-" + activeBookId);\n          const pctEl = document.getElementById("pg-pct-" + activeBookId);\n          const barEl = document.getElementById("pg-bar-" + activeBookId);\n\n          if (textEl)\n            textEl.textContent = val + " / " + activeMaxPages + " pages";\n          if (pctEl) pctEl.textContent = pct + "%";\n          if (barEl) barEl.style.width = pct + "%";\n\n          const card = document.querySelector(\n            \'[data-book-id="\' + activeBookId + \'"]\',\n          );\n          if (card) {\n            card.setAttribute("data-progress", pct);\n          }\n\n          closeModal();\n        }\n\n        function resetProgress(id, max) {\n          const textEl = document.getElementById("pg-text-" + id);\n          const pctEl = document.getElementById("pg-pct-" + id);\n          const barEl = document.getElementById("pg-bar-" + id);\n          if (textEl) textEl.textContent = "0 / " + max + " pages";\n          if (pctEl) pctEl.textContent = "0%";\n          if (barEl) barEl.style.width = "0%";\n\n          const books = getBooks();\n          const target = books.find((b) => b.id === id);\n          if (target) {\n            target.current = 0;\n            target.status = "toread";\n            saveBooks(books);\n          }\n        }\n\n        function rereadBook(id, max) {\n          openModal("The Great Gatsby", 0, max, id);\n        }\n\n        function startReading(id, max) {\n          openModal("Truyện Kiều", 15, max, id);\n        }\n\n        function changeStatus(id, newStatus) {\n          const card = document.querySelector(\'[data-book-id="\' + id + \'"]\');\n          if (card) {\n            card.setAttribute("data-status", newStatus);\n          }\n          const books = getBooks();\n          const target = books.find((b) => b.id === id);\n          if (target) {\n            target.status = newStatus;\n            saveBooks(books);\n          }\n        }\n\n        function removeBook(id) {\n          const card = document.querySelector(\'[data-book-id="\' + id + \'"]\');\n          if (card) {\n            card.style.opacity = "0";\n            card.style.transform = "scale(0.95)";\n            setTimeout(() => {\n              card.remove();\n              const books = getBooks().filter((b) => b.id !== id);\n              saveBooks(books);\n              checkEmptyShelf();\n            }, 200);\n          }\n        }\n\n        function filterShelf(status) {\n          const cards = document.querySelectorAll(".book-card");\n          const tabs = document.querySelectorAll(".tab-btn");\n\n          tabs.forEach((tab) => {\n            tab.classList.remove("bg-primary", "text-on-primary");\n            tab.classList.add("text-on-surface-variant");\n          });\n\n          const activeTab = document.getElementById("tab-" + status);\n          if (activeTab) {\n            activeTab.classList.remove("text-on-surface-variant");\n            activeTab.classList.add("bg-primary", "text-on-primary");\n          }\n\n          let visibleCount = 0;\n          cards.forEach((card) => {\n            const cardStatus = card.getAttribute("data-status");\n            if (status === "all" || cardStatus === status) {\n              card.style.display = "flex";\n              visibleCount++;\n            } else {\n              card.style.display = "none";\n            }\n          });\n\n          checkEmptyShelf(visibleCount);\n        }\n\n        function sortShelf(criteria) {\n          const container = document.getElementById("books-shelf-grid");\n          const cards = Array.from(container.querySelectorAll(".book-card"));\n\n          cards.sort((a, b) => {\n            if (criteria === "progress") {\n              return (\n                parseInt(b.getAttribute("data-progress") || 0) -\n                parseInt(a.getAttribute("data-progress") || 0)\n              );\n            } else if (criteria === "title") {\n              return (a.getAttribute("data-title") || "").localeCompare(\n                b.getAttribute("data-title") || "",\n              );\n            } else if (criteria === "author") {\n              return (a.getAttribute("data-author") || "").localeCompare(\n                b.getAttribute("data-author") || "",\n              );\n            }\n            return 0;\n          });\n\n          cards.forEach((c) => container.appendChild(c));\n        }\n\n        function checkEmptyShelf(overrideCount) {\n          const cards = document.querySelectorAll(".book-card");\n          let visible = 0;\n          cards.forEach((c) => {\n            if (c.style.display !== "none") visible++;\n          });\n          if (overrideCount !== undefined) visible = overrideCount;\n\n          const empty = document.getElementById("empty-state");\n          if (visible === 0) {\n            empty.classList.remove("hidden");\n            empty.classList.add("flex");\n          } else {\n            empty.classList.add("hidden");\n            empty.classList.remove("flex");\n          }\n        }\n\n        function recalculateStats() {\n          const books = getBooks();\n          const totalEl = document.getElementById("stat-total-books");\n          const readingEl = document.getElementById("stat-reading-books");\n          const completedEl = document.getElementById("stat-completed-books");\n          const toreadEl = document.getElementById("stat-toread-books");\n          const pagesEl = document.getElementById("stat-total-pages");\n\n          if (totalEl) totalEl.textContent = books.length;\n          if (readingEl)\n            readingEl.textContent = books.filter(\n              (b) => b.status === "reading",\n            ).length;\n          if (completedEl)\n            completedEl.textContent = books.filter(\n              (b) => b.status === "completed",\n            ).length;\n          if (toreadEl)\n            toreadEl.textContent = books.filter(\n              (b) => b.status === "toread",\n            ).length;\n          if (pagesEl) {\n            const sum = books.reduce(\n              (acc, curr) => acc + (curr.current || 0),\n              0,\n            );\n            pagesEl.textContent = sum;\n          }\n        }\n\n        function seedSampleData() {\n          localStorage.removeItem(STORAGE_KEY);\n          initLocalStorageData();\n          location.reload();\n        }\n\n        document.addEventListener("DOMContentLoaded", () => {\n          initLocalStorageData();\n          recalculateStats();\n\n          const exportBtn = document.getElementById("export-library-btn");\n          if (exportBtn) {\n            exportBtn.addEventListener("click", () => {\n              const dataStr =\n                "data:text/json;charset=utf-8," +\n                encodeURIComponent(localStorage.getItem(STORAGE_KEY));\n              const downloadAnchor = document.createElement("a");\n              downloadAnchor.setAttribute("href", dataStr);\n              downloadAnchor.setAttribute(\n                "download",\n                "bookbridge_library_shelf.json",\n              );\n              document.body.appendChild(downloadAnchor);\n              downloadAnchor.click();\n              downloadAnchor.remove();\n            });\n          }\n        });\n      \nwindow["openModal"] = openModal;\nwindow["filterShelf"] = filterShelf;\nwindow["sortShelf"] = sortShelf;\nwindow["changeStatus"] = changeStatus;\nwindow["resetProgress"] = resetProgress;\nwindow["removeBook"] = removeBook;\nwindow["rereadBook"] = rereadBook;\nwindow["startReading"] = startReading;\nwindow["seedSampleData"] = seedSampleData;\nwindow["closeModal"] = closeModal;\nwindow["handleProgressSubmit"] = handleProgressSubmit;\nwindow["validatePageInput"] = validatePageInput;\nwindow["applyPreset"] = applyPreset;\nwindow["markMaxPages"] = markMaxPages;',
];

export default function MyLibraryReadingTrackerBookbridge() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "my_library_reading_tracker_bookbridge",
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors text-primary font-bold bg-surface-container rounded-full"
              data-path="my-library"
              href="#"
              aria-current="page"
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
          <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/40 via-surface to-surface pb-12 pt-8 px-6 lg:px-12">
            <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-accent-gold-light/10 blur-3xl" />
            <div className="pointer-events-none absolute top-12 right-10 h-80 w-80 rounded-full bg-secondary-container/5 blur-3xl" />
            <div className="max-w-[1440px] mx-auto w-full relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container bg-surface-container-high/60 px-3 py-1 rounded-full">
                  Personal Archival Shelf
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    sync
                  </span>
                  Auto-synchronized with LocalStorage
                </span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
                <div className="max-w-3xl space-y-3">
                  <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    My Personal Library &amp; Reading Tracker
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    Track your reading journeys, update daily progress, and
                    organize saved titles. Stored securely in your browser.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-all"
                    id="export-library-btn"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      file_download
                    </span>
                    <span>Export Shelf</span>
                  </button>
                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md hover:bg-primary-container transition-all"
                    onClick={(event) => {
                      window.openModal("Le Petit Prince", 42, 96);
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      add_circle
                    </span>
                    <span>Log Daily Entry</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
                <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Total Saved
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        collections_bookmark
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-headline-md text-headline-md font-bold text-primary"
                      id="stat-total-books"
                    >
                      4
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      volumes
                    </span>
                  </div>
                  <div className="mt-2 text-on-surface-variant font-label-sm text-label-sm">
                    Curated shelf collection
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider">
                      In Progress
                    </span>
                    <div className="w-8 h-8 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-on-tertiary-container">
                      <span className="material-symbols-outlined text-[18px]">
                        auto_stories
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-headline-md text-headline-md font-bold text-on-tertiary-container"
                      id="stat-reading-books"
                    >
                      2
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      active
                    </span>
                  </div>
                  <div className="mt-2 text-on-tertiary-container font-label-sm text-label-sm flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse" />
                    Daily session ongoing
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm text-status-success uppercase tracking-wider">
                      Completed
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-status-success">
                      <span className="material-symbols-outlined text-[18px]">
                        task_alt
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-headline-md text-headline-md font-bold text-primary"
                      id="stat-completed-books"
                    >
                      1
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      finished
                    </span>
                  </div>
                  <div className="mt-2 text-status-success font-label-sm text-label-sm">
                    25% complete ratio
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Wishlist
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_border
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-headline-md text-headline-md font-bold text-primary"
                      id="stat-toread-books"
                    >
                      1
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      queued
                    </span>
                  </div>
                  <div className="mt-2 text-on-surface-variant font-label-sm text-label-sm">
                    Next in queue
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Pages Read
                    </span>
                    <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-on-tertiary-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="58, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="font-headline-md text-headline-md font-bold text-primary"
                        id="stat-total-pages"
                      >
                        482
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        / 844 pgs
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-on-tertiary-container h-full rounded-full transition-all duration-500"
                        style={{ width: "57%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-6 lg:px-12 py-10 max-w-[1440px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8">
              <div className="flex flex-wrap items-center gap-2 p-1 bg-surface-container-low rounded-full w-fit shadow-inner">
                <button
                  className="tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md bg-primary text-on-primary shadow-sm transition-all"
                  id="tab-all"
                  onClick={(event) => {
                    window.filterShelf("all");
                  }}
                >
                  All Saved Books (4)
                </button>
                <button
                  className="tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all"
                  id="tab-reading"
                  onClick={(event) => {
                    window.filterShelf("reading");
                  }}
                >
                  Currently Reading (2)
                </button>
                <button
                  className="tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all"
                  id="tab-toread"
                  onClick={(event) => {
                    window.filterShelf("toread");
                  }}
                >
                  To Read (1)
                </button>
                <button
                  className="tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all"
                  id="tab-completed"
                  onClick={(event) => {
                    window.filterShelf("completed");
                  }}
                >
                  Completed (1)
                </button>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    className="appearance-none bg-surface-container-lowest text-primary font-label-md text-label-md pl-3 pr-8 py-1.5 rounded-lg shadow-sm focus:outline-none cursor-pointer"
                    id="sort-select"
                    onChange={(event) => {
                      window.sortShelf(event.currentTarget.value);
                    }}
                  >
                    <option value="recent">Recent Activity</option>
                    <option value="progress">Reading Progress</option>
                    <option value="title">Book Title</option>
                    <option value="author">Author Name</option>
                  </select>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2 top-2 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              id="books-shelf-grid"
            >
              <article
                className="book-card group flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                data-author="Antoine de Saint-Exupéry"
                data-book-id={1}
                data-progress={44}
                data-status="reading"
                data-title="Le Petit Prince"
              >
                <div>
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface-container mb-4 shadow-sm">
                    <img
                      alt="Le Petit Prince Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv7TiHxJJ5hHngzXPKHOhdAbFzTXtivH9VFTlExbHargI9VtChwo9vY-9KC1yhD6Pd5nsCGh8stC7mKUWh34joVvrzDnxN3v2jBJpGgPQOMCndqIdqXxVP0Tw74dH6cy2z5sBK7tZUu6Z-240yoOWCJB-6WDEus1V0SX9tGLpOgGn7eqYcfRURKsHTJr2aJcOYeqBD_Jk1sfR7zbwHD9cEixqL-QbuTzE8Ilf6pg"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/85 backdrop-blur-md text-on-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold-light animate-pulse" />
                        Reading
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-tertiary-container flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container font-semibold">
                      Classic Novella
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight line-clamp-1 group-hover:text-secondary transition-colors">
                      Le Petit Prince
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Antoine de Saint-Exupéry
                    </p>
                  </div>
                  <div className="mt-4 pt-4 bg-surface-container-low/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className="font-label-sm text-label-sm text-on-surface-variant"
                        htmlFor="status-1"
                      >
                        Reading Shelf
                      </label>
                      <select
                        className="text-xs bg-surface-container-lowest rounded px-2 py-1 font-label-sm text-primary shadow-xs focus:outline-none cursor-pointer"
                        id="status-1"
                        onChange={(event) => {
                          window.changeStatus(1, event.currentTarget.value);
                        }}
                      >
                        <option selected value="reading">
                          Currently Reading
                        </option>
                        <option value="toread">To Read</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span
                          className="font-label-sm text-label-sm text-primary font-semibold"
                          id="pg-text-1"
                        >
                          42 / 96 pages
                        </span>
                        <span
                          className="font-label-sm text-label-sm text-on-tertiary-container font-bold"
                          id="pg-pct-1"
                        >
                          44%
                        </span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-accent-gold-light to-on-tertiary-container h-full rounded-full transition-all duration-300"
                          id="pg-bar-1"
                          style={{ width: "44%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-3 flex items-center justify-between gap-2">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm hover:bg-primary-container transition-all"
                    onClick={(event) => {
                      window.openModal("Le Petit Prince", 42, 96, 1);
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      edit_note
                    </span>
                    <span>Update Progress</span>
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high transition-colors"
                    onClick={(event) => {
                      window.resetProgress(1, 96);
                    }}
                    title="Reset to page 0"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      restart_alt
                    </span>
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-surface-container text-status-danger/80 flex items-center justify-center hover:bg-error-container hover:text-error transition-colors"
                    onClick={(event) => {
                      window.removeBook(1);
                    }}
                    title="Remove from shelf"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      delete_outline
                    </span>
                  </button>
                </div>
              </article>
              <article
                className="book-card group flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                data-author="George Orwell"
                data-book-id={2}
                data-progress={55}
                data-status="reading"
                data-title={1984}
              >
                <div>
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface-container mb-4 shadow-sm">
                    <img
                      alt="1984 Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT_BlIIzRNoUvQVIepR1-KHoQM1jcDfiGYU7YN6k3WCBoWVYuQEuCTo-p-qssDNryHqf6gRDVFWHcjICHPw1maFVLbMwhd2VBGTg4zMiPVxL_NLlrGUZk_2iV5Lb2NTDb3SgKT1wnD1w4v1ZG_Ia8hp3dN6-hmAE4bOLmW4uYbvD9ZNbmHOS4rj2vJN5BdDYFonqZrSYZNWoYg6tz2q-FOtOCUnSDlMcKXygy7rA"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/85 backdrop-blur-md text-on-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold-light animate-pulse" />
                        Reading
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-tertiary-container flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                      Dystopian Fiction
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight line-clamp-1 group-hover:text-secondary transition-colors">
                      1984
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      George Orwell
                    </p>
                  </div>
                  <div className="mt-4 pt-4 bg-surface-container-low/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className="font-label-sm text-label-sm text-on-surface-variant"
                        htmlFor="status-2"
                      >
                        Reading Shelf
                      </label>
                      <select
                        className="text-xs bg-surface-container-lowest rounded px-2 py-1 font-label-sm text-primary shadow-xs focus:outline-none cursor-pointer"
                        id="status-2"
                        onChange={(event) => {
                          window.changeStatus(2, event.currentTarget.value);
                        }}
                      >
                        <option selected value="reading">
                          Currently Reading
                        </option>
                        <option value="toread">To Read</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span
                          className="font-label-sm text-label-sm text-primary font-semibold"
                          id="pg-text-2"
                        >
                          180 / 328 pages
                        </span>
                        <span
                          className="font-label-sm text-label-sm text-secondary font-bold"
                          id="pg-pct-2"
                        >
                          55%
                        </span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-accent-indigo to-secondary-container h-full rounded-full transition-all duration-300"
                          id="pg-bar-2"
                          style={{ width: "55%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-3 flex items-center justify-between gap-2">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm hover:bg-primary-container transition-all"
                    onClick={(event) => {
                      window.openModal("1984", 180, 328, 2);
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      edit_note
                    </span>
                    <span>Update Progress</span>
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-surface-container text-status-danger/80 flex items-center justify-center hover:bg-error-container hover:text-error transition-colors"
                    onClick={(event) => {
                      window.removeBook(2);
                    }}
                    title="Remove from shelf"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      delete_outline
                    </span>
                  </button>
                </div>
              </article>
              <article
                className="book-card group flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                data-author="F. Scott Fitzgerald"
                data-book-id={3}
                data-progress={100}
                data-status="completed"
                data-title="The Great Gatsby"
              >
                <div>
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface-container mb-4 shadow-sm">
                    <img
                      alt="The Great Gatsby Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2tMf-r63gPUXb4ko7Y9nhf59vg0uFnvmyEKu0ZZybYgK7g9lYdjw5a-lzAutgihYa1R-GxommnZ_o_NWTbaMh7HKPx88ob643FwbQ7tFuiveF1T19UArtAj-QrPB3DpSjO-uJ049zdMmq-230S2Dq--qB0Oqq-1BSAbOd5f7Fn0IxTkrSx-Cd8XbgqdH61tMpmq6qmKhNkB0j32T9sc0Q2gX6kpUCr7YPs8sLLw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-status-success text-on-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          check
                        </span>
                        Completed
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface-variant flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_added
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-status-success font-semibold">
                      American Classic
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight line-clamp-1 group-hover:text-secondary transition-colors">
                      The Great Gatsby
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      F. Scott Fitzgerald
                    </p>
                  </div>
                  <div className="mt-4 pt-4 bg-surface-container-low/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Archived Status
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-surface-container text-status-success font-semibold">
                        <span className="material-symbols-outlined text-[12px]">
                          verified
                        </span>
                        Done
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          180 / 180 pages
                        </span>
                        <span className="font-label-sm text-label-sm text-status-success font-bold">
                          100%
                        </span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-status-success h-full rounded-full"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-3 flex items-center justify-between gap-2">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-surface-container text-primary font-label-sm text-label-sm shadow-sm hover:bg-surface-container-high transition-all"
                    onClick={(event) => {
                      window.rereadBook(3, 180);
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      replay
                    </span>
                    <span>Re-read</span>
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-surface-container text-status-danger/80 flex items-center justify-center hover:bg-error-container hover:text-error transition-colors"
                    onClick={(event) => {
                      window.removeBook(3);
                    }}
                    title="Remove from shelf"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      delete_outline
                    </span>
                  </button>
                </div>
              </article>
              <article
                className="book-card group flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                data-author="Nguyễn Du"
                data-book-id={4}
                data-progress={0}
                data-status="toread"
                data-title="Truyện Kiều"
              >
                <div>
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface-container mb-4 shadow-sm">
                    <img
                      alt="Truyện Kiều Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmxGFAgMIEOO1nnUl_BgdWv6lzTssb_5rI__IqSpV2fdQZKI1qa5or4lFIiOo_emheCcfhy_FmmC8-pucHbU8-TTszcQGE1ge0PrBUEl4zz9o__vueTNc1cVpIB9WEo2R8TadIpSt-ylMgJ9PkZwJl8jE2XoPtIlHXIbOe96JJBfZ1ugc7V509lhdSe6inW3mS2yQaq9V0dOSEMQKZ4Af3rY70z8weM7QLyF6QRA"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-semibold">
                        <span className="material-symbols-outlined text-[14px]">
                          bookmark
                        </span>
                        To Read
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface-variant flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_border
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container font-semibold">
                      Epic Verse (3,254 verses)
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight line-clamp-1 group-hover:text-secondary transition-colors">
                      Truyện Kiều
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Nguyễn Du
                    </p>
                  </div>
                  <div className="mt-4 pt-4 bg-surface-container-low/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className="font-label-sm text-label-sm text-on-surface-variant"
                        htmlFor="status-4"
                      >
                        Reading Shelf
                      </label>
                      <select
                        className="text-xs bg-surface-container-lowest rounded px-2 py-1 font-label-sm text-primary shadow-xs focus:outline-none cursor-pointer"
                        id="status-4"
                        onChange={(event) => {
                          window.changeStatus(4, event.currentTarget.value);
                        }}
                      >
                        <option value="reading">Currently Reading</option>
                        <option selected value="toread">
                          To Read (Wishlist)
                        </option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span
                          className="font-label-sm text-label-sm text-on-surface-variant"
                          id="pg-text-4"
                        >
                          0 / 240 pages
                        </span>
                        <span
                          className="font-label-sm text-label-sm text-on-surface-variant"
                          id="pg-pct-4"
                        >
                          0%
                        </span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-on-tertiary-container h-full rounded-full transition-all duration-300"
                          id="pg-bar-4"
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-3 flex items-center justify-between gap-2">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-secondary text-on-primary font-label-sm text-label-sm shadow-sm hover:bg-secondary-container transition-all"
                    onClick={(event) => {
                      window.startReading(4, 240);
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      menu_book
                    </span>
                    <span>Start Reading</span>
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-surface-container text-status-danger/80 flex items-center justify-center hover:bg-error-container hover:text-error transition-colors"
                    onClick={(event) => {
                      window.removeBook(4);
                    }}
                    title="Remove from shelf"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      delete_outline
                    </span>
                  </button>
                </div>
              </article>
            </div>
            <div
              className="hidden flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
              id="empty-state"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
                <span className="material-symbols-outlined text-[32px]">
                  menu_book
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                No volumes found
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                There are no books currently listed under this shelf filter tab.
              </p>
              <button
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md"
                onClick={(event) => {
                  window.filterShelf("all");
                }}
              >
                View All Books
              </button>
            </div>
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-surface-container to-surface-container-high p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-tertiary-container font-semibold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">
                    bolt
                  </span>
                  Reader Velocity Insight
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">
                  You are averaging 24 pages per reading session
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  At this current cadence, you will finish
                  <em>Le Petit Prince</em> in approximately 2.3 days. Keep up
                  your deliberate focus time!
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex flex-col items-center justify-center p-4 bg-surface-container-lowest rounded-xl shadow-xs min-w-[110px]">
                  <span className="font-headline-md text-headline-md font-bold text-on-tertiary-container">
                    5
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Day Streak
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-surface-container-lowest rounded-xl shadow-xs min-w-[110px]">
                  <span className="font-headline-md text-headline-md font-bold text-secondary">
                    38m
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Daily Avg
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-xl bg-surface-container-low p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    lock
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  All library bookmarks and reading progress are saved directly
                  to your browser's Local Storage (Key:
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-semibold">
                    bookbridge_saved_books
                  </code>
                  ). No account required.
                </p>
              </div>
              <button
                className="shrink-0 inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:underline cursor-pointer"
                id="reset-storage-btn"
                onClick={(event) => {
                  window.seedSampleData();
                }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  refresh
                </span>
                Restore Sample State
              </button>
            </div>
          </section>
          <div
            className="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm transition-opacity duration-300"
            id="progress-modal"
          >
            <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-2xl transform transition-all">
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high transition-colors"
                onClick={(event) => {
                  window.closeModal();
                }}
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
              <div className="space-y-1 mb-6">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container font-semibold">
                  Session Tracker
                </span>
                <h3
                  className="font-headline-sm text-headline-sm text-primary"
                  id="modal-book-title"
                >
                  Update Reading Progress: Le Petit Prince
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Log pages completed to reflect updated reading ratio.
                </p>
              </div>
              <form
                className="space-y-5"
                id="progress-form"
                onSubmit={(event) => {
                  window.handleProgressSubmit(event);
                }}
              >
                <div>
                  <label
                    className="block font-label-md text-label-md text-primary mb-1"
                    htmlFor="current-page-input"
                  >
                    Current Page Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-11 px-4 rounded-lg bg-surface-container-low text-primary font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all"
                      id="current-page-input"
                      max={96}
                      min={0}
                      name="currentPage"
                      onInput={(event) => {
                        window.validatePageInput(event.currentTarget);
                      }}
                      type="number"
                      defaultValue={42}
                    />
                    <span
                      className="absolute right-4 top-2.5 font-label-sm text-label-sm text-on-surface-variant"
                      id="max-page-indicator"
                    >
                      / 96 pages
                    </span>
                  </div>
                  <p
                    className="mt-1.5 font-label-sm text-label-sm text-on-surface-variant"
                    id="validation-hint"
                  >
                    Enter pages read (0 - 96)
                  </p>
                </div>
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                    Quick Add Presets:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="flex-1 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm transition-colors"
                      onClick={(event) => {
                        window.applyPreset(10);
                      }}
                      type="button"
                    >
                      +10 pages
                    </button>
                    <button
                      className="flex-1 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm transition-colors"
                      onClick={(event) => {
                        window.applyPreset(25);
                      }}
                      type="button"
                    >
                      +25 pages
                    </button>
                    <button
                      className="flex-1 py-1.5 rounded-lg bg-tertiary-fixed/70 hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm transition-colors"
                      onClick={(event) => {
                        window.markMaxPages();
                      }}
                      type="button"
                    >
                      Completed
                    </button>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    className="px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                    onClick={(event) => {
                      window.closeModal();
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md hover:bg-primary-container transition-all"
                    type="submit"
                  >
                    Save Progress
                  </button>
                </div>
              </form>
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
