'use client'

import { useEffect, useState } from 'react'
import data from '@/constants/quotes.json' // adjust path if needed
import Modal from "react-modal";

type Verse = {
  text: string
  verse: string
}

type Content =
  | { type: 'message'; value: string }
  | { type: 'quote'; value: string }
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
      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1628] shadow-[0_0_80px_rgba(40,80,180,0.2)] p-6 gap-4 items-center justify-between">
          <button
            onClick={closeModal}
            className="text-[#3a4e6a] hover:text-[#8ab0d8] transition-colors text-lg leading-none float-right"
            aria-label="Close"
          >
            ✕
          </button>
        {/* Header */}
        <div className="flex flex-col items-center min-h-52 place-content-center">
          {content.type === 'verse' ? (
          <>
            <h2 className="text-sm font-medium tracking-widest uppercase text-[#7d9acc]">
              {content.value.text} 
            </h2>
            <h2 className="text-sm font-medium tracking-widest uppercase text-[#7d9acc]">
              — {content.value.verse}
            </h2>
          </>
          ) : (
            <h2 className="text-sm font-medium tracking-widest uppercase text-[#7d9acc]">
              {content.value}
            </h2>
          )}
        </div>
      </div>
    </Modal>
  )
}