/**
 * main.js — Application entry point (ES6 module).
 *
 * Orchestrates all sub-modules and owns the live-update timer.
 * Implements the Page Visibility API so that live updates pause
 * when the browser tab is hidden, saving CPU and preventing
 * memory pressure over long sessions.
 */

import { initSidebar } from "./modules/sidebar.js";
import { initDropdowns } from "./modules/dropdown.js";
import { initCharts, updateCharts } from "./modules/charts.js";
import {
  updateLiveMetrics,
  updateMiniBars,
  updateMoodHighlight,
} from "./modules/liveMetrics.js";
import { initActivityFilters } from "./modules/activityFilter.js";
import { initFullscreen } from "./modules/fullscreen.js";
import { initDarkMode } from "./modules/darkMode.js";
import { initGridApps } from "./modules/gridApps.js";

/* ---- Live-update timer ---- */

let liveTimerId = null;

/** Single tick: refresh every dynamic data source. */
const tick = () => {
  updateLiveMetrics();
  updateMiniBars();
  updateMoodHighlight();
  updateCharts();
};

const startLiveUpdates = () => {
  if (liveTimerId) return;
  tick();
  liveTimerId = setInterval(tick, 4500);
};

const stopLiveUpdates = () => {
  if (liveTimerId) {
    clearInterval(liveTimerId);
    liveTimerId = null;
  }
};

/** Pause / resume when the tab becomes hidden / visible. */
const handleVisibilityChange = () => {
  if (document.hidden) {
    stopLiveUpdates();
  } else {
    startLiveUpdates();
  }
};

/* ---- Bootstrap ---- */

const initialize = () => {
  initDarkMode(); // Run first — sets theme class before paint
  initSidebar();
  initDropdowns();
  initFullscreen();
  initGridApps();
  initCharts();
  initActivityFilters();
  startLiveUpdates();

  document.addEventListener("visibilitychange", handleVisibilityChange);
};

document.addEventListener("DOMContentLoaded", initialize);
