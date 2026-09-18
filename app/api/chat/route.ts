/* eslint-disable */
import { generateResponse } from "@/lib/services/species-chat";

// TODO: Implement this file
export async function POST(req: Request) {
  try {
    //retrieve message
    const { message } = (await req.json()) as { message?: string };
    //check if message exists
    if (message) {
      const reply = await generateResponse(message);
      return Response.json({ response: reply });
    } else return Response.json({ error: "Invalid or missing body" }, { status: 400 });
  } catch (error) {
    //catch for other errors
    return Response.json({ error: "Upstream provider error" }, { status: 502 });
  }
}
