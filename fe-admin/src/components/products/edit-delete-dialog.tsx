import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

interface Product {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string,
}


export function DeleteProductDialog({ product, onClose }: { product: Product, onClose: () => void }) {
  const processDelete = () => {
    setTimeout(() => {
      console.log("Product deleted");
      onClose();
    }, 2000);
  }
  return (
    // <DialogPortal>
      // <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this news article? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={processDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    // </DialogPortal>
  )
}

export function EditProductDialog({ product, onClose }: { product: Product, onClose: () => void }) {
  const saveProduct = () => {
    setTimeout(() => {
      console.log("Product saved");
      onClose();
    }, 2000);
  }

  return (
    // <DialogPortal>
      // <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Make changes to the product details.</DialogDescription>
        </DialogHeader>
        {product && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={product.name}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Price
              </Label>
              <Input
                id="edit-price"
                type="number"
                value={product.price}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-stock" className="text-right">
                Stock
              </Label>
              <Input
                id="edit-stock"
                type="number"
                value={0}
                readOnly
                className="col-span-3"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={saveProduct}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    // </DialogPortal>
  )
}