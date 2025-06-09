'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { calculateTimeStats } from '@/utils/calculateTimeStats'
import { WeekGrid } from '@/components/week-grid'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
    <div>
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Carpe Diem</CardTitle>
          <CardDescription className="text-center">
            Visualize your life in weeks and make every moment count!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="dob" className="block text-sm font-medium">
                  Date of Birth
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !dateOfBirth && 'text-muted-foreground'
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={setDateOfBirth}
                      initialFocus
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      captionLayout="dropdown-buttons"
                      showOutsideDays={false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <Select onValueChange={(value: 'male' | 'female') => setGender(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sleep"
                  checked={showSleepStats}
                  onCheckedChange={(checked) => setShowSleepStats(checked as boolean)}
                />
                <label
                  htmlFor="sleep"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show sleep statistics
                </label>
              </div>
              <Button className="w-full" onClick={calculateStats}>
                Calculate Life Stats
              </Button>
            </div>
            {timeStats && (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold">{timeStats.remainingWeeks} weeks left</p>
                  <p className="text-sm text-muted-foreground">
                    You've lived {timeStats.spentWeeks} weeks out of {timeStats.totalWeeks} total weeks
                  </p>
                  {showSleepStats && (
                    <p className="text-sm text-muted-foreground">
                      You've spent approximately {timeStats.sleepYears} years sleeping
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          {timeStats && (
            <WeekGrid
              totalWeeks={timeStats.totalWeeks}
              spentWeeks={timeStats.spentWeeks}
            />
          )}
        </CardContent>
      </Card>
    </div>
    <footer className="w-full mt-8 flex flex-col items-center text-sm text-muted-foreground">
       CarpeDiem.
      <span className='flex items-center space-x-2'>
        <a
          href="https://unkit.site/projects/carpediem"
          target="_blank"
          className="underline hover:text-primary ml-1"
        >
          Documentation
        </a>
        <a
          href="https://github.com/anktw/carpediem"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary ml-1"
        >
          View on GitHub
        </a>
      </span>
    </footer>
    </div>
  )
}

