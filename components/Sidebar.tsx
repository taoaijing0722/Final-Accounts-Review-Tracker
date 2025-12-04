import React from 'react';
import { LayoutDashboard, ListTodo, Image as ImageIcon, MessageSquareText, Settings, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: '总览看板', icon: LayoutDashboard, path: '/' },
    { id: 'issues', label: '问题台账', icon: ListTodo, path: '/issues' },
    { id: 'chat', label: '智能助手', icon: MessageSquareText, path: '/chat' },
    { id: 'visualize', label: '数据可视化', icon: ImageIcon, path: '/visualize' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen fixed left-0 top-0 shadow-xl z-20 transition-all duration-300">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-wide leading-none">决算会审</h1>
          <span className="text-xs text-slate-400 font-light">问题跟踪系统 v2.0</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentPath === item.path
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentPath === item.path ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg w-full transition-colors">
          <Settings className="w-5 h-5" />
          <span>系统设置</span>
        </button>
        <div className="mt-4 px-4 text-xs text-slate-600 text-center">
          &copy; 2024 内控审计部
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
