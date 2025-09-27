import { Header } from '@/components/layout/header'
import { PurchaseContent } from '@/components/purchase/purchase-content'

export default function PurchasePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />
      <PurchaseContent />
    </div>
  )
}