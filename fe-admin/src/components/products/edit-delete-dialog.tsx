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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { SpinnerButton } from "@/components/ui/spinner-button"
import { toast } from "sonner"

import { observer } from 'mobx-react-lite';
import newProductStore from "../../stores/newProductStore";

interface Product {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string,
}

interface ProductPatch {
  name: string,
  price: number,
  description: string,
  image: string,
}


export const DeleteProductDialog = observer(({ product, onClose }: { product: Product, onClose: () => void }) => {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processDelete = async () => {
    setProcessing(true)

    try {
      const response = await fetch(`http://localhost/api/products/${product.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error message from the server

        toast("Failed delete product", {
          style: {
            backgroundColor: "red",
            color: "white",
            borderColor: "red",
          },
        })
        throw new Error(errorData);
      }

      const responseData = await response.json();

      toast(responseData.message)

      newProductStore.setTrigger('delete') // to trigger the fetch data in the table
      onClose()
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }

  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            Cancel
          </Button>
        </DialogClose>
        {processing ? (
          <SpinnerButton>
            Processing
          </SpinnerButton>
        ) : (
          <Button onClick={() => {
            processDelete()
          }} variant="destructive">
            Delete
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  )
})

export const EditProductDialog = observer(({ product, onClose }: { product: Product, onClose: () => void }) =>{
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<ProductPatch>({
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
  });

  const saveProduct = async () => {
    setProcessing(true)
    
    try {
      const response = await fetch(`http://localhost/api/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error message from the server

        toast("Error", {
          description: errorData.error.fieldErrors ? "Validation error" : "Something went wrong",
          style: {
            backgroundColor: "red",
            color: "white",
            borderColor: "red",
          },
        })
        throw new Error(errorData);
      }

      const responseData = await response.json();

      toast(responseData.message)

      newProductStore.setTrigger('update') // to trigger the fetch data in the table
      onClose()
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
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
              defaultValue={product.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              defaultValue={product.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              defaultValue={product.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageLink" className="text-right">
              Image Link
            </Label>
            <Input
              id="imageLink"
              className="col-span-3"
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              defaultValue={product.image}
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
        {processing ? (
          <SpinnerButton>
            Processing
          </SpinnerButton>
        ) : (
          <Button onClick={() => {
            saveProduct()
          }}>
            Save Changes
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
    // </DialogPortal>
  )
})