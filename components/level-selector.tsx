"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const levels = ["Kid", "Normal Adult", "Basic Programmer", "Intermediate", "Advanced"]

export default function LevelSelector({ onSelect }: { onSelect: (level: string) => void }) {
  const [selectedLevel, setSelectedLevel] = useState("Kid")

  const handleChange = (level: string) => {
    setSelectedLevel(level)
    onSelect(level)
  }

  return (
    <div className="flex flex-wrap justify-center mt-4">
      {levels.map((level) => (
        <Button
          key={level}
          variant={selectedLevel === level ? "default" : "outline"}
          className="m-2"
          onClick={() => handleChange(level)}
        >
          {level}
        </Button>
      ))}
    </div>
  )
}

