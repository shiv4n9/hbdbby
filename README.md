# 🎂 Birthday Twin Website - Ultimate Edition

An immersive, interactive birthday website with "Cozy Chaos & Nostalgia" theme featuring advanced UX enhancements, physics-based interactions, and dual mood modes!

## ✨ Premium Features

### 1. 💌 Hogwarts Letter Entrance
- **3D envelope** with wax seal that says "For My Twin"
- Drag or click the seal to tear open the envelope
- Smooth reveal animation with floating sparkles
- Scale-up transition to main content

### 2. 🎨 Vibe Switch (Dual Mood Modes)
- **Sentimental Mode** (Default): Warm cream background, soft colors
- **Party Mode**: Dark violet gradient, neon colors, spotlight effect
- Disco ball toggle button (top-right)
- Mouse-following spotlight in party mode
- Automatic confetti explosion on mode switch

### 3. ✨ Custom Magnetic Cursor
- Semi-transparent circle with spring physics
- Lags behind mouse for fluid feel
- Magnetically snaps to interactive elements
- Grows larger on hover
- Sparkle trail that fades as you move

### 4. 🌟 Journey Timeline (Scrollytelling)
- Vertical snaking SVG path that draws as you scroll
- Polaroid photos positioned along the timeline
- Parallax floating icons (pizza, coffee, stars, hearts)
- Year badges for each memory
- Smooth scroll-triggered animations

### 5. 🕯️ Cake Ceremony - Blow the Candle
- Interactive cake with flickering CSS candles
- **Web Audio API** microphone detection
- Blow to extinguish or click as fallback
- Smoke animations
- Massive multi-directional confetti explosion
- "Make a wish, cutie! 🎂" reveal

### 6. 📦 Shifting Chaos - Enhanced Physics
- **Advanced drag physics**: Items tilt and cast larger shadows when lifted
- Spring-back animation if dropped outside suitcase
- Smooth bounce effect on failed attempts
- 30-second timer challenge
- Win modal with photo placeholder

### 7. 👯‍♀️ Twin Quiz
- Interactive questions with immediate feedback
- Smooth animations and emoji reactions
- "Certified Twins" badge for 66%+ score
- Adapts to party mode colors

### 8. 🎉 Floating Confetti Button
- Always accessible in bottom-right
- Multi-color confetti with custom colors
- Works in both mood modes

## 🎨 Design Modes

### Sentimental Mode
- Background: Warm cream (#FDFBF7)
- Accents: Deep maroon (#8B2635)
- Highlights: Soft gold (#D4AF37)
- Vibe: Cozy, nostalgic, intimate

### Party Mode
- Background: Purple-violet-pink gradient
- Spotlight: Mouse-following radial gradient
- Colors: Neon pink, electric blue, gold
- Vibe: Energetic, celebratory, vibrant

## 🚀 Getting Started

The project is already running at:
```
http://localhost:5173
```

If you need to restart:
```bash
cd birthday-twin
npm run dev
```

## 📸 Adding Your Photos

### For Journey Timeline
1. Create `birthday-twin/src/assets/` folder
2. Add your three photos
3. Update `src/components/JourneyTimeline.jsx`:

```jsx
// Import images
import childhood from '../assets/childhood.jpg';
import fairyLights from '../assets/fairy-lights.jpg';
import roomie from '../assets/roomie-selfie.jpg';

// Update memories array
const memories = [
  {
    id: 1,
    caption: "Cutiee ka budayy 🎂",
    image: childhood,
    side: 'left',
    year: 'The Beginning',
    rotation: -5
  },
  // ... add image property to others
];

// Replace placeholder div with:
<img 
  src={memory.image} 
  alt={memory.caption}
  className="w-full h-full object-cover"
/>
```

### For Shifting Game Win Modal
Update `src/components/ShiftingChaos.jsx` similarly to add your messy room photo.

## 🎮 Interactive Features Guide

1. **Envelope**: Click or drag the wax seal to enter
2. **Vibe Switch**: Click disco ball (top-right) to toggle party mode
3. **Custom Cursor**: Move mouse to see sparkle trail
4. **Timeline**: Scroll to see path draw and photos appear
5. **Candles**: Blow into mic or click to extinguish
6. **Shifting Game**: Drag items with physics - feel the tilt and shadow!
7. **Quiz**: Test your twin knowledge
8. **Confetti**: Click button anytime for celebration

## 🛠️ Tech Stack

- **React** + **Vite** (lightning-fast dev)
- **Tailwind CSS v4** (modern utility-first styling)
- **Framer Motion** (advanced animations & physics)
- **Canvas Confetti** (celebration effects)
- **Web Audio API** (microphone detection)
- **Spring Physics** (fluid cursor movement)
- **Scroll-triggered Animations** (scrollytelling)

## 🎨 Customization

### Change Colors
Edit `src/index.css`:
```css
@theme {
  --color-cream: #FDFBF7;
  --color-maroon: #8B2635;  /* Change this! */
  --color-gold: #D4AF37;
}
```

### Adjust Physics
In `ShiftingChaos.jsx`:
```jsx
dragElastic={0.1}  // Change drag resistance
stiffness: 300     // Change spring stiffness
damping: 20        // Change spring damping
```

### Customize Timeline
Edit `JourneyTimeline.jsx` to add more memories or change the path shape.

### Cursor Trail Frequency
In `CustomCursor.jsx`:
```jsx
if (Math.random() > 0.8)  // Change 0.8 to adjust sparkle frequency
```

## 💡 Pro Tips

### Image Optimization
1. **Crop photos** to just the important parts
2. **Remove backgrounds** from game items using remove.bg
3. **Compress images** to improve load times
4. Use **transparent PNGs** for draggable items

### Performance
- The custom cursor uses `pointer-events: none` to avoid blocking clicks
- Spring animations are GPU-accelerated
- Scroll animations use `useScroll` for smooth 60fps

### Mobile Responsiveness
- All components are fully responsive
- Touch events work for drag interactions
- Cursor effects gracefully degrade on mobile

## 🎭 Easter Eggs

- Try switching to party mode during the cake ceremony
- Drag items really fast in the shifting game
- Hover over timeline photos in party mode
- Watch the sparkle trail in different sections

---

Made with 💕, ✨, and a lot of Framer Motion for the bestest twin ever!
