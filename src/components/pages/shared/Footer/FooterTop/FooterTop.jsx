import Container from "@/components/reusable/Container";
import TypographyH4 from "@/components/reusable/Typography/TypographyH4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FooterTop = () => {
  return (
    <Container>
      <div className="flex flex-col sm:flex-row justify-between gap-y-4">
        <TypographyH4 className={"text-primary-foreground"}>
          Join our newsletter to keep up to date with us!
          <br /> Enter your email Subscribe
        </TypographyH4>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="text-sm placeholder:text-primary-foreground text-primary-foreground focus-visible:ring-0 focus:border-white border-[#3c5873]"
          />
          <Button
            type="submit"
            className="bg-[#3c5873] hover:bg-[#2e4e6c] text-primary-foreground font-semibold"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default FooterTop;
