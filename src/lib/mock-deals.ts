import { faker } from '@faker-js/faker'

export type DealStage = 'prospect' | 'qualified' | 'closed'

export interface Deal {
  id: string
  title: string
  company: string
  value: number
  stage: DealStage
  contactName: string
  contactEmail: string
  createdAt: Date
}

function generateDeal(stage: DealStage): Deal {
  return {
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement([
      'Enterprise Software License',
      'Consulting Services Agreement',
      'Annual Support Contract',
      'Platform Integration',
      'Cloud Migration Project',
      'Security Audit Package',
      'Custom Development',
      'Training & Onboarding',
      'API Access License',
      'Premium Support Plan',
    ]),
    company: faker.company.name(),
    value: faker.number.int({ min: 5000, max: 250000 }),
    stage,
    contactName: faker.person.fullName(),
    contactEmail: faker.internet.email(),
    createdAt: faker.date.recent({ days: 90 }),
  }
}

export function generateMockDeals(): Deal[] {
  const deals: Deal[] = []

  // Generate 6 prospect deals
  for (let i = 0; i < 6; i++) {
    deals.push(generateDeal('prospect'))
  }

  // Generate 5 qualified deals
  for (let i = 0; i < 5; i++) {
    deals.push(generateDeal('qualified'))
  }

  // Generate 4 closed deals
  for (let i = 0; i < 4; i++) {
    deals.push(generateDeal('closed'))
  }

  return deals
}
