"use client";

import { ISlider } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CustomImage } from "@/app/utils/image";

export default function CarouselComp(props: { sliderArr: ISlider[] }) {
  return (
    <div className="relative max-w-[calc(100vw-16px)]">
      <Carousel className="w-full">
        <CarouselContent>
          {(props.sliderArr || []).map((sliderNode) => (
            <CarouselItem key={sliderNode.id} className="relative h-[400px] bg-primary-foreground">
              <section className="flex h-full w-full items-center justify-center">
                <CustomImage
                  width={400}
                  height={400}
                  alt={sliderNode.title}
                  src={sliderNode.image || ""}
                  fallbackImage="/slider-hero-2.jpg"
                  className="absolute inset-auto h-full w-full object-cover"
                  fallbackStyle="height: 400px; width: 400px; margin: 20px auto 0px auto;"
                  placeholder="data:image/base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />

                <h1 className="z-10 text-center text-3xl font-extrabold tracking-tight text-gray-50 shadow-white drop-shadow-lg md:text-5xl lg:text-6xl">
                  {sliderNode.title}
                </h1>
              </section>

              <section className="absolute bottom-2 left-[50%] z-10 mx-auto -translate-x-[50%] text-center">
                <Link href={sliderNode.link}>
                  <Button size="lg" className="mx-auto mt-12 w-fit font-semibold shadow-xl">
                    Book Now
                  </Button>
                </Link>

                <p className="my-1 w-[calc(100vw-35px)] text-xl font-bold text-gray-50 shadow-white drop-shadow-md sm:text-2xl md:text-3xl">
                  {sliderNode.description}
                </p>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
      </Carousel>
    </div>
  );
}
