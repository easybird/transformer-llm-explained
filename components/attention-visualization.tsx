"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { FaCat, FaChair } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
} from "recharts";

const tokens = ["The", "cat", "sat", "on", "the", "mat"];
const tokenIcons = [
  null,
  <FaCat key="cat" />,
  <GiSittingDog key="dog" />,
  null,
  null,
  <FaChair key="chair" />,
];

const initialMatrix = Array.from({ length: tokens.length }, () =>
  Array.from({ length: tokens.length }, () => Math.random())
);

interface AttentionVisualizationProps {
  level: string;
}

export default function AttentionVisualization({
  level,
}: AttentionVisualizationProps) {
  const [matrix, setMatrix] = useState(initialMatrix);

  const handleSliderChange = (
    rowIndex: number,
    colIndex: number,
    value: number[]
  ) => {
    const newMatrix = matrix.map((row, i) =>
      row.map((cell, j) => (i === rowIndex && j === colIndex ? value[0] : cell))
    );
    setMatrix(newMatrix);
  };

  const renderKidVisualization = () => (
    <div className="flex justify-center items-center space-x-4">
      {tokens.map((token, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-lg font-bold">{token}</span>
          {tokenIcons[index] && (
            <div className="text-4xl">{tokenIcons[index]}</div>
          )}
        </div>
      ))}
    </div>
  );

  const renderNormalAdultVisualization = () => {
    const data = tokens.flatMap((source, i) =>
      tokens.map((target, j) => ({
        x: j,
        y: i,
        z: matrix[i][j],
        sourceToken: source,
        targetToken: target,
      }))
    );

    return (
      <ScatterChart
        width={400}
        height={400}
        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
      >
        <XAxis
          dataKey="x"
          type="number"
          domain={[0, tokens.length - 1]}
          ticks={[...Array.from({ length: tokens.length }, (_, i) => i)]}
          tickFormatter={(value) => tokens[value] || ""}
        />
        <YAxis
          dataKey="y"
          type="number"
          domain={[0, tokens.length - 1]}
          ticks={[...Array.from({ length: tokens.length }, (_, i) => i)]}
          tickFormatter={(value) => tokens[value] || ""}
        />
        <ZAxis dataKey="z" range={[50, 400]} name="Attention" />
        <Tooltip
          formatter={(value: number, name: string, props: unknown) => {
            const payload = (
              props as { payload: { sourceToken: string; targetToken: string } }
            ).payload;
            const { sourceToken, targetToken } = payload;
            return [
              `From "${sourceToken}" to "${targetToken}": ${Number(
                value
              ).toFixed(2)}`,
            ];
          }}
        />
        <Scatter data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`rgb(0, 0, 255, ${entry.z})`} />
          ))}
        </Scatter>
      </ScatterChart>
    );
  };

  const renderBasicProgrammerVisualization = () => (
    <div className="grid grid-cols-7 gap-1">
      <div></div>
      {tokens.map((token, i) => (
        <div key={`header-${i}`} className="text-center font-bold">
          {token}
        </div>
      ))}
      {matrix.map((row, i) => (
        <React.Fragment key={`row-${i}`}>
          <div className="font-bold self-center">{tokens[i]}</div>
          {row.map((value, j) => (
            <div
              key={`${i}-${j}`}
              className="w-12 h-12"
              style={{ backgroundColor: `rgba(0, 0, 255, ${value})` }}
              title={`From "${tokens[i]}" to "${tokens[j]}": ${value.toFixed(
                2
              )}`}
            ></div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );

  const renderIntermediateVisualization = () => (
    <div className="grid grid-cols-7 gap-1">
      <div></div>
      {tokens.map((token, i) => (
        <div key={`header-${i}`} className="text-center font-bold">
          {token}
        </div>
      ))}
      {matrix.map((row, i) => (
        <React.Fragment key={`row-${i}`}>
          <div className="font-bold self-center">{tokens[i]}</div>
          {row.map((value, j) => (
            <div key={`${i}-${j}`} className="w-12 h-12">
              <Slider
                value={[value]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(newValue) => handleSliderChange(i, j, newValue)}
              />
              <div className="text-center text-xs mt-1">{value.toFixed(2)}</div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );

  const renderAdvancedVisualization = () => {
    const heads = 4;
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: heads }).map((_, head) => (
          <div key={`head-${head}`} className="border p-2 rounded">
            <h4 className="text-center font-bold mb-2">Head {head + 1}</h4>
            <div className="grid grid-cols-7 gap-1">
              <div></div>
              {tokens.map((token, i) => (
                <div
                  key={`header-${i}`}
                  className="text-center font-bold text-xs"
                >
                  {token}
                </div>
              ))}
              {matrix.map((row, i) => (
                <React.Fragment key={`row-${i}`}>
                  <div className="font-bold self-center text-xs">
                    {tokens[i]}
                  </div>
                  {row.map((value, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="w-6 h-6"
                      style={{ backgroundColor: `rgba(0, 0, 255, ${value})` }}
                      title={`Head ${head + 1}, From "${tokens[i]}" to "${
                        tokens[j]
                      }": ${value.toFixed(2)}`}
                    ></div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderVisualization = () => {
    switch (level) {
      case "Kid":
        return renderKidVisualization();
      case "Normal Adult":
        return renderNormalAdultVisualization();
      case "Basic Programmer":
        return renderBasicProgrammerVisualization();
      case "Intermediate":
        return renderIntermediateVisualization();
      case "Advanced":
        return renderAdvancedVisualization();
      default:
        return null;
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Attention Visualization</CardTitle>
      </CardHeader>
      <CardContent>{renderVisualization()}</CardContent>
    </Card>
  );
}
