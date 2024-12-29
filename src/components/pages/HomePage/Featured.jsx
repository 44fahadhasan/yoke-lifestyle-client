import Container from "@/components/reusable/Container";
import Image from "next/image";

const Featured = () => {
  return (
    <Container>
      <div className="flex relative gap-5">
        <div className="basis-1/2 h-screen bg-[#EFEFEF] top-[100px] sticky">
          <div className="flex justify-center items-center h-screen">
            <Image
              width={400}
              height={100}
              src={"https://i.ibb.co.com/nPX6Gw8/Web-banner-1.jpg"}
              alt=""
              className="h-4/5"
            />
          </div>
        </div>
        <div className="basis-1/2 space-y-5">
          <div className="h-[800px] bg-black">
            <Image
              width={400}
              height={100}
              src={"https://i.ibb.co.com/nPX6Gw8/Web-banner-1.jpg"}
              alt=""
              className="h-full w-full"
            />
          </div>
          <div className="h-[800px] bg-red-600">
            <Image
              width={400}
              height={100}
              src={"https://i.ibb.co.com/nPX6Gw8/Web-banner-1.jpg"}
              alt=""
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Featured;
