import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalcIcon, User, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Calculator = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
  } | null>(null);

  const calculateCalories = () => {
    if (!age || !weight || !height || !gender || !activityLevel || !goal) {
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    }

    // Activity multipliers
    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    // Goal adjustments
    let targetCalories: number;
    switch (goal) {
      case "lose":
        targetCalories = tdee - 500; // 1 lb per week
        break;
      case "gain":
        targetCalories = tdee + 500; // 1 lb per week
        break;
      case "maintain":
      default:
        targetCalories = tdee;
        break;
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories)
    });
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Daily Calorie Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your daily caloric needs based on your personal information and goals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalcIcon className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="veryActive">Very Active (very hard exercise & physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateCalories}
                  className="w-full"
                  size="lg"
                  disabled={!age || !weight || !height || !gender || !activityLevel || !goal}
                >
                  Calculate Daily Calories
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Your Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">{result.targetCalories} calories/day</h3>
                        <p className="text-muted-foreground">Your daily calorie target</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Basal Metabolic Rate (BMR)</span>
                        <span className="text-primary font-semibold">{result.bmr} cal</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Total Daily Energy Expenditure</span>
                        <span className="text-secondary font-semibold">{result.tdee} cal</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <span className="font-medium">Daily Calorie Goal</span>
                        <span className="text-accent font-semibold">{result.targetCalories} cal</span>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-2 p-4 bg-muted/30 rounded-lg">
                      <p className="font-semibold">Understanding your results:</p>
                      <p>• BMR: Calories burned at rest</p>
                      <p>• TDEE: Total calories burned daily including activity</p>
                      <p>• Goal: Adjusted calories based on your weight goal</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-8">
                    <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Fill in your information to calculate your daily calorie needs</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;