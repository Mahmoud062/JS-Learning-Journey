/**
 * darkMode.js — Toggle dark / light theme with localStorage persistence.
 *
 * Strategy:
 *   • The dashboard's default design IS the dark theme.
 *   • A `.dark-theme` class on `<body>` signals "dark mode active".
 *   • When the class is absent, a light-theme override in
 *     _themes.css re-maps the CSS custom properties.
 *   • On first visit (no saved preference) the dark theme is applied so
 *     the dashboard looks like the original design.
 *   • The preference is saved under `menilo-theme` in localStorage.
 */

const STORAGE_KEY = "menilo-theme";

/**
 * Apply the correct theme class based on the stored preference.
 * Called once on page load, BEFORE any interaction.
 */
const applySavedTheme = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  // Default to dark when no preference has been stored yet.
  if (saved === "light") {
    document.body.classList.remove("dark-theme");
  } else {
    document.body.classList.add("dark-theme");
  }
};

/**
 * Toggle the theme and persist the new preference.
 * Also updates `aria-pressed` on the trigger button.
 */
const toggleDarkMode = (event) => {
  const btn = event.currentTarget;
  const isDark = document.body.classList.toggle("dark-theme");

  // Persist choice
  localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");

  // Sync ARIA state
  btn?.setAttribute("aria-pressed", String(isDark));
};

/**
 * Initialise: restore saved preference + bind click event.
 * Expects a button with `data-action="dark-mode"` in the DOM.
 */
export const initDarkMode = () => {
  // Apply saved preference immediately (prevents FOUC)
  applySavedTheme();

  const btn = document.querySelector('[data-action="dark-mode"]');
  if (!btn) return;

  // Set initial ARIA state to match
  const isDark = document.body.classList.contains("dark-theme");
  btn.setAttribute("aria-pressed", String(isDark));

  btn.addEventListener("click", toggleDarkMode);
};
