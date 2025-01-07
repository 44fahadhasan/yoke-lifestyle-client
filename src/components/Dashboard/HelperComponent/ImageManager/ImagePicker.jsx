"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus, Plus } from "lucide-react";
import { useState } from "react";
import ImageGallery from "./ImageGallery";
import ImageUploader from "./ImageUploader";

const ImagePicker = ({ setAddedImageValue }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [addImageSrc, setAddImageSrc] = useState(null);

  // handle add img
  const handleAddImage = (value) => {
    setAddedImageValue(value);
  };

  return (
    <Dialog onOpenChange={() => setIsSelected(false)}>
      {/*  trigger button */}
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-md h-[90vh] overflow-auto">
        <Card className="border-none shadow-none">
          <CardHeader className="px-0 pb-0">
            {/* image uploader */}
            <ImageUploader />

            {/* content */}
            <CardTitle className="text-lg sm:text-2xl">
              Images Gallery
            </CardTitle>
            <CardDescription>
              Select from your uploaded images with ease.
            </CardDescription>
          </CardHeader>

          {/* img gallery */}
          <CardContent className="px-0 relative">
            {/* add button */}
            <div className="flex justify-end sticky top-0 z-50 bg-card py-2">
              <DialogClose disabled={!isSelected}>
                <Button
                  onClick={() => handleAddImage(addImageSrc)}
                  variant="outline"
                >
                  <CirclePlus />
                  Add Image
                </Button>
              </DialogClose>
            </div>

            {/* image gallery */}
            <ImageGallery
              setAddImageSrc={setAddImageSrc}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePicker;
