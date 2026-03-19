"use client";

export interface TimelineEntry {
  id: string;
  type: "storm" | "win";
  text: string;
  date: Date;
}

const defaultEntries: TimelineEntry[] = [
  { id: "1", type: "storm", text: "Released something heavy I'd been carrying for days", date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "2", type: "win", text: "Went outside today, even just for a little while", date: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: "3", type: "storm", text: "Hard conversation at work that I didn't ask for", date: new Date(Date.now() - 26 * 60 * 60 * 1000) },
  { id: "4", type: "win", text: "Replied to that message I'd been putting off", date: new Date(Date.now() - 28 * 60 * 60 * 1000) },
  { id: "5", type: "storm", text: "Felt completely lost and sat with it anyway", date: new Date(Date.now() - 52 * 60 * 60 * 1000) },
  { id: "6", type: "win", text: "Made the bed — small, but it mattered", date: new Date(Date.now() - 54 * 60 * 60 * 1000) },
  { id: "7", type: "storm", text: "Everything felt too heavy to explain", date: new Date(Date.now() - 76 * 60 * 60 * 1000) },
  { id: "8", type: "win", text: "Drank water before reaching for my phone", date: new Date(Date.now() - 100 * 60 * 60 * 1000) },
];

function formatDate(date: Date): string {
  const now = new Date();
  const diffH = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (diffH < 24) return `Today · ${time}`;
  if (diffH < 48) return `Yesterday · ${time}`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[date.getDay()]} · ${time}`;
}

interface TimelineScreenProps {
  entries?: TimelineEntry[];
}

export default function TimelineScreen({ entries: ext }: TimelineScreenProps) {
  const entries = ext ? [...ext, ...defaultEntries] : defaultEntries;
  const storms = entries.filter((e) => e.type === "storm").length;
  const wins = entries.filter((e) => e.type === "win").length;
  const days = 7;

  return (
    <div className="flex flex-col h-full bg-[#0B0F1A] overflow-hidden">

      {/* Header */}
      <div className="px-6 pt-16 pb-4 animate-fadeUp" style={{ opacity: 0, animationDelay: "0.05s" }}>
        <p className="text-[10px] tracking-[0.16em] uppercase text-[#4A5268] mb-1">This week</p>
        <h1 className="font-serif text-2xl text-[#E8EAF2]">You made it through</h1>
      </div>

      {/* Summary card */}
      <div
        className="mx-5 mb-5 bg-[rgba(124,131,253,0.05)] border border-[rgba(124,131,253,0.1)] rounded-2xl px-5 py-4 flex items-center gap-0 animate-fadeUp"
        style={{ opacity: 0, animationDelay: "0.15s" }}
      >
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-2xl font-medium text-[rgba(244,213,141,0.85)]">{storms}</span>
          <span className="text-[9px] uppercase tracking-[0.1em] text-[#4A5268]">Hard days</span>
        </div>
        <div className="w-px h-8 bg-white/[0.07]" />
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-2xl font-medium text-[rgba(110,195,255,0.8)]">{wins}</span>
          <span className="text-[9px] uppercase tracking-[0.1em] text-[#4A5268]">Small wins</span>
        </div>
        <div className="w-px h-8 bg-white/[0.07]" />
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-2xl font-medium text-[#E8EAF2]">{days}</span>
          <span className="text-[9px] uppercase tracking-[0.1em] text-[#4A5268]">Days logged</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-5 pb-36">
        <div className="flex flex-col">
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="flex gap-4 animate-fadeUp"
              style={{ opacity: 0, animationDelay: `${0.2 + i * 0.06}s` }}
            >
              {/* Timeline column */}
              <div className="flex flex-col items-center flex-shrink-0 w-5 pt-1.5">
                {/* Dot */}
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    entry.type === "storm"
                      ? "bg-[rgba(244,213,141,0.7)] shadow-[0_0_8px_rgba(244,213,141,0.3)]"
                      : "bg-[rgba(110,195,255,0.7)] shadow-[0_0_8px_rgba(110,195,255,0.2)]"
                  }`}
                />
                {/* Connector line */}
                {i < entries.length - 1 && (
                  <div className="w-px flex-1 min-h-6 bg-white/[0.05] my-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-5">
                <p className="text-sm text-[#C8CAD8] leading-snug mb-1">{entry.text}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-[#4A5268]">{formatDate(entry.date)}</p>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full tracking-wide ${
                      entry.type === "storm"
                        ? "bg-[rgba(244,213,141,0.08)] text-[rgba(244,213,141,0.6)]"
                        : "bg-[rgba(110,195,255,0.07)] text-[rgba(110,195,255,0.6)]"
                    }`}
                  >
                    {entry.type === "storm" ? "storm" : "win"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
