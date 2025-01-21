"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const TagDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // fetch tag
  const { data: tag = {}, isLoading } = useQuery({
    queryKey: ["tag-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/tags/details/${id}`);

      return data?.data;
    },
  });

  return <div>{tag.email}</div>;
};

export default TagDetails;
