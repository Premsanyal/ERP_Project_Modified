import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '../ui.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Line } from 'recharts';
import { TrendingUp, Users, BookOpen, Award, Plus, Upload, UserPlus, CalendarDays, FileText, Target, Eye, ExternalLink } from 'lucide-react';

const researchActivityData = [
  { month: 'Jan', publications: 120, projects: 85, citations: 280 },
  { month: 'Feb', publications: 142, projects: 92, citations: 315 },
  { month: 'Mar', publications: 168, projects: 108, citations: 350 },
  { month: 'Apr', publications: 195, projects: 125, citations: 390 },
  { month: 'May', publications: 225, projects: 142, citations: 425 },
  { month: 'Jun', publications: 258, projects: 160, citations: 465 },
];

const recentPublications = [
  { title: "Blockchain-based Secure Data Analytics Framework for IoT", authors: ["Dr. Rajesh Kumar", "Ms. Divya S"], impact: "High Impact", category: "Data Science", citations: 31 },
  { title: "Federated Learning for Privacy-Preserving Healthcare Analysis", authors: ["Dr. Meera Nair", "Dr. Arun Kumar"], impact: "Medium Impact", category: "AI/ML", citations: 18 }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="space-bg rounded-2xl p-8 relative overflow-hidden glow">
        <div className="max-w-4xl">
          <h1 className="text-4xl text-white mb-4">AIML & DS Research <span className="text-yellow-400">Excellence Hub</span></h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">Pioneering breakthrough research in Artificial Intelligence, Machine Learning, and Data Science at CHRIST University Bangalore Kengeri Campus.</p>
          <div className="flex gap-4">
            <Button><Plus className="h-4 w-4 mr-2" />New Research Project</Button>
            <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Submit Publication</Button>
            <Button variant="outline"><BarChart className="h-4 w-4 mr-2" />View Analytics</Button>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="!p-0"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Active Projects</p><p className="text-3xl font-bold mb-2">47</p></div><div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center"><Target className="h-6 w-6 text-white" /></div></div></CardContent></Card>
        <Card className="!p-0"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Publications YTD</p><p className="text-3xl font-bold mb-2">134</p></div><div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center"><BookOpen className="h-6 w-6 text-white" /></div></div></CardContent></Card>
        <Card className="!p-0"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Faculty & Students</p><p className="text-3xl font-bold mb-2">89</p></div><div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><Users className="h-6 w-6 text-white" /></div></div></CardContent></Card>
        <Card className="!p-0"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Citation Index</p><p className="text-3xl font-bold mb-2">2.8k</p></div><div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center"><Award className="h-6 w-6 text-white" /></div></div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Research Activity Overview</CardTitle>
            <CardDescription>Publications, projects, and citations trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={researchActivityData}>
                <defs><linearGradient id="publications" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 40, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff'}} />
                <Area type="monotone" dataKey="publications" stroke="#3b82f6" fillOpacity={1} fill="url(#publications)" strokeWidth={2} />
                <Line type="monotone" dataKey="projects" stroke="#34a853" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Publications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPublications.map((pub, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-sm font-medium leading-tight">{pub.title}</h4>
                <p className="text-xs text-muted-foreground">{pub.authors.join(", ")}</p>
                <div className="flex items-center gap-2">
                  <Badge className={pub.impact === 'High Impact' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>{pub.impact}</Badge>
                  <Badge className="bg-sky-500/20 text-sky-400">{pub.category}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}