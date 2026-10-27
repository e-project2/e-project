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
        "inverse-surface": "#213145",
        "inverse-on-surface": "#eaf1ff",
        "on-tertiary-fixed": "#2f1500",
        "surface-container-lowest": "#ffffff",
        "accent-gold-light": "#F59E0B",
        "accent-indigo": "#6366F1",
        "inverse-primary": "#bcc7de",
        "primary-fixed-dim": "#bcc7de",
        surface: "#f8f9ff",
        "status-info": "#0EA5E9",
        "surface-container-high": "#dce9ff",
        "primary-fixed": "#d8e3fb",
        "surface-canvas": "#F8FAFC",
        "surface-card": "#FFFFFF",
        "primary-container": "#1e293b",
        secondary: "#0058be",
        "surface-container-low": "#eff4ff",
        "on-secondary-fixed-variant": "#004395",
        "on-primary-fixed-variant": "#3c475a",
        "status-success": "#10B981",
        "surface-tint": "#545f73",
        "outline-variant": "#c5c6cd",
        "surface-container": "#e5eeff",
        "on-surface-variant": "#45474c",
        "on-error": "#ffffff",
        "border-subtle": "#E2E8F0",
        error: "#ba1a1a",
        "on-secondary": "#ffffff",
        "surface-container-highest": "#d3e4fe",
        background: "#f8f9ff",
        "on-tertiary-container": "#d97705",
        "secondary-fixed-dim": "#adc6ff",
        "surface-dim": "#cbdbf5",
        "on-error-container": "#93000a",
        tertiary: "#240f00",
        primary: "#091426",
        "surface-bright": "#f8f9ff",
        "on-primary-fixed": "#111c2d",
        "error-container": "#ffdad6",
        outline: "#75777d",
        "text-primary": "#0F172A",
        "tertiary-fixed-dim": "#ffb77d",
        "tertiary-fixed": "#ffdcc3",
        "secondary-fixed": "#d8e2ff",
        "on-primary": "#ffffff",
        "on-secondary-container": "#fefcff",
        "on-background": "#0b1c30",
        "secondary-container": "#2170e4",
        "on-surface": "#0b1c30",
        "surface-variant": "#d3e4fe",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#422000",
        "on-tertiary-fixed-variant": "#6e3900",
        "on-primary-container": "#8590a6",
        "status-danger": "#EF4444",
        "on-secondary-fixed": "#001a42",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "gutter-mobile": "1rem",
        "margin-mobile": "1.25rem",
        "space-lg": "1.5rem",
        margin: "3rem",
        "space-xl": "2.5rem",
        gutter: "1.5rem",
        "space-xs": "0.25rem",
      },
      fontFamily: {
        "headline-lg-mobile": ["Playfair Display"],
        "display-hero": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "title-md": ["Plus Jakarta Sans"],
        "body-lg": ["Plus Jakarta Sans"],
        "label-md": ["Plus Jakarta Sans"],
        "body-sm": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "display-hero-mobile": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "label-sm": ["Plus Jakarta Sans"],
        "headline-sm": ["Playfair Display"],
      },
      fontSize: {
        "headline-lg-mobile": [
          "1.75rem",
          { lineHeight: "2.25rem", fontWeight: "700" },
        ],
        "display-hero": [
          "3.5rem",
          {
            lineHeight: "4.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-lg": [
          "2.5rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.015em",
            fontWeight: "700",
          },
        ],
        "title-md": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.875rem", fontWeight: "400" }],
        "label-md": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.01em",
            fontWeight: "600",
          },
        ],
        "body-sm": ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.625rem", fontWeight: "400" }],
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
        "label-sm": [
          "0.75rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0.025em",
            fontWeight: "600",
          },
        ],
        "headline-sm": [
          "1.25rem",
          { lineHeight: "1.75rem", fontWeight: "600" },
        ],
      },
    },
  },
};
const pageScripts = [
  '\n        (function () {\n          const pwdInput = document.getElementById("archival-password");\n          const pwdConfirmInput = document.getElementById(\n            "archival-password-confirm",\n          );\n          const toggleBtn = document.getElementById("toggle-pwd-btn");\n\n          if (toggleBtn && pwdInput) {\n            toggleBtn.addEventListener("click", () => {\n              const isPassword = pwdInput.type === "password";\n              pwdInput.type = isPassword ? "text" : "password";\n              if (pwdConfirmInput)\n                pwdConfirmInput.type = isPassword ? "text" : "password";\n              toggleBtn.textContent = isPassword ? "Hide" : "Show";\n            });\n          }\n\n          const emailInput = document.getElementById("archival-email");\n          const emailFeedback = document.getElementById("email-feedback");\n          const emailIcon = document.getElementById("email-status-icon");\n\n          if (emailInput && emailFeedback && emailIcon) {\n            emailInput.addEventListener("input", () => {\n              const val = emailInput.value.trim();\n              const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n\n              if (val.length === 0) {\n                emailFeedback.innerHTML =\n                  \'<span class="material-symbols-outlined text-[15px]">info</span><span>Requires valid domain</span>\';\n                emailFeedback.className =\n                  "text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1 transition-colors";\n                emailIcon.className =\n                  "absolute right-3.5 flex items-center text-on-surface-variant/40";\n              } else if (emailRegex.test(val)) {\n                emailFeedback.innerHTML =\n                  \'<span class="material-symbols-outlined text-[15px] text-status-success">check_circle</span><span class="text-status-success font-medium">Valid scholar domain</span>\';\n                emailIcon.className =\n                  "absolute right-3.5 flex items-center text-status-success";\n              } else {\n                emailFeedback.innerHTML =\n                  \'<span class="material-symbols-outlined text-[15px] text-error">cancel</span><span class="text-error font-medium">Invalid email syntax</span>\';\n                emailIcon.className =\n                  "absolute right-3.5 flex items-center text-error";\n              }\n            });\n          }\n\n          const pwdStrInput = document.getElementById("archival-password");\n          const bar1 = document.getElementById("bar-seg-1");\n          const bar2 = document.getElementById("bar-seg-2");\n          const bar3 = document.getElementById("bar-seg-3");\n          const bar4 = document.getElementById("bar-seg-4");\n          const strengthLabel = document.getElementById("strength-text");\n          const strengthPercent = document.getElementById("strength-percent");\n          const reqLen = document.getElementById("req-len");\n          const reqNum = document.getElementById("req-num");\n          const reqSym = document.getElementById("req-sym");\n\n          function updateReqToken(el, met) {\n            if (met) {\n              el.className =\n                "flex items-center gap-1 text-status-success font-medium";\n              el.querySelector(".material-symbols-outlined").textContent =\n                "check_circle";\n            } else {\n              el.className = "flex items-center gap-1 text-on-surface-variant";\n              el.querySelector(".material-symbols-outlined").textContent =\n                "radio_button_unchecked";\n            }\n          }\n\n          if (pwdStrInput) {\n            pwdStrInput.addEventListener("input", () => {\n              const val = pwdStrInput.value;\n              const hasLen = val.length >= 8;\n              const hasNum = /\\d/.test(val);\n              const hasSym = /[^a-zA-Z0-9]/.test(val);\n              const hasUpperLower = /[a-z]/.test(val) && /[A-Z]/.test(val);\n\n              updateReqToken(reqLen, hasLen);\n              updateReqToken(reqNum, hasNum);\n              updateReqToken(reqSym, hasSym);\n\n              let score = 0;\n              if (hasLen) score++;\n              if (hasNum) score++;\n              if (hasSym) score++;\n              if (hasUpperLower) score++;\n\n              [bar1, bar2, bar3, bar4].forEach(\n                (b) =>\n                  (b.className =\n                    "h-full w-1/4 bg-surface-container-highest transition-colors duration-300"),\n              );\n\n              if (val.length === 0) {\n                strengthLabel.textContent = "Awaiting input";\n                strengthLabel.className = "text-primary font-semibold";\n                strengthPercent.textContent = "0%";\n              } else if (score === 1) {\n                bar1.className =\n                  "h-full w-1/4 bg-status-danger transition-colors duration-300";\n                strengthLabel.textContent = "Fragile cipher";\n                strengthLabel.className = "text-status-danger font-semibold";\n                strengthPercent.textContent = "25%";\n              } else if (score === 2) {\n                bar1.className =\n                  "h-full w-1/4 bg-on-tertiary-container transition-colors duration-300";\n                bar2.className =\n                  "h-full w-1/4 bg-on-tertiary-container transition-colors duration-300";\n                strengthLabel.textContent = "Moderate key";\n                strengthLabel.className =\n                  "text-on-tertiary-container font-semibold";\n                strengthPercent.textContent = "50%";\n              } else if (score === 3) {\n                bar1.className =\n                  "h-full w-1/4 bg-secondary transition-colors duration-300";\n                bar2.className =\n                  "h-full w-1/4 bg-secondary transition-colors duration-300";\n                bar3.className =\n                  "h-full w-1/4 bg-secondary transition-colors duration-300";\n                strengthLabel.textContent = "Substantial cipher";\n                strengthLabel.className = "text-secondary font-semibold";\n                strengthPercent.textContent = "75%";\n              } else if (score === 4) {\n                bar1.className =\n                  "h-full w-1/4 bg-status-success transition-colors duration-300";\n                bar2.className =\n                  "h-full w-1/4 bg-status-success transition-colors duration-300";\n                bar3.className =\n                  "h-full w-1/4 bg-status-success transition-colors duration-300";\n                bar4.className =\n                  "h-full w-1/4 bg-status-success transition-colors duration-300";\n                strengthLabel.textContent = "Archival fortress";\n                strengthLabel.className = "text-status-success font-semibold";\n                strengthPercent.textContent = "100%";\n              }\n\n              checkMatch();\n            });\n          }\n\n          const confirmMatchLabel = document.getElementById(\n            "confirm-match-label",\n          );\n          function checkMatch() {\n            if (!pwdConfirmInput || !pwdInput || !confirmMatchLabel) return;\n            const pwdVal = pwdInput.value;\n            const confVal = pwdConfirmInput.value;\n            if (confVal.length === 0) {\n              confirmMatchLabel.textContent = "Matching key";\n              confirmMatchLabel.className =\n                "text-label-sm font-label-sm text-on-surface-variant";\n            } else if (pwdVal === confVal) {\n              confirmMatchLabel.textContent = "✓ Passwords coincide";\n              confirmMatchLabel.className =\n                "text-label-sm font-label-sm text-status-success font-medium";\n            } else {\n              confirmMatchLabel.textContent = "✕ Keys do not match";\n              confirmMatchLabel.className =\n                "text-label-sm font-label-sm text-error font-medium";\n            }\n          }\n          if (pwdConfirmInput) {\n            pwdConfirmInput.addEventListener("input", checkMatch);\n          }\n\n          const pills = document.querySelectorAll(".canon-pill");\n          pills.forEach((pill) => {\n            pill.addEventListener("click", () => {\n              const isSelected = pill.getAttribute("data-selected") === "true";\n              const checkIcon = pill.querySelector(".pill-check");\n              if (isSelected) {\n                pill.setAttribute("data-selected", "false");\n                pill.classList.remove("bg-primary", "text-on-primary");\n                pill.classList.add(\n                  "bg-surface-container-low",\n                  "text-on-surface",\n                );\n                if (checkIcon) checkIcon.classList.add("hidden");\n              } else {\n                pill.setAttribute("data-selected", "true");\n                pill.classList.remove(\n                  "bg-surface-container-low",\n                  "text-on-surface",\n                );\n                pill.classList.add("bg-primary", "text-on-primary");\n                if (checkIcon) {\n                  checkIcon.classList.remove("hidden");\n                  checkIcon.classList.remove("text-on-surface-variant");\n                  checkIcon.classList.add("text-on-primary");\n                }\n              }\n            });\n          });\n        })();\n      ',
];

