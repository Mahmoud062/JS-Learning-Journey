/**
 * sidebar.js — Sidebar toggle & navigation link management.
 * Includes aria-expanded state for accessibility.
 */

const SELECTORS = {
  sidebarToggle: ".sidebar-toggle",
  headerCollapse: ".header-collapse",
  sidebar: ".dashboard-sidebar",
  navLinks: ".nav-link",
  collapsedClass: "collapsed",
  activeClass: "active",
};

let sidebarToggleBtn = null;
let headerCollapseBtn = null;
let sidebar = null;
let container = null;
let navLinks = null;

/**
 * Toggle collapsed state on both the sidebar and the grid container,
 * then update aria-expanded on both trigger buttons.
 * The container class drives the grid-template-columns transition.
 */
const toggleSidebar = () => {
  const isCollapsed = sidebar?.classList.toggle(SELECTORS.collapsedClass);
  container?.classList.toggle("sidebar-collapsed", !!isCollapsed);
  sidebarToggleBtn?.setAttribute("aria-expanded", String(!isCollapsed));
  headerCollapseBtn?.setAttribute("aria-expanded", String(!isCollapsed));
};

/** Remove active class from every link except the one that was clicked. */
const clearActiveLinks = (currentLink) => {
  navLinks.forEach((link) => {
    if (link !== currentLink) {
      link.classList.remove(SELECTORS.activeClass);
    }
  });
};

/** Handle click on a nav link — toggle submenu for has-submenu items. */
const handleNavLinkClick = (event) => {
  const currentLink = event.currentTarget;
  const navItem = currentLink.closest(".nav-item");
  const hasSubmenu = navItem?.classList.contains("has-submenu");

  if (hasSubmenu) {
    event.preventDefault();
    navItem.classList.toggle("open");
  }

  clearActiveLinks(currentLink);
  currentLink.classList.toggle(SELECTORS.activeClass);
};

/** Initialise sidebar: cache DOM + bind events. */
export const initSidebar = () => {
  sidebarToggleBtn = document.querySelector(SELECTORS.sidebarToggle);
  headerCollapseBtn = document.querySelector(SELECTORS.headerCollapse);
  sidebar = document.querySelector(SELECTORS.sidebar);
  container = document.querySelector(".dashboard-container");
  navLinks = document.querySelectorAll(SELECTORS.navLinks);

  sidebarToggleBtn?.addEventListener("click", toggleSidebar);
  headerCollapseBtn?.addEventListener("click", toggleSidebar);

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });
};
