import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, Button, Badge, Input, Label, Textarea, Dialog, DialogContent, DialogTitle, DialogActions } from '../ui.js';
import { Plus, X } from 'lucide-react';

export function Funding() {
    const [requests, setRequests] = useState([]);
    const { user } = useContext(AuthContext);

    // Modal state for adding a funding request
    const [showAddForm, setShowAddForm] = useState(false);

    // Form states
    const [title, setTitle] = useState('');
    const [requestor, setRequestor] = useState(user?.name || '');
    const [dept, setDept] = useState('');
    const [amount, setAmount] = useState('');
    const [priority, setPriority] = useState('medium');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            // Replace with your actual API call
            try {
                // const response = await fetch('/api/funding', {
                //     headers: { 'Authorization': `Bearer ${user.token}` }
                // });
                // const json = await response.json();
                // if (response.ok) setRequests(json);

                // Static fallback data
                setRequests([
                    { _id: 1, title: "High-Performance Computing Cluster Access", requestor: "Dr. Sarah Chen", dept: "Computer Science", amount: 25000, status: "approved", priority: "high" },
                    { _id: 2, title: "Microscopy System", requestor: "Dr. Emily Watson", dept: "Biomedical Engineering", amount: 150000, status: "pending", priority: "medium" },
                    { _id: 3, title: "Lab Space Renovation", requestor: "Dr. Rachel Adams", dept: "Psychology", amount: 75000, status: "pending", priority: "low" }
                ]);
            } catch {
                // fallback static data
            }
        };

        if (user) {
            fetchRequests();
        }
    }, [user]);

    const handleAddRequest = (e) => {
        e.preventDefault();
        // TODO: Integrate with backend
        const newRequest = {
            _id: Date.now(),
            title,
            requestor: requestor || user?.name || 'Unknown',
            dept,
            amount: parseFloat(amount),
            status: "pending",
            priority,
            description
        };
        setRequests([newRequest, ...requests]);
        setShowAddForm(false);
        setTitle('');
        setDept('');
        setAmount('');
        setPriority('medium');
        setDescription('');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Resource Allocation & Approvals</h2>
                    <p className="text-muted-foreground">Manage resource requests, budgets, and approval workflows.</p>
                </div>
                {user && (
                    <Button onClick={() => setShowAddForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />New Request
                    </Button>
                )}
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
                                    {r.description && <p className="text-xs mt-2 text-muted-foreground">{r.description}</p>}
                                </div>
                                <p className="text-2xl font-bold">${(r.amount/1000).toFixed(0)}K</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Add Funding Request Modal */}
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogContent>
                    <DialogTitle>
                        <div className="flex items-center gap-2">
                            <Plus className="h-5 w-5 text-primary" />
                            New Funding/Resource Request
                        </div>
                    </DialogTitle>
                    <form onSubmit={handleAddRequest} className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="fund-title">Title</Label>
                            <Input
                                id="fund-title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                                placeholder="Request title"
                            />
                        </div>
                        <div>
                            <Label htmlFor="fund-dept">Department</Label>
                            <Input
                                id="fund-dept"
                                value={dept}
                                onChange={e => setDept(e.target.value)}
                                required
                                placeholder="Department name"
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label htmlFor="fund-amount">Amount (INR)</Label>
                                <Input
                                    id="fund-amount"
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    required
                                    placeholder="e.g. 50000"
                                    min="0"
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="fund-priority">Priority</Label>
                                <select
                                    id="fund-priority"
                                    className="w-full rounded border px-2 py-1 bg-background text-white"
                                    value={priority}
                                    onChange={e => setPriority(e.target.value)}
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="fund-desc">Description</Label>
                            <Textarea
                                id="fund-desc"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Brief description of the request"
                            />
                        </div>
                        <DialogActions>
                            <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                                <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                            <Button type="submit" className="bg-primary text-white">
                                <Plus className="h-4 w-4 mr-1" /> Submit Request
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}