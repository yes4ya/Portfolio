# Yesaya Roy Nugraha Portfolio

A single-page portfolio website built with **React**, **Vite**, and **Tailwind CSS**, using structured data from `src/data/portfolioData.json`. It features multi-language support (English and Indonesian) and light/dark mode toggling.

## Tech Stack
- **Framework & Core**: React 18, Vite 6
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Animation**: Framer Motion (reveal + stagger), Lenis (smooth scroll)
- **Icons**: Lucide React

## Project Structure

```text
D:\Project Portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│ ├── main.jsx # Entry point
│ ├── App.jsx # Root layout (Sidebar + main scroll + footer)
│ ├── index.css # Tailwind directives & custom utilities
│ ├── data/
│ │ └── portfolioData.json # Localized content, skills, projects, contact
│ ├── components/
│ │ ├── Navbar.jsx # Topbar + language/theme toggle
│ │ ├── Sidebar.jsx # Bio, status, and contact links
│ │ ├── Stack.jsx # Skills section
│ │ ├── CaseStudy.jsx # Project details
│ │ ├── Experience.jsx # Career history
│ │ ├── Education.jsx # Educational background
│ │ ├── Contact.jsx # Contact info
│ │ ├── Footer.jsx # Footer
│ │ └── SideScrollNav.jsx # Active section navigation
│ ├── theme/
│ │ └── ThemeProvider.jsx # Theme context provider
│ ├── hooks/
│ │ └── useActiveSection.js # Intersection observer for scroll tracking
│ └── lib/
│ ├── motion.js # Easing & motion presets
│ └── smoothScroll.js # Lenis initialization
```

## Getting Started

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```