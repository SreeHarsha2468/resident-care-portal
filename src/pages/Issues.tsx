import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { 
  Search, 
  Filter,
  Eye,
  Calendar,
  MapPin,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Wrench,
  Zap,
  Droplets,
  Trash,
  HelpCircle
} from "lucide-react";

interface Issue {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  submittedDate: string;
  status: "submitted" | "assigned" | "in-progress" | "resolved";
  image?: string;
}

const Issues = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  const issues: Issue[] = [
    {
      id: "IR-2024-001",
      title: "Leaking kitchen faucet",
      category: "plumbing",
      description: "Kitchen faucet has been dripping constantly for the past week. Water pressure seems low.",
      location: "Apt 3B, Building A",
      submittedDate: "2024-01-15",
      status: "in-progress"
    },
    {
      id: "IR-2024-002", 
      title: "Broken hallway light",
      category: "electrical",
      description: "Light fixture in hallway has stopped working completely.",
      location: "Building A, 2nd Floor Hallway",
      submittedDate: "2024-01-14",
      status: "resolved"
    },
    {
      id: "IR-2024-003",
      title: "Garbage disposal issue",
      category: "garbage",
      description: "Garbage disposal is making loud noises and not working properly.",
      location: "Apt 5A, Building B",
      submittedDate: "2024-01-13",
      status: "assigned"
    },
    {
      id: "IR-2024-004",
      title: "Cracked wall in living room",
      category: "civil",
      description: "Large crack appeared in the living room wall near the window.",
      location: "Apt 2C, Building A",
      submittedDate: "2024-01-12",
      status: "submitted"
    }
  ];

  const categoryIcons = {
    electrical: { icon: Zap, color: "text-yellow-500" },
    plumbing: { icon: Droplets, color: "text-blue-500" },
    civil: { icon: Wrench, color: "text-gray-500" },
    garbage: { icon: Trash, color: "text-green-500" },
    others: { icon: HelpCircle, color: "text-purple-500" },
  };

  const statusConfig = {
    submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800", icon: FileText },
    assigned: { label: "Assigned", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
    "in-progress": { label: "In Progress", color: "bg-orange-100 text-orange-800", icon: Clock },
    resolved: { label: "Resolved", color: "bg-green-100 text-green-800", icon: CheckCircle },
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStats = () => {
    const stats = {
      total: issues.length,
      submitted: issues.filter(i => i.status === "submitted").length,
      assigned: issues.filter(i => i.status === "assigned").length,
      "in-progress": issues.filter(i => i.status === "in-progress").length,
      resolved: issues.filter(i => i.status === "resolved").length,
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">My Reported Issues</h1>
            <p className="text-muted-foreground">Track the status of your maintenance requests</p>
          </div>
          <Button 
            onClick={() => navigate("/submit")}
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
          >
            <FileText className="mr-2 h-4 w-4" />
            Submit New Issue
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Issues</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
              <p className="text-xs text-muted-foreground">Submitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.assigned}</p>
              <p className="text-xs text-muted-foreground">Assigned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{stats["in-progress"]}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues by ID, title, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No issues found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "You haven't submitted any issues yet"}
                </p>
                {!searchTerm && statusFilter === "all" && (
                  <Button 
                    onClick={() => navigate("/submit")}
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    Submit Your First Issue
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredIssues.map((issue) => {
              const CategoryIcon = categoryIcons[issue.category as keyof typeof categoryIcons]?.icon || HelpCircle;
              const categoryColor = categoryIcons[issue.category as keyof typeof categoryIcons]?.color || "text-gray-500";
              const StatusIcon = statusConfig[issue.status].icon;
              
              return (
                <Card key={issue.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full bg-muted`}>
                              <CategoryIcon className={`h-4 w-4 ${categoryColor}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{issue.title}</h3>
                              <p className="text-sm text-muted-foreground">ID: {issue.id}</p>
                            </div>
                          </div>
                          <Badge className={statusConfig[issue.status].color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[issue.status].label}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {issue.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{issue.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Submitted: {new Date(issue.submittedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/issues/${issue.id}`)}
                          className="flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Issues;