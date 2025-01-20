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

const CategoriesTable = () => {
  const [api, setApi] = useState("/api/categories");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [sort, setSort] = useState("");

  const {
    activePageNumber,
    totalCategorieNumber,
    setTotalCategorieNumber,
    parPageCategorie,
    setParPageCategorie,
  } = useDataHandler();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const debouncedSearch = useDebounce(search);

  // fetch categories
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories-admin", api],
    queryFn: async () => {
      const { data } = await axiosSecure.get(api);
      setTotalCategorieNumber(data?.totalCategories);
      return data?.data;
    },
  });

  // api makeing
  useEffect(() => {
    // create query object
    const queryObject = {
      page: activePageNumber,
      size: parPageCategorie,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(status && { status }),
      ...(featured && { featured }),
      ...(sort && { sort }),
    };

    // create query string
    const url = queryString.stringifyUrl({
      url: "/api/categories",
      query: queryObject,
    });

    setApi(url);
  }, [
    activePageNumber,
    parPageCategorie,
    debouncedSearch,
    status,
    featured,
    sort,
  ]);

  // handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/api/categories/${id}`);

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
            <TableHead>Categorie Name</TableHead>
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
            : categories?.map(
                (
                  {
                    _id,
                    categorie_name,
                    slug_name,
                    priority_number,
                    status,
                    featured_categorie,
                    createdAt,
                  },
                  idx
                ) => (
                  <TableRow key={_id}>
                    {/* serial number */}
                    <TableCell className="font-medium">{idx + 1}</TableCell>

                    {/* categorie name */}
                    <TableCell>{categorie_name}</TableCell>

                    {/* categorie slug/path */}
                    <TableCell>{slug_name}</TableCell>

                    {/* priority */}
                    <TableCell>{priority_number}</TableCell>

                    {/* featured */}
                    <TableCell className="capitalize">
                      {featured_categorie}
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
                            router.push(
                              `/dashboard/categories/edit-categorie/${_id}`
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
                            router.push(`/dashboard/categories/details/${_id}`)
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <Eye size={16} />
                        </Button>

                        {/* delete */}
                        <DeleteAlert
                          handleDelete={handleDelete}
                          id={_id}
                          label={"category"}
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
        totalItemsNumber={totalCategorieNumber}
        itemsPerPage={parPageCategorie}
        setParPageRows={setParPageCategorie}
      />
    </div>
  );
};

export default CategoriesTable;
