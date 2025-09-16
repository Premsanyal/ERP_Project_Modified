import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui.js';
import { BookOpen, Calendar, Quote, ExternalLink, Search, Filter, Plus, TrendingUp } from 'lucide-react';


const publications = [
  { id: 1, title: "Advanced Machine Learning Techniques for Healthcare Diagnostics", authors: ["Dr. Sarah Chen", "Dr. Michael Kim"], journal: "Nature Machine Intelligence", year: 2024, type: "Journal Article", status: "Published", citations: 45 },
  { id: 2, title: "Climate Change Impacts on Coastal Ecosystems: A Comprehensive Analysis", authors: ["Dr. Michael Torres", "Dr. Jennifer Hayes"], journal: "Environmental Research Letters", year: 2024, type: "Research Article", status: "Published", citations: 32 },
];
const getStatusColor = (status) => 'bg-green-100 text-green-800';

export function Publications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-white">Publications & Research Output</h2>
          <p className="text-muted-foreground">Track publications, citations, and research impact</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Publication</Button>
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search publications..." className="pl-10" />
        </div>
      </div>
      <div className="space-y-4">
        {publications.map((publication) => (
          <Card key={publication.id} className="glass-card border-border/20">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="secondary" className={getStatusColor(publication.status)}>{publication.status}</Badge>
                  <CardTitle className="text-lg leading-tight text-white">{publication.title}</CardTitle>
                  <CardDescription className="mt-2">{publication.authors.join(", ")}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Citations</p>
                  <p className="text-2xl">{publication.citations}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div><p className="text-muted-foreground">Journal</p><p>{publication.journal}</p></div>
                <div><p className="text-muted-foreground">Year</p><p>{publication.year}</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}