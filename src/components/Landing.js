// File: src/components/Landing.js
// Replace the entire content of this file.

import React from 'react';
import { Button, Card, CardContent, Badge } from '../ui.js';
import { University, BarChart3, Users, BookOpen, FolderOpen, Award, Globe, Zap, Shield, ArrowRight, Play, Database, TrendingUp } from 'lucide-react';

export function Landing({ onGetStarted }) {
  const stats = [
    { label: "Active Projects", value: "247+", icon: FolderOpen },
    { label: "Publications", value: "1,847+", icon: BookOpen },
    { label: "Researchers", value: "189+", icon: Users },
    { label: "Citations", value: "12.8k+", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-white">
      <nav className="border-b border-white/10 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <University className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">CHRIST University</h1>
              <p className="text-xs text-muted-foreground">Research Portal</p>
            </div>
          </div>
          <Button onClick={onGetStarted}>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </nav>

      <main>
        <section className="space-bg glow relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30"><Zap className="w-3 h-3 mr-1" />AIML & Data Science Research Hub</Badge>
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">Transform Your <span className="text-primary">Research</span> Journey</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">Streamline academic research with our comprehensive ERP platform. Manage projects, track publications, analyze impact, and collaborate seamlessly with cutting-edge technology.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={onGetStarted}><Play className="mr-2 h-5 w-5" />Launch Portal</Button>
                  <Button size="lg" variant="outline"><Globe className="mr-2 h-5 w-5" />View Demo</Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <Card className="p-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Research Dashboard</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Live Data</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-primary" /><span className="text-sm">Growth Rate</span></div>
                        <div className="text-2xl font-bold text-primary">+23%</div>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-1"><Database className="h-4 w-4 text-green-400" /><span className="text-sm">Impact Score</span></div>
                        <div className="text-2xl font-bold text-green-400">8.7</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {['AI Climate Prediction', 'Blockchain Security', 'Smart City Analytics'].map((project) => (
                        <div key={project} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white text-sm">{project}</span>
                          <Badge variant="secondary" className="bg-primary/20 text-primary">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">{React.createElement(stat.icon, { className: "h-7 w-7 text-primary" })}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 text-center">
            <h2 className="text-4xl font-bold">Comprehensive Research Management</h2>
        </section>
      </main>
    </div>
  );
}