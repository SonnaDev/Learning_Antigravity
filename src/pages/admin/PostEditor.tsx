import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Image as ImageIcon, 
  X,
  Plus,
  Check
} from 'lucide-react';

export const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, addPost, updatePost, categories, currentUser } = useStore();
  
  const isEditing = Boolean(id);
  const postToEdit = posts.find(p => p.id === id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    tags: [] as string[],
    published: true
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (isEditing && postToEdit) {
      setFormData({
        title: postToEdit.title,
        slug: postToEdit.slug,
        excerpt: postToEdit.excerpt,
        content: postToEdit.content,
        category: postToEdit.category,
        coverImage: postToEdit.coverImage,
        tags: postToEdit.tags,
        published: postToEdit.published
      });
    }
  }, [isEditing, postToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && id) {
      updatePost(id, formData);
    } else {
      addPost({
        ...formData,
        authorId: currentUser?.id || '1',
        authorName: currentUser?.name || 'Admin User'
      });
    }
    
    navigate('/admin/posts');
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/posts" className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{isEditing ? 'Edit Article' : 'Create New Article'}</h1>
            <p className="text-slate-500 text-sm">Fill in the details below to {isEditing ? 'update' : 'publish'} your post.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Eye size={18} /> Preview
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 dark:shadow-none"
          >
            <Save size={18} /> {isEditing ? 'Update Post' : 'Save & Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Title</label>
              <input 
                type="text" 
                placeholder="Enter article title..."
                className="w-full px-4 py-3 text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Excerpt (Summary)</label>
              <textarea 
                placeholder="Brief summary for list views..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Content (Markdown supported)</label>
              <textarea 
                placeholder="Write your article here..."
                rows={15}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Post Settings */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Post Settings</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Slug</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Category</label>
              <select 
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 outline-none"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase text-slate-500">Status</label>
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, published: true }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 border transition-all ${
                    formData.published 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {formData.published && <Check size={14} />} Published
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, published: false }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 border transition-all ${
                    !formData.published 
                      ? 'bg-amber-50 border-amber-200 text-amber-700' 
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {!formData.published && <Check size={14} />} Draft
                </button>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <ImageIcon size={18} className="text-primary-600" />
              Cover Image
            </h3>
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative group">
              <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm">Change Image</button>
              </div>
            </div>
            <input 
              type="text" 
              placeholder="Image URL..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800"
              value={formData.coverImage}
              onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
            />
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-medium">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-primary-800">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add tag..."
                className="flex-grow px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 outline-none focus:ring-1 focus:ring-primary-500"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <button 
                type="button"
                onClick={addTag}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
