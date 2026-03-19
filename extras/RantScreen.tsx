"use client";
import { useState } from "react";
import StarField from "@/extras/StarField";

type Mood = "numb" | "sad" | "angry" | "anxious" | "tearful" | null;

const moods: { id: Mood; emoji: string; label: string }[] = [
  { id: "numb", emoji: "😶", label: "Numb" },
  { id: "sad", emoji: "😔", label: "Sad" },
  { id: "angry", emoji: "😤", label: "Angry" },
  { id: "anxious", emoji: "😰", label: "Anxious" },
  { id: "tearful", emoji: "😢", label: "Tearful" },
];

interface RantScreenProps {
  onRelease: (text: string, mood: Mood) => void;
  onClose: () => void;
}

export default function RantScreen({ onRelease, onClose }: RantScreenProps) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<Mood>(null);
  const [isPrivate, setIsPrivate] = useState(true);

  const handleRelease = () => {
    if (text.trim()) {
      onRelease(text, mood);
    }
  };

  return (
    <div className="relative flex flex-col h-full bg-[#0d1220] overflow-hidden">
      <StarField count={25} />

      {/* Gradient overlay top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0d1220] to-transparent pointer-events-none z-10" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-14 right-5 z-20 w-8 h-8 flex items-center justify-center text-[#4A5268] text-xl hover:text-[#8891A8] transition-colors"
      >
        ✕
      </button>

      <div className="relative z-10 flex flex-col gap-5 px-6 pt-20 pb-36 animate-slideUp">
        {/* Header */}
        <div className="text-center mb-1">
          <p className="text-[11px] tracking-[0.14em] uppercase text-[#4A5268] mb-1">Safe space</p>
          <h1 className="font-serif text-xl text-[#E8EAF2]">Let everything out</h1>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Let everything out… no one will see this"
            rows={8}
            className="w-full bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 py-4 text-[#E8EAF2] text-sm leading-relaxed resize-none placeholder:text-[#3a4055] focus:border-[rgba(124,131,253,0.25)] transition-colors duration-200"
          />
          <div className="absolute bottom-3 right-4 text-[10px] text-[#2e3448]">
            {text.length > 0 && <span>{text.length}</span>}
          </div>
        </div>

        {/* Mood selector */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#4A5268] mb-3">How are you feeling?</p>
          <div className="flex justify-between gap-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMood(m.id === mood ? null : m.id)}
                className={`mood-btn flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all duration-200 ${
                  mood === m.id
                    ? "border-[rgba(124,131,253,0.4)] bg-[rgba(124,131,253,0.08)]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                }`}
              >
                <span className="text-base">{m.emoji}</span>
                <span className={`text-[9px] tracking-wide ${mood === m.id ? "text-[#a8aeff]" : "text-[#4A5268]"}`}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy toggle */}
        <button
          onClick={() => setIsPrivate(!isPrivate)}
          className="flex items-center gap-2 text-[11px] text-[#4A5268] hover:text-[#8891A8] transition-colors"
        >
          <div className={`w-7 h-4 rounded-full border transition-all duration-200 flex items-center px-0.5 ${
            isPrivate ? "border-[rgba(124,131,253,0.3)] bg-[rgba(124,131,253,0.12)]" : "border-white/10 bg-white/5"
          }`}>
            <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
              isPrivate ? "bg-[#7C83FD] translate-x-3" : "bg-[#4A5268] translate-x-0"
            }`} />
          </div>
          Keep this private
        </button>

        {/* Release button */}
        <button
          onClick={handleRelease}
          disabled={!text.trim()}
          className={`btn-primary w-full py-4 rounded-2xl text-sm font-medium tracking-wide transition-all duration-300 ${
            text.trim()
              ? "bg-[rgba(124,131,253,0.18)] border border-[rgba(124,131,253,0.35)] text-[#a8aeff] hover:bg-[rgba(124,131,253,0.28)]"
              : "bg-white/[0.03] border border-white/[0.06] text-[#3a4055] cursor-not-allowed"
          }`}
        >
          Release
        </button>
      </div>
    </div>
  );
}
