import Container from "@/components/reusable/Container";
import TypographyH2 from "@/components/reusable/Typography/TypographyH2";
import TypographyP from "@/components/reusable/Typography/TypographyP";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <Container className={"flex justify-center"}>
      <div className="space-y-3">
        <div>
          <TypographyH2>Not Found</TypographyH2>
          <TypographyP>Could not find requested resource</TypographyP>
        </div>

        <Button variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
