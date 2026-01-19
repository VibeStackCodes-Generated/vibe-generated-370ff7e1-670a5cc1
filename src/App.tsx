import { Toaster } from '@/components/ui/sonner'
import { VibeStackBadge } from '@/components/vibestack-badge'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome to VibeStack</h1>
        <p className="text-muted-foreground mt-2">Start building your app...</p>
      </main>
      <Toaster position="bottom-right" />
      <VibeStackBadge />
    </div>
  )
}

export default App
