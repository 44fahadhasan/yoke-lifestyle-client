"use client";
import ImagePicker from "@/components/Dashboard/HelperComponent/ImageManager/ImagePicker";
import { useState } from "react";

const AddCategoriePage = () => {
  const [addedImageValue, setAddedImageValue] = useState(null);

  return (
    <>
      <div className="">{addedImageValue}</div>

      <ImagePicker setAddedImageValue={setAddedImageValue} />
    </>
  );
};

export default AddCategoriePage;
