"use client";
import { ToastAction } from "@/components/ui/toast";
import { categorieFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import ProductFrom from "../shared/ProductFrom";

const AddProductFrom = () => {
  const [sectionImage, setSectionImage] = useState(() => [
    {
      _id: uuidv4(),
      image: "",
    },
  ]);
  const [variants, setVariants] = useState([
    {
      _id: uuidv4(),
      price: "",
      qty: "",
      image: "",
    },
  ]);
  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [shippingWarranty, setShippingWarranty] = useState("");

  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(categorieFormSchema),
    defaultValues: {
      img_alt: "",
      img_caption: "",
      categorie_name: "",
      slug_name: "",
      categorie_description: "",
      priority_number: "0",
      parent_categorie: null,
      featured_categorie: "no",
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

      const { data } = await axiosSecure.post("/api/categories", payload);

      if (data.success) {
        refetch();

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

      if (keyPattern?.categorie_name && keyValue?.categorie_name) {
        return toast.error(
          `The ${keyValue?.categorie_name} category is already exists. Please choose another name.`
        );
      }

      toast.error(response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFrom
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      setMetaData={setMetaData}
      sectionImage={sectionImage}
      setSectionImage={setSectionImage}
      isLoading={!true}
      productDescription={productDescription}
      setProductDescription={setProductDescription}
      additionalInformation={additionalInformation}
      setAdditionalInformation={setAdditionalInformation}
      shippingWarranty={shippingWarranty}
      setShippingWarranty={setShippingWarranty}
      variants={variants}
      setVariants={setVariants}
    />
  );
};

export default AddProductFrom;
