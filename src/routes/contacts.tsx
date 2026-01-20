import { useState, useMemo } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockContacts, type Contact, type ContactStatus } from '@/lib/mocks/contacts'
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddContactDialog } from '@/components/add-contact-dialog'
import { toast } from 'sonner'

type SortField = 'name' | 'email' | 'company' | 'status'
type SortDirection = 'asc' | 'desc' | null

const statusColors: Record<ContactStatus, string> = {
  active: 'bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200',
  inactive: 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20 border-gray-200',
  lead: 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-blue-200',
  archived: 'bg-orange-500/10 text-orange-700 hover:bg-orange-500/20 border-orange-200',
}

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortDirection(null)
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleAddContact = (newContact: Omit<Contact, 'id' | 'createdAt'>) => {
    const contact: Contact = {
      ...newContact,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setContacts((prev) => [contact, ...prev])
    toast.success('Contact added successfully', {
      description: `${contact.name} has been added to your contacts.`,
    })
  }

  const filteredAndSortedContacts = useMemo(() => {
    let result = [...contacts]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.company.toLowerCase().includes(query) ||
          contact.phone.includes(query) ||
          contact.status.toLowerCase().includes(query)
      )
    }

    // Sort
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        const aValue = a[sortField].toString().toLowerCase()
        const bValue = b[sortField].toString().toLowerCase()

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [contacts, searchQuery, sortField, sortDirection])

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 size-4 text-muted-foreground" />
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="ml-2 size-4" />
    }
    return <ArrowDown className="ml-2 size-4" />
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">Manage your customer contacts and leads.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Contacts</CardTitle>
                <CardDescription>
                  {filteredAndSortedContacts.length} contact{filteredAndSortedContacts.length !== 1 ? 's' : ''} found
                </CardDescription>
              </div>
              <AddContactDialog onAddContact={handleAddContact} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search contacts by name, email, company, phone, or status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('name')}
                        className="-ml-4 h-auto p-0 hover:bg-transparent"
                      >
                        Name
                        <SortIcon field="name" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('email')}
                        className="-ml-4 h-auto p-0 hover:bg-transparent"
                      >
                        Email
                        <SortIcon field="email" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('company')}
                        className="-ml-4 h-auto p-0 hover:bg-transparent"
                      >
                        Company
                        <SortIcon field="company" />
                      </Button>
                    </TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('status')}
                        className="-ml-4 h-auto p-0 hover:bg-transparent"
                      >
                        Status
                        <SortIcon field="status" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No contacts found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{contact.name}</div>
                            <div className="text-xs text-muted-foreground">{contact.jobTitle}</div>
                          </div>
                        </TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[contact.status]}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
