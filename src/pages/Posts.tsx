import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Search, Tag, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const POSTS_PER_PAGE = 6;

export const Posts: React.FC = () => {
  const { posts, categories } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Articles</h1>
        <p className="text-slate-500 dark:text-slate-400">Browse our collection of technical articles and guides.</p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button
            onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
            className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === 'All' 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-none' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
              className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.name 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-none' 
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <article key={post.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
              <Link to={`/posts/${post.slug}`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 uppercase">
                  <Tag size={14} />
                  <span>{post.category}</span>
                </div>
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary-600 transition-colors">
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium">{post.authorName}</span>
                  <span className="text-xs text-slate-400">{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Filter size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold">No articles found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium text-slate-600 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
