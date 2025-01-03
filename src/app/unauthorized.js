import Container from "@/components/reusable/Container";
import TypographyH2 from "@/components/reusable/Typography/TypographyH2";
import TypographyP from "@/components/reusable/Typography/TypographyP";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <Container className={"flex justify-center"}>
      <div className="space-y-3">
        <div>
          <TypographyH2>401 - Unauthorized</TypographyH2>
          <TypographyP>Please log in to access this page.</TypographyP>
        </div>

        <Button variant="outline">
          <Link href="/loign">Return Home</Link>
        </Button>
      </div>
    </Container>
  );
};

export default UnauthorizedPage;
