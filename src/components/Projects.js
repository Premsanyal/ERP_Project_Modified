import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, Button, Badge } from '../ui.js';
import { Plus } from 'lucide-react';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const json = await response.json();
      if (response.ok) {
        setProjects(json);
      }
    };
    if (user) {
      fetchProjects();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-white">Research Projects</h2><p className="text-muted-foreground">Manage and track all research projects.</p></div>
        {user && user.role !== 'Student' && (
          <Link to="/projects/new"><Button><Plus className="h-4 w-4 mr-2" />New Project</Button></Link>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(p => (
          <Card key={p._id} className="!p-0 bg-card/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <Badge className="capitalize bg-accent-yellow/20 text-accent-yellow">{p.status}</Badge>
              </div>
              <div><p className="text-sm font-medium">{p.lead}</p><p className="text-xs text-muted-foreground">Project Lead</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground">Budget</p><p className="font-semibold">${p.budget?.toLocaleString()}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}