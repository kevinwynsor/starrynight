"use client";
import StarField from "@/extras/StarField";

interface HomeScreenProps {
  starCount: number;
  onLetItOut: () => void;
}

export default function HomeScreen({ starCount, onLetItOut }: HomeScreenProps) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 5
      ? "Still awake"
      : hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : hour < 21
      ? "Good evening"
      : "Tonight";

  return (
    <div className="relative flex flex-col items-center justify-between h-full overflow-hidden bg-[#080b13]">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,_#0e1625_0%,_#060810_100%)]" />

      {/* Stars */}
      <StarField count={70} />

      {/* Ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[radial-gradient(circle,_rgba(124,131,253,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Moon accent */}
      <div className="absolute top-16 right-8 w-10 h-10 rounded-full border border-[rgba(244,213,141,0.18)] bg-[radial-gradient(circle,_rgba(244,213,141,0.12)_0%,_transparent_70%)] animate-shimmer" />

      {/* Top label */}
      <div className="relative z-10 pt-20 text-center animate-fadeUp" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <p className="text-xs tracking-[0.18em] uppercase text-[#4A5268]">{greeting}</p>
      </div>

      {/* Center count */}
      <div className="relative z-10 flex flex-col items-center gap-3 animate-fadeUp" style={{ animationDelay: "0.25s", opacity: 0 }}>
        {/* Glow ring */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-40 h-40 rounded-full bg-[radial-gradient(circle,_rgba(124,131,253,0.08)_0%,_transparent_70%)] animate-pulseGlow" />
          <span className="font-serif text-[88px] leading-none text-[#E8EAF2]" style={{ textShadow: "0 0 60px rgba(124,131,253,0.25)" }}>
            {starCount}
          </span>
        </div>
        <p className="text-sm text-[#4A5268] tracking-wide">
          {starCount === 1 ? "storm released" : "storms released"} this week
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 w-full px-8 pb-32 animate-fadeUp" style={{ animationDelay: "0.4s", opacity: 0 }}>
        <button
          onClick={onLetItOut}
          className="btn-primary w-full py-4 rounded-2xl bg-[rgba(124,131,253,0.12)] border border-[rgba(124,131,253,0.25)] text-[#a8aeff] text-sm font-medium tracking-wide hover:bg-[rgba(124,131,253,0.2)] transition-all duration-300"
        >
          Let it out
        </button>
        <p className="text-center text-[10px] text-[#2e3448] mt-4 tracking-widest uppercase">
          Private · No one sees this
        </p>
      </div>
    </div>
  );
}
