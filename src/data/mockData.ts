import type { User, Post, Comment, Category } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Design', slug: 'design' },
  { id: '3', name: 'Development', slug: 'development' },
  { id: '4', name: 'Business', slug: 'business' },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    excerpt: 'Exploring the latest trends in web technologies and what to expect in 2024.',
    content: 'Full content of the post goes here...',
    authorId: '1',
    authorName: 'Admin User',
    category: 'Technology',
    tags: ['react', 'vite', 'future'],
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    createdAt: '2024-03-20T10:00:00Z',
    published: true,
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS',
    slug: 'mastering-tailwind-css',
    excerpt: 'Learn how to build beautiful, responsive layouts with Tailwind CSS.',
    content: 'Comprehensive guide to Tailwind CSS...',
    authorId: '2',
    authorName: 'Jane Doe',
    category: 'Design',
    tags: ['tailwind', 'css', 'design'],
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop',
    createdAt: '2024-03-18T14:30:00Z',
    published: true,
  },
  {
    id: '3',
    title: 'Introduction to Zustand',
    slug: 'intro-to-zustand',
    excerpt: 'Simple and powerful state management for React applications.',
    content: 'Why Zustand is better than Redux for many use cases...',
    authorId: '1',
    authorName: 'Admin User',
    category: 'Development',
    tags: ['react', 'state-management', 'zustand'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    createdAt: '2024-03-15T09:00:00Z',
    published: true,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    authorName: 'John Smith',
    authorEmail: 'john@example.com',
    content: 'Great article! Very insightful.',
    createdAt: '2024-03-21T11:00:00Z',
    status: 'approved',
  },
  {
    id: '2',
    postId: '1',
    authorName: 'Sarah Lee',
    authorEmail: 'sarah@example.com',
    content: 'I disagree with some points, but good read.',
    createdAt: '2024-03-21T12:00:00Z',
    status: 'pending',
  },
];
