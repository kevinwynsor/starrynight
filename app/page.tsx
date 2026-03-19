"use client";
import { useState, useCallback } from "react";
import BottomNav from "@/extras/BottomNav";
import HomeScreen from "@/extras/HomeScreen";
import RantScreen from "@/extras/RantScreen";
import FeedbackScreen from "@/extras/FeedbackScreen";
import WinsScreen, { Win } from "@/extras/WinsScreen";
import TimelineScreen, { TimelineEntry } from "@/extras/TimelineScreen";
import ProfileScreen from "@/extras/ProfileScreen";
import StarryNight from "@/components/StarryNight";

type Tab = "home" | "rant" | "wins" | "timeline" | "profile";
type Flow = "idle" | "ranting" | "feedback";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [flow, setFlow] = useState<Flow>("idle");
  const [wins, setWins] = useState<Win[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [starCount, setStarCount] = useState(7);

  const handleLetItOut = useCallback(() => {
    setFlow("ranting");
  }, []);

  const handleRelease = useCallback((text: string) => {
    setFlow("feedback");
    setStarCount((c) => c + 1);
    setTimeline((prev) => [
      {
        id: Date.now().toString(),
        type: "storm",
        text: text.slice(0, 80) + (text.length > 80 ? "…" : ""),
        date: new Date(),
      },
      ...prev,
    ]);
  }, []);

  const handleFeedbackDone = useCallback((win?: string) => {
    if (win?.trim()) {
      const newWin: Win = {
        id: Date.now().toString(),
        text: win.trim(),
        category: "mind",
        time: new Date(),
      };
      setWins((prev) => [newWin, ...prev]);
      setTimeline((prev) => [
        {
          id: (Date.now() + 1).toString(),
          type: "win",
          text: win.trim(),
          date: new Date(),
        },
        ...prev,
      ]);
    }
    setFlow("idle");
    setActiveTab("home");
  }, []);

  const handleAddWin = useCallback((win: Win) => {
    setTimeline((prev) => [
      {
        id: Date.now().toString(),
        type: "win",
        text: win.text,
        date: win.time,
      },
      ...prev,
    ]);
  }, []);

  const totalStorms = 42 + timeline.filter((e) => e.type === "storm").length;
  const totalWins = 18 + wins.length;

  // Full-screen overlay flows
  if (flow === "ranting") {
    return (
      <div className="fixed inset-0 z-50 bg-[#0B0F1A]">
        <RantScreen
          onRelease={handleRelease}
          onClose={() => setFlow("idle")}
        />
      </div>
    );
  }

  if (flow === "feedback") {
    return (
      <div className="fixed inset-0 z-50 bg-[#0B0F1A]">
        <FeedbackScreen onDone={handleFeedbackDone} />
      </div>
    );
  }

  return (
    // <div className="relative flex flex-col h-screen max-w-md mx-auto overflow-hidden bg-[#0B0F1A]">
    //   {/* Screen content */}
    //   <main className="flex-1 overflow-hidden relative">
    //     <div key={activeTab} className="absolute inset-0 page-enter">
    //       {activeTab === "home" && (
    //         <HomeScreen starCount={starCount} onLetItOut={handleLetItOut} />
    //       )}
    //       {activeTab === "wins" && (
    //         <WinsScreen wins={wins} onAddWin={handleAddWin} />
    //       )}
    //       {activeTab === "timeline" && (
    //         <TimelineScreen entries={timeline} />
    //       )}
    //       {activeTab === "profile" && (
    //         <ProfileScreen totalStorms={totalStorms} totalWins={totalWins} />
    //       )}
    //     </div>
    //   </main>

    //   {/* Bottom navigation */}
    //   <BottomNav
    //     active={activeTab}
    //     onNavigate={(tab) => setActiveTab(tab)}
    //   />
    // </div>
    <StarryNight/>
  );
}
