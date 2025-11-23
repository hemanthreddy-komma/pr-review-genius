import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitPullRequest, Sparkles, Shield, Zap, FileCode, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewComment {
  category: "logic" | "readability" | "performance" | "security";
  severity: "info" | "warning" | "critical";
  line: number;
  message: string;
  suggestion: string;
}

const Index = () => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviews, setReviews] = useState<ReviewComment[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please provide a GitHub PR URL or diff to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call - Replace with actual backend call
    setTimeout(() => {
      const mockReviews: ReviewComment[] = [
        {
          category: "security",
          severity: "critical",
          line: 42,
          message: "Potential SQL injection vulnerability detected",
          suggestion: "Use parameterized queries instead of string concatenation"
        },
        {
          category: "performance",
          severity: "warning",
          line: 58,
          message: "N+1 query pattern detected in loop",
          suggestion: "Consider using bulk fetch or join operation"
        },
        {
          category: "readability",
          severity: "info",
          line: 73,
          message: "Function exceeds recommended length (50 lines)",
          suggestion: "Break down into smaller, focused functions"
        },
        {
          category: "logic",
          severity: "warning",
          line: 91,
          message: "Potential race condition in async operation",
          suggestion: "Add proper locking mechanism or use atomic operations"
        }
      ];
      
      setReviews(mockReviews);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: `Found ${mockReviews.length} review comments`,
      });
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "warning": return "warning";
      case "info": return "info";
      default: return "secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security": return <Shield className="w-4 h-4" />;
      case "performance": return <Zap className="w-4 h-4" />;
      case "readability": return <FileCode className="w-4 h-4" />;
      case "logic": return <Sparkles className="w-4 h-4" />;
      default: return null;
    }
  };

  const filterByCategory = (category: string) => {
    return reviews.filter(r => r.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GitPullRequest className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PR Review Agent
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Automated code review powered by multi-agent AI system
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-6 mb-8 border-primary/20 shadow-glow">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                GitHub PR URL or Diff
              </label>
              <Textarea
                placeholder="Paste GitHub PR URL or raw diff here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[200px] font-mono text-sm bg-code-bg"
              />
            </div>
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze PR
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {reviews.length > 0 && (
          <Card className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">
                  All ({reviews.length})
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="performance">
                  <Zap className="w-4 h-4 mr-2" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="readability">
                  <FileCode className="w-4 h-4 mr-2" />
                  Readability
                </TabsTrigger>
                <TabsTrigger value="logic">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Logic
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {reviews.map((review, idx) => (
                  <ReviewCard key={idx} review={review} getSeverityColor={getSeverityColor} getCategoryIcon={getCategoryIcon} />
                ))}
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-6">
                {filterByCategory("security").map((review, idx) => (
                  <ReviewCard key={idx} review={review} getSeverityColor={getSeverityColor} getCategoryIcon={getCategoryIcon} />
                ))}
              </TabsContent>

              <TabsContent value="performance" className="space-y-4 mt-6">
                {filterByCategory("performance").map((review, idx) => (
                  <ReviewCard key={idx} review={review} getSeverityColor={getSeverityColor} getCategoryIcon={getCategoryIcon} />
                ))}
              </TabsContent>

              <TabsContent value="readability" className="space-y-4 mt-6">
                {filterByCategory("readability").map((review, idx) => (
                  <ReviewCard key={idx} review={review} getSeverityColor={getSeverityColor} getCategoryIcon={getCategoryIcon} />
                ))}
              </TabsContent>

              <TabsContent value="logic" className="space-y-4 mt-6">
                {filterByCategory("logic").map((review, idx) => (
                  <ReviewCard key={idx} review={review} getSeverityColor={getSeverityColor} getCategoryIcon={getCategoryIcon} />
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};

const ReviewCard = ({ 
  review, 
  getSeverityColor, 
  getCategoryIcon 
}: { 
  review: ReviewComment;
  getSeverityColor: (severity: string) => string;
  getCategoryIcon: (category: string) => React.ReactNode;
}) => (
  <Card className="p-4 border-l-4 border-l-primary/50">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        {getCategoryIcon(review.category)}
        <Badge variant="secondary" className="capitalize">
          {review.category}
        </Badge>
        <Badge variant={getSeverityColor(review.severity) as any}>
          {review.severity}
        </Badge>
      </div>
      <span className="text-sm text-muted-foreground">Line {review.line}</span>
    </div>
    <p className="text-sm font-medium mb-2">{review.message}</p>
    <div className="bg-muted rounded-md p-3 mt-3">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Suggestion: </span>
        {review.suggestion}
      </p>
    </div>
  </Card>
);

export default Index;
