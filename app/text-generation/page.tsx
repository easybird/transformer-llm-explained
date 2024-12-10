"use client"

import { useState } from "react"
import LevelSelector from "@/components/level-selector"
import TextGenerationVisualization from "@/components/text-generation-visualization"
import { textGenerationExplanations } from "@/lib/explanations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TextGenerationPage() {
  const [level, setLevel] = useState("Kid")

  return (
    <div className="container mx-auto p-4">
      <LevelSelector onSelect={setLevel} />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{level} Explanation: How LLMs Generate Text</CardTitle>
          <CardDescription>Understanding the process of text generation in large language models</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mt-2">{textGenerationExplanations[level as keyof typeof textGenerationExplanations]}</p>
        </CardContent>
      </Card>
      <TextGenerationVisualization level={level} />
    </div>
  )
}

