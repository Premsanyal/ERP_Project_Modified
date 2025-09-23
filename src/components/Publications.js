import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, Button, Badge, Input, Label, Textarea, Dialog, DialogContent, DialogTitle, DialogActions } from '../ui.js';
import { Plus, Upload, X } from 'lucide-react';

export function Publications() {
  const [publications, setPublications] = useState([]);
  const { user } = useContext(AuthContext);

  // Modal state for adding a publication
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState('');
  const [impactFactor, setImpactFactor] = useState('');
  const [citations, setCitations] = useState('');
  const [status, setStatus] = useState('Published');
  const [type, setType] = useState('Journal Article');
  const [access, setAccess] = useState('Open Access');
  const [keywords, setKeywords] = useState('');
  const [file, setFile] = useState(null);

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

  const handleAddPublication = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend
    const newPub = {
      _id: Date.now(),
      title,
      authors: authors.split(',').map(a => a.trim()),
      journal,
      year: parseInt(year),
      impactFactor: parseFloat(impactFactor),
      citations: parseInt(citations),
      status,
      type,
      access,
      keywords: keywords.split(',').map(k => k.trim()),
      file
    };
    setPublications([newPub, ...publications]);
    setShowAddForm(false);
    setTitle('');
    setAuthors('');
    setJournal('');
    setYear('');
    setImpactFactor('');
    setCitations('');
    setStatus('Published');
    setType('Journal Article');
    setAccess('Open Access');
    setKeywords('');
    setFile(null);
    // Optionally, show a toast/notification
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Publications & Research Output</h2>
          <p className="text-muted-foreground">Track publications, citations, and research impact metrics.</p>
        </div>
        {user && user.role !== 'Student' && (
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />Add Publication
          </Button>
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

      {/* Add Publication Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Add New Publication
            </div>
          </DialogTitle>
          <form onSubmit={handleAddPublication} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="pub-title">Title</Label>
              <Input
                id="pub-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                placeholder="Publication title"
              />
            </div>
            <div>
              <Label htmlFor="pub-authors">Authors</Label>
              <Input
                id="pub-authors"
                value={authors}
                onChange={e => setAuthors(e.target.value)}
                required
                placeholder="Comma separated (e.g. Dr. A, Dr. B)"
              />
            </div>
            <div>
              <Label htmlFor="pub-journal">Journal</Label>
              <Input
                id="pub-journal"
                value={journal}
                onChange={e => setJournal(e.target.value)}
                required
                placeholder="Journal name"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="pub-year">Year</Label>
                <Input
                  id="pub-year"
                  type="number"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  required
                  placeholder="2025"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="pub-impact">Impact Factor</Label>
                <Input
                  id="pub-impact"
                  type="number"
                  step="0.1"
                  value={impactFactor}
                  onChange={e => setImpactFactor(e.target.value)}
                  required
                  placeholder="e.g. 7.5"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="pub-citations">Citations</Label>
                <Input
                  id="pub-citations"
                  type="number"
                  value={citations}
                  onChange={e => setCitations(e.target.value)}
                  required
                  placeholder="e.g. 10"
                  min="0"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="pub-status">Status</Label>
                <select
                  id="pub-status"
                  className="w-full rounded border px-2 py-1 bg-background text-white"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option>Published</option>
                  <option>In Review</option>
                  <option>Draft</option>
                </select>
              </div>
              <div className="flex-1">
                <Label htmlFor="pub-type">Type</Label>
                <select
                  id="pub-type"
                  className="w-full rounded border px-2 py-1 bg-background text-white"
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <option>Journal Article</option>
                  <option>Research Article</option>
                  <option>Conference Paper</option>
                  <option>Book Chapter</option>
                </select>
              </div>
              <div className="flex-1">
                <Label htmlFor="pub-access">Access</Label>
                <select
                  id="pub-access"
                  className="w-full rounded border px-2 py-1 bg-background text-white"
                  value={access}
                  onChange={e => setAccess(e.target.value)}
                >
                  <option>Open Access</option>
                  <option>Restricted</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="pub-keywords">Keywords</Label>
              <Input
                id="pub-keywords"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                required
                placeholder="Comma separated (e.g. AI, ML, Data Science)"
              />
            </div>
            <div>
              <Label htmlFor="pub-file">Upload File</Label>
              <Input
                id="pub-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
            <DialogActions>
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                <Upload className="h-4 w-4 mr-1" /> Add Publication
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}