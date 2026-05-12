import { create } from 'zustand';
import type { Post, Comment, User, Category } from '../types';
import { mockPosts, mockComments, mockUsers, mockCategories } from '../data/mockData';

interface BlogState {
  posts: Post[];
  comments: Comment[];
  users: User[];
  categories: Category[];
  currentUser: User | null;
  isAuthenticated: boolean;

  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Post actions
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;

  // Comment actions
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  updateCommentStatus: (id: string, status: Comment['status']) => void;
  deleteComment: (id: string) => void;

  // User actions
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export const useStore = create<BlogState>((set) => ({
  posts: mockPosts,
  comments: mockComments,
  users: mockUsers,
  categories: mockCategories,
  currentUser: null,
  isAuthenticated: false,

  login: async (email, _password) => {
    // Mock login logic
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ currentUser: null, isAuthenticated: false }),

  addPost: (post) =>
    set((state) => ({
      posts: [
        {
          ...post,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        },
        ...state.posts,
      ],
    })),

  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),

  addComment: (comment) =>
    set((state) => ({
      comments: [
        ...state.comments,
        {
          ...comment,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  updateCommentStatus: (id, status) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === id ? { ...comment, status } : comment
      ),
    })),

  deleteComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
    })),

  addUser: (user) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...user,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),

  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
