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
  '\n        (function initBookBridgeGallery() {\n          const galleryItems = [\n            {\n              id: "1",\n              title: "Truyện Kiều",\n              author: "Nguyễn Du",\n              year: "1820 / 1925 Special Folio",\n              lang: "Vietnamese / Nôm",\n              caption:\n                "Ornate traditional Vietnamese lacquer cover motif with embossed gold foil details portraying Thúy Kiều under weeping willow branches.",\n              ack: "Preservation digitization courtesy of National Library of Vietnam • Rare Books Vault MARC-21",\n              alt: "Exquisite antique Vietnamese book cover of Truyen Kieu by Nguyen Du featuring ornate deep crimson and gilded gold lacquer artwork depicting an elegant woman beside willow branches and traditional pagoda lake landscape in classical East Asian woodblock engraving style.",\n            },\n            {\n              id: "2",\n              title: "Le Petit Prince (The Little Prince)",\n              author: "Antoine de Saint-Exupéry",\n              year: "Gallimard / Reynal & Hitchcock 1943",\n              lang: "French",\n              caption:\n                "Original watercolor cover art depicting the Little Prince standing solitary on Asteroid B-612, surrounded by his beloved rose and miniature active volcanoes under a soft starry cosmos.",\n              ack: "Public Domain worldwide / Digitized via Open Library Archive • High-resolution preservation copy MARC-21 compliant",\n              alt: "Original first edition French book cover of Le Petit Prince by Antoine de Saint-Exupery with iconic minimalist watercolor illustration of the Little Prince standing in long scarf atop Asteroid B-612 surrounded by celestial stars and a bright red rose against pale parchment cream sky.",\n            },\n            {\n              id: "3",\n              title: "1984",\n              author: "George Orwell",\n              year: "Secker & Warburg 1949",\n              lang: "English",\n              caption:\n                "Constructivist graphic design featuring severe geometric red and charcoal typography with an ominous omnipresent eye silhouette representing state surveillance.",\n              ack: "Internet Archive Rare Book Division • London 1949 Print Preservation",\n              alt: "Constructivist minimalist book cover of 1984 by George Orwell featuring bold stark red and dark charcoal geometric typographic layout with a towering graphic all-seeing surveillance eye and vintage paper grain texture.",\n            },\n            {\n              id: "4",\n              title: "The Great Gatsby",\n              author: "F. Scott Fitzgerald",\n              year: "Charles Scribner\'s Sons 1925",\n              lang: "English",\n              caption:\n                "Francis Cugat\'s legendary 1925 \'Celestial Eyes\' dust jacket, blending haunting Art Deco female eyes floating above the glittering Long Island carnival nightlife skyline.",\n              ack: "Scribner Archival Records & Library of Congress Digital Gallery Archive",\n              alt: "Iconic vintage book cover of The Great Gatsby by F. Scott Fitzgerald with the famous celestial eyes painting by Francis Cugat floating over a deep sapphire blue evening sky and dazzling Art Deco glowing carnival city skyline.",\n            },\n            {\n              id: "5",\n              title: "Norwegian Wood",\n              author: "Haruki Murakami",\n              year: "Kodansha 1987",\n              lang: "Japanese",\n              caption:\n                "Two-volume packaging design featuring contrasting crimson red and evergreen forestry with clean modernist Kanji typography.",\n              ack: "Tokyo Modern Literature Archive & Kodansha Typographic Records",\n              alt: "Minimalist modern Japanese book cover design for Norwegian Wood by Haruki Murakami showcasing rich deep forest green backdrop with a delicate crimson red leaf motif and elegant vertical Japanese kanji calligraphy.",\n            },\n            {\n              id: "6",\n              title: "Dế Mèn Phiêu Lưu Ký",\n              author: "Tô Hoài",\n              year: "Kim Đồng 1941 / 1957",\n              lang: "Vietnamese",\n              caption:\n                "Delicate pastoral gouache painting featuring the daring cricket protagonist traversing lush emerald blades of grass across rural northern Vietnamese waterways.",\n              ack: "Preservation Archive Kim Đồng Publishing House Hanoi • Archival Folio",\n              alt: "Lush vintage storybook watercolor illustration for Vietnamese classic De Men Phieu Luu Ky by To Hoai showing an adventurous grasshopper insect character traversing towering dewy green meadow grass and lotus pond bank.",\n            },\n            {\n              id: "7",\n              title: "Crime and Punishment",\n              author: "Fyodor Dostoevsky",\n              year: "The Russian Messenger 1866",\n              lang: "Russian",\n              caption:\n                "Gothic woodcut silhouette of 19th-century Saint Petersburg canals wrapped in winter fog, backlit by an amber gas streetlamp casting long psychological shadows.",\n              ack: "Saint Petersburg Literary Archive • Project Gutenberg Public Domain Repository",\n              alt: "Moody dark atmospheric 19th century Russian book cover of Crime and Punishment by Fyodor Dostoevsky depicting a solitary dark silhouette crossing an arched Saint Petersburg bridge amidst winter mist and glowing amber streetlamp light.",\n            },\n            {\n              id: "8",\n              title: "Số Đỏ (Dumb Luck)",\n              author: "Vũ Trọng Phụng",\n              year: "Hanoi Press 1936",\n              lang: "Vietnamese",\n              caption:\n                "Brilliant 1930s Franco-Vietnamese satirical art deco caricature capturing the farcical bourgeois fashion craze of colonial Hanoi.",\n              ack: "Hanoi University Institute of Literature Preservation Vault • Rare Colonial Printings",\n              alt: "Satirical 1930s French Indochina colonial book cover of So Do Dumb Luck by Vu Trong Phung featuring vibrant retro Art Deco caricature of an eccentric dapper tennis player in vintage Hanoi high society salon style.",\n            },\n            {\n              id: "9",\n              title: "One Hundred Years of Solitude",\n              author: "Gabriel García Márquez",\n              year: "Editorial Sudamericana 1967",\n              lang: "Spanish",\n              caption:\n                "Magical realist lush botanical tapestry bursting with yellow butterflies, tropical jungle ferns, and ancient Macondo alchemical machinery.",\n              ack: "National Library of Colombia & Buenos Aires Sudamericana First Edition Vault",\n              alt: "Lush Latin American magical realism book cover for One Hundred Years of Solitude by Gabriel Garcia Marquez filled with radiant golden yellow butterflies floating through deep emerald tropical jungle foliage and ancient parchment textures.",\n            },\n            {\n              id: "10",\n              title: "Kokoro (こころ)",\n              author: "Natsume Sōseki",\n              year: "Iwanami Shoten 1914",\n              lang: "Japanese",\n              caption:\n                "Traditional Japanese bookbinding Wabi-sabi design with handmade mulberry washi paper texture and authentic brushstroke ink calligraphy.",\n              ack: "Waseda University Cultural Archives • Sōseki Memorial Collection",\n              alt: "Refined wabi-sabi Japanese book cover of Kokoro by Natsume Soseki showing authentic rough textured cream washi paper with traditional four-hole stitch binding and subtle minimalist sumi-e ink brush calligraphy.",\n            },\n            {\n              id: "11",\n              title: "Madame Bovary",\n              author: "Gustave Flaubert",\n              year: "Michel Lévy Frères 1857",\n              lang: "French",\n              caption:\n                "Gilded 19th-century French morocco leather-bound cover with floral hand-tooled gold filigree on burgundy calfskin.",\n              ack: "Bibliothèque nationale de France (BnF) Gallica Digitization Project",\n              alt: "Luxurious antique 19th century French leather bound book cover of Madame Bovary by Gustave Flaubert featuring deep wine burgundy morocco leather with intricate hand-tooled gold filigree ornamentation and embossed spine typography.",\n            },\n            {\n              id: "12",\n              title: "L\'Étranger (The Stranger)",\n              author: "Albert Camus",\n              year: "Gallimard Blanche 1942",\n              lang: "French",\n              caption:\n                "Stark Mediterranean existentialist cover design featuring blinding sunburst geometries over a lone stark silhouette on Algiers sands.",\n              ack: "Gallimard Archives & Centre Culturel Camus Aix-en-Provence",\n              alt: "Existentialist minimalist book cover for L\'Etranger by Albert Camus with stark geometric blinding yellow sun beating down on a solitary black human silhouette walking across white Algerian sand dunes.",\n            },\n          ];\n\n          let currentIndex = 1;\n          let isZoomed = false;\n\n          const modal = document.getElementById("lightboxModal");\n          const closeBtn = document.getElementById("closeLightbox");\n          const prevBtn = document.getElementById("prevSlide");\n          const nextBtn = document.getElementById("nextSlide");\n          const counterEl = document.getElementById("lightboxCounter");\n          const titleEl = document.getElementById("modalBookTitle");\n          const authorEl = document.getElementById("modalAuthor");\n          const langBadgeEl = document.getElementById("modalLangBadge");\n          const yearBadgeEl = document.getElementById("modalYearBadge");\n          const captionEl = document.getElementById("modalCaption");\n          const ackEl = document.getElementById("modalAck");\n          const lightboxImg = document.getElementById("lightboxImage");\n          const zoomBtn = document.getElementById("zoomBtn");\n          const zoomLabel = document.getElementById("zoomLabel");\n          const filterBtns = document.querySelectorAll(".filter-btn");\n          const cards = document.querySelectorAll(".gallery-card");\n          const searchInput = document.getElementById("gallerySearch");\n          const clearSearchBtn = document.getElementById("clearSearch");\n\n          function renderSlide(index) {\n            if (index < 0) index = galleryItems.length - 1;\n            if (index >= galleryItems.length) index = 0;\n            currentIndex = index;\n\n            const item = galleryItems[currentIndex];\n            const slideNum = String(currentIndex + 1).padStart(2, "0");\n            const totalNum = String(galleryItems.length).padStart(2, "0");\n\n            counterEl.textContent = `Slide ${slideNum} of ${totalNum} • ${item.title}`;\n            titleEl.textContent = item.title;\n            authorEl.textContent = item.author;\n            langBadgeEl.textContent = item.lang;\n            yearBadgeEl.textContent = item.year;\n            captionEl.textContent = item.caption;\n            ackEl.textContent = item.ack;\n            lightboxImg.setAttribute("data-alt", item.alt);\n\n            resetZoom();\n          }\n\n          function resetZoom() {\n            isZoomed = false;\n            lightboxImg.classList.remove("scale-150");\n            lightboxImg.classList.add("cursor-zoom-in");\n            lightboxImg.classList.remove("cursor-zoom-out");\n            zoomLabel.textContent = "100%";\n          }\n\n          function toggleZoom() {\n            isZoomed = !isZoomed;\n            if (isZoomed) {\n              lightboxImg.classList.add("scale-150");\n              lightboxImg.classList.remove("cursor-zoom-in");\n              lightboxImg.classList.add("cursor-zoom-out");\n              zoomLabel.textContent = "150%";\n            } else {\n              resetZoom();\n            }\n          }\n\n          function openModal(index) {\n            renderSlide(index);\n            modal.classList.remove("opacity-0", "pointer-events-none");\n            modal.classList.add("opacity-100", "pointer-events-auto");\n            document.body.style.overflow = "hidden";\n          }\n\n          function closeModal() {\n            modal.classList.add("opacity-0", "pointer-events-none");\n            modal.classList.remove("opacity-100", "pointer-events-auto");\n            document.body.style.overflow = "";\n            resetZoom();\n          }\n\n          closeBtn.addEventListener("click", closeModal);\n          modal.addEventListener("click", (e) => {\n            if (e.target === modal) closeModal();\n          });\n\n          prevBtn.addEventListener("click", (e) => {\n            e.stopPropagation();\n            renderSlide(currentIndex - 1);\n          });\n\n          nextBtn.addEventListener("click", (e) => {\n            e.stopPropagation();\n            renderSlide(currentIndex + 1);\n          });\n\n          zoomBtn.addEventListener("click", (e) => {\n            e.stopPropagation();\n            toggleZoom();\n          });\n\n          lightboxImg.addEventListener("click", toggleZoom);\n\n          window.addEventListener("keydown", (e) => {\n            if (modal.classList.contains("pointer-events-none")) return;\n            if (e.key === "Escape") closeModal();\n            if (e.key === "ArrowLeft") renderSlide(currentIndex - 1);\n            if (e.key === "ArrowRight") renderSlide(currentIndex + 1);\n          });\n\n          document.querySelectorAll(".open-lightbox-btn").forEach((btn) => {\n            btn.addEventListener("click", (e) => {\n              e.stopPropagation();\n              const idx = parseInt(btn.getAttribute("data-index"), 10) || 0;\n              openModal(idx);\n            });\n          });\n\n          cards.forEach((card, idx) => {\n            card.addEventListener("click", () => openModal(idx));\n          });\n\n          filterBtns.forEach((btn) => {\n            btn.addEventListener("click", () => {\n              filterBtns.forEach((b) => {\n                b.classList.remove("bg-primary", "text-on-primary");\n                b.classList.add(\n                  "bg-surface-container-low",\n                  "text-on-surface-variant",\n                );\n              });\n              btn.classList.add("bg-primary", "text-on-primary");\n              btn.classList.remove(\n                "bg-surface-container-low",\n                "text-on-surface-variant",\n              );\n\n              const category = btn.getAttribute("data-category");\n              cards.forEach((card) => {\n                const cardCat = card.getAttribute("data-category") || "";\n                if (category === "all" || cardCat.includes(category)) {\n                  card.style.display = "flex";\n                } else {\n                  card.style.display = "none";\n                }\n              });\n            });\n          });\n\n          searchInput.addEventListener("input", (e) => {\n            const q = e.target.value.toLowerCase().trim();\n            clearSearchBtn.classList.toggle("hidden", q.length === 0);\n\n            cards.forEach((card) => {\n              const title = (\n                card.getAttribute("data-title") || ""\n              ).toLowerCase();\n              const author = (\n                card.getAttribute("data-author") || ""\n              ).toLowerCase();\n              if (title.includes(q) || author.includes(q)) {\n                card.style.display = "flex";\n              } else {\n                card.style.display = "none";\n              }\n            });\n          });\n\n          clearSearchBtn.addEventListener("click", () => {\n            searchInput.value = "";\n            clearSearchBtn.classList.add("hidden");\n            cards.forEach((card) => (card.style.display = "flex"));\n          });\n\n          const fullscreenToggle = document.getElementById("fullscreenToggle");\n          fullscreenToggle.addEventListener("click", () => {\n            if (!document.fullscreenElement) {\n              modal.requestFullscreen?.().catch(() => {});\n            } else {\n              document.exitFullscreen?.().catch(() => {});\n            }\n          });\n\n          renderSlide(1);\n        })();\n      ',
];

