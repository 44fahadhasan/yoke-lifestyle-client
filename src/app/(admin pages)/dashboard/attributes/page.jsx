"use client";
import AttributesTable from "@/components/Dashboard/Attributes/AllAttributesPage/AttributesTable";
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

const AllAttributesPage = () => {
  const router = useRouter();
  const { totalAttributeNumber } = useDataHandler();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 xs:flex-row justify-between">
        {/* content */}
        <div className="space-y-1.5">
          <CardTitle className="sm:text-2xl">
            {`Available Attributes (${totalAttributeNumber})`}
          </CardTitle>
          <CardDescription>Explore your published attributes</CardDescription>
        </div>

        {/* add button */}
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/attributes/add-attribute")}
        >
          <CirclePlus />
          Add New Attribute
        </Button>
      </CardHeader>

      {/* table */}
      <CardContent>
        <AttributesTable />
      </CardContent>
    </Card>
  );
};

export default AllAttributesPage;
