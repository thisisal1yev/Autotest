import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    const { id } = getRouterParams(event) as { id: string };

    if (user.role !== "STUDENT") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const tutorialId = parseInt(id);

    const tutorial = prisma.tutorial.findUnique({
      where: {
        id: tutorialId,
      },
    });

    return tutorial;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
