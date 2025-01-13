import EditCategorieFrom from "@/components/Dashboard/Categories/EditCategoriePage/EditCategorieFrom";
import { Card } from "@/components/ui/card";

const EditCategoriePage = ({ params }) => {
  return (
    <Card className="rounded shadow-none">
      <EditCategorieFrom />
    </Card>
  );
};

export default EditCategoriePage;
