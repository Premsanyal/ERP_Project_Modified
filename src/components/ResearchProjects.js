import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { Card, CardContent, Button, Badge, Input, Label, Textarea, Dialog, DialogContent, DialogTitle, DialogActions } from '../ui.js';
import { Plus, X } from 'lucide-react';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);

  // Modal state for adding a project
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('Active');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      // Example API call
      try {
        const response = await fetch('/api/projects', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();
        if (response.ok) {
          setProjects(json);
        }
      } catch {
        // fallback static data
        setProjects([
          { _id: 1, title: "AI for Healthcare", lead: "Dr. Sarah Chen", budget: 200000, status: "Active", description: "AI-based diagnostics for hospitals." },
          { _id: 2, title: "Climate Change Models", lead: "Dr. Michael Torres", budget: 150000, status: "Completed", description: "Predictive models for climate change." }
        ]);
      }
    };
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const handleAddProject = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend
    const newProject = {
      _id: Date.now(),
      title,
      lead,
      budget: parseFloat(budget),
      status,
      description
    };
    setProjects([newProject, ...projects]);
    setShowAddForm(false);
    setTitle('');
    setLead('');
    setBudget('');
    setStatus('Active');
    setDescription('');
    // Optionally, show a toast/notification
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Research Projects</h2>
          <p className="text-muted-foreground">Manage and track all research projects.</p>
        </div>
        {user && user.role !== 'Student' && (
          <>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />New Project
            </Button>
            <Link to="/projects/new" className="ml-2">
              <Button variant="outline">Advanced Form</Button>
            </Link>
          </>
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
              <Input
                id="proj-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                placeholder="Project title"
              />
            </div>
            <div>
              <Label htmlFor="proj-lead">Project Lead</Label>
              <Input
                id="proj-lead"
                value={lead}
                onChange={e => setLead(e.target.value)}
                required
                placeholder="Lead name"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="proj-budget">Budget</Label>
                <Input
                  id="proj-budget"
                  type="number"
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  required
                  placeholder="e.g. 100000"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="proj-status">Status</Label>
                <select
                  id="proj-status"
                  className="w-full rounded border px-2 py-1 bg-background text-white"
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
              <Textarea
                id="proj-desc"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                placeholder="Brief description of the project"
              />
            </div>
            <DialogActions>
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                <Plus className="h-4 w-4 mr-1" /> Add Project
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}