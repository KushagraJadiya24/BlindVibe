import { Heart, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-black">
      {/* Dark romantic background */}
      <div className="absolute inset-0 bg-slate-900" />

      {/* Romantic ambient lighting */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-rose-600/15 blur-3xl animate-pulse"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-pink-700/15 blur-3xl animate-pulse"
        style={{ animationDuration: "8s", animationDelay: "1s" }}
      />

      {/* Floating hearts */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-pulse"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDuration: Math.random() * 3 + 3 + "s",
            animationDelay: Math.random() * 2 + "s",
            opacity: Math.random() * 0.4 + 0.1,
          }}
        >
          <Heart
            size={Math.random() * 16 + 12}
            className="text-rose-500/40"
            fill="currentColor"
          />
        </div>
      ))}

      {/* Subtle star-like particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: Math.random() * 3 + 2 + "s",
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-32 text-center">
        {/* Sparkle accent */}
        <div className="mb-6 flex justify-center">
          <Sparkles size={20} className="text-rose-400/60" />
        </div>

        {/* Label */}
        <div className="text-xs tracking-[0.3em] uppercase text-rose-400/60 font-light">
          Discover Your Vibe
        </div>

        {/* Main heading with heart accents */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <Heart
            size={32}
            className="text-rose-500/40 animate-pulse"
            fill="currentColor"
          />
          <h1 className="text-5xl sm:text-7xl font-thin tracking-tight text-white">
            BlindVibe
          </h1>
          <Heart
            size={32}
            className="text-rose-500/40 animate-pulse"
            fill="currentColor"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Subheading */}
        <p className="mt-6 text-white/60 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Group-based blind dating that matches on shared vibes. Join a curated
          crew and meet at a fun venue.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/questionnaire"
            className="group relative inline-flex items-center justify-center rounded-lg bg-rose-600 px-8 py-3 text-sm font-medium text-white overflow-hidden transition-all duration-300 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start questionnaire
              <Heart
                size={16}
                className="group-hover:animate-pulse"
                fill="currentColor"
              />
            </span>
          </a>
          <a
            href="/results"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-white/80 hover:bg-white/5 hover:border-rose-500/50 hover:text-rose-200 transition-all duration-300 backdrop-blur-sm"
          >
            View results
          </a>
        </div>

        {/* Decorative hearts */}
        <div className="mt-16 flex justify-center gap-3">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              size={14}
              className="text-rose-500/30 animate-pulse"
              fill="currentColor"
              style={{ animationDelay: i * 0.2 + "s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
