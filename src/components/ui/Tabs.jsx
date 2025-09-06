import React from 'react'

const Tabs = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex bg-gray-100 rounded-2xl p-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white text-el-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.icon}
          <span className="font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default Tabs