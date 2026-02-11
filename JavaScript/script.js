const DashboardApp = (() => {
  const selectors = {
    sidebarToggleButton: '.sidebar-toggle',
    dashboardSidebar: '.dashboard-sidebar',
    navigationLinks: '.nav-link',
    navigationArrow: '.nav-arrow',
    collapsedClass: 'collapsed',
    activeClass: 'active'
  };

  const DOM = {
    sidebarToggle: null,
    sidebar: null,
    navLinks: null
  };

  const cacheDOMElements = () => {
    DOM.sidebarToggle = document.querySelector(selectors.sidebarToggleButton);
    DOM.sidebar = document.querySelector(selectors.dashboardSidebar);
    DOM.navLinks = document.querySelectorAll(selectors.navigationLinks);
  };

  const toggleSidebar = () => {
    DOM.sidebar?.classList.toggle(selectors.collapsedClass);
  };

  const deactivateAllNavigationLinks = (currentLink) => {
    DOM.navLinks.forEach(link => {
      if (link !== currentLink) {
        link.classList.remove(selectors.activeClass);
      }
    });
  };

  const rotateNavigationArrow = (arrow, isActive) => {
    arrow.style.transform = isActive ? 'rotate(90deg)' : 'rotate(0deg)';
  };

  const handleNavigationLinkClick = (event) => {
    const currentLink = event.currentTarget;
    const navigationArrow = currentLink.querySelector(selectors.navigationArrow);
    
    if (!navigationArrow) return;

    event.preventDefault();
    deactivateAllNavigationLinks(currentLink);
    currentLink.classList.toggle(selectors.activeClass);
    
    const isActive = currentLink.classList.contains(selectors.activeClass);
    rotateNavigationArrow(navigationArrow, isActive);
  };

  const attachEventListeners = () => {
    DOM.sidebarToggle?.addEventListener('click', toggleSidebar);
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', handleNavigationLinkClick);
    });
  };

  const initialize = () => {
    cacheDOMElements();
    attachEventListeners();
  };

  return { initialize };
})();

document.addEventListener('DOMContentLoaded', DashboardApp.initialize);
