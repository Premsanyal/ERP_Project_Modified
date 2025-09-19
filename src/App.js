import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, BookOpen, Users, DollarSign, FlaskConical, BarChart3, University, Bell, Search, ChevronDown, Award, Calendar, Settings, GitBranch } from 'lucide-react';

// Import all page components
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Publications } from './components/Publications';
import { Faculty } from './components/Faculty';
import { Funding } from './components/Funding';
import { Analytics } from './components/Analytics';
import { Login } from './components/Login';
import { NewProjectPage } from './components/NewProjectPage';

// Placeholder components for new pages
const PlaceholderPage = ({ title }) => (
  <div><h1 className="text-3xl font-bold text-white">{title}</h1><p className="text-muted-foreground">This page is under construction.</p></div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for development

  if (!isLoggedIn) {
     return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-background font-sans text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/new" element={<NewProjectPage />} />
              <Route path="/projects/:id" element={<PlaceholderPage title="Project Details" />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/publications/new" element={<PlaceholderPage title="New Publication" />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/proposals" element={<PlaceholderPage title="Proposals" />} />
              <Route path="/funding" element={<Funding />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/repository" element={<PlaceholderPage title="Repository" />} />
              <Route path="/awards" element={<PlaceholderPage title="Awards" />} />
              <Route path="/events" element={<PlaceholderPage title="Events" />} />
              <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

const Sidebar = () => {
    // ... Sidebar code remains the same
    const location = useLocation();
    const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderKanban, label: 'Research Projects' },
    { path: '/publications', icon: BookOpen, label: 'Publications' },
    { path: '/faculty', icon: Users, label: 'Faculty & Students' },
    { path: '/proposals', icon: DollarSign, label: 'Proposals' },
    { path: '/funding', icon: FlaskConical, label: 'Funding' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/repository', icon: GitBranch, label: 'Repository' },
    { path: '/awards', icon: Award, label: 'Awards' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar border-r border-border flex flex-col">
      <div className="h-16 flex items-center px-6 gap-3 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <University size={20} />
        </div>
        <div>
          <h1 className="text-sm font-semibold">CHRIST University</h1>
          <p className="text-xs text-muted-foreground">AIML & DS Research Portal</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-2">
        <p className="px-2 pt-2 pb-1 text-xs font-semibold text-muted-foreground/80">ERP MODULE</p>
        <ul>
          {navItems.map(item => (
            <li key={item.path} className="list-none">
              <Link to={item.path} className={`flex items-center p-2 my-1 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path ? 'bg-primary text-white' : 'text-gray-300 hover:bg-slate-700/50'}`}>
                <item.icon size={18} className="mr-3" /> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <p className="text-xs font-semibold">Research ERP v2.1.0</p>
        <p className="text-xs text-muted-foreground">University Research Portal</p>
      </div>
    </aside>
  );
};

const Header = () => (
    // ... Header code remains the same
    <header className="h-16 flex-shrink-0 bg-sidebar/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
    <div>
      <h2 className="text-base text-muted-foreground">Welcome back, <span className="font-medium text-white">Research Student</span></h2>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative w-64">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search research, publications..." className="w-full bg-slate-800 border border-border rounded-md pl-10 pr-4 py-1.5 text-sm" />
      </div>
      <button className="text-muted-foreground hover:text-white"><Bell size={20} /></button>
    </div>
  </header>
);

export default App;