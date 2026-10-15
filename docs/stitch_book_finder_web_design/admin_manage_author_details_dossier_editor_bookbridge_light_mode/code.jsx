import { useEffect, useRef } from "react";
import { initializePrototypePage } from "../prototypeRuntime.js";

const pageStylesheets = [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&amp;display=swap",
  },
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
];
const pageStyles =
  "\n      @layer base {\n        html,\n        body {\n          margin: 0;\n          padding: 0;\n        }\n        body {\n          overscroll-behavior: none;\n        }\n        main > :first-child {\n          margin-top: 0 !important;\n        }\n        main > :last-child {\n          margin-bottom: 0 !important;\n        }\n      }\n      ::-webkit-scrollbar {\n        display: none;\n      }\n    ";
const tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#3c475a",
        "status-success": "#10B981",
        "inverse-primary": "#bcc7de",
        "on-primary-fixed": "#111c2d",
        "surface-tint": "#545f73",
        "surface-canvas": "#F8FAFC",
        "on-secondary": "#ffffff",
        "primary-fixed-dim": "#bcc7de",
        "on-error": "#ffffff",
        "surface-card": "#FFFFFF",
        "on-background": "#0b1c30",
        "text-primary": "#0F172A",
        "primary-container": "#1e293b",
        "on-secondary-fixed": "#001a42",
        error: "#ba1a1a",
        "on-tertiary-fixed-variant": "#6e3900",
        secondary: "#0058be",
        "on-secondary-container": "#fefcff",
        tertiary: "#240f00",
        "status-info": "#0EA5E9",
        "surface-container-highest": "#d3e4fe",
        "tertiary-fixed": "#ffdcc3",
        background: "#f8f9ff",
        "secondary-container": "#2170e4",
        "on-surface-variant": "#45474c",
        "surface-container-low": "#eff4ff",
        "accent-gold-light": "#F59E0B",
        "surface-bright": "#f8f9ff",
        "outline-variant": "#c5c6cd",
        "inverse-surface": "#213145",
        outline: "#75777d",
        "surface-variant": "#d3e4fe",
        "secondary-fixed-dim": "#adc6ff",
        "tertiary-fixed-dim": "#ffb77d",
        "surface-dim": "#cbdbf5",
        "on-surface": "#0b1c30",
        "on-tertiary-container": "#d97705",
        "secondary-fixed": "#d8e2ff",
        "on-error-container": "#93000a",
        "error-container": "#ffdad6",
        "tertiary-container": "#422000",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-fixed": "#2f1500",
        "accent-indigo": "#6366F1",
        "surface-container": "#e5eeff",
        "primary-fixed": "#d8e3fb",
        "on-primary-container": "#8590a6",
        "on-primary": "#ffffff",
        surface: "#f8f9ff",
        "on-tertiary": "#ffffff",
        "on-secondary-fixed-variant": "#004395",
        "surface-container-high": "#dce9ff",
        "status-danger": "#EF4444",
        "border-subtle": "#E2E8F0",
        primary: "#091426",
        "inverse-on-surface": "#eaf1ff",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "gutter-mobile": "1rem",
        margin: "3rem",
        "space-sm": "0.5rem",
        "space-xs": "0.25rem",
        "space-lg": "1.5rem",
        "space-md": "1rem",
        "margin-mobile": "1.25rem",
        gutter: "1.5rem",
        "space-xl": "2.5rem",
      },
      fontFamily: {
        "display-hero": ["Playfair Display"],
        "body-lg": ["Plus Jakarta Sans"],
        "headline-lg": ["Playfair Display"],
        "display-hero-mobile": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "title-md": ["Plus Jakarta Sans"],
        "label-md": ["Plus Jakarta Sans"],
        "headline-lg-mobile": ["Playfair Display"],
        "body-md": ["Plus Jakarta Sans"],
        "headline-sm": ["Playfair Display"],
        "body-sm": ["Plus Jakarta Sans"],
        "label-sm": ["Plus Jakarta Sans"],
      },
      fontSize: {
        "display-hero": [
          "3.5rem",
          {
            lineHeight: "4.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.875rem", fontWeight: "400" }],
        "headline-lg": [
          "2.5rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.015em",
            fontWeight: "700",
          },
        ],
        "display-hero-mobile": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "headline-md": [
          "1.75rem",
          { lineHeight: "2.25rem", fontWeight: "600" },
        ],
        "title-md": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "600" }],
        "label-md": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.01em",
            fontWeight: "600",
          },
        ],
        "headline-lg-mobile": [
          "1.75rem",
          { lineHeight: "2.25rem", fontWeight: "700" },
        ],
        "body-md": ["1rem", { lineHeight: "1.625rem", fontWeight: "400" }],
        "headline-sm": [
          "1.25rem",
          { lineHeight: "1.75rem", fontWeight: "600" },
        ],
        "body-sm": ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }],
        "label-sm": [
          "0.75rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0.025em",
            fontWeight: "600",
          },
        ],
      },
    },
  },
};
const pageScripts = [
  '\n          document.addEventListener("keydown", function (e) {\n            if ((e.ctrlKey || e.metaKey) && e.key === "s") {\n              e.preventDefault();\n              const notification = document.createElement("div");\n              notification.className =\n                "fixed bottom-20 right-8 bg-primary text-on-primary px-space-lg py-space-sm rounded-full shadow-lg z-50 flex items-center gap-2 font-label-sm text-label-sm";\n              notification.innerHTML =\n                \'<span class="material-symbols-outlined text-[16px] text-status-success">check_circle</span> Dossier changes synced to LocalStorage vault.\';\n              document.body.appendChild(notification);\n              setTimeout(() => notification.remove(), 2600);\n            }\n          });\n        ',
];

