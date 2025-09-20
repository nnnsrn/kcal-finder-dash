import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Zap, Target, BarChart3, Upload, Eye } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(var(--gradient-hero))] opacity-10"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
              <Zap className="h-4 w-4" />
              <span>Powered by Deep Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Calorie Detection
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Use your live camera to detect food in real-time and instantly get detailed calorie information. 
              Our advanced deep learning model can detect multiple foods simultaneously.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/detect">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Detection
                </Link>
              </Button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Food Recognition
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our YOLO-based model can detect and analyze multiple food items in a single image
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Object Detection</h3>
                <p className="text-muted-foreground">
                  Detect multiple food items in a single image with precise bounding boxes
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Calorie Estimation</h3>
                <p className="text-muted-foreground">
                  Get accurate calorie counts and nutritional information for detected foods
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
                <p className="text-muted-foreground">
                  Fast processing with visual feedback and detailed results display
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to analyze your food
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi Food Detection</h3>
              <p className="text-muted-foreground">
                Take a photo of your meal
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our model identifies and locates food items
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                View calories, nutrition facts, and portions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Analyze Your Food?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start detecting calories and nutritional information in seconds
          </p>
          <Button size="lg" asChild className="text-lg px-8">
            <Link to="/detect">
              <Upload className="mr-2 h-5 w-5" />
              Scan Your Food
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;