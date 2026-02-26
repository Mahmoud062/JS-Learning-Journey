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
  steps: null,
  heartRate: null,
  sleep: null,
  nutrition: null,
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
  const stepsCanvas = document.getElementById("stepsChart");
  const heartRateCanvas = document.getElementById("heartRateChart");
  const sleepCanvas = document.getElementById("sleepChart");
  const nutritionCanvas = document.getElementById("nutritionChart");

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

  if (stepsCanvas) {
    charts.steps = new Chart(stepsCanvas, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Steps",
            data: [7200, 8420, 6100, 9300, 10240, 7800, 8600],
            backgroundColor: "rgba(31, 111, 235, 0.85)",
            borderRadius: 6,
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
        scales: {
          x: { grid: { display: false }, ticks: axisTicks },
          y: { grid: { display: false }, ticks: { color: "#8b949e" } },
        },
      },
    });
  }

  /* ---- Heart Rate (line) ---- */
  if (heartRateCanvas) {
    charts.heartRate = new Chart(heartRateCanvas, {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Avg BPM",
            data: [68, 72, 70, 75, 74, 71, 69],
            borderColor: "#f85149",
            backgroundColor: "rgba(248, 81, 73, 0.15)",
            tension: 0.35,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: "#f85149",
          },
          {
            label: "Peak BPM",
            data: [142, 156, 138, 162, 150, 148, 135],
            borderColor: "#d29922",
            backgroundColor: "transparent",
            tension: 0.35,
            borderDash: [5, 4],
            pointRadius: 2,
            pointBackgroundColor: "#d29922",
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
        scales: {
          x: { grid: { display: false }, ticks: axisTicks },
          y: { grid: axisGrid, ticks: axisTicks, min: 40 },
        },
      },
    });
  }

  /* ---- Weekly Sleep (bar) ---- */
  if (sleepCanvas) {
    charts.sleep = new Chart(sleepCanvas, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Sleep (hrs)",
            data: [7.5, 6.8, 8.1, 7.0, 6.5, 7.2, 8.5],
            backgroundColor: "rgba(88, 86, 214, 0.75)",
            borderRadius: 6,
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
        scales: {
          x: { grid: { display: false }, ticks: axisTicks },
          y: {
            grid: axisGrid,
            ticks: axisTicks,
            min: 4,
            max: 10,
          },
        },
      },
    });
  }

  /* ---- Nutrition Macros (doughnut) ---- */
  if (nutritionCanvas) {
    charts.nutrition = new Chart(nutritionCanvas, {
      type: "doughnut",
      data: {
        labels: ["Protein", "Carbs", "Fat"],
        datasets: [
          {
            data: [30, 50, 20],
            backgroundColor: ["#1f6feb", "#3fb950", "#d29922"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: tooltipStyles,
        },
        cutout: "60%",
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

  if (charts.steps) {
    const ds = charts.steps.data.datasets[0];
    ds.data = ds.data.map((v) =>
      clamp(v + Math.round(Math.random() * 1200 - 600), 2000, 15000),
    );
    charts.steps.update("none");
  }

  if (charts.heartRate) {
    const avg = charts.heartRate.data.datasets[0];
    const peak = charts.heartRate.data.datasets[1];
    avg.data = avg.data.map((v) => clamp(v + Math.round(Math.random() * 8 - 4), 55, 90));
    peak.data = peak.data.map((v) => clamp(v + Math.round(Math.random() * 14 - 7), 120, 180));
    charts.heartRate.update("none");
  }

  if (charts.sleep) {
    const ds = charts.sleep.data.datasets[0];
    ds.data = ds.data.map((v) =>
      clamp(+(v + (Math.random() * 1.2 - 0.6)).toFixed(1), 4.5, 9.5),
    );
    charts.sleep.update("none");
  }

  if (charts.nutrition) {
    const slices = [
      Math.random() * 15 + 22,
      Math.random() * 15 + 40,
      Math.random() * 10 + 15,
    ];
    const total = slices.reduce((s, v) => s + v, 0);
    const normalised = slices.map((v) => Math.round((v / total) * 100));
    normalised[0] += 100 - normalised.reduce((s, v) => s + v, 0);
    charts.nutrition.data.datasets[0].data = normalised;
    charts.nutrition.update("none");
  }
};
