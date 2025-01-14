"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const CategorieDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // fetch categorie
  const { data: categorie = {}, isLoading } = useQuery({
    queryKey: ["categorie-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/categories/details/${id}`);

      return data?.data;
    },
  });

  return <div>{categorie.email}</div>;
};

export default CategorieDetails;
