"use client";
import TagsTable from "@/components/Dashboard/Tags/AllTagsPage/TagsTable";
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

const AllTagsPage = () => {
  const router = useRouter();
  const { totalTagNumber } = useDataHandler();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 xs:flex-row justify-between">
        {/* content */}
        <div className="space-y-1.5">
          <CardTitle className="sm:text-2xl">
            {`Available Tags (${totalTagNumber})`}
          </CardTitle>
          <CardDescription>Explore your published tags</CardDescription>
        </div>

        {/* add button */}
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/tags/add-tag")}
        >
          <CirclePlus />
          Add New Tag
        </Button>
      </CardHeader>

      {/* table */}
      <CardContent>
        <TagsTable />
      </CardContent>
    </Card>
  );
};

export default AllTagsPage;
