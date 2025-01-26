"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const BrandDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // fetch brand
  const { data: brand = {}, isLoading } = useQuery({
    queryKey: ["brand-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/brands/details/${id}`);

      return data?.data;
    },
  });

  return <div>{brand.email}</div>;
};

export default BrandDetails;