export default function AdminManageAuthorDetailsDossierEditorBookbridgeLightMode() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "admin_manage_author_details_dossier_editor_bookbridge_light_mode",
      stylesheets: pageStylesheets,
      styles: pageStyles,
      tailwindConfig,
      scripts: pageScripts,
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-surface-canvas font-body-md text-on-surface antialiased"
    >
      <header className="fixed top-0 w-full z-50 bg-surface-card/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1440px] mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <a
              className="flex items-center gap-space-sm group"
              data-path="catalog-overview"
              href="#"
            >
              <span className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-display-hero text-headline-sm">
                B
              </span>
              <div className="flex flex-col">
                <span className="font-display-hero text-headline-sm text-text-primary tracking-tight leading-none">
                  BookBridge
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-0.5">
                  Archives
                </span>
              </div>
            </a>
            <div className="h-5 w-[1px] bg-border-subtle hidden xl:block" />
            <span className="hidden xl:inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm tracking-wider font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold-light" />
              CURATION DESK
            </span>
          </div>
          <nav
            className="hidden lg:flex items-center gap-space-xs"
            data-active-classes="bg-primary text-on-primary rounded-full px-space-md py-1.5 shadow-sm font-semibold"
          >
            <a
              className="font-label-md text-label-md px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
              data-path="catalog-overview"
              href="#"
            >
              Catalog Overview
            </a>
            <a
              className="font-label-md text-label-md px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
              data-path="manage-books"
              href="#"
            >
              Manage Books
            </a>
            <a
              aria-current="page"
              className="transition-all bg-primary text-on-primary rounded-full px-space-md py-1.5 shadow-sm font-semibold"
              data-path="manage-authors"
              href="#"
            >
              Manage Authors
            </a>
            <a
              className="font-label-md text-label-md px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
              data-path="archival-requests"
              href="#"
            >
              Archival Requests
            </a>
            <a
              className="font-label-md text-label-md px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
              data-path="audit-log"
              href="#"
            >
              Audit Log
            </a>
          </nav>
          <div className="flex items-center gap-space-md">
            <div className="hidden sm:flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-card shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <span className="w-2 h-2 rounded-full bg-status-success" />
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                LocalStorage Active
              </span>
            </div>
            <button
              className="relative p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-danger rounded-full" />
            </button>
            <a
              className="hidden md:flex items-center gap-1 text-secondary font-label-md text-label-md hover:underline font-semibold"
              data-path="public-library-preview"
              href="#"
            >
              <span className="material-symbols-outlined text-[16px]">
                open_in_new
              </span>
              View Public Library
            </a>
            <div className="h-6 w-[1px] bg-border-subtle" />
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="font-title-md text-title-md text-text-primary leading-none">
                  Dr. M. D'Artois
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Senior Curator
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        <div className="flex flex-col w-full">
          <div className="w-full bg-surface-card shadow-sm">
            <div className="max-w-[1440px] mx-auto px-gutter py-space-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  <span>Admin Console</span>
                  <span className="material-symbols-outlined text-[14px]">
                    chevron_right
                  </span>
                  <a className="hover:text-primary transition-colors" href="#">
                    Manage Authors
                  </a>
                  <span className="material-symbols-outlined text-[14px]">
                    chevron_right
                  </span>
                  <span className="text-text-primary font-semibold">
                    Edit Dossier #AUTH-007
                  </span>
                  <span className="text-on-surface-variant/60">
                    (Antoine de Saint-Exupéry)
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm pt-0.5">
                  <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-status-success/10 text-status-success font-label-sm text-label-sm font-semibold tracking-wide">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      verified
                    </span>
                    DOSSIER VERIFIED • BNF PROVENANCE CERTIFIED
                  </span>
                  <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[15px]">
                      history
                    </span>
                    Last updated: Yesterday, 17:42 CET by Dr. M. D'Artois
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm self-stretch sm:self-auto justify-end">
                <button
                  className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-surface-container-low text-text-primary hover:bg-surface-container font-label-md text-label-md transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    visibility
                  </span>
                  <span>View Public Page</span>
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-surface-container-low text-text-primary hover:bg-surface-container font-label-md text-label-md transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    download
                  </span>
                  <span>Export JSON</span>
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-space-lg py-2 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md transition-all shadow-sm font-semibold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    cloud_sync
                  </span>
                  <span>Save &amp; Sync Author</span>
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto px-gutter py-space-xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              <div className="lg:col-span-5 flex flex-col gap-space-lg">
                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        photo_library
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-text-primary">
                        Archival Visual Assets
                      </h2>
                    </div>
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm tracking-wider font-semibold uppercase">
                      ASSET SLOT 1 &amp; 2
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-sm bg-surface-canvas p-space-md rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-semibold text-text-primary uppercase tracking-wide">
                        Primary Iconography (Master Face)
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-gold-light/10 text-on-tertiary-container font-label-sm text-label-sm font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold-light" />
                        Master Face
                      </span>
                    </div>
                    <div className="flex gap-space-md items-center">
                      <div className="w-24 h-32 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-surface-card relative group">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt="Authentic sepia toned vintage gelatin silver portrait of French aviator Antoine de Saint-Exupery from 1935 in leather flight jacket and pilot helmet with clear goggles pushed to forehead. Soft warm archival library lighting, fine photographic grain, high curatorial detail, dignified contemplative scholarly gaze."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOUjPyi5onR9Wqs2BkiNwfTMPIKDhSiq9nYGIvJ06CWQIoQf4hxxbaoP25twiyLuCLjLJgs6KTB1_r8Q0N5SJpg0bi6bPa3htGtNez0pZr21hFGdDxWa1dC0jb6dufT1R_oipgBu_X4icVzs-g78EI6-7KdOgWOaKmuGSPrLM83drQJdzQyvf06RUYmW70E-mRdgJ7Yi1H7zcDPFJHmhRDpEGHeoS4OU8lyMOPfyqTuHoYQ3ZUzcQ"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <p className="font-title-md text-title-md text-text-primary leading-tight truncate">
                          Toulouse-Montaudran Aviator Portrait
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Archival Gelatin Silver Print • Circa 1935 (Late Third
                          Republic Air Corps)
                        </p>
                        <div className="flex items-center gap-space-xs pt-1">
                          <button
                            className="px-space-sm py-1 rounded bg-surface-card text-text-primary hover:bg-surface-container font-label-sm text-label-sm shadow-sm transition-colors"
                            type="button"
                          >
                            Replace
                          </button>
                          <button
                            className="px-space-sm py-1 rounded bg-surface-card text-text-primary hover:bg-surface-container font-label-sm text-label-sm shadow-sm transition-colors"
                            type="button"
                          >
                            Crop &amp; Frame
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 pt-space-xs">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">
                        IIIF Manifest Preservation URI
                      </label>
                      <div className="relative flex items-center">
                        <input
                          className="w-full h-9 rounded-lg bg-surface-card px-space-sm pr-9 text-text-primary font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                          type="text"
                          defaultValue="https://gallica.bnf.fr/iiif/ark:/12148/btv1b53112285z/manifest.json"
                        />
                        <button
                          className="absolute right-2 text-on-surface-variant hover:text-secondary"
                          title="Sync IIIF Tile"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            sync
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">
                        Preservation Alt Metadata (Screen Reader &amp; Index)
                      </label>
                      <input
                        className="w-full h-9 rounded-lg bg-surface-card px-space-sm text-text-primary font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                        type="text"
                        defaultValue="High-resolution archival scan: Pilot Antoine de Saint-Exupéry in flight gear, 1935, archival plate FRBNF1192."
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-sm bg-surface-canvas p-space-md rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-semibold text-text-primary uppercase tracking-wide">
                        Historical Field Photo (Plate #II-1928)
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Cape Juby Sector
                      </span>
                    </div>
                    <div className="w-full h-44 rounded-lg overflow-hidden relative shadow-sm group">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Sun-drenched historical black and white archival photograph of the remote Aeropostale stopover station in Tarfaya, Cape Juby, Spanish Sahara in 1928. Low adobe fort surrounded by vast undulating desert dunes, a lone Latecoere 26 biplane parked on hard-packed sand, stark atmospheric shadows, dramatic horizon, literary archival texture."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Wl8IFgjvPKeAqY0UTBi19lPUv5DNK5GZm66lA3jIB_L8W6ItaYC6vfnrnLeQK8HCDzzd1hRce_zRhuO-JPjdcUbdstZE8FKTomPml8br8VMV2agGrnVSZKq76zKvu_WccqISoEEbzEomcAJrx6yuu1Y8FH9MmjDAsNTM8IygNh6O8SX_bJMB8ndTuTofcqhZmgDIGvknygfiCrQAmp9a_wnKdF6DmjWJB3ba5LaVgINpIn8UAYA"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3 text-on-primary">
                        <p className="font-label-sm text-label-sm font-semibold">
                          Tarfaya (Cape Juby), Spanish Sahara • 1928
                        </p>
                        <p className="font-body-sm text-body-sm text-inverse-on-surface/90 line-clamp-1">
                          Field station commander post where Courrier Sud was
                          drafted.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant italic">
                        Provenance: Fonds Aéropostale Toulouse (Arch. Dép.
                        Haute-Garonne)
                      </span>
                      <button
                        className="text-secondary hover:underline font-label-sm text-label-sm font-semibold"
                        type="button"
                      >
                        Change Plate
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        badge
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-text-primary">
                        Curatorial Vitals
                      </h2>
                    </div>
                    <span className="font-label-md text-label-md font-bold px-space-sm py-0.5 rounded-full bg-surface-container text-primary">
                      #AUTH-007
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-xs p-1 rounded-lg bg-surface-canvas">
                    <div className="p-space-sm rounded-md bg-surface-card shadow-sm flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                        BIRTH REGISTER
                      </span>
                      <span className="font-title-md text-title-md text-text-primary mt-0.5">
                        29 June 1900
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Lyon (Rhône, France)
                      </span>
                    </div>
                    <div className="p-space-sm rounded-md bg-surface-card shadow-sm flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                        DEMISE RECORD
                      </span>
                      <span className="font-title-md text-title-md text-text-primary mt-0.5">
                        31 July 1944
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Bay of Carqueiranne (Lost at Sea)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Cultural &amp; Curatorial Tradition
                      </span>
                      <div className="p-space-sm rounded-lg bg-surface-canvas font-body-sm text-body-sm text-text-primary">
                        French Literature / Francophonie / European Classical
                        Humanism
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Military &amp; Civil Designation
                      </span>
                      <div className="p-space-sm rounded-lg bg-surface-canvas font-body-sm text-body-sm text-text-primary">
                        Commandant (GR II/33) Free French Air Force (Forces
                        Aériennes Françaises Libres)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Archival Thematic Tags
                      </span>
                      <button
                        className="text-secondary font-label-sm text-label-sm font-semibold hover:underline inline-flex items-center gap-0.5"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          add
                        </span>
                        Add Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-space-sm py-1 rounded-full bg-surface-canvas text-text-primary font-label-sm text-label-sm shadow-sm flex items-center gap-1">
                        Pioneering Aviator
                        <button
                          className="text-on-surface-variant hover:text-error"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            close
                          </span>
                        </button>
                      </span>
                      <span className="px-space-sm py-1 rounded-full bg-surface-canvas text-text-primary font-label-sm text-label-sm shadow-sm flex items-center gap-1">
                        Philosophical Novelist
                        <button
                          className="text-on-surface-variant hover:text-error"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            close
                          </span>
                        </button>
                      </span>
                      <span className="px-space-sm py-1 rounded-full bg-surface-canvas text-text-primary font-label-sm text-label-sm shadow-sm flex items-center gap-1">
                        French Resistance
                        <button
                          className="text-on-surface-variant hover:text-error"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            close
                          </span>
                        </button>
                      </span>
                      <span className="px-space-sm py-1 rounded-full bg-surface-canvas text-text-primary font-label-sm text-label-sm shadow-sm flex items-center gap-1">
                        Aéropostale Pioneer
                        <button
                          className="text-on-surface-variant hover:text-error"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            close
                          </span>
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Archival Rights Clearance Status
                    </span>
                    <div className="grid grid-cols-3 gap-space-xs">
                      <div className="p-space-sm rounded-lg bg-surface-container-low text-center flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-status-success text-[18px]">
                          verified
                        </span>
                        <span className="font-label-sm text-label-sm font-semibold text-text-primary mt-1">
                          Public Domain
                        </span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">
                          Life + 70y Global
                        </span>
                      </div>
                      <div className="p-space-sm rounded-lg bg-surface-container-low text-center flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-accent-gold-light text-[18px]">
                          gavel
                        </span>
                        <span className="font-label-sm text-label-sm font-semibold text-text-primary mt-1">
                          Estate Licensed
                        </span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">
                          Succession Saint-Ex.
                        </span>
                      </div>
                      <div className="p-space-sm rounded-lg bg-surface-container-low text-center flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          flag
                        </span>
                        <span className="font-label-sm text-label-sm font-semibold text-text-primary mt-1">
                          Heritage Status
                        </span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">
                          Mort pour la France
                        </span>
                      </div>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant/80 italic mt-1 leading-normal">
                      Special legal notation: In France, the duration of
                      copyright is extended by 30 years under the "Mort pour la
                      France" wartime status, keeping works in French copyright
                      until 2032.
                    </p>
                  </div>
                </div>
                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        fingerprint
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-text-primary">
                        Archival Checksums
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 text-status-success font-label-sm text-label-sm font-bold">
                      <span className="w-2 h-2 rounded-full bg-status-success" />
                      99.4% (Optimal)
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-xs font-body-sm text-body-sm">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">
                        SHA-256 Authority Digest
                      </span>
                      <span className="font-mono text-xs bg-surface-canvas px-2 py-0.5 rounded text-text-primary">
                        4f8a...92b1d03c
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">
                        BnF Authority Record
                      </span>
                      <span className="font-mono text-xs text-secondary font-semibold">
                        FRBNF11923342
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">
                        Indexed Repository Editions
                      </span>
                      <span className="font-semibold text-text-primary">
                        14 Master Volumes
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">
                        Digital Signature Mode
                      </span>
                      <span className="inline-flex items-center gap-1 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-status-success">
                          lock
                        </span>
                        Ed25519-Signed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        account_circle
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-text-primary">
                        Core Archival Identity
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      ISNI: 0000 0001 2133 9705
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Standardized library catalog naming conventions, legal civil
                    registry records, and period classification conformant to
                    IFLA LRM standards.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Full Legal Name (Civil Registry / Diplomatic Record)
                      </label>
                      <input
                        className="w-full h-11 rounded-lg bg-surface-canvas px-space-md text-text-primary font-title-md text-title-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 font-semibold"
                        type="text"
                        defaultValue="Antoine Marie Jean-Baptiste Roger de Saint-Exupéry"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Canonical Public / Pen Name
                      </label>
                      <input
                        className="w-full h-10 rounded-lg bg-surface-canvas px-space-md text-text-primary font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                        type="text"
                        defaultValue="Antoine de Saint-Exupéry"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Archival Abbreviation / Alt Variant
                      </label>
                      <input
                        className="w-full h-10 rounded-lg bg-surface-canvas px-space-md text-text-primary font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                        type="text"
                        defaultValue="A. de Saint-Exupéry"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Primary Literary Movement / Epoch Classification
                      </label>
                      <div className="relative">
                        <select className="w-full h-10 rounded-lg bg-surface-canvas px-space-md pr-10 text-text-primary font-body-md text-body-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/40">
                          <option selected>
                            20th-Century Existential Humanism &amp; Aviation
                            Literature
                          </option>
                          <option>Interwar French Moralist Literature</option>
                          <option>Philosophical Allegory &amp; Fable</option>
                          <option>
                            Early Modernist Memoir &amp; Chronicle
                          </option>
                        </select>
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant absolute right-3 top-2.5 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        history_edu
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-text-primary">
                        Biography &amp; Philosophical Pillars
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm px-space-sm py-0.5 rounded bg-surface-canvas text-on-surface-variant">
                      Preservation Grade
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                        Concise Biographical Abstract (Reader Edition Summary)
                      </label>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        142 / 250 words
                      </span>
                    </div>
                    <textarea
                      className="w-full rounded-lg bg-surface-canvas p-space-md text-text-primary font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 leading-relaxed resize-none"
                      rows={4}
                      defaultValue={
                        "Antoine de Saint-Exupéry was a French aviator, moralist, and poet-philosopher whose experiences flying treacherous pioneer airmail routes across the Sahara and the Andes formed the marrow of classic works including Night Flight, Wind, Sand and Stars, and his masterpiece fable, The Little Prince. Combining aerial courage with lyrical existentialism, his narratives meditate upon duty, solitude, and the transcendent bonds uniting human beings across empty spaces."
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 pt-space-xs">
                    <div className="flex items-center justify-between">
                      <label className="font-label-sm text-label-sm text-text-primary font-semibold">
                        Critical Archival Essay &amp; Historical Trajectory
                      </label>
                      <div className="flex items-center gap-1 bg-surface-canvas p-1 rounded-lg">
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-card text-on-surface-variant hover:text-text-primary transition-colors font-bold"
                          title="Bold"
                          type="button"
                        >
                          B
                        </button>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-card text-on-surface-variant hover:text-text-primary transition-colors italic font-serif"
                          title="Italic"
                          type="button"
                        >
                          I
                        </button>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-card text-on-surface-variant hover:text-text-primary transition-colors"
                          title="Quote"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            format_quote
                          </span>
                        </button>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-card text-on-surface-variant hover:text-text-primary transition-colors font-semibold"
                          title="Heading"
                          type="button"
                        >
                          H
                        </button>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-card text-on-surface-variant hover:text-text-primary transition-colors"
                          title="List"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            format_list_bulleted
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="w-full rounded-lg bg-surface-canvas p-space-md shadow-sm flex flex-col gap-space-sm text-text-primary font-body-md text-body-md leading-relaxed">
                      <p>
                        <strong className="font-semibold text-text-primary">
                          Early Aviation &amp; The Aéropostale Line (1926–1931):
                        </strong>
                        Appointed station manager at Cape Juby, Saint-Exupéry
                        negotiated ransom releases of downed pilots from hostile
                        desert tribes while writing his debut novel,
                        <em>Courrier Sud</em>. His experiences over the
                        Patagonian air routes under Didier Daurat inspired
                        <em>Vol de Nuit</em>, capturing the iron discipline
                        demanded by early night navigation.
                      </p>
                      <p>
                        <strong className="font-semibold text-text-primary">
                          Sahara Desert Crash &amp; Mirage of Survival (1935):
                        </strong>
                        Attempting to break the Paris-to-Saigon flight speed
                        record, his Caudron Simoun plunged into the Libyan
                        Desert. Dehydrated and hallucinating for four days
                        before rescue by a wandering Bedouin caravan, the event
                        forged the metaphysical architecture of{" "}
                        <em>Terre des Hommes</em> and later{" "}
                        <em>Le Petit Prince</em>.
                      </p>
                      <p>
                        <strong className="font-semibold text-text-primary">
                          Wartime Reconnaissance &amp; Vanishing (1944):
                        </strong>
                        Despite exceeding age and health limits, he secured
                        assignment to Groupe de Reconnaissance II/33. On 31 July
                        1944, piloting a Lockheed F-5B Lightning over occupied
                        Provence, he vanished without trace; the wreckage was
                        formally identified near the Île de Riou in 2004.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-sm pt-space-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm font-semibold text-text-primary uppercase tracking-wide">
                          Four Curatorial Philosophical Pillars
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Key hermeneutic vectors informing catalog
                          cross-referencing
                        </span>
                      </div>
                      <button
                        className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold hover:underline"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          add_circle
                        </span>
                        Add Pillar
                      </button>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-canvas shadow-sm group">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-title-md text-title-md text-text-primary font-semibold">
                          Existential Humanism &amp; Transcendent Fraternity
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          True civilization resides not in machines, territory,
                          or financial commerce, but in the reciprocal
                          recognition of shared responsibility and mutual human
                          dignity.
                        </p>
                      </div>
                      <button
                        className="text-on-surface-variant/40 hover:text-error transition-colors p-1"
                        title="Delete Pillar"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-canvas shadow-sm group">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-title-md text-title-md text-text-primary font-semibold">
                          The Desert as Spiritual &amp; Moral Crucible
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          The absolute silence and stark deprivation of the
                          Sahara strip away bourgeois vanity, elevating survival
                          into an ascetic encounter with essential truth.
                        </p>
                      </div>
                      <button
                        className="text-on-surface-variant/40 hover:text-error transition-colors p-1"
                        title="Delete Pillar"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-canvas shadow-sm group">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-title-md text-title-md text-text-primary font-semibold">
                          Childhood Wonder vs. Adult Utilitarianism
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          "What is essential is invisible to the eye": adult
                          obsession with numbers, status, and instrumental
                          rationality blinds humanity to beauty, tenderness, and
                          love.
                        </p>
                      </div>
                      <button
                        className="text-on-surface-variant/40 hover:text-error transition-colors p-1"
                        title="Delete Pillar"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-canvas shadow-sm group">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-title-md text-title-md text-text-primary font-semibold">
                          Duty, Solitude &amp; Fragile Bonds of the Sky
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          The solitary pilot confronting night squalls
                          transcends personal dread through commitment to the
                          mailbag and comrades, turning isolation into sacred
                          communion.
                        </p>
                      </div>
                      <button
                        className="text-on-surface-variant/40 hover:text-error transition-colors p-1"
                        title="Delete Pillar"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
                    <div>
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[22px]">
                          menu_book
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-text-primary">
                          Linked Catalog Bibliography
                        </h2>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Curated master volumes currently synchronized in
                        BookBridge archival records
                      </p>
                    </div>
                    <button
                      className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-surface-canvas hover:bg-surface-container text-text-primary font-label-sm text-label-sm font-semibold transition-colors shadow-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add
                      </span>
                      Link Book
                    </button>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-lg bg-surface-canvas shadow-sm hover:shadow transition-shadow">
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-10 h-14 rounded bg-primary text-on-primary flex items-center justify-center font-display-hero text-headline-sm flex-shrink-0 shadow-sm">
                          P
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-space-xs flex-wrap">
                            <span className="font-title-md text-title-md text-text-primary font-bold">
                              Le Petit Prince (The Little Prince)
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-accent-gold-light/20 text-on-tertiary-container font-label-sm text-label-sm font-bold">
                              ★ MASTER
                            </span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            1943 • Reynal &amp; Hitchcock NYC (First Edition
                            Original) • Catalog ID: #BK-004
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm self-end sm:self-center flex-shrink-0">
                        <span className="px-space-sm py-1 rounded bg-surface-card text-status-success font-label-sm text-label-sm font-semibold shadow-sm">
                          Synchronized
                        </span>
                        <button
                          className="p-1 text-on-surface-variant hover:text-secondary"
                          title="Edit Link"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-lg bg-surface-canvas shadow-sm hover:shadow transition-shadow">
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-10 h-14 rounded bg-primary-container text-on-primary flex items-center justify-center font-display-hero text-headline-sm flex-shrink-0 shadow-sm">
                          V
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-space-xs flex-wrap">
                            <span className="font-title-md text-title-md text-text-primary font-bold">
                              Vol de Nuit (Night Flight)
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-semibold">
                              ARCHIVAL CORE
                            </span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            1931 • Gallimard Prix Fémina Winner (Prefaced by
                            André Gide) • Catalog ID: #BK-012
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm self-end sm:self-center flex-shrink-0">
                        <span className="px-space-sm py-1 rounded bg-surface-card text-status-success font-label-sm text-label-sm font-semibold shadow-sm">
                          Synchronized
                        </span>
                        <button
                          className="p-1 text-on-surface-variant hover:text-secondary"
                          title="Edit Link"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md rounded-lg bg-surface-canvas shadow-sm hover:shadow transition-shadow">
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-10 h-14 rounded bg-secondary text-on-secondary flex items-center justify-center font-display-hero text-headline-sm flex-shrink-0 shadow-sm">
                          T
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-space-xs flex-wrap">
                            <span className="font-title-md text-title-md text-text-primary font-bold">
                              Terre des Hommes (Wind, Sand and Stars)
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-semibold">
                              ARCHIVAL CORE
                            </span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            1939 • Grand Prix du Roman de l'Académie Française •
                            Catalog ID: #BK-018
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm self-end sm:self-center flex-shrink-0">
                        <span className="px-space-sm py-1 rounded bg-surface-card text-status-success font-label-sm text-label-sm font-semibold shadow-sm">
                          Synchronized
                        </span>
                        <button
                          className="p-1 text-on-surface-variant hover:text-secondary"
                          title="Edit Link"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        link
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-text-primary">
                        External Provenance &amp; Authority Citations
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Linked Open Data (LOD)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                    <div className="p-space-sm rounded-lg bg-surface-canvas shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          BnF Ark Identifier
                        </span>
                        <p className="font-mono text-xs font-semibold text-text-primary mt-1 break-all">
                          ark:/12148/cb11923342
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant">
                        <span className="font-label-sm text-label-sm">
                          Bibliothèque nationale de France
                        </span>
                        <span className="material-symbols-outlined text-status-success text-[16px]">
                          check_circle
                        </span>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-canvas shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Open Library ID
                        </span>
                        <p className="font-mono text-xs font-semibold text-text-primary mt-1">
                          OL2623343A
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant">
                        <span className="font-label-sm text-label-sm">
                          Internet Archive
                        </span>
                        <span className="material-symbols-outlined text-status-success text-[16px]">
                          check_circle
                        </span>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-canvas shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Wikidata Entity QID
                        </span>
                        <p className="font-mono text-xs font-semibold text-text-primary mt-1">
                          Q2908
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant">
                        <span className="font-label-sm text-label-sm">
                          Global Knowledge Graph
                        </span>
                        <span className="material-symbols-outlined text-status-success text-[16px]">
                          check_circle
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 z-40 w-full bg-surface-card/95 backdrop-blur-md shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.06)] py-space-md">
            <div className="max-w-[1440px] mx-auto px-gutter flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm font-semibold text-text-primary">
                    Auto-saved 45s ago (LocalStorage Vault sync active)
                  </span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">
                    Session Key: 0x7E39C...A14 • Curatorial Node
                    #FR-PARIS-ARCH-01
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                <button
                  className="px-space-md py-2 rounded-full bg-surface-canvas text-text-primary hover:bg-surface-container font-label-md text-label-md transition-all shadow-sm"
                  type="button"
                >
                  Preview Directory
                </button>
                <button
                  className="px-space-md py-2 rounded-full bg-surface-canvas text-error hover:bg-error-container font-label-md text-label-md transition-all shadow-sm"
                  type="button"
                >
                  Archive Profile
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-space-lg py-2 rounded-full bg-accent-gold-light text-on-secondary hover:brightness-105 font-label-md text-label-md transition-all shadow-md font-bold text-on-primary"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    save
                  </span>
                  <span>Save Changes (Ctrl+S)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full bg-surface-card shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-space-lg">
        <div className="max-w-[1440px] mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <span className="font-display-hero text-headline-sm text-text-primary">
              BookBridge
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Archival Administration Console
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <div className="flex items-center gap-1 text-status-success font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">
                lock
              </span>
              Encrypted Repository Mode
            </div>
          </div>
          <div className="flex items-center gap-space-lg text-on-surface-variant font-label-sm text-label-sm">
            <span>Security Clearance: Grade IV Archival</span>
            <span>
              © 2024 BookBridge Cultural Heritage Foundation. All rights
              reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
