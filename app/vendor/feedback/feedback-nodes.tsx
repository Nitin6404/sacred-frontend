"use client";

import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import React from "react";
import RatingSubComp from "./rating-subcomp";
import { useVendorContext } from "@/app/context/vendor-context";
import { format } from "date-fns";

const FeedbackNodes = () => {
  const { feedbacks } = useVendorContext();

  if (feedbacks.length === 0) {
    return (
      <div className="my-8 flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">No Feedbacks Yet</h1>
        <p className="text-gray-500">You have no feedbacks yet</p>
      </div>
    );
  }

  return (
    <>
      {feedbacks.map((feedback) => (
        <Card key={feedback.id} className="flex w-[400px] flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {/* @ts-ignore */}
              <span>{feedback.userName}</span>
              <span className="flex items-center text-sm font-normal text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {format(new Date(feedback.createdAt), "dd/MM/yyyy")}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm font-semibold text-muted-foreground">{feedback.feedback}</p>
          </CardContent>
          <CardFooter>
            <RatingSubComp rating={parseInt(feedback.rating)} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default FeedbackNodes;
