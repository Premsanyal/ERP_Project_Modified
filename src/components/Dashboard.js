import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Badge } from '../ui.js';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Upload, BarChart, Target, BookOpen, Users, Award, ExternalLink } from 'lucide-react';

export function Dashboard() {
  const { user } = useContext(AuthContext);

  // In a real app, this data would be fetched from the API
  const kpiData = [
    { title: "Active Research Projects", value: "47", change: "+12% from last month", icon: Target, color: "primary" },
    { title: "Publications This Year", value: "134", change: "+23% from last year", icon: BookOpen, color: "accent-yellow" },
    { title: "Faculty & Students", value: "89", change: "+5% from last month", icon: Users, color: "accent-violet" },
    { title: "Citation Index", value: "2.8k", change: "+18% from last month", icon: Award, color: "accent-pink" },
  ];
  const chartData = [{ m: 'Jan', v: 200 }, { m: 'Mar', v: 250 }, { m: 'Jun', v: 500 }, { m: 'Sep', v: 550 }, { m: 'Dec', v: 800 }];
  
  return (
    <div className="space-y-8">
      <div className="bg-card/50 border border-border rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">AIML & DS Research <span className="text-accent-yellow">Excellence Hub</span></h1>
        <p className="text-muted-foreground mb-6 max-w-3xl">Welcome, {user.name}. Manage your research portfolio from this central dashboard.</p>
        <div className="flex gap-4">
            {user.role !== 'Student' && (
              <Link to="/projects/new">
                <Button className="bg-accent-yellow hover:bg-accent-yellow/90 text-black"><Plus className="h-4 w-4 mr-2" />New Research Project</Button>
              </Link>
            )}
            <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Submit Publication</Button>
            <Link to="/analytics"><Button variant="outline"><BarChart className="h-4 w-4 mr-2" />View Analytics</Button></Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(item => (
          <Card key={item.title} className="!p-0 bg-card/50 border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{item.title}</p><p className="text-3xl font-bold mt-1">{item.value}</p><p className="text-xs text-accent-green mt-1">{item.change}</p></div><div className={`w-12 h-12 bg-${item.color} rounded-xl flex items-center justify-center`}>{React.createElement(item.icon, { className: "h-6 w-6 text-white" })}</div></CardContent></Card>
        ))}
      </div>
      {/* Chart and other sections... */}
    </div>
  );
}