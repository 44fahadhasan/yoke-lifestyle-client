"use client";
import { ToastAction } from "@/components/ui/toast";
import { productFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import ProductFrom from "../shared/ProductFrom";

const EditProductFrom = () => {
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
      stock_status: "in stock",
      subsections: [{ id: 1, attribute_name: "", attribute_values: [] }],
    },
  ]);
  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [shippingWarranty, setShippingWarranty] = useState("");

  const { id } = useParams();
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
      featured_product: "",
      product_video_link: "",
      discount_type: "",
      discount_percentage: "",
      status: "",
    },
  });

  // fetch product
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product-details-admin", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/products/details/${id}/admin`
      );

      const {
        product_name,
        product_category,
        product_tag,
        product_brand,
        featured_product,
        product_video_link,
        discount_type,
        discount_percentage,
        status,
        product_images_url,
        variants,
        product_description,
        additional_information,
        shipping_warranty,
      } = data?.data || {};

      // set default values of form input filed
      form.reset({
        product_name,
        product_category,
        product_tag,
        product_brand,
        featured_product,
        product_video_link,
        discount_type,
        discount_percentage: discount_percentage.toString(),
        status,
      });

      setSectionImage(product_images_url);
      setVariants(variants);
      setProductDescription(product_description);
      setAdditionalInformation(additional_information);
      setShippingWarranty(shipping_warranty);
      setMetaData(meta_info);

      return data?.data;
    },
  });

  // handle form submission
  const onSubmit = async (data) => {
    // payload data
    const payload = {
      ...data,
      discount_percentage: Number(data.discount_percentage),
      product_images_url: sectionImage.map(({ image }) => ({ image })),
      variants,
      product_description: productDescription,
      additional_information: additionalInformation,
      shipping_warranty: shippingWarranty,
      meta_info: metaData,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.put(`/api/products/${id}`, payload);

      if (data.success) {
        refetch();

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
      isLoading={isLoading}
      loading={loading}
      metaData={metaData}
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

export default EditProductFrom;
