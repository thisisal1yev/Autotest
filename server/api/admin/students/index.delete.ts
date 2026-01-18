import { prisma } from "~~/prisma/db"

export default defineEventHandler(async (event) => {
    const { ids } = await readBody(event)
    await prisma.user.deleteMany({ where: { role: 'STUDENT', id: { in: ids } } })
    return { deleted: ids.length }
})