import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
// Import all components and layout elements...
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Login } from './components/Login';
import { NewProjectPage } from './components/NewProjectPage';
import { Funding } from './components/Funding';

const App = () => {
  const { user } = useContext(AuthContext);

  const StaffRoute = ({ children }) => {
    return user && user.role !== 'Student' ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="flex h-screen bg-background font-sans text-white">
        {user && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {user && <Header />}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/projects" element={user ? <Projects /> : <Navigate to="/login" />} />
              <Route path="/projects/new" element={
                <StaffRoute><NewProjectPage /></StaffRoute>
              } />
              <Route path="/funding" element={
                <StaffRoute><Funding /></StaffRoute>
              } />
              {/* ... Add other routes here ... */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;