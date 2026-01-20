import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Deal, DealStage, generateMockDeals } from '@/lib/mock-deals'
import { Building2, DollarSign, Mail, User } from 'lucide-react'

interface DealCardProps {
  deal: Deal
  isDragging?: boolean
}

function DealCard({ deal, isDragging = false }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: deal.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging || isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold leading-tight">
              {deal.title}
            </CardTitle>
            <Badge variant="secondary" className="shrink-0 font-mono text-xs">
              ${(deal.value / 1000).toFixed(0)}k
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-1.5 text-sm">
            <Building2 className="h-3.5 w-3.5" />
            {deal.company}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span className="truncate">{deal.contactName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span className="truncate">{deal.contactEmail}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface KanbanColumnProps {
  title: string
  description: string
  deals: Deal[]
  stage: DealStage
  totalValue: number
}

function KanbanColumn({ title, description, deals, stage, totalValue }: KanbanColumnProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Badge variant="outline" className="font-mono">
            {deals.length}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <DollarSign className="h-4 w-4" />
          <span>${(totalValue / 1000).toFixed(0)}k total</span>
        </div>
      </div>

      <SortableContext items={deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
        <div className="min-h-[200px] space-y-3 rounded-lg border-2 border-dashed border-muted bg-muted/20 p-4">
          {deals.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
              Drop deals here
            </div>
          ) : (
            deals.map((deal) => <DealCard key={deal.id} deal={deal} />)
          )}
        </div>
      </SortableContext>
    </div>
  )
}

export function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>(generateMockDeals())
  const [activeDeal, setActiveDeal] = useState<Deal | undefined>(undefined)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const deal = deals.find((d) => d.id === active.id)
    setActiveDeal(deal)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveDeal(undefined)
      return
    }

    const activeDeal = deals.find((d) => d.id === active.id)
    const overDeal = deals.find((d) => d.id === over.id)

    if (!activeDeal) {
      setActiveDeal(undefined)
      return
    }

    // Determine target stage
    let targetStage: DealStage = activeDeal.stage

    if (overDeal) {
      targetStage = overDeal.stage
    } else if (over.id === 'prospect' || over.id === 'qualified' || over.id === 'closed') {
      targetStage = over.id as DealStage
    }

    // Update deal stage if it changed
    if (activeDeal.stage !== targetStage) {
      setDeals((prevDeals) =>
        prevDeals.map((deal) =>
          deal.id === activeDeal.id ? { ...deal, stage: targetStage } : deal
        )
      )
    }

    setActiveDeal(undefined)
  }

  const handleDragCancel = () => {
    setActiveDeal(undefined)
  }

  const prospectDeals = deals.filter((d) => d.stage === 'prospect')
  const qualifiedDeals = deals.filter((d) => d.stage === 'qualified')
  const closedDeals = deals.filter((d) => d.stage === 'closed')

  const prospectValue = prospectDeals.reduce((sum, d) => sum + d.value, 0)
  const qualifiedValue = qualifiedDeals.reduce((sum, d) => sum + d.value, 0)
  const closedValue = closedDeals.reduce((sum, d) => sum + d.value, 0)

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pipeline</h1>
          <p className="text-muted-foreground">Manage your deals across stages</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${((prospectValue + qualifiedValue + closedValue) / 1000).toFixed(0)}k
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deals.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {deals.length > 0 ? ((closedDeals.length / deals.length) * 100).toFixed(0) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <KanbanColumn
              title="Prospect"
              description="Initial contact and discovery"
              deals={prospectDeals}
              stage="prospect"
              totalValue={prospectValue}
            />
            <KanbanColumn
              title="Qualified"
              description="Qualified and in negotiation"
              deals={qualifiedDeals}
              stage="qualified"
              totalValue={qualifiedValue}
            />
            <KanbanColumn
              title="Closed"
              description="Won deals"
              deals={closedDeals}
              stage="closed"
              totalValue={closedValue}
            />
          </div>

          <DragOverlay>
            {activeDeal ? (
              <div className="rotate-3 cursor-grabbing">
                <DealCard deal={activeDeal} isDragging />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </AppLayout>
  )
}
