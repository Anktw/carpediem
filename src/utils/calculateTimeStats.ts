import { differenceInWeeks } from 'date-fns'

const lifeExpectancy = {
  male: 70.8,
  female: 75.6,
}

export function calculateTimeStats(dateOfBirth: Date, gender: 'male' | 'female') {
  const today = new Date()
  const ageInWeeks = differenceInWeeks(today, dateOfBirth)
  const lifeExpectancyInWeeks = Math.round(lifeExpectancy[gender] * 52)
  const remainingWeeks = Math.max(0, lifeExpectancyInWeeks - ageInWeeks)
  const spentWeeks = Math.min(lifeExpectancyInWeeks, ageInWeeks)

  const sleepYears = (spentWeeks * (8 / 24)) / 52

  return {
    totalWeeks: lifeExpectancyInWeeks,
    remainingWeeks,
    spentWeeks,
    sleepYears: Math.round(sleepYears * 10) / 10
  }
}

