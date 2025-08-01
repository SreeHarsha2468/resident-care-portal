import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  MapPin, 
  FileText,
  Camera,
  Zap,
  Droplets,
  Wrench,
  Trash,
  HelpCircle
} from "lucide-react";

const SubmitIssue = () => {
  const [formData, setFormData] = useState({
    userName: "John Doe",
    location: "",
    category: "",
    description: "",
    image: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { value: "electrical", label: "Electrical", icon: Zap, color: "text-yellow-500" },
    { value: "plumbing", label: "Plumbing", icon: Droplets, color: "text-blue-500" },
    { value: "civil", label: "Civil", icon: Wrench, color: "text-gray-500" },
    { value: "garbage", label: "Garbage", icon: Trash, color: "text-green-500" },
    { value: "others", label: "Others", icon: HelpCircle, color: "text-purple-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Issue Submitted Successfully!",
        description: "Your maintenance request has been received. Issue ID: #IR-2024-001",
      });
      navigate("/issues");
      setIsLoading(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ 
            ...formData, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
          });
          toast({
            title: "Location captured",
            description: "GPS coordinates have been added to your report.",
          });
        },
        () => {
          toast({
            title: "Location unavailable",
            description: "Please enter your location manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Submit Maintenance Issue</h1>
          <p className="text-muted-foreground">
            Report a problem and we'll get it fixed as quickly as possible
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Issue Details</span>
            </CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us resolve your issue quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Name */}
              <div className="space-y-2">
                <Label htmlFor="userName">Your Name</Label>
                <Input
                  id="userName"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Building/Unit number or description"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={getCurrentLocation}
                    className="flex items-center space-x-2"
                  >
                    <MapPin className="h-4 w-4" />
                    <span className="hidden sm:inline">GPS</span>
                  </Button>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Issue Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center space-x-2">
                          <category.icon className={`h-4 w-4 ${category.color}`} />
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please describe the issue in detail. Include when it started, how often it occurs, and any other relevant information..."
                  rows={5}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="space-y-2">
                    {formData.image ? (
                      <div className="flex items-center justify-center space-x-2 text-success">
                        <Camera className="h-5 w-5" />
                        <span className="text-sm font-medium">{formData.image.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image')?.click()}
                          >
                            Choose Image
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Take a photo or upload an image to help us understand the issue better
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Submitting Issue..." : "Submit Issue"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              For emergency issues or if you need immediate assistance, please contact 
              your property management office directly at (555) 123-4567.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SubmitIssue;