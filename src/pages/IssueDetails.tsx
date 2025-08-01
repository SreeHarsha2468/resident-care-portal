import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Wrench,
  Zap,
  Droplets,
  Trash,
  HelpCircle,
  Image as ImageIcon,
  Phone,
  Mail
} from "lucide-react";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from an API
  const issue = {
    id: "IR-2024-001",
    title: "Leaking kitchen faucet",
    category: "plumbing",
    description: "Kitchen faucet has been dripping constantly for the past week. Water pressure seems low. The leak appears to be coming from the base of the faucet and has gotten progressively worse. It's now dripping approximately every 3-5 seconds, which is wasting a significant amount of water. I've tried tightening the connections but it hasn't helped.",
    location: "Apt 3B, Building A",
    submittedDate: "2024-01-15T10:30:00",
    status: "in-progress" as "submitted" | "assigned" | "in-progress" | "resolved",
    submittedBy: "John Doe",
    submittedByEmail: "john.doe@email.com",
    assignedTechnician: "Mike Rodriguez",
    technicianPhone: "(555) 123-4567",
    estimatedCompletion: "2024-01-17",
    images: [
      "/placeholder-image.jpg"
    ],
    timeline: [
      {
        date: "2024-01-15T10:30:00",
        status: "submitted",
        description: "Issue reported by resident",
        icon: FileText
      },
      {
        date: "2024-01-15T14:20:00", 
        status: "assigned",
        description: "Assigned to Mike Rodriguez (Plumbing Specialist)",
        icon: AlertCircle
      },
      {
        date: "2024-01-16T09:00:00",
        status: "in-progress", 
        description: "Technician began work on the issue",
        icon: Clock
      }
    ]
  };

  const categoryIcons = {
    electrical: { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100" },
    plumbing: { icon: Droplets, color: "text-blue-500", bg: "bg-blue-100" },
    civil: { icon: Wrench, color: "text-gray-500", bg: "bg-gray-100" },
    garbage: { icon: Trash, color: "text-green-500", bg: "bg-green-100" },
    others: { icon: HelpCircle, color: "text-purple-500", bg: "bg-purple-100" },
  };

  const statusConfig = {
    submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800", icon: FileText },
    assigned: { label: "Assigned", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
    "in-progress": { label: "In Progress", color: "bg-orange-100 text-orange-800", icon: Clock },
    resolved: { label: "Resolved", color: "bg-green-100 text-green-800", icon: CheckCircle },
  };

  const CategoryIcon = categoryIcons[issue.category as keyof typeof categoryIcons]?.icon || HelpCircle;
  const categoryColor = categoryIcons[issue.category as keyof typeof categoryIcons]?.color || "text-gray-500";
  const categoryBg = categoryIcons[issue.category as keyof typeof categoryIcons]?.bg || "bg-gray-100";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/issues")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Issues</span>
          </Button>
        </div>

        {/* Main Issue Info */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${categoryBg}`}>
                  <CategoryIcon className={`h-6 w-6 ${categoryColor}`} />
                </div>
                <div>
                  <CardTitle className="text-2xl">{issue.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Issue ID: {issue.id} • Category: {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
                  </CardDescription>
                </div>
              </div>
              <Badge className={statusConfig[issue.status].color + " text-sm"}>
                {statusConfig[issue.status].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Issue Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
                <p className="font-medium">{issue.location}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Submitted</span>
                </div>
                <p className="font-medium">
                  {new Date(issue.submittedDate).toLocaleDateString()} at{" "}
                  {new Date(issue.submittedDate).toLocaleTimeString()}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Submitted by</span>
                </div>
                <p className="font-medium">{issue.submittedBy}</p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{issue.description}</p>
            </div>

            {/* Images */}
            {issue.images.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5" />
                    <span>Attached Images</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {issue.images.map((image, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assignment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Assignment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {issue.status === "assigned" || issue.status === "in-progress" || issue.status === "resolved" ? (
                <>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Assigned Technician</p>
                    <p className="font-medium">{issue.assignedTechnician}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{issue.technicianPhone}</span>
                    </div>
                  </div>

                  {issue.estimatedCompletion && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Estimated Completion</p>
                      <p className="font-medium">
                        {new Date(issue.estimatedCompletion).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Waiting for assignment</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Progress Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issue.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <event.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} at{" "}
                        {new Date(event.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Need to Update This Issue?</h3>
              <p className="text-sm text-muted-foreground">
                If you have additional information or need to make changes, please contact your property management office.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Office
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IssueDetails;