/**
 * charts.js — Chart.js initialisation & live update logic.
 *
 * Uses chart.update('none') to skip animation on every tick,
 * shared scales config to reduce repetition (DRY),
 * and a visible error state when Chart.js fails to load.
 */

/* ---- Shared theme tokens ---- */

const tooltipStyles = {
  backgroundColor: "rgba(13, 17, 23, 0.95)",
  borderColor: "rgba(48, 54, 61, 0.9)",
  borderWidth: 1,
  titleColor: "#e6edf3",
  bodyColor: "#8b949e",
  padding: 10,
  displayColors: false,
};

const axisTicks = { color: "#8b949e" };
const axisGrid = { color: "rgba(48, 54, 61, 0.6)" };

const sharedScalesConfig = {
  x: { grid: { display: false }, ticks: axisTicks },
  y: { grid: axisGrid, ticks: axisTicks },
};

/* ---- Internal state ---- */

const charts = {
  calories: null,
  tracking: null,
  water: null,
};

/* ---- Helpers ---- */

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Show an error message inside every .chart-canvas container. */
const showChartError = () => {
  document.querySelectorAll(".chart-canvas").forEach((container) => {
    container.innerHTML = `
      <div class="chart-error" role="alert">
        <p>Unable to load charts. Please check your connection and reload.</p>
      </div>`;
  });
};

/* ---- Public API ---- */

/** Create the three dashboard charts (bar, line, doughnut). */
export const initCharts = () => {
  if (typeof Chart === "undefined") {
    showChartError();
    return;
  }

  const caloriesCanvas = document.getElementById("caloriesChart");
  const trackingCanvas = document.getElementById("trackingChart");
  const waterCanvas = document.getElementById("waterChart");

  if (caloriesCanvas) {
    charts.calories = new Chart(caloriesCanvas, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Calories",
            data: [520, 640, 710, 590, 820, 910, 760],
            backgroundColor: "rgba(31, 111, 235, 0.7)",
            borderRadius: 8,
          },
          {
            label: "Goal",
            data: [700, 700, 700, 700, 700, 700, 700],
            backgroundColor: "rgba(110, 118, 129, 0.4)",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#8b949e", boxWidth: 10 },
          },
          tooltip: tooltipStyles,
        },
        scales: sharedScalesConfig,
      },
    });
  }

  if (trackingCanvas) {
    charts.tracking = new Chart(trackingCanvas, {
      type: "line",
      data: {
        labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
        datasets: [
          {
            label: "Performance",
            data: [62, 68, 66, 72, 75, 82],
            borderColor: "#3fb950",
            backgroundColor: "rgba(63, 185, 80, 0.2)",
            tension: 0.35,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: "#3fb950",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: tooltipStyles,
        },
        scales: sharedScalesConfig,
      },
    });
  }

  if (waterCanvas) {
    charts.water = new Chart(waterCanvas, {
      type: "doughnut",
      data: {
        labels: ["Morning", "Afternoon", "Evening"],
        datasets: [
          {
            data: [42, 34, 24],
            backgroundColor: ["#1f6feb", "#5856d6", "#3fb950"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#8b949e", boxWidth: 10 },
          },
          tooltip: tooltipStyles,
        },
        cutout: "65%",
      },
    });
  }
};

/**
 * Randomise chart data and redraw WITHOUT animation.
 * chart.update('none') avoids expensive animation frames on every tick.
 */
export const updateCharts = () => {
  if (charts.calories) {
    const ds = charts.calories.data.datasets[0];
    ds.data = ds.data.map((v) =>
      clamp(v + (Math.random() * 80 - 40), 420, 980),
    );
    charts.calories.update("none");
  }

  if (charts.tracking) {
    const ds = charts.tracking.data.datasets[0];
    ds.data = ds.data.map((v) => clamp(v + (Math.random() * 6 - 3), 55, 88));
    charts.tracking.update("none");
  }

  if (charts.water) {
    const slices = [
      Math.random() * 35 + 20,
      Math.random() * 30 + 20,
      Math.random() * 25 + 15,
    ];
    const total = slices.reduce((s, v) => s + v, 0);
    const normalised = slices.map((v) => Math.round((v / total) * 100));
    normalised[0] += 100 - normalised.reduce((s, v) => s + v, 0);
    charts.water.data.datasets[0].data = normalised;
    charts.water.update("none");
  }
};
