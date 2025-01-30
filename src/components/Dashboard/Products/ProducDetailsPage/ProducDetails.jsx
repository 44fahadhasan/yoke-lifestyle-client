"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ProducDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // fetch product
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/products/details/${id}/admin`
      );

      return data?.data;
    },
  });

  return <div>{product.email}</div>;
};

export default ProducDetails;
