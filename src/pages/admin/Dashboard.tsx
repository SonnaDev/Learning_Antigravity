import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  FileText, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Eye, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { posts, comments, users } = useStore();

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Comments', value: comments.length, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Post Views', value: '12.4K', icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-slate-800`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                <TrendingUp size={12} className="mr-1" /> +12%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-lg">Recent Posts</h3>
            <button className="text-primary-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="p-6 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={post.coverImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <Clock size={12} /> {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.published ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-6">
            {comments.slice(0, 4).map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center font-bold text-primary-600">
                  {comment.authorName[0]}
                </div>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-bold">{comment.authorName}</span>
                    <span className="text-slate-500"> commented on </span>
                    <span className="text-primary-600 font-medium cursor-pointer hover:underline">Post #{comment.postId}</span>
                  </p>
                  <p className="text-xs text-slate-400">{format(new Date(comment.createdAt), 'MMM dd, HH:mm')}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              View Activity Report <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