export default function SignUpCreateAccountBookbridgeLightMode() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "sign_up_create_account_bookbridge_light_mode",
      stylesheets: pageStylesheets,
      styles: pageStyles,
      tailwindConfig,
      scripts: pageScripts,
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col justify-between selection:bg-surface-container-high selection:text-primary"
    >
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 max-w-7xl mx-auto px-gutter-mobile md:px-gutter lg:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            <a
              className="group flex items-center gap-space-sm text-on-surface"
              data-path="library-catalog"
              href="#"
            >
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  menu_book
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm tracking-tight text-primary leading-none">
                  BookBridge
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-wider uppercase mt-0.5">
                  Literary Archive
                </span>
              </div>
            </a>
            <div className="hidden sm:block h-5 w-px bg-outline-variant/40" />
            <a
              className="hidden sm:inline-flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
              data-path="library-catalog"
              href="#"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              <span>Return to Library</span>
            </a>
          </div>
          <div className="flex items-center gap-space-md">
            <nav
              className="flex items-center gap-space-sm sm:gap-space-md"
              data-active-classes="text-primary font-title-md"
            >
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-1.5 transition-colors"
                data-path="sign-in"
                href="#"
              >
                Sign In
              </a>
              <a
                aria-current="page"
                className="px-space-sm py-1.5 transition-colors text-primary font-title-md"
                data-path="sign-up"
                href="#"
              >
                Register
              </a>
            </nav>
            <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-label-sm font-label-sm cursor-pointer hover:bg-surface-container hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[16px]">
                translate
              </span>
              <span className="tracking-wider uppercase font-semibold">EN</span>
              <span className="material-symbols-outlined text-[14px]">
                expand_more
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-16 flex-1 flex flex-col justify-center">
        <div className="flex flex-col w-full py-space-xl px-gutter-mobile md:px-gutter lg:px-margin">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-margin items-start">
            <div className="lg:col-span-5 flex flex-col gap-space-xl lg:sticky lg:top-24">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-on-tertiary-container" />
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">
                    Folio Registry • Vol. MMXXV
                  </span>
                </div>
                <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary font-bold leading-tight tracking-tight">
                  Create Your <br className="hidden sm:inline" />
                  <span className="italic font-normal">Archival</span>
                  Desk.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mt-1">
                  Join a deliberate sanctuary of multilingual reading, private
                  marginalia preservation, and non-commercial canonical
                  scholarship.
                </p>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="text-label-md font-label-md uppercase tracking-wider text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">
                    verified
                  </span>
                  <span>Archival Reader Privileges</span>
                </div>
                <div className="group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined text-[22px]">
                        database
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container font-mono">
                          01. PROTOCOL
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container font-medium text-on-surface-variant">
                          Zero-Telemetry
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-primary font-semibold mt-0.5">
                        Local-First Autonomous Reading Tracker
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Your reading pacing, unfinished passages, and
                        chronological milestones remain cryptographically local
                        to your hardware.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined text-[22px]">
                        vertical_split
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container font-mono">
                          02. DUAL-VIEW
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container font-medium text-on-surface-variant">
                          Aligned Corrigenda
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-primary font-semibold mt-0.5">
                        Parallel Bilingual Dual-Reader Access
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Compare original source manuscripts against target
                        classical translations side-by-side with synchronized
                        paragraph anchoring.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group bg-surface-container-lowest p-space-lg rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined text-[22px]">
                        file_export
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container font-mono">
                          03. SCHOLARLY EXPORT
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container font-medium text-on-surface-variant">
                          BibTeX • Zotero
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-primary font-semibold mt-0.5">
                        Full Annotation &amp; Margins Export
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Extract your critical commentary, lemma markings, and
                        micro-glossary directly into Pandoc Markdown, LaTeX, or
                        academic references.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative bg-surface-container-low rounded-xl p-space-lg overflow-hidden flex flex-col gap-space-md">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover shrink-0 shadow-sm"
                    alt="A vintage close-up portrait of a scholar reviewing historical manuscripts in a sunlit oak-lined library room with dust motes and classic book spines, subtle amber lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQUs2MMEA6PU4RVQZCYjd3fB8SQouTBZTGn5g0Zpdo_zGpmG32X7h6cLWAilh0mUn94Xqa1TUvDEDocxdAFkSlOjy07Ee-YiSTL6Kjd1EsWC0TNGc32c7thoB-fprA9kLtRgdOQNSTQlMHIse8KAfD7v_pA6gwn16ldnmM2kuUJv7YgVZD3LP-h3uyYGn__DP-CzEvLXFLJOJJYrSh6UPptPxF95d-51nlxLFCMKsGoa8Tz-gJvKU"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-primary font-bold">
                      Bodleian-Format Library Guild
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Access node: 4,820 active scholarly desks
                    </span>
                  </div>
                </div>
                <p className="font-headline-sm text-headline-sm italic text-primary leading-snug">
                  “To read deliberately is to build an interior library that no
                  algorithmic distraction can dismantle.”
                </p>
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant pt-space-xs">
                  <span>Charter #881-B</span>
                  <span className="font-mono text-on-tertiary-container tracking-wider">
                    OPEN-HUMANITIES DEED
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-xl transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-lg">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-primary font-semibold tracking-tight">
                      Begin Your Literary Journey
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Register an authenticated reader identifier to reserve
                      your workspace.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[15px] text-status-success">
                        lock
                      </span>
                      Archival Tier: Open
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Scholarly SSO Provisioning
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                    <button
                      className="group flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] text-secondary">
                        school
                      </span>
                      <span className="truncate">Institution (.edu)</span>
                    </button>
                    <button
                      className="group flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-status-success/20 text-status-success text-xs font-bold font-mono">
                        iD
                      </span>
                      <span className="truncate">ORCID Profile</span>
                    </button>
                    <button
                      className="group flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="truncate">Google Account</span>
                    </button>
                  </div>
                </div>
                <div className="relative my-space-lg flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-surface-container-high" />
                  </div>
                  <div className="relative px-4 bg-surface-container-lowest text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
                    or craft credentials manually
                  </div>
                </div>
                <form
                  className="flex flex-col gap-space-lg"
                  id="archival-registration-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-md text-label-md text-primary font-semibold"
                        htmlFor="curatorial-name"
                      >
                        Full Name &amp; Curatorial Designation
                      </label>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Scholarly prefix welcome
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                        badge
                      </span>
                      <input
                        className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-canvas text-on-surface text-body-md font-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all placeholder:text-on-surface-variant/40"
                        id="curatorial-name"
                        name="curatorial-name"
                        placeholder="e.g., Prof. Dr. Marianne D'Artois"
                        required
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-md text-label-md text-primary font-semibold"
                        htmlFor="archival-email"
                      >
                        Email Address
                      </label>
                      <span
                        className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1 transition-colors"
                        id="email-feedback"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          info
                        </span>
                        <span>Requires valid domain</span>
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                        alternate_email
                      </span>
                      <input
                        className="w-full pl-11 pr-11 py-2.5 rounded-lg bg-surface-canvas text-on-surface text-body-md font-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all placeholder:text-on-surface-variant/40"
                        id="archival-email"
                        name="archival-email"
                        placeholder="marianne.dartois@sorbonne-humanities.fr"
                        required
                        type="email"
                      />
                      <div
                        className="absolute right-3.5 flex items-center text-on-surface-variant/40"
                        id="email-status-icon"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          check_circle
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          className="font-label-md text-label-md text-primary font-semibold"
                          htmlFor="archival-password"
                        >
                          Desk Password
                        </label>
                        <button
                          className="text-label-sm font-label-sm text-secondary hover:text-primary transition-colors"
                          id="toggle-pwd-btn"
                          type="button"
                        >
                          Show
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                          key
                        </span>
                        <input
                          className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-canvas text-on-surface text-body-md font-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all placeholder:text-on-surface-variant/40"
                          id="archival-password"
                          name="archival-password"
                          placeholder="••••••••••••"
                          required
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          className="font-label-md text-label-md text-primary font-semibold"
                          htmlFor="archival-password-confirm"
                        >
                          Confirm Password
                        </label>
                        <span
                          className="text-label-sm font-label-sm text-on-surface-variant"
                          id="confirm-match-label"
                        >
                          Matching key
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                          lock_reset
                        </span>
                        <input
                          className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-canvas text-on-surface text-body-md font-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all placeholder:text-on-surface-variant/40"
                          id="archival-password-confirm"
                          name="archival-password-confirm"
                          placeholder="••••••••••••"
                          required
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-2">
                    <div className="flex items-center justify-between text-label-sm font-label-sm">
                      <span className="text-on-surface-variant">
                        Archival Cipher Strength:
                        <strong
                          className="text-primary font-semibold"
                          id="strength-text"
                        >
                          Awaiting input
                        </strong>
                      </span>
                      <span
                        className="font-mono text-on-surface-variant"
                        id="strength-percent"
                      >
                        0%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex gap-1">
                      <div
                        className="h-full w-1/4 bg-surface-container-highest transition-colors duration-300"
                        id="bar-seg-1"
                      />
                      <div
                        className="h-full w-1/4 bg-surface-container-highest transition-colors duration-300"
                        id="bar-seg-2"
                      />
                      <div
                        className="h-full w-1/4 bg-surface-container-highest transition-colors duration-300"
                        id="bar-seg-3"
                      />
                      <div
                        className="h-full w-1/4 bg-surface-container-highest transition-colors duration-300"
                        id="bar-seg-4"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-label-sm font-label-sm text-on-surface-variant pt-1">
                      <span className="flex items-center gap-1" id="req-len">
                        <span className="material-symbols-outlined text-[15px]">
                          radio_button_unchecked
                        </span>
                        8+ characters
                      </span>
                      <span className="flex items-center gap-1" id="req-num">
                        <span className="material-symbols-outlined text-[15px]">
                          radio_button_unchecked
                        </span>
                        Numerals
                      </span>
                      <span className="flex items-center gap-1" id="req-sym">
                        <span className="material-symbols-outlined text-[15px]">
                          radio_button_unchecked
                        </span>
                        Literary symbol (§, ¶, #, @)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="font-label-md text-label-md text-primary font-semibold">
                        Primary Literary Focus • Preferred Canons
                      </label>
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Personalizes initial catalog stacks
                      </span>
                    </div>
                    <div
                      className="flex flex-wrap gap-2"
                      id="canon-pill-container"
                    >
                      <button
                        className="canon-pill px-3.5 py-1.5 rounded-full text-label-md font-label-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 active:scale-95"
                        data-canon="vietnamese"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant pill-check hidden">
                          check
                        </span>
                        <span>Vietnamese Classics</span>
                      </button>
                      <button
                        className="canon-pill px-3.5 py-1.5 rounded-full text-label-md font-label-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 active:scale-95"
                        data-canon="existentialism"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant pill-check hidden">
                          check
                        </span>
                        <span>French Existentialism</span>
                      </button>
                      <button
                        className="canon-pill px-3.5 py-1.5 rounded-full text-label-md font-label-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 active:scale-95"
                        data-canon="meiji"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant pill-check hidden">
                          check
                        </span>
                        <span>Japanese Meiji Prose</span>
                      </button>
                      <button
                        className="canon-pill px-3.5 py-1.5 rounded-full text-label-md font-label-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 active:scale-95"
                        data-canon="realism"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant pill-check hidden">
                          check
                        </span>
                        <span>Latin American Realism</span>
                      </button>
                      <button
                        className="canon-pill px-3.5 py-1.5 rounded-full text-label-md font-label-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 active:scale-95"
                        data-canon="poetry"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant pill-check hidden">
                          check
                        </span>
                        <span>Anglo-American Poetry</span>
                      </button>
                      <button
                        className="canon-pill px-3.5 py-1.5 rounded-full text-label-md font-label-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 active:scale-95"
                        data-canon="levantine"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant pill-check hidden">
                          check
                        </span>
                        <span>Levantine Philosophy</span>
                      </button>
                    </div>
                  </div>
                  <div className="pt-2 flex items-start gap-3 bg-surface-container-low/50 p-space-md rounded-lg">
                    <input
                      className="mt-1 w-4 h-4 rounded text-secondary bg-surface-canvas focus:ring-secondary focus:ring-2 cursor-pointer shrink-0"
                      id="charter-consent"
                      name="charter-consent"
                      required
                      type="checkbox"
                    />
                    <label
                      className="font-body-sm text-body-sm text-on-surface cursor-pointer select-none leading-relaxed"
                      htmlFor="charter-consent"
                    >
                      I agree to the
                      <span className="font-semibold text-primary underline decoration-on-tertiary-container underline-offset-2">
                        Open Humanities Non-Commercial Charter
                      </span>
                      and reader confidentiality policy. I understand BookBridge
                      implements 100% Zero-Telemetry storage with zero
                      behavioral profiling or corporate data syndication.
                    </label>
                  </div>
                  <div className="flex flex-col gap-space-sm pt-2">
                    <button
                      className="w-full py-3.5 px-space-lg rounded-full bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-3 group"
                      type="submit"
                    >
                      <span>Create Archival Account &amp; Open Desk</span>
                      <span className="w-7 h-7 rounded-full bg-on-tertiary-container flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_forward
                        </span>
                      </span>
                    </button>
                    <div className="text-center pt-2">
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Already hold an active archival desk?
                        <a
                          className="font-semibold text-primary hover:text-secondary underline underline-offset-4 decoration-primary/40 transition-colors"
                          data-path="sign-in"
                          href="#"
                        >
                          Sign In here
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm py-space-lg px-space-sm text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">
                    history_edu
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">
                    BibTeX 3.0
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Native Export
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">
                    security
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">
                    Ed25519 Keys
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Encrypted Notes
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">
                    public_off
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">
                    Offline Mode
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Peer Sync
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">
                    volunteer_activism
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">
                    Humanities Fund
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    100% Non-Profit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low/70 py-space-lg">
        <div className="max-w-7xl mx-auto px-gutter-mobile md:px-gutter lg:px-margin flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-space-sm text-center md:text-left">
            <span className="font-headline-sm text-[15px] italic text-primary">
              BookBridge
            </span>
            <span>
              — Curated for readers, bibliophiles, and scholarly archives.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-lg text-label-sm font-label-sm">
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="library-catalog"
              href="#"
            >
              Catalog Index
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="sign-in"
              href="#"
            >
              Reader Access
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              data-path="password-recovery"
              href="#"
            >
              Security &amp; Access
            </a>
            <span className="text-on-surface-variant/50">
              © 2025 BookBridge Press
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
