"use client";
import ImagePicker from "@/components/Dashboard/HelperComponent/ImageManager/ImagePicker";
import { useState } from "react";

const AddCategoriePage = () => {
  const [addedImageId, setAddedImageId] = useState(null);

  return (
    <>
      <div className="">{addedImageId}</div>

      <ImagePicker setAddedImageId={setAddedImageId} />
    </>
  );
};

export default AddCategoriePage;
