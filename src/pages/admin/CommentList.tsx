import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Search, 
  Trash2, 
  Check, 
  X,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';

export const CommentList: React.FC = () => {
  const { comments, posts, updateCommentStatus, deleteComment } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || comment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getPostTitle = (postId: string) => {
    return posts.find(p => p.id === postId)?.title || 'Unknown Post';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Moderate Comments</h1>
          <p className="text-slate-500 text-sm">Approve or reject comments from your readers.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Header / Controls */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by author or content..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  filterStatus === status 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredComments.map((comment) => (
                <tr key={comment.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{comment.authorName}</p>
                      <p className="text-xs text-slate-500">{comment.authorEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{comment.content}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{format(new Date(comment.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-primary-600 hover:underline cursor-pointer line-clamp-1">
                      {getPostTitle(comment.postId)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      comment.status === 'approved' 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' 
                        : comment.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                        : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {comment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {comment.status !== 'approved' && (
                        <button 
                          onClick={() => updateCommentStatus(comment.id, 'approved')}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      {comment.status !== 'rejected' && (
                        <button 
                          onClick={() => updateCommentStatus(comment.id, 'rejected')}
                          className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteComment(comment.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComments.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
            <p>No comments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
