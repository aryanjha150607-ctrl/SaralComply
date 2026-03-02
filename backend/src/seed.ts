import { PrismaClient } from './generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
    await prisma.complianceTask.createMany({
        data: [
            {
                title: 'Review GDPR Data Processing Addendum',
                status: 'Pending',
                dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
            },
            {
                title: 'Complete Annual Security Awareness Training',
                status: 'In Progress',
                dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
            },
            {
                title: 'Update Privacy Policy',
                status: 'Completed',
                dueDate: new Date(new Date().setDate(new Date().getDate() - 3)),
            }
        ]
    });
    console.log('Seeded database with initial tasks.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
