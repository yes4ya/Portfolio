# Portofolio Yesaya Roy Nugraha (Yesa)

Portofolio web modern, interaktif, dan responsif yang dibangun menggunakan **React**, **Vite**, dan **Tailwind CSS**, berbasis data terstruktur dari `src/data/portfolioData.json`.

## 🛠️ Tech Stack & Ekosistem
- **Framework & Core**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Design System**: Dark-themed modern UI, glassmorphism, glowing ambient gradients, clean typography (Inter & JetBrains Mono)

## 📁 Struktur Komponen Proyek
```text
D:\Project Portofolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── dist/                          # Production build output
└── src/
    ├── main.jsx                   # Entry point aplikasi
    ├── App.jsx                    # Root component perakit
    ├── index.css                  # Directives Tailwind & custom utilities
    ├── data/
    │   └── portfolioData.json     # Sumber data utama profil & portofolio
    └── components/
        ├── Navbar.jsx             # Navigasi responsif (desktop & mobile menu)
        ├── Hero.jsx               # Headline, bio singkat, CTA, interactive code terminal
        ├── About.jsx              # Profil lengkap, pilar keahlian, info akademis
        ├── Skills.jsx             # Tech stack, level badge, filter kategori
        ├── Projects.jsx           # Showcase proyek unggulan & visualisasi interaktif
        ├── Education.jsx          # Riwayat S.Kom UKSW & fokus spesialisasi
        ├── Contact.jsx            # Form kontak interaktif, salin email, tautan sosial
        └── Footer.jsx             # Copyright, quick links, back-to-top button
```

## 🚀 Menjalankan Proyek
Pastikan Node.js telah terpasang di sistem.

```bash
# Menjalankan development server
npm run dev

# Membangun bundle produksi
npm run build

# Menjalankan preview dari build produksi
npm run preview
```
