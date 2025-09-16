import { Card, CardContent, CardDescription, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, Users, BookOpen, Target } from 'lucide-react';

const publicationTrends = [
  { year: '2020', publications: 45, citations: 892 }, { year: '2021', publications: 52, citations: 1156 },
  { year: '2022', publications: 68, citations: 1487 }, { year: '2023', publications: 78, citations: 1823 },
  { year: '2024', publications: 89, citations: 2145 }
];
const departmentPerformance = [
  { department: 'CompSci', publications: 32, citations: 1247 }, { department: 'EnvSci', publications: 18, citations: 678 },
  { department: 'BioMed', publications: 15, citations: 567 }, { department: 'Physics', publications: 12, citations: 445 }
];
const researchAreas = [
  { name: 'AI', value: 28, color: '#0088FE' }, { name: 'Environment', value: 22, color: '#00C49F' },
  { name: 'Biotech', value: 18, color: '#FFBB28' }, { name: 'Physics', value: 16, color: '#FF8042' }
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Research Analytics</h2>
        <p className="text-muted-foreground">Comprehensive analysis of research performance, trends, and ROI.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="!p-0"><CardContent className="p-6"><div className="flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium">Research Impact</CardTitle><Target className="h-4 w-4 text-muted-foreground" /></div><div className="text-2xl font-bold mt-1">7.8</div><p className="text-xs text-green-400">+0.3 from last quarter</p></CardContent></Card>
        <Card className="!p-0"><CardContent className="p-6"><div className="flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium">Publication Velocity</CardTitle><BookOpen className="h-4 w-4 text-muted-foreground" /></div><div className="text-2xl font-bold mt-1">1.8</div><p className="text-xs text-muted-foreground">papers/researcher/mo</p></CardContent></Card>
        <Card className="!p-0"><CardContent className="p-6"><div className="flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium">Budget Efficiency</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></div><div className="text-2xl font-bold mt-1">94%</div><p className="text-xs text-green-400">Above target (90%)</p></CardContent></Card>
        <Card className="!p-0"><CardContent className="p-6"><div className="flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium">Collaboration Index</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></div><div className="text-2xl font-bold mt-1">6.2</div><p className="text-xs text-muted-foreground">avg authors/paper</p></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Publication & Citation Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={publicationTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ backgroundColor: '#171e2c', border: '1px solid #334155' }} />
                <Area type="monotone" dataKey="publications" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Research Areas Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={researchAreas} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {researchAreas.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#171e2c', border: '1px solid #334155' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}