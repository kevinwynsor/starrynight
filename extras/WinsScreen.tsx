"use client";
import { useState } from "react";

export interface Win {
  id: string;
  text: string;
  category: "nature" | "body" | "mind" | "social" | "rest";
  time: Date;
}

const categoryConfig = {
  nature: { emoji: "🌿", color: "rgba(94,200,140,0.12)", label: "Outside" },
  body: { emoji: "💧", color: "rgba(110,195,255,0.1)", label: "Body" },
  mind: { emoji: "✨", color: "rgba(124,131,253,0.1)", label: "Mind" },
  social: { emoji: "🤍", color: "rgba(244,213,141,0.08)", label: "Social" },
  rest: { emoji: "🌙", color: "rgba(124,131,253,0.08)", label: "Rest" },
};

const defaultWins: Win[] = [
  { id: "1", text: "Went outside, even just for five minutes", category: "nature", time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "2", text: "Drank water before reaching for coffee", category: "body", time: new Date(Date.now() - 8 * 60 * 60 * 1000) },
  { id: "3", text: "Replied to that message I'd been avoiding", category: "social", time: new Date(Date.now() - 26 * 60 * 60 * 1000) },
  { id: "4", text: "Made the bed", category: "mind", time: new Date(Date.now() - 27 * 60 * 60 * 1000) },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diffH = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  if (diffH < 24) {
    return `Today · ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  } else if (diffH < 48) {
    return "Yesterday";
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

interface WinsScreenProps {
  wins?: Win[];
  onAddWin?: (win: Win) => void;
}

export default function WinsScreen({ wins: externalWins, onAddWin }: WinsScreenProps) {
  const [wins, setWins] = useState<Win[]>(defaultWins);
  const [showAdd, setShowAdd] = useState(false);
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState<Win["category"]>("mind");

  const allWins = externalWins ? [...externalWins, ...wins] : wins;

  const handleAdd = () => {
    if (!newText.trim()) return;
    const win: Win = {
      id: Date.now().toString(),
      text: newText.trim(),
      category: newCategory,
      time: new Date(),
    };
    if (onAddWin) onAddWin(win);
    setWins((prev) => [win, ...prev]);
    setNewText("");
    setShowAdd(false);
  };

  return (
    <div className="relative flex flex-col h-full bg-[#0B0F1A] overflow-hidden">

      {/* Header */}
      <div className="px-6 pt-16 pb-4 animate-fadeUp" style={{ opacity: 0, animationDelay: "0.05s" }}>
        <p className="text-[10px] tracking-[0.16em] uppercase text-[#4A5268] mb-1">Your moments</p>
        <h1 className="font-serif text-2xl text-[#E8EAF2]">Small wins</h1>
        <p className="text-sm text-[#4A5268] mt-1">Every one matters</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 pb-36 flex flex-col gap-3">
        {allWins.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 gap-3 text-center">
            <div className="text-3xl opacity-30">✦</div>
            <p className="text-sm text-[#4A5268]">No wins logged yet.</p>
            <p className="text-xs text-[#3a4055]">Even getting here counts.</p>
          </div>
        ) : (
          allWins.map((win, i) => {
            const cfg = categoryConfig[win.category];
            return (
              <div
                key={win.id}
                className="win-card flex items-start gap-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl px-4 py-3.5 animate-fadeUp"
                style={{ opacity: 0, animationDelay: `${0.1 + i * 0.07}s` }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                  style={{ background: cfg.color }}
                >
                  {cfg.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#E8EAF2] leading-snug">{win.text}</p>
                  <p className="text-[10px] text-[#4A5268] mt-1">{formatTime(win.time)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Win Modal */}
      {showAdd && (
        <div className="absolute inset-0 bg-[rgba(8,11,19,0.92)] z-20 flex flex-col justify-end animate-slideUp">
          <div className="bg-[#121826] border-t border-white/[0.07] rounded-t-3xl px-6 pt-6 pb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-lg text-[#E8EAF2]">Add a win</h2>
              <button onClick={() => setShowAdd(false)} className="text-[#4A5268] hover:text-[#8891A8] text-xl">✕</button>
            </div>

            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="What small thing did you do?"
              rows={3}
              autoFocus
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-[#E8EAF2] text-sm leading-relaxed resize-none placeholder:text-[#2e3448] focus:border-[rgba(110,195,255,0.2)] transition-colors mb-4"
            />

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#4A5268] mb-3">Category</p>
            <div className="flex gap-2 mb-5 flex-wrap">
              {(Object.keys(categoryConfig) as Win["category"][]).map((cat) => {
                const cfg = categoryConfig[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setNewCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all duration-200 ${
                      newCategory === cat
                        ? "border-[rgba(110,195,255,0.35)] bg-[rgba(110,195,255,0.1)] text-[#6EC3FF]"
                        : "border-white/[0.07] bg-white/[0.02] text-[#4A5268]"
                    }`}
                  >
                    <span>{cfg.emoji}</span>
                    <span>{cfg.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleAdd}
              disabled={!newText.trim()}
              className={`btn-primary w-full py-4 rounded-2xl text-sm font-medium tracking-wide transition-all ${
                newText.trim()
                  ? "bg-[rgba(110,195,255,0.12)] border border-[rgba(110,195,255,0.25)] text-[#6EC3FF] hover:bg-[rgba(110,195,255,0.2)]"
                  : "bg-white/[0.03] border border-white/[0.06] text-[#3a4055] cursor-not-allowed"
              }`}
            >
              Save this win
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      {!showAdd && (
        <button
          onClick={() => setShowAdd(true)}
          className="absolute bottom-24 right-5 w-12 h-12 rounded-full bg-[rgba(110,195,255,0.12)] border border-[rgba(110,195,255,0.22)] text-[#6EC3FF] text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(110,195,255,0.08)] hover:bg-[rgba(110,195,255,0.2)] transition-all active:scale-95"
        >
          +
        </button>
      )}
    </div>
  );
}
