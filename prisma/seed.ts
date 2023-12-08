import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const db = new PrismaClient()
async function seed () {
  const eventNum = 1000
  const events: any[] = []

  for (let i = 0; i < eventNum; i++) {
    const event: any = {
      id: "_"+i.toString(),
      name: faker.lorem.sentences({min: 1, max: 1}),
      date: faker.date.between({
        from: '2020-01-01T00:00:00.000Z',
        to: '2030-01-01T00:00:00.000Z'
      }),
      detail: 'This a Test Data' + faker.lorem.paragraphs({ min: 1, max: 5 }),
      address: `${faker.location.streetAddress(
        true
      )}, ${faker.location.city()}, ${faker.location.state({
        abbreviated: true
      })}, ${faker.location.zipCode()}`,
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    }

    events.push(event)
  }

  console.log(events)

  try {
    await db.event.createMany({ data: events })
    console.log('Seed data inserted successfully.')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await db.$disconnect()
  }
}

seed()
