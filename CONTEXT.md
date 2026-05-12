# Project Context & Requirements

## 🎯 Objectives
Realizzare un'app blog moderna, responsive e ben strutturata con un'area pubblica per i lettori e un'area privata per gli amministratori.

## ✅ Functional Requirements
- **Public**: Home, Post list, Search, Filters, Pagination, Post detail, Comments.
- **Admin**: Mock Authentication, Dashboard stats, Post CRUD, Comment moderation, User management.

## ⚙️ Technical Stack
- **Framework**: React 18 + Vite
- **Language**: TypeScript (Strict)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Date Formatting**: date-fns

## 🏗️ Architectural Constraints
- **Separation of Concerns**: Clear folders for components, pages, layouts, services, hooks, and types.
- **Clean Code**: No code duplication, consistent naming (PascalCase for components, camelCase for variables/functions).
- **Responsive Design**: Mobile-first approach using Tailwind's grid and flexbox.
- **Loading & Error States**: Managed via local state and Zustand.

## 📝 Code Conventions
- Use Functional Components with TypeScript interfaces.
- Prefer `const` over `let`.
- Use `cn()` utility for conditional Tailwind classes.
- Maintain strict typing (avoid `any`).
- Keep components focused and reusable.
