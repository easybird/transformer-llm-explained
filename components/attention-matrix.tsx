"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function AttentionMatrix({ tokens }: { tokens: string[] }) {
  const [matrix, setMatrix] = useState(
    Array.from({ length: tokens.length }, () =>
      Array.from({ length: tokens.length }, () => Math.random())
    )
  )

  const handleSliderChange = (rowIndex: number, colIndex: number, value: number[]) => {
    const newMatrix = [...matrix]
    newMatrix[rowIndex][colIndex] = value[0]
    setMatrix(newMatrix)
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Attention Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div></div>
          {tokens.map((token, i) => (
            <div key={`header-${i}`} className="text-center font-bold">
              {token}
            </div>
          ))}
          {matrix.map((row, i) => (
            <>
              <div key={`row-${i}`} className="font-bold self-center">
                {tokens[i]}
              </div>
              {row.map((value, j) => (
                <div key={`${i}-${j}`} className="p-2">
                  <Slider
                    value={[value]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={(newValue) => handleSliderChange(i, j, newValue)}
                  />
                  <div className="text-center text-sm mt-1">{value.toFixed(2)}</div>
                </div>
              ))}
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

