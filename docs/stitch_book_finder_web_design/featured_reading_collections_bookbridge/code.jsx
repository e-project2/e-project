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
  '\n          function handleCollectionCreate() {\n            const titleInput = document.getElementById(\n              "custom-collection-title",\n            );\n            const title = titleInput.value.trim();\n            if (!title) {\n              alert("Please enter a collection title.");\n              return;\n            }\n\n            const newCollection = {\n              id: "coll_" + Date.now(),\n              title: title,\n              description:\n                document\n                  .getElementById("custom-collection-desc")\n                  .value.trim() || "Custom user compilation.",\n              readTime:\n                document\n                  .getElementById("custom-collection-time")\n                  .value.trim() || "Flexible",\n              createdAt: new Date().toISOString(),\n              booksCount: 0,\n            };\n\n            try {\n              const stored = JSON.parse(\n                localStorage.getItem("bookbridge_custom_collections") || "[]",\n              );\n              stored.push(newCollection);\n              localStorage.setItem(\n                "bookbridge_custom_collections",\n                JSON.stringify(stored),\n              );\n            } catch (e) {\n              console.warn("Local storage write issue", e);\n            }\n\n            document.getElementById("builder-dialog").classList.add("hidden");\n            titleInput.value = "";\n            document.getElementById("custom-collection-desc").value = "";\n            document.getElementById("custom-collection-time").value = "";\n\n            alert(\n              \'Custom Collection "\' + title + \'" saved to your local shelf!\',\n            );\n          }\n        \nwindow["handleCollectionCreate"] = handleCollectionCreate;',
];

