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
  '\n        (function () {\n          const faqButtons = document.querySelectorAll(".faq-btn");\n          faqButtons.forEach((button) => {\n            button.addEventListener("click", () => {\n              const content = button.nextElementSibling;\n              const icon = button.querySelector(".material-symbols-outlined");\n              const isHidden = content.classList.contains("hidden");\n\n              document\n                .querySelectorAll(".faq-content")\n                .forEach((c) => c.classList.add("hidden"));\n              document\n                .querySelectorAll(".faq-btn .material-symbols-outlined")\n                .forEach((i) => (i.style.transform = "rotate(0deg)"));\n\n              if (isHidden) {\n                content.classList.remove("hidden");\n                icon.style.transform = "rotate(180deg)";\n              }\n            });\n          });\n\n          const pills = document.querySelectorAll(".lang-pill");\n          const langInput = document.getElementById("preferredLanguageInput");\n\n          pills.forEach((pill) => {\n            pill.addEventListener("click", () => {\n              pills.forEach((p) => {\n                p.classList.remove(\n                  "border-secondary",\n                  "text-secondary",\n                  "bg-surface-container",\n                  "font-semibold",\n                );\n                p.classList.add("border-border-subtle", "text-primary");\n              });\n              pill.classList.remove("border-border-subtle", "text-primary");\n              pill.classList.add(\n                "border-secondary",\n                "text-secondary",\n                "bg-surface-container",\n                "font-semibold",\n              );\n              if (langInput) {\n                langInput.value = pill.getAttribute("data-lang");\n              }\n            });\n          });\n\n          const messageTextarea = document.getElementById("message-content");\n          const charCountEl = document.getElementById("char-count");\n          const charCounterContainer = document.getElementById("char-counter");\n\n          if (messageTextarea && charCountEl) {\n            messageTextarea.addEventListener("input", () => {\n              const len = messageTextarea.value.trim().length;\n              charCountEl.textContent = len;\n              if (len >= 10) {\n                charCounterContainer.classList.remove(\n                  "text-on-surface-variant",\n                  "text-status-danger",\n                );\n                charCounterContainer.classList.add("text-status-success");\n              } else {\n                charCounterContainer.classList.remove("text-status-success");\n                charCounterContainer.classList.add("text-on-surface-variant");\n              }\n            });\n          }\n\n          const contactForm = document.getElementById("contact-form");\n          const nameInput = document.getElementById("full-name");\n          const emailInput = document.getElementById("email-address");\n          const subjectSelect = document.getElementById("subject-topic");\n          const agreementCheckbox =\n            document.getElementById("academic-agreement");\n\n          const nameError = document.getElementById("name-error");\n          const emailError = document.getElementById("email-error");\n          const subjectError = document.getElementById("subject-error");\n          const messageError = document.getElementById("message-error");\n          const agreementError = document.getElementById("agreement-error");\n\n          const confirmationBanner = document.getElementById(\n            "confirmation-banner",\n          );\n          const resetFormBtn = document.getElementById("reset-form-btn");\n\n          const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n\n          if (contactForm) {\n            contactForm.addEventListener("submit", function (e) {\n              e.preventDefault();\n              let isValid = true;\n\n              if (!nameInput.value.trim()) {\n                nameError.classList.remove("hidden");\n                nameInput.classList.add("border-status-danger");\n                isValid = false;\n              } else {\n                nameError.classList.add("hidden");\n                nameInput.classList.remove("border-status-danger");\n              }\n\n              if (\n                !emailInput.value.trim() ||\n                !emailRegex.test(emailInput.value.trim())\n              ) {\n                emailError.classList.remove("hidden");\n                emailInput.classList.add("border-status-danger");\n                isValid = false;\n              } else {\n                emailError.classList.add("hidden");\n                emailInput.classList.remove("border-status-danger");\n              }\n\n              if (!subjectSelect.value) {\n                subjectError.classList.remove("hidden");\n                subjectSelect.classList.add("border-status-danger");\n                isValid = false;\n              } else {\n                subjectError.classList.add("hidden");\n                subjectSelect.classList.remove("border-status-danger");\n              }\n\n              if (messageTextarea.value.trim().length < 10) {\n                messageError.classList.remove("hidden");\n                messageTextarea.classList.add("border-status-danger");\n                isValid = false;\n              } else {\n                messageError.classList.add("hidden");\n                messageTextarea.classList.remove("border-status-danger");\n              }\n\n              if (!agreementCheckbox.checked) {\n                agreementError.classList.remove("hidden");\n                isValid = false;\n              } else {\n                agreementError.classList.add("hidden");\n              }\n\n              if (isValid) {\n                confirmationBanner.classList.remove("hidden");\n                confirmationBanner.scrollIntoView({\n                  behavior: "smooth",\n                  block: "center",\n                });\n\n                contactForm.reset();\n                if (charCountEl) charCountEl.textContent = "0";\n                if (charCounterContainer) {\n                  charCounterContainer.classList.remove("text-status-success");\n                  charCounterContainer.classList.add("text-on-surface-variant");\n                }\n              }\n            });\n          }\n\n          if (resetFormBtn) {\n            resetFormBtn.addEventListener("click", () => {\n              confirmationBanner.classList.add("hidden");\n              if (nameInput) nameInput.focus();\n            });\n          }\n        })();\n      ',
];

