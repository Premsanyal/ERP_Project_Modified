import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Users, DollarSign, FolderPlus, BookOpen, GitPullRequest, LogOut } from 'lucide-react';

// A single navigation link component
const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-gray-800 text-white' : ''
      }`
    }
  >
    {icon}
    <span className="ml-3">{children}</span>
  </NavLink>
);

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your authentication logout logic here (e.g., clearing localStorage)
    navigate('/login');
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 text-white h-screen flex flex-col p-4">
      <div className="text-2xl font-bold mb-8 text-center">
        Research ERP
      </div>
      <nav className="flex-grow space-y-2">
        <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />}>Dashboard</NavItem>
        <NavItem to="/projects" icon={<GitPullRequest size={20} />}>Projects</NavItem>
        <NavItem to="/publications" icon={<BookOpen size={20} />}>Publications</NavItem>
        <NavItem to="/faculty" icon={<Users size={20} />}>Faculty</NavItem>
        <NavItem to="/funding" icon={<DollarSign size={20} />}>Funding</NavItem>
        <NavItem to="/analytics" icon={<BarChart2 size={20} />}>Analytics</NavItem>
        <NavItem to="/new-project" icon={<FolderPlus size={20} />}>New Project</NavItem>
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-red-800 hover:text-white rounded-lg transition-colors duration-200"
        >
          <LogOut size={20} />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
}