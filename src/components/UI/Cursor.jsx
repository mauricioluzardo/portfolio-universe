import { useEffect, useRef } from 'react'

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

export default function Cursor() {
  const cursorRef = useRef()
  const trailRef = useRef()

  useEffect(() => {
    if (isTouchDevice()) return
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = e.clientX + 'px'
          trailRef.current.style.top = e.clientY + 'px'
        }
      }, 80)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (isTouchDevice()) return null

  return (
    <>
      {/* Nave principal */}
      <div ref={cursorRef} className="fixed pointer-events-none z-50" style={{ transform: 'translate(-50%, -50%)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15 9H20L16 13.5L17.5 21L12 17L6.5 21L8 13.5L4 9H9L12 2Z"
            fill="none" stroke="#00FFF0" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="2" fill="#C77DFF" />
        </svg>
      </div>
      {/* Trail */}
      <div ref={trailRef} className="fixed pointer-events-none z-40 w-1 h-1 rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          background: '#9B5FE3',
          opacity: 0.5,
          boxShadow: '0 0 6px #9B5FE3',
        }}
      />
    </>
  )
}
