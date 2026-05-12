import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Search, 
  Trash2, 
  Edit2, 
  UserPlus,
  Shield,
  User as UserIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const UserList: React.FC = () => {
  const { users, deleteUser } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Manage Users</h1>
          <p className="text-slate-500 text-sm">Control who has access to the administration panel.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 dark:shadow-none">
          <UserPlus size={20} /> Invite New User
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Header / Controls */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' ? (
                        <Shield size={16} className="text-primary-600" />
                      ) : (
                        <UserIcon size={16} className="text-slate-400" />
                      )}
                      <span className={`text-sm font-medium capitalize ${user.role === 'admin' ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
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

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">Total users: {filteredUsers.length}</p>
          <div className="flex items-center gap-2">
            <button disabled className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-50">
              <ChevronLeft size={18} />
            </button>
            <button disabled className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
