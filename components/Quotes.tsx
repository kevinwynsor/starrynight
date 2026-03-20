'use client'

import { useEffect, useState } from 'react'
import data from '@/constants/quotes.json' // adjust path if needed
import Modal from "react-modal";
import styles from "./StarryNight.module.css";

type Verse = {
  text: string
  verse: string
  body: string
}

type NonVerse = {
  text: string
  body: string
}

type Content =
  | { type: 'message'; value: NonVerse }
  | { type: 'quote'; value: NonVerse }
  | { type: 'verse'; value: Verse }

export default function Quotes({afterRant, closeModal}: {afterRant: boolean, closeModal: () => void}) {
  const [content, setContent] = useState<Content | null>(null)

  const getRandom = () => {
    const all: Content[] = [
      ...data.messages.map((m) => ({ type: 'message' as const, value: m })),
      ...data.quotes.map((q) => ({ type: 'quote' as const, value: q })),
      ...data.verses.map((v) => ({ type: 'verse' as const, value: v }))
    ]

    const random = all[Math.floor(Math.random() * all.length)]
    setContent(random)
  }

  useEffect(() => {
    getRandom()
  }, [afterRant])

  if (!content) return null

  return (
    <Modal
      isOpen={afterRant}
      onRequestClose={closeModal}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-[#020510]/75 backdrop-blur-sm"
      className="relative w-full max-w-sm mx-4 outline-none"
    >
      <div className='text-center'>
      <div className={styles.hidingStar}/>
      </div>
      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1628] shadow-[0_0_80px_rgba(40,80,180,0.2)] p-6 gap-4 items-center justify-between">
          <button
            onClick={closeModal}
            className="text-[#3a4e6a] hover:text-[#8ab0d8] transition-colors text-lg leading-none float-right"
            aria-label="Close"
          >
            ✕
          </button>
          <span className={`text-sm font-semibold tracking-widest uppercase text-sky-300 border-sky-800/40`}>
            Message From the Moon
          </span>
        {/* Header */}
        <div className="flex flex-col items-start min-h-40 place-content-center gap-5">
          {content.type === 'verse' ? (
          <>
            <h2 className="text-base font-medium leading-snug tracking-tight font-serif text-[#7d9acc] italic">
              {content.value.text} 
            </h2>
            <h2 className="text-sm leading-relaxed text-[#7d9acc]">
              {content.value.body} 
            </h2>
            <h2 className="text-xs tracking-wide text-[#7d9acc]">
              — {content.value.verse}
            </h2>
          </>
          ) : (
            <>
              <h2 className="text-sm leading-relaxed text-[#7d9acc] italic font-medium">
                {content.value.text}
              </h2>
              <h2 className="text-xs tracking-wide text-[#7d9acc]">
                {content.value.body}
              </h2>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}