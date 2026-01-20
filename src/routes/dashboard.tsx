import { useAuth } from '@/lib/auth-context'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useNavigate } from 'react-router-dom'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 32450 },
  { month: 'Feb', revenue: 35890 },
  { month: 'Mar', revenue: 41230 },
  { month: 'Apr', revenue: 38560 },
  { month: 'May', revenue: 42890 },
  { month: 'Jun', revenue: 45670 },
  { month: 'Jul', revenue: 48230 },
  { month: 'Aug', revenue: 46890 },
  { month: 'Sep', revenue: 51340 },
  { month: 'Oct', revenue: 49560 },
  { month: 'Nov', revenue: 52780 },
  { month: 'Dec', revenue: 55230 },
]

const leadSourcesData = [
  { source: 'Website', leads: 456, fill: 'hsl(239 84% 67%)' },
  { source: 'Referral', leads: 312, fill: 'hsl(200 80% 60%)' },
  { source: 'Social Media', leads: 278, fill: 'hsl(280 65% 65%)' },
  { source: 'Email Campaign', leads: 189, fill: 'hsl(160 70% 55%)' },
  { source: 'Direct', leads: 145, fill: 'hsl(45 90% 60%)' },
  { source: 'Partner', leads: 98, fill: 'hsl(340 75% 65%)' },
]

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(239 84% 67%)',
  },
}

const leadSourcesChartConfig = {
  leads: {
    label: 'Leads',
  },
}

export function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Here's your dashboard overview.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Customers</CardTitle>
              <CardDescription>Active customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>This month's revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Deals</CardTitle>
              <CardDescription>Deals in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 closing this week</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue performance over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(239 84% 67%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  className="text-xs"
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => `${label} 2025`}
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(239 84% 67%)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution of leads by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadSourcesChartConfig} className="h-[350px] w-full">
              <BarChart data={leadSourcesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="source"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`${value} leads`, 'Total']}
                    />
                  }
                />
                <Bar
                  dataKey="leads"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Email: </span>
              <span className="text-muted-foreground">{user?.email}</span>
            </div>
            <div>
              <span className="font-medium">Name: </span>
              <span className="text-muted-foreground">{user?.name}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
