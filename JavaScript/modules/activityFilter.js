/**
 * activityFilter.js — Activity list filtering with empty-state handling.
 *
 * Uses CSS class toggle (.is-hidden) instead of inline style.display
 * manipulation for better separation of concerns.
 */

const SELECTORS = {
  filter: ".activity-filter",
  item: ".activity-item",
  list: ".activity-list",
  activeClass: "active",
};

/** Mark the selected filter button as active and sync aria-selected. */
const setActiveFilter = (selected, allFilters) => {
  allFilters.forEach((f) => {
    const isActive = f === selected;
    f.classList.toggle(SELECTORS.activeClass, isActive);
    f.setAttribute("aria-selected", String(isActive));
  });
};

/** Show / hide items and manage an empty-state message. */
const filterActivities = (category, items) => {
  let visibleCount = 0;

  items.forEach((item) => {
    const shouldShow = category === "all" || item.dataset.category === category;
    item.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) visibleCount++;
  });

  const list = document.querySelector(SELECTORS.list);
  let emptyState = list?.querySelector(".activity-empty-state");

  if (visibleCount === 0 && list) {
    if (!emptyState) {
      emptyState = document.createElement("li");
      emptyState.className = "activity-empty-state";
      emptyState.setAttribute("role", "status");
      emptyState.textContent = "No activities found for this filter.";
      list.appendChild(emptyState);
    }
    emptyState.classList.remove("is-hidden");
  } else if (emptyState) {
    emptyState.classList.add("is-hidden");
  }
};

/** Initialise: cache DOM + bind click events on filter buttons. */
export const initActivityFilters = () => {
  const filters = document.querySelectorAll(SELECTORS.filter);
  const items = document.querySelectorAll(SELECTORS.item);

  filters.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      const category = filterBtn.dataset.filter || "all";
      setActiveFilter(filterBtn, filters);
      filterActivities(category, items);
    });
  });
};
