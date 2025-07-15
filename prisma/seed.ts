// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const lead1 = await prisma.lead.create({
    data: {
      name: 'Ali Raza',
      email: 'ali@example.com',
      phone: '03001234567',
      source: 'website',
      stage: 'new',
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      phone: '03012345678',
      source: 'facebook',
      stage: 'contacted',
    },
  });

  await prisma.followup.createMany({
    data: [
      {
        leadId: lead1.id,
        note: 'Call for first meeting',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'pending',
        agent: 'Agent A',
      },
      {
        leadId: lead2.id,
        note: 'Send documents',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'pending',
        agent: 'Agent B',
      },
    ],
  });

  console.log('Seeded leads and followups successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
