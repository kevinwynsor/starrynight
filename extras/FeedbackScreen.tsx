"use client";
import { useState } from "react";
import StarField from "@/extras/StarField";

const calmingMessages = [
  "That took courage.\nYou're still here.",
  "You didn't have to hold that alone.\nGood.",
  "Releasing is an act of care\nfor yourself.",
  "That weight was real.\nSo is putting it down.",
  "The sky held your storm.\nYou can rest now.",
];

interface FeedbackScreenProps {
  onDone: (win?: string) => void;
}

export default function FeedbackScreen({ onDone }: FeedbackScreenProps) {
  const [win, setWin] = useState("");
  const message = calmingMessages[Math.floor(Math.random() * calmingMessages.length)];
  const lines = message.split("\n");

  return (
    <div className="relative flex flex-col items-center h-full bg-[#0B0F1A] overflow-hidden">
      <StarField count={35} />

      {/* Subtle radial from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(124,131,253,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-8 pt-24 pb-36 gap-8 w-full animate-fadeUp">

        {/* Floating star */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute w-16 h-16 rounded-full bg-[radial-gradient(circle,_rgba(244,213,141,0.15)_0%,_transparent_70%)] animate-pulseGlow" />
          <div className="absolute w-10 h-10 rounded-full bg-[radial-gradient(circle,_rgba(244,213,141,0.08)_0%,_transparent_70%)] animate-pulseGlow" style={{ animationDelay: "0.5s" }} />
          <div className="w-3 h-3 rounded-full bg-[rgba(244,213,141,0.75)] animate-float shadow-[0_0_12px_rgba(244,213,141,0.4)]" />
        </div>

        {/* Calming message */}
        <div className="text-center" style={{ animationDelay: "0.2s" }}>
          {lines.map((line, i) => (
            <p key={i} className={`font-serif text-xl leading-relaxed ${i === 0 ? "text-[#E8EAF2]" : "text-[#8891A8]"}`}>
              {line}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="w-8 h-px bg-white/[0.07]" />

        {/* Win prompt */}
        <div className="w-full flex flex-col gap-3" style={{ animationDelay: "0.4s" }}>
          <p className="text-[13px] text-[#8891A8] text-center leading-relaxed">
            What's one small thing<br/>you did today?
          </p>
          <input
            type="text"
            value={win}
            onChange={(e) => setWin(e.target.value)}
            placeholder="Even the smallest thing counts…"
            className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 text-[#E8EAF2] text-sm placeholder:text-[#2e3448] focus:border-[rgba(110,195,255,0.2)] transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => onDone(win || undefined)}
            className="btn-primary w-full py-4 rounded-2xl bg-[rgba(110,195,255,0.1)] border border-[rgba(110,195,255,0.2)] text-[#6EC3FF] text-sm font-medium tracking-wide hover:bg-[rgba(110,195,255,0.15)] transition-all"
          >
            {win.trim() ? "Save this" : "Done"}
          </button>
          {win.trim() === "" && (
            <button
              onClick={() => onDone()}
              className="text-[11px] text-[#3a4055] tracking-wide hover:text-[#4A5268] transition-colors"
            >
              skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
