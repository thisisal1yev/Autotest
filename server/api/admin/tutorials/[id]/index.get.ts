import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    return prisma.tutorial.findUnique({ where: { id } });
});