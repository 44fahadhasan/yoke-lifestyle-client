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

const TagsTable = () => {
  const [api, setApi] = useState("/api/tags");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [sort, setSort] = useState("");

  const {
    activePageNumber,
    totalTagNumber,
    setTotalTagNumber,
    parPageTag,
    setParPageTag,
  } = useDataHandler();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const debouncedSearch = useDebounce(search);

  // fetch tags
  const {
    data: tags = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tags-admin", api],
    queryFn: async () => {
      const { data } = await axiosSecure.get(api);
      setTotalTagNumber(data?.totalTags);
      return data?.data;
    },
  });

  // api makeing
  useEffect(() => {
    // create query object
    const queryObject = {
      page: activePageNumber,
      size: parPageTag,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(status && { status }),
      ...(featured && { featured }),
      ...(sort && { sort }),
    };

    // create query string
    const url = queryString.stringifyUrl({
      url: "/api/tags",
      query: queryObject,
    });

    setApi(url);
  }, [activePageNumber, parPageTag, debouncedSearch, status, featured, sort]);

  // handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/api/tags/${id}`);

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
            <TableHead>Tag Name</TableHead>
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
            : tags?.map(
                (
                  {
                    _id,
                    tag_name,
                    slug_name,
                    priority_number,
                    status,
                    featured_tag,
                    createdAt,
                  },
                  idx
                ) => (
                  <TableRow key={_id}>
                    {/* serial number */}
                    <TableCell className="font-medium">{idx + 1}</TableCell>

                    {/* tag name */}
                    <TableCell>{tag_name}</TableCell>

                    {/* tag slug/path */}
                    <TableCell>{slug_name}</TableCell>

                    {/* priority */}
                    <TableCell>{priority_number}</TableCell>

                    {/* featured */}
                    <TableCell className="capitalize">{featured_tag}</TableCell>

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
                            router.push(`/dashboard/tags/edit-tag/${_id}`)
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <FilePenLine size={16} />
                        </Button>

                        {/* details */}
                        <Button
                          variant="outline"
                          onClick={() =>
                            router.push(`/dashboard/tags/details/${_id}`)
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <Eye size={16} />
                        </Button>

                        {/* delete */}
                        <DeleteAlert
                          handleDelete={handleDelete}
                          id={_id}
                          label={"tag"}
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
        totalItemsNumber={totalTagNumber}
        itemsPerPage={parPageTag}
        setParPageRows={setParPageTag}
      />
    </div>
  );
};

export default TagsTable;
