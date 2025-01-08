"use client";
import TypographySmall from "@/components/reusable/Typography/TypographySmall";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FilePenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CategoriesTable = () => {
  const router = useRouter();

  return (
    <div className="space-y-7">
      {/* table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Serial No.</TableHead>
            <TableHead>Categorie Name</TableHead>
            <TableHead>Slug Name</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium">01</TableCell>

            {/* categorie name */}
            <TableCell>Womens</TableCell>

            {/* slug */}
            <TableCell>womens</TableCell>

            {/* action */}
            <TableCell className="text-center">
              <div className="flex gap-x-1 sm:gap-x-2 justify-center">
                {/* edit */}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/categories/edit-categorie/${"id"}`)
                  }
                  className="px-1 sm:px-[6px]"
                >
                  <FilePenLine size={16} />
                </Button>

                {/* details */}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/categories/details/${"id"}`)
                  }
                  className="px-1 sm:px-[6px]"
                >
                  <Eye size={16} />
                </Button>

                {/* delete */}
                <Button variant="destructive" className="px-1 sm:px-[6px]">
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">01</TableCell>

            {/* categorie name */}
            <TableCell>Womens</TableCell>

            {/* path */}
            <TableCell>womens</TableCell>

            {/* action */}
            <TableCell className="text-center">
              <div className="flex gap-x-1 sm:gap-x-2 justify-center">
                {/* edit */}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/categories/edit-categorie/${"id"}`)
                  }
                  className="px-1 sm:px-[6px]"
                >
                  <FilePenLine size={16} />
                </Button>

                {/* details */}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/categories/details/${"id"}`)
                  }
                  className="px-1 sm:px-[6px]"
                >
                  <Eye size={16} />
                </Button>

                {/* delete */}
                <Button variant="destructive" className="px-1 sm:px-[6px]">
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">01</TableCell>

            {/* categorie name */}
            <TableCell>Womens</TableCell>

            {/* path */}
            <TableCell>womens</TableCell>

            {/* action */}
            <TableCell className="text-center">
              <div className="flex gap-x-1 sm:gap-x-2 justify-center">
                {/* edit */}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/categories/edit-categorie/${"id"}`)
                  }
                  className="px-1 sm:px-[6px]"
                >
                  <FilePenLine size={16} />
                </Button>

                {/* details */}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/categories/details/${"id"}`)
                  }
                  className="px-1 sm:px-[6px]"
                >
                  <Eye size={16} />
                </Button>

                {/* delete */}
                <Button variant="destructive" className="px-1 sm:px-[6px]">
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* filter */}
      <div className="flex justify-between items-center">
        <div className="min-w-fit">
          <TypographySmall>Page 1 of 10</TypographySmall>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="6" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rows per page</SelectLabel>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CategoriesTable;
