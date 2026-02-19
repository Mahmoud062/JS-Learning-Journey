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
  };

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
      new Chart(DOM.caloriesChart, {
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
      new Chart(DOM.trackingChart, {
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
      new Chart(DOM.waterChart, {
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
  };

  return { initialize };
})();

document.addEventListener("DOMContentLoaded", DashboardApp.initialize);
