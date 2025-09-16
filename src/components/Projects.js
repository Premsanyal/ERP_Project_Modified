import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Progress, Avatar, AvatarFallback, Input } from '../ui.js';
import { Calendar, DollarSign, Users, Plus, Filter, Search } from 'lucide-react';

const projects = [
  { id: 1, title: "AI Research Initiative", lead: { name: "Dr. Sarah Chen", avatar: "SC" }, status: "active", progress: 75, budget: 450000, team: 8, category: "Artificial Intelligence", startDate: "2024-01-15", endDate: "2024-12-15" },
  { id: 2, title: "Climate Data Analysis", lead: { name: "Dr. Michael Torres", avatar: "MT" }, status: "active", progress: 60, budget: 320000, team: 6, category: "Environmental Science", startDate: "2024-02-01", endDate: "2025-01-31" },
  { id: 3, title: "Biomedical Innovation", lead: { name: "Dr. Emily Watson", avatar: "EW" }, status: "active", progress: 85, budget: 280000, team: 5, category: "Biotechnology", startDate: "2023-09-01", endDate: "2024-08-31" },
  { id: 4, title: "Quantum Computing Research", lead: { name: "Dr. James Liu", avatar: "JL" }, status: "planning", progress: 15, budget: 500000, team: 4, category: "Computer Science", startDate: "2024-06-01", endDate: "2025-05-31" },
  { id: 5, title: "Social Media Impact Study", lead: { name: "Dr. Rachel Adams", avatar: "RA" }, status: "completed", progress: 100, budget: 150000, team: 3, category: "Psychology", startDate: "2023-06-01", endDate: "2024-03-31" },
  { id: 6, title: "Renewable Energy Storage", lead: { name: "Dr. Ahmed Hassan", avatar: "AH" }, status: "active", progress: 45, budget: 380000, team: 7, category: "Engineering", startDate: "2024-03-15", endDate: "2025-02-15" }
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'planning': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'completed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-3xl font-bold text-white">Research Projects</h2><p className="text-muted-foreground">Manage and track all research projects and their progress.</p></div>
        <Button><Plus className="h-4 w-4 mr-2" />New Project</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="!p-0 flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="!text-lg">{project.title}</CardTitle>
                <Badge className={getStatusBadgeClass(project.status)}>{project.status}</Badge>
              </div>
              <Badge variant="outline" className="w-fit border-white/20">{project.category}</Badge>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-3">
                <Avatar><AvatarFallback>{project.lead.avatar}</AvatarFallback></Avatar>
                <div><p className="text-sm font-medium">{project.lead.name}</p><p className="text-xs text-muted-foreground">Project Lead</p></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span>Progress</span><span className="font-semibold">{project.progress}%</span></div>
                <Progress value={project.progress} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-white/10">
                <div className="space-y-1"><p className="text-xs text-muted-foreground">Budget</p><p className="font-semibold">${(project.budget / 1000).toFixed(0)}K</p></div>
                <div className="space-y-1"><p className="text-xs text-muted-foreground">Team Size</p><p className="font-semibold">{project.team} members</p></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}