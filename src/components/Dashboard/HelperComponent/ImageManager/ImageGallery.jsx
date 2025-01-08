"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import SingleImageOpen from "./SingleImageOpen";

const images = [
  {
    _id: 1,
    src: "https://i.ibb.co.com/nPX6Gw8/Web-banner-1.jpg",
    alt: "1",
  },
  {
    _id: 2,
    src: "2",
    alt: "2",
  },
  {
    _id: 3,
    src: "3",
    alt: "3",
  },
];

const ImageGallery = ({ isSelected, setIsSelected, setAddImageSrc }) => {
  const [selectedImageInfo, setSelectedImageInfo] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImageInfo((prevSrc) => (prevSrc === src ? null : src));

    setIsSelected(!isSelected);
  };

  useEffect(() => {
    setAddImageSrc(selectedImageInfo);
  }, [selectedImageInfo]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map(({ src, alt, _id }) => (
        <div
          onClick={() => handleImageClick(src)}
          key={_id}
          className={`group relative ease-in-out duration-300 overflow-hidden rounded bg-muted border-2 ${
            selectedImageInfo === src ? "border-primary" : "border-transparent"
          }`}
        >
          {/* image */}
          <div>
            <img src={src} alt={alt} className="w-full h-36 object-cover" />
          </div>

          {/* overlay */}
          <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

          {/* action buttons */}
          <div className="absolute -right-80 top-2 space-x-2 transition-all duration-300 group-hover:right-2">
            {/* view */}
            <SingleImageOpen src={src} alt={alt} />

            {/* delete */}
            <Button variant="destructive" className="px-[6px]">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
