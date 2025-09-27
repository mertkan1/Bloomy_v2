import { Header } from '@/components/layout/header'
import { MyFlowersContent } from '@/components/my-flowers/my-flowers-content'

export default function MyFlowersPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <MyFlowersContent />
    </div>
  )
}