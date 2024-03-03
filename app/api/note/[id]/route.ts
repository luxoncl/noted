import { db } from "@/lib/db";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const notes = await db.note.findMany({
      where: {
        id: "cltamh29h0000ob957sutt1k6",
      },
      include: {
        author: true,
      },
    });
    console.log(notes, "the notes");
    return Response.json({ message: "Success", notes });
  } catch (e) {
    return Response.json({ message: "Failed", error: e });
  }
}

export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const notes = await db.note.createMany({
      data: {
        authorId: context.params.id,
        ...body,
      },
    });
    return Response.json({ message: "Success", notes });
  } catch (e) {
    return Response.json({ message: "Failed", error: e });
  }
}
