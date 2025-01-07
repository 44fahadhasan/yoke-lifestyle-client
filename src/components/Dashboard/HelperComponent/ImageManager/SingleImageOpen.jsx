import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

const SingleImageOpen = ({ ...props }) => {
  const { src, alt } = props || {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-[6px]">
          <Eye size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-lg h-screen">
        {/* image */}
        <div className="p-3">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SingleImageOpen;
