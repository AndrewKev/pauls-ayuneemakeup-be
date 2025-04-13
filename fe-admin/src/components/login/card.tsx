import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
// import { useRouter } from "next/navigation"

export function LoginCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    setIsLoading(true)
    setError("")

    // const formData = new FormData(event.currentTarget)
    // // console.log(formData.get("username") as string)
    // const username = formData.get("username") as string
    // const password = formData.get("password") as string

    try {
      const response = await fetch('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // console.log(response.json());
      if (!response.ok) {
        // If the server returned an error response
        const errorData = await response.json(); // Try to parse error message from the server

        toast("Failed to login", {
          description: errorData.error.message || "An error occurred",
          style: {
            backgroundColor: "red",
            color: "white",
            borderColor: "red",
          },
        })
        throw new Error(errorData);
      }

      const responseData = await response.json();
      console.log(responseData)
      // setResData(responseData);
      // setOpen(false);
      // resetForm();
      // toast("Success insert new news")

      // newNewsStore.setTrigger('add') // to trigger the fetch data in the table
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }


    // try {
    //   // This is where you would typically make an API call to authenticate
    //   // For example: const response = await fetch('/api/auth/login', {...})

    //   // Simulating authentication delay
    //   await new Promise((resolve) => setTimeout(resolve, 1000))

    //   // If authentication is successful, redirect to dashboard
    //   // For demo purposes, we'll just redirect if username and password are not empty
    //   if (username && password) {
    //     router.push("/dashboard")
    //   } else {
    //     setError("Invalid username or password")
    //   }
    // } catch (error) {
    //   setError("Something went wrong. Please try again.")
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    // <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">Enter your username and password to sign in</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" placeholder="Enter your username" required autoComplete="username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
    // </div>
  )
}
