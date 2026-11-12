import React from 'react';

const About = ({ personal }) => {
  return (
    <section id="about" className="py-12 sm:py-16 border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Label Section */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-typography-muted">
              Tentang
            </h2>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 space-y-6">
            <p className="text-base sm:text-lg text-typography-primary leading-relaxed">
              {personal.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-surface-borderSubtle text-sm">
              <div>
                <h3 className="font-semibold text-white mb-2">
                  Pendekatan Rekayasa
                </h3>
                <p className="text-typography-secondary leading-relaxed text-xs sm:text-sm">
                  Mengutamakan struktur komponen yang modular, semantic HTML untuk aksesibilitas, serta efisiensi render antarmuka web. Setiap baris kode ditulis agar mudah dibaca, diuji, dan dipelihara dalam jangka panjang.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">
                  Latar Belakang Akademis
                </h3>
                <p className="text-typography-secondary leading-relaxed text-xs sm:text-sm">
                  Pendidikan Sarjana Komputer di UKSW (2022-2026, IPK 3.53) memberikan landasan dalam algoritma, struktur data, manajemen kompleksitas kode, dan prinsip perancangan perangkat lunak modern.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