export default function InteractiveBookGalleryLightboxBookbridge() {
  const rootRef = useRef(null);

  useEffect(() => {
    return initializePrototypePage(rootRef.current, {
      id: "interactive_book_gallery_lightbox_bookbridge",
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
          <div className="relative w-full overflow-hidden bg-surface-canvas pb-16">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-surface-container opacity-60 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none" />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8">
              <div className="flex flex-col items-start gap-4 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-tertiary-container shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    collections_bookmark
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                    Artistic Archives • Visual Cover Curation
                  </span>
                </div>
                <h1 className="font-display-hero text-display-hero text-primary tracking-tight">
                  Interactive Book Gallery
                  <span className="font-headline-lg text-headline-lg italic text-on-tertiary-container font-normal">
                    and Visual Showcase
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                  Experience the visual identity, historical typography, and
                  cover illustrations of world literary treasures. Click any
                  edition to inspect high-resolution artwork in full-screen
                  Lightbox mode with preservation-grade archival metadata.
                </p>
              </div>
              <div className="mt-10 p-4 rounded-xl bg-surface-card shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
                <div
                  className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0"
                  id="filterContainer"
                >
                  <button
                    className="filter-btn active-filter px-4 py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary shadow-sm whitespace-nowrap transition-all"
                    data-category="all"
                  >
                    All Covers (20)
                  </button>
                  <button
                    className="filter-btn px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container whitespace-nowrap transition-all"
                    data-category="classic"
                  >
                    Classic Typography
                  </button>
                  <button
                    className="filter-btn px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container whitespace-nowrap transition-all"
                    data-category="illustrated"
                  >
                    Illustrated Masterpieces
                  </button>
                  <button
                    className="filter-btn px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container whitespace-nowrap transition-all"
                    data-category="modernist"
                  >
                    Modernist Design
                  </button>
                  <button
                    className="filter-btn px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container whitespace-nowrap transition-all"
                    data-category="vintage"
                  >
                    Vintage &amp; Archival
                  </button>
                </div>
                <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="relative w-64">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
                      search
                    </span>
                    <input
                      className="w-full h-10 pl-9 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-card transition-all placeholder:text-outline"
                      id="gallerySearch"
                      placeholder="Search cover or author..."
                      type="text"
                    />
                    <button
                      className="hidden absolute right-2.5 top-2.5 text-outline hover:text-on-surface"
                      id="clearSearch"
                      title="Clear search"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 pl-2">
                    <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                      <button
                        className="p-1.5 rounded bg-surface-card text-primary shadow-xs"
                        title="Grid 4-columns"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          grid_view
                        </span>
                      </button>
                      <button
                        className="p-1.5 rounded text-outline hover:text-on-surface transition-colors"
                        title="Masonry layout"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          dashboard
                        </span>
                      </button>
                      <button
                        className="p-1.5 rounded text-outline hover:text-on-surface transition-colors"
                        title="Compact view"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          view_agenda
                        </span>
                      </button>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-tertiary-container whitespace-nowrap bg-surface-container px-2.5 py-1 rounded-full">
                      20 Curated Editions
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                id="galleryGrid"
              >
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Preservation digitization courtesy of National Library of Vietnam • Rare Books Vault MARC-21"
                  data-author="Nguyễn Du"
                  data-caption="Ornate traditional Vietnamese lacquer cover motif with embossed gold foil details portraying Thúy Kiều under weeping willow branches."
                  data-category="illustrated vintage"
                  data-id={1}
                  data-lang="Vietnamese / Nôm"
                  data-title="Truyện Kiều"
                  data-year="1820 / 1925 Edition"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Exquisite antique Vietnamese book cover of Truyen Kieu by Nguyen Du featuring ornate deep crimson and gilded gold lacquer artwork depicting an elegant woman beside willow branches and traditional pagoda lake landscape in classical East Asian woodblock engraving style."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Zbvv6XRs1lvUs8AwuJ9XDVF2aFVHHB0N7SOVikoK4a8CJOPOvCoQgV-8Ou3awloI4pV1X0vZDcrizhEz8TZ7vDn-jQZNoUwJ4Y4Cjsw3GClphqcUZCIn-cHxIrpx4CD626QSCUM8HTaAdJNxXv_KJuuG-bzrcRl7-SJOtpFvW6ioiVff4GuG1tG9_iOYYQNfxanzY6pql9e-ku_cDADCkjVq9Id0TunNpPYBpA"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Truyện Kiều
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Nguyễn Du • 1820
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={0}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Vietnamese Classic
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1820
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Truyện Kiều
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Nguyễn Du
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Public Domain worldwide / Digitized via Open Library Archive • High-resolution preservation copy MARC-21 compliant"
                  data-author="Antoine de Saint-Exupéry"
                  data-caption="Original watercolor cover art depicting the Little Prince standing solitary on Asteroid B-612, surrounded by his beloved rose and miniature active volcanoes under a soft starry cosmos."
                  data-category="illustrated classic"
                  data-id={2}
                  data-lang="French"
                  data-title="Le Petit Prince"
                  data-year="1943 Original Gallimard"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Original first edition French book cover of Le Petit Prince by Antoine de Saint-Exupery with iconic minimalist watercolor illustration of the Little Prince standing in long scarf atop Asteroid B-612 surrounded by celestial stars and a bright red rose against pale parchment cream sky."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Eh_rJUtXkl1YKsf6aUG3cBjnXRH2iDNyKPDkT7VyNmsBGO0WgtYrFaOoB8KV0XypVvImLlIFqimy2ASmKPufp4g6CK2bJKh7XzoRhI5pHv_fXTsWY5iZytwColznYd8uBwUB5HN6Bm0e5_MHXwHMJu5x3zWFMcIS4LlowOYc-gINj6ddovV1kdeEo4m8bWI6dPXIDB7oygbfY_APnQbjLKbY285hUwFxC0xFbg"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
                      Featured Artwork
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Le Petit Prince
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Antoine de Saint-Exupéry • 1943
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={1}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Fable / Philosophy
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1943
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Le Petit Prince
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Antoine de Saint-Exupéry
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Internet Archive Rare Book Division • London 1949 Print Preservation"
                  data-author="George Orwell"
                  data-caption="Constructivist graphic design featuring severe geometric red and charcoal typography with an ominous omnipresent eye silhouette representing state surveillance."
                  data-category="modernist vintage"
                  data-id={3}
                  data-lang="English"
                  data-title={1984}
                  data-year="1949 Secker & Warburg"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Constructivist minimalist book cover of 1984 by George Orwell featuring bold stark red and dark charcoal geometric typographic layout with a towering graphic all-seeing surveillance eye and vintage paper grain texture."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCufcIuKdcg-4c20DhV8K_YWT4V-3WtGg1QkDcQfJ-IeoK9TXRT7WlGgha56q16NEu4Zbxnp2LALp-usoqqFR5tPcbzCGtx-2I-uTDejktVd6omQhScXPJeClHH_KVVwY97ArKZ2RTTTdMvA8cETZ-UskErFWNj_A58m9ghyhGiNUGlKNawG5pRAotyFZ-c9Ht-r1UJYgmJE6Ht-zABEkumXRT-TCBzTc7a_HRnNw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        1984
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        George Orwell • 1949
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={2}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Dystopian Modernism
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1949
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        1984
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        George Orwell
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Scribner Archival Records & Library of Congress Digital Gallery Archive"
                  data-author="F. Scott Fitzgerald"
                  data-caption="Francis Cugat's legendary 1925 'Celestial Eyes' dust jacket, blending haunting Art Deco female eyes floating above the glittering Long Island carnival nightlife skyline."
                  data-category="classic illustrated"
                  data-id={4}
                  data-lang="English"
                  data-title="The Great Gatsby"
                  data-year="1925 Charles Scribner's Sons"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Iconic vintage book cover of The Great Gatsby by F. Scott Fitzgerald with the famous celestial eyes painting by Francis Cugat floating over a deep sapphire blue evening sky and dazzling Art Deco glowing carnival city skyline."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcY6qaiecleUUKSQ_m5mVd_my0MiCbWGg527r7oShOjP2BSHbmmDHVX4n4aGLZwLeII2xFVO0ewX8eqy_n2tsbxSo-tzwVb6DTXSyzLWj_o_vjwlTokKVwA-nqh8iXVLOf98_T9eInBDTn8jb-QDyICvRZ1XgCrdTxN9br6OMLtTvZbkkZRZZA9Pb6lQPulGkrezxgyem4ZLrSWIiw_ngJbYf3Y99dTAF8c4LUYg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        The Great Gatsby
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        F. Scott Fitzgerald • 1925
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={3}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Jazz Age Art Deco
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1925
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        The Great Gatsby
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        F. Scott Fitzgerald
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Tokyo Modern Literature Archive & Kodansha Typographic Records"
                  data-author="Haruki Murakami"
                  data-caption="Two-volume original packaging design featuring contrasting crimson red and evergreen forestry with clean modernist Kanji typography."
                  data-category="modernist"
                  data-id={5}
                  data-lang="Japanese"
                  data-title="Norwegian Wood"
                  data-year="1987 Kodansha"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Minimalist modern Japanese book cover design for Norwegian Wood by Haruki Murakami showcasing rich deep forest green backdrop with a delicate crimson red leaf motif and elegant vertical Japanese kanji calligraphy."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyHOr2-Np2ZdX0adUrLZGn13_nxXjtvoNn8ZvdCl_OkhyB12Bx9Qx4qmpn9V8dIHM5RtgWSiA728rN9JO27vUUAEWQmycb6UayDIgtqExtIEbpxDPo11KZAg_99L3m7qz5ff-ec_sVrBdDhuCPwdMWXfTckwDeDRN1EWspZfLUv2J2fH5xFsRnCw16Vh0ySy9Vft97hgbIaVETRC74HcKcpws34FqJhtqbA9FTHw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Norwegian Wood
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Haruki Murakami • 1987
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={4}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Contemporary Japanese
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1987
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Norwegian Wood
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Haruki Murakami
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Preservation Archive Kim Đồng Publishing House Hanoi • Archival Folio"
                  data-author="Tô Hoài"
                  data-caption="Delicate pastoral gouache painting featuring the daring cricket protagonist traversing lush emerald blades of grass across rural northern Vietnamese waterways."
                  data-category="illustrated vintage"
                  data-id={6}
                  data-lang="Vietnamese"
                  data-title="Dế Mèn Phiêu Lưu Ký"
                  data-year="1941 / 1957 Kim Đồng"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Lush vintage storybook watercolor illustration for Vietnamese classic De Men Phieu Luu Ky by To Hoai showing an adventurous grasshopper insect character traversing towering dewy green meadow grass and lotus pond bank."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC557dVtCN5hjS6oi4_7O8SzMNRsZECwBVfSunv4qpNLnvFWyRAdUrw3k3wFiRPvcbdbvhTPhp0-Bz7BAmwR9ovBlZ4Bxmf4Q6VquF3UlmpRb0MF798wd9Hg733sX50M8D5MllYg89XDO0vzQ7d2BowRFXmuupFpIi2Vx8FG7F_FXjEP-YlPshOLop_TBru8SrlPxxQvMxZe4aAEx9s-hFPl81G2V7sJePxIKS03g"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Dế Mèn Phiêu Lưu Ký
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Tô Hoài • 1941
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={5}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Children's Literature
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1941
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Dế Mèn Phiêu Lưu Ký
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Tô Hoài
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Saint Petersburg Literary Archive • Project Gutenberg Public Domain Repository"
                  data-author="Fyodor Dostoevsky"
                  data-caption="Gothic woodcut silhouette of 19th-century Saint Petersburg canals wrapped in winter fog, backlit by an amber gas streetlamp casting long psychological shadows."
                  data-category="classic vintage"
                  data-id={7}
                  data-lang="Russian"
                  data-title="Crime and Punishment"
                  data-year="1866 The Russian Messenger"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Moody dark atmospheric 19th century Russian book cover of Crime and Punishment by Fyodor Dostoevsky depicting a solitary dark silhouette crossing an arched Saint Petersburg bridge amidst winter mist and glowing amber streetlamp light."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJgSS7IGGcDgnOZmgxFdrNAINgiZcEVIXwJqEVKVRd-IloEiSC6K5yrEJNaMhWHyTlEv6xHQNBn0cMBGFFHB7iOGrV-QDKzAmyx-ne8b89svfLHA2ooSYVezvGzI5YkKdyMdAAogVtvzlwNY6XwYFk7qDGUiecBOet6QZs7Iuudkl9uwzjCtVl-odCQTZVpOBNiZRYJZzVlyagCQC5jAXjZ3dgZ5mP4Si0YIX8YQ"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Crime and Punishment
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Fyodor Dostoevsky • 1866
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={6}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Russian Realism
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1866
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Crime and Punishment
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Fyodor Dostoevsky
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Hanoi University Institute of Literature Preservation Vault • Rare Colonial Printings"
                  data-author="Vũ Trọng Phụng"
                  data-caption="Brilliant 1930s Franco-Vietnamese satirical art deco caricature capturing the farcical bourgeois fashion craze of colonial Hanoi."
                  data-category="modernist illustrated"
                  data-id={8}
                  data-lang="Vietnamese"
                  data-title="Số Đỏ (Dumb Luck)"
                  data-year="1936 Hanoi"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Satirical 1930s French Indochina colonial book cover of So Do Dumb Luck by Vu Trong Phung featuring vibrant retro Art Deco caricature of an eccentric dapper tennis player in vintage Hanoi high society salon style."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj74qEdPT3mFFT8ggzMYA5NOlYQM__BM2Xm3BKzI5ykvB9bUHkS3OT7LPYE7Aq6mEDzYeigWDLByc_deMc0ZwT39GCBa3DNWY-P_kNzzSA8xcOaX024ks6VelVi6FuF0qsxis_Ayqpu6TF8Zs5cuVKVPSXEgD35xA3EFHQgV3OIaX7QjdMXh5jcVwFoy2cuNEAOy6FOcfTmlGdb97KJFNOpEW9AYuULnmT3aKF3w"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Số Đỏ
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Vũ Trọng Phụng • 1936
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={7}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Satirical Art Deco
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1936
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Số Đỏ (Dumb Luck)
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Vũ Trọng Phụng
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="National Library of Colombia & Buenos Aires Sudamericana First Edition Vault"
                  data-author="Gabriel García Márquez"
                  data-caption="Magical realist lush botanical tapestry bursting with yellow butterflies, tropical jungle ferns, and ancient Macondo alchemical machinery."
                  data-category="illustrated modern"
                  data-id={9}
                  data-lang="Spanish"
                  data-title="Cien Años de Soledad"
                  data-year="1967 Editorial Sudamericana"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Lush Latin American magical realism book cover for One Hundred Years of Solitude by Gabriel Garcia Marquez filled with radiant golden yellow butterflies floating through deep emerald tropical jungle foliage and ancient parchment textures."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWktxZXxoeu-RI_JO9bkMpkR6m0JVxhKuZqwjh77BqPSxeSrluaJmmCyCGfcv5aN_eLYA0zVZK58IRMpkDnktplASYCj7J-eI3Ma1mJYjDhhrv_juojlJF4U6Q8gUc7nsr9ghAT2V2rzTQ4mBt2dKmJ09TBwCFJutxVfR8lJEzw8B_7Jzjcyjw8wqnS2i8yiNJPzs4ISqLmK708Gd4hVG2_Sj7JbFNqYuU3XhZhA"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Cien Años de Soledad
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        G. García Márquez • 1967
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={8}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Magical Realism
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1967
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        One Hundred Years of Solitude
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Gabriel García Márquez
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Waseda University Cultural Archives • Sōseki Memorial Collection"
                  data-author="Natsume Sōseki"
                  data-caption="Traditional Japanese bookbinding Wabi-sabi design with handmade mulberry washi paper texture and authentic brushstroke ink calligraphy."
                  data-category="classic vintage"
                  data-id={10}
                  data-lang="Japanese"
                  data-title="Kokoro (こころ)"
                  data-year="1914 Iwanami Shoten"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Refined wabi-sabi Japanese book cover of Kokoro by Natsume Soseki showing authentic rough textured cream washi paper with traditional four-hole stitch binding and subtle minimalist sumi-e ink brush calligraphy."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNZLf5XFWob4wpINFHODb-LoRSJg9KgV3CHyBqSQ55OmuItt-K5X8LxVvXfbAJ6lRGDGejXkk0fnfnSiIUCxubyaqZoKK60y0BN65VRA-Rpao6SiaN9o8kaHt2hWOf2Zg_PVWg8tZ35zHkwC6lKj8SwfYhD2bCa7MjHYMRkYza4N5SSeScFqSHb6z8jy0SF_okpnd80vZGwV9TFPDq4hvVScqaPB19ncRm8h2l6A"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Kokoro
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Natsume Sōseki • 1914
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={9}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Meiji Classic
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1914
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Kokoro
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Natsume Sōseki
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Bibliothèque nationale de France (BnF) Gallica Digitization Project"
                  data-author="Gustave Flaubert"
                  data-caption="Gilded 19th-century French morocco leather-bound cover with floral hand-tooled gold filigree on burgundy calfskin."
                  data-category="vintage classic"
                  data-id={11}
                  data-lang="French"
                  data-title="Madame Bovary"
                  data-year="1857 Michel Lévy Frères"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Luxurious antique 19th century French leather bound book cover of Madame Bovary by Gustave Flaubert featuring deep wine burgundy morocco leather with intricate hand-tooled gold filigree ornamentation and embossed spine typography."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuVvd5pAbY1Ol-GeDy7DKJfrHt5P4TZ6m62yEsM5rDROGcDJzmrW6VjaHGqERBV-MDx2Gx9N5PpITIdUugvLH5SQjm1CXyTHufzhUvgnhcKkD95DqrUlVj1aABvMb1ac0Rgqhs6uayyDtLgkMXbCNSJucgUpZ-ae09m1YISNaJnoe1ygXDyyuk-dyetaRQRv5zPESWrJAeHx0LwUK7OP8JkVVVwod55lSsz4cnaw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        Madame Bovary
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Gustave Flaubert • 1857
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={10}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          French Realism
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1857
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        Madame Bovary
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Gustave Flaubert
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="gallery-card group relative flex flex-col rounded-xl bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  data-ack="Gallimard Archives & Centre Culturel Camus Aix-en-Provence"
                  data-author="Albert Camus"
                  data-caption="Stark Mediterranean existentialist cover design featuring blinding sunburst geometries over a lone stark silhouette on Algiers sands."
                  data-category="modernist classic"
                  data-id={12}
                  data-lang="French"
                  data-title="L'Étranger (The Stranger)"
                  data-year="1942 Gallimard Blanche"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-primary-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Existentialist minimalist book cover for L'Etranger by Albert Camus with stark geometric blinding yellow sun beating down on a solitary black human silhouette walking across white Algerian sand dunes."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDgSiEFgf1KF--DBMYE3dDa4n0AKRUZDM5BIw5wGkaoAP-8n6ZleW0MRdOobpyaJIQw1ikvl7mvezJaLQRwEv455XykwcG1Kmm2NHbtgRAol0MUSlJdo5XrLuuj7C9_z31svQIzj8NBOfjrF1R9SbKwdeQBpkLtXBsr73pl5ZPCnh-OWFoKYK8F5ww3tbtpT4VgbECtd6bImY-WdgxI5itMGaptXvfklvP9t6Iyg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-flex items-center gap-1 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider mb-2">
                        <span className="material-symbols-outlined text-[16px]">
                          zoom_in
                        </span>
                        Open Lightbox
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-primary">
                        L'Étranger
                      </h3>
                      <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                        Albert Camus • 1942
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="open-lightbox-btn px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm hover:bg-secondary transition-colors"
                          data-index={11}
                        >
                          Inspect Art
                        </button>
                        <a
                          className="px-3 py-1.5 rounded-full bg-surface-card/20 backdrop-blur-sm text-on-primary font-label-sm text-label-sm hover:bg-surface-card/40 transition-colors"
                          href="#"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-on-tertiary-container">
                          Existential Philosophy
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          1942
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors">
                        L'Étranger
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Albert Camus
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-20 p-8 lg:p-10 rounded-2xl bg-surface-container-low shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex items-start gap-5 max-w-3xl">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[28px]">
                      verified
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-sm text-headline-sm text-primary">
                      Visual Archival Standards &amp; Rights Compliance
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Every book cover showcased in the BookBridge Gallery is
                      calibrated against MARC-21 conservation guidelines and
                      retrieved through scholarly partnerships with Project
                      Gutenberg, Open Library, Internet Archive, and
                      institutional public domain repositories. Color profiling
                      matches original pigment characteristics under 5000K
                      museum lighting.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">
                          auto_stories
                        </span>
                        Open Access Archive
                      </span>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">
                          lock_open
                        </span>
                        Public Domain Certified
                      </span>
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">
                          high_density
                        </span>
                        4K Ultra-Resolution Scans
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 w-full lg:w-auto">
                  <button className="w-full lg:w-auto px-6 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">
                      upload_file
                    </span>
                    Submit Archival Asset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-label="High-resolution Book Cover Inspection"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-primary/80 backdrop-blur-md transition-opacity duration-300 opacity-100 pointer-events-auto"
            id="lightboxModal"
            role="dialog"
          >
            <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-surface-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="h-16 px-6 bg-surface-container-low flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    photo_camera_back
                  </span>
                  <span
                    className="font-label-md text-label-md text-primary font-semibold"
                    id="lightboxCounter"
                  >
                    Slide 02 of 12 • Le Petit Prince (The Little Prince)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors"
                    id="zoomBtn"
                    title="Toggle zoom scale"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      zoom_in
                    </span>
                    <span id="zoomLabel">100%</span>
                  </button>
                  <button
                    className="w-9 h-9 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors"
                    id="fullscreenToggle"
                    title="Toggle full canvas"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      fullscreen
                    </span>
                  </button>
                  <button
                    className="flex items-center gap-1.5 pl-3 pr-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm transition-colors ml-2"
                    id="closeLightbox"
                    title="Close Lightbox (Esc)"
                  >
                    <span className="hidden sm:inline text-outline text-[11px] font-mono mr-1">
                      [ESC]
                    </span>
                    <span className="material-symbols-outlined text-[18px]">
                      close
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative flex-grow min-h-[380px] lg:min-h-[460px] bg-primary flex items-center justify-center p-6 overflow-hidden select-none">
                <div className="absolute inset-0 bg-radial-gradient from-secondary-container/20 to-transparent pointer-events-none" />
                <button
                  aria-label="Previous artwork"
                  className="absolute left-4 z-20 w-12 h-12 rounded-full bg-surface-card/20 hover:bg-surface-card/40 backdrop-blur-md text-on-primary flex items-center justify-center shadow-lg transition-transform hover:-translate-x-0.5"
                  id="prevSlide"
                  title="Previous (Left Arrow [←])"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    arrow_back
                  </span>
                </button>
                <div
                  className="relative z-10 max-h-[50vh] lg:max-h-[54vh] aspect-[2/3] transition-transform duration-300 shadow-2xl rounded-lg overflow-hidden group"
                  id="imageWrapper"
                >
                  <img
                    className="w-full h-full object-cover transform origin-center transition-transform duration-300 cursor-zoom-in"
                    alt="Original first edition French book cover of Le Petit Prince by Antoine de Saint-Exupery with iconic minimalist watercolor illustration of the Little Prince standing in long scarf atop Asteroid B-612 surrounded by celestial stars and a bright red rose against pale parchment cream sky."
                    id="lightboxImage"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXcU14OdblXD1YQB92L7fS9iGavXb8Z1OMdjsXQ28RjLpwvApIfV6WT2P26UkgC659JwwwxRQ9qusc_Mh0ASGs8BJX-_l735OIAu9hQCLjtX8_IPFPs8wEXD56hUU4GX7grSsLvnJrz6zYnjbsowPNHhRt6WRUQFFiSoSFNGMLFc1KGKq6mtbZmaJWrdzFZIcRqGuP-oPhoups4shrlqHIArKMs30aLomRsZKRfw"
                  />
                </div>
                <button
                  aria-label="Next artwork"
                  className="absolute right-4 z-20 w-12 h-12 rounded-full bg-surface-card/20 hover:bg-surface-card/40 backdrop-blur-md text-on-primary flex items-center justify-center shadow-lg transition-transform hover:translate-x-0.5"
                  id="nextSlide"
                  title="Next (Right Arrow [→])"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    arrow_forward
                  </span>
                </button>
                <div className="absolute bottom-3 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/70 backdrop-blur-sm text-primary-fixed-dim text-[11px] font-mono">
                  <span>Use [←] and [→] keys to navigate</span>
                </div>
              </div>
              <div className="p-6 lg:p-8 bg-surface-card overflow-y-auto max-h-[38vh]">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-secondary font-semibold"
                        id="modalLangBadge"
                      >
                        French
                      </span>
                      <span
                        className="font-label-sm text-label-sm text-on-surface-variant font-mono"
                        id="modalYearBadge"
                      >
                        Gallimard / Reynal &amp; Hitchcock 1943
                      </span>
                    </div>
                    <h2
                      className="font-headline-md text-headline-md text-primary"
                      id="modalBookTitle"
                    >
                      Le Petit Prince (The Little Prince)
                    </h2>
                    <p
                      className="font-title-md text-title-md text-on-tertiary-container"
                      id="modalAuthor"
                    >
                      Antoine de Saint-Exupéry
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">
                        bookmark_add
                      </span>
                      Add to My Library
                    </button>
                    <button className="flex-1 lg:flex-none px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">
                        menu_book
                      </span>
                      Open Reader
                    </button>
                    <button className="flex-1 lg:flex-none px-4 py-2.5 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        download
                      </span>
                      Download Study Slide
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 bg-surface-container-low p-5 rounded-xl">
                  <div className="lg:col-span-2 space-y-2">
                    <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary">
                      Curatorial Commentary
                    </h4>
                    <p
                      className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"
                      id="modalCaption"
                    >
                      Original watercolor cover art depicting the Little Prince
                      standing solitary on Asteroid B-612, surrounded by his
                      beloved rose and miniature active volcanoes under a soft
                      starry cosmos.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary">
                      Licensing &amp; Provenance
                    </h4>
                    <p
                      className="font-body-sm text-body-sm text-on-surface-variant"
                      id="modalAck"
                    >
                      Public Domain worldwide / Digitized via Open Library
                      Archive • High-resolution preservation copy MARC-21
                      compliant
                    </p>
                    <div className="pt-1 flex items-center gap-1.5 text-on-tertiary-container font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">
                        verified_user
                      </span>
                      <span>Scholarly Citation Permitted</span>
                    </div>
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
