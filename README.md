# DevBlog - Modern React Blog Platform

A full-featured blog application with a public area and a powerful administration panel, built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🏗️ Project Structure

```text
src/
├── components/   # Reusable UI components
├── data/         # Mock data and initial state
├── hooks/        # Custom React hooks
├── layouts/      # Page layouts (Public & Admin)
├── pages/        # Page components
│   └── admin/    # Administrative area pages
├── services/     # API services (mocked)
├── store/        # Zustand state management
├── types/        # TypeScript interfaces
└── utils/        # Utility functions (cn, formatting)
```

## 🛠️ Features

### Public Area
- **Home**: Featured posts and recent activity.
- **Articles List**: Search, filter by category, and pagination.
- **Article Detail**: Rich content view with a dedicated comment section.
- **Comments**: View and submit comments (pending moderation).

### Administrative Panel
- **Dashboard**: Overview of blog statistics and recent activity.
- **Post Management**: Full CRUD operations for blog articles.
- **Comment Moderation**: Approve, reject, or delete user comments.
- **User Management**: Manage administrative accounts and roles.
- **Mock Auth**: Secure login system with role-based access.

## 🎨 Architectural Decisions

- **Vite**: Chosen for extremely fast development and build times.
- **Tailwind CSS**: Used for rapid, responsive, and highly customizable UI design.
- **Zustand**: Selected for lightweight yet powerful global state management without the boilerplate of Redux.
- **Lucide React**: Modern, consistent icon set.
- **Strict TypeScript**: Ensures type safety and better developer experience across the entire codebase.
- **Layout Pattern**: Clean separation between public-facing and administrative interfaces.

## 👤 Admin Access
**Email**: `admin@example.com`  
**Password**: (Any string)

---
Developed as a production-ready template for modern web applications.
