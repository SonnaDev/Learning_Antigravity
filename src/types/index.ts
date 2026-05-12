export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor';
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: string;
  authorName: string;
  category: string;
  tags: string[];
  coverImage: string;
  createdAt: string;
  published: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
