"use client";
import Pagination from "@/components/reusable/Pagination";
import TypographySmall from "@/components/reusable/Typography/TypographySmall";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDataHandler from "@/hooks/useDataHandler";

const TableFooterFilter = ({
  totalItemsNumber,
  itemsPerPage,
  setParPageRows,
}) => {
  const { activePageNumber, totalPageNumber } = useDataHandler();

  return (
    <div className="flex justify-between items-center">
      {/* active page and total page number */}
      <div className="min-w-fit">
        <TypographySmall>{`Page ${
          activePageNumber + 1
        } of ${totalPageNumber}`}</TypographySmall>
      </div>

      {/* pagination */}
      <Pagination
        totalItemsNumber={totalItemsNumber}
        itemsPerPage={itemsPerPage}
      />

      {/* selector */}
      <Select onValueChange={(value) => setParPageRows(value)}>
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
  );
};

export default TableFooterFilter;
