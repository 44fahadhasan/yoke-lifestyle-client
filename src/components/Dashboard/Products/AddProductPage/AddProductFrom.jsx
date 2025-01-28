"use client";
import { ToastAction } from "@/components/ui/toast";
import { productFormSchema } from "@/data/fromSchema";
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
      id: 1,
      image_url: "",
      sku: "",
      product_quantity: "",
      product_price: "",
      stock_status: "",
      subsections: [{ id: 1, attribute_name: "", attribute_values: [] }],
    },
  ]);
  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [shippingWarranty, setShippingWarranty] = useState("");

  console.log({ variants });

  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      product_name: "",
      product_category: "",
      product_tag: "",
      product_brand: "",
      featured_product: "no",
      product_video_link: "",
      discount_type: "percentage",
      discount_percentage: "",
      status: "published",
    },
  });

  // handle form submission
  const onSubmit = async (data) => {
    // payload data
    const payload = {
      ...data,
      discount_percentage: Number(data.discount_percentage),
      product_images_url: sectionImage.map(({ image }) => ({ image })),
      meta_info: metaData,
      email: auth.email,
    };

    console.log({ payload });

    try {
      setLoading(true);

      const { data } = await axiosSecure.post("/api/products", payload);

      if (data.success) {
        form.reset();

        popupToast({
          title: `Great job! ${data.message}`,
          description: "Make changes whenever you need to.",
          action: <ToastAction altText="ok">Ok</ToastAction>,
        });
      }
    } catch ({ response }) {
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
