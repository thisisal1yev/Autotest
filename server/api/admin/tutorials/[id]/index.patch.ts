import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody(event);
    return prisma.tutorial.update({ where: { id }, data: body });
});