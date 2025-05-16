"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Check, RefreshCw, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DeliveryForm from "@/components/delivery-form"
import { findSwapChains, enrichSwapChains } from "@/lib/swap-matching"

export default function SwapChainDetailsPage({ params }) {
  const { id } = params
  const [swapChain, setSwapChain] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeliveryForm, setShowDeliveryForm] = useState(false)
  const [participationStatus, setParticipationStatus] = useState("pending") // pending, confirmed, rejected

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchSwapChain = async () => {
      // Mock data for swap requests
      const swapRequests = [
        {
          id: "SR-1234",
          userId: "U-1001",
          user: "John Doe",
          bookOffered: "C++ Programming",
          bookWanted: "Java Programming",
          condition: "Very Good",
          status: "approved",
          date: "2023-04-10",
          description: "Third edition, includes all code examples and exercises.",
          imageUrl: "/placeholder.svg?height=300&width=200",
        },
        {
          id: "SR-1235",
          userId: "U-1002",
          user: "Jane Smith",
          bookOffered: "JavaScript Programming",
          bookWanted: "C++ Programming",
          condition: "Good",
          status: "approved",
          date: "2023-04-09",
          description: "Modern JavaScript guide with ES6+ features covered in detail.",
          imageUrl: "/placeholder.svg?height=300&width=200",
        },
        {
          id: "SR-1236",
          userId: "U-1003",
          user: "Bob Johnson",
          bookOffered: "Java Programming",
          bookWanted: "JavaScript Programming",
          condition: "Like New",
          status: "approved",
          date: "2023-04-08",
          description: "Comprehensive Java guide with practical examples.",
          imageUrl: "/placeholder.svg?height=300&width=200",
        },
      ]

      // Find potential swap chains
      const chains = findSwapChains(swapRequests)
      const enrichedChains = enrichSwapChains(chains, swapRequests)

      // Find the chain that contains the request with the given ID
      const targetChain = enrichedChains.find((chain) => chain.some((request) => request.id === id))

      setSwapChain(targetChain || [])
      setLoading(false)
    }

    fetchSwapChain()
  }, [id])

  const handleConfirmParticipation = () => {
    setShowDeliveryForm(true)
  }

  const handleRejectParticipation = () => {
    setParticipationStatus("rejected")
    alert("You have rejected participation in this swap chain.")
  }

  const handleDeliverySubmit = (deliveryData) => {
    console.log("Delivery data:", deliveryData)
    setShowDeliveryForm(false)
    setParticipationStatus("confirmed")
    alert("You have confirmed your participation in this swap chain!")
  }

  if (loading) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="flex justify-center items-center h-64">
          <p>Loading swap chain details...</p>
        </div>
      </div>
    )
  }

  if (!swapChain || swapChain.length === 0) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="mb-8 flex items-center gap-2">
          <Link href="/swap-chains" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Swap Chains
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Swap Chain Not Found</CardTitle>
            <CardDescription>The swap chain you're looking for doesn't exist or has been completed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/swap-chains">View Available Swap Chains</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/swap-chains" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Swap Chains
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Swap Chain Details</h1>
        <p className="mt-2 text-muted-foreground">
          Review the details of this swap chain and confirm your participation.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            How This Swap Chain Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              This is a chain of {swapChain.length} book swaps where each person gets the book they want from someone
              else in the chain:
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {swapChain.map((request, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <Card className="flex-grow p-4 border">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-16 bg-muted rounded flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{request.user}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Offers:</p>
                            <Badge variant="outline" className="mt-1">
                              {request.bookOffered}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Wants:</p>
                            <Badge variant="outline" className="mt-1">
                              {request.bookWanted}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  {index < swapChain.length - 1 && (
                    <ArrowRight className="flex-shrink-0 h-5 w-5 text-muted-foreground mx-2" />
                  )}
                  {index === swapChain.length - 1 && (
                    <ArrowRight className="flex-shrink-0 h-5 w-5 text-muted-foreground mx-2" />
                  )}
                  {index === swapChain.length - 1 && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      1
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h3 className="font-medium">Swap Chain Rules:</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1 pl-4">
                <li>Each person in the chain sends their book to the next person</li>
                <li>The last person sends their book to the first person</li>
                <li>Everyone gets the book they wanted</li>
                <li>All participants must confirm before the swap begins</li>
                <li>Once all participants confirm, shipping information will be shared</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {swapChain.map((request, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                Book {index + 1}: {request.bookOffered}
              </CardTitle>
              <CardDescription>Offered by {request.user}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[2/3] max-w-[150px] mx-auto overflow-hidden rounded-lg border bg-muted">
                <img
                  src={request.imageUrl || "/placeholder.svg"}
                  alt={request.bookOffered}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  {request.condition}
                </Badge>
                <p className="text-sm">{request.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {participationStatus === "pending" && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Confirm Your Participation</CardTitle>
            <CardDescription>
              By confirming, you agree to send your book to the next person in the chain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All participants must confirm before the swap chain is activated. You can cancel your participation at any
              time before all participants have confirmed.
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="w-full" onClick={handleRejectParticipation}>
              <X className="mr-2 h-4 w-4" />
              Decline
            </Button>
            <Button className="w-full" onClick={handleConfirmParticipation}>
              <Check className="mr-2 h-4 w-4" />
              Confirm Participation
            </Button>
          </CardFooter>
        </Card>
      )}

      {participationStatus === "confirmed" && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Participation Confirmed!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              You have confirmed your participation in this swap chain. You will be notified when all participants have
              confirmed and the swap is ready to proceed.
            </p>
          </CardContent>
        </Card>
      )}

      {participationStatus === "rejected" && (
        <Card className="mt-8 bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Participation Declined</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">
              You have declined to participate in this swap chain. You can still browse other available swap chains.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/swap-chains">Browse Other Swap Chains</Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      <Dialog open={showDeliveryForm} onOpenChange={setShowDeliveryForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delivery Information</DialogTitle>
            <DialogDescription>
              Please provide your delivery information to complete your participation in this swap chain.
            </DialogDescription>
          </DialogHeader>
          <DeliveryForm onSubmit={handleDeliverySubmit} onCancel={() => setShowDeliveryForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
