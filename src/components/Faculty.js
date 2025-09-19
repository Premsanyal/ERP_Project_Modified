import { Card, CardContent, Button, Badge, Avatar, AvatarFallback } from '../ui.js';
import { Plus, Search } from 'lucide-react';

const faculty = [
    { id: 1, name: "Dr. Sarah Chen", title: "Professor", dept: "Computer Science", avatar: "SC", stats: { pubs: 47, citations: 1234, hIndex: 18 }, expertise: ["Machine Learning", "Deep Learning", "Computer Vision"] },
    { id: 2, name: "Dr. Michael Torres", title: "Associate Professor", dept: "Environmental Science", avatar: "MT", stats: { pubs: 32, citations: 892, hIndex: 15 }, expertise: ["Climate Science", "Data Analysis", "Environmental Modeling"] },
    { id: 3, name: "Dr. Emily Watson", title: "Senior Researcher", dept: "Biomedical Engineering", avatar: "EW", stats: { pubs: 29, citations: 756, hIndex: 14 }, expertise: ["Nanotechnology", "Drug Delivery", "Biomaterials"] }
];

export function Faculty() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h2 className="text-2xl font-bold text-white">Research Faculty & Staff</h2><p className="text-muted-foreground">Directory of researchers, faculty, and their expertise.</p></div>
                <Button><Plus className="h-4 w-4 mr-2" />Add Researcher</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {faculty.map(f => (
                    <Card key={f.id} className="!p-0 bg-card/50 border-border"><CardContent className="p-4">
                        <div className="flex items-center gap-4"><Avatar className="h-12 w-12 text-lg"><AvatarFallback>{f.avatar}</AvatarFallback></Avatar><div><h3 className="text-lg font-semibold">{f.name}</h3><p className="text-sm text-primary">{f.title}</p><p className="text-xs text-muted-foreground">{f.dept}</p></div></div>
                        <div className="grid grid-cols-3 gap-4 text-center py-3 my-3 border-y border-border"><div className="space-y-1"><p className="text-xl font-bold">{f.stats.pubs}</p><p className="text-xs text-muted-foreground">Publications</p></div><div className="space-y-1"><p className="text-xl font-bold">{f.stats.citations}</p><p className="text-xs text-muted-foreground">Citations</p></div><div className="space-y-1"><p className="text-xl font-bold">{f.stats.hIndex}</p><p className="text-xs text-muted-foreground">H-Index</p></div></div>
                        <div><p className="text-sm font-semibold mb-2">Expertise</p><div className="flex flex-wrap gap-1">{f.expertise.map(e => <Badge key={e} className="bg-slate-700 text-slate-300">{e}</Badge>)}</div></div>
                    </CardContent></Card>
                ))}
            </div>
        </div>
    );
}