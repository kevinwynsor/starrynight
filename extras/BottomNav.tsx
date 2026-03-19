"use client";

type Tab = "home" | "rant" | "wins" | "timeline" | "profile";

interface BottomNavProps {
  active: Tab;
  onNavigate: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Sky", icon: "✦" },
  { id: "wins", label: "Wins", icon: "◈" },
  { id: "timeline", label: "Path", icon: "◌" },
  { id: "profile", label: "You", icon: "◯" },
];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 tab-bar">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 pt-2 pb-1">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all duration-200 active:scale-95"
            >
              <span
                className={`text-base transition-all duration-300 ${
                  isActive
                    ? "text-[#7C83FD] opacity-100"
                    : "text-[#4A5268] opacity-60"
                }`}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase font-medium transition-all duration-300 ${
                  isActive ? "text-[#7C83FD]" : "text-[#4A5268]"
                }`}
              >
                {tab.label}
              </span>
              <div
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  isActive ? "bg-[#7C83FD] opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
