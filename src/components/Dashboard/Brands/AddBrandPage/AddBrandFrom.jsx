"use client";
import { ToastAction } from "@/components/ui/toast";
import { brandFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BrandFrom from "../shared/BrandFrom";

const AddBrandFrom = () => {
  const [addedImageValue, setAddedImageValue] = useState("");
  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      img_alt: "",
      brand_name: "",
      slug_name: "",
      brand_description: "",
      priority_number: "0",
      featured_brand: "no",
      status: "published",
    },
  });

  // handle form submission
  const onSubmit = async (data) => {
    // payload data
    const payload = {
      ...data,
      priority_number: Number(data.priority_number),
      image_url: addedImageValue,
      meta_info: metaData,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.post("/api/brands", payload);

      if (data.success) {
        setAddedImageValue("");
        form.reset();

        popupToast({
          title: `Great job! ${data.message}`,
          description: "Make changes whenever you need to.",
          action: <ToastAction altText="ok">Ok</ToastAction>,
        });
      }
    } catch ({ response }) {
      const { keyPattern, keyValue } =
        response?.data?.error?.errorResponse || {};

      if (keyPattern?.brand_name && keyValue?.brand_name) {
        return toast.error(
          `The ${keyValue?.brand_name} brand is already exists. Please choose another name.`
        );
      }

      toast.error(response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrandFrom
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      setMetaData={setMetaData}
      addedImageValue={addedImageValue}
      setAddedImageValue={setAddedImageValue}
    />
  );
};

export default AddBrandFrom;
