import { useEffect, useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { EditNewsDialog, DeleteNewsDialog } from "@/components/news/edit-delete-dialog"
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
import newNewsStore from "../../stores/newNewsStore";

interface News {
  id: number,
  title: string,
  description: string,
  image: string,
}

export const NewsTable = observer(() => {
  const [news, setNews] = useState<News[]>([]);
  const [error, setError] = useState<string | null>(null)

  const [currentNews, setCurrentNews] = useState<News>({
    id: 0,
    title: '',
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
    setNews([])
    try {
      const response = await fetch('http://localhost/api/news');

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData
        // throw new Error(`HTTP error! status: ${response.status}`);
      }

      const datas = await response.json();

      setNews(datas.data);
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
      setNews([]);
    }
  };

  useEffect(() => {
    fetchData();
    newNewsStore.setTrigger('refresh')
  }, [newNewsStore.trigger])

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
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
                          setCurrentNews(news[index])
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
                          setCurrentNews(news[index])
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
          <EditNewsDialog news={currentNews} onClose={handleCloseDialog} />
        )}

        {dialogType === "delete" && (
          <DeleteNewsDialog news={currentNews} onClose={handleCloseDialog} />
        )}
      </Dialog>
    </div>
  )
})