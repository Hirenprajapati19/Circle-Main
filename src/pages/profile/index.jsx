import React, { useState } from 'react'
import { Edit3, Save, X, Camera } from 'lucide-react'
import { useAuth } from '../../store/useAuth'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Avatar from '../../components/ui/Avatar'

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    about: 'Digital creator and tech enthusiast',
    phone: user?.phone || '+1 (555) 123-4567',
    email: user?.email || 'john@example.com',
    company: 'Circle Inc.',
    website: 'https://johndoe.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe'
  })

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'John Doe',
      about: 'Digital creator and tech enthusiast',
      phone: user?.phone || '+1 (555) 123-4567',
      email: user?.email || 'john@example.com',
      company: 'Circle Inc.',
      website: 'https://johndoe.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe'
    })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-600 mb-2">Profile</h1>
            <p className="text-sm sm:text-base text-white">Manage your personal information</p>
          </div>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Button>

          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center text-white gap-2 text-sm">
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel} className="flex items-center gap-2 text-sm">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <Card className="p-6 sm:p-8">
          {/* Profile Picture */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Avatar size="xl" name={formData.name} />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-red-600 mb-2">Full Name</label>
                {isEditing ? (
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-white py-3 text-sm sm:text-base">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-600 mb-2">Phone</label>
                {isEditing ? (
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-white py-3 text-sm sm:text-base">{formData.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-600 mb-2">About</label>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-300 focus:border-red-500 focus:ring-2 sm:focus:ring-4 focus:ring-red-500/20 transition-all duration-200 outline-none resize-none text-sm sm:text-base"
                />
              ) : (
                <p className="text-white py-3 text-sm sm:text-base">{formData.about}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-red-600 mb-2">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-white py-3 text-sm sm:text-base">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-600 mb-2">Company</label>
                {isEditing ? (
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-white py-3 text-sm sm:text-base">{formData.company}</p>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-el-blue-500">Social Links</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">Website</label>
                  {isEditing ? (
                    <Input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-el-blue-500 py-3 text-sm sm:text-base">{formData.website}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">LinkedIn</label>
                  {isEditing ? (
                    <Input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-el-blue-500 py-3 text-sm sm:text-base">{formData.linkedin}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
