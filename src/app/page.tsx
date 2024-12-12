"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToggleTheme from "./components/ToggleTheme";

interface BMIResult {
  id: string;
  date: string;
  bmi: number;
  category: string;
  height: number;
  weight: number;
}

export default function BMICalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBMI] = useState(0);
  const [bmiCategory, setBMICategory] = useState("");
  const [results, setResults] = useState<BMIResult[]>([]);

  useEffect(() => {
    const calculatedBMI = weight / (height / 100) ** 2;
    setBMI(parseFloat(calculatedBMI.toFixed(1)));

    if (calculatedBMI < 18.5) {
      setBMICategory("Underweight");
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setBMICategory("Normal weight");
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setBMICategory("Overweight");
    } else if (calculatedBMI >= 30 && calculatedBMI < 35) {
      setBMICategory("Obese Class I");
    } else if (calculatedBMI >= 35 && calculatedBMI < 40) {
      setBMICategory("Obese Class II");
    } else {
      setBMICategory("Obese Class III");
    }
  }, [height, weight]);

  useEffect(() => {
    const savedResults = localStorage.getItem("bmiResults");
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  const saveResult = () => {
    const newResult: BMIResult = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      bmi,
      category: bmiCategory,
      height,
      weight
    };
    const updatedResults = [newResult, ...results].slice(0, 10);
    setResults(updatedResults);
    localStorage.setItem("bmiResults", JSON.stringify(updatedResults));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <ToggleTheme/>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            BMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-primary mb-1"
              >
                Height (cm): {height}
              </label>
              <Slider
                id="height"
                min={100}
                max={250}
                step={1}
                value={[height]}
                onValueChange={(value) => setHeight(value[0])}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-primary mb-1"
              >
                Weight (kg): {weight}
              </label>
              <Slider
                id="weight"
                min={30}
                max={200}
                step={1}
                value={[weight]}
                onValueChange={(value) => setWeight(value[0])}
                className="w-full"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Your BMI</h3>
              <div className="text-4xl font-bold text-center">{bmi}</div>
              <div
                className={`text-center mt-2 font-semibold ${
                  bmiCategory === "Normal weight"
                    ? "text-green-600"
                    : bmiCategory === "Underweight"
                    ? "text-blue-600"
                    : bmiCategory === "Overweight"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {bmiCategory}
              </div>
            </div>
            <Button onClick={saveResult} className="w-full">
              Save Result
            </Button>
            <div className="mt-4 text-sm text-primary">
              <p>BMI Categories:</p>
              <ul className="list-disc list-inside">
                <li>Underweight: &lt; 18.5</li>
                <li>Normal weight: 18.5 - 24.9</li>
                <li>Overweight: 25 - 29.9</li>
                <li>Obese Class I: 30 - 34.9</li>
                <li>Obese Class II: 35 - 39.9</li>
                <li>Obese Class III: ≥ 40</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">BMI History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {results.length > 0 ? (
              results.map((result) => (
                <div key={result.id} className="mb-4 p-4 border rounded-md">
                  <p className="font-semibold">Date: {result.date}</p>
                  <p>BMI: {result.bmi}</p>
                  <p>Category: {result.category}</p>
                  <p>Height: {result.height} cm</p>
                  <p>Weight: {result.weight} kg</p>
                </div>
              ))
            ) : (
              <p>No saved results yet.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
