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
  '\n          function togglePasswordVisibility() {\n            const passwordInput = document.getElementById("authPassword");\n            const icon = document.getElementById("passwordEyeIcon");\n            if (passwordInput.type === "password") {\n              passwordInput.type = "text";\n              icon.textContent = "visibility_off";\n            } else {\n              passwordInput.type = "password";\n              icon.textContent = "visibility";\n            }\n          }\n\n          function showToast(message, iconName = "check_circle") {\n            const toast = document.getElementById("deskToast");\n            const toastMsg = document.getElementById("toastMsg");\n            const toastIcon = document.getElementById("toastIcon");\n\n            toastMsg.textContent = message;\n            toastIcon.textContent = iconName;\n\n            toast.classList.remove("translate-y-24", "opacity-0");\n            toast.classList.add("translate-y-0", "opacity-100");\n\n            setTimeout(() => {\n              toast.classList.remove("translate-y-0", "opacity-100");\n              toast.classList.add("translate-y-24", "opacity-0");\n            }, 3500);\n          }\n\n          function handleDeskSignIn() {\n            const scholarId = document.getElementById("scholarId").value;\n            const remember = document.getElementById("rememberDesk").checked;\n            const btn = document.getElementById("submitButton");\n            const btnText = document.getElementById("buttonText");\n\n            btnText.textContent = "Authenticating Sanctuary...";\n            btn.disabled = true;\n\n            setTimeout(() => {\n              if (remember) {\n                localStorage.setItem("bookbridge_desk_user", scholarId);\n                localStorage.setItem("bookbridge_desk_auth", "token_active");\n              }\n              btnText.textContent = "Desk Synchronized";\n              showToast("Desk opened for " + (scholarId || "Bibliophile"));\n              setTimeout(() => {\n                btnText.textContent = "Sign In to Your Desk";\n                btn.disabled = false;\n              }, 1500);\n            }, 700);\n          }\n\n          function launchGuestSession() {\n            sessionStorage.setItem("bookbridge_guest_session", "true");\n            showToast(\n              "Guest Researcher Session active (Ephemeral)",\n              "auto_stories",\n            );\n          }\n        \nwindow["handleDeskSignIn"] = handleDeskSignIn;\nwindow["togglePasswordVisibility"] = togglePasswordVisibility;\nwindow["launchGuestSession"] = launchGuestSession;',
];

