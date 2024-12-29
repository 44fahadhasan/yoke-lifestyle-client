"use client";
import Container from "@/components/reusable/Container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

const Categories = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Container>
      <Carousel setApi={setApi} className="w-full h-[400px]">
        <CarouselContent className="-ml-1 h-[400px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card className="h-[400px]">
                  <CardContent className="h-[400px] flex items-center justify-center p-6">
                    <Image
                      width={300}
                      height={400}
                      src={"https://i.ibb.co.com/nPX6Gw8/Web-banner-1.jpg"}
                      alt=""
                      className="h-screen"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-5 lg:hidden" />
        <CarouselNext className="right-5 lg:hidden" />
        <div className="lg:hidden py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </Carousel>
    </Container>
  );
};

export default Categories;
