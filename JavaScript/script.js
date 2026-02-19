const DashboardApp = (() => {
  const selectors = {
    sidebarToggleButton: ".sidebar-toggle",
    headerCollapseButton: ".header-collapse",
    dashboardSidebar: ".dashboard-sidebar",
    navigationLinks: ".nav-link",
    navigationArrow: ".nav-arrow",
    dropdownContainer: "[data-dropdown]",
    dropdownTrigger: "[data-dropdown-trigger]",
    collapsedClass: "collapsed",
    activeClass: "active",
    dropdownOpenClass: "is-open",
    caloriesChart: "caloriesChart",
    trackingChart: "trackingChart",
    waterChart: "waterChart",
    activityFilter: ".activity-filter",
    activityItem: ".activity-item",
    activityActiveClass: "active",
    liveMetric: "[data-live]",
    liveProgressCard: "[data-live-progress]",
    miniBar: "[data-live-bar]",
    moodDay: ".mood-day",
  };

  const DOM = {
    sidebarToggle: null,
    headerCollapse: null,
    sidebar: null,
    navLinks: null,
    dropdownContainers: null,
    dropdownTriggers: null,
    caloriesChart: null,
    trackingChart: null,
    waterChart: null,
    activityFilters: null,
    activityItems: null,
    liveMetrics: null,
    liveProgressCards: null,
    miniBars: null,
    moodDays: null,
  };

  const charts = {
    calories: null,
    tracking: null,
    water: null,
  };

  const liveValues = {};
  let liveTimerId = null;

  const cacheDOMElements = () => {
    DOM.sidebarToggle = document.querySelector(selectors.sidebarToggleButton);
    DOM.headerCollapse = document.querySelector(selectors.headerCollapseButton);
    DOM.sidebar = document.querySelector(selectors.dashboardSidebar);
    DOM.navLinks = document.querySelectorAll(selectors.navigationLinks);
    DOM.dropdownContainers = document.querySelectorAll(
      selectors.dropdownContainer,
    );
    DOM.dropdownTriggers = document.querySelectorAll(selectors.dropdownTrigger);
    DOM.caloriesChart = document.getElementById(selectors.caloriesChart);
    DOM.trackingChart = document.getElementById(selectors.trackingChart);
    DOM.waterChart = document.getElementById(selectors.waterChart);
    DOM.activityFilters = document.querySelectorAll(selectors.activityFilter);
    DOM.activityItems = document.querySelectorAll(selectors.activityItem);
    DOM.liveMetrics = document.querySelectorAll(selectors.liveMetric);
    DOM.liveProgressCards = document.querySelectorAll(
      selectors.liveProgressCard,
    );
    DOM.miniBars = document.querySelectorAll(selectors.miniBar);
    DOM.moodDays = document.querySelectorAll(selectors.moodDay);
  };

  const toggleSidebar = () => {
    DOM.sidebar?.classList.toggle(selectors.collapsedClass);
  };

  const deactivateAllNavigationLinks = (currentLink) => {
    DOM.navLinks.forEach((link) => {
      if (link !== currentLink) {
        link.classList.remove(selectors.activeClass);
      }
    });
  };

  const rotateNavigationArrow = (arrow, isActive) => {
    arrow.style.transform = isActive ? "rotate(90deg)" : "rotate(0deg)";
  };

  const setDropdownState = (container, isOpen) => {
    const trigger = container.querySelector(selectors.dropdownTrigger);

    if (isOpen) {
      container.classList.add(selectors.dropdownOpenClass);
    } else {
      container.classList.remove(selectors.dropdownOpenClass);
    }

    if (trigger) {
      trigger.setAttribute("aria-expanded", String(isOpen));
    }
  };

  const closeAllDropdowns = (exceptionContainer = null) => {
    DOM.dropdownContainers.forEach((container) => {
      if (container !== exceptionContainer) {
        setDropdownState(container, false);
      }
    });
  };

  const toggleDropdown = (event) => {
    const trigger = event.currentTarget;
    const container = trigger.closest(selectors.dropdownContainer);

    if (!container) return;

    const isOpen = container.classList.contains(selectors.dropdownOpenClass);

    event.preventDefault();
    closeAllDropdowns(container);
    setDropdownState(container, !isOpen);
  };

  const handleDocumentClick = (event) => {
    const clickedInsideDropdown = event.target.closest(
      selectors.dropdownContainer,
    );

    if (!clickedInsideDropdown) {
      closeAllDropdowns();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  };

  const setActiveFilter = (selectedFilter) => {
    DOM.activityFilters.forEach((filter) => {
      const isActive = filter === selectedFilter;
      filter.classList.toggle(selectors.activityActiveClass, isActive);
      filter.setAttribute("aria-selected", String(isActive));
    });
  };

  const filterActivities = (category) => {
    DOM.activityItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      const shouldShow = category === "all" || itemCategory === category;
      item.style.display = shouldShow ? "flex" : "none";
    });
  };

  const handleActivityFilterClick = (event) => {
    const selectedFilter = event.currentTarget;
    const category = selectedFilter.dataset.filter || "all";

    setActiveFilter(selectedFilter);
    filterActivities(category);
  };

  const initializeCharts = () => {
    if (typeof Chart === "undefined") return;

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

    if (DOM.caloriesChart) {
      charts.calories = new Chart(DOM.caloriesChart, {
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
          scales: {
            x: { grid: { display: false }, ticks: axisTicks },
            y: {
              grid: axisGrid,
              ticks: axisTicks,
            },
          },
        },
      });
    }

    if (DOM.trackingChart) {
      charts.tracking = new Chart(DOM.trackingChart, {
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
          scales: {
            x: { grid: { display: false }, ticks: axisTicks },
            y: {
              grid: axisGrid,
              ticks: axisTicks,
            },
          },
        },
      });
    }

    if (DOM.waterChart) {
      charts.water = new Chart(DOM.waterChart, {
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

  const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

  const formatValue = (value, decimals, suffix) => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${formatter.format(value)}${suffix}`;
  };

  const parseMetricValue = (value) => {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
    return Number.isNaN(parsed) ? null : parsed;
  };

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

  const getNextValue = (current, config) => {
    const delta = Math.random() * config.step;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const next = clampValue(
      current + direction * delta,
      config.min,
      config.max,
    );
    return Number(next.toFixed(config.decimals));
  };

  const updateLiveMetrics = () => {
    if (!DOM.liveMetrics?.length) return;

    DOM.liveMetrics.forEach((metric) => {
      const key = metric.dataset.live;
      const config = liveMetricConfig[key];
      if (!config) return;

      const parsedValue = parseMetricValue(metric.textContent);
      const current = liveValues[key] ?? parsedValue ?? config.min;
      const nextValue = getNextValue(current, config);
      liveValues[key] = nextValue;
      metric.textContent = formatValue(
        nextValue,
        config.decimals,
        config.suffix,
      );
    });

    DOM.liveProgressCards?.forEach((card) => {
      const key = card.dataset.liveProgress;
      const currentValue = liveValues[key];
      const goal = progressGoals[key];
      if (typeof currentValue !== "number" || Number.isNaN(currentValue))
        return;
      if (!goal) return;
      const progress = Math.min(98, Math.max(32, (currentValue / goal) * 100));
      card.style.setProperty("--progress", `${Math.round(progress)}%`);
    });
  };

  const updateMiniBars = () => {
    if (!DOM.miniBars?.length) return;

    DOM.miniBars.forEach((bar) => {
      const max = Number.parseFloat(bar.dataset.max) || 3.6;
      const current = Number.parseFloat(bar.dataset.value) || 2;
      const delta = Math.random() * 0.35;
      const nextValue = clampValue(
        current + (Math.random() > 0.5 ? delta : -delta),
        1.4,
        max,
      );
      const roundedValue = Number(nextValue.toFixed(1));
      bar.dataset.value = String(roundedValue);
      bar.style.setProperty(
        "--bar",
        `${Math.round((roundedValue / max) * 100)}%`,
      );
      const valueLabel = bar.querySelector(".mini-bar-value");
      if (valueLabel) {
        valueLabel.textContent = `${roundedValue.toFixed(1)} L`;
      }
    });
  };

  const updateMoodHighlight = () => {
    if (!DOM.moodDays?.length) return;
    DOM.moodDays.forEach((day) => day.classList.remove("is-active"));
    const nextIndex = Math.floor(Math.random() * DOM.moodDays.length);
    DOM.moodDays[nextIndex]?.classList.add("is-active");
  };

  const updateCharts = () => {
    if (charts.calories) {
      const dataset = charts.calories.data.datasets[0];
      dataset.data = dataset.data.map((value) =>
        clampValue(value + (Math.random() * 80 - 40), 420, 980),
      );
      charts.calories.update();
    }

    if (charts.tracking) {
      const dataset = charts.tracking.data.datasets[0];
      dataset.data = dataset.data.map((value) =>
        clampValue(value + (Math.random() * 6 - 3), 55, 88),
      );
      charts.tracking.update();
    }

    if (charts.water) {
      const slices = [
        Math.random() * 35 + 20,
        Math.random() * 30 + 20,
        Math.random() * 25 + 15,
      ];
      const total = slices.reduce((sum, value) => sum + value, 0);
      const normalized = slices.map((value) =>
        Math.round((value / total) * 100),
      );
      const difference =
        100 - normalized.reduce((sum, value) => sum + value, 0);
      normalized[0] = normalized[0] + difference;
      charts.water.data.datasets[0].data = normalized;
      charts.water.update();
    }
  };

  const startLiveUpdates = () => {
    if (liveTimerId) return;
    updateLiveMetrics();
    updateMiniBars();
    updateMoodHighlight();
    updateCharts();
    liveTimerId = setInterval(() => {
      updateLiveMetrics();
      updateMiniBars();
      updateMoodHighlight();
      updateCharts();
    }, 4500);
  };

  const handleNavigationLinkClick = (event) => {
    const currentLink = event.currentTarget;
    const navigationArrow = currentLink.querySelector(
      selectors.navigationArrow,
    );

    if (!navigationArrow) return;

    event.preventDefault();
    deactivateAllNavigationLinks(currentLink);
    currentLink.classList.toggle(selectors.activeClass);

    const isActive = currentLink.classList.contains(selectors.activeClass);
    rotateNavigationArrow(navigationArrow, isActive);
  };

  const attachEventListeners = () => {
    DOM.sidebarToggle?.addEventListener("click", toggleSidebar);
    DOM.headerCollapse?.addEventListener("click", toggleSidebar);
    DOM.navLinks.forEach((link) => {
      link.addEventListener("click", handleNavigationLinkClick);
    });
    DOM.dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", toggleDropdown);
    });
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);
    DOM.activityFilters.forEach((filter) => {
      filter.addEventListener("click", handleActivityFilterClick);
    });
  };

  const initialize = () => {
    cacheDOMElements();
    attachEventListeners();
    initializeCharts();
    startLiveUpdates();
  };

  return { initialize };
})();

document.addEventListener("DOMContentLoaded", DashboardApp.initialize);
