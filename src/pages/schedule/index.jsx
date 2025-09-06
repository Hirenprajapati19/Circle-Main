import React, { useState } from 'react'
import { Calendar, Clock, CreditCard, Check } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import CalendarComponent from '../../components/ui/Calendar'

const SchedulePage = () => {
  const [step, setStep] = useState('calendar') // calendar, details, payment, success
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    description: '',
    duration: 30
  })

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  const upcomingAppointments = [
    {
      id: 1,
      title: 'Team Sync',
      date: '2025-01-15',
      time: '10:00',
      duration: 60,
      attendees: ['John', 'Jane', 'Alex']
    },
    {
      id: 2,
      title: 'Client Call',
      date: '2025-01-16',
      time: '14:30',
      duration: 30,
      attendees: ['Client']
    }
  ]

  if (step === 'calendar') {
    return (
      <div className="p-4 sm:p-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-600 mb-2">Schedule</h1>
            <p className="text-sm sm:text-base text-white">Book meetings and manage your calendar</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-red-600 mb-3 sm:mb-4">Select Date & Time</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="font-medium text-white mb-3 text-sm sm:text-base">Choose Date</h3>
                    <CalendarComponent
                      selectedDate={selectedDate}
                      onSelectDate={setSelectedDate}
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <h3 className="font-medium text-red-600 mb-3 text-sm sm:text-base">Available Times</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2 text-xs text-white sm:text-sm rounded-xl border transition-all ${selectedTime === time
                              ? 'bg-red-600 text-white border-red-600'
                              : '  hover:bg-el-blue-500'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedDate && selectedTime && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
                    <Button
                      onClick={() => setStep('details')}
                      className="w-full text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors"
                    >
                      Continue to Details
                    </Button>
                  </div>

                )}
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <Card className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-red-600 mb-3 sm:mb-4">Upcoming</h2>
                <div className="space-y-2 sm:space-y-3">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="p-3 bg-gray-50 rounded-xl sm:rounded-2xl">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">{apt.title}</h4>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{apt.date}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <div className="p-4 sm:p-6 bg-black min-h-screen overflow-hidden">
        <div className="max-w-md mx-auto">
          <Card className="p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 sm:mb-6">Meeting Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Meeting Title</label>
                <Input
                  type="text"
                  placeholder="Enter meeting title"
                  value={meetingDetails.title}
                  onChange={(e) => setMeetingDetails(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  placeholder="Meeting description (optional)"
                  value={meetingDetails.description}
                  onChange={(e) => setMeetingDetails(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 sm:focus:ring-4 focus:ring-red-600/20 transition-all duration-200 outline-none resize-none text-sm sm:text-sm"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-4">
                <Button
                  onClick={() => setStep('calendar')}
                  variant="secondary"
                  className="flex-1 text-sm py-2 sm:py-2.5"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep('payment')}
                  className="flex-1 text-sm py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white"
                  disabled={!meetingDetails.title}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

    )
  }

  if (step === 'payment') {
    return (
      <div className="p-4 sm:p-6 bg-black min-h-screen overflow-hidden">
        <div className="max-w-md mx-auto">
          <Card className="p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-4 sm:mb-6">Payment Method</h2>

            <div className="space-y-4">
              <div className="p-3 sm:p-4 border-2 border-red-200 rounded-xl sm:rounded-2xl bg-red-50">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  <span className="font-medium text-red-900 text-sm sm:text-base">Credit/Debit Card</span>
                </div>
              </div>

              <div className="p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:border-gray-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-400 rounded"></div>
                  <span className="font-medium text-gray-700 text-sm sm:text-base">Bank Transfer</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-el-blue-500 text-sm sm:text-base">Meeting Fee</span>
                  <span className="text-lg sm:text-xl font-bold text-red-600">$25.00</span>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <Button onClick={() => setStep('details')} variant="secondary" className="flex-1 text-sm">
                    Back
                  </Button>
                  <Button onClick={() => setStep('success')} className="flex-1 text-sm py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white">
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="p-4 sm:p-6 bg-black min-h-screen overflow-hidden">
        <div className="max-w-md mx-auto text-center">
          <Card className="p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-3 sm:mb-4">Meeting Booked!</h2>
            <p className="text-sm sm:text-base text-el-blue-500 mb-4 sm:mb-6">
              Your meeting has been successfully scheduled and payment confirmed.
            </p>

            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-left">
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{meetingDetails.title}</h4>
              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{selectedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{selectedTime} (30 minutes)</span>
                </div>
              </div>
            </div>

            <Button onClick={() => setStep('calendar')} className="w-full text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white">
              Schedule Another Meeting
            </Button>
          </Card>
        </div>
      </div>
    )
  }
}

export default SchedulePage
