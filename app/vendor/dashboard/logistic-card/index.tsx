import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

interface LogisticCardProps {
  metricType: string;
  metric: number;
  description: string;
  metricLabel: string;
}

const LogisticCard = ({ metricType, metric, description, metricLabel }: LogisticCardProps) => {
  return (
    <Card className="flex flex-col gap-2 p-4 shadow-lg">
      <CardTitle>People ({metricType})</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
        <div className="text-3xl font-bold text-primary">{metric}</div>
        <div className="text-sm text-muted-foreground">{metricLabel}</div>
      </CardContent>
    </Card>
  );
};

export default LogisticCard;
