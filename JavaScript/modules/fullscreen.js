/**
 * fullscreen.js — Toggle the browser's native Fullscreen API.
 *
 * Handles both entering and exiting fullscreen.  Uses the standard
 * `document.fullscreenElement` check plus vendor-prefixed fallbacks
 * for older WebKit-based browsers.
 */

/**
 * Check whether the browser is currently in fullscreen mode.
 * @returns {boolean}
 */
const isFullscreen = () =>
  !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );

/**
 * Request fullscreen on the root element, with vendor-prefix fallbacks.
 */
const enterFullscreen = () => {
  const el = document.documentElement;

  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    // Safari / older Chrome
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    // IE 11
    el.msRequestFullscreen();
  }
};

/**
 * Exit fullscreen, with vendor-prefix fallbacks.
 */
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

/**
 * Toggle between entering and exiting fullscreen.
 * Optionally toggles an `.active` class on the trigger button
 * so you can style the pressed / active state.
 */
const toggleFullscreen = (event) => {
  const btn = event.currentTarget;

  if (isFullscreen()) {
    exitFullscreen();
    btn?.classList.remove("active");
  } else {
    enterFullscreen();
    btn?.classList.add("active");
  }
};

/**
 * Listen for fullscreenchange so the button state stays in sync
 * even when the user exits fullscreen via Escape or the browser UI.
 */
const syncButtonState = (btn) => {
  const handler = () => {
    if (isFullscreen()) {
      btn?.classList.add("active");
    } else {
      btn?.classList.remove("active");
    }
  };

  document.addEventListener("fullscreenchange", handler);
  document.addEventListener("webkitfullscreenchange", handler);
};

/**
 * Initialise: bind click event to the fullscreen toggle button.
 * Expects a button with `data-action="fullscreen"` in the DOM.
 */
export const initFullscreen = () => {
  const btn = document.querySelector('[data-action="fullscreen"]');
  if (!btn) return;

  btn.addEventListener("click", toggleFullscreen);
  syncButtonState(btn);
};
