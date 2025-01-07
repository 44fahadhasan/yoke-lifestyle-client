"use client";
import LoadingButton from "@/components/reusable/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ImageUploader = () => {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFiles = (event) => {
    // convert to pure array
    const filesArray = Array.from(event.target.files);
    setImages(filesArray);
  };

  const handleImageUpload = async () => {
    if (!images) return toast.warning("Please choose image file for upload.");

    setLoading(true);

    const formData = new FormData();
    images.forEach((file) => {
      formData.append("files", file);
    });

    // try {
    //   const response = await fetch(`${imageUrls}/upload`, {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (!response.ok)
    //     throw new Error(`HTTP error! Status: ${response.status}`);

    //   const data = await response.json();
    //   console.log(data);
    //   toast(
    //     data.message === "Image uploaded successfully"
    //       ? "Successful"
    //       : "Failed",
    //     {
    //       classNames: {
    //         toast:
    //           data.message === "Image uploaded successfully"
    //             ? "bg-green-50"
    //             : "bg-red-50",
    //         title: "text-xl ml-4",
    //         description: "text-[15px] ml-4",
    //       },
    //       description:
    //         data.message === "Image uploaded successfully"
    //           ? "Image uploaded successfully"
    //           : "Something went wrong",
    //       duration: 3000,
    //       icon:
    //         data.message === "Image uploaded successfully" ? (
    //           <FaCheckCircle className="text-green-500 text-4xl" />
    //         ) : (
    //           <IoMdCloseCircle className="text-red-500 text-4xl" />
    //         ),
    //     }
    //   );
    //   setThumbnails(null);
    //   fetchAllImages();
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex flex-col xs:flex-row gap-2 pb-6">
      {/* input */}
      <Input
        disabled={loading}
        type="file"
        accept="image/*"
        multiple
        className="file:h-full file:bg-primary file:rounded"
        onChange={(e) => handleFiles(e)}
      />

      {/* button */}
      <Button onClick={handleImageUpload} disabled={loading} type="submit">
        {loading ? (
          <LoadingButton>Please wait</LoadingButton>
        ) : (
          <>
            <CloudUpload />
            Upload
          </>
        )}
      </Button>
    </div>
  );
};

export default ImageUploader;
