import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, Button, Badge } from '../ui.js';
import { Plus } from 'lucide-react';

export function Funding() {
    const [requests, setRequests] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRequests = async () => {
            // Replace with your actual API call
            const staticData = [
                { _id: 1, title: "High-Performance Computing Cluster Access", requestor: "Dr. Sarah Chen", dept: "Computer Science", amount: 25000, status: "approved", priority: "high" },
                { _id: 2, title: "Microscopy System", requestor: "Dr. Emily Watson", dept: "Biomedical Engineering", amount: 150000, status: "pending", priority: "medium" },
                { _id: 3, title: "Lab Space Renovation", requestor: "Dr. Rachel Adams", dept: "Psychology", amount: 75000, status: "pending", priority: "low" }
            ];
            setRequests(staticData);
        };

        if (user) {
            fetchRequests();
        }
    }, [user]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h2 className="text-2xl font-bold text-white">Resource Allocation & Approvals</h2><p className="text-muted-foreground">Manage resource requests, budgets, and approval workflows.</p></div>
                <Link to="/funding/new">
                    <Button><Plus className="h-4 w-4 mr-2" />New Request</Button>
                </Link>
            </div>
            <div className="space-y-4">
                {requests.map(r => (
                    <Card key={r._id} className="!p-0 bg-card/50 border-border">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className={`capitalize ${r.status === 'approved' ? 'bg-accent-green/20 text-accent-green' : r.status === 'pending' ? 'bg-accent-yellow/20 text-accent-yellow' : 'bg-red-500/20 text-red-500'}`}>{r.status}</Badge>
                                        <Badge className={`capitalize ${r.priority === 'high' ? 'bg-red-500/20 text-red-400' : r.priority === 'medium' ? 'bg-accent-yellow/20 text-accent-yellow' : 'bg-slate-500/20 text-slate-400'}`}>{r.priority} priority</Badge>
                                    </div>
                                    <h3 className="font-semibold text-white">{r.title}</h3>
                                    <p className="text-sm text-muted-foreground">{r.requestor} - {r.dept}</p>
                                </div>
                                <p className="text-2xl font-bold">${(r.amount/1000).toFixed(0)}K</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}