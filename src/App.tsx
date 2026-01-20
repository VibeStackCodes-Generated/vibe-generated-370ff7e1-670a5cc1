import { Toaster } from '@/components/ui/sonner'
import { VibeStackBadge } from '@/components/vibestack-badge'
import { AppLayout } from '@/components/layout/app-layout'

function App() {
  return (
    <>
      <AppLayout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome to CRM</h1>
          <p className="text-muted-foreground">Your dashboard overview will appear here.</p>
        </div>
      </AppLayout>
      <Toaster position="bottom-right" />
      <VibeStackBadge />
    </>
  )
}

export default App
