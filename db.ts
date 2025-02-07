import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (discogsId: string, accessToken: string, username?: string, avatarUrl?: string) => {
    return await prisma.user.create({
        data: { discogsId, accessToken, username, avatarUrl },
    });
};

export const getUser = async (discogsId: string) => {
    return await prisma.user.findUnique({
        where: { discogsId },
    });
};

export default prisma;
