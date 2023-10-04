import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getEvents().map((event) => {
      const data = { ...event };
      return db.event.create({ data });
    })
  );
}

seed();

function getEvents() {
  return [
    {
      name: "Frisbee",
      detail: `Frisbee at 29th ave`,
    },{
      name: "workout",
      detail: "need a buddy",
    }
  ];
}