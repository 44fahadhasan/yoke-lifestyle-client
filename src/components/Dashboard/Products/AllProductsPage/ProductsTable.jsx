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
import VariantsDetails from "./VariantsDetails";

const ProductsTable = () => {
  const [api, setApi] = useState("/api/products/admin");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [sort, setSort] = useState("");

  const {
    activePageNumber,
    totalProductNumber,
    setTotalProductNumber,
    parPageProduct,
    setParPageProduct,
  } = useDataHandler();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const debouncedSearch = useDebounce(search);

  // fetch products
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products-admin", api],
    queryFn: async () => {
      const { data } = await axiosSecure.get(api);
      setTotalProductNumber(data?.totalProducts);
      return data?.data;
    },
  });

  // api makeing
  useEffect(() => {
    // create query object
    const queryObject = {
      page: activePageNumber,
      size: parPageProduct,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(status && { status }),
      ...(featured && { featured }),
      ...(sort && { sort }),
    };

    // create query string
    const url = queryString.stringifyUrl({
      url: "/api/products/admin",
      query: queryObject,
    });

    setApi(url);
  }, [
    activePageNumber,
    parPageProduct,
    debouncedSearch,
    status,
    featured,
    sort,
  ]);

  // handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/api/products/${id}`);

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
            <TableHead className="w-[30px]">No.</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Variant</TableHead>
            <TableHead>Discount</TableHead>
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
                    <Skeleton className="w-[30px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[150px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[150px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[150px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[150px] h-[35px]" />
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
                    <Skeleton className="w-[100px] h-[35px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[35px]" />
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
            : products?.map(
                (
                  {
                    _id,
                    product_name,
                    product_brand,
                    product_category,
                    product_tag,
                    variants,
                    discount_type,
                    discount_percentage,
                    featured_product,
                    status,
                    createdAt,
                  },
                  idx
                ) => (
                  <TableRow key={_id}>
                    {/* serial number */}
                    <TableCell className="font-medium">{idx + 1}</TableCell>

                    {/* product name */}
                    <TableCell>{product_name}</TableCell>

                    {/* product brand */}
                    <TableCell>{product_brand || "No Brand"}</TableCell>

                    {/* product category */}
                    <TableCell>{product_category}</TableCell>

                    {/* product tag */}
                    <TableCell>
                      {product_tag === "No Tag Selectd"
                        ? "None"
                        : product_tag || "None"}
                    </TableCell>

                    {/* variants */}
                    <TableCell>
                      <VariantsDetails variants={variants} />
                    </TableCell>

                    {/* discount type */}
                    <TableCell className="capitalize">
                      {discount_type === "percentage"
                        ? `${discount_percentage}%`
                        : discount_type}
                    </TableCell>

                    {/* featured */}
                    <TableCell className="capitalize">
                      {featured_product}
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
                              `/dashboard/products/edit-product/${_id}`
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
                            router.push(`/dashboard/products/details/${_id}`)
                          }
                          className="px-1 sm:px-[6px]"
                        >
                          <Eye size={16} />
                        </Button>

                        {/* delete */}
                        <DeleteAlert
                          handleDelete={handleDelete}
                          id={_id}
                          label={"product"}
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
        totalItemsNumber={totalProductNumber}
        itemsPerPage={parPageProduct}
        setParPageRows={setParPageProduct}
      />
    </div>
  );
};

export default ProductsTable;
