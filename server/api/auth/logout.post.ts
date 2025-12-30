export default defineEventHandler(async (event) => {
  try {
    await clearUserSession(event);
    return { message: "Logged out successfully" };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
