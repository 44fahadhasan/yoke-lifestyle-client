import TypographyH2 from "@/components/reusable/Typography/TypographyH2";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Banner = () => {
  return (
    <section className="relative bg-[url('https://i.ibb.co.com/nPX6Gw8/Web-banner-1.jpg')] h-[700px] flex justify-center items-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-35"></div>
      <div className="relative z-10">
        <Breadcrumb>
          <BreadcrumbList className="text-primary-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary-foreground">
                Our Story
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <TypographyH2 className={"mt-4 text-primary-foreground"}>
          Our Story
        </TypographyH2>
      </div>
    </section>
  );
};

export default Banner;
