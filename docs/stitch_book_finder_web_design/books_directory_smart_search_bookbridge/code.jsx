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
  '\n        (function () {\n          const rawBooks = [\n            {\n              id: "1984",\n              title: "1984",\n              author: "George Orwell",\n              language: "English",\n              langCode: "EN",\n              genre: "Sci-Fi & Dystopia",\n              level: "Intermediate",\n              year: 1949,\n              pages: 328,\n              description:\n                "A terrifying dystopian forecast about totalitarian surveillance, Winston Smith\'s quiet rebellion, and the manipulation of historical truth.",\n              imageAlt:\n                "Minimalist book cover featuring a piercing mechanical eye rendered in vintage dark navy, stark deep blue, and muted gold accents with crisp mid-century typography.",\n            },\n            {\n              id: "truyen-kieu",\n              title: "Truyện Kiều",\n              author: "Nguyễn Du",\n              language: "Vietnamese",\n              langCode: "VI",\n              genre: "Poetry & Classic",\n              level: "Advanced",\n              year: 1820,\n              pages: 280,\n              description:\n                "The crown jewel of Vietnamese literary heritage, recounting the epic fifteen-year tribulation of the virtuous, talented Thúy Kiều in lục bát verse.",\n              imageAlt:\n                "Intricate traditional Vietnamese woodcut print book cover of a poetic maiden by a willow tree in rich indigo, subtle gold, and aged parchment tones.",\n            },\n            {\n              id: "de-men",\n              title: "Dế Mèn Phiêu Lưu Ký",\n              author: "Tô Hoài",\n              language: "Vietnamese",\n              langCode: "VI",\n              genre: "Fiction",\n              level: "Beginner",\n              year: 1941,\n              pages: 196,\n              description:\n                "A cherished coming-of-age fable following the adventures of an arrogant young cricket as he discovers empathy, camaraderie, and freedom.",\n              imageAlt:\n                "Charming editorial watercolor book illustration showing a gallant grasshopper cricket wandering through vibrant blades of green meadow grass and dewdrops.",\n            },\n            {\n              id: "le-petit-prince",\n              title: "Le Petit Prince",\n              author: "Antoine de Saint-Exupéry",\n              language: "French",\n              langCode: "FR",\n              genre: "Philosophy",\n              level: "Beginner",\n              year: 1943,\n              pages: 140,\n              description:\n                "A poetic philosophical tale where an interplanetary child traveler teaches a stranded aviator profound secrets regarding human affection.",\n              imageAlt:\n                "Artistic celestial book cover depicting a tiny prince in an open coat standing upon a curved asteroid with stars and a delicate rose against deep lapis lazuli space.",\n            },\n            {\n              id: "great-gatsby",\n              title: "The Great Gatsby",\n              author: "F. Scott Fitzgerald",\n              language: "English",\n              langCode: "EN",\n              genre: "Fiction",\n              level: "Intermediate",\n              year: 1925,\n              pages: 208,\n              description:\n                "The quintessential portrait of the Jazz Age, detailing Jay Gatsby\'s obsessive yearning for Daisy Buchanan amid decadent Long Island estates.",\n              imageAlt:\n                "Art deco literary book cover with luminous celestial eyes looking down over the golden glowing skylines and champagne silhouettes of the roaring 1920s.",\n            },\n            {\n              id: "kill-mockingbird",\n              title: "To Kill a Mockingbird",\n              author: "Harper Lee",\n              language: "English",\n              langCode: "EN",\n              genre: "Fiction",\n              level: "Intermediate",\n              year: 1960,\n              pages: 281,\n              description:\n                "Scout Finch narrates childhood in Depression-era Alabama as her father, Atticus, defends a Black man falsely accused in a racially divided town.",\n              imageAlt:\n                "Moody atmospheric southern gothic book cover featuring the silhouette of a solitary mockingbird perched in an old oak branch at dusky sunset.",\n            },\n            {\n              id: "solitude",\n              title: "One Hundred Years of Solitude",\n              author: "Gabriel García Márquez",\n              language: "Spanish",\n              langCode: "ES",\n              genre: "Fiction",\n              level: "Advanced",\n              year: 1967,\n              pages: 417,\n              description:\n                "Seven generations of the Buendía dynasty live through wonder, madness, and incestuous isolation in the mythical river town of Macondo.",\n              imageAlt:\n                "Magical realist book cover displaying lush tropical banana leaves, golden yellow butterflies swirling, and mythical architectural archways.",\n            },\n            {\n              id: "crime-punishment",\n              title: "Crime and Punishment",\n              author: "Fyodor Dostoevsky",\n              language: "English",\n              langCode: "EN",\n              genre: "Philosophy",\n              level: "Advanced",\n              year: 1866,\n              pages: 671,\n              description:\n                "The psychological torment of Raskolnikov after he commits murder to validate his theory of extraordinary men exempt from moral laws.",\n              imageAlt:\n                "Dark brooding philosophical book cover with shadowy Saint Petersburg stone bridges, misty gas lamps, and high-contrast dramatic typography.",\n            },\n            {\n              id: "so-do",\n              title: "Số Đỏ (Dumb Luck)",\n              author: "Vũ Trọng Phụng",\n              language: "Vietnamese",\n              langCode: "VI",\n              genre: "Fiction",\n              level: "Intermediate",\n              year: 1936,\n              pages: 256,\n              description:\n                "A blistering satirical masterpiece exposing bourgeois hypocrisy in French-colonial Hanoi through the preposterous rise of street ball-boy Xuân Tóc Đỏ.",\n              imageAlt:\n                "Sharp satirical book cover in 1930s Indochine retro poster styling, featuring a comically flamboyant gentleman in a checkered colonial suit.",\n            },\n            {\n              id: "norwegian-wood",\n              title: "Norwegian Wood",\n              author: "Haruki Murakami",\n              language: "Japanese",\n              langCode: "JA",\n              genre: "Fiction",\n              level: "Intermediate",\n              year: 1987,\n              pages: 296,\n              description:\n                "Toru Watanabe reflects upon his quiet Tokyo university years during the late 1960s, intertwined with memory, loss, and bittersweet music.",\n              imageAlt:\n                "Minimalist Japanese book cover rendered in duo-tone crimson and midnight blue featuring quiet misty pine forest hills under cold rain.",\n            },\n            {\n              id: "stranger",\n              title: "L\'Étranger (The Stranger)",\n              author: "Albert Camus",\n              language: "French",\n              langCode: "FR",\n              genre: "Philosophy",\n              level: "Intermediate",\n              year: 1942,\n              pages: 159,\n              description:\n                "Meursault passively confronts the absurdity of human existence beneath the blinding Mediterranean sun on an Algerian shore.",\n              imageAlt:\n                "Sun-bleached stark book cover showing an intense blinding white-gold Mediterranean sun casting deep geometric shadows across an empty beach.",\n            },\n            {\n              id: "rashomon",\n              title: "Rashomon and Other Stories",\n              author: "Ryūnosuke Akutagawa",\n              language: "Japanese",\n              langCode: "JA",\n              genre: "Mystery",\n              level: "Advanced",\n              year: 1915,\n              pages: 224,\n              description:\n                "Psychological explorations of subjective truth, guilt, and human fragility framed by a dilapidated ancient Kyoto gate in heavy downpour.",\n              imageAlt:\n                "Traditional Japanese ink wash sumi-e style book cover depicting the imposing weathered wooden beams of Kyoto gate under torrential rain.",\n            },\n            {\n              id: "ficciones",\n              title: "Ficciones",\n              author: "Jorge Luis Borges",\n              language: "Spanish",\n              langCode: "ES",\n              genre: "Mystery",\n              level: "Advanced",\n              year: 1944,\n              pages: 174,\n              description:\n                "Dazzling labyrinthine short stories exploring infinite libraries, speculative heresies, secret societies, and the nature of infinity.",\n              imageAlt:\n                "Escher-inspired labyrinth book cover showcasing infinite twisting library staircases and mirrored geometrical pathways in slate blue and gold.",\n            },\n            {\n              id: "tat-den",\n              title: "Tắt Đèn",\n              author: "Ngô Tất Tố",\n              language: "Vietnamese",\n              langCode: "VI",\n              genre: "Fiction",\n              level: "Intermediate",\n              year: 1939,\n              pages: 216,\n              description:\n                "A poignant realist narrative portraying the fierce resilience of Chị Dậu during an oppressive rural tax season in northern Vietnam.",\n              imageAlt:\n                "Deep sepia tone dramatic book cover with the silhouette of a determined peasant woman carrying burdens into the stormy night darkness.",\n            },\n            {\n              id: "sapiens",\n              title: "Sapiens: A Brief History",\n              author: "Yuval Noah Harari",\n              language: "English",\n              langCode: "EN",\n              genre: "Non-Fiction",\n              level: "Intermediate",\n              year: 2011,\n              pages: 443,\n              description:\n                "A panoramic examination of how an insignificant ape became the master of planet Earth through the unique ability to create collective fiction.",\n              imageAlt:\n                "Contemporary non-fiction book cover featuring a pale human ochre handprint impression against clean white slate and crisp modern editorial serif typography.",\n            },\n            {\n              id: "madame-bovary",\n              title: "Madame Bovary",\n              author: "Gustave Flaubert",\n              language: "French",\n              langCode: "FR",\n              genre: "Poetry & Classic",\n              level: "Advanced",\n              year: 1856,\n              pages: 429,\n              description:\n                "Emma Bovary seeks romantic ecstasy and aristocratic luxury to escape the suffocating tedium of provincial marital life.",\n              imageAlt:\n                "Exquisite 19th-century French editorial cover with velvet textures, vintage lace motifs, and melancholy blue oil painting flourishes.",\n            },\n            {\n              id: "pedro-paramo",\n              title: "Pedro Páramo",\n              author: "Juan Rulfo",\n              language: "Spanish",\n              langCode: "ES",\n              genre: "Poetry & Classic",\n              level: "Intermediate",\n              year: 1955,\n              pages: 128,\n              description:\n                "Juan Preciado journeys to Comala in search of his long-lost father, only to find a desolate ghost town inhabited solely by murmuring specters.",\n              imageAlt:\n                "Haunting desert book cover featuring cracked arid clay earth, bleached adobe walls, and ghostly silhouettes under a blazing cobalt sky.",\n            },\n            {\n              id: "kokoro",\n              title: "Kokoro",\n              author: "Natsume Sōseki",\n              language: "Japanese",\n              langCode: "JA",\n              genre: "Poetry & Classic",\n              level: "Intermediate",\n              year: 1914,\n              pages: 248,\n              description:\n                "A moving meditation on the loneliness of the individual navigating Meiji-era Japan, told through the friendship between a student and \'Sensei\'.",\n              imageAlt:\n                "Serene Japanese woodcut aesthetic book cover showing fallen autumn maple leaves floating upon a quiet ripple of dark garden pond water.",\n            },\n            {\n              id: "lao-hac",\n              title: "Lão Hạc và Tuyển Tập",\n              author: "Nam Cao",\n              language: "Vietnamese",\n              langCode: "VI",\n              genre: "Fiction",\n              level: "Intermediate",\n              year: 1943,\n              pages: 184,\n              description:\n                "An unforgettable, heartbreaking portrait of old farmer Lão Hạc and his beloved dog Vàng, exemplifying noble dignity amidst crippling poverty.",\n              imageAlt:\n                "Warm charcoal and sepia book cover showing an elderly Vietnamese farmer stroking a gentle golden hound against a simple thatched garden cottage.",\n            },\n            {\n              id: "thinking-fast-slow",\n              title: "Thinking, Fast and Slow",\n              author: "Daniel Kahneman",\n              language: "English",\n              langCode: "EN",\n              genre: "Non-Fiction",\n              level: "Intermediate",\n              year: 2011,\n              pages: 499,\n              description:\n                "Nobel laureate Kahneman explores the two cognitive systems that drive human choice: System 1 (instinctive) and System 2 (deliberative).",\n              imageAlt:\n                "Striking cognitive science book cover featuring dual brain hemispheres illustrated as intersecting geometric gears in slate navy and warm amber.",\n            },\n          ];\n\n          let savedBookmarks = new Set(["1984", "truyen-kieu", "solitude"]);\n          let currentLanguage = "all";\n          let currentReadingLevel = "all";\n          let currentPeriod = "all";\n          let isCompactView = false;\n          let sidebarOpen = true;\n\n          const bookGrid = document.getElementById("bookGrid");\n          const emptyState = document.getElementById("emptyState");\n          const displayedCount = document.getElementById("displayedCount");\n          const resultsCountBadge =\n            document.getElementById("resultsCountBadge");\n          const searchInput = document.getElementById("searchInput");\n          const sortSelect = document.getElementById("sortSelect");\n          const clearAllFiltersBtn =\n            document.getElementById("clearAllFiltersBtn");\n          const emptyResetBtn = document.getElementById("emptyResetBtn");\n          const toggleFilterBtn = document.getElementById("toggleFilterBtn");\n          const filterSidebar = document.getElementById("filterSidebar");\n          const bookCatalogSection =\n            document.getElementById("bookCatalogSection");\n          const activeFilterBadge =\n            document.getElementById("activeFilterBadge");\n          const viewGridBtn = document.getElementById("viewGridBtn");\n          const viewListBtn = document.getElementById("viewListBtn");\n\n          const detailsModal = document.getElementById("detailsModal");\n          const closeModalBtn = document.getElementById("closeModalBtn");\n          const modalCloseActionBtn = document.getElementById(\n            "modalCloseActionBtn",\n          );\n          const modalTitle = document.getElementById("modalTitle");\n          const modalAuthor = document.getElementById("modalAuthor");\n          const modalMeta = document.getElementById("modalMeta");\n          const modalDescription = document.getElementById("modalDescription");\n          const modalPill = document.getElementById("modalPill");\n          const modalCoverContainer = document.getElementById(\n            "modalCoverContainer",\n          );\n          const modalSaveShelfBtn =\n            document.getElementById("modalSaveShelfBtn");\n          let activeModalBook = null;\n\n          function renderBookCards(books) {\n            if (!books.length) {\n              bookGrid.innerHTML = "";\n              emptyState.classList.remove("hidden");\n              emptyState.classList.add("flex");\n              displayedCount.textContent = "0";\n              return;\n            }\n\n            emptyState.classList.add("hidden");\n            emptyState.classList.remove("flex");\n            displayedCount.textContent = books.length;\n            resultsCountBadge.textContent = `${books.length} Volume Editions`;\n\n            bookGrid.className = isCompactView\n              ? "grid grid-cols-1 gap-4"\n              : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6";\n\n            bookGrid.innerHTML = books\n              .map((book) => {\n                const isBookmarked = savedBookmarks.has(book.id);\n\n                if (isCompactView) {\n                  return `\n            <article class="bg-surface-container-lowest rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">\n              <div class="flex items-center gap-4 min-w-0">\n                <div class="w-14 h-20 rounded-md overflow-hidden bg-surface-container shrink-0 shadow-sm">\n                  <img src="placeholder" alt="${book.imageAlt}" class="w-full h-full object-cover">\n                </div>\n                <div class="min-w-0">\n                  <div class="flex items-center gap-2">\n                    <span class="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-bold">${book.langCode}</span>\n                    <span class="text-on-surface-variant font-label-sm text-label-sm">${book.genre}</span>\n                  </div>\n                  <h3 class="font-headline-sm text-headline-sm text-primary truncate hover:text-secondary cursor-pointer mt-0.5" onclick="window.__openBookModal(\'${book.id}\')">${book.title}</h3>\n                  <p class="font-body-sm text-body-sm text-on-surface-variant">${book.author} &bull; ${book.year} &bull; ${book.pages} p.</p>\n                </div>\n              </div>\n              <div class="flex items-center gap-3 shrink-0 self-end sm:self-center">\n                <button onclick="window.__toggleBookmark(\'${book.id}\', this)" class="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center transition-colors ${isBookmarked ? "text-status-danger" : "text-on-surface-variant"}">\n                  <span class="material-symbols-outlined text-[20px]" style="${isBookmarked ? "font-variation-settings: \'FILL\' 1;" : ""}">bookmark</span>\n                </button>\n                <button onclick="window.__openBookModal(\'${book.id}\')" class="px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold transition-all shadow-sm">\n                  View Details\n                </button>\n              </div>\n            </article>\n          `;\n                }\n\n                return `\n          <article class="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">\n            <div class="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">\n              <img src="placeholder" alt="${book.imageAlt}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">\n              <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>\n              \n              <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">\n                <span class="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">${book.langCode}</span>\n                <span class="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">${book.level}</span>\n              </div>\n\n              <button onclick="window.__toggleBookmark(\'${book.id}\', this)" aria-label="Bookmark Book" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${isBookmarked ? "text-status-danger" : "text-on-surface-variant"}">\n                <span class="material-symbols-outlined text-[20px]" style="${isBookmarked ? "font-variation-settings: \'FILL\' 1;" : ""}">bookmark</span>\n              </button>\n\n              <div class="absolute bottom-3 left-3 right-3">\n                <span class="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">${book.genre}</span>\n              </div>\n            </div>\n\n            <div class="p-5 flex flex-col flex-grow justify-between space-y-4">\n              <div class="space-y-1.5">\n                <h3 class="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer" onclick="window.__openBookModal(\'${book.id}\')">\n                  ${book.title}\n                </h3>\n                <p class="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">\n                  <span>${book.author}</span>\n                  <span class="material-symbols-outlined text-[14px] text-secondary">open_in_new</span>\n                </p>\n                <p class="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">\n                  ${book.description}\n                </p>\n              </div>\n\n              <div class="pt-3 border-t-0 space-y-3">\n                <div class="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">\n                  <span class="flex items-center gap-1">\n                    <span class="material-symbols-outlined text-[16px]">menu_book</span>\n                    ${book.pages} pages\n                  </span>\n                  <span class="flex items-center gap-1 font-semibold text-primary">\n                    <span class="material-symbols-outlined text-[16px]">event</span>\n                    ${book.year}\n                  </span>\n                </div>\n\n                <button onclick="window.__openBookModal(\'${book.id}\')" class="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center">\n                  View Details\n                </button>\n              </div>\n            </div>\n          </article>\n        `;\n              })\n              .join("");\n          }\n\n          function getSelectedGenres() {\n            const checked = document.querySelectorAll(\n              ".genre-checkbox:checked",\n            );\n            return Array.from(checked).map((c) => c.value);\n          }\n\n          function filterAndSortBooks() {\n            const query = (searchInput.value || "").trim().toLowerCase();\n            const selectedGenres = getSelectedGenres();\n\n            let filtered = rawBooks.filter((book) => {\n              if (query) {\n                const matchTitle = book.title.toLowerCase().includes(query);\n                const matchAuthor = book.author.toLowerCase().includes(query);\n                const matchDesc = book.description\n                  .toLowerCase()\n                  .includes(query);\n                if (!matchTitle && !matchAuthor && !matchDesc) return false;\n              }\n\n              if (\n                currentLanguage !== "all" &&\n                book.language !== currentLanguage\n              ) {\n                return false;\n              }\n\n              if (\n                selectedGenres.length > 0 &&\n                !selectedGenres.includes(book.genre)\n              ) {\n                return false;\n              }\n\n              if (\n                currentReadingLevel !== "all" &&\n                book.level !== currentReadingLevel\n              ) {\n                return false;\n              }\n\n              if (currentPeriod === "before-1950" && book.year >= 1950)\n                return false;\n              if (\n                currentPeriod === "1950-2000" &&\n                (book.year < 1950 || book.year > 2000)\n              )\n                return false;\n              if (currentPeriod === "after-2000" && book.year <= 2000)\n                return false;\n\n              return true;\n            });\n\n            const sortVal = sortSelect.value;\n            filtered.sort((a, b) => {\n              if (sortVal === "title-az") return a.title.localeCompare(b.title);\n              if (sortVal === "year-newest") return b.year - a.year;\n              if (sortVal === "year-oldest") return a.year - b.year;\n              if (sortVal === "pages-short") return a.pages - b.pages;\n              return 0;\n            });\n\n            updateActiveFilterCountBadge();\n            renderBookCards(filtered);\n          }\n\n          function updateActiveFilterCountBadge() {\n            let count = 0;\n            if (searchInput.value.trim()) count++;\n            if (currentLanguage !== "all") count++;\n            if (getSelectedGenres().length > 0)\n              count += getSelectedGenres().length;\n            if (currentReadingLevel !== "all") count++;\n            if (currentPeriod !== "all") count++;\n\n            if (count > 0) {\n              activeFilterBadge.textContent = count;\n              activeFilterBadge.classList.remove("hidden");\n            } else {\n              activeFilterBadge.classList.add("hidden");\n            }\n          }\n\n          function resetFilters() {\n            searchInput.value = "";\n            currentLanguage = "all";\n            currentReadingLevel = "all";\n            currentPeriod = "all";\n\n            document\n              .querySelectorAll(".genre-checkbox")\n              .forEach((cb) => (cb.checked = false));\n\n            document.querySelectorAll(".lang-btn").forEach((btn) => {\n              if (btn.getAttribute("data-lang") === "all") {\n                btn.className =\n                  "lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-primary text-on-primary font-semibold shadow-sm transition-all";\n              } else {\n                btn.className =\n                  "lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all";\n              }\n            });\n\n            document.querySelectorAll(".level-btn").forEach((btn) => {\n              if (btn.getAttribute("data-level") === "all") {\n                btn.className =\n                  "level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-semibold transition-all";\n              } else {\n                btn.className =\n                  "level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all";\n              }\n            });\n\n            const allRadio = document.querySelector(\n              \'input[name="period"][value="all"]\',\n            );\n            if (allRadio) allRadio.checked = true;\n\n            sortSelect.value = "title-az";\n            filterAndSortBooks();\n          }\n\n          window.__toggleBookmark = function (id, btn) {\n            if (savedBookmarks.has(id)) {\n              savedBookmarks.delete(id);\n              btn.classList.remove("text-status-danger");\n              btn.classList.add("text-on-surface-variant");\n              btn.innerHTML = `<span class="material-symbols-outlined text-[20px]">bookmark</span>`;\n            } else {\n              savedBookmarks.add(id);\n              btn.classList.remove("text-on-surface-variant");\n              btn.classList.add("text-status-danger");\n              btn.innerHTML = `<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: \'FILL\' 1;">bookmark</span>`;\n            }\n          };\n\n          window.__openBookModal = function (id) {\n            const book = rawBooks.find((b) => b.id === id);\n            if (!book) return;\n\n            activeModalBook = book;\n            modalTitle.textContent = book.title;\n            modalAuthor.textContent = `By ${book.author}`;\n            modalMeta.textContent = `${book.language} Edition &bull; ${book.year} &bull; ${book.pages} pages &bull; Reading Level: ${book.level}`;\n            modalDescription.textContent = book.description;\n            modalPill.textContent = book.genre;\n            modalCoverContainer.innerHTML = `<img src="placeholder" alt="${book.imageAlt}" class="w-full h-full object-cover">`;\n\n            const isBookmarked = savedBookmarks.has(book.id);\n            modalSaveShelfBtn.innerHTML = `\n        <span class="material-symbols-outlined text-[18px]" style="${isBookmarked ? "font-variation-settings: \'FILL\' 1;" : ""}">\n          ${isBookmarked ? "bookmark_added" : "bookmark_add"}\n        </span>\n        ${isBookmarked ? "Saved in Shelf" : "Save to Shelf"}\n      `;\n\n            detailsModal.classList.remove("hidden");\n            detailsModal.classList.add("flex");\n          };\n\n          function closeModal() {\n            detailsModal.classList.add("hidden");\n            detailsModal.classList.remove("flex");\n            activeModalBook = null;\n          }\n\n          closeModalBtn.addEventListener("click", closeModal);\n          modalCloseActionBtn.addEventListener("click", closeModal);\n          detailsModal.addEventListener("click", (e) => {\n            if (e.target === detailsModal) closeModal();\n          });\n\n          modalSaveShelfBtn.addEventListener("click", () => {\n            if (!activeModalBook) return;\n            if (savedBookmarks.has(activeModalBook.id)) {\n              savedBookmarks.delete(activeModalBook.id);\n              modalSaveShelfBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">bookmark_add</span> Save to Shelf`;\n            } else {\n              savedBookmarks.add(activeModalBook.id);\n              modalSaveShelfBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: \'FILL\' 1;">bookmark_added</span> Saved in Shelf`;\n            }\n            filterAndSortBooks();\n          });\n\n          document.querySelectorAll(".lang-btn").forEach((btn) => {\n            btn.addEventListener("click", () => {\n              document.querySelectorAll(".lang-btn").forEach((b) => {\n                b.className =\n                  "lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all";\n              });\n              btn.className =\n                "lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-primary text-on-primary font-semibold shadow-sm transition-all";\n              currentLanguage = btn.getAttribute("data-lang");\n              filterAndSortBooks();\n            });\n          });\n\n          document.querySelectorAll(".level-btn").forEach((btn) => {\n            btn.addEventListener("click", () => {\n              document.querySelectorAll(".level-btn").forEach((b) => {\n                b.className =\n                  "level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all" +\n                  (b.getAttribute("data-level") === "Advanced"\n                    ? " col-span-3"\n                    : "");\n              });\n              btn.className =\n                "level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-semibold shadow-sm transition-all" +\n                (btn.getAttribute("data-level") === "Advanced"\n                  ? " col-span-3"\n                  : "");\n              currentReadingLevel = btn.getAttribute("data-level");\n              filterAndSortBooks();\n            });\n          });\n\n          document.querySelectorAll(".genre-checkbox").forEach((cb) => {\n            cb.addEventListener("change", filterAndSortBooks);\n          });\n\n          document.querySelectorAll(".period-radio").forEach((rb) => {\n            rb.addEventListener("change", (e) => {\n              currentPeriod = e.target.value;\n              filterAndSortBooks();\n            });\n          });\n\n          searchInput.addEventListener("input", filterAndSortBooks);\n          sortSelect.addEventListener("change", filterAndSortBooks);\n          clearAllFiltersBtn.addEventListener("click", resetFilters);\n          emptyResetBtn.addEventListener("click", resetFilters);\n\n          toggleFilterBtn.addEventListener("click", () => {\n            sidebarOpen = !sidebarOpen;\n            if (sidebarOpen) {\n              filterSidebar.classList.remove("hidden");\n              bookCatalogSection.className =\n                "lg:col-span-9 transition-all duration-300";\n            } else {\n              filterSidebar.classList.add("hidden");\n              bookCatalogSection.className =\n                "lg:col-span-12 transition-all duration-300";\n            }\n          });\n\n          viewGridBtn.addEventListener("click", () => {\n            isCompactView = false;\n            viewGridBtn.className =\n              "w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm";\n            viewListBtn.className =\n              "w-8 h-8 rounded-full text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors";\n            filterAndSortBooks();\n          });\n\n          viewListBtn.addEventListener("click", () => {\n            isCompactView = true;\n            viewListBtn.className =\n              "w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm";\n            viewGridBtn.className =\n              "w-8 h-8 rounded-full text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors";\n            filterAndSortBooks();\n          });\n\n          filterAndSortBooks();\n        })();\n      ',
];

