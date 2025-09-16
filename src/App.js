// File: src/App.js
// Replace the entire content of this file.

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, BookOpen, Users, FlaskConical, BarChart3, University } from 'lucide-react';

import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Publications } from './components/Publications';
import { Researchers } from './components/Researchers';
import { Resources } from './components/Resources';
import { Analytics } from './components/Analytics';
import { Login } from './components/Login';
import { Landing } from './components/Landing';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  // Show the Landing page first
  if (showLanding) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  // If not on landing, show Login page until logged in
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} onBack={() => setShowLanding(true)} />;
  }

  // Once logged in, show the main application with sidebar and routing
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-grow p-8 ml-[250px] w-[calc(100%-250px)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/researchers" element={<Researchers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Sidebar component remains the same
const Sidebar = () => {
    const location = useLocation();
    const navItems = [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/projects', icon: FolderKanban, label: 'Projects' },
      { path: '/publications', icon: BookOpen, label: 'Publications' },
      { path: '/researchers', icon: Users, label: 'Researchers' },
      { path: '/resources', icon: FlaskConical, label: 'Resources' },
      { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    ];
  
    return (
      <aside className="w-[250px] h-screen fixed top-0 left-0 bg-[#111827] border-r border-gray-700 p-4 text-white">
        <div className="mb-8 flex items-center gap-4">
             <University size={28} />
             <h1 className="text-xl font-bold">Research Portal</h1>
        </div>
        <nav>
          <ul>
            {navItems.map(item => (
              <li key={item.path} className="list-none my-2">
                <Link 
                  to={item.path} 
                  className={`flex items-center p-3 rounded-md text-gray-300 no-underline hover:bg-primary/80 hover:text-white transition-colors
                    ${location.pathname === item.path ? 'bg-primary text-white' : ''}`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  };

export default App;