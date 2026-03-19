"use client";

interface ProfileScreenProps {
  totalStorms: number;
  totalWins: number;
}

const monthDays = Array.from({ length: 28 }, (_, i) => {
  const rand = Math.random();
  if (rand < 0.35) return "storm";
  if (rand < 0.55) return "win";
  if (rand < 0.7) return "both";
  return "empty";
});

export default function ProfileScreen({ totalStorms, totalWins }: ProfileScreenProps) {
  return (
    <div className="flex flex-col h-full bg-[#0B0F1A] overflow-y-auto">
      <div className="px-6 pt-16 pb-10 flex flex-col gap-6">

        {/* Avatar + Name */}
        <div className="flex flex-col gap-3 animate-fadeUp" style={{ opacity: 0, animationDelay: "0.05s" }}>
          <div className="w-14 h-14 rounded-full border border-[rgba(124,131,253,0.2)] bg-[rgba(124,131,253,0.08)] flex items-center justify-center text-2xl">
            🌙
          </div>
          <div>
            <p className="text-lg font-medium text-[#E8EAF2]">You</p>
            <p className="text-sm text-[#4A5268]">Journaling since March 2024</p>
          </div>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 gap-3 animate-fadeUp"
          style={{ opacity: 0, animationDelay: "0.15s" }}
        >
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4">
            <p
              className="font-serif text-4xl leading-none mb-2"
              style={{ color: "rgba(244,213,141,0.85)" }}
            >
              {totalStorms}
            </p>
            <p className="text-[9px] uppercase tracking-[0.12em] text-[#4A5268] leading-relaxed">
              Storms<br />survived
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4">
            <p
              className="font-serif text-4xl leading-none mb-2"
              style={{ color: "rgba(110,195,255,0.8)" }}
            >
              {totalWins}
            </p>
            <p className="text-[9px] uppercase tracking-[0.12em] text-[#4A5268] leading-relaxed">
              Small<br />wins
            </p>
          </div>
        </div>

        {/* Month overview */}
        <div
          className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 animate-fadeUp"
          style={{ opacity: 0, animationDelay: "0.25s" }}
        >
          <p className="text-[9px] uppercase tracking-[0.12em] text-[#4A5268] mb-4">This month</p>
          <div className="grid grid-cols-7 gap-1.5">
            {monthDays.map((type, i) => (
              <div
                key={i}
                className="w-full aspect-square rounded-full"
                style={{
                  background:
                    type === "storm"
                      ? "rgba(124,131,253,0.5)"
                      : type === "win"
                      ? "rgba(110,195,255,0.5)"
                      : type === "both"
                      ? "rgba(244,213,141,0.45)"
                      : "rgba(255,255,255,0.06)",
                  boxShadow:
                    type === "storm"
                      ? "0 0 6px rgba(124,131,253,0.25)"
                      : type === "win"
                      ? "0 0 6px rgba(110,195,255,0.2)"
                      : type === "both"
                      ? "0 0 6px rgba(244,213,141,0.2)"
                      : "none",
                }}
              />
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-4 mt-4">
            {[
              { color: "rgba(124,131,253,0.6)", label: "Storm" },
              { color: "rgba(110,195,255,0.6)", label: "Win" },
              { color: "rgba(244,213,141,0.5)", label: "Both" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="text-[9px] text-[#4A5268] tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection note */}
        <div
          className="bg-[rgba(124,131,253,0.04)] border border-[rgba(124,131,253,0.08)] rounded-2xl px-4 py-3.5 animate-fadeUp"
          style={{ opacity: 0, animationDelay: "0.35s" }}
        >
          <p className="text-sm text-[#8891A8] font-serif italic leading-relaxed">
            "Every storm you've named here<br />is one you didn't have to carry alone."
          </p>
        </div>

        {/* Privacy note */}
        <div
          className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 animate-fadeUp"
          style={{ opacity: 0, animationDelay: "0.4s" }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="flex-shrink-0 opacity-40">
            <rect x="1" y="7" width="12" height="8" rx="2" stroke="#8891A8" strokeWidth="1.2"/>
            <path d="M4 7V5.5a3 3 0 016 0V7" stroke="#8891A8" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <p className="text-[11px] text-[#4A5268] leading-relaxed">
            All entries are private. Nothing is ever shared or seen by anyone.
          </p>
        </div>

        {/* Version */}
        <p className="text-center text-[10px] text-[#2e3448] tracking-widest">STARLIGHT · v0.1</p>
      </div>
    </div>
  );
}
