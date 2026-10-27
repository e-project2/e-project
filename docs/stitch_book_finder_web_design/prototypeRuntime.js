const TAILWIND_CDN = "https://cdn.tailwindcss.com";
const SHARED_TAILWIND_SCRIPT_ID = "bookbridge-prototype-tailwind";

function addStylesheet(link) {
  const href = link.href.replace(/&amp;/g, "&");
  const existingLink = Array.from(
    document.head.querySelectorAll("link[href]"),
  ).find((element) => element.href === href);

  if (existingLink) {
    return null;
  }

  const element = document.createElement("link");
  element.rel = link.rel;
  element.href = href;

  if (link.crossOrigin !== undefined) {
    element.crossOrigin = link.crossOrigin;
  }

  document.head.appendChild(element);
  return element;
}

function loadTailwind() {
  const existingScript = document.getElementById(SHARED_TAILWIND_SCRIPT_ID);

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.id = SHARED_TAILWIND_SCRIPT_ID;
  script.src = TAILWIND_CDN;
  script.onerror = () => {
    console.error(`Failed to load the Tailwind CDN: ${TAILWIND_CDN}`);
  };
  document.head.appendChild(script);
}

function runPageScript(source) {
  const registeredListeners = [];
  const exposedGlobals = new Map();
  const eventTargetPrototype = window.EventTarget.prototype;
  const originalAddEventListener = eventTargetPrototype.addEventListener;

  for (const match of source.matchAll(
    /window(?:\.([A-Za-z_$][\w$]*)|\[\s*["']([^"']+)["']\s*\])\s*=/g,
  )) {
    const name = match[1] || match[2];

    if (!exposedGlobals.has(name)) {
      exposedGlobals.set(name, Object.getOwnPropertyDescriptor(window, name));
    }
  }

  eventTargetPrototype.addEventListener = function (type, listener, options) {
    registeredListeners.push({ target: this, type, listener, options });
    return originalAddEventListener.call(this, type, listener, options);
  };

  try {
    new Function(source).call(window);
  } finally {
    eventTargetPrototype.addEventListener = originalAddEventListener;
  }

  return () => {
    registeredListeners.forEach(({ target, type, listener, options }) => {
      target.removeEventListener(type, listener, options);
    });

    exposedGlobals.forEach((descriptor, name) => {
      if (descriptor) {
        Object.defineProperty(window, name, descriptor);
      } else {
        delete window[name];
      }
    });
  };
}

export function initializePrototypePage(root, options) {
  if (!root) {
    throw new Error(
      "A React root element is required to initialize a prototype.",
    );
  }

  window.tailwind = window.tailwind || {};
  window.tailwind.config = options.tailwindConfig;

  const addedLinks = options.stylesheets.map(addStylesheet).filter(Boolean);

  const style = document.createElement("style");
  style.dataset.prototypeStyle = options.id;
  style.textContent = options.styles;
  document.head.appendChild(style);

  loadTailwind();

  const cleanupScripts = options.scripts.map(runPageScript);

  return () => {
    cleanupScripts.forEach((cleanup) => cleanup());
    style.remove();
    addedLinks.forEach((link) => link.remove());
  };
}
