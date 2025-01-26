"use client";
import BrandsTable from "@/components/Dashboard/Brands/AllBrandsPage/BrandsTable";
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

const AllBrandsPage = () => {
  const router = useRouter();
  const { totalBrandNumber } = useDataHandler();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 xs:flex-row justify-between">
        {/* content */}
        <div className="space-y-1.5">
          <CardTitle className="sm:text-2xl">
            {`Available Brands (${totalBrandNumber})`}
          </CardTitle>
          <CardDescription>Explore your published brands</CardDescription>
        </div>

        {/* add button */}
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/brands/add-brand")}
        >
          <CirclePlus />
          Add New Brand
        </Button>
      </CardHeader>

      {/* table */}
      <CardContent>
        <BrandsTable />
      </CardContent>
    </Card>
  );
};

export default AllBrandsPage;