export default function FeaturedReadingCollectionsBookbridge() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "featured_reading_collections_bookbridge",
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
              data-path="home---bookbridge-literary-platform"
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
              data-path="language-&-genre-explorer-—-bookbridge"
              href="#"
            >
              Explorer
            </a>
            <a
              aria-current="page"
              className="px-3 py-1.5 transition-colors text-primary font-bold bg-surface-container rounded-full"
              data-path="featured-reading-collections-—-bookbridge"
              href="#"
            >
              Collections
            </a>
            <a
              className="px-3 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="my-library"
              href="#"
            >
              My Library
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
          <div className="relative w-full overflow-hidden">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-64 right-10 w-[500px] h-[500px] bg-tertiary-container/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-16 w-full">
              <div className="flex flex-col max-w-4xl space-y-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant w-fit shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                    auto_stories
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                    Editorial Compilations • Curated by Scholars
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg lg:font-display-hero lg:text-display-hero text-primary tracking-tight">
                  Featured Reading
                  <span className="italic font-normal text-on-tertiary-container">
                    Collections
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                  Thoughtfully assembled thematic reading journeys compiled by
                  comparative literature academics, translators, and community
                  archivists to illuminate narrative traditions across cultures
                  and historical eras.
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                <div className="bg-surface-card p-6 rounded-xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Curated Paths
                    </span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        collections_bookmark
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-headline-md text-headline-md text-primary">
                      04
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Thematic anthologies
                    </p>
                  </div>
                </div>
                <div className="bg-surface-card p-6 rounded-xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Index Size
                    </span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-tertiary-container group-hover:bg-on-tertiary-container group-hover:text-on-tertiary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        menu_book
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-headline-md text-headline-md text-primary">
                      20+
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Annotated masterworks
                    </p>
                  </div>
                </div>
                <div className="bg-surface-card p-6 rounded-xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Critical Context
                    </span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        psychology
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-headline-md text-headline-md text-primary">
                      100%
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Historical reading guides
                    </p>
                  </div>
                </div>
                <div className="bg-surface-card p-6 rounded-xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Local Cache
                    </span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-status-success group-hover:bg-status-success group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        sync_saved_locally
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-headline-md text-headline-md text-primary">
                      Synchronized
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Archived to local shelf
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24 w-full space-y-24">
            <section
              className="flex flex-col space-y-8"
              id="collection-timeless-classics"
            >
              <div className="bg-surface-card rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-surface-container rounded-full blur-2xl -z-0" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-primary-container text-surface-container-lowest font-label-sm text-label-sm tracking-wide inline-flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[15px] text-accent-gold-light">
                          workspace_premium
                        </span>
                        Worldwide Canon
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Col. 01 • Vietnamese &amp; Western Pillars
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">
                      Timeless Classics
                      <span className="font-body-md text-body-md text-on-surface-variant font-normal tracking-normal italic block sm:inline sm:ml-2">
                        (Kinh điển Vượt Thời Gian)
                      </span>
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Essential foundational masterworks that constructed world
                      civilization's philosophical vernacular, moral inquiry,
                      and enduring narrative traditions.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl max-w-sm shrink-0 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container mt-0.5 text-[22px]">
                        history_edu
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                          Curator Note
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Ideal for deep reflective reading. Includes historical
                          annotations, stanza breakdowns, and linguistic
                          evolution side-notes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="An ornate classical book cover of Truyen Kieu by Nguyen Du featuring delicate traditional Vietnamese hand-painted lotus motifs and classical calligraphy on warm aged parchment paper with deep indigo accents in soft editorial studio lighting."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd-m-h6N--R2vZwKW_ck4JFCeivsGw6ncooEw4Xnxb-89C4i-Ld55j7CF1sqD4ozmWMsk1W7jd8yMa5k5ziHnXyNUidTHKoUo7w60_pBUK-iVYR6H-QjrRZk9kCgZtsa3vD6IYxUE_LrKymmPVXKNeEgceSZpQh7rKKDcvK0NDb28e93O3PJWCUjI2eF51rpB0u4Gt7OYuqVfM3iMpOkT3WxdLtpnTYl6QmtZ9rw"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Vietnamese
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        Epic Poetry
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Truyện Kiều
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Nguyễn Du
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          history
                        </span>
                        <span>3,254 verses (Lục Bát)</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Truyện Kiều");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Vintage Art Deco styled book cover for The Great Gatsby by F. Scott Fitzgerald with shimmering golden geometric lacework, twilight dark blue night sky, and distant green harbor beacon light in an elegant modernist literary aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgHY3t_oYLo1Vr7lEwwcsyLem5J899l3vr7Ve9vw2R6kLOOxuiKbRct6hNXwVJgpogc6Bq3JHnG-F0ztcnevAEHJyJHLEeMrVIYfTfFQHMF2jSeVCmNnR9WrvpPG20cmiTSqlg72hG9G-PHc4eL7tKOIwrUum9lzr0DgIe8lWiPNeXxqo1IMNFlKgtQaCnS31v_OhEI5KlXYVXDF_ImnmgsCmNJS62Mv_6MzaSXQ"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        English
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        Jazz Age Classic
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        The Great Gatsby
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        F. Scott Fitzgerald
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          import_contacts
                        </span>
                        <span>180 pages</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: The Great Gatsby");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Subtle, somber literary book cover of Crime and Punishment by Fyodor Dostoevsky depicting cobblestone Saint Petersburg alleys cloaked in foggy winter dusk with deep slate navy and amber streetlight reflections."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7I-7snbujpqZHp1d65VHKhntVY9vUTGWA51XD6kJTKMD919CxK1hpV9laRKHTbDcqgrZZWoUUSU1fvbihRBUjvTlwwYsHclj5BaJ2UUlLAOoqixyZEE6hICqYVkqNoJaquvWPYxlRLJO5-9AcFboWYqBXwEwdC8mLLuxJNOzKahi3Q8H9YcZUHwM7cRECfuH2IpN_oexOjBSZiqdkMPf5YCrfxz_BtXWE20v81A"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Russian
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        Psychological Realism
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Crime and Punishment
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Fyodor Dostoevsky
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          import_contacts
                        </span>
                        <span>671 pages</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert(
                          "Viewing archival monograph: Crime and Punishment",
                        );
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Refined French 19th-century book cover of Madame Bovary by Gustave Flaubert with delicate botanical embossing, muted velvet texture, and gold typography on deep navy leatherette background."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvNlJXdyBj_3VU7wmZNM74eMawiz7YId8DbeGQ6hQarD0Qh9BhKlPB2k_PzN9AhEfYxywcbx3MyInSffl8JQh6xLn55FWRKlAgTdrASqgd6MVDrDLLZ0jSzS7cbPORXMFCLvfVdJs3uMX6uo_Rwwhbz-9Xhsaq0H7vQ-xgzMVqf0Y9hXi8YBSMBomaWBlpYURfKgC3wHfwJ-vGQOEf7ggaz5JZZmfXyzRFye2Khg"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        French
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        19th-Century Realism
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Madame Bovary
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Gustave Flaubert
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          import_contacts
                        </span>
                        <span>429 pages</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Madame Bovary");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
              </div>
            </section>
            <section
              className="flex flex-col space-y-8"
              id="collection-short-reads"
            >
              <div className="bg-surface-card rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute -left-16 -top-16 w-64 h-64 bg-surface-variant/40 rounded-full blur-2xl -z-0" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm tracking-wide inline-flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[15px]">
                          timer
                        </span>
                        &lt; 200 Pages • Weekend Sittings
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Col. 02 • High Density Literatures
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">
                      Bite-sized Masterpieces
                      <span className="font-body-md text-body-md text-on-surface-variant font-normal tracking-normal italic block sm:inline sm:ml-2">
                        (Đọc Nhanh &amp; Tinh Gọn)
                      </span>
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Deep, transformative literature engineered for busy
                      readers, commute companions, and focused weekend
                      respites—delivering full existential punches in single
                      sittings.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl max-w-sm shrink-0 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-0.5 text-[22px]">
                        schedule
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                          Time Commitment
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Average completion velocity: 1.5 to 4 hours per work.
                          Perfect pacing for reflective travelers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Minimalist poetic watercolor book cover of Le Petit Prince featuring an ethereal golden-haired prince on a petite asteroid surrounded by tiny roses and starry constellations on midnight indigo backdrop."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIjzqulOvILOg6P_b5gxmopp37ecJNfcy50Q3BG1v7oP35fX3giOE60SbZgnJ6Bl8pCcEYxRl3dMMT8GAKcIyV6lpyC6lrdr2TemrfLR4TLqqs9W1w9cftRbZsxDv-cNPc4QDs2u2J5nlanOiF3lOt8lrfCYeijpexku0u6reHahemr7tRfbmgLbnpmZI01CEI3w3a5Vg2ylcDYyXY3XLJywiyE_VB9-kj9_Ie5A"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          bolt
                        </span>
                        ~1.5h Read
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        French
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Le Petit Prince
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Antoine de Saint-Exupéry
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          auto_stories
                        </span>
                        <span>96 pages • Allegory</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Le Petit Prince");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Editorial modernist cover of The Stranger L'Etranger by Albert Camus with stark harsh Mediterranean sunlight silhouette and minimalist typographic composition in ochre and black tones."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9ptHzJiENj9Y8MxLlMzI79xnl6nIkTeCCrO47ZZwC0TySgo2fgdIMqpYXUKRk1jCTTqalIimGBza8L1B37X66pooYcv0fExqJ8M_MtsXLAsP4B1WrtD9BHKQn7UpeGh_juTBniUUVKZmfM9_kjiWwy4Ev71mwHbPl18zMGhxZV1UhS_XdL8siNmDrg42txCdqYmA-Gz9mG-tCRk5GY2ho7efQc-w6d93aOScUEg"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          bolt
                        </span>
                        ~2.5h Read
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        French
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        L'Étranger (The Stranger)
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Albert Camus
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          auto_stories
                        </span>
                        <span>159 pages • Absurdism</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: L’Étranger");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Labyrinthine surrealist book cover for Ficciones by Jorge Luis Borges with intricate Escher-like infinite staircases, mirror illusions, and dusty book archives in muted amber and bronze tones."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFwuN-zsQ27otuGtVu9N8VCwLkZ2iuQFL-9OHbg5HnjFoBvGYm7vvXLPE2tu96-o2aMUdShdaaGSvl3M9Gmiw8TED5Y0DORc7_XoyttprUCUOijPuUUml7Y3aq52wg8tfUglD1X0U6GEYstCzmbsrRc_dcl0v34PU4jUQ7bSpoN86Y1s5LsQUNL6MqGzCWHwuI-u8bPf31APNE6fceUNT9gcfWWHvvAQTkX6922A"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          bolt
                        </span>
                        ~3h Read
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Spanish
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Ficciones
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Jorge Luis Borges
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          auto_stories
                        </span>
                        <span>174 pages • Philosophical Short Stories</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Ficciones");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Contemplative Japanese woodblock inspired book cover of Kokoro by Natsume Soseki with serene Tokyo Meiji-era garden path, delicate bamboo shadows, and textured wabi-sabi paper aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHZgiOHoMgNeAF0idv0VFEcKpvSOrbX4dBEX-Cg4QDb0FL4nMOp8i5Lo4gBRogqLRmcY8T8pr2kSctQ8Sc9CSWb341TwU0GXynMvb15tdoG3SbkjV5g5Kp6EyrrB0cw5Pjh5gGEl2gZZ7CtQO3mPEg0XWjW0aVdLpSNVzfhLY6khFHI9r16k3QKJ9dJ1ojPCyf6SgiONM20bo02nMlHPfIuW1fwXxgMXZeJjonbA"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-on-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          bolt
                        </span>
                        ~4h Read
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Japanese
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Kokoro
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Natsume Sōseki
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          auto_stories
                        </span>
                        <span>248 pages • Meiji Realism</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Kokoro");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
              </div>
            </section>
            <section
              className="flex flex-col space-y-8"
              id="collection-contemporary-voices"
            >
              <div className="bg-surface-card rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-0" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm tracking-wide inline-flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[15px] text-secondary">
                          public
                        </span>
                        21st Century &amp; Late Modernism
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Col. 03 • Global Perspectives
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">
                      Contemporary Reflections
                      <span className="font-body-md text-body-md text-on-surface-variant font-normal tracking-normal italic block sm:inline sm:ml-2">
                        (Văn Học Đương Đại)
                      </span>
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Modern prose reflecting societal transitions, migration,
                      existential solitude, and hybrid cultural identities in an
                      interconnected yet alienated world.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl max-w-sm shrink-0 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-0.5 text-[22px]">
                        translate
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                          Linguistic Breadth
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Features cross-lingual translated editions with
                          side-by-side glossary comparisons.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Melancholic and atmospheric book cover of Norwegian Wood by Haruki Murakami with stylized winter forest silhouettes, crimson abstract accent, and deep slate blue mist."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHkK7gNi3VOaqKMGFZV4tA6aICeJZnZwAX9Zl3z-_zu5CTnV2qpCHIfwAbgfMTfSR_c5Wzv8C2LWHTDkCXKoAXpWAgbj7KwzJI1UQJzi6t5Q9LKR0UfPMkfD0lYy2E5M77IJGwLAY2qcIeqTBD47I1pfGPtb-FAzY5FP-kPpYgG5vFug9IId8cx4O8DGhyh-4oH-U8jXZalvWC5q5c0q_Nkizbr2n4qo43s4tWQg"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Japan
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        Modernist Romance
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Norwegian Wood
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Haruki Murakami
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          import_contacts
                        </span>
                        <span>296 pages</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Norwegian Wood");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Lush magical realist book cover for One Hundred Years of Solitude by Gabriel Garcia Marquez with yellow butterflies, dense tropical flora of Macondo, and intricate Colombian gilded details."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAHCpk_hz2IcTlsr9ZCfW0NE4gPjU-FOg656iqd-a5pscjvJEtIMI0-cEjRPomJMasTh4MhhAJKEbFA3YbUDMTztdbuTOTj7gXv-buQWvPe2gSyPh6AHDuXBAMS_0OMT8Uw23-eyMiwBb4hTEHQoQkjDRqKvRbO5YhvkNiuQ85iMev8aCdOxlD_c4v-NuepzJ-f5KvS2xN9KDaHVQvH_AdQ3L_N_OX7xxwRzzsvA"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Colombia
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        Magical Realism
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        One Hundred Years of Solitude
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Gabriel García Márquez
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          import_contacts
                        </span>
                        <span>417 pages</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert(
                          "Viewing archival monograph: One Hundred Years of Solitude",
                        );
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Constructivist dystopian book cover of Nineteen Eighty-Four 1984 by George Orwell featuring stylized geometric surveillance eye, typography in harsh red and slate grey with bold totalitarian graphic design motifs."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAihysW8d19sxIMECvaURq2h-dIvErKgsxSOy6Pped-zXQNUdXwwbRZBmtgAkne3jImWz5ZwJiOHaFEXBG0M2d9S-2NwiL24lkTMtacYIvHvU0jXZCgFQrMajb17JsnaMjAX797G23X659bzt7H7hlK0xe9Jd4Jt4clVtbJl7UGqWdNHbfr2VT7KsfXeDFZtfPTYBzzFC5a9yl0Ie3AjG5OeZul-gRqgTCsU8553g"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        UK
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        Dystopian Fiction
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        1984
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        George Orwell
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          import_contacts
                        </span>
                        <span>328 pages</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: 1984");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Haunting desert ghost town cover of Pedro Paramo by Juan Rulfo with windblown adobe dust, ghostly silhouettes, and desolate Mexican plateau landscape under a muted ochre sky."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEl2VQ6CCJielDig4yZIZ1GiEQVXq1xw9W3t0TDvZOtsVtdeInsgUTi0j4jTxB9W8efq46flmbot_YhvnzuaSAvibERST5X8L9fEgHJ9Od1y9JZYeffymPzcBuojjAlwZu_2xHuFVaIHgXMK4eZ8T2BZnJ8-d37-B9S-YVEFv74cIMfBcSU8PTCWQWbBc8D8e3Lug_wMQ8C-IGlz8reaYJdEXIGDj3SLIlw9w_ew"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Mexico
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                        Ghost Realism
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Pedro Páramo
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Juan Rulfo
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          import_contacts
                        </span>
                        <span>128 pages</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Pedro Páramo");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
              </div>
            </section>
            <section
              className="flex flex-col space-y-8"
              id="collection-beginner-pathways"
            >
              <div className="bg-surface-card rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute -right-20 top-0 w-72 h-72 bg-surface-container-high/60 rounded-full blur-2xl -z-0" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-status-success/20 text-on-surface font-label-sm text-label-sm tracking-wide inline-flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[15px] text-status-success">
                          spa
                        </span>
                        Accessible Prose • Gentle On-Ramps
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Col. 04 • Habit Formation
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-primary">
                      Beginner-Friendly Pathways
                      <span className="font-body-md text-body-md text-on-surface-variant font-normal tracking-normal italic block sm:inline sm:ml-2">
                        (Dành Cho Người Mới Bắt Đầu)
                      </span>
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Approachable prose and clear syntactic structures ideal
                      for building an enduring reading habit or starting a new
                      language journey without scholarly fatigue.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl max-w-sm shrink-0 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-status-success mt-0.5 text-[22px]">
                        verified
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                          Standardized CEFR Tags
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Includes calibrated lexical grading from A2 to B2 for
                          bilingual learners.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Vibrant classical folk illustration book cover of De Men Phieu Luu Ky by To Hoai depicting a courageous adventure cricket standing proudly amidst lush emerald blades of grass and dew drops."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHTJNc1CIs-16RQuDqUDR8w4UkoQenALoQBD7cUYcE1gxmojHSP3TYAsa-dNM69umEw5PijDlhpBQUIyiTgTPzTZrywLltmJeswOHELmif8L5N2o5V843Y1soCWfXSGhlud2RA8EahG9SZ45vz5nf0EjNeaOQjThbX-YWLZJbYDJw8umvGTxZlesGlbFz_QyM-OUk73C7w-RwKy2siIZ5lv0YEJFpRipa7ld66NQ"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-bold">
                        CEFR A2–B1
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Vietnamese
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Dế Mèn Phiêu Lưu Ký
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Tô Hoài
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          hiking
                        </span>
                        <span>196 pages • Animal Fable</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert(
                          "Viewing archival monograph: Dế Mèn Phiêu Lưu Ký",
                        );
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Warm and evocative book cover for To Kill a Mockingbird by Harper Lee with an old Southern oak tree silhouette, quiet small-town porch setting, and soft amber twilight atmosphere."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGuVrBmwv_akxud8snAhSdevF6sq1VUJ3zgQ6scAb0o_paXqD_DkTy93MCU25Zx5hRK8Mf2qRWAlpDlednJ-q7Oo4OZzrSDkgnDfvol3X6usyJh6vu9FIhae6DBdJ_61KSjyG3UYP4voTaqL-jCeMiOdf2iZhbl50_HZZVpT-zKh-xUMsCpqIStBMh53gkYisjJVOIFC4TbcocPdsPU-OZ3Ka8mx_HnclC2Z7o-Q"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-bold">
                        CEFR B1
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        English
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        To Kill a Mockingbird
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Harper Lee
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          family_restroom
                        </span>
                        <span>281 pages • Coming-of-Age</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert(
                          "Viewing archival monograph: To Kill a Mockingbird",
                        );
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Satirical and witty book cover of So Do Dumb Luck by Vu Trong Phung featuring 1930s Hanoi bourgeois fashion caricature, tennis costume, and vibrant retro French-colonial newspaper print."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYyG_lz5WtEy8_NVj5kneBWtlXt31MsfJosW3f0wMmosh8ikR6Fw0MMuD6NZAgDUoemKu9rGfcLczcQButZCK7GfX1r6W3VYZ4CNxD3lbMkd72mYcOkYMYSMUF6rOe2U4RvDgBQLSlu6vGg-wn8QsjO8lo55li9wBcCOdaAadN20jV_EC4lfmnYKAfBGHrujccJSG9FF9BDeEwKxvyxbnWAMwI1-MSt5KT1qFQtA"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-bold">
                        CEFR B1–B2
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Vietnamese
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        Số Đỏ (Dumb Luck)
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Vũ Trọng Phụng
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          theater_comedy
                        </span>
                        <span>256 pages • Satire</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: Số Đỏ");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
                <article className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Mystical and evocative book cover of The Alchemist by Paulo Coelho with golden desert dunes under a celestial night sky with glowing pyramids on the horizon in rich amber and midnight blue colors."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh_q0oZq1bfmQ4Ke80dp2cKa4neeJgWE63APxiC8riljXNEFxFR5apbAoWPAuDYml1-rSMg6ZWMr_jKl1xD9W6chUhvQRE_92Rzl1qV-bbsNjpZRDUW3uYogC-3iaTWZRPNBvpjYFjmT9atXaUN0_mSBL8J-6V4pzXKUHcDnMMteaArsXkHleS0XEHmfUh4UrSqUdsONOdwgHI9PFeQpP7Pp1wbIuRnB7ojMLdqQ"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-bold">
                        CEFR A2–B1
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">
                        Portuguese
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        The Alchemist
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        Paulo Coelho
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                          explore
                        </span>
                        <span>208 pages • Philosophical Quest</span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2.5 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={(event) => {
                        alert("Viewing archival monograph: The Alchemist");
                      }}
                    >
                      <span>Inspect Book</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
              </div>
            </section>
            <section className="w-full">
              <div className="bg-primary text-on-primary rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-on-tertiary-container/20 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/20 text-on-primary-fixed-variant w-fit font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-accent-gold-light">
                        bookmark_add
                      </span>
                      <span>Personal Archival Tool</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-primary leading-tight">
                      Design Your Own
                      <span className="italic font-normal text-tertiary-fixed">
                        Thematic Shelf
                      </span>
                    </h2>
                    <p className="font-body-md text-body-md text-primary-fixed-dim max-w-2xl leading-relaxed">
                      Assemble titles across languages, designate custom reading
                      milestones, write critical chapter syntheses, and preserve
                      your curated reading pathways directly in your browser's
                      persistent library.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 pt-3 font-label-sm text-label-sm text-primary-fixed-dim">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-status-success">
                          check_circle
                        </span>
                        Zero Account Required
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-status-success">
                          check_circle
                        </span>
                        Local Storage Encrypted
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-status-success">
                          check_circle
                        </span>
                        Exportable BibTeX &amp; JSON
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end justify-center">
                    <button
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-on-tertiary-container hover:bg-tertiary-fixed-dim hover:text-primary text-on-primary font-title-md text-title-md font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-3 cursor-pointer group"
                      id="open-collection-builder"
                      onClick={(event) => {
                        document
                          .getElementById("builder-dialog")
                          .classList.remove("hidden");
                      }}
                    >
                      <span>Build Custom Shelf</span>
                      <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">
                        add_box
                      </span>
                    </button>
                    <button
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-md text-label-md transition-colors text-center"
                      onClick={(event) => {
                        window.location.hash = "#collection-timeless-classics";
                      }}
                    >
                      Browse Scholarly Templates
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <div
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm hidden flex items-center justify-center p-4"
            id="builder-dialog"
          >
            <div className="bg-surface-card rounded-2xl max-w-lg w-full p-8 shadow-2xl space-y-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[22px]">
                      auto_stories
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">
                    New Curated Shelf
                  </h3>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                  onClick={(event) => {
                    document
                      .getElementById("builder-dialog")
                      .classList.add("hidden");
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
                    Collection Title
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low text-primary text-body-md focus:bg-surface-card focus:ring-2 focus:ring-secondary outline-none transition-all"
                    id="custom-collection-title"
                    placeholder="e.g., Post-War European Existentialism"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
                    Thematic Focus
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low text-primary text-body-md focus:bg-surface-card focus:ring-2 focus:ring-secondary outline-none transition-all resize-none"
                    id="custom-collection-desc"
                    placeholder="Describe the historical or literary thesis linking these volumes..."
                    rows={3}
                    defaultValue={""}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
                      Estimated Read Time
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low text-primary text-body-md focus:bg-surface-card focus:ring-2 focus:ring-secondary outline-none transition-all"
                      id="custom-collection-time"
                      placeholder="e.g., 2 Weeks"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
                      Visibility
                    </label>
                    <div className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface-variant text-body-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-status-success">
                        lock_open
                      </span>
                      <span>Local Shelf</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  className="px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                  onClick={(event) => {
                    document
                      .getElementById("builder-dialog")
                      .classList.add("hidden");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md flex items-center gap-2"
                  id="confirm-create-collection"
                  onClick={(event) => {
                    window.handleCollectionCreate();
                  }}
                >
                  <span>Save Shelf</span>
                  <span className="material-symbols-outlined text-[16px]">
                    bookmark
                  </span>
                </button>
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDzO_GBPm8isEUkTqlc0rXu0_CDktn0QcjBDQc8lwZ2oQyRpG9MkPFYhbvUKXmBhdK2GJgYVYAMhG2Vx6oj7aqnEb4cuLSFnSJK5356BnlaaQZo6m4C2iQsyTsxqQXmfC8dHRL30N8OSPQzTEYbxyaJZy0d3kun6iP7ROH7IBhuU9vkHTy06UR-JLKph1gjAHaH89kBMePOEsWbliDR50dnSmBfid-LCRtFZaQ"
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
                    data-path="language-&-genre-explorer-—-bookbridge"
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
                    data-path="featured-reading-collections-—-bookbridge"
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
                    data-path="featured-reading-collections-—-bookbridge"
                    href="#"
                  >
                    Literary Modernism
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="featured-reading-collections-—-bookbridge"
                    href="#"
                  >
                    Curated Anthologies
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="featured-reading-collections-—-bookbridge"
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
