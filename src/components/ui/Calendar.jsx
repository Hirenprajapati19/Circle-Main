import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Calendar = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDay = firstDay.getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(month + direction)
    setCurrentMonth(newDate)
  }

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const isToday = (day) => {
    const date = new Date(year, month, day)
    return date.toDateString() === today.toDateString()
  }

  const isPast = (day) => {
    const date = new Date(year, month, day)
    return date < today.setHours(0, 0, 0, 0)
  }

  const isSelected = (day) => {
    return selectedDate === formatDate(day)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDay }, (_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1
          const date = formatDate(day)
          const disabled = isPast(day)
          const selected = isSelected(day)
          const todayClass = isToday(day)

          return (
            <button
              key={day}
              onClick={() => !disabled && onSelectDate(date)}
              disabled={disabled}
              className={`p-2 text-sm rounded-xl transition-colors ${
                disabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : selected
                  ? 'bg-el-blue-500 text-white'
                  : todayClass
                  ? 'bg-el-blue-100 text-el-blue-700 font-medium'
                  : 'hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar