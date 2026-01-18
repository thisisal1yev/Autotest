import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const { id } = getRouterParams(event) as { id: string };
        const user = await getCurrentUser(event);

        if (user.role !== "SUPERADMIN") {
            throw createError({ statusCode: 403, message: "Forbidden" });
        }

        await prisma.user.delete({
            where: { role: 'ADMIN', id: parseInt(id) }
        })

        return { success: true };
    } catch (error) {
        console.error(error);
        throw createError({ statusCode: 500, message: "Internal server error" });
    }
});
