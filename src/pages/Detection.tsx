import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2, Video, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const Detection = () => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
    }
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const handleAnalyze = () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate ML processing time
    setTimeout(() => {
      setIsAnalyzing(false);
      // Navigate to results page with the image data
      navigate('/results', { 
        state: { 
          imageData: capturedImage,
          analysisComplete: true 
        }
      });
    }, 3000);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Food Detection</h1>
            <p className="text-xl text-muted-foreground">
              Use your camera to capture food images and get calorie analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Camera Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Camera Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    {capturedImage ? (
                      <img 
                        src={capturedImage} 
                        alt="Captured food" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                        style={{ display: isStreamActive ? 'block' : 'none' }}
                      />
                    )}
                    
                    {!isStreamActive && !capturedImage && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Video className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Camera Preview</p>
                            <p className="text-sm text-muted-foreground">
                              Start camera to preview
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <canvas ref={canvasRef} className="hidden" />
                  
                  <div className="flex gap-2">
                    {!isStreamActive && !capturedImage && (
                      <Button 
                        onClick={startCamera}
                        className="flex-1"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Camera
                      </Button>
                    )}
                    
                    {isStreamActive && (
                      <>
                        <Button 
                          onClick={captureImage}
                          className="flex-1"
                        >
                          <Square className="mr-2 h-4 w-4" />
                          Capture Photo
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={stopCamera}
                          className="flex-1"
                        >
                          Stop Camera
                        </Button>
                      </>
                    )}
                    
                    {capturedImage && (
                      <Button 
                        variant="outline"
                        onClick={retakePhoto}
                        className="flex-1"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Retake Photo
                      </Button>
                    )}
                  </div>
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
                            Running YOLO detection model
                          </p>
                        </div>
                      </div>
                    ) : capturedImage ? (
                      <div className="space-y-4">
                        <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                          <Camera className="h-8 w-8 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">Photo captured successfully</p>
                          <p className="text-sm text-muted-foreground">
                            Ready to analyze food items
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                          <Camera className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">No photo captured</p>
                          <p className="text-sm text-muted-foreground">
                            Capture a photo to start analysis
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleAnalyze}
                    disabled={!capturedImage || isAnalyzing}
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
                    <p>• Works best with clear, well-lit photos</p>
                    <p>• Multiple food items can be detected</p>
                    <p>• Real-time YOLO model processing</p>
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