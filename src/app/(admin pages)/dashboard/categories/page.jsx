"use client";
import CategoriesTable from "@/components/Dashboard/Categories/AllCategoriesPage/CategoriesTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const AllCategoriesPage = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 xs:flex-row justify-between">
        {/* content */}
        <div className="space-y-1.5">
          <CardTitle className="sm:text-2xl">
            Available Categories (0)
          </CardTitle>
          <CardDescription>Explore you published categories</CardDescription>
        </div>

        {/* add button */}
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/categories/add-categorie")}
        >
          <CirclePlus />
          Add New Categorie
        </Button>
      </CardHeader>

      <CardContent>
        {/* categories table */}
        <CategoriesTable />
      </CardContent>
    </Card>
  );
};

export default AllCategoriesPage;
