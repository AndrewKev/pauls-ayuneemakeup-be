import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SpinnerButton } from "@/components/ui/spinner-button"
import { toast } from "sonner"

import { observer } from 'mobx-react-lite';
import newNewsStore from "../../stores/newNewsStore";

interface News {
  title: string | null,
  description: string | null,
  image: string | null,
}

export const AddNewsDialog = observer(() => {
  const [open, setOpen] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resData, setResData] = useState<any>(null)

  const [formData, setFormData] = useState<News>({
    title: null,
    description: null,
    image: null
  });

  const resetForm = () => {
    setFormData({
      title: null,
      description: null,
      image: null
    });
  }

  const handleSubmit = async () => {
    setProcessing(true)
    await postData()
  };

  const postData = async () => {
    try {
      const response = await fetch('http://localhost/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If the server returned an error response
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

      setResData(responseData);
      setOpen(false);
      resetForm();
      toast("Success insert new news")

      newNewsStore.setTrigger('add') // to trigger the fetch data in the table
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add News
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new article</DialogTitle>
          <DialogDescription>
            Add a new news article and make sure all required fields are filled in.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              className="col-span-3"
              defaultValue={formData.title ?? ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageLink" className="text-right">
              Image Link
            </Label>
            <Input
              id="imageLink"
              className="col-span-3"
              defaultValue={formData.image ?? ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          {processing ? (
            <SpinnerButton>
              Processing
            </SpinnerButton>
          ) : (
            <Button onClick={() => {
              handleSubmit()
            }}>
              Add
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})