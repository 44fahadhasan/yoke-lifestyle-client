"use client";
import ProductsTable from "@/components/Dashboard/Products/AllProductsPage/ProductsTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDataHandler from "@/hooks/useDataHandler";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const AllProductsPage = () => {
  const router = useRouter();
  const { totalProductNumber } = useDataHandler();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 xs:flex-row justify-between">
        {/* content */}
        <div className="space-y-1.5">
          <CardTitle className="sm:text-2xl">
            {`Available Products (${totalProductNumber})`}
          </CardTitle>
          <CardDescription>Explore your published products</CardDescription>
        </div>

        {/* add button */}
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/products/add-product")}
        >
          <CirclePlus />
          Add New Product
        </Button>
      </CardHeader>

      {/* table */}
      <CardContent>
        <ProductsTable />
      </CardContent>
    </Card>
  );
};

export default AllProductsPage;
