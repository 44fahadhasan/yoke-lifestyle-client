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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AllCategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 xs:flex-row justify-between">
        {/* content */}
        <div className="space-y-1.5">
          <CardTitle className="sm:text-2xl">
            Available Categories (0)
          </CardTitle>
          <CardDescription>Explore your published categories</CardDescription>
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

      <CardContent className="space-y-8">
        {/* filters */}
        <div className="w-full flex justify-between gap-4">
          {/* search */}
          <div className="w-1/3">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="text-ellipsis"
              placeholder="Search by Categorie name"
            />
          </div>

          {/* sort */}
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by	status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* categories table */}
        <CategoriesTable />
      </CardContent>
    </Card>
  );
};

export default AllCategoriesPage;
