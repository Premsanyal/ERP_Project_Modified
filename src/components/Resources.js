import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button, Progress, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui.js';
import { DollarSign, Calendar, User, CheckCircle, Clock, XCircle, Search, Filter, Plus, Laptop, Server, FlaskConical, Building } from 'lucide-react';


const resourceRequests = [
  { id: 1, title: "High-Performance Computing Cluster Access", requestor: "Dr. Sarah Chen", department: "Computer Science", status: "approved", amount: 25000, requestDate: "2024-08-15" },
  { id: 2, title: "Laboratory Equipment - Microscopy System", requestor: "Dr. Emily Watson", department: "Biomedical Engineering", status: "pending", amount: 150000, requestDate: "2024-08-10" },
];
const getStatusColor = (status) => ({ approved: 'bg-green-100 text-green-800', pending: 'bg-yellow-100 text-yellow-800' }[status]);

export function Resources() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-white">Resource Allocation & Approvals</h2>
          <p className="text-muted-foreground">Manage resource requests, budgets, and workflows</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Request</Button>
      </div>
      <div className="space-y-4">
        {resourceRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className={getStatusColor(request.status)}>{request.status}</Badge>
                  <CardTitle className="text-lg">{request.title}</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl">${(request.amount / 1000).toFixed(0)}K</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><div><p className="text-muted-foreground">Requestor</p><p>{request.requestor}</p></div></div>
                <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground" /><div><p className="text-muted-foreground">Department</p><p>{request.department}</p></div></div>
              </div>
              <div className="flex gap-2 pt-2">
                {request.status === 'pending' ? (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-4 w-4 mr-2" />Approve</Button>
                    <Button variant="outline" size="sm"><XCircle className="h-4 w-4 mr-2" />Reject</Button>
                  </>
                ) : (<Button variant="outline" size="sm">View Details</Button>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}