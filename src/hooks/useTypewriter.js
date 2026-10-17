import { useEffect, useState } from 'react'

export function useTypewriter(words, { typeSpeed = 62, deleteSpeed = 30, holdTime = 1500 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (!words.length) return

    const current = words[index % words.length]
    let timeout

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
      } else {
        timeout = setTimeout(() => setPhase('deleting'), holdTime)
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
    } else {
      setPhase('typing')
      setIndex((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [text, phase, index, words, typeSpeed, deleteSpeed, holdTime])

  return text
}

export function useCountUp(target, { duration = 1600, start = false } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }

    let frame
    const begin = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - begin) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, start])

  return value
}
