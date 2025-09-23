import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Badge, Input, Label, Textarea, Dialog, DialogContent, DialogTitle, DialogActions } from '../ui.js';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Upload, BarChart, Target, BookOpen, Users, Award, ExternalLink, X } from 'lucide-react';

export function Dashboard() {
  const { user } = useContext(AuthContext);

  // State for modals
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showPublicationForm, setShowPublicationForm] = useState(false);

  // Form states
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [publicationTitle, setPublicationTitle] = useState('');
  const [publicationFile, setPublicationFile] = useState(null);

  // Dummy KPI and chart data
  const kpiData = [
    { title: "Active Research Projects", value: "47", change: "+12% from last month", icon: Target, color: "primary" },
    { title: "Publications This Year", value: "134", change: "+23% from last year", icon: BookOpen, color: "accent-yellow" },
    { title: "Faculty & Students", value: "89", change: "+5% from last month", icon: Users, color: "accent-violet" },
    { title: "Citation Index", value: "2.8k", change: "+18% from last month", icon: Award, color: "accent-pink" },
  ];
  const chartData = [
    { m: 'Jan', v: 200 },
    { m: 'Mar', v: 250 },
    { m: 'Jun', v: 500 },
    { m: 'Sep', v: 550 },
    { m: 'Dec', v: 800 }
  ];

  // Handlers for forms (replace with backend integration as needed)
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend
    setShowProjectForm(false);
    setProjectTitle('');
    setProjectDesc('');
    alert('Project submitted!');
  };

  const handlePublicationSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend
    setShowPublicationForm(false);
    setPublicationTitle('');
    setPublicationFile(null);
    alert('Publication submitted!');
  };

  return (
    <div className="space-y-8">
      <div className="bg-card/50 border border-border rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          AIML & DS Research <span className="text-accent-yellow">Excellence Hub</span>
        </h1>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Welcome, {user?.name || 'Researcher'}. Manage your research portfolio from this central dashboard.
        </p>
        <div className="flex gap-4 flex-wrap">
          {user?.role !== 'Student' && (
            <Button
              className="bg-accent-yellow hover:bg-accent-yellow/90 text-black"
              onClick={() => setShowProjectForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Research Project
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowPublicationForm(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Submit Publication
          </Button>
          <Link to="/analytics">
            <Button variant="outline">
              <BarChart className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(item => (
          <Card key={item.title} className="!p-0 bg-card/50 border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-3xl font-bold mt-1">{item.value}</p>
                <p className="text-xs text-accent-green mt-1">{item.change}</p>
              </div>
              <div className={`w-12 h-12 bg-${item.color} rounded-xl flex items-center justify-center`}>
                {React.createElement(item.icon, { className: "h-6 w-6 text-white" })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-card/50 border border-border rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart className="h-5 w-5 text-accent-yellow" /> Research Activity Overview
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="m" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <Tooltip />
            <Area type="monotone" dataKey="v" stroke="#facc15" fillOpacity={1} fill="url(#colorV)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* New Project Modal */}
      <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
        <DialogContent>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-accent-yellow" />
              New Research Project
            </div>
          </DialogTitle>
          <form onSubmit={handleProjectSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="project-title">Project Title</Label>
              <Input
                id="project-title"
                value={projectTitle}
                onChange={e => setProjectTitle(e.target.value)}
                required
                placeholder="Enter project title"
              />
            </div>
            <div>
              <Label htmlFor="project-desc">Description</Label>
              <Textarea
                id="project-desc"
                value={projectDesc}
                onChange={e => setProjectDesc(e.target.value)}
                required
                placeholder="Brief description of the project"
              />
            </div>
            <DialogActions>
              <Button type="button" variant="ghost" onClick={() => setShowProjectForm(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button type="submit" className="bg-accent-yellow text-black">
                <Plus className="h-4 w-4 mr-1" /> Create Project
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Submit Publication Modal */}
      <Dialog open={showPublicationForm} onOpenChange={setShowPublicationForm}>
        <DialogContent>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Submit Publication
            </div>
          </DialogTitle>
          <form onSubmit={handlePublicationSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="publication-title">Publication Title</Label>
              <Input
                id="publication-title"
                value={publicationTitle}
                onChange={e => setPublicationTitle(e.target.value)}
                required
                placeholder="Enter publication title"
              />
            </div>
            <div>
              <Label htmlFor="publication-file">Upload File</Label>
              <Input
                id="publication-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={e => setPublicationFile(e.target.files[0])}
                required
              />
            </div>
            <DialogActions>
              <Button type="button" variant="ghost" onClick={() => setShowPublicationForm(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                <Upload className="h-4 w-4 mr-1" /> Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}