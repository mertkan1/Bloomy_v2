import { Header } from '@/components/layout/header'
import { MusicSelectionContent } from '@/components/music-selection/music-selection-content'

export default function MusicSelectionPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <MusicSelectionContent />
    </div>
  )
}