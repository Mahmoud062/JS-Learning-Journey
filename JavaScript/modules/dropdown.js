/**
 * dropdown.js — Dropdown open/close, Escape-key handling & focus management.
 */

const SELECTORS = {
  container: "[data-dropdown]",
  trigger: "[data-dropdown-trigger]",
  openClass: "is-open",
};

let containers = null;
let triggers = null;

/** Set open / closed state and sync aria-expanded. */
const setDropdownState = (container, isOpen) => {
  const trigger = container.querySelector(SELECTORS.trigger);
  container.classList.toggle(SELECTORS.openClass, isOpen);
  trigger?.setAttribute("aria-expanded", String(isOpen));
};

/** Close every dropdown except an optional exception. */
const closeAllDropdowns = (exception = null) => {
  containers.forEach((c) => {
    if (c !== exception) setDropdownState(c, false);
  });
};

/** Toggle the dropdown that owns the clicked trigger. */
const toggleDropdown = (event) => {
  const trigger = event.currentTarget;
  const container = trigger.closest(SELECTORS.container);
  if (!container) return;

  const isOpen = container.classList.contains(SELECTORS.openClass);
  event.preventDefault();
  closeAllDropdowns(container);
  setDropdownState(container, !isOpen);
};

/** Close dropdowns when clicking outside. */
const handleDocumentClick = (event) => {
  if (!event.target.closest(SELECTORS.container)) {
    closeAllDropdowns();
  }
};

/** Close dropdowns on Escape and return focus to the trigger button. */
const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    const openDropdown = document.querySelector(
      `.header-dropdown.${SELECTORS.openClass}`,
    );
    const trigger = openDropdown?.querySelector(SELECTORS.trigger);
    closeAllDropdowns();
    trigger?.focus();
  }
};

/** Initialise dropdowns: cache DOM + bind events. */
export const initDropdowns = () => {
  containers = document.querySelectorAll(SELECTORS.container);
  triggers = document.querySelectorAll(SELECTORS.trigger);

  triggers.forEach((t) => t.addEventListener("click", toggleDropdown));
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleEscapeKey);
};
