"use client";
import { addStar, getStars } from "@/app/actions";
import styles from "./StarryNight.module.css";
import { useActionState, useState, useEffect, use } from "react";
import Modal from "react-modal";
import Quotes from "./Quotes";
import { supabase } from "@/lib/supabase";

type Action = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}
interface CampfireActionsProps {
  onAction?: (action: boolean) => void;
}

export function CampfireActions({ onAction }: CampfireActionsProps) {
  const actions: Action[] = [
    {
      id: "rest",
      label: "Rest",
      icon: 'let it out',
      onClick: () => onAction?.(true),
    },
  ];
    return (
    <div className={styles.actions}>
      {actions.map((action) => (
        <button
          key={action.id}
          className={styles.actionBtn}
          onClick={action.onClick}
          aria-label={action.label}
        >
          <div className={styles.btnCard}>{action.icon}</div>
          <span className={styles.btnLabel}>{action.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function StarryNight() {
  const [state, formCreateStar, createStarIsPending] = useActionState(addStar, null)
  const [starCount, setStarCount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [afterRant, setAfterRant] = useState(false);
  const [showStar, setShowStar] = useState(false);

  async function fetchStars() {
    const response = await getStars();
    setStarCount(response.length.toString());
  }

  useEffect(() => {
    const channel = supabase.channel('stars')
    channel
      .on('broadcast', { event: 'new_star' }, (payload) => {
        setStarCount((prevCount) => (parseInt(prevCount) + 1).toString());
        setShowStar(true)
      }).subscribe((status) => {
      console.log('STATUS:', status);
      });
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    fetchStars();
    console.log('fetching stars');
  }, [state]);

  useEffect(() => {
    if(isOpen) setShowStar(false);
  }, [isOpen]);


  function toggleAfterRant() {
    closeModal();
    setAfterRant(!afterRant);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeQuoteModal() {
    setShowStar(false)
    setIsOpen(false);
    setAfterRant(false);
    setShowStar(true)
  }

function ActionModal() {
  const meta = "What's on your mind?"
  
  const [text, setText] = useState("");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      onAfterClose={() => setText("")}
      closeTimeoutMS={150}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-[#020510]/75 backdrop-blur-sm"
      className="relative w-full max-w-xl mx-4 outline-none"
    >
      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1628] shadow-[0_0_80px_rgba(40,80,180,0.2)] p-6 flex flex-col gap-4">
 
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-widest uppercase text-[#7d9acc]">
            {meta}
          </h2>
          <button
            onClick={closeModal}
            className="text-[#3a4e6a] hover:text-[#8ab0d8] transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
 
        {/* Divider */}
        <div className="h-px bg-white/5" />
        <form 
        action={async (formData) => {
          await formCreateStar(formData)
          toggleAfterRant()
        }} 
        className="">
          {/* Textarea */}
          <textarea
            rows={4}
            autoFocus
            value={text}
            name="content"
            onChange={(e) => setText(e.target.value)}
            placeholder={meta}
            className="w-full resize-none rounded-lg bg-[#060f1c] border border-white/8 text-[#c0d4f0] text-sm leading-relaxed placeholder-[#2e3f5c] px-4 py-3 outline-none focus:border-[#2a5090]/60 transition-colors min-h-52"
          />
  
          {/* Footer */}
          <div className="flex justify-end">
            <button
              disabled={!text.trim()}
              className="px-5 py-2 rounded-lg bg-[#162d54] border border-[#2a4f8a]/40 text-[#89b4e8] text-xs font-medium tracking-wider uppercase hover:bg-[#1e3f70] hover:text-[#b8d4f8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

  const now = new Date();
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    hour12: false
  }).format(now);
  const greeting =
    parseInt(hour) < 5
      ? "Still awake"
      : parseInt(hour) < 12
      ? "Good morning"
      : parseInt(hour) < 17
      ? "Good afternoon"
      : parseInt(hour) < 24
      ? "Good evening"
      : "Tonight";

      
  
  // Generate stars
  const stars = Array.from({ length: parseInt(starCount) }, (_, i) => ({ 
    id: i,
    top: Math.random() * 75,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 6,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  // Shooting stars
  const shootingStars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: Math.random() * 40 + 5,
    left: Math.random() * 60 + 10,
    delay: i * 4 + Math.random() * 3,
  }));

  return (
    <div className={styles.scene}>
      {/* Sky gradient layers */}
      <div className={styles.sky} />
      <div className={styles.skyGlow} />

      {/* Moon */}
      <div className={styles.moonContainer}>
        <div className={styles.moon}>
          <div className={styles.moonCrater1} />
          <div className={styles.moonCrater2} />
          <div className={styles.moonCrater3} />
        </div>
        <div className={styles.moonHalo} />
      </div>

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: s.opacity,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className={styles.shootingStar}
          style={{
            top: `${s.top}%`,
            left: `${s.left+2}%`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {showStar && (
        <div
          key={showStar.toString()}
          className={styles.oneTimeShootingStar}
          style={{
            top: `${10 * 40 + 5}px`,
            left: `${3 * 60 + 10}px`
        }}
      />
        )}
      
      {/* Milky Way band */}
      <div className={styles.milkyWay} />
      {/* Top label */}
      <div className="relative z-10 pt-20 text-center animate-fadeUp" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <p className="text-xs tracking-[0.18em] uppercase text-[#7d8cb3]">{greeting}</p>
        <p className="text-xs tracking-[0.18em] uppercase text-[#7d8cb3]">There are {starCount ? starCount : <div className={styles.divStar}/>} stars in the sky</p>
        
      </div>
      <CampfireActions onAction={setIsOpen}/>
      <ActionModal />
      <Quotes afterRant={afterRant} closeModal={closeQuoteModal}/>

      {/* Rolling hills / terrain */}
      {/* <div className={styles.hillFar} /> */}
      {/* <div className={styles.hillMid} /> */}
      {/* <div className={styles.hillNear} /> */}

      {/* Trees silhouettes */}
      {/* <div className={styles.treeLine}>
        {Array.from({ length: 14 }, (_, i) => (
          <div
            key={i}
            className={styles.tree}
            style={{
              left: `${i * 7.5 - 2}%`,
              height: `${55 + Math.sin(i * 1.7) * 20}px`,
              width: `${18 + Math.cos(i * 2.1) * 5}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div> */}

      {/* Ground */}
      {/* <div className={styles.ground} /> */}

      {/* Campfire glow on ground */}
      {/* <div className={styles.campfireGlow} /> */}

      {/* Human figure */}
      {/* <div className={styles.human}> */}
        {/* Head */}
        {/* <div className={styles.humanHead} /> */}
        {/* Body */}
        {/* <div className={styles.humanBody} /> */}
        {/* Left arm reaching toward fire */}
        {/* <div className={styles.humanArmLeft} /> */}
        {/* Right arm resting */}
        {/* <div className={styles.humanArmRight} /> */}
        {/* Legs */}
        {/* <div className={styles.humanLegLeft} /> */}
        {/* <div className={styles.humanLegRight} /> */}
      {/* </div> */}

      {/* Campfire */}
      {/* <div className={styles.campfire}> */}
        {/* Logs */}
        {/* <div className={styles.logLeft} /> */}
        {/* <div className={styles.logRight} /> */}
        {/* Embers base */}
        {/* <div className={styles.embers} /> */}
        {/* Flames */}
        {/* <div className={`${styles.flame} ${styles.flameBase}`} /> */}
        {/* <div className={`${styles.flame} ${styles.flameMid}`} /> */}
        {/* <div className={`${styles.flame} ${styles.flameTip}`} /> */}
        {/* <div className={`${styles.flame} ${styles.flameLeft}`} /> */}
        {/* <div className={`${styles.flame} ${styles.flameRight}`} /> */}
        {/* Sparks */}
        {/* {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={styles.spark}
            style={{
              left: `${30 + Math.random() * 40}%`,
              animationDelay: `${i * 0.35}s`,
              animationDuration: `${1.2 + Math.random() * 0.8}s`,
            }}
          />
        ))}
      </div> */}

      {/* Reflection on ground */}
      {/* <div className={styles.fireReflection} /> */}
    </div>
  );
}