export default function BooksDirectorySmartSearchBookbridge() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "books_directory_smart_search_bookbridge",
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
          <div className="w-full bg-surface-container-low/60 py-12 px-6 lg:px-12 relative overflow-hidden">
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-surface-container-high/40 blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-80 h-32 bg-surface-variant/30 blur-2xl pointer-events-none" />
            <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[15px]">
                    auto_stories
                  </span>
                  Universal Archive Edition
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Books Directory
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Explore our curated catalog of world literature and timeless
                  stories spanning centuries, tongues, and civilizational epics.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-lowest p-2 rounded-xl shadow-sm self-start md:self-auto">
                <div className="px-4 py-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    library_books
                  </span>
                  <div>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Catalog Status
                    </span>
                    <span
                      className="font-label-md text-label-md text-primary font-bold"
                      id="resultsCountBadge"
                    >
                      20 Volume Editions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-all shadow-sm"
                  id="toggleFilterBtn"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    tune
                  </span>
                  <span>Filters</span>
                  <span
                    className="hidden px-2 py-0.2 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm"
                    id="activeFilterBadge"
                  >
                    0
                  </span>
                </button>
                <p
                  className="font-label-md text-label-md text-on-surface-variant font-medium"
                  id="resultsCounter"
                >
                  Showing
                  <span className="font-bold text-primary" id="displayedCount">
                    20
                  </span>
                  of <span className="font-bold text-primary">20</span> books
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px] pointer-events-none">
                    sort
                  </span>
                  <select
                    className="pl-9 pr-8 py-2 rounded-full bg-surface-container-lowest font-label-md text-label-md text-primary shadow-sm hover:bg-surface-container-low transition-all appearance-none cursor-pointer focus:outline-none"
                    id="sortSelect"
                  >
                    <option value="title-az">Sort: Title (A-Z)</option>
                    <option value="year-newest">
                      Sort: Publication Year (Newest)
                    </option>
                    <option value="year-oldest">
                      Sort: Publication Year (Oldest)
                    </option>
                    <option value="pages-short">
                      Sort: Page Count (Short to Long)
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 text-on-surface-variant text-[16px] pointer-events-none">
                    expand_more
                  </span>
                </div>
                <div className="flex items-center bg-surface-container p-1 rounded-full shadow-inner">
                  <button
                    aria-label="Grid View"
                    className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm"
                    id="viewGridBtn"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      grid_view
                    </span>
                  </button>
                  <button
                    aria-label="Compact View"
                    className="w-8 h-8 rounded-full text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors"
                    id="viewListBtn"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      view_agenda
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <aside
                className="lg:col-span-3 transition-all duration-300"
                id="filterSidebar"
              >
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-6 sticky top-28">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">
                        filter_alt
                      </span>
                      Smart Filter
                    </h3>
                    <button
                      className="font-label-sm text-label-sm text-status-danger hover:underline font-semibold flex items-center gap-1 transition-all"
                      id="clearAllFiltersBtn"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        refresh
                      </span>
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Search Directory
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                        search
                      </span>
                      <input
                        className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-primary placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none transition-all shadow-inner"
                        id="searchInput"
                        placeholder="Title, author, or keyword..."
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Language Filter
                    </label>
                    <div
                      className="flex flex-wrap gap-1.5"
                      id="languageFilters"
                    >
                      <button
                        className="lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-primary text-on-primary font-semibold shadow-sm transition-all"
                        data-lang="all"
                      >
                        All
                      </button>
                      <button
                        className="lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
                        data-lang="Vietnamese"
                      >
                        Vietnamese (5)
                      </button>
                      <button
                        className="lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
                        data-lang="English"
                      >
                        English (6)
                      </button>
                      <button
                        className="lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
                        data-lang="French"
                      >
                        French (3)
                      </button>
                      <button
                        className="lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
                        data-lang="Japanese"
                      >
                        Japanese (3)
                      </button>
                      <button
                        className="lang-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
                        data-lang="Spanish"
                      >
                        Spanish (3)
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Genre Category
                    </label>
                    <div
                      className="space-y-1.5 max-h-48 overflow-y-auto pr-1"
                      id="genreCheckboxes"
                    >
                      <label className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary font-body-sm text-body-sm">
                        <input
                          className="genre-checkbox w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary"
                          type="checkbox"
                          defaultValue="Fiction"
                        />
                        <span>Fiction</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary font-body-sm text-body-sm">
                        <input
                          className="genre-checkbox w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary"
                          type="checkbox"
                          defaultValue="Non-Fiction"
                        />
                        <span>Non-Fiction</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary font-body-sm text-body-sm">
                        <input
                          className="genre-checkbox w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary"
                          type="checkbox"
                          defaultValue="Sci-Fi & Dystopia"
                        />
                        <span>Sci-Fi &amp; Dystopia</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary font-body-sm text-body-sm">
                        <input
                          className="genre-checkbox w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary"
                          type="checkbox"
                          defaultValue="Poetry & Classic"
                        />
                        <span>Poetry &amp; Classic</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary font-body-sm text-body-sm">
                        <input
                          className="genre-checkbox w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary"
                          type="checkbox"
                          defaultValue="Philosophy"
                        />
                        <span>Philosophy</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary font-body-sm text-body-sm">
                        <input
                          className="genre-checkbox w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary"
                          type="checkbox"
                          defaultValue="Mystery"
                        />
                        <span>Mystery</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Reading Level
                    </label>
                    <div
                      className="grid grid-cols-3 gap-1.5"
                      id="readingLevelFilters"
                    >
                      <button
                        className="level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-semibold transition-all"
                        data-level="all"
                      >
                        All
                      </button>
                      <button
                        className="level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
                        data-level="Beginner"
                      >
                        Beginner
                      </button>
                      <button
                        className="level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
                        data-level="Intermediate"
                      >
                        Interm.
                      </button>
                      <button
                        className="level-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all col-span-3"
                        data-level="Advanced"
                      >
                        Advanced Academic
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Publication Era
                    </label>
                    <div
                      className="space-y-1.5 font-body-sm text-body-sm"
                      id="periodFilters"
                    >
                      <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary">
                        <input
                          defaultChecked
                          className="period-radio w-4 h-4 text-secondary accent-secondary"
                          name="period"
                          type="radio"
                          defaultValue="all"
                        />
                        <span>All Eras</span>
                      </label>
                      <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary">
                        <input
                          className="period-radio w-4 h-4 text-secondary accent-secondary"
                          name="period"
                          type="radio"
                          defaultValue="before-1950"
                        />
                        <span>Before 1950 (Classics)</span>
                      </label>
                      <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary">
                        <input
                          className="period-radio w-4 h-4 text-secondary accent-secondary"
                          name="period"
                          type="radio"
                          defaultValue="1950-2000"
                        />
                        <span>1950 – 2000 (Mid-Century)</span>
                      </label>
                      <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors text-primary">
                        <input
                          className="period-radio w-4 h-4 text-secondary accent-secondary"
                          name="period"
                          type="radio"
                          defaultValue="after-2000"
                        />
                        <span>After 2000 (Contemporary)</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low/80 space-y-2">
                    <div className="flex items-center gap-2 text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[16px]">
                        info
                      </span>
                      Archival Metadata Note
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Editions are cross-verified with standard bibliographic
                      records and open-access library registries.
                    </p>
                  </div>
                </div>
              </aside>
              <section
                className="lg:col-span-9 transition-all duration-300"
                id="bookCatalogSection"
              >
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  id="bookGrid"
                >
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Minimalist book cover featuring a piercing mechanical eye rendered in vintage dark navy, stark deep blue, and muted gold accents with crisp mid-century typography."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          EN
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark("1984", event.currentTarget);
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-status-danger"
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Sci-Fi &amp; Dystopia
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("1984");
                          }}
                        >
                          1984
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>George Orwell</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          A terrifying dystopian forecast about totalitarian
                          surveillance, Winston Smith's quiet rebellion, and the
                          manipulation of historical truth.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            328 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1949
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("1984");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Dark brooding philosophical book cover with shadowy Saint Petersburg stone bridges, misty gas lamps, and high-contrast dramatic typography."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          EN
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Advanced
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "crime-punishment",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Philosophy
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("crime-punishment");
                          }}
                        >
                          Crime and Punishment
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Fyodor Dostoevsky</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          The psychological torment of Raskolnikov after he
                          commits murder to validate his theory of extraordinary
                          men exempt from moral laws.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            671 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1866
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("crime-punishment");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Charming editorial watercolor book illustration showing a gallant grasshopper cricket wandering through vibrant blades of green meadow grass and dewdrops."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          VI
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Beginner
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "de-men",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("de-men");
                          }}
                        >
                          Dế Mèn Phiêu Lưu Ký
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Tô Hoài</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          A cherished coming-of-age fable following the
                          adventures of an arrogant young cricket as he
                          discovers empathy, camaraderie, and freedom.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            196 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1941
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("de-men");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Escher-inspired labyrinth book cover showcasing infinite twisting library staircases and mirrored geometrical pathways in slate blue and gold."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          ES
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Advanced
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "ficciones",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Mystery
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("ficciones");
                          }}
                        >
                          Ficciones
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Jorge Luis Borges</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Dazzling labyrinthine short stories exploring infinite
                          libraries, speculative heresies, secret societies, and
                          the nature of infinity.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            174 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1944
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("ficciones");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Serene Japanese woodcut aesthetic book cover showing fallen autumn maple leaves floating upon a quiet ripple of dark garden pond water."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          JA
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "kokoro",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Poetry &amp; Classic
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("kokoro");
                          }}
                        >
                          Kokoro
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Natsume Sōseki</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          A moving meditation on the loneliness of the
                          individual navigating Meiji-era Japan, told through
                          the friendship between a student and 'Sensei'.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            248 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1914
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("kokoro");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Sun-bleached stark book cover showing an intense blinding white-gold Mediterranean sun casting deep geometric shadows across an empty beach."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          FR
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "stranger",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Philosophy
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("stranger");
                          }}
                        >
                          L'Étranger (The Stranger)
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Albert Camus</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Meursault passively confronts the absurdity of human
                          existence beneath the blinding Mediterranean sun on an
                          Algerian shore.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            159 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1942
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("stranger");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Warm charcoal and sepia book cover showing an elderly Vietnamese farmer stroking a gentle golden hound against a simple thatched garden cottage."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          VI
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "lao-hac",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("lao-hac");
                          }}
                        >
                          Lão Hạc và Tuyển Tập
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Nam Cao</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          An unforgettable, heartbreaking portrait of old farmer
                          Lão Hạc and his beloved dog Vàng, exemplifying noble
                          dignity amidst crippling poverty.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            184 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1943
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("lao-hac");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Artistic celestial book cover depicting a tiny prince in an open coat standing upon a curved asteroid with stars and a delicate rose against deep lapis lazuli space."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          FR
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Beginner
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "le-petit-prince",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Philosophy
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("le-petit-prince");
                          }}
                        >
                          Le Petit Prince
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Antoine de Saint-Exupéry</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          A poetic philosophical tale where an interplanetary
                          child traveler teaches a stranded aviator profound
                          secrets regarding human affection.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            140 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1943
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("le-petit-prince");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Exquisite 19th-century French editorial cover with velvet textures, vintage lace motifs, and melancholy blue oil painting flourishes."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          FR
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Advanced
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "madame-bovary",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Poetry &amp; Classic
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("madame-bovary");
                          }}
                        >
                          Madame Bovary
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Gustave Flaubert</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Emma Bovary seeks romantic ecstasy and aristocratic
                          luxury to escape the suffocating tedium of provincial
                          marital life.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            429 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1856
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("madame-bovary");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Minimalist Japanese book cover rendered in duo-tone crimson and midnight blue featuring quiet misty pine forest hills under cold rain."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          JA
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "norwegian-wood",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("norwegian-wood");
                          }}
                        >
                          Norwegian Wood
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Haruki Murakami</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Toru Watanabe reflects upon his quiet Tokyo university
                          years during the late 1960s, intertwined with memory,
                          loss, and bittersweet music.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            296 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1987
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("norwegian-wood");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Magical realist book cover displaying lush tropical banana leaves, golden yellow butterflies swirling, and mythical architectural archways."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          ES
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Advanced
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "solitude",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-status-danger"
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("solitude");
                          }}
                        >
                          One Hundred Years of Solitude
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Gabriel García Márquez</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Seven generations of the Buendía dynasty live through
                          wonder, madness, and incestuous isolation in the
                          mythical river town of Macondo.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            417 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1967
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("solitude");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Haunting desert book cover featuring cracked arid clay earth, bleached adobe walls, and ghostly silhouettes under a blazing cobalt sky."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          ES
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "pedro-paramo",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Poetry &amp; Classic
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("pedro-paramo");
                          }}
                        >
                          Pedro Páramo
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Juan Rulfo</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Juan Preciado journeys to Comala in search of his
                          long-lost father, only to find a desolate ghost town
                          inhabited solely by murmuring specters.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            128 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1955
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("pedro-paramo");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Traditional Japanese ink wash sumi-e style book cover depicting the imposing weathered wooden beams of Kyoto gate under torrential rain."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          JA
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Advanced
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "rashomon",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Mystery
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("rashomon");
                          }}
                        >
                          Rashomon and Other Stories
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Ryūnosuke Akutagawa</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Psychological explorations of subjective truth, guilt,
                          and human fragility framed by a dilapidated ancient
                          Kyoto gate in heavy downpour.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            224 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1915
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("rashomon");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Contemporary non-fiction book cover featuring a pale human ochre handprint impression against clean white slate and crisp modern editorial serif typography."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          EN
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "sapiens",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Non-Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("sapiens");
                          }}
                        >
                          Sapiens: A Brief History
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Yuval Noah Harari</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          A panoramic examination of how an insignificant ape
                          became the master of planet Earth through the unique
                          ability to create collective fiction.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            443 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            2011
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("sapiens");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Sharp satirical book cover in 1930s Indochine retro poster styling, featuring a comically flamboyant gentleman in a checkered colonial suit."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          VI
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark("so-do", event.currentTarget);
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("so-do");
                          }}
                        >
                          Số Đỏ (Dumb Luck)
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Vũ Trọng Phụng</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          A blistering satirical masterpiece exposing bourgeois
                          hypocrisy in French-colonial Hanoi through the
                          preposterous rise of street ball-boy Xuân Tóc Đỏ.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            256 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1936
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("so-do");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Deep sepia tone dramatic book cover with the silhouette of a determined peasant woman carrying burdens into the stormy night darkness."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          VI
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "tat-den",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("tat-den");
                          }}
                        >
                          Tắt Đèn
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Ngô Tất Tố</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          A poignant realist narrative portraying the fierce
                          resilience of Chị Dậu during an oppressive rural tax
                          season in northern Vietnam.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            216 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1939
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("tat-den");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Art deco literary book cover with luminous celestial eyes looking down over the golden glowing skylines and champagne silhouettes of the roaring 1920s."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          EN
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "great-gatsby",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("great-gatsby");
                          }}
                        >
                          The Great Gatsby
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>F. Scott Fitzgerald</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          The quintessential portrait of the Jazz Age, detailing
                          Jay Gatsby's obsessive yearning for Daisy Buchanan
                          amid decadent Long Island estates.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            208 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1925
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("great-gatsby");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Striking cognitive science book cover featuring dual brain hemispheres illustrated as intersecting geometric gears in slate navy and warm amber."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          EN
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "thinking-fast-slow",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Non-Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("thinking-fast-slow");
                          }}
                        >
                          Thinking, Fast and Slow
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Daniel Kahneman</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Nobel laureate Kahneman explores the two cognitive
                          systems that drive human choice: System 1
                          (instinctive) and System 2 (deliberative).
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            499 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            2011
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("thinking-fast-slow");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Moody atmospheric southern gothic book cover featuring the silhouette of a solitary mockingbird perched in an old oak branch at dusky sunset."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          EN
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Intermediate
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "kill-mockingbird",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Fiction
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("kill-mockingbird");
                          }}
                        >
                          To Kill a Mockingbird
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Harper Lee</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          Scout Finch narrates childhood in Depression-era
                          Alabama as her father, Atticus, defends a Black man
                          falsely accused in a racially divided town.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            281 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1960
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("kill-mockingbird");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative w-full aspect-[2/3] bg-surface-container overflow-hidden">
                      <img
                        src="placeholder"
                        alt="Intricate traditional Vietnamese woodcut print book cover of a poetic maiden by a willow tree in rich indigo, subtle gold, and aged parchment tones."
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold text-primary shadow-sm">
                          VI
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md font-label-sm text-label-sm text-on-primary shadow-sm">
                          Advanced
                        </span>
                      </div>
                      <button
                        onClick={(event) => {
                          window.__toggleBookmark(
                            "truyen-kieu",
                            event.currentTarget,
                          );
                        }}
                        aria-label="Bookmark Book"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm text-status-danger"
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          bookmark
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high/90 backdrop-blur-sm text-secondary font-label-sm text-label-sm font-medium mb-1 shadow-sm">
                          Poetry &amp; Classic
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3
                          className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={(event) => {
                            window.__openBookModal("truyen-kieu");
                          }}
                        >
                          Truyện Kiều
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1">
                          <span className>Nguyễn Du</span>
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            open_in_new
                          </span>
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2">
                          The crown jewel of Vietnamese literary heritage,
                          recounting the epic fifteen-year tribulation of the
                          virtuous, talented Thúy Kiều in lục bát verse.
                        </p>
                      </div>
                      <div className="pt-3 border-t-0 space-y-3">
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              menu_book
                            </span>
                            280 pages
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                              event
                            </span>
                            1820
                          </span>
                        </div>
                        <button
                          onClick={(event) => {
                            window.__openBookModal("truyen-kieu");
                          }}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-all text-center"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
                <div
                  className="hidden flex-col items-center justify-center p-12 lg:p-20 text-center bg-surface-container-lowest rounded-3xl shadow-sm space-y-6 my-4"
                  id="emptyState"
                >
                  <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[48px]">
                      search_off
                    </span>
                  </div>
                  <div className="max-w-md space-y-2">
                    <h3 className="font-headline-md text-headline-md text-primary">
                      No volumes discovered
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      We couldn't find any books matching your specific
                      combination of filters. Try broadening your keywords or
                      clearing criteria.
                    </p>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md transition-all shadow-md"
                    id="emptyResetBtn"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      history
                    </span>
                    Reset All Filters
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div
            className="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-primary/40 backdrop-blur-sm"
            id="detailsModal"
          >
            <div className="bg-surface-container-lowest max-w-xl w-full rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-all"
                id="closeModalBtn"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="flex gap-6 items-start">
                <div
                  className="w-32 h-48 rounded-lg overflow-hidden shrink-0 shadow-md"
                  id="modalCoverContainer"
                />
                <div className="space-y-2">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm font-semibold"
                    id="modalPill"
                  />
                  <h2
                    className="font-headline-md text-headline-md text-primary"
                    id="modalTitle"
                  />
                  <p
                    className="font-label-md text-label-md text-on-surface-variant font-medium"
                    id="modalAuthor"
                  />
                  <p
                    className="font-body-sm text-body-sm text-on-surface-variant"
                    id="modalMeta"
                  />
                </div>
              </div>
              <p
                className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
                id="modalDescription"
              />
              <div className="flex justify-end gap-3 pt-4 border-t-0">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-all"
                  id="modalSaveShelfBtn"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    bookmark_add
                  </span>
                  Save to Shelf
                </button>
                <button
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md transition-all"
                  id="modalCloseActionBtn"
                >
                  Done
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
