import { faker } from '@faker-js/faker'

export type ContactStatus = 'active' | 'inactive' | 'lead' | 'archived'

export interface Contact {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: ContactStatus
  createdAt: Date
  jobTitle: string
}

function generateContact(): Contact {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const name = `${firstName} ${lastName}`

  return {
    id: faker.string.uuid(),
    name,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    company: faker.company.name(),
    phone: faker.phone.number({ style: 'national' }),
    status: faker.helpers.arrayElement<ContactStatus>(['active', 'inactive', 'lead', 'archived']),
    createdAt: faker.date.past({ years: 2 }),
    jobTitle: faker.person.jobTitle(),
  }
}

export function generateContacts(count: number = 50): Contact[] {
  faker.seed(12345) // For consistent data across reloads
  return Array.from({ length: count }, () => generateContact())
}

export const mockContacts = generateContacts(50)
