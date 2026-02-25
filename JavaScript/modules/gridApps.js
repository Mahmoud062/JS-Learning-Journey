/**
 * gridApps.js — Grid / Apps button dropdown toggle.
 *
 * Toggles an `.active` class on the dropdown to show / hide it.
 * Clicking outside, or pressing Escape, closes the menu.
 * Expects a button with `data-action="grid-apps"` and a sibling
 * `.grid-apps-dropdown` inside a `.grid-apps-wrapper` container.
 */

let wrapper = null;
let btn = null;
let dropdown = null;

/**
 * Open / close the dropdown and sync ARIA attributes.
 */
const toggleDropdown = (event) => {
  event.stopPropagation();
  const isOpen = dropdown?.classList.toggle("active");
  btn?.setAttribute("aria-expanded", String(!!isOpen));
};

/**
 * Close dropdown when clicking anywhere outside.
 */
const handleOutsideClick = (event) => {
  if (!wrapper?.contains(event.target)) {
    closeDropdown();
  }
};

/**
 * Close dropdown on Escape key and return focus to trigger.
 */
const handleEscapeKey = (event) => {
  if (event.key === "Escape" && dropdown?.classList.contains("active")) {
    closeDropdown();
    btn?.focus();
  }
};

/**
 * Close helper — removes active class and resets ARIA.
 */
const closeDropdown = () => {
  dropdown?.classList.remove("active");
  btn?.setAttribute("aria-expanded", "false");
};

/**
 * Initialise: cache DOM + bind events.
 */
export const initGridApps = () => {
  wrapper = document.querySelector(".grid-apps-wrapper");
  btn = document.querySelector('[data-action="grid-apps"]');
  dropdown = document.querySelector(".grid-apps-dropdown");

  if (!btn || !dropdown) return;

  btn.addEventListener("click", toggleDropdown);
  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("keydown", handleEscapeKey);
};
