# Circle One

A modern social platform built with React, Vite, and Tailwind CSS featuring messaging, status updates, communities, and scheduling capabilities.

## Features

- 🔐 **Authentication** - Phone/OTP and email login
- 💬 **Real-time Chat** - Instant messaging with conversation management  
- 📱 **Status Updates** - Share moments with photo/text statuses
- 🏢 **Channels** - Official announcements and updates
- 👥 **Communities** - Topic-based discussion forums
- 🤖 **AI Chatbot** - Intelligent assistant for help and queries
- 📹 **AR Meetings** - Virtual conference rooms with spatial features
- 👤 **Profile Management** - Customizable user profiles
- 📅 **Smart Scheduling** - Calendar booking with payment integration
- ⚙️ **Settings** - Comprehensive preference management

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom electric blue theme
- **Routing**: React Router DOM v6
- **State Management**: Zustand + Context API
- **Icons**: Lucide React
- **Language**: JavaScript (JSX only)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## Design System

The app features a futuristic design with:

- **Primary Color**: Electric Blue (#00AEEF) with full shade scale
- **Typography**: Inter (body) and Poppins (headings) 
- **Effects**: Glassmorphism, subtle animations, electric blue glows
- **Layout**: 8px spacing grid, 2xl rounded corners
- **Responsive**: Mobile-first with thoughtful breakpoints

## Project Structure

```
src/
├── routes/           # Main route components
├── pages/           # Feature-specific page components
├── components/      # Reusable UI components
│   ├── layout/     # Layout components (Header, Sidebar, etc.)
│   ├── ui/         # Basic UI components (Button, Input, etc.)
│   ├── chat/       # Chat-specific components
│   └── status/     # Status-specific components
├── store/          # State management
├── mock/           # Mock data for development
├── services/       # API and business logic
└── lib/            # Utilities and constants
```

## Development

The app uses mock data for development and is designed to be easily connected to real backend services. All components are modular and follow React best practices.

Visit [http://localhost:5173](http://localhost:5173) to see the application running.