export default function SignInBookbridgeArchivalDeskLightMode() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "sign_in_bookbridge_archival_desk_light_mode",
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
                aria-current="page"
                className="px-space-sm py-1.5 transition-colors text-primary font-title-md"
                data-path="sign-in"
                href="#"
              >
                Sign In
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-1.5 transition-colors"
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
        <div className="flex flex-col w-full">
          <div className="relative w-full py-space-xl px-gutter-mobile md:px-gutter lg:px-margin max-w-7xl mx-auto">
            <div className="absolute -top-12 left-1/4 w-96 h-96 bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-surface-container/60 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
              <aside className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low rounded-xl p-space-lg md:p-space-xl shadow-sm relative overflow-hidden order-2 lg:order-1">
                <svg
                  className="absolute -right-12 -bottom-12 w-64 h-64 text-surface-container-highest/60 pointer-events-none"
                  fill="none"
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx={100}
                    cy={100}
                    r={85}
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={100}
                    cy={100}
                    r={70}
                    stroke="currentColor"
                    strokeWidth={1}
                  />
                  <path
                    d="M100 35 L100 165 M35 100 L165 100"
                    stroke="currentColor"
                    strokeWidth="0.75"
                  />
                  <circle
                    cx={100}
                    cy={100}
                    r={45}
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                <div className="flex flex-col gap-space-lg relative z-10">
                  <div className="flex items-center gap-space-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-info mr-2" />
                      Vault • Issue No. 42
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                      Archival Desk
                    </span>
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md group">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt="Close up photograph of sunlit parchment manuscripts, antique brass reading spectacles, and a fountain pen resting on a dark walnut library table in an Oxford scholarly archive with warm ambient dust motes."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtcWb6kj7cpn1c-PCycvkbIRu43hy0EFwsBnzZ7I2VdazRYz8aROpgTBx7EmaZfsJwr3W_54Ghwg-9cjSXKR9g6kZCqJkqQnG9hmsffMqIF-n4aJbDtn_5OMKAJEgFYNm9EbZc6EKeNM3uJwgOXWQuZBJXNOYJE_Q1sRA4dY3UY34YcC5cFi2Nc5M-K4Axv0OwR5Z6tLIT2tQ8NNmxzWupdWeRHeCFJpBYBbzVnZH_9vsSPzLLo7o"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-space-md text-surface-container-lowest">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-surface-container-high">
                        Oxford Bodleian Collection
                      </span>
                      <p className="font-headline-sm text-headline-sm text-surface-container-lowest leading-tight">
                        Synoptic Parallel Codex VI
                      </p>
                    </div>
                  </div>
                  <blockquote className="relative pl-space-md py-1">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-on-tertiary-container rounded-full" />
                    <p className="font-headline-sm text-headline-sm italic text-primary leading-snug">
                      “A reader lives a thousand lives before he dies. The man
                      who never reads lives only one.”
                    </p>
                    <footer className="mt-space-sm font-label-md text-label-md text-on-surface-variant flex items-center gap-space-xs">
                      <span>— George R.R. Martin</span>
                      <span className="text-on-surface-variant/40">•</span>
                      <span className="text-label-sm font-label-sm text-on-tertiary-container">
                        A Dance with Dragons
                      </span>
                    </footer>
                  </blockquote>
                </div>
                <div className="mt-space-xl pt-space-md relative z-10 flex flex-col gap-space-md">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-label-sm font-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[15px] text-status-success">
                        verified_user
                      </span>
                      Zero Behavioral Tracking
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-label-sm font-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[15px] text-accent-indigo">
                        sync
                      </span>
                      Offline LocalStorage Synced
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-label-sm font-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[15px] text-secondary">
                        translate
                      </span>
                      Polyglot Parallel Canons
                    </span>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">
                          history_edu
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface leading-tight">
                          Catalog Session Node
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Active peer: 18.2k synchronized desks
                        </span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
                  </div>
                </div>
              </aside>
              <section className="lg:col-span-7 flex flex-col justify-center bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-md order-1 lg:order-2">
                <div className="max-w-xl mx-auto w-full flex flex-col">
                  <header className="flex flex-col gap-space-xs mb-space-lg">
                    <div className="flex items-center gap-space-xs text-on-tertiary-container font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                      <span className="material-symbols-outlined text-[16px]">
                        menu_book
                      </span>
                      <span>Bibliophile Desk Portal</span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                      Enter the Sanctuary of Letters
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Access your personal reading desk, synchronized
                      marginalia, and polyglot annotations.
                    </p>
                  </header>
                  <div className="flex flex-col gap-2.5">
                    <button
                      className="w-full flex items-center justify-between px-space-md py-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all duration-200 group"
                      type="button"
                    >
                      <div className="flex items-center gap-space-md">
                        <span className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-surface-container-lowest transition-colors">
                          <span className="material-symbols-outlined text-[18px]">
                            school
                          </span>
                        </span>
                        <span>Continue with University / Edu ID</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-[18px]">
                        chevron_right
                      </span>
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        className="flex items-center justify-center gap-space-sm px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          auto_stories
                        </span>
                        <span>Google Scholar</span>
                      </button>
                      <button
                        className="flex items-center justify-center gap-space-sm px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-status-success text-[20px]">
                          badge
                        </span>
                        <span>ORCID / Library Pass</span>
                      </button>
                    </div>
                  </div>
                  <div className="relative my-space-lg flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-surface-container-high" />
                    </div>
                    <div className="relative px-space-md bg-surface-container-lowest flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="text-on-tertiary-container">❦</span>
                      <span>or continue with reader credentials</span>
                      <span className="text-on-tertiary-container">❦</span>
                    </div>
                  </div>
                  <form
                    className="flex flex-col gap-space-md"
                    id="authForm"
                    onSubmit={(event) => {
                      event.preventDefault();
                      window.handleDeskSignIn();
                    }}
                  >
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-label-md text-label-md text-on-surface flex items-center justify-between"
                        htmlFor="scholarId"
                      >
                        <span>Reader Email or Scholar Identifier</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          SSO / Institutional
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                          mail
                        </span>
                        <input
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                          id="scholarId"
                          placeholder="e.g. marianne.dartois@sorbonne.fr"
                          required
                          type="text"
                          defaultValue="marianne.dartois@sorbonne.fr"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          className="font-label-md text-label-md text-on-surface"
                          htmlFor="authPassword"
                        >
                          Password
                        </label>
                        <a
                          className="font-label-sm text-label-sm text-secondary hover:underline"
                          data-path="password-recovery"
                          href="#"
                        >
                          Forgotten credentials?
                        </a>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                          lock
                        </span>
                        <input
                          className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                          id="authPassword"
                          placeholder="••••••••••••"
                          required
                          type="password"
                          defaultValue="bibliophile_key_92"
                        />
                        <button
                          aria-label="Toggle password visibility"
                          className="absolute right-3 p-1 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
                          id="togglePasswordBtn"
                          onClick={(event) => {
                            window.togglePasswordVisibility();
                          }}
                          type="button"
                        >
                          <span
                            className="material-symbols-outlined text-[20px]"
                            id="passwordEyeIcon"
                          >
                            visibility
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm mt-1">
                      <input
                        defaultChecked
                        className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary bg-surface-container-low cursor-pointer"
                        id="rememberDesk"
                        type="checkbox"
                      />
                      <label
                        className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none"
                        htmlFor="rememberDesk"
                      >
                        Keep my reading desk authenticated on this browser (
                        <span className="font-semibold text-on-surface">
                          LocalStorage persistence
                        </span>
                        ).
                      </label>
                    </div>
                    <button
                      className="w-full mt-space-sm px-space-lg py-3 rounded-full bg-primary-container text-surface-container-lowest hover:bg-on-tertiary-container hover:text-surface-container-lowest font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-space-sm group"
                      id="submitButton"
                      type="submit"
                    >
                      <span id="buttonText">Sign In to Your Desk</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                  <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-tertiary-container shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          local_library
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface leading-tight">
                          Visiting as guest researcher?
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Instant session using ephemeral local storage without
                          account creation.
                        </span>
                      </div>
                    </div>
                    <button
                      className="shrink-0 px-space-md py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1.5"
                      onClick={(event) => {
                        window.launchGuestSession();
                      }}
                      type="button"
                    >
                      <span>Instant Guest Desk</span>
                      <span className="material-symbols-outlined text-[16px]">
                        bolt
                      </span>
                    </button>
                  </div>
                  <footer className="mt-space-lg pt-space-md text-center flex flex-col items-center gap-2">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      New to BookBridge?
                      <a
                        className="text-secondary font-label-md text-label-md hover:underline ml-1"
                        data-path="sign-up"
                        href="#"
                      >
                        Create a Reader Account
                      </a>
                    </p>
                    <div className="flex items-center gap-space-md text-label-sm font-label-sm text-on-surface-variant/70 mt-1">
                      <a
                        className="hover:text-on-surface transition-colors"
                        href="#"
                      >
                        Academic Honor Code
                      </a>
                      <span>•</span>
                      <a
                        className="hover:text-on-surface transition-colors"
                        href="#"
                      >
                        Archive Privacy Notice
                      </a>
                      <span>•</span>
                      <a
                        className="hover:text-on-surface transition-colors"
                        href="#"
                      >
                        Terminal Help
                      </a>
                    </div>
                  </footer>
                </div>
              </section>
            </div>
          </div>
          <div
            className="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none"
            id="deskToast"
          >
            <div className="flex items-center gap-space-sm px-space-md py-3 rounded-lg bg-inverse-surface text-inverse-on-surface shadow-xl">
              <span
                className="material-symbols-outlined text-[20px] text-accent-gold-light"
                id="toastIcon"
              >
                check_circle
              </span>
              <span className="font-body-sm text-body-sm" id="toastMsg">
                Reading desk initialized.
              </span>
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
