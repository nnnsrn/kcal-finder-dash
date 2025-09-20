import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const Detection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate ML processing time
    setTimeout(() => {
      setIsAnalyzing(false);
      // Navigate to results page with the image data
      navigate('/results', { 
        state: { 
          imageData: selectedImage,
          analysisComplete: true 
        }
      });
    }, 3000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Food Detection</h1>
            <p className="text-xl text-muted-foreground">
              Upload an image to analyze food items and get calorie information
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={handleUploadClick}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Selected food" 
                        className="max-w-full h-64 object-contain mx-auto rounded-lg"
                      />
                      <Button 
                        variant="outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                        }}
                      >
                        Choose Different Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Drop your image here</p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse (max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleUploadClick}
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Browse Files
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      // In a real app, this would open camera
                      toast({
                        title: "Camera feature",
                        description: "Camera capture would be implemented here",
                      });
                    }}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Use Camera
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </div>
                        <div>
                          <p className="font-medium">Analyzing your image...</p>
                          <p className="text-sm text-muted-foreground">
                            Running deep learning model
                          </p>
                        </div>
                      </div>
                    ) : selectedImage ? (
                      <div className="space-y-4">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <ImageIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Image ready for analysis</p>
                          <p className="text-sm text-muted-foreground">
                            Click analyze to detect food items
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">No image selected</p>
                          <p className="text-sm text-muted-foreground">
                            Upload an image to start analysis
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleAnalyze}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        Analyze Food
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Supports JPG, PNG, WebP formats</p>
                    <p>• Best results with clear, well-lit images</p>
                    <p>• Multiple food items can be detected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detection;