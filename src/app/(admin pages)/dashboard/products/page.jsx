"use client";
import TypographyH3 from "@/components/reusable/Typography/TypographyH3";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const AllProductsPage = () => {
  const router = useRouter();

  return (
    <section>
      <div className="flex justify-around">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/products/add-product")}
        >
          <CirclePlus />
          Add New Product
        </Button>

        <TypographyH3>(0) Products Published</TypographyH3>
      </div>
    </section>
  );
};

export default AllProductsPage;
