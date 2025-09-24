import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Import all page components
import { Dashboard } from './components/Dashboard';
import { ResearchProjects } from './components/ResearchProjects'; // Assuming the component is named ResearchProjects
import { Login } from './components/Login';
import { NewProjectPage } from './components/NewProjectPage';
import { Funding } from './components/Funding';
import { Publications } from './components/Publications';
import { Analytics } from './components/Analytics';
import { Faculty } from './components/Faculty';
import Landing from './components/Landing';
import { Sidebar } from './components/Sidebar'; // Assuming you have a Sidebar component

// --- Layout and Route Guard Components ---

// This layout component includes the sidebar and renders child pages
const DashboardLayout = () => (
  <div className="flex h-screen bg-background font-sans text-white">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-8">
      <Outlet /> {/* Child routes like /dashboard, /projects, etc., will be rendered here */}
    </main>
  </div>
);

// This component protects routes that require a user to be logged in
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// This component protects routes for Admin or Faculty only
const StaffRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // Redirect to dashboard if not authorized, assuming that's the main page
  return user && (user.role === 'Admin' || user.role === 'Faculty') ? children : <Navigate to="/dashboard" />;
};


// --- Main App Component ---

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* --- Public Routes (No Sidebar) --- */}
        <Route path="/landing" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        
        {/* --- Protected Routes (All have the Sidebar) --- */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ResearchProjects />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/analytics" element={<Analytics />} />
          
          {/* Routes protected for Staff only, also within the main layout */}
          <Route path="/projects/new" element={<StaffRoute><NewProjectPage /></StaffRoute>} />
          <Route path="/funding" element={<StaffRoute><Funding /></StaffRoute>} />
        </Route>

        {/* --- Fallback Routes --- */}
        {/* Redirects to dashboard if logged in, otherwise to landing page */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/landing"} />} />

        {/* Initial route redirect */}
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/landing"} />} />
      </Routes>
    </Router>
  );
};

export default App;