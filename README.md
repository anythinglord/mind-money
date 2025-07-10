# Personal Finance Tracker 💰

A personal finance app to track expenses and manage budgets — built with a modern and powerful tech stack.

## ✨ Features

- 📊 Track your expenses in real-time
- 💡 Create and manage budgets easily
- 🔥 Fast and reactive UI built with React + Vite
- 💾 Persist and fetch data using TanStack Query and Axios
- ✅ Type-safe forms with React Hook Form and Zod
- ⚡ Predictable state management with Redux and RxJS
- 🧪 Comprehensive testing using Vitest and Testing Library

## 🛠️ Tech Stack

- **React** — Frontend library for building interactive UIs
- **Vite** — Lightning-fast development build tool
- **TypeScript** — Type-safe JavaScript for better maintainability
- **Redux** — Global state management
- **RxJS** — Reactive programming for managing complex async flows
- **TanStack Query** — Server state synchronization and caching
- **Axios** — Promise-based HTTP client
- **Zod** — Type-safe schema validation
- **React Hook Form** — Flexible form management
- **Vitest** — Unit and integration testing
- **Testing Library** — UI testing focused on user interactions

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm or npm

### Install dependencies

```bash
pnpm install
```

### Run the development server
```bash
pnpm run dev
```

### Run tests
```bash
pnpm run test
```

## 🚀 Project Structure
```bash
src/
├─ components/      → Reusable UI components
├─ hooks/           → Custom hooks
├─ models/          → Interfaces
├─ pages/           → Pages
├─ redux/           → Redux store and slices
├─ schemas/         → Zod schemas
├─ services/        → API calls (Axios, TanStack Query)
├─ utilities/       → General functions
├─ App.tsx          → Main app component
└─ main.tsx         → Entry point
```