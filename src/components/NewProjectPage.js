import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from '../ui.js';

export function NewProjectPage() {
    const [title, setTitle] = useState('');
    const [lead, setLead] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const project = { title, lead, description, budget: Number(budget) };

        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            console.log('New project added:', json);
            navigate('/projects'); // Redirect to projects page on success
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 border-border">
                <CardHeader><CardTitle>Create a New Research Project</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div><Label htmlFor="title">Project Title</Label><Input id="title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} /></div>
                        <div><Label htmlFor="lead">Project Lead</Label><Input id="lead" type="text" onChange={(e) => setLead(e.target.value)} value={lead} /></div>
                        <div><Label htmlFor="description">Description</Label><Input id="description" type="text" onChange={(e) => setDescription(e.target.value)} value={description} /></div>
                        <div><Label htmlFor="budget">Budget ($)</Label><Input id="budget" type="number" onChange={(e) => setBudget(e.target.value)} value={budget} /></div>
                        <Button className="w-full">Create Project</Button>
                        {error && <div className="text-red-500 mt-2 p-2 border border-red-500 rounded">{error}</div>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}