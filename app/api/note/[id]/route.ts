import { db } from "@/lib/db";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const notes = await db.note.findMany({
      where: {
        id: context.params.id,
      },
    });
    return Response.json({ message: "Success", data: notes });
  } catch (e) {
    return Response.json({ message: "Failed", error: e });
  }
}
