import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Avatar, AvatarFallback, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui.js';
import { Mail, Phone, MapPin, BookOpen, Award, Users, Search, Filter, Plus } from 'lucide-react';


const researchers = [
  { id: 1, name: "Dr. Sarah Chen", title: "Professor", department: "Computer Science", avatar: "SC", publications: 47, citations: 1234, hIndex: 18, email: "s.chen@university.edu" },
  { id: 2, name: "Dr. Michael Torres", title: "Associate Professor", department: "Environmental Science", avatar: "MT", publications: 32, citations: 892, hIndex: 15, email: "m.torres@university.edu" },
];

export function Researchers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-white">Research Faculty & Staff</h2>
          <p className="text-muted-foreground">Directory of researchers, faculty, and their expertise</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Researcher</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {researchers.map((researcher) => (
          <Card key={researcher.id}>
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12"><AvatarFallback>{researcher.avatar}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{researcher.name}</CardTitle>
                  <CardDescription>{researcher.title}</CardDescription>
                  <Badge variant="outline" className="mt-1 w-fit">{researcher.department}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">{researcher.email}</span></div>
              <div className="grid grid-cols-3 gap-4 text-center py-2 border-y">
                <div><p className="text-lg">{researcher.publications}</p><p className="text-xs text-muted-foreground">Publications</p></div>
                <div><p className="text-lg">{researcher.citations}</p><p className="text-xs text-muted-foreground">Citations</p></div>
                <div><p className="text-lg">{researcher.hIndex}</p><p className="text-xs text-muted-foreground">H-Index</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}