import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Zap, Code, Database, Cpu } from "lucide-react";
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About CalorieVision</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A deep learning-powered application for automatic food detection and calorie estimation, 
              built as part of an advanced computer vision course.
            </p>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Technology Stack</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Deep Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    YOLO (You Only Look Once) architecture for real-time object detection
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="secondary">YOLOv8</Badge>
                    <Badge variant="secondary">PyTorch</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Code className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Frontend</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    Modern React application with TypeScript and Tailwind CSS
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Tailwind</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Database className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Data Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    Advanced image preprocessing and nutritional database integration
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="secondary">OpenCV</Badge>
                    <Badge variant="secondary">NumPy</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Model Architecture */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Model Architecture</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  YOLO-based Food Detection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      Architecture Details
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Backbone: CSPDarknet53</li>
                      <li>• Neck: Path Aggregation Network (PANet)</li>
                      <li>• Head: YOLO Detection Head</li>
                      <li>• Input Resolution: 640x640 pixels</li>
                      <li>• Output: Bounding boxes + class probabilities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Performance Metrics
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Mean Average Precision (mAP): 0.847</li>
                      <li>• Inference Speed: ~45 FPS on GPU</li>
                      <li>• Model Size: 22.4 MB</li>
                      <li>• Training Dataset: 15K+ food images</li>
                      <li>• Food Classes: 50+ common food items</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Training Process</h3>
                  <p className="text-muted-foreground">
                    The model was trained on a curated dataset of food images with careful annotation of bounding boxes 
                    and food categories. Data augmentation techniques including rotation, scaling, and color adjustments 
                    were applied to improve generalization. The training process involved transfer learning from a 
                    pre-trained COCO dataset model, fine-tuned specifically for food detection tasks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Multi-Object Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Capable of detecting and localizing multiple food items within a single image, 
                    with precise bounding box coordinates and confidence scores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nutritional Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically estimates calorie content and nutritional information 
                    based on detected food items and portion size estimation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Real-time Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fast inference times enable near real-time analysis of uploaded images, 
                    providing immediate feedback to users.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visual Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Interactive visualization showing detected food items with colored bounding boxes 
                    and confidence indicators for transparency.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Information */}
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Course Project</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                This application was developed as part of an advanced Deep Learning course, 
                demonstrating practical applications of computer vision and object detection algorithms 
                in real-world scenarios.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge>Computer Vision</Badge>
                <Badge>Object Detection</Badge>
                <Badge>Deep Learning</Badge>
                <Badge>Food Recognition</Badge>
                <Badge>Nutritional Analysis</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;