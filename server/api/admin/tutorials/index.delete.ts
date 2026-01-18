import { prisma } from "~~/prisma/db"

export default defineEventHandler(async (event) => {
    const { ids } = await readBody(event)
    await prisma.tutorial.deleteMany({ where: { id: { in: ids } } })
    return { deleted: ids.length }
})