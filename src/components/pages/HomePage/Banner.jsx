import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Banner = () => {
  return (
    <Carousel className="w-full h-[600px]">
      <CarouselContent className="h-[600px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="border-none h-[600px]">
                <CardContent className="h-[600px]">
                  <Image
                    fill
                    src={"https://i.ibb.co.com/nPX6Gw8/Web-banner-1.jpg"}
                    alt=""
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />
    </Carousel>
  );
};
export default Banner;
