import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Flower {
  id: string
  name: string
  description: string
  price: number
  image: string
  isLimited?: boolean
  stock?: number
  totalStock?: number
}

interface GiftData {
  recipientName: string
  senderName: string
  message: string
  selectedThemes: string[]
  flower: Flower | null
  music?: {
    track: {
      id: string
      name: string
      artist: string
    }
    category: string
  }
}

interface GiftStore {
  giftData: GiftData
  currentStep: number
  setGiftData: (data: Partial<GiftData>) => void
  setCurrentStep: (step: number) => void
  resetGift: () => void
}

const initialGiftData: GiftData = {
  recipientName: '',
  senderName: '',
  message: 'My message, ',
  selectedThemes: [],
  flower: null,
}

export const useGiftStore = create<GiftStore>()(
  persist(
    (set) => ({
      giftData: initialGiftData,
      currentStep: 0,
      setGiftData: (data) =>
        set((state) => ({
          giftData: { ...state.giftData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetGift: () =>
        set({
          giftData: initialGiftData,
          currentStep: 0,
        }),
    }),
    {
      name: 'gift-store',
    }
  )
)