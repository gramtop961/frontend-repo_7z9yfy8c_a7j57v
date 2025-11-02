import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-neutral-950 border border-white/10">
      <Spline
        scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Soft overlays that don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute inset-0 flex items-end md:items-center justify-start p-6 md:p-10">
        <div className="backdrop-blur-sm bg-black/30 border border-white/10 p-4 md:p-6 rounded-xl max-w-xl">
          <h1 className="text-2xl md:text-4xl font-semibold text-white tracking-tight">
            JARVIS Personal Assistant
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/70">
            Your private, always‑on Windows companion. Speak or type — JARVIS listens, thinks, and acts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
