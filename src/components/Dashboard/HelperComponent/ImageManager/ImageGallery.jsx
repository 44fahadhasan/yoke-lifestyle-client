"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import SingleImageOpen from "./SingleImageOpen";

const images = [
  {
    _id: 1,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080",
    alt: "Nature Image 1",
  },
  {
    _id: 2,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080",
    alt: "Nature Image 2",
  },
  {
    _id: 3,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080",
    alt: "Nature Image 2",
  },
];

const ImageGallery = ({ isSelected, setIsSelected, setAddImageId }) => {
  const [selectedImageId, setSelectedImageId] = useState(null);

  const handleImageClick = (id) => {
    setSelectedImageId((prevId) => (prevId === id ? null : id));

    setIsSelected(!isSelected);
  };

  useEffect(() => {
    setAddImageId(selectedImageId);
  }, [selectedImageId]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map(({ src, alt, _id }) => (
        <div
          onClick={() => handleImageClick(_id)}
          key={_id}
          className={`group relative ease-in-out duration-300 overflow-hidden rounded bg-muted border-2 ${
            selectedImageId === _id ? "border-primary" : "border-transparent"
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
