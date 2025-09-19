import { Card, CardContent, Button, Badge } from '../ui.js';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Upload, BarChart, Target, BookOpen, Users, Award, ExternalLink, UserPlus, CalendarDays, FileText } from 'lucide-react';

const kpiData = [
  { title: "Active Research Projects", value: "47", change: "+12% from last month", icon: Target, color: "primary" },
  { title: "Publications This Year", value: "134", change: "+23% from last year", icon: BookOpen, color: "accent-yellow" },
  { title: "Faculty & Students", value: "89", change: "+5% from last month", icon: Users, color: "accent-violet" },
  { title: "Citation Index", value: "2.8k", change: "+18% from last month", icon: Award, color: "accent-pink" },
];
const chartData = [{ m: 'Jan', v: 200 }, { m: 'Feb', v: 300 }, { m: 'Mar', v: 250 }, { m: 'Apr', v: 400 }, { m: 'May', v: 350 }, { m: 'Jun', v: 500 }, { m: 'Jul', v: 450 }, { m: 'Aug', v: 600 }, { m: 'Sep', v: 550 }, { m: 'Oct', v: 700 }, { m: 'Nov', v: 650 }, { m: 'Dec', v: 800 }];
const recentPublications = [
  { title: "Blockchain-based Secure Data Analytics Framework for IoT Applications", authors: ["Dr. Rajnish Kumar, Ms. Divya S, Mr. Manoj T"], impact: "High Impact", category: "Data Science", citations: 31 },
  { title: "Federated Learning for Privacy-Preserving Healthcare Data Analysis", authors: ["Dr. Meera Nair, Dr. Arun Kumar, Ms. Reshma P"], impact: "Medium Impact", category: "AI/ML", citations: 18 }
];
const quickActions = [
    { label: "New Research Project", desc: "Create Project", icon: Plus, color: "accent-violet", link: "/projects/new" },
    { label: "Submit Publication", desc: "Upload Paper", icon: Upload, link: "/publications/new" },
    { label: "Add Team Member", desc: "Invite Member", icon: UserPlus, link: "/faculty" },
    { label: "Schedule Meeting", desc: "Schedule", icon: CalendarDays, link: "/events" },
    { label: "Create Proposal", desc: "Draft Proposal", icon: FileText, link: "/proposals" },
    { label: "Track Funding", desc: "View Funding", icon: Target, link: "/funding" },
    { label: "Submit Award", desc: "Nominate", icon: Award, link: "/awards" },
    { label: "Generate Report", desc: "Generate", icon: BarChart, link: "/analytics" }
];


export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-card/50 border border-border rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">AIML & DS Research <span className="text-accent-yellow">Excellence Hub</span></h1>
        <p className="text-muted-foreground mb-6 max-w-3xl">Pioneering breakthrough research in Artificial Intelligence, Machine Learning, and Data Science at CHRIST University Bangalore Kengeri Campus.</p>
        <div className="flex gap-4">
            <Link to="/projects/new"><Button className="bg-accent-yellow hover:bg-accent-yellow/90 text-black"><Plus className="h-4 w-4 mr-2" />New Research Project</Button></Link>
            <Link to="/publications/new"><Button variant="outline"><Upload className="h-4 w-4 mr-2" />Submit Publication</Button></Link>
            <Link to="/analytics"><Button variant="outline"><BarChart className="h-4 w-4 mr-2" />View Analytics</Button></Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(item => (
          <Card key={item.title} className="!p-0 bg-card/50 border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{item.title}</p><p className="text-3xl font-bold mt-1">{item.value}</p><p className="text-xs text-accent-green mt-1">{item.change}</p></div><div className={`w-12 h-12 bg-${item.color} rounded-xl flex items-center justify-center`}>{React.createElement(item.icon, { className: "h-6 w-6 text-white" })}</div></CardContent></Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/50 border-border"><CardContent><ResponsiveContainer width="100%" height={300}><AreaChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /><XAxis dataKey="m" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#171e2c', border: '1px solid #334155' }} /><Area type="monotone" dataKey="v" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} /></AreaChart></ResponsiveContainer></CardContent></Card>
        <div className="space-y-4"><div className="flex justify-between items-center"><h3 className="text-lg font-semibold">Recent Publications</h3><Link to="/publications"><Button variant="ghost" size="sm">View All</Button></Link></div>{recentPublications.map(pub => (<Card key={pub.title} className="!p-0 bg-card/50 border-border"><CardContent className="p-4 space-y-2"><div className="flex justify-between items-start"><h4 className="text-sm font-medium leading-tight">{pub.title}</h4><ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" /></div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Badge className={pub.impact === 'High Impact' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-yellow/20 text-accent-yellow'}>{pub.impact}</Badge><Badge className="bg-sky-500/20 text-sky-400">{pub.category}</Badge></div><div className="flex items-center gap-1 text-xs text-accent-yellow"><Award className="h-3 w-3" /><span>{pub.citations}</span></div></div></CardContent></Card>))}</div>
      </div>
      <div><h3 className="text-lg font-semibold mb-4">Quick Actions</h3><div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">{quickActions.map(action => (<Link to={action.link} key={action.label}><Button variant="outline" className={`h-24 w-full flex-col gap-2 bg-card/50 border-border hover:bg-slate-700 ${action.color === 'accent-violet' && '!bg-accent-violet hover:!bg-accent-violet/90 text-white'}`}>{React.createElement(action.icon, { className: "h-6 w-6" })}<div className="text-center"><p className="text-sm font-medium">{action.label}</p><p className="text-xs text-muted-foreground">{action.desc}</p></div></Button></Link>))}</div></div>
    </div>
  );
}