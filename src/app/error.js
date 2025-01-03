"use client";
import Container from "@/components/reusable/Container";
import TypographyH2 from "@/components/reusable/Typography/TypographyH2";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ErrorPage = ({ error, reset }) => {
  useEffect(() => {
    console.error({ error });
  }, [error]);

  return (
    <Container className={"flex justify-center"}>
      <div className="space-y-3">
        <TypographyH2>Something went wrong!</TypographyH2>

        <Button variant="outline" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </Container>
  );
};

export default ErrorPage;
