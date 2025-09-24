import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, Button, Badge, Input, Label, Textarea, Dialog, DialogContent, DialogTitle, DialogActions } from '../ui.js';
import { Plus, X } from 'lucide-react';

// Renamed from Projects to ResearchProjects to match your App.js imports
export function ResearchProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Modal state for adding a project
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('Active');
  const [description, setDescription] = useState('');

  // Fetch projects from the backend when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/projects', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();
        if (response.ok) {
          setProjects(json);
        } else {
          throw new Error(json.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError(err.message);
        // Fallback static data in case of error
        setProjects([
          { _id: 1, title: "AI for Healthcare", lead: "Dr. Sarah Chen", budget: 200000, status: "Active", description: "AI-based diagnostics for hospitals." },
          { _id: 2, title: "Climate Change Models", lead: "Dr. Michael Torres", budget: 150000, status: "Completed", description: "Predictive models for climate change." }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchProjects();
    }
  }, [user]);

  // Handle submitting the new project form to the backend
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!user) return;

    const newProject = { title, lead, budget: parseFloat(budget), status, description };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(newProject)
      });

      const savedProject = await response.json();

      if (response.ok) {
        setProjects([savedProject, ...projects]);
        // Reset form and close modal
        setShowAddForm(false);
        setTitle('');
        setLead('');
        setBudget('');
        setStatus('Active');
        setDescription('');
      } else {
        throw new Error(savedProject.message || 'Failed to create project');
      }
    } catch (err) {
      alert(`Error: ${err.message}`); // Simple error feedback
    }
  };

  // Helper to get badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-blue-500/20 text-blue-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'on hold':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Research Projects</h2>
          <p className="text-muted-foreground">Manage and track all research projects.</p>
        </div>
        {user && user.role !== 'Student' && (
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />New Project
            </Button>
          </div>
        )}
      </div>

      {isLoading && <p className="text-center">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(p => (
          <Card key={p._id} className="!p-0 bg-card/50 border-border flex flex-col">
            <CardContent className="p-4 space-y-4 flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white">{p.title}</h3>
                <Badge className={`capitalize ${getStatusBadgeColor(p.status)}`}>{p.status}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium">{p.lead}</p>
                <p className="text-xs text-muted-foreground">Project Lead</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-semibold">${p.budget?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="text-sm">{p.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Project Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Project
            </div>
          </DialogTitle>
          <form onSubmit={handleAddProject} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="proj-title">Title</Label>
              <Input id="proj-title" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Project title"/>
            </div>
            <div>
              <Label htmlFor="proj-lead">Project Lead</Label>
              <Input id="proj-lead" value={lead} onChange={e => setLead(e.target.value)} required placeholder="Lead name"/>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="proj-budget">Budget</Label>
                <Input id="proj-budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} required placeholder="e.g. 100000" min="0"/>
              </div>
              <div className="flex-1">
                <Label htmlFor="proj-status">Status</Label>
                {/* Styled select dropdown to match your UI */}
                <select
                  id="proj-status"
                  className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option>Active</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="proj-desc">Description</Label>
              <Textarea id="proj-desc" value={description} onChange={e => setDescription(e.target.value)} required placeholder="Brief description of the project"/>
            </div>
            <DialogActions>
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button type="submit">
                <Plus className="h-4 w-4 mr-1" /> Add Project
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}