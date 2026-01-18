import { prisma } from "~~/prisma/db"

export default defineEventHandler(async (event) => {
    const { ids } = await readBody(event)
    await prisma.test.deleteMany({ where: { id: { in: ids } } })
    return { deleted: ids.length }
})