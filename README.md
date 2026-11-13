# Portofolio Yesaya Roy Nugraha (Yesa)

Portofolio web satu halaman yang dibangun dengan **React**, **Vite**, dan **Tailwind CSS**, berbasis data terstruktur dari `src/data/portfolioData.json`. Dua bahasa (Indonesia dan Inggris) dan mode terang/gelap tersedia tanpa reload halaman.

## Tech Stack
- **Framework & Core**: React 18, Vite 6
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Animasi**: Framer Motion (reveal + stagger), Lenis (smooth scroll)
- **Ikon**: Lucide React

## Struktur
```text
D:\Project Portofolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── antislop.md
├── AGENTS.md
├── src/
│   ├── main.jsx                # Entry point
│   ├── App.jsx                 # Root layout (Sidebar + main scroll + footer)
│   ├── index.css               # Tailwind directives & custom utilities
│   ├── data/
│   │   └── portfolioData.json  # Semua copy id/en, skill, proyek, kontak
│   ├── components/
│   │   ├── Navbar.jsx          # Topbar + language toggle + theme toggle
│   │   ├── Sidebar.jsx         # Left column: bio, status, contact links
│   │   ├── Stack.jsx           # Section keahlian (static pills)
│   │   ├── CaseStudy.jsx       # Detail proyek E-Library
│   │   ├── Experience.jsx      # Riwayat magang / kerja
│   │   ├── Education.jsx       # Riwayat pendidikan
│   │   ├── Contact.jsx         # Email + form (mailto)
│   │   ├── Footer.jsx          # Footer
│   │   ├── ThemeToggle.jsx     # Icon-only light/dark toggle
│   │   └── SideScrollNav.jsx   # Dot nav berdasarkan section aktif
│   ├── theme/
│   │   └── ThemeProvider.jsx   # Provider dark/light + localStorage
│   ├── hooks/
│   │   └── useActiveSection.js # Intersection observer section aktif
│   └── lib/
│       ├── motion.js           # Easing & motion presets
│       └── smoothScroll.js     # Lenis init + scrollTo helpers
└── public/                     # Static assets (jika ada)
```

## Menjalankan Proyek
Pastikan Node.js telah terpasang di sistem.

```bash
# Development server
npm run dev

# Build produksi
npm run build

# Preview build produksi
npm run preview
```

## Aturan Copy & UI
Semua copy dan keputusan visual mengikuti aturan `antislop.md` dan `AGENTS.md`. Tidak ada kata klise AI, filler, atau em dash. Bahasa Indonesia menggunakan gaya Natural Indo-English Mix yang lazim dipakai praktisi UI/UX & Frontend di Indonesia.
