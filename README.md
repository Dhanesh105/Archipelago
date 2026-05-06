# 🏝️ Dev Archipelago

**Dev Archipelago** is a premium, interactive 3D learning platform designed to help developers navigate the vast ocean of modern technology. Built with React, Three.js (R3F), and Next.js, it offers a gamified roadmap experience across Web, Android, Unity, and AI domains.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/framework-Next.js%2014-black.svg)
![Three.js](https://img.shields.io/badge/3D-Three.js-orange.svg)

---

## 🌟 Key Features

### 🎮 Immersive 3D Navigation
- **Domain Islands**: Explore specialized islands for Web Development, Android, Unity 3D, and AI/Data Science.
- **Cinematic Camera**: A dynamic camera system that centers on your selected target, providing a smooth transition between the overview and detailed module views.
- **Interactive Environment**: Real-time lighting, fog, and glassmorphic materials create a state-of-the-art visual experience.

### 🗺️ Dynamic Learning Roadmaps
- **Modular Curriculum**: Each domain is broken down into progressive "Islands" representing specific skill levels (Beginner to Advanced).
- **Curated Resources**: Direct links to official documentation, high-quality video tutorials, and interactive articles.
- **Progressive Disclosure**: Detailed UI overlays reveal module nodes only when a domain is selected, keeping the interface clean and focused.

### 💎 Premium UI/UX
- **Advanced Glassmorphism**: High-fidelity UI panels with blur effects, neon accents, and smooth transitions.
- **Mobile-First Design**: Optimized for all viewports, ensuring a premium experience on smartphones and desktops alike.
- **Responsive Typography**: Utilizing the `Outfit` and `Inter` font families for a modern, tech-forward aesthetic.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://reactjs.org/)
- **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Three.js](https://threejs.org/)
- **Visuals/Effects**: [@react-three/drei](https://github.com/pmndrs/drei), [Framer Motion](https://www.framer.com/motion/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dhanesh105/Archipelago.git
   cd Archipelago
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Navigate to `http://localhost:3000` to start your journey.

---

## 📂 Project Structure

```text
src/
├── app/              # Next.js App Router (Layouts & Pages)
├── components/       # 3D Scene components & 2D UI Overlay
├── data/             # Roadmap configuration (JSON)
├── lib/              # Database connection & Layout utilities
├── models/           # Mongoose schemas (UserProgress)
├── store/            # Global state (Zustand)
└── types/            # TypeScript interfaces
```

---

## 🏗️ Adding New Roadmaps

Roadmaps are managed via `src/data/roadmaps.json`. To add a new domain or island:

1. Define a new domain key (e.g., `"ios"`).
2. Add island objects with `coordinates`, `hex_color`, and `nodes`.
3. The 3D engine will automatically spawn the new island in the archipelago based on your coordinates.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or domains, please open an issue or submit a pull request.

**Crafted with ❤️ by the Dev Archipelago Team**
