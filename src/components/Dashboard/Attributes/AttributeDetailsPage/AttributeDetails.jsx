"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const AttributeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // fetch product attribute
  const { data: attribute = {}, isLoading } = useQuery({
    queryKey: ["product-attribute", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/product-attributes/details/${id}`
      );

      return data?.data;
    },
  });

  return <div>{attribute.email}</div>;
};

export default AttributeDetails;
