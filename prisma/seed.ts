import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const events = [
  {
    name: 'Tech Talks: Exploring the Latest Web Development Trends',
    date: new Date('2023-07-19T08:00:00'),
    detail:
      'Join us for an evening of insightful talks on progressive web apps, serverless architecture, and the future of JavaScript frameworks.',
    address: '123 Main St, San Francisco',
    lat: 49.244709,
    lng: -122.932856
  },
  {
    name: 'Fitness Bootcamp: Get Fit and Stay Active',
    date: new Date('2023-08-15T18:30:00'),
    detail:
      'Break a sweat and achieve your fitness goals with our high-intensity workout session suitable for all fitness levels.',
    address: '456 Elm St, Munich',
    lat: 49.276402,
    lng: -122.922481
  },
  {
    name: 'Tennis Tournament: Fun and Competitive Matches',
    date: new Date('2023-09-22T12:15:00'),
    detail:
      'Participate in our annual tennis tournament and showcase your skills in exciting matches with players from the community.',
    address: '789 Oak St, Istanbul',
    lat: 49.250874,
    lng: -122.917975
  }
]

async function seed () {
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
