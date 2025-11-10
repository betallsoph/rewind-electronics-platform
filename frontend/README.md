# Frontend - Retro Electronics

Next.js 14 + TypeScript frontend với modern UI và advanced features.

## 🚀 Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## 📁 Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout với ToastProvider
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/         # React components (15+)
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── DeviceGrid.tsx
│   ├── DeviceCard.tsx
│   ├── DeviceModal.tsx
│   ├── SearchBar.tsx
│   ├── Timeline3D.tsx
│   ├── DeviceComparison.tsx
│   ├── MemoryWall.tsx
│   ├── AchievementDisplay.tsx
│   ├── CustomCursor.tsx
│   ├── ParticleBackground.tsx
│   ├── Toast.tsx
│   ├── KeyboardShortcuts.tsx
│   └── Footer.tsx
├── contexts/           # React contexts
│   └── ToastContext.tsx
├── hooks/              # Custom hooks
│   └── useKeyboardShortcuts.ts
├── lib/                # Utilities
│   └── api.ts         # API client
└── types/              # TypeScript types
    └── index.ts
```

## ⌨️ Keyboard Shortcuts

- `/` - Focus search
- `G` - Grid view
- `T` - Timeline 3D view
- `M` - Memories view
- `A` - Achievements view
- `C` - Toggle comparison mode
- `ESC` - Close modals

## 🎨 Features

### View Modes
- Grid View (default)
- Timeline 3D (horizontal scroll with parallax)
- Memory Wall (community stories)
- Achievements (gamification)

### Interactions
- Real-time search with debounce
- Device comparison (2-3 devices)
- Like devices
- Share memories
- Unlock achievements
- Custom cursor (desktop only)
- Particle background
- Toast notifications

### UI Components
- Glassmorphism cards
- 3D transforms
- Smooth animations
- Loading states
- Error handling
- Empty states
- Success feedback

## 🔧 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styles
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Canvas API** - Particle effects

## 📱 Responsive Design

- Desktop: Full features + custom cursor
- Tablet: Optimized layout
- Mobile: Touch-friendly, simplified

## 🎯 Performance

- Lazy loading
- Debounced search
- Optimized re-renders
- Efficient animations
- Code splitting

## 🛠️ Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "next": "^14.0.4",
  "axios": "^1.6.2",
  "react-icons": "^4.12.0",
  "typescript": "^5.3.3"
}
```

## 🎨 Styling

- CSS Modules for component styles
- Global styles in `globals.css`
- CSS variables for theming
- Responsive breakpoints
- Smooth transitions

## 🔍 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📄 License

MIT
