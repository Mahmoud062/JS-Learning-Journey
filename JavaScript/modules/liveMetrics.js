/**
 * liveMetrics.js — Simulated live-value updates for stat cards,
 * mini-bar charts and mood grid.
 *
 * Performance fixes vs. original:
 *  • Intl.NumberFormat instances are cached (avoids re-creation every tick).
 *  • DOM queries happen once per tick, not cached globally — this keeps
 *    the module stateless regarding DOM, which is simpler for the module
 *    pattern while still being efficient at a 4.5 s interval.
 */

/* ---- Helpers ---- */

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Cached Intl.NumberFormat instances keyed by decimal count. */
const formatterCache = new Map();

const getFormatter = (decimals) => {
  if (!formatterCache.has(decimals)) {
    formatterCache.set(
      decimals,
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    );
  }
  return formatterCache.get(decimals);
};

const formatValue = (value, decimals, suffix) =>
  `${getFormatter(decimals).format(value)}${suffix}`;

const parseMetricValue = (text) => {
  const parsed = Number.parseFloat(text.replace(/[^0-9.]/g, ""));
  return Number.isNaN(parsed) ? null : parsed;
};

const getNextValue = (current, config) => {
  const delta = Math.random() * config.step;
  const direction = Math.random() > 0.5 ? 1 : -1;
  const next = clamp(current + direction * delta, config.min, config.max);
  return Number(next.toFixed(config.decimals));
};

/* ---- Config ---- */

const liveMetricConfig = {
  calories: { min: 2200, max: 3100, step: 45, decimals: 0, suffix: "" },
  steps: { min: 16000, max: 22000, step: 140, decimals: 0, suffix: "" },
  water: { min: 3.2, max: 6.2, step: 0.2, decimals: 1, suffix: " L" },
  sleep: { min: 6.5, max: 9.2, step: 0.2, decimals: 1, suffix: " h" },
  weight: { min: 80.8, max: 84.8, step: 0.2, decimals: 1, suffix: " kg" },
  bpm: { min: 52, max: 68, step: 2, decimals: 0, suffix: " bpm" },
  bmi: { min: 22.6, max: 24.6, step: 0.1, decimals: 1, suffix: "" },
};

const progressGoals = {
  calories: 3200,
  steps: 22000,
  water: 7,
  sleep: 9,
};

/** Running values so each tick is a smooth delta from the previous one. */
const liveValues = {};

/* ---- Public API ---- */

/** Update every element carrying a [data-live] attribute. */
export const updateLiveMetrics = () => {
  const metrics = document.querySelectorAll("[data-live]");
  const progressCards = document.querySelectorAll("[data-live-progress]");
  if (!metrics?.length) return;

  metrics.forEach((el) => {
    const key = el.dataset.live;
    const config = liveMetricConfig[key];
    if (!config) return;

    const current =
      liveValues[key] ?? parseMetricValue(el.textContent) ?? config.min;
    const nextValue = getNextValue(current, config);
    liveValues[key] = nextValue;
    el.textContent = formatValue(nextValue, config.decimals, config.suffix);
  });

  progressCards?.forEach((card) => {
    const key = card.dataset.liveProgress;
    const currentValue = liveValues[key];
    const goal = progressGoals[key];
    if (typeof currentValue !== "number" || Number.isNaN(currentValue)) return;
    if (!goal) return;
    const progress = Math.min(98, Math.max(32, (currentValue / goal) * 100));
    card.style.setProperty("--progress", `${Math.round(progress)}%`);
  });
};

/** Update the mini-bar water-intake chart. */
export const updateMiniBars = () => {
  const miniBars = document.querySelectorAll("[data-live-bar]");
  if (!miniBars?.length) return;

  miniBars.forEach((bar) => {
    const max = Number.parseFloat(bar.dataset.max) || 3.6;
    const current = Number.parseFloat(bar.dataset.value) || 2;
    const delta = Math.random() * 0.35;
    const nextValue = clamp(
      current + (Math.random() > 0.5 ? delta : -delta),
      1.4,
      max,
    );
    const rounded = Number(nextValue.toFixed(1));
    bar.dataset.value = String(rounded);
    bar.style.setProperty("--bar", `${Math.round((rounded / max) * 100)}%`);
    const label = bar.querySelector(".mini-bar-value");
    if (label) label.textContent = `${rounded.toFixed(1)} L`;
  });
};

/** Randomly highlight one day in the mood grid. */
export const updateMoodHighlight = () => {
  const moodDays = document.querySelectorAll(".mood-day");
  if (!moodDays?.length) return;
  moodDays.forEach((d) => d.classList.remove("is-active"));
  const idx = Math.floor(Math.random() * moodDays.length);
  moodDays[idx]?.classList.add("is-active");
};
