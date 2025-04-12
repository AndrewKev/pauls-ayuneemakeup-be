import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="outline" disabled>
      <Spinner size="small" className="mr-2" />
      <span>
        {children}
      </span>
    </Button>
  )
}