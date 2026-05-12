import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Menu, X, LogIn, User } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                DevBlog
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
              <Link to="/posts" className="hover:text-primary-500 transition-colors">Articles</Link>
              {isAuthenticated ? (
                <Link to="/admin" className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <User size={18} />
                  <span>Admin Panel</span>
                </Link>
              ) : (
                <Link to="/login" className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-600 dark:text-slate-400"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Home</Link>
              <Link to="/posts" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Articles</Link>
              {isAuthenticated ? (
                <Link to="/admin" className="block px-3 py-2 rounded-md text-primary-600 font-medium">Admin Panel</Link>
              ) : (
                <Link to="/login" className="block px-3 py-2 rounded-md text-primary-600 font-medium">Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DevBlog</h3>
              <p className="text-slate-500 dark:text-slate-400">
                A modern blog for developers built with React, TypeScript, and Tailwind CSS.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li><Link to="/" className="hover:text-primary-500">Home</Link></li>
                <li><Link to="/posts" className="hover:text-primary-500">Articles</Link></li>
                <li><Link to="/login" className="hover:text-primary-500">Admin Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {/* Social icons placeholder */}
                <span className="text-slate-500 dark:text-slate-400 italic">Follow us on Twitter & GitHub</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} DevBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
