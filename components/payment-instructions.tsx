"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, Smartphone, Building2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface PaymentInstructionsProps {
  paymentMethod: string
  totalAmount: number
  onTransactionIdChange?: (id: string) => void
}

export function PaymentInstructions({ paymentMethod, totalAmount, onTransactionIdChange }: PaymentInstructionsProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  // Your business details - UPDATE THESE WITH YOUR ACTUAL DETAILS
  const EASYPAISA_NUMBER = "0345-0650242" // Replace with your actual EasyPaisa number
  const BANK_NAME = "Habib Bank Limited" // Replace with your bank name
  const ACCOUNT_TITLE = "AMMAR ADA" // Replace with your business name
  const ACCOUNT_NUMBER = "23057920148599" // Replace with your account number

  if (paymentMethod === "COD") {
    return (
      <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertDescription className="ml-2">
          <strong className="text-green-800 dark:text-green-200">Cash on Delivery Selected</strong>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            You will pay Rs. {totalAmount.toLocaleString()} in cash when your order is delivered.
          </p>
        </AlertDescription>
      </Alert>
    )
  }

  if (paymentMethod === "EASYPAISA") {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Smartphone className="h-5 w-5 text-primary" />
            EasyPaisa Payment Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
            <AlertDescription>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Follow these steps to complete your payment:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>Open your EasyPaisa app</li>
                <li>Go to "Send Money" or "Money Transfer"</li>
                <li>Enter the account number below</li>
                <li>Enter amount: <strong>Rs. {totalAmount.toLocaleString()}</strong></li>
                <li>Complete the transaction</li>
                <li>Enter transaction ID below</li>
              </ol>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">EasyPaisa Account Number</p>
                <p className="text-xl font-bold font-mono">{EASYPAISA_NUMBER}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(EASYPAISA_NUMBER, "easypaisa")}
              >
                {copied === "easypaisa" ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
                <p className="text-2xl font-bold text-primary">Rs. {totalAmount.toLocaleString()}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(totalAmount.toString(), "amount")}
              >
                {copied === "amount" ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="transaction-id" className="text-base">
              Transaction ID <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Enter the transaction ID you received after payment
            </p>
            <Input
              id="transaction-id"
              placeholder="e.g., EP123456789"
              onChange={(e) => onTransactionIdChange?.(e.target.value)}
              required
              className="font-mono"
            />
          </div>

          <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200">
            <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> Your order will be processed after we verify your payment. 
              This usually takes 5-10 minutes. You'll receive a confirmation via SMS/Email.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (paymentMethod === "BANK_TRANSFER") {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-primary" />
            Bank Transfer Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
            <AlertDescription>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Transfer Rs. {totalAmount.toLocaleString()} to the following account:
              </p>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Bank Name</p>
                  <p className="font-semibold">{BANK_NAME}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Account Title</p>
                  <p className="font-semibold">{ACCOUNT_TITLE}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-mono font-semibold">{ACCOUNT_NUMBER}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(ACCOUNT_NUMBER, "account")}
                >
                  {copied === "account" ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground">Amount to Transfer</p>
                <p className="text-2xl font-bold text-primary">Rs. {totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="bank-transaction-id" className="text-base">
              Transaction/Reference Number <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Enter the transaction reference number from your bank receipt
            </p>
            <Input
              id="bank-transaction-id"
              placeholder="e.g., FT123456789"
              onChange={(e) => onTransactionIdChange?.(e.target.value)}
              required
              className="font-mono"
            />
          </div>

          <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200">
            <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> Please send a screenshot of your payment receipt to our WhatsApp: 
              <a href="https://wa.me/923450650242" target="_blank" className="font-bold underline ml-1">
                +92 345 0650242
              </a>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return null
}
