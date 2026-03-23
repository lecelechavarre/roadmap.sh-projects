# Story Features

A production-grade, client-side story implementation inspired by Instagram and WhatsApp, featuring ephemeral content with 24-hour expiration, touch-optimized navigation, and local storage persistence.

[![Tech Stack](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Build Tool](https://img.shields.io/badge/Vite-4.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## Overview

This project implements a fully functional story feature with zero backend dependencies. It demonstrates advanced frontend patterns including custom hooks, local storage management, image processing, and gesture-based navigation.

### Key Features

- **Ephemeral Content**: Automatic 24-hour expiration with background cleanup
- **Client-Side Persistence**: LocalStorage-based storage with expiry management
- **Touch-Optimized**: Full swipe gesture support with pause/resume functionality
- **Responsive Architecture**: Mobile-first design with maximum image constraints (1080x1920)
- **Progress Indicator**: Individual progress bars with 3-second animation
- **Image Optimization**: Client-side image resizing maintaining aspect ratio

## Architecture
```bash
story-features/
├── public/
├── src/
│ ├── components/
│ │ ├── StoryList.jsx
│ │ ├── StoryViewer.jsx
│ │ ├── StoryUploader.jsx
│ │ └── ProgressBar.jsx
│ ├── hooks/
│ │ └── useStories.js
│ ├── utils/
│ │ ├── storage.js
│ │ └── imageUtils.js
│ ├── styles/
│ │ └── animations.css
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── .gitignore
```

## Technical Implementation

### State Management
- Custom `useStories` hook encapsulating all story logic
- LocalStorage as persistence layer with TTL (Time-To-Live)
- Automatic garbage collection for expired stories

### Performance Optimizations
- Debounced touch events for swipe detection
- Image resizing before storage to prevent memory bloat
- Memoized components to prevent unnecessary re-renders
- Progressive image loading in viewer

### Security Considerations
- Client-side image validation (type/size checks)
- Base64 encoding for safe storage
- XSS prevention through content sanitization

## Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0 or yarn >= 1.22.0
```

## Installation

```bash
# Clone with degit (recommended)
npx degit github:yourusername/story-feature story-feature

# Or clone traditionally
git clone https://github.com/yourusername/story-feature.git
cd story-feature

# Install dependencies
npm ci --production=false

# Start development server
npm run dev
```

## Environment Configuration
Create .env.local for custom configuration:

```bash
VITE_MAX_STORY_DURATION=3000
VITE_MAX_IMAGE_WIDTH=1080
VITE_MAX_IMAGE_HEIGHT=1920
VITE_STORAGE_EXPIRY_HOURS=24
```
## Build & Deployment

```bash
# Build optimized bundle
npm run build

# Preview production build locally
npm run preview

# Analyze bundle size
npm run build -- --mode analyze
```

## Docker Deployment

```bash
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Testing Strategy

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```
