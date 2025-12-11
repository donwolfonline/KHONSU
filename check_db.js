
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const userCount = await prisma.user.count();
        const linkCount = await prisma.link.count();
        const storyCount = await prisma.story.count();
        console.log(`Users: ${userCount}`);
        console.log(`Links: ${linkCount}`);
        console.log(`Stories: ${storyCount}`);

        const users = await prisma.user.findMany({
            include: {
                _count: {
                    select: { links: true, stories: true, places: true }
                }
            }
        });

        console.log('--- ALL USERS ---');
        users.forEach(u => {
            console.log(`User: ${u.username} (ID: ${u.id}) - Links: ${u._count.links}, Stories: ${u._count.stories}`);
        });

        if (userCount > 0) {
            const firstUser = await prisma.user.findFirst({
                include: { links: true, stories: true }
            });
            console.log('First User:', firstUser.username);
            console.log('User Links:', firstUser.links.length);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
