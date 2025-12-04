import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IssueList from './components/IssueList';
import AIChat from './components/AIChat';
import ImageGenerator from './components/ImageGenerator';
import { MOCK_ISSUES } from './constants';
import { Bell, UserCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Sync state with location
  React.useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar currentPath={currentPath} onNavigate={(path) => navigate(path)} />

      <div className="flex-1 ml-64 flex flex-col min-h-screen transition-all">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center">
             <h2 className="text-lg font-semibold text-slate-700">
               {currentPath === '/' && '总览看板'}
               {currentPath === '/issues' && '问题台账管理'}
               {currentPath === '/chat' && '智能助手'}
               {currentPath === '/visualize' && '数据可视化'}
             </h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700">管理员</p>
                <p className="text-xs text-slate-400">财务审核组</p>
              </div>
              <UserCircle className="w-9 h-9 text-slate-300" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard issues={MOCK_ISSUES} />} />
            <Route path="/issues" element={<IssueList issues={MOCK_ISSUES} />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/visualize" element={<ImageGenerator />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
