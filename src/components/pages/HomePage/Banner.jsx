import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const Banner = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="w-full h-[700px]"
    >
      <CarouselContent className="h-[700px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="border-none h-[700px]">
                <CardContent className="h-[700px]">
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
