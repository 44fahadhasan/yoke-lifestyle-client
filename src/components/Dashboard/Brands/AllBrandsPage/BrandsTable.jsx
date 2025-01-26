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

const BrandsTable = () => {
  const [api, setApi] = useState("/api/brands");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [sort, setSort] = useState("");

  const {
    activePageNumber,
    totalBrandNumber,
    setTotalBrandNumber,
    parPageBrand,
    setParPageBrand,
  } = useDataHandler();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const debouncedSearch = useDebounce(search);

  // fetch brands
  const {
    data: brands = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["brands-admin", api],
    queryFn: async () => {
      const { data } = await axiosSecure.get(api);
      setTotalBrandNumber(data?.totalBrands);
      return data?.data;
    },
  });

  // api makeing
  useEffect(() => {
    // create query object
    const queryObject = {
      page: activePageNumber,
      size: parPageBrand,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(status && { status }),
      ...(featured && { featured }),
      ...(sort && { sort }),
    };

    // create query string
    const url = queryString.stringifyUrl({
      url: "/api/brands",
      query: queryObject,
    });

    setApi(url);
  }, [activePageNumber, parPageBrand, debouncedSearch, status, featured, sort]);

  // handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/api/brands/${id}`);

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
        status={status}
        setStatus={setStatus}
        featured={featured}
        setFeatured={setFeatured}
        sort={sort}
        setSort={setSort}
      />

      {/* table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Brand Name</TableHead>
            <TableHead>Slug/path Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Featured</TableHead>
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
            : brands?.map(
                (
                  {
                    _id,
                    brand_name,
                    slug_name,
                    priority_number,
                    status,
                    featured_brand,
                    createdAt,
                  },
                  idx
                ) => (
                  <TableRow key={_id}>
                    {/* serial number */}
                    <TableCell className="font-medium">{idx + 1}</TableCell>

                    {/* brand name */}
                    <TableCell>{brand_name}</TableCell>

                    {/* brand slug/path */}
                    <TableCell>{slug_name}</TableCell>

                    {/* priority */}
                    <TableCell>{priority_number}</TableCell>

                    {/* featured */}
                    <TableCell className="capitalize">
                      {featured_brand}
                    </TableCell>

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
                            router.push(`/dashboard/brands/edit-brand/${_id}`)
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <FilePenLine size={16} />
                        </Button>

                        {/* details */}
                        <Button
                          variant="outline"
                          onClick={() =>
                            router.push(`/dashboard/brands/details/${_id}`)
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <Eye size={16} />
                        </Button>

                        {/* delete */}
                        <DeleteAlert
                          handleDelete={handleDelete}
                          id={_id}
                          label={"brand"}
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
        totalItemsNumber={totalBrandNumber}
        itemsPerPage={parPageBrand}
        setParPageRows={setParPageBrand}
      />
    </div>
  );
};

export default BrandsTable;
