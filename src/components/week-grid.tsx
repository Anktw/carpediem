import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface WeekGridProps {
  totalWeeks: number
  spentWeeks: number
  showSleepStats?: boolean
  sleepWeeks?: number
}

export function WeekGrid({ totalWeeks, spentWeeks, showSleepStats = false, sleepWeeks = 0 }: WeekGridProps) {
  const gridCells = useMemo(() => {
    const cells = []

    for (let index = 0; index < totalWeeks; index++) {
      let isSpent = index < spentWeeks
      let isSleep = showSleepStats && isSpent && index < sleepWeeks

      let bgClass = ""

      if (isSpent) {
        if (isSleep) {
          bgClass = "bg-indigo-900/60"
        } else {
          bgClass = "bg-zinc-800/80"
        }
      } else {
        bgClass = "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] z-10" // glowing unspent
      }

      cells.push(
        <div
          key={index}
          className={`aspect-square w-full rounded-[1px] md:rounded-[2px] ${bgClass} transition-colors duration-500`}
        />
      )
    }
    return cells
  }, [totalWeeks, spentWeeks, showSleepStats, sleepWeeks])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex justify-center"
    >
      <div
        className="grid gap-[2px] sm:gap-[3px] md:gap-1 w-full max-w-full"
        style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}
      >
        {gridCells}
      </div>
    </motion.div>
  )
}