export default function ContactUsBookbridgeArchivalDesk() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "contact_us_bookbridge_archival_desk",
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
            <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">
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
              aria-current="page"
              className="px-3 py-1.5 transition-colors text-primary font-bold bg-surface-container rounded-full"
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
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden pb-20">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-fixed-dim/30 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-surface-container-high/40 blur-3xl pointer-events-none" />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8">
              <nav
                aria-label="Breadcrumbs"
                className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-6"
              >
                <a
                  className="hover:text-primary transition-colors flex items-center gap-1"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    home
                  </span>
                  Home
                </a>
                <span className="material-symbols-outlined text-[14px] text-outline">
                  chevron_right
                </span>
                <span className="text-primary font-semibold">Contact Us</span>
              </nav>
              <div className="relative pb-10 mb-8 border-b border-border-subtle">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm mb-4">
                  <span className="material-symbols-outlined text-[14px]">
                    local_library
                  </span>
                  <span>Editorial Correspondence &amp; Archival Desk</span>
                </div>
                <h1 className="font-display-hero text-display-hero text-primary font-bold tracking-tight max-w-4xl">
                  Connect With Our Curatorial Team
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
                  Have a book recommendation, archival query, or feedback on
                  reading tools? We welcome scholarly correspondence,
                  translation suggestions, and reader thoughts.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-on-surface-variant font-label-md text-label-md">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card shadow-sm border border-border-subtle">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
                    </span>
                    <span className="text-on-surface font-medium">
                      Curators on Desk (CET 09:00 - 18:00)
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">
                      schedule
                    </span>
                    Average Response: ~24 Hours
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-surface-card rounded-xl p-6 shadow-sm border border-border-subtle hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          account_balance
                        </span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                          Physical Archival Hubs
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Scholarly research stations &amp; reading rooms
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-surface-canvas border border-border-subtle/60">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                            location_on
                          </span>
                          <div>
                            <span className="font-label-md text-label-md text-primary font-semibold block">
                              Primary Archive &amp; Repository
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
                              BookBridge Literary Foundation
                              <br />
                              42 Boulevard Saint-Michel, 75005 Paris, France
                            </p>
                            <span className="inline-block mt-2 font-label-sm text-label-sm text-on-tertiary-container bg-surface-container-high px-2 py-0.5 rounded">
                              Bibliothèque Cujas Liaison
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-surface-canvas border border-border-subtle/60">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                            apartment
                          </span>
                          <div>
                            <span className="font-label-md text-label-md text-primary font-semibold block">
                              Southeast Asia Research Hub
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
                              Hanoi Academic Library Hub
                              <br />
                              Trang Thi, Hoan Kiem District, Hanoi, Vietnam
                            </p>
                            <span className="inline-block mt-2 font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded">
                              Heritage Digitization Project
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-card rounded-xl p-6 shadow-sm border border-border-subtle hover:shadow-md transition-shadow">
                    <h3 className="font-title-md text-title-md text-primary mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-primary">
                        mail
                      </span>
                      Direct Inquiries
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        className="p-3 rounded-lg bg-surface-canvas hover:bg-surface-container transition-colors block border border-border-subtle/50"
                        href="mailto:support@bookbridge.local"
                      >
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Reader Support
                        </span>
                        <span className="font-label-md text-label-md text-primary font-semibold truncate block mt-0.5">
                          support@bookbridge.local
                        </span>
                      </a>
                      <a
                        className="p-3 rounded-lg bg-surface-canvas hover:bg-surface-container transition-colors block border border-border-subtle/50"
                        href="mailto:editorial@bookbridge.local"
                      >
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                          Acquisitions &amp; Press
                        </span>
                        <span className="font-label-md text-label-md text-primary font-semibold truncate block mt-0.5">
                          editorial@bookbridge.local
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-5 border border-surface-container-high/80 relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container text-[24px] mt-0.5 shrink-0">
                        history_edu
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-label-md text-label-md text-primary font-bold">
                          Public Domain Submissions
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          When submitting archival texts, please include a
                          digital archive identifier (e.g., Internet Archive ID,
                          Gallica permalink, or verified ISBN). We prioritize
                          verified out-of-copyright classical works and
                          dual-language editions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-card rounded-xl p-6 shadow-sm border border-border-subtle">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">
                          help_center
                        </span>
                        Frequently Asked Inquiries
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Archival Policy
                      </span>
                    </div>
                    <div className="space-y-3" id="faq-container">
                      <div className="rounded-lg bg-surface-canvas overflow-hidden border border-border-subtle/50 transition-all">
                        <button
                          className="faq-btn w-full px-4 py-3 text-left flex items-center justify-between gap-2 hover:bg-surface-container-low transition-colors"
                          type="button"
                        >
                          <span className="font-label-md text-label-md text-primary font-medium">
                            How is my reading data saved?
                          </span>
                          <span className="material-symbols-outlined text-on-surface-variant text-[18px] transition-transform duration-200">
                            expand_more
                          </span>
                        </button>
                        <div className="faq-content hidden px-4 pb-3 pt-1 text-on-surface-variant font-body-sm text-body-sm">
                          Reading bookmarks, highlight notes, and reading shelf
                          states are stored
                          <strong className="text-primary font-semibold">
                            100% locally
                          </strong>
                          inside your browser's LocalStorage. No user-tracking
                          cookies or remote profiling scripts are deployed.
                        </div>
                      </div>
                      <div className="rounded-lg bg-surface-canvas overflow-hidden border border-border-subtle/50 transition-all">
                        <button
                          className="faq-btn w-full px-4 py-3 text-left flex items-center justify-between gap-2 hover:bg-surface-container-low transition-colors"
                          type="button"
                        >
                          <span className="font-label-md text-label-md text-primary font-medium">
                            Can I suggest bilingual editions?
                          </span>
                          <span className="material-symbols-outlined text-on-surface-variant text-[18px] transition-transform duration-200">
                            expand_more
                          </span>
                        </button>
                        <div className="faq-content hidden px-4 pb-3 pt-1 text-on-surface-variant font-body-sm text-body-sm">
                          Yes, absolutely. Our curatorial engine prioritizes
                          parallel-text alignments across English, Vietnamese,
                          French, and Asian languages. Select “Bilingual
                          Translation Alignment” in the subject selector.
                        </div>
                      </div>
                      <div className="rounded-lg bg-surface-canvas overflow-hidden border border-border-subtle/50 transition-all">
                        <button
                          className="faq-btn w-full px-4 py-3 text-left flex items-center justify-between gap-2 hover:bg-surface-container-low transition-colors"
                          type="button"
                        >
                          <span className="font-label-md text-label-md text-primary font-medium">
                            Is BookBridge completely free?
                          </span>
                          <span className="material-symbols-outlined text-on-surface-variant text-[18px] transition-transform duration-200">
                            expand_more
                          </span>
                        </button>
                        <div className="faq-content hidden px-4 pb-3 pt-1 text-on-surface-variant font-body-sm text-body-sm">
                          Yes. BookBridge is built entirely as a non-commercial,
                          public educational reading initiative and an academic
                          archive platform. No subscription fees, paywalls, or
                          gated libraries.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-sm border border-border-subtle bg-surface-card h-44 flex items-end">
                    <img
                      className="absolute inset-0 w-full h-full object-cover brightness-95"
                      alt="An atmospheric antique scholarly library study in warm afternoon sunlight, showing floor-to-ceiling wooden bookshelves filled with vintage hardcovers, an old mahogany reading desk with an open leatherbound manuscript, a warm brass reading lamp casting a gentle golden amber glow, highly detailed, literary modernism aesthetic, soft dust motes in gentle light."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF1JkVOYIB7LAwtXQ6cCLSGOqN_LIONoLD2ORTSY4RiJ-KBe5VBmyRVzL5CTokq36ui4QOm5zGfk2GXBCizWie0WfYpoNMTgBvrFeMYwNfmtzyRofB0HblS7rbGq9zSuzXwQpSqLSOGoAtoUKxhW-zg8mt--DMcEDhV6gLyVL8IfvmXJLCI7lzfrfheuYcG4k7QhX3wbZbLIlyympcGSiBhFFeXgppPIHQodMeOw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                    <div className="relative z-10 p-4 text-on-primary">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-accent-gold-light font-semibold">
                        Archival Sanctuary
                      </span>
                      <p className="font-headline-sm text-headline-sm italic mt-0.5">
                        “Books are bridges across centuries and minds.”
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <div className="bg-surface-card/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 lg:p-10 shadow-md border border-border-subtle relative">
                    <div className="mb-8">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="font-headline-md text-headline-md text-primary font-bold">
                          Send an Editorial Dispatch
                        </h2>
                        <span className="material-symbols-outlined text-[28px] text-on-tertiary-container">
                          draw
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                        All submissions are indexed by our editorial staff.
                        Complete the fields below for review.
                      </p>
                    </div>
                    <div
                      className="hidden mb-8 p-5 rounded-xl bg-surface-container-high border-l-4 border-status-success shadow-sm transition-all animate-fadeIn"
                      id="confirmation-banner"
                    >
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-status-success text-[26px] mt-0.5 shrink-0">
                          check_circle
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                            Dispatch Received
                          </h3>
                          <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                            Thank you! Your feedback has been simulated and
                            validated successfully.
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant italic pt-1">
                            (Note: This is a frontend demonstration; no actual
                            email has been dispatched).
                          </p>
                          <div className="pt-2 flex items-center gap-3">
                            <button
                              className="font-label-sm text-label-sm text-secondary hover:underline font-semibold flex items-center gap-1"
                              id="reset-form-btn"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                refresh
                              </span>
                              Send another message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form className="space-y-6" id="contact-form" noValidate>
                      <div className="space-y-1.5">
                        <label
                          className="font-label-md text-label-md text-primary font-semibold flex items-center justify-between"
                          htmlFor="full-name"
                        >
                          <span>
                            Full Name
                            <span className="text-status-danger">*</span>
                          </span>
                          <span
                            className="font-label-sm text-label-sm text-on-surface-variant"
                            id="name-status"
                          >
                            Required
                          </span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                            <span className="material-symbols-outlined text-[18px]">
                              person
                            </span>
                          </div>
                          <input
                            className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-canvas border border-border-subtle text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                            id="full-name"
                            name="name"
                            placeholder="e.g. Dr. Marianne D'Artois"
                            required
                            type="text"
                          />
                        </div>
                        <p
                          className="hidden text-status-danger font-label-sm text-label-sm flex items-center gap-1 mt-1"
                          id="name-error"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            error
                          </span>
                          Please provide your name or academic title.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <label
                          className="font-label-md text-label-md text-primary font-semibold flex items-center justify-between"
                          htmlFor="email-address"
                        >
                          <span>
                            Email Address
                            <span className="text-status-danger">*</span>
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Academic or personal inbox
                          </span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                            <span className="material-symbols-outlined text-[18px]">
                              alternate_email
                            </span>
                          </div>
                          <input
                            className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-canvas border border-border-subtle text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                            id="email-address"
                            name="email"
                            placeholder="reader@university.edu"
                            required
                            type="email"
                          />
                        </div>
                        <p
                          className="hidden text-status-danger font-label-sm text-label-sm flex items-center gap-1 mt-1"
                          id="email-error"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            error
                          </span>
                          Please input a valid email address (e.g.,
                          reader@university.edu).
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <label
                          className="font-label-md text-label-md text-primary font-semibold flex items-center justify-between"
                          htmlFor="subject-topic"
                        >
                          <span>
                            Subject &amp; Inquiry Topic
                            <span className="text-status-danger">*</span>
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Routing category
                          </span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                            <span className="material-symbols-outlined text-[18px]">
                              category
                            </span>
                          </div>
                          <select
                            className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-canvas border border-border-subtle text-primary font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary appearance-none transition-all cursor-pointer"
                            id="subject-topic"
                            name="subject"
                            required
                          >
                            <option disabled selected value>
                              Select an editorial inquiry channel...
                            </option>
                            <option value="general">
                              General Feedback &amp; Inquiry
                            </option>
                            <option value="recommendation">
                              Book Recommendation / Metadata Correction
                            </option>
                            <option value="bilingual">
                              Bilingual Translation Alignment
                            </option>
                            <option value="technical">
                              Technical / Bug Report
                            </option>
                            <option value="scholarly">
                              Scholarly Partnership &amp; Digitization
                            </option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-on-surface-variant">
                            <span className="material-symbols-outlined text-[18px]">
                              expand_more
                            </span>
                          </div>
                        </div>
                        <p
                          className="hidden text-status-danger font-label-sm text-label-sm flex items-center gap-1 mt-1"
                          id="subject-error"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            error
                          </span>
                          Please select an inquiry category.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-primary font-semibold">
                            Preferred Reading Language
                            <span className="text-on-surface-variant font-normal">
                              (Optional)
                            </span>
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            For curatorial context
                          </span>
                        </div>
                        <div
                          className="flex flex-wrap gap-2"
                          id="language-pill-group"
                        >
                          <button
                            className="lang-pill px-3.5 py-1.5 rounded-full border border-border-subtle text-primary font-label-sm text-label-sm hover:bg-surface-container transition-all"
                            data-lang="Vietnamese"
                            type="button"
                          >
                            Tiếng Việt (Vietnamese)
                          </button>
                          <button
                            className="lang-pill px-3.5 py-1.5 rounded-full border border-secondary text-secondary bg-surface-container font-label-sm text-label-sm transition-all font-semibold"
                            data-lang="English"
                            type="button"
                          >
                            English
                          </button>
                          <button
                            className="lang-pill px-3.5 py-1.5 rounded-full border border-border-subtle text-primary font-label-sm text-label-sm hover:bg-surface-container transition-all"
                            data-lang="French"
                            type="button"
                          >
                            Français (French)
                          </button>
                          <button
                            className="lang-pill px-3.5 py-1.5 rounded-full border border-border-subtle text-primary font-label-sm text-label-sm hover:bg-surface-container transition-all"
                            data-lang="Japanese"
                            type="button"
                          >
                            日本語 (Japanese)
                          </button>
                          <button
                            className="lang-pill px-3.5 py-1.5 rounded-full border border-border-subtle text-primary font-label-sm text-label-sm hover:bg-surface-container transition-all"
                            data-lang="Spanish"
                            type="button"
                          >
                            Español (Spanish)
                          </button>
                        </div>
                        <input
                          id="preferredLanguageInput"
                          name="preferredLanguage"
                          type="hidden"
                          defaultValue="English"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label
                            className="font-label-md text-label-md text-primary font-semibold"
                            htmlFor="message-content"
                          >
                            Message / Bibliographic Note
                            <span className="text-status-danger">*</span>
                          </label>
                          <span
                            className="font-label-sm text-label-sm text-on-surface-variant"
                            id="char-counter"
                          >
                            <span id="char-count">0</span> / 10 min chars
                          </span>
                        </div>
                        <textarea
                          className="w-full p-3.5 rounded-lg bg-surface-canvas border border-border-subtle text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                          id="message-content"
                          name="message"
                          placeholder="Share details of the archive query, title ISBN, recommended edition, or translation paragraph notes..."
                          required
                          rows={4}
                          defaultValue={""}
                        />
                        <p
                          className="hidden text-status-danger font-label-sm text-label-sm flex items-center gap-1 mt-1"
                          id="message-error"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            error
                          </span>
                          Please articulate your message with at least 10
                          characters.
                        </p>
                      </div>
                      <div className="pt-1">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            className="mt-1 h-4 w-4 rounded text-secondary border-border-subtle focus:ring-secondary cursor-pointer"
                            id="academic-agreement"
                            name="agreement"
                            required
                            type="checkbox"
                          />
                          <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                            I understand BookBridge is an open academic
                            initiative dedicated to public domain literature,
                            peer scholarship, and non-commercial preservation.
                          </span>
                        </label>
                        <p
                          className="hidden text-status-danger font-label-sm text-label-sm flex items-center gap-1 mt-1 pl-7"
                          id="agreement-error"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            error
                          </span>
                          Acknowledgement is required to proceed.
                        </p>
                      </div>
                      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <button
                          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary-container text-on-primary hover:bg-primary transition-all font-label-md text-label-md font-semibold shadow-md active:scale-[0.99]"
                          id="submit-dispatch-btn"
                          type="submit"
                        >
                          <span>Dispatch Message</span>
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </button>
                        <span className="font-label-sm text-label-sm text-on-surface-variant text-center sm:text-right flex items-center justify-center sm:justify-end gap-1">
                          <span className="material-symbols-outlined text-[14px] text-status-success">
                            lock
                          </span>
                          Encrypted browser transmission
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-16 p-8 rounded-xl bg-surface-container-low border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                    Researching an Obscure Translation?
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                    Our bibliographic fellows curate custom reading lists for
                    comparative literature dissertations and open-access
                    curricula.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    className="px-5 py-2.5 rounded-full bg-surface-card hover:bg-surface-container border border-border-subtle font-label-md text-label-md text-primary font-semibold transition-colors"
                    href="#"
                  >
                    Consult Catalog
                  </a>
                  <a
                    className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-label-md font-semibold transition-colors shadow-sm"
                    href="#"
                  >
                    Curator Office Hours
                  </a>
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDzO_GBPm8isEUkTqlc0rXu0_CDktn0QcjBDQc8lwZ2oQyRpG9MkPFYhbvUKXmBhdK2GJgYVYAMhG2Vx6oj7aqnEb4cuLSFnSJK5356BnlaaQZo6m4C2iQsyTsxqQXmfC8dHRL30N8OSPQzTEYbxyaJZy0d3kun6iP7ROH7IBhuU9vkHTy06UR-JLKph1gjAHaH89kBMePOEsWbliDR50dnSmBfid-LCRtFZaQ"
                />
                <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
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
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
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
                    data-path="collections"
                    href="#"
                  >
                    Themed Shelves
                  </a>
                </li>
                <li className="font-body-sm text-body-sm">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="author-profile"
                    href="#"
                  >
                    Author Profiles
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
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
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
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
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
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
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-tertiary-container font-semibold">
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
