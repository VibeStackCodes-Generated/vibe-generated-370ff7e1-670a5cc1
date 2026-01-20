import { useAuth } from '@/lib/auth-context'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, Bell, Palette, Shield, Mail } from 'lucide-react'
import { toast } from 'sonner'

export function Settings() {
  const { user } = useAuth()

  const handleSaveProfile = () => {
    toast.success('Profile settings saved successfully')
  }

  const handleSaveNotifications = () => {
    toast.success('Notification settings saved successfully')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Separator />

        {/* Profile Information */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and manage your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 border-4 border-indigo-100">
                <AvatarFallback className="bg-indigo-600 text-xl text-white">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Avatar
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name} placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Account Manager" placeholder="Your role" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} className="bg-indigo-600 hover:bg-indigo-700">
                Save Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-base">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your account activity
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications" className="text-base">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get push notifications for important updates
                  </p>
                </div>
                <Switch id="push-notifications" />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails" className="text-base">
                    Marketing Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features and updates
                  </p>
                </div>
                <Switch id="marketing-emails" defaultChecked />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSaveNotifications}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings - Placeholder */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <Palette className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-600">Coming Soon</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Theme customization options will be available in a future update
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings - Placeholder */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <Shield className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-600">Coming Soon</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Password management and two-factor authentication options coming soon
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email Preferences - Placeholder */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Email Preferences</CardTitle>
                <CardDescription>Configure your email communication preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <Mail className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-600">Coming Soon</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Advanced email preferences and digest settings will be available soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
