import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { 
  FileText, 
  List, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Wrench,
  Zap,
  Droplets,
  Trash,
  HelpCircle
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { 
      title: "Active Issues", 
      value: "3", 
      icon: Clock, 
      color: "text-warning",
      bgColor: "bg-warning/10" 
    },
    { 
      title: "Resolved Issues", 
      value: "12", 
      icon: CheckCircle, 
      color: "text-success",
      bgColor: "bg-success/10" 
    },
    { 
      title: "Total Submitted", 
      value: "15", 
      icon: FileText, 
      color: "text-primary",
      bgColor: "bg-primary/10" 
    },
  ];

  const quickActions = [
    {
      title: "Submit New Issue",
      description: "Report a maintenance problem",
      icon: FileText,
      action: () => navigate("/submit"),
      color: "from-primary to-primary-hover"
    },
    {
      title: "View My Issues",
      description: "Check status of reported issues",
      icon: List,
      action: () => navigate("/issues"),
      color: "from-accent to-success"
    }
  ];

  const issueCategories = [
    { name: "Electrical", icon: Zap, count: 2, color: "text-yellow-500" },
    { name: "Plumbing", icon: Droplets, count: 4, color: "text-blue-500" },
    { name: "Civil", icon: Wrench, count: 3, color: "text-gray-500" },
    { name: "Garbage", icon: Trash, count: 1, color: "text-green-500" },
    { name: "Others", icon: HelpCircle, count: 5, color: "text-purple-500" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to CarePortal
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your one-stop solution for reporting and tracking maintenance issues. 
            Keep your community in perfect condition with our easy-to-use portal.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all group"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${action.color} text-white group-hover:scale-105 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Issue Categories Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span>Issue Categories</span>
            </CardTitle>
            <CardDescription>
              Overview of maintenance issues by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {issueCategories.map((category, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <category.icon className={`h-8 w-8 mx-auto mb-2 ${category.color}`} />
                  <p className="font-medium text-sm">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count} issues</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Need to report an issue?</h2>
            <p className="text-muted-foreground mb-6">
              Don't wait! Report maintenance issues quickly and track their progress in real-time.
            </p>
            <Button 
              onClick={() => navigate("/submit")}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
            >
              <FileText className="mr-2 h-5 w-5" />
              Submit New Issue
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;