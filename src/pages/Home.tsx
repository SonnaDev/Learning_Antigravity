import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, User, Tag } from 'lucide-react';
import { format } from 'date-fns';

export const Home: React.FC = () => {
  const { posts } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredPost?.coverImage} 
            alt={featuredPost?.title}
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-600 text-sm font-medium uppercase tracking-wider">
              Featured Post
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {featuredPost?.title}
            </h1>
            <p className="text-xl text-slate-200">
              {featuredPost?.excerpt}
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-300">
              <span className="flex items-center gap-1"><User size={16} /> {featuredPost?.authorName}</span>
              <span className="flex items-center gap-1"><Clock size={16} /> {format(new Date(featuredPost?.createdAt), 'MMM dd, yyyy')}</span>
            </div>
            <Link 
              to={`/posts/${featuredPost?.slug}`}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all transform hover:scale-105"
            >
              Read More <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Recent Articles</h2>
            <p className="text-slate-500 mt-2">Discover our latest stories and tutorials.</p>
          </div>
          <Link to="/posts" className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
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
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{post.authorName}</span>
                  </div>
                  <span className="text-xs text-slate-400">{format(new Date(post.createdAt), 'MMM dd')}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary-600 rounded-3xl p-12 text-center text-white space-y-6">
          <h2 className="text-3xl font-bold">Stay Updated!</h2>
          <p className="text-primary-100 max-w-xl mx-auto">
            Subscribe to our newsletter and get the latest articles delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-6 py-3 rounded-xl text-slate-900 outline-none"
            />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
