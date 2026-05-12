import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { Clock, User, Tag, Calendar, ChevronLeft, MessageSquare, Send } from 'lucide-react';

export const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, comments, addComment } = useStore();
  const post = posts.find(p => p.slug === slug);
  
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <Link to="/posts" className="text-primary-600 hover:underline">Back to articles</Link>
      </div>
    );
  }

  const postComments = comments.filter(c => c.postId === post.id && c.status === 'approved');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentContent) return;

    addComment({
      postId: post.id,
      authorName: commentName,
      authorEmail: commentEmail,
      content: commentContent,
      status: 'pending' // Default status for new comments
    });

    setCommentName('');
    setCommentEmail('');
    setCommentContent('');
    alert('Comment submitted for approval!');
  };

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <header className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link to="/posts" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} /> Back to all articles
          </Link>
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-lg bg-primary-600/20 text-primary-400 border border-primary-600/30 text-sm font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {post.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <User size={20} className="text-primary-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">{post.authorName}</p>
                <p className="text-xs">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span className="text-sm">{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span className="text-sm">10 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-8 italic">
                  {post.excerpt}
                </p>
                <div className="whitespace-pre-wrap text-lg leading-relaxed">
                  {post.content}
                  <p className="mt-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  </p>
                  <h3 className="text-2xl font-bold mt-12 mb-6">Key Insights</h3>
                  <ul className="space-y-4">
                    <li>Duis aute irure dolor in reprehenderit in voluptate.</li>
                    <li>Excepteur sint occaecat cupidatat non proident.</li>
                    <li>Sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                  </ul>
                  <p className="mt-8">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <section className="mt-16 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <MessageSquare size={24} className="text-primary-600" />
                  Comments ({postComments.length})
                </h2>
              </div>

              {/* Comment List */}
              <div className="space-y-6">
                {postComments.map(comment => (
                  <div key={comment.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                          <span className="text-primary-600 font-bold">{comment.authorName[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-bold">{comment.authorName}</h4>
                          <p className="text-xs text-slate-500">{format(new Date(comment.createdAt), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {comment.content}
                    </p>
                  </div>
                ))}
                {postComments.length === 0 && (
                  <p className="text-slate-500 italic text-center py-8">No approved comments yet. Be the first to share your thoughts!</p>
                )}
              </div>

              {/* Add Comment Form */}
              <div className="bg-primary-50 dark:bg-primary-900/10 p-8 rounded-3xl border border-primary-100 dark:border-primary-900/20">
                <h3 className="text-xl font-bold mb-6">Leave a comment</h3>
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      required
                    />
                  </div>
                  <textarea 
                    placeholder="Write your comment..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors w-full md:w-auto"
                  >
                    Post Comment <Send size={18} />
                  </button>
                </form>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Tag size={20} className="text-primary-600" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {posts.map(p => p.category).filter((v, i, a) => a.indexOf(v) === i).map(cat => (
                  <Link 
                    key={cat}
                    to={`/posts?category=${cat}`}
                    className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Newsletter</h3>
                <p className="text-slate-500 text-sm mb-4">Get the latest posts directly in your inbox.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800" />
                  <button className="w-full bg-slate-900 dark:bg-primary-600 text-white py-3 rounded-xl font-bold">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
