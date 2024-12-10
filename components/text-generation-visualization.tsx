"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface TextGenerationVisualizationProps {
  level: string
}

const initialSentence = "The cat sat on the"
const nextWordOptions = ["mat", "chair", "dog"]

export default function TextGenerationVisualization({ level }: TextGenerationVisualizationProps) {
  const [sentence, setSentence] = useState(initialSentence)
  const [nextWord, setNextWord] = useState("")
  const [probabilities, setProbabilities] = useState<{ word: string; probability: number }[]>([])

  useEffect(() => {
    // Generate random probabilities for the next word options
    const newProbabilities = nextWordOptions.map(word => ({
      word,
      probability: Math.random()
    }))
    const sum = newProbabilities.reduce((acc, curr) => acc + curr.probability, 0)
    newProbabilities.forEach(item => item.probability = +(item.probability / sum).toFixed(2))
    setProbabilities(newProbabilities)
  }, [sentence])

  const handleNextWord = (word: string) => {
    setSentence(prev => `${prev} ${word}`)
    setNextWord("")
  }

  const renderKidVisualization = () => (
    <div className="flex flex-col items-center">
      <div className="text-2xl mb-4">{sentence}</div>
      <motion.div
        className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        🤖
      </motion.div>
      <Button onClick={() => handleNextWord(nextWordOptions[Math.floor(Math.random() * nextWordOptions.length)])}>
        Add Next Word
      </Button>
    </div>
  )

  const renderNormalAdultVisualization = () => (
    <div className="flex flex-col items-center">
      <div className="text-2xl mb-4">{sentence}</div>
      <div className="flex space-x-4 mb-4">
        {nextWordOptions.map((word, index) => (
          <Button
            key={word}
            onClick={() => handleNextWord(word)}
            style={{ opacity: probabilities[index]?.probability || 0.5 }}
          >
            {word}
          </Button>
        ))}
      </div>
      <div className="text-sm">
        (Darker buttons are more likely to be chosen by the LLM)
      </div>
    </div>
  )

  const renderBasicProgrammerVisualization = () => (
    <div className="flex flex-col items-center">
      <div className="text-2xl mb-4">{sentence}</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={probabilities}>
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="probability" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Button className="mt-4" onClick={() => handleNextWord(probabilities.reduce((prev, current) => (prev.probability > current.probability) ? prev : current).word)}>
        Generate Next Word
      </Button>
    </div>
  )

  const renderIntermediateVisualization = () => (
    <div className="flex flex-col items-center">
      <div className="text-2xl mb-4">{sentence}</div>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {sentence.split(" ").map((word, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded text-center">
            {word}
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={probabilities}>
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="probability" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Button className="mt-4" onClick={() => handleNextWord(probabilities.reduce((prev, current) => (prev.probability > current.probability) ? prev : current).word)}>
        Generate Next Word
      </Button>
    </div>
  )

  const renderAdvancedVisualization = () => (
    <div className="flex flex-col items-center">
      <div className="text-2xl mb-4">{sentence}</div>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {sentence.split(" ").map((word, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded text-center">
            <div>{word}</div>
            <div className="text-xs mt-1">Embedding: [{Array(3).fill(0).map(() => Math.random().toFixed(2)).join(", ")}]</div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={probabilities}>
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="probability" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Button className="mt-4" onClick={() => handleNextWord(probabilities.reduce((prev, current) => (prev.probability > current.probability) ? prev : current).word)}>
        Generate Next Token
      </Button>
    </div>
  )

  const renderVisualization = () => {
    switch (level) {
      case 'Kid':
        return renderKidVisualization()
      case 'Normal Adult':
        return renderNormalAdultVisualization()
      case 'Basic Programmer':
        return renderBasicProgrammerVisualization()
      case 'Intermediate':
        return renderIntermediateVisualization()
      case 'Advanced':
        return renderAdvancedVisualization()
      default:
        return null
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Text Generation Visualization</CardTitle>
      </CardHeader>
      <CardContent>{renderVisualization()}</CardContent>
    </Card>
  )
}

