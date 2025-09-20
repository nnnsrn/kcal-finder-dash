import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Zap, Clock, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface DetectedFood {
  id: string;
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  weight: string;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

const Results = () => {
  const location = useLocation();
  const { imageData } = location.state || {};

  // Mock detection results - in real app, this would come from your ML model
  const mockResults: DetectedFood[] = [
    {
      id: "1",
      name: "Apple",
      confidence: 0.94,
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      weight: "182g",
      bbox: { x: 120, y: 80, width: 150, height: 140 }
    },
    {
      id: "2", 
      name: "Banana",
      confidence: 0.89,
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.4,
      weight: "118g",
      bbox: { x: 300, y: 120, width: 180, height: 120 }
    },
    {
      id: "3",
      name: "Orange",
      confidence: 0.91,
      calories: 85,
      protein: 1.7,
      carbs: 21,
      fat: 0.2,
      weight: "154g",
      bbox: { x: 50, y: 250, width: 130, height: 125 }
    }
  ];

  const totalCalories = mockResults.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = mockResults.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = mockResults.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = mockResults.reduce((sum, food) => sum + food.fat, 0);

  if (!imageData) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">No Analysis Data</h1>
          <p className="text-muted-foreground mb-8">
            No image analysis data found. Please upload an image first.
          </p>
          <Button asChild>
            <Link to="/detect">
              <Camera className="mr-2 h-4 w-4" />
              Start Detection
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link to="/detect">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Detection
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Analysis Results</h1>
              <p className="text-muted-foreground">
                Detected {mockResults.length} food items
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image with Bounding Boxes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Detection Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img 
                    src={imageData} 
                    alt="Food analysis" 
                    className="w-full h-auto rounded-lg"
                  />
                  {/* Bounding boxes overlay */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 500 400"
                  >
                    {mockResults.map((food, index) => (
                      <g key={food.id}>
                        <rect
                          x={food.bbox.x}
                          y={food.bbox.y}
                          width={food.bbox.width}
                          height={food.bbox.height}
                          fill="none"
                          stroke={index === 0 ? "#10B981" : index === 1 ? "#3B82F6" : "#F59E0B"}
                          strokeWidth="3"
                          rx="4"
                        />
                        <rect
                          x={food.bbox.x}
                          y={food.bbox.y - 25}
                          width={food.name.length * 8 + 20}
                          height="20"
                          fill={index === 0 ? "#10B981" : index === 1 ? "#3B82F6" : "#F59E0B"}
                          rx="3"
                        />
                        <text
                          x={food.bbox.x + 10}
                          y={food.bbox.y - 10}
                          fill="white"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {food.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="space-y-6">
              {/* Total Nutrition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Total Nutrition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{totalCalories}</div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">{totalProtein.toFixed(1)}g</div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{totalCarbs.toFixed(1)}g</div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{totalFat.toFixed(1)}g</div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Analysis Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span>2.3 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model Used:</span>
                    <span>YOLOv8-Food</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Detected:</span>
                    <span>{mockResults.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Confidence:</span>
                    <span>{(mockResults.reduce((sum, f) => sum + f.confidence, 0) / mockResults.length * 100).toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Individual Food Items */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Detected Food Items</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResults.map((food, index) => (
                <Card key={food.id} className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 w-full h-1"
                    style={{
                      backgroundColor: index === 0 ? "#10B981" : index === 1 ? "#3B82F6" : "#F59E0B"
                    }}
                  />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{food.name}</CardTitle>
                      <Badge variant="secondary">
                        {(food.confidence * 100).toFixed(0)}% confident
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Weight:</span>
                        <div className="font-medium">{food.weight}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Calories:</span>
                        <div className="font-medium text-primary">{food.calories} kcal</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-secondary/10 rounded">
                        <div className="font-medium">{food.protein}g</div>
                        <div className="text-muted-foreground">Protein</div>
                      </div>
                      <div className="text-center p-2 bg-accent/10 rounded">
                        <div className="font-medium">{food.carbs}g</div>
                        <div className="text-muted-foreground">Carbs</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">{food.fat}g</div>
                        <div className="text-muted-foreground">Fat</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <Button size="lg" asChild>
              <Link to="/detect">
                <Camera className="mr-2 h-4 w-4" />
                Analyze Another Image
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Export Results
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;