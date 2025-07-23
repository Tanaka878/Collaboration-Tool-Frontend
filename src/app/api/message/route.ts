import { connectToDatabase } from "@/app/libs/mongodb";
import Message from "@/app/model/Message";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const messages = await Message.find().sort({ timestamp: 1 });
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { text, sender } = await req.json();
  await connectToDatabase();
  const newMessage = await Message.create({ text, sender });
  return NextResponse.json(newMessage, { status: 201 });
}
