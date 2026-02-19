# Fitness Dashboard

Enterprise-grade fitness tracking dashboard built with a Menilo-inspired dark
theme, modern layout patterns, and performance-minded UI composition.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

---

## Overview

Professional fitness analytics dashboard implementing modern web architecture
patterns, a Menilo-inspired design system, and performance-optimized rendering
strategies. Built with vanilla JavaScript and clean, modular code conventions.

**Current Status**: Phase 5 In Progress - Charts Integration

---

## What's New

- Chart.js visualizations with themed tooltips and legends
- Activity filter tabs for faster triage of recent sessions
- Status badges (New/Pro/Alert) across key cards

---

## Technical Architecture

### Core Technologies

| Technology                    | Purpose            | Implementation                                  |
| ----------------------------- | ------------------ | ----------------------------------------------- |
| **Semantic HTML5**            | Markup structure   | ARIA-compliant navigation, accessible forms     |
| **CSS3 Grid Layout**          | Page composition   | Named template areas, explicit grid positioning |
| **CSS Custom Properties**     | Design tokens      | Centralized theming, runtime customization      |
| **Vanilla JavaScript (ES6+)** | Application logic  | Module pattern, event delegation, DOM caching   |
| **Google Fonts**              | Typography         | Space Grotesk, IBM Plex Sans                    |
| **Chart.js**                  | Data visualization | Phase 5 charts (bar, line, doughnut)            |

### Design System

**Menilo Dark Theme Adaptation**

- Color palette: 12 semantic color variables
- Spacing scale: 8px base unit system (6 tiers)
- Typography: 6-level modular scale
- Component library: Professional UI patterns

**Performance Characteristics**

- Chart.js dependency (Phase 5, CDN)
- ~6KB CSS footprint (unminified)
- Core JavaScript payload <2KB (excluding Chart.js)
- GPU-accelerated animations

---

## Project Structure

```
fitness-dashboard/
├── Index.html                      # Application entry point
├── README.md                       # Project overview
├── TECHNICAL_DOCUMENTATION.md      # Comprehensive technical reference
│
├── JavaScript/
│   └── script.js                   # Modular application logic (IIFE pattern)
│
├── Styles/
│   └── CSS/
│       └── style.css               # Design system implementation
│
└── Img/                            # Asset directory (Phase 4+)
```

---

## Feature Implementation

### Phase 1: Foundation ✅

- CSS Grid layout architecture
- Menilo dark theme color system
- CSS custom properties infrastructure
- Responsive viewport configuration

### Phase 2: Sidebar Navigation ✅

- Collapsible navigation panel
- Hierarchical menu structure (4 sections, 11 items)
- Active state management
- Search input component
- Upgrade CTA with gradient effects
- Accessibility features (ARIA labels, semantic HTML)

### Phase 3: Header Component ✅

- Search input with contextual placeholder
- Notifications dropdown panel
- User profile dropdown menu
- Compact navbar icon row and avatar-only profile trigger

### Phase 4: Dashboard Cards ✅

- Stat widgets for calories, steps, water, sleep
- Personal metrics cards (weight, BPM, BMI)
- Weekly plan progress indicators
- Recent activity list
- Activity filter tabs and status badges

### Phase 5: Data Visualization 📊

_In Progress: Chart.js integration with themed tooltips and legends_

---

## Development Setup

### Prerequisites

- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- Code editor with HTML/CSS/JS support
- Local development server (optional but recommended)

### Quick Start

```bash
git clone https://github.com/Mahmoud062/JS-Learning-Journey.git
cd JS-Learning-Journey
```

**Option 1: Direct File Access**

```bash
open Index.html
```

**Option 2: Local Server (Recommended)**

```bash
python -m http.server 8000
```

Navigate to `http://localhost:8000`

---

## Architecture Highlights

### CSS Grid Strategy

The dashboard employs a sophisticated grid architecture with named template areas:

```css
grid-template-areas:
  "sidebar header"
  "sidebar main";
```

**Benefits:**

- Eliminates absolute positioning complexity
- Semantic area references
- Simplified responsive modifications
- Predictable layout behavior

### JavaScript Module Pattern

Application logic encapsulated in IIFE module:

```javascript
const DashboardApp = (() => {
  // Private scope
  return { initialize }; // Public API
})();
```

**Advantages:**

- Namespace protection
- Memory leak prevention
- Clear public/private boundaries
- Enhanced testability

### Design Token System

Centralized CSS custom properties for consistent theming:

```css
:root {
  --bg-primary: #0d1117;
  --accent-primary: #1f6feb;
  --spacing-md: 1rem;
}
```

**Enables:**

- Runtime theme switching
- Consistent design language
- Reduced maintenance overhead
- Enhanced developer experience

---

## Code Quality Standards

### Principles

- **DRY**: No logic duplication, centralized configuration
- **Self-Documenting**: Descriptive naming eliminates comment necessity
- **Modularity**: Separation of concerns, single responsibility
- **Accessibility**: WCAG 2.1 AA compliance target
- **Performance**: GPU-accelerated animations, minimal reflows

### Naming Conventions

- **JavaScript**: camelCase variables, PascalCase constructors
- **CSS**: kebab-case classes, BEM-adjacent methodology
- **HTML**: Semantic elements, lowercase attributes

---

## Performance Metrics

**Current Performance:**

- First Contentful Paint: ~800ms (local)
- Time to Interactive: ~1.2s (local)
- Layout Stability: 0 CLS (Cumulative Layout Shift)

**Optimization Strategies:**

- DOM query caching
- Event delegation pattern
- CSS transform-based animations
- Lazy loading preparation (future)

---

## Browser Compatibility

| Browser | Version | Support Status  |
| ------- | ------- | --------------- |
| Chrome  | 90+     | ✅ Full support |
| Firefox | 88+     | ✅ Full support |
| Safari  | 14+     | ✅ Full support |
| Edge    | 90+     | ✅ Full support |

**Required Features:**

- CSS Grid Layout
- CSS Custom Properties
- ES6 Arrow Functions
- Optional Chaining (`?.`)
- Template Literals

---

## Contributing

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Line Length**: 80 characters (soft limit)

### Commit Convention

```
<type>(<scope>): <subject>

[optional body]
[optional footer]
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `style`, `perf`, `test`

---

## Documentation

- **[TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)**: Comprehensive architecture reference
- **Inline Code**: Self-documenting through descriptive naming
- **Git Commits**: Semantic commit messages

---

## Roadmap

**Q1 2026**

- ✅ Phase 1: Foundation
- ✅ Phase 2: Sidebar Navigation
- ✅ Phase 3: Header Component
- ✅ Phase 4: Dashboard Cards

**Q2 2026**

- 🔄 Phase 5: Chart.js Integration
- 📋 Responsive Breakpoints
- 📋 Theme Switcher
- 📋 User Preferences Persistence

---

## License

© 2026 Fitness Dashboard. Menilo design system adaptation.  
Licensed under MIT License.

---

## Acknowledgments

- **Design Inspiration**: [Menilo Dashboard](https://codebucks.in/menilo/)
- **Color System**: GitHub Dark Theme
- **Icons**: Custom SVG implementations

---

**Version**: 0.5.0  
**Status**: Active Development  
**Last Updated**: February 19, 2026
