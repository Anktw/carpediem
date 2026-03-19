'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { calculateTimeStats } from '@/utils/calculateTimeStats'
import { WeekGrid } from '@/components/week-grid'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function CarpeDiem() {
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [gender, setGender] = useState<'male' | 'female'>()
  const [showSleepStats, setShowSleepStats] = useState(false)
  const [timeStats, setTimeStats] = useState<{
    totalWeeks: number
    remainingWeeks: number
    spentWeeks: number
    sleepYears: number
  } | null>(null)

  const calculateStats = () => {
    if (dateOfBirth && gender) {
      const stats = calculateTimeStats(dateOfBirth, gender)
      setTimeStats(stats)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans selection:bg-amber-500/30">
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-6xl z-10 flex flex-col xl:flex-row gap-12 xl:gap-24 items-center xl:items-start relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full xl:w-[400px] flex flex-col justify-center space-y-8 ${timeStats ? 'xl:sticky xl:top-24' : ''}`}
          >
            <div className="space-y-4 text-center xl:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-100 to-zinc-500">
                Carpe Diem
              </h1>
              <p className="text-zinc-400 text-lg sm:text-xl font-medium tracking-tight">
                Visualize your life. Make every week count.
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold ml-1">
                  Date of Birth
                </label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 h-12 rounded-xl transition-colors tracking-wide ${!dateOfBirth ? 'text-zinc-500' : 'text-zinc-100'
                        }`}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 opacity-70" />
                      {dateOfBirth ? format(dateOfBirth, 'PPP') : <span className="text-base">Select your birthday</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-zinc-800 bg-zinc-950 rounded-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={(date) => {
                        setDateOfBirth(date)
                        if (date) {
                          setIsCalendarOpen(false)
                        }
                      }}
                      initialFocus
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      captionLayout="dropdown-buttons"
                      showOutsideDays={false}
                      className="bg-zinc-950 text-zinc-100 rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold ml-1">
                  Biological Sex
                </label>
                <Select onValueChange={(value: 'male' | 'female') => setGender(value)}>
                  <SelectTrigger className="w-full bg-zinc-950/50 border-zinc-800 h-12 rounded-xl text-base hover:bg-zinc-800 transition-colors tracking-wide">
                    <SelectValue placeholder="Select sex for expectancy" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-800 bg-zinc-950 rounded-xl text-zinc-100">
                    <SelectItem value="male" className="rounded-lg focus:bg-zinc-800 focus:text-zinc-100 tracking-wide">Male</SelectItem>
                    <SelectItem value="female" className="rounded-lg focus:bg-zinc-800 focus:text-zinc-100 tracking-wide">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox
                  id="sleep"
                  checked={showSleepStats}
                  onCheckedChange={(checked) => setShowSleepStats(checked as boolean)}
                  className="border-zinc-700 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-zinc-950 rounded-md w-5 h-5 flex items-center justify-center"
                />
                <label
                  htmlFor="sleep"
                  className="text-sm font-medium leading-none text-zinc-400 cursor-pointer select-none"
                >
                  Highlight sleep duration
                </label>
              </div>

              <Button
                className="w-full h-12 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-white text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all mt-4 tracking-wide"
                onClick={calculateStats}
                disabled={!dateOfBirth || !gender}
              >
                Reveal Life Grid
              </Button>
            </div>
          </motion.div>

          {/* Stats & Grid Area */}
          <AnimatePresence mode="wait">
            {timeStats && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full flex flex-col space-y-10"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-zinc-900/40 border border-zinc-800/40 p-5 rounded-2xl flex flex-col justify-center items-center text-center">
                    <span className="text-zinc-500 text-sm font-medium mb-1 tracking-wide uppercase">Total Weeks</span>
                    <span className="text-3xl font-bold text-zinc-100 tracking-tighter">{timeStats.totalWeeks.toLocaleString()}</span>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/40 p-5 rounded-2xl flex flex-col justify-center items-center text-center">
                    <span className="text-zinc-500 text-sm font-medium mb-1 tracking-wide uppercase">Spent</span>
                    <span className="text-3xl font-bold text-zinc-400 tracking-tighter">{timeStats.spentWeeks.toLocaleString()}</span>
                  </div>
                  <div className="bg-amber-900/10 border border-amber-500/20 p-5 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-[0_0_30px_rgba(245,158,11,0.05)]">
                    <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors" />
                    <span className="text-amber-500/80 text-sm font-medium mb-1 relative z-10 tracking-wide uppercase">Remaining</span>
                    <span className="text-3xl font-bold text-amber-400 relative z-10 tracking-tighter drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">{timeStats.remainingWeeks.toLocaleString()}</span>
                  </div>
                  {showSleepStats ? (
                    <div className="bg-indigo-900/10 border border-indigo-500/20 p-5 rounded-2xl flex flex-col justify-center items-center text-center">
                      <span className="text-indigo-400/80 text-sm font-medium mb-1 tracking-wide uppercase">Years Sleeping</span>
                      <span className="text-3xl font-bold text-indigo-400 tracking-tighter drop-shadow-[0_0_10px_rgba(99,102,241,0.2)]">{timeStats.sleepYears}</span>
                    </div>
                  ) : (
                    <div className="bg-zinc-900/40 border border-zinc-800/40 p-5 rounded-2xl flex flex-col justify-center items-center text-center opacity-50">
                      <span className="text-zinc-600 text-sm font-medium mb-1 tracking-wide uppercase">Sleep Data</span>
                      <span className="text-zinc-600 text-sm font-medium tracking-tight mt-1">Hidden</span>
                    </div>
                  )}
                </div>

                <div className="bg-zinc-900/20 border border-zinc-800/30 p-4 sm:p-6 lg:p-8 rounded-3xl backdrop-blur-sm shadow-2xl overflow-x-auto">
                  <WeekGrid
                    totalWeeks={timeStats.totalWeeks}
                    spentWeeks={timeStats.spentWeeks}
                    showSleepStats={showSleepStats}
                    sleepWeeks={Math.round((timeStats.spentWeeks * 8) / 24)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <footer className="w-full py-8 text-center text-zinc-500 text-sm font-medium tracking-wide">
        <p>CARPE DIEM</p>
        <div className="flex justify-center items-center space-x-4 mt-2">
          <a
            href="https://unkit.site/projects/carpediem"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Documentation
          </a>
          <span>&middot;</span>
          <a
            href="https://github.com/anktw/carpediem"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

