"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useDataHandler from "@/hooks/useDataHandler";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Eye, FilePenLine } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteAlert from "../../shared/DeleteAlert/DeleteAlert";
import TableFooterFilter from "../../shared/TableFooter/TableFooterFilter";
import TableHeaderFilter from "./TableHeaderFilter";

const AttributesTable = () => {
  const [api, setApi] = useState("/api/product-attributes");
  const [search, setSearch] = useState("");
  const [AvailabilityScope, setAvailabilityScope] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const {
    activePageNumber,
    totalAttributeNumber,
    setTotalAttributeNumber,
    parPageAttribute,
    setParPageAttribute,
  } = useDataHandler();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const debouncedSearch = useDebounce(search);

  // fetch attributes
  const {
    data: attributes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["attributes-admin", api],
    queryFn: async () => {
      const { data } = await axiosSecure.get(api);
      setTotalAttributeNumber(data?.totalAttributes);
      return data?.data;
    },
  });

  // api makeing
  useEffect(() => {
    // create query object
    const queryObject = {
      page: activePageNumber,
      size: parPageAttribute,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(AvailabilityScope && { scope: AvailabilityScope }),
      ...(status && { status }),
      ...(sort && { sort }),
    };

    // create query string
    const url = queryString.stringifyUrl({
      url: "/api/product-attributes",
      query: queryObject,
    });

    setApi(url);
  }, [
    activePageNumber,
    parPageAttribute,
    debouncedSearch,
    AvailabilityScope,
    status,
    sort,
  ]);

  // handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(
        `/api/product-attributes/${id}`
      );

      if (data.success) {
        refetch();
        toast.success(data.message);
      }
    } catch ({ response }) {
      toast.error(response?.data?.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* top filters */}
      <TableHeaderFilter
        search={search}
        setSearch={setSearch}
        AvailabilityScope={AvailabilityScope}
        setAvailabilityScope={setAvailabilityScope}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {/* table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Attribute Name</TableHead>
            <TableHead>Availability Scope</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Added Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[200px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[200px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[150px] h-[35px]" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-x-1 sm:gap-x-2 justify-center">
                      <Skeleton className="w-[35px] h-[35px]" />
                      <Skeleton className="w-[35px] h-[35px]" />
                      <Skeleton className="w-[35px] h-[35px]" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : attributes?.map(
                (
                  {
                    _id,
                    attribute_name,
                    availability_scope,
                    categorie_name,
                    status,
                    priority_number,
                    createdAt,
                  },
                  idx
                ) => (
                  <TableRow key={_id}>
                    {/* serial number */}
                    <TableCell className="font-medium">{idx + 1}</TableCell>

                    {/* attribute name */}
                    <TableCell>{attribute_name}</TableCell>

                    {/* availability scope */}
                    <TableCell>
                      {availability_scope === "global"
                        ? "Global"
                        : categorie_name || "Not Selected"}
                    </TableCell>

                    {/* priority */}
                    <TableCell>{priority_number}</TableCell>

                    {/* status */}
                    <TableCell className="capitalize">{status}</TableCell>

                    {/* added date */}
                    <TableCell>
                      {moment(createdAt).format("MMM DD, YYYY")}
                    </TableCell>

                    {/* action */}
                    <TableCell className="text-center">
                      <div className="flex gap-x-1 sm:gap-x-2 justify-center">
                        {/* edit */}
                        <Button
                          variant="outline"
                          onClick={() =>
                            router.push(
                              `/dashboard/attributes/edit-attribute/${_id}`
                            )
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <FilePenLine size={16} />
                        </Button>

                        {/* details */}
                        <Button
                          variant="outline"
                          onClick={() =>
                            router.push(`/dashboard/attributes/details/${_id}`)
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <Eye size={16} />
                        </Button>

                        {/* delete */}
                        <DeleteAlert
                          handleDelete={handleDelete}
                          id={_id}
                          label={"attribute"}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
        </TableBody>
      </Table>

      {/* bottom filter */}
      <TableFooterFilter
        totalItemsNumber={totalAttributeNumber}
        itemsPerPage={parPageAttribute}
        setParPageRows={setParPageAttribute}
      />
    </div>
  );
};

export default AttributesTable;
