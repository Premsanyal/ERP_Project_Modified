import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Import all components and layout elements
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/ResearchProjects';
import { Login } from './components/Login';
import { NewProjectPage } from './components/NewProjectPage';
import { Funding } from './components/Funding';
import { Publications } from './components/Publications';
import { Analytics } from './components/Analytics';
import { Faculty } from './components/Faculty';
import Landing from './components/Landing';

// If you have Sidebar and Header components, import them here
//import Sidebar from './components/Sidebar'; // If exists
//import Header from './components/Header';   // If exists

const App = () => {
  const { user } = useContext(AuthContext);

  // Route guard for staff (Admin or Faculty)
  const StaffRoute = ({ children }) => {
    return user && user.role !== 'Student' ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="flex h-screen bg-background font-sans text-white">
        {user && typeof Sidebar !== "undefined" && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {user && typeof Header !== "undefined" && <Header />}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Landing />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/projects" element={user ? <Projects /> : <Navigate to="/login" />} />
              <Route path="/projects/new" element={
                <StaffRoute><NewProjectPage /></StaffRoute>
              } />
              <Route path="/funding" element={
                <StaffRoute><Funding /></StaffRoute>
              } />
              <Route path="/publications" element={user ? <Publications /> : <Navigate to="/login" />} />
              <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
              <Route path="/faculty" element={user ? <Faculty /> : <Navigate to="/login" />} />
              {/* Add more routes as needed */}
              <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;