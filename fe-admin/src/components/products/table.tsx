import { useEffect, useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { EditProductDialog, DeleteProductDialog } from "@/components/products/edit-delete-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import {
  Dialog,
} from "@/components/ui/dialog"
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

export const ProductTable = observer(() => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null)

  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    image: '',
  });

  const [dialogType, setDialogType] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDialogType("");
  };

  const fetchData = async () => {
    setProducts([])
    try {
      const response = await fetch('http://localhost/api/products');

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData
        // throw new Error(`HTTP error! status: ${response.status}`);
      }

      const datas = await response.json();
      
      setProducts(datas.data);
      setError(null); // Clear any previous errors
    } catch (e: any) {
      toast("Failed to fetch data", {
        style: {
          backgroundColor: "red",
          color: "white",
          borderColor: "red",
        },
      })
      setError(`Failed to fetch data: ${e.message}`);
      setProducts([]); 
    }
  };

  useEffect(() => {
    fetchData();
    newProductStore.setTrigger('refresh')
  }, [newProductStore.trigger])

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>Rp{item.price.toLocaleString('id-ID')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentProduct(products[index])
                          setDialogType("edit")
                          setIsDialogOpen(true)
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setCurrentProduct(products[index])
                          setDialogType("delete")
                          setIsDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {dialogType === "edit" && (
          <EditProductDialog product={currentProduct} onClose={handleCloseDialog} />
        )}

        {dialogType === "delete" && (
          <DeleteProductDialog product={currentProduct} onClose={handleCloseDialog} />
        )}
      </Dialog>
    </div>
  )
})