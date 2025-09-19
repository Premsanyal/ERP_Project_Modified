import { Card, CardContent, CardHeader, CardTitle } from '../ui.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const kpiData = [
    { title: "Research Impact Score", value: "7.8", subtitle: "+0.3 from last quarter" },
    { title: "Publication Velocity", value: "1.8", subtitle: "papers per researcher/month" },
    { title: "Budget Efficiency", value: "94%", subtitle: "Above target (90%)" },
    { title: "Collaboration Index", value: "6.2", subtitle: "avg authors per paper" }
];
const publicationTrends = [{ name: '2021', pv: 52, cv: 1156 }, { name: '2022', pv: 68, cv: 1487 }, { name: '2023', pv: 78, cv: 1823 }, { name: '2024', pv: 89, cv: 2145 }];
const researchAreas = [{ name: 'AI', value: 28, color: '#0088FE' }, { name: 'Enviro', value: 22, color: '#00C49F' }, { name: 'Biotech', value: 18, color: '#FFBB28' }, { name: 'Physics', value: 16, color: '#FF8042' }, { name: 'Social Sci', value: 10, color: '#8884D8' }, { name: 'Other', value: 6, color: '#82CA9D' }];

export function Analytics() {
    return (
        <div className="space-y-6">
            <div><h2 className="text-2xl font-bold text-white">Research Analytics & Insights</h2><p className="text-muted-foreground">Comprehensive analysis of research performance, trends, and ROI.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map(kpi => (<Card key={kpi.title} className="!p-0 bg-card/50 border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">{kpi.title}</p><p className="text-2xl font-bold">{kpi.value}</p><p className="text-xs text-accent-green">{kpi.subtitle}</p></CardContent></Card>))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="bg-card/50 border-border"><CardHeader><CardTitle>Publication & Citation Trends</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><LineChart data={publicationTrends}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/><XAxis dataKey="name" stroke="#94a3b8"/><YAxis stroke="#94a3b8"/><Tooltip contentStyle={{ backgroundColor: '#171e2c' }} /><Line type="monotone" dataKey="pv" stroke="#8884d8" name="Publications" /><Line type="monotone" dataKey="cv" stroke="#82ca9d" name="Citations" /></LineChart></ResponsiveContainer></CardContent></Card>
                <Card className="bg-card/50 border-border"><CardHeader><CardTitle>Research Areas Distribution</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={researchAreas} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{researchAreas.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#171e2c' }} /></PieChart></ResponsiveContainer></CardContent></Card>
            </div>
        </div>
    );
}