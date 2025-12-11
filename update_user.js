const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'test@test.com';
    const newUsername = 'simpleuser';

    const user = await prisma.user.update({
        where: { email },
        data: { username: newUsername },
    });

    console.log('Updated user:', user);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
