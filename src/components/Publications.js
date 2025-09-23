import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, Button, Badge } from '../ui.js';
import { Plus } from 'lucide-react';

export function Publications() {
  const [publications, setPublications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPublications = async () => {
      // This is where you would fetch data from your backend
      // For now, we use static data as a placeholder
      const staticData = [
        { _id: 1, title: "Advanced Machine Learning Techniques for Healthcare Diagnostics", authors: ["Dr. Sarah Chen", "Dr. Michael Kim", "Dr. Lisa Park"], journal: "Nature Machine Intelligence", year: 2024, impactFactor: 8.5, citations: 45, status: "Published", type: "Journal Article", access: "Open Access", keywords: ["Machine Learning", "Healthcare", "Diagnostics", "AI"] },
        { _id: 2, title: "Climate Change Impacts on Coastal Ecosystems: A Comprehensive Analysis", authors: ["Dr. Michael Torres", "Dr. Jennifer Hayes"], journal: "Environmental Research", year: 2024, impactFactor: 6.8, citations: 32, status: "Published", type: "Research Article", access: "Open Access", keywords: ["Climate Change", "Marine Biology", "Ecosystems"] },
      ];
      setPublications(staticData);
      
      // Example of a real API call:
      /*
      const response = await fetch('/api/publications', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const json = await response.json();
      if (response.ok) {
        setPublications(json);
      }
      */
    };
    if (user) {
      fetchPublications();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Publications & Research Output</h2>
          <p className="text-muted-foreground">Track publications, citations, and research impact metrics.</p>
        </div>
        {user && user.role !== 'Student' && (
          <Link to="/publications/new">
            <Button><Plus className="h-4 w-4 mr-2" />Add Publication</Button>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {publications.map(p => (
          <Card key={p._id} className="!p-0 bg-card/50 border-border">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-accent-green/20 text-accent-green">{p.status}</Badge>
                    <Badge className="bg-primary/20 text-primary">{p.type}</Badge>
                    <Badge className="bg-accent-yellow/20 text-accent-yellow">{p.access}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.authors.join(", ")}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-sm text-muted-foreground">Citations</p>
                  <p className="text-3xl font-bold">{p.citations}</p>
                </div>
              </div>
              <div className="text-sm mt-4 pt-4 border-t border-border">
                <p><span className="font-semibold">Journal:</span> {p.journal} | <span className="font-semibold">Year:</span> {p.year} | <span className="font-semibold">Impact Factor:</span> {p.impactFactor}</p>
                <div className="mt-2">
                  <p className="font-semibold">Keywords:</p>
                  <div className="flex gap-2 mt-1">
                    {p.keywords.map(k => <Badge key={k} className="bg-slate-700 text-slate-300">{k}</Badge>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}