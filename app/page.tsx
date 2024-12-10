"use client";

import { useState } from "react";
import LevelSelector from "@/components/level-selector";
import AttentionVisualization from "@/components/attention-visualization";
import { explanations } from "@/lib/explanations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [level, setLevel] = useState("Kid");

  return (
    <div className="container mx-auto p-4">
      <LevelSelector onSelect={setLevel} />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{level} Explanation</CardTitle>
          <CardDescription>
            Understanding Transformers and self-attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mt-2">
            {explanations[level as keyof typeof explanations]}
          </p>
        </CardContent>
      </Card>
      <AttentionVisualization level={level} />
    </div>
  );
}
