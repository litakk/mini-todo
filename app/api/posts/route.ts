import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {}

export async function POST(request: Request) {
  const [title, content] = await request.json();
  const session = await getServerSession() from "next-auth"


  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 401 }
    );
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
