"use client";

import { ErrorBoundary } from "@/components/errorBoundary";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import apiClient from "@/lib/apiConfig/apiClient";
import { PersonIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type TeamMember = {
  id: number;
  name: string;
  description: string;
  role: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const Team = () => {
  const { data: res, isPending } = useQuery<{ data: TeamMember[] }>({
    queryKey: ["team"],
    queryFn: () => apiClient("/api/v1/team/all", {})
  });

  if (isPending || !res || !res.data || !res.data.length) return null;
  return (
    <section className="flex w-full flex-col items-center gap-4 p-4 lg:gap-8 lg:py-8 xl:gap-12 xl:py-12">
      <h1 className="-mb-4 mt-2 text-center text-3xl font-bold lg:text-4xl xl:text-5xl">Our Team</h1>

      <Carousel opts={{ align: "start" }} className="mx-auto w-full max-w-[80%] md:max-w-[90%]">
        <CarouselContent className="py-2">
          {res?.data.map((itr, index) => (
            <CarouselItem key={itr.id} className="basis-10/12 md:basis-1/2 lg:basis-1/4 ">
              <Card className="flex h-full flex-col items-center gap-2 p-12 shadow-md">
                <ErrorBoundary fallback={<PersonIcon className="h-12 w-12 text-primary" />}>
                  <Image height={80} width={80} src={itr.image} alt="slider" className="h-20 w-20 rounded-full" />
                </ErrorBoundary>

                <CardContent className="!p-3 text-center text-xl font-semibold">
                  <span className="m-auto">{itr.name}</span>
                </CardContent>
                <CardDescription className="flex flex-col items-center justify-center">
                  <div className="mb-2 text-center text-lg font-semibold">{itr.role}</div>
                  <div className="">{itr.description}</div>
                </CardDescription>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Team;
