"use client";
import TypographyH4 from "@/components/reusable/Typography/TypographyH4";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VariantsDetails = ({ variants = [] }) => {
  return (
    <Dialog>
      {/* trigger */}
      <DialogTrigger asChild>
        <Button variant="link" className="px-0">
          View ({variants?.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-screen-md max-h-screen overflow-y-auto space-y-3 ">
        {variants?.map(
          ({
            _id,
            id,
            sku,
            product_quantity,
            product_price,
            stock_status,
            subsections = [],
          }) => (
            <div key={_id}>
              {/* variants table */}
              <TypographyH4 className="text-base">{`Variant ${id}`}</TypographyH4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Quantity</TableHead>
                    <TableHead>Product Price</TableHead>
                    <TableHead>Stock Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>{sku || "N/A"}</TableCell>
                    <TableCell>{product_quantity || 0}</TableCell>
                    <TableCell>{product_price || "N/A"}</TableCell>
                    <TableCell>{stock_status || "Unknown"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* attributes table */}
              {subsections.length > 0 && (
                <Table className="mt-3">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute Name</TableHead>
                      <TableHead>Attribute Values</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {subsections.map(
                      ({ _id, attribute_name, attribute_values = [] }) => (
                        <TableRow key={_id}>
                          <TableCell>
                            {attribute_name || "Unavailable"}
                          </TableCell>
                          <TableCell>
                            {attribute_values.length > 0
                              ? attribute_values
                                  .map(({ value }) => value)
                                  .join(", ")
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VariantsDetails;
