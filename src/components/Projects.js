import { Card, CardContent, Button, Progress, Avatar, AvatarFallback, Badge } from '../ui.js';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search, DollarSign, Users, Calendar } from 'lucide-react';

const projects = [
  { id: 1, title: "AI Research Initiative", lead: { name: "Dr. Sarah Chen", avatar: "SC" }, status: "active", progress: 75, budget: 450000, team: 8, category: "Artificial Intelligence", date: "01/01/2024 - 12/31/2024"},
  { id: 2, title: "Climate Data Analysis", lead: { name: "Dr. Michael Torres", avatar: "MT" }, status: "active", progress: 60, budget: 320000, team: 6, category: "Environmental Science", date: "02/01/2024 - 01/31/2025" },
  { id: 3, title: "Biomedical Innovation", lead: { name: "Dr. Emily Watson", avatar: "EW" }, status: "active", progress: 85, budget: 280000, team: 5, category: "Biotechnology", date: "09/01/2023 - 08/31/2024" },
  { id: 4, title: "Quantum Computing Research", lead: { name: "Dr. James Liu", avatar: "JL" }, status: "planning", progress: 15, budget: 500000, team: 4, category: "Computer Science", date: "06/01/2024 - 05/31/2025" },
  { id: 5, title: "Social Media Impact Study", lead: { name: "Dr. Rachel Adams", avatar: "RA" }, status: "completed", progress: 100, budget: 150000, team: 3, category: "Psychology", date: "06/01/2023 - 03/31/2024" },
  { id: 6, title: "Renewable Energy Storage", lead: { name: "Dr. Ahmed Hassan", avatar: "AH" }, status: "active", progress: 45, budget: 380000, team: 7, category: "Engineering", date: "03/15/2024 - 02/15/2025" }
];

export function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-white">Research Projects</h2><p className="text-muted-foreground">Manage and track all research projects and their progress.</p></div>
        <Link to="/projects/new"><Button><Plus className="h-4 w-4 mr-2" />New Project</Button></Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(p => (
          <Card key={p.id} className="!p-0 bg-card/50 border-border flex flex-col"><CardContent className="p-4 flex flex-col flex-grow space-y-4">
              <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <Badge className={`capitalize ${p.status === 'active' ? 'bg-accent-green/20 text-accent-green' : p.status === 'planning' ? 'bg-accent-yellow/20 text-accent-yellow' : 'bg-slate-500/20 text-slate-400'}`}>{p.status}</Badge>
              </div>
              <div className="flex items-center gap-2"><Avatar className="h-8 w-8 text-xs"><AvatarFallback>{p.lead.avatar}</AvatarFallback></Avatar><div><p className="text-sm font-medium">{p.lead.name}</p><p className="text-xs text-muted-foreground">Project Lead</p></div></div>
              <div><div className="flex justify-between text-sm mb-1"><span>Progress</span><span className="font-semibold">{p.progress}%</span></div><Progress value={p.progress} /></div>
              <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-border"><div className="space-y-1"><p className="text-xs text-muted-foreground">Budget</p><p className="font-semibold">${(p.budget / 1000).toFixed(0)}K</p></div><div className="space-y-1"><p className="text-xs text-muted-foreground">Team</p><p className="font-semibold">{p.team} members</p></div></div>
              <div className="flex items-center justify-between pt-2">
                <Link to={`/projects/${p.id}`}><Button variant="outline" size="sm">View Details</Button></Link>
                <Link to={`/projects/${p.id}`}><Button size="sm">Manage</Button></Link>
              </